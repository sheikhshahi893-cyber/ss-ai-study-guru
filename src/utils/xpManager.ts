export interface UserXPData {
  xp: number;
  level: number;
  levelTitle: string;
  levelBadge: string;
  nextLevelXP: number;
  streakDays: number;
  lastActiveDate: string;
  questionsCount: number;
  notesCount: number;
  voiceCount: number;
}

const STORAGE_KEY = "ss_ai_study_guru_user_xp_v1";

const LEVELS = [
  { level: 1, minXP: 0, nextXP: 100, title: "Scholar Rookie", badge: "🥉" },
  { level: 2, minXP: 100, nextXP: 300, title: "Silver Explorer", badge: "🥈" },
  { level: 3, minXP: 300, nextXP: 600, title: "Class Topper", badge: "🥇" },
  { level: 4, minXP: 600, nextXP: 1000, title: "Master Genius", badge: "💎" },
  { level: 5, minXP: 1000, nextXP: 2500, title: "S.S Gold Scholar", badge: "👑" },
];

export function getLevelDetails(xp: number) {
  let current = LEVELS[0];
  for (const lvl of LEVELS) {
    if (xp >= lvl.minXP) {
      current = lvl;
    }
  }
  return current;
}

export function getUserXP(): UserXPData {
  if (typeof window === "undefined") {
    return {
      xp: 0,
      level: 1,
      levelTitle: "Scholar Rookie",
      levelBadge: "🥉",
      nextLevelXP: 100,
      streakDays: 1,
      lastActiveDate: new Date().toISOString().split("T")[0],
      questionsCount: 0,
      notesCount: 0,
      voiceCount: 0,
    };
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const today = new Date().toISOString().split("T")[0];
    if (raw) {
      const data = JSON.parse(raw);
      const lvl = getLevelDetails(data.xp || 0);

      // Streak calculation
      let streak = data.streakDays || 1;
      if (data.lastActiveDate && data.lastActiveDate !== today) {
        const lastDate = new Date(data.lastActiveDate);
        const currDate = new Date(today);
        const diffDays = Math.round((currDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
        if (diffDays === 1) {
          streak += 1;
        } else if (diffDays > 1) {
          streak = 1;
        }
      }

      return {
        xp: data.xp || 0,
        level: lvl.level,
        levelTitle: lvl.title,
        levelBadge: lvl.badge,
        nextLevelXP: lvl.nextXP,
        streakDays: streak,
        lastActiveDate: today,
        questionsCount: data.questionsCount || 0,
        notesCount: data.notesCount || 0,
        voiceCount: data.voiceCount || 0,
      };
    }
  } catch (e) {
    // fallback
  }

  const today = new Date().toISOString().split("T")[0];
  const initial: UserXPData = {
    xp: 20, // initial welcome bonus
    level: 1,
    levelTitle: "Scholar Rookie",
    levelBadge: "🥉",
    nextLevelXP: 100,
    streakDays: 1,
    lastActiveDate: today,
    questionsCount: 0,
    notesCount: 0,
    voiceCount: 0,
  };
  saveUserXP(initial);
  return initial;
}

export function saveUserXP(data: UserXPData) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent("ss_xp_updated", { detail: data }));
  } catch (e) {
    // ignore
  }
}

export function addXP(
  points: number,
  type: "question" | "notes" | "voice" | "streak" = "question"
): { newXP: UserXPData; leveledUp: boolean; gained: number } {
  const current = getUserXP();
  const oldLevel = current.level;
  const newTotalXP = current.xp + points;
  const lvlDetails = getLevelDetails(newTotalXP);

  const updated: UserXPData = {
    ...current,
    xp: newTotalXP,
    level: lvlDetails.level,
    levelTitle: lvlDetails.title,
    levelBadge: lvlDetails.badge,
    nextLevelXP: lvlDetails.nextXP,
    questionsCount: current.questionsCount + (type === "question" ? 1 : 0),
    notesCount: current.notesCount + (type === "notes" ? 1 : 0),
    voiceCount: current.voiceCount + (type === "voice" ? 1 : 0),
  };

  saveUserXP(updated);
  return {
    newXP: updated,
    leveledUp: lvlDetails.level > oldLevel,
    gained: points,
  };
}
