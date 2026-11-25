// S.S AI Study Guru - Privacy-first Local Analytics Tracker

export type AnalyticsEvent =
  | "ask_guru_query"
  | "court_stay_generated"
  | "revenue_doc_generated"
  | "formula_solved"
  | "homework_scanned"
  | "audio_played"
  | "pwa_installed";

export function logAppEvent(event: AnalyticsEvent, metadata?: Record<string, any>) {
  if (process.env.NODE_ENV !== "production") {
    console.log(`[S.S Analytics Event]: ${event}`, metadata || {});
  }
  try {
    const history = JSON.parse(localStorage.getItem("ss_study_analytics") || "[]");
    history.push({
      event,
      metadata,
      timestamp: new Date().toISOString(),
    });
    // Keep last 100 events
    if (history.length > 100) history.shift();
    localStorage.setItem("ss_study_analytics", JSON.stringify(history));
  } catch (err) {
    // Fail silently in private browsing mode
  }
}
