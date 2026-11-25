import { Capacitor } from "@capacitor/core";
import {
  AdMob,
  BannerAdOptions,
  BannerAdSize,
  BannerAdPosition,
  BannerAdPluginEvents,
  RewardAdPluginEvents,
} from "@capacitor-community/admob";
import { admobConfig } from "../config/admob";

class NativeAdMobService {
  private isInitialized = false;
  private isBannerShowing = false;
  private lastBannerStatus: { status: "idle" | "loading" | "loaded" | "error"; message?: string; timestamp?: string } = { status: "idle" };
  private lastInterstitialStatus: { status: "idle" | "loading" | "loaded" | "error"; message?: string; timestamp?: string } = { status: "idle" };
  private listenersRegistered = false;

  /**
   * Initializes the Google AdMob SDK on Android / iOS devices with initializeForTesting: true
   */
  async initialize(): Promise<boolean> {
    if (this.isInitialized) return true;

    try {
      if (Capacitor.isNativePlatform()) {
        await AdMob.initialize({
          initializeForTesting: admobConfig.isTestMode,
        });
        this.setupListeners();
        console.log(`[AdMob] Initialized Mobile Ads SDK (isTestMode: ${admobConfig.isTestMode})`);
      } else {
        console.log(`[AdMob] Web preview mode (isTestMode: ${admobConfig.isTestMode})`);
      }

      this.isInitialized = true;
      return true;
    } catch (error) {
      console.log("[AdMob] AdMob initialize note:", error);
      this.isInitialized = true;
      return true;
    }
  }

  private setupListeners() {
    if (this.listenersRegistered || !Capacitor.isNativePlatform()) return;
    try {
      AdMob.addListener(BannerAdPluginEvents.Loaded, () => {
        console.log("[AdMob] Banner Ad loaded successfully.");
        this.isBannerShowing = true;
        this.lastBannerStatus = { status: "loaded", message: "Ad loaded successfully", timestamp: new Date().toLocaleTimeString() };
      });

      AdMob.addListener(BannerAdPluginEvents.FailedToLoad, (err) => {
        console.log("[AdMob] Banner Ad failed to load:", err);
        const errDesc = err?.message || JSON.stringify(err) || "No fill / network error";
        this.lastBannerStatus = { status: "error", message: errDesc, timestamp: new Date().toLocaleTimeString() };
      });
      this.listenersRegistered = true;
    } catch (e) {
      console.log("[AdMob] setupListeners error:", e);
    }
  }

  /**
   * Shows a Banner Ad at the bottom center of the screen
   */
  async showBottomBanner(forceTestMode?: boolean): Promise<{ success: boolean; message: string }> {
    try {
      if (!this.isInitialized) {
        await this.initialize();
      }

      const useTesting = forceTestMode !== undefined ? forceTestMode : admobConfig.isTestMode;

      if (!Capacitor.isNativePlatform()) {
        this.isBannerShowing = true;
        this.lastBannerStatus = { status: "loaded", message: "Web Preview mode (Native AdMob requires Android APK/AAB)", timestamp: new Date().toLocaleTimeString() };
        return { success: true, message: "Web Preview Active (Native AdMob runs on Android/Capacitor build)" };
      }

      if (this.isBannerShowing) {
        await this.removeBanner();
      }

      this.lastBannerStatus = { status: "loading", message: "Requesting AdMob ad...", timestamp: new Date().toLocaleTimeString() };

      const options: BannerAdOptions = {
        adId: useTesting
          ? admobConfig.testBannerUnitId
          : admobConfig.bannerAdUnitId,
        adSize: BannerAdSize.BANNER,
        position: BannerAdPosition.BOTTOM_CENTER,
        margin: 0,
        isTesting: useTesting,
      };

      await AdMob.showBanner(options);
      this.isBannerShowing = true;
      return { success: true, message: "Banner request sent to Google AdMob" };
    } catch (error: any) {
      const msg = error?.message || String(error);
      console.log("[AdMob] showBottomBanner note:", error);
      this.lastBannerStatus = { status: "error", message: msg, timestamp: new Date().toLocaleTimeString() };
      return { success: false, message: msg };
    }
  }

  /**
   * Hides the bottom banner ad
   */
  async hideBanner(): Promise<void> {
    try {
      if (Capacitor.isNativePlatform() && this.isBannerShowing) {
        await AdMob.hideBanner();
      }
      this.isBannerShowing = false;
    } catch (err) {
      console.log("[AdMob] hideBanner notice:", err);
    }
  }

  /**
   * Completely removes the banner ad from view
   */
  async removeBanner(): Promise<void> {
    try {
      if (Capacitor.isNativePlatform()) {
        await AdMob.removeBanner();
      }
      this.isBannerShowing = false;
    } catch (err) {
      console.log("[AdMob] removeBanner notice:", err);
    }
  }

  /**
   * Shows an Interstitial ad
   */
  async showInterstitial(forceTest?: boolean): Promise<{ success: boolean; message: string }> {
    try {
      if (!this.isInitialized) await this.initialize();

      const useTesting = forceTest !== undefined ? forceTest : admobConfig.isTestMode;
      const adId = useTesting
        ? "ca-app-pub-3940256099942544/1033173712" // Official Google Test Interstitial
        : admobConfig.interstitialAdUnitId;

      if (Capacitor.isNativePlatform()) {
        this.lastInterstitialStatus = { status: "loading", message: "Preparing Interstitial...", timestamp: new Date().toLocaleTimeString() };
        await AdMob.prepareInterstitial({
          adId,
          isTesting: useTesting,
        });
        await AdMob.showInterstitial();
        this.lastInterstitialStatus = { status: "loaded", message: "Interstitial displayed", timestamp: new Date().toLocaleTimeString() };
        return { success: true, message: "Interstitial displayed successfully" };
      } else {
        return { success: true, message: "Web Preview: Interstitial is only presented natively on Android device." };
      }
    } catch (error: any) {
      const msg = error?.message || String(error);
      console.log("[AdMob] Interstitial note:", error);
      this.lastInterstitialStatus = { status: "error", message: msg, timestamp: new Date().toLocaleTimeString() };
      return { success: false, message: msg };
    }
  }

  /**
   * Shows a Rewarded Video ad
   */
  async showRewardVideo(onRewarded?: () => void, forceTest?: boolean): Promise<{ success: boolean; message: string }> {
    try {
      if (!this.isInitialized) await this.initialize();

      const useTesting = forceTest !== undefined ? forceTest : admobConfig.isTestMode;
      const adId = useTesting
        ? "ca-app-pub-3940256099942544/5224354917" // Official Google Test Rewarded
        : admobConfig.rewardedAdUnitId;

      if (Capacitor.isNativePlatform()) {
        if (onRewarded) {
          AdMob.addListener(RewardAdPluginEvents.Rewarded, () => {
            onRewarded();
          });
        }
        await AdMob.prepareRewardVideoAd({
          adId,
          isTesting: useTesting,
        });
        await AdMob.showRewardVideoAd();
        return { success: true, message: "Rewarded video shown" };
      } else {
        if (onRewarded) onRewarded();
        return { success: true, message: "Web Preview: Rewarded points granted directly." };
      }
    } catch (error: any) {
      const msg = error?.message || String(error);
      console.log("[AdMob] Reward video note:", error);
      return { success: false, message: msg };
    }
  }

  /**
   * Returns current diagnostic status for debugging
   */
  getDiagnosticInfo() {
    return {
      isNative: Capacitor.isNativePlatform(),
      platform: Capacitor.getPlatform(),
      isInitialized: this.isInitialized,
      isBannerShowing: this.isBannerShowing,
      lastBannerStatus: this.lastBannerStatus,
      lastInterstitialStatus: this.lastInterstitialStatus,
      config: admobConfig,
    };
  }
}

export const nativeAdMob = new NativeAdMobService();

