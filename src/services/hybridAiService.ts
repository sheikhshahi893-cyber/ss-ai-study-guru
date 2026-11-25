import {
  getAI,
  getGenerativeModel,
  GoogleAIBackend,
  InferenceMode,
  InferenceSource,
  type AI,
} from "firebase/ai";
import { hybridAiApp } from "./firebaseService";

export interface HybridStreamResult {
  handled: boolean;
  text: string;
  inferenceSource?: InferenceSource;
}

let aiInstance: AI | null = null;
let hybridCloudDisabledForSession = false;

function getFirebaseAI(): AI | null {
  if (aiInstance) return aiInstance;
  try {
    aiInstance = getAI(hybridAiApp, { backend: new GoogleAIBackend() });
    return aiInstance;
  } catch (err) {
    console.warn("Firebase AI Logic initialization skipped safely:", err);
    return null;
  }
}

function getHybridSystemInstruction(language: string = "hinglish", mode: string = "guru"): string {
  const modeGuidance =
    mode === "legal"
      ? "Focus on Indian legal education, constitutional articles, BNS/BNSS concepts, and add a brief educational disclaimer."
      : mode === "govt"
      ? "Focus on Indian competitive exams (JKSSB, SSC, UPSC, JKPSC) with high-yield dates, articles, and exam facts."
      : mode === "coding"
      ? "Provide clear syntax, practical code examples, and time/space complexity tips."
      : mode === "math"
      ? "Show Given & Formula, clean step-by-step calculation, and final boxed answer."
      : "Teach in clear textbook-grade student-friendly academic style.";

  return `You are "S.S AI Study Guru" (founded and created by Shahid Ahmad Sheikh), an expert educational tutor.
${modeGuidance}

Respond in this structured 3-part textbook layout:
Line 1: A direct 1-sentence plain summary answering the core question.

**Answer:** [Exact answer statement with key terms in bold]

**Explain:**
• **Core Concept:** [1-2 clear sentences explaining the main principle]
• **Key Details / Steps / Formula:** [Key facts, law, steps, or formula]
• **Scoring / Exam Tip:** [High-yield exam tip for full marks]

Language preference: ${language}.
- If 'hinglish': Use natural Roman Urdu / Hinglish.
- If 'urdu': Use standard Urdu script (اردو).
- If 'hindi': Use standard Hindi script (हिन्दी).
- If 'english': Use clear formal English.
- If 'kashmiri': Use Kashmiri / Urdu script.`;
}

function isConfigOrApiDisabledError(err: unknown): boolean {
  const message = String((err as { message?: string })?.message || err || "").toLowerCase();
  const code = String((err as { code?: string })?.code || "").toLowerCase();
  return (
    message.includes("api has not been used") ||
    message.includes("not enabled") ||
    message.includes("permission_denied") ||
    message.includes("403") ||
    message.includes("firebase ai") ||
    code.includes("api-not-enabled") ||
    code.includes("permission-denied")
  );
}

/**
 * Attempts hybrid inference via Firebase AI Logic (`PREFER_ON_DEVICE` -> On-Device Gemini Nano with In-Cloud Gemini fallback).
 * Returns `{ handled: false }` cleanly on any error or timeout so the existing Express/Wikipedia/Offline pipeline runs without disruption.
 */
export async function tryHybridInferenceStream(
  query: string,
  language: string = "hinglish",
  mode: string = "guru",
  onChunk: (accumulatedText: string) => void
): Promise<HybridStreamResult> {
  if (typeof window === "undefined") {
    return { handled: false, text: "" };
  }

  const ai = getFirebaseAI();
  if (!ai) {
    return { handled: false, text: "" };
  }

  const isOffline = typeof navigator !== "undefined" && navigator.onLine === false;

  // When offline or when cloud API is disabled, try local on-device inference only (zero network wait).
  const inferenceMode =
    isOffline || hybridCloudDisabledForSession
      ? InferenceMode.ONLY_ON_DEVICE
      : InferenceMode.PREFER_ON_DEVICE;

  const controller = typeof AbortController !== "undefined" ? new AbortController() : null;
  let receivedFirstChunk = false;
  const firstChunkWatchdog = controller
    ? setTimeout(() => {
        if (!receivedFirstChunk) {
          try {
            controller.abort();
          } catch {}
        }
      }, isOffline ? 2000 : 6500)
    : null;

  try {
    const model = getGenerativeModel(ai, {
      mode: inferenceMode,
      inCloudParams: {
        model: "gemini-3.5-flash-lite",
        systemInstruction: getHybridSystemInstruction(language, mode),
        generationConfig: {
          maxOutputTokens: 1600,
        },
      },
    });

    const streamResult = await model.generateContentStream(
      query,
      controller ? { signal: controller.signal } : undefined
    );

    let accumulated = "";
    let detectedSource: InferenceSource | undefined;

    for await (const chunk of streamResult.stream) {
      if (chunk.inferenceSource) {
        detectedSource = chunk.inferenceSource;
      }
      const chunkText = chunk.text();
      if (chunkText) {
        if (!receivedFirstChunk) {
          receivedFirstChunk = true;
          if (firstChunkWatchdog) clearTimeout(firstChunkWatchdog);
        }
        accumulated += chunkText;
        onChunk(accumulated);
      }
    }

    if (firstChunkWatchdog) clearTimeout(firstChunkWatchdog);

    if (accumulated.trim().length > 10) {
      return {
        handled: true,
        text: accumulated,
        inferenceSource: detectedSource,
      };
    }

    const finalResponse = await streamResult.response;
    const finalText = finalResponse.text();
    if (finalText && finalText.trim().length > 10) {
      onChunk(finalText);
      return {
        handled: true,
        text: finalText,
        inferenceSource: finalResponse.inferenceSource ?? detectedSource,
      };
    }

    return { handled: false, text: "" };
  } catch (err) {
    if (firstChunkWatchdog) clearTimeout(firstChunkWatchdog);
    if (!hybridCloudDisabledForSession && isConfigOrApiDisabledError(err)) {
      hybridCloudDisabledForSession = true;
    }
    return { handled: false, text: "" };
  }
}

export interface HybridCheatSheetResult {
  topicTitle: string;
  quickSummary: string;
  guaranteedQuestions: Array<{
    question: string;
    highYieldAnswer: string;
    marksWeightage: string;
  }>;
  formulaVault: Array<{
    name: string;
    formula: string;
    variables: string;
    tip: string;
  }>;
  examinerTraps: Array<{
    trap: string;
    howToAvoid: string;
  }>;
  oneLineMemoryTrick: string;
  disclaimer: string;
}

/**
 * Generates a structured 5-Minute Cheat Sheet via Firebase AI Logic Hybrid Inference,
 * returning null cleanly if unavailable so `/api/cheat-sheet` handles it seamlessly.
 */
export async function tryHybridCheatSheet(
  topic: string,
  grade: string,
  language: string
): Promise<HybridCheatSheetResult | null> {
  if (typeof window === "undefined") return null;

  const ai = getFirebaseAI();
  if (!ai) return null;

  const isOffline = typeof navigator !== "undefined" && navigator.onLine === false;

  const inferenceMode =
    isOffline || hybridCloudDisabledForSession
      ? InferenceMode.ONLY_ON_DEVICE
      : InferenceMode.PREFER_ON_DEVICE;

  const controller = typeof AbortController !== "undefined" ? new AbortController() : null;
  const timeoutId = controller
    ? setTimeout(() => {
        try {
          controller.abort();
        } catch {}
      }, isOffline ? 2000 : 12000)
    : null;

  try {
    const model = getGenerativeModel(ai, {
      mode: inferenceMode,
      inCloudParams: {
        model: "gemini-3.5-flash-lite",
        generationConfig: {
          responseMimeType: "application/json",
          maxOutputTokens: 1800,
        },
      },
    });

    const prompt = `You are an expert academic tutor creating a 5-Minute Exam Revision & Cheat Sheet in language "${language}" (level hint: "${grade}") for this student question or topic: "${topic}".

STRICT RULES:
1. Auto-detect the TRUE subject directly from "${topic}" (Physics, Chemistry, Biology, Mathematics, History, Civics/Polity, Computer Science, or Legal/Law) — even if the level is "General Study".
   - IMPORTANT: "Ohm's Law", "Newton's Laws", "Snell's Law", "Boyle's Law", "Coulomb's Law" are SCIENCE (Physics/Chemistry), NEVER Legal/Law!
   - NEVER include unrelated legal terms (like Actus Reus, Mens Rea, Court Jurisdiction, or Statutory Sections) in Science, Math, or History topics.
2. Provide 100% real, textbook-accurate content:
   - "quickSummary": Direct, accurate definition and core explanation answering the exact question/topic.
   - "guaranteedQuestions": Real exam questions with complete step-by-step answers (and derivations/proofs where relevant).
   - "formulaVault": Real mathematical formulas, derivations, chemical equations, or key laws with exact SI units and variable meanings (no generic placeholder text). If a History/Literature topic has no math formula, include key dates/constitutional articles or leave empty array [].
   - "examinerTraps": Real common mistake students make on this exact topic and how to avoid it.
   - "oneLineMemoryTrick": A genuine, practical memory trick or mnemonic for this topic.

Return ONLY valid JSON matching this exact schema:
{
  "topicTitle": "string",
  "quickSummary": "string",
  "guaranteedQuestions": [{ "question": "string", "highYieldAnswer": "string", "marksWeightage": "string" }],
  "formulaVault": [{ "name": "string", "formula": "string", "variables": "string", "tip": "string" }],
  "examinerTraps": [{ "trap": "string", "howToAvoid": "string" }],
  "oneLineMemoryTrick": "string",
  "disclaimer": "S.S AI Study Guru • 5-Minute Revision Sheet"
}`;

    const result = await model.generateContent(
      prompt,
      controller ? { signal: controller.signal } : undefined
    );

    if (timeoutId) clearTimeout(timeoutId);

    const rawText = result.response.text().trim();
    const cleaned = rawText.replace(/^```json\s*/i, "").replace(/```$/i, "").trim();
    const parsed = JSON.parse(cleaned) as HybridCheatSheetResult;
    if (parsed && parsed.topicTitle && Array.isArray(parsed.guaranteedQuestions)) {
      return parsed;
    }
    return null;
  } catch (err) {
    if (timeoutId) clearTimeout(timeoutId);
    if (!hybridCloudDisabledForSession && isConfigOrApiDisabledError(err)) {
      hybridCloudDisabledForSession = true;
    }
    return null;
  }
}
