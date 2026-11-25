import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import {
  initializeAppCheck,
  ReCaptchaEnterpriseProvider,
  type AppCheck,
} from "firebase/app-check";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithRedirect,
  getRedirectResult,
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import firebaseConfig from "../../firebase-applet-config.json";
import firebaseAiConfig from "../../firebase-ai-config.json";

// Initialize default Firebase App (Auth & Firestore)
export const app: FirebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize dedicated Firebase App for Firebase AI Logic (fir-s-ai-study-guru)
export const hybridAiApp: FirebaseApp =
  getApps().find((existing) => existing.name === "hybrid-ai-logic") ||
  initializeApp(firebaseAiConfig, "hybrid-ai-logic");

// Safe Firebase App Check initialization (non-blocking if site key is not configured yet)
function initSafeAppCheck(targetApp: FirebaseApp): AppCheck | null {
  if (typeof window === "undefined") return null;

  try {
    const envSiteKey = (import.meta.env?.VITE_FIREBASE_RECAPTCHA_SITE_KEY as string | undefined)?.trim();
    const configSiteKey = (firebaseConfig as { recaptchaSiteKey?: string }).recaptchaSiteKey?.trim();
    const siteKey = envSiteKey || configSiteKey || "";

    if (!siteKey) {
      return null;
    }

    if (
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"
    ) {
      (self as unknown as { FIREBASE_APPCHECK_DEBUG_TOKEN?: boolean }).FIREBASE_APPCHECK_DEBUG_TOKEN = true;
    }

    return initializeAppCheck(targetApp, {
      provider: new ReCaptchaEnterpriseProvider(siteKey),
      isTokenAutoRefreshEnabled: true,
    });
  } catch (err) {
    console.warn("Firebase App Check skipped safely:", err);
    return null;
  }
}

export const appCheck = initSafeAppCheck(app);
export const hybridAppCheck = initSafeAppCheck(hybridAiApp);

// Initialize Auth & Firestore with dedicated Database ID
export const auth = getAuth(app);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account"
});

export interface UserProfile {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  role?: "student" | "advocate" | "govt_aspirant" | "teacher";
  xp?: number;
  level?: number;
  streak?: number;
}

// Helper to save or sync profile in Firestore
export async function syncUserProfile(user: FirebaseUser): Promise<UserProfile> {
  const userProfile: UserProfile = {
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    role: "student",
    xp: 150,
    level: 1,
    streak: 1,
  };

  try {
    const userDocRef = doc(db, "users", user.uid);
    const existingDoc = await getDoc(userDocRef);
    if (!existingDoc.exists()) {
      await setDoc(userDocRef, {
        ...userProfile,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
  } catch (err) {
    console.warn("User profile sync note:", err);
  }

  return userProfile;
}

// Sign In with Google Popup (with fallback to redirect or friendly instructions if blocked)
export async function loginWithGoogle(): Promise<UserProfile> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return await syncUserProfile(result.user);
  } catch (error: any) {
    // If popup is blocked by browser/iframe, try signInWithRedirect or throw specific error
    if (error?.code === "auth/popup-blocked") {
      try {
        await signInWithRedirect(auth, googleProvider);
        // Page will redirect or resume
        throw new Error("POPUP_BLOCKED_REDIRECT_STARTED");
      } catch (redirectErr: any) {
        throw new Error(
          "Browser ne pop-up block kar diya hai. Kripya browser ke address bar mein Pop-up unblock karein ya 'Continue as Guest' dabayein."
        );
      }
    }
    throw error;
  }
}

// Check redirect login result on page load
export async function checkRedirectLogin(): Promise<UserProfile | null> {
  try {
    const result = await getRedirectResult(auth);
    if (result && result.user) {
      return await syncUserProfile(result.user);
    }
  } catch (err) {
    console.warn("Redirect login check note:", err);
  }
  return null;
}

// Simple direct sign-in fallback (e.g. for preview environment or when popups are strictly disabled)
export function createGuestSession(name: string = "Scholar Student"): UserProfile {
  const guestUser: UserProfile = {
    uid: "guest_" + Date.now(),
    displayName: name,
    email: "student@ssstudyguru.app",
    photoURL: null,
    role: "student",
    xp: 100,
    level: 1,
    streak: 1,
  };
  localStorage.setItem("ss_guest_user", JSON.stringify(guestUser));
  return guestUser;
}

// Log Out
export async function logoutUser(): Promise<void> {
  localStorage.removeItem("ss_guest_user");
  await signOut(auth);
}

// Subscribe to Auth state
export function onAuthUpdate(callback: (user: FirebaseUser | null) => void) {
  return onAuthStateChanged(auth, callback);
}
