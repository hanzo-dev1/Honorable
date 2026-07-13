import { useCallback, useMemo, useReducer } from "react";
import { type Answers, FLOW, getStep, resolveNext } from "./flow";
import { validateStep } from "./validate";

type Status = "active" | "submitting" | "submitted" | "error";

interface State {
  path: string[];
  answers: Answers;
  error: string | null;
  status: Status;
  startedAt: number;
  direction: "forward" | "backward";
}

type Action =
  | { type: "RESET" }
  | { type: "ADVANCE"; id: string; value: string }
  | { type: "BACK" }
  | { type: "SET_ERROR"; error: string }
  | { type: "SUBMITTING" }
  | { type: "SUBMITTED" }
  | { type: "SUBMIT_FAILED" };

function makeInitialState(): State {
  return {
    path: ["welcome"],
    answers: {},
    error: null,
    status: "active",
    startedAt: Date.now(),
    direction: "forward",
  };
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "RESET":
      return makeInitialState();
    case "ADVANCE": {
      const answers = { ...state.answers, [action.id]: action.value };
      const nextId = resolveNext(action.id, answers);
      return {
        ...state,
        answers,
        error: null,
        direction: "forward",
        path: [...state.path, nextId],
      };
    }
    case "BACK": {
      if (state.path.length <= 1) return state;
      return { ...state, path: state.path.slice(0, -1), error: null, direction: "backward" };
    }
    case "SET_ERROR":
      return { ...state, error: action.error };
    case "SUBMITTING":
      return { ...state, status: "submitting" };
    case "SUBMITTED":
      return { ...state, status: "submitted" };
    case "SUBMIT_FAILED":
      return { ...state, status: "error" };
    default:
      return state;
  }
}

export function useLeadForm() {
  const [state, dispatch] = useReducer(reducer, undefined, makeInitialState);
  const currentId = state.path[state.path.length - 1];
  const currentStep = getStep(currentId) ?? FLOW[0];

  const advance = useCallback(
    (rawValue: string) => {
      const step = getStep(currentId);
      if (!step) return;
      const err = validateStep(step, rawValue);
      if (err) {
        dispatch({ type: "SET_ERROR", error: err });
        return;
      }
      dispatch({ type: "ADVANCE", id: currentId, value: rawValue.trim() });
    },
    [currentId],
  );

  const back = useCallback(() => dispatch({ type: "BACK" }), []);
  const reset = useCallback(() => dispatch({ type: "RESET" }), []);

  const total = useMemo(() => {
    // Grows from 9 to up to 11 as branch answers come in — see flow.ts.
    let id = FLOW[1].id;
    let count = 0;
    const seen = new Set<string>();
    while (id !== "thanks" && !seen.has(id)) {
      seen.add(id);
      count++;
      id = resolveNext(id, state.answers);
    }
    return count;
  }, [state.answers]);

  const index = useMemo(() => {
    let id = FLOW[1].id;
    let idx = 0;
    const seen = new Set<string>();
    while (id !== currentId && id !== "thanks" && !seen.has(id)) {
      seen.add(id);
      idx++;
      id = resolveNext(id, state.answers);
    }
    return idx + 1;
  }, [currentId, state.answers]);

  return {
    state,
    dispatch,
    currentId,
    currentStep,
    answers: state.answers,
    error: state.error,
    status: state.status,
    path: state.path,
    direction: state.direction,
    startedAt: state.startedAt,
    total,
    index,
    advance,
    back,
    reset,
  };
}

export interface LeadPayload {
  name: string;
  email: string;
  channel: string;
  handle: string;
  role: string;
  has_company: boolean;
  company: string;
  source: string;
  budget: string;
  bottleneck: string;
  experience: string;
  meta: {
    ms_to_complete: number;
    referrer: string;
    ua: string;
    path_taken: string[];
  };
}

export function buildPayload(
  answers: Answers,
  path: string[],
  startedAt: number,
): LeadPayload {
  const channel = answers.channel || "email";
  const handle =
    channel === "email"
      ? answers.email ?? ""
      : (answers[`contact_${channel}`] ?? "");

  return {
    name: answers.name ?? "",
    email: answers.email ?? "",
    channel,
    handle,
    role: answers.role ?? "",
    has_company: answers.has_company === "yes",
    company: answers.company ?? "",
    source: answers.source ?? "",
    budget: answers.budget ?? "",
    bottleneck: answers.bottleneck ?? "",
    experience: answers.experience ?? "",
    meta: {
      ms_to_complete: Date.now() - startedAt,
      referrer: typeof document !== "undefined" ? document.referrer : "",
      ua: typeof navigator !== "undefined" ? navigator.userAgent : "",
      path_taken: path,
    },
  };
}
