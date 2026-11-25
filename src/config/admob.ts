// Google AdMob Native Configuration for S.S AI Study Guru (Android / Capacitor)
// App Founder: Shahid Ahmad Sheikh

export interface AdMobConfig {
  appId: string;
  bannerAdUnitId: string;
  testBannerUnitId: string;
  rewardedAdUnitId: string;
  interstitialAdUnitId: string;
  isTestMode: boolean;
}

export const admobConfig: AdMobConfig = {
  // Real AdMob Production IDs for S.S AI Study Guru (Founder: Shahid Ahmad Sheikh)
  appId: "ca-app-pub-4927952652296520~2672176583",
  bannerAdUnitId: "ca-app-pub-4927952652296520/9767912440",
  // Google Official AdMob Test Banner ID (Guaranteed to load test ads instantly on any device)
  testBannerUnitId: "ca-app-pub-3940256099942544/6300978111",
  // Interstitial Ad Unit (from AdMob confirmation email)
  interstitialAdUnitId: "ca-app-pub-4927952652296520/7615551506",
  // Rewarded Video Ad Unit
  rewardedAdUnitId: "ca-app-pub-4927952652296520/8195966006",
  // Production Real Ads Enabled (Set to false for real ads, or true for safe test ads)
  isTestMode: false,
};


