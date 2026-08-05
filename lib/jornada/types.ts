export type PublicAnswers = {
  name: string;
  email: string;
  relationshipStatus: string;
  ageRange: string;
  relationshipDuration: string;
  discomfortDuration: string;
  therapyHistory: string;
  mainQuestion: string;
  screeningMood: string;
  screeningFunctioning: string;
  screeningIdeation: string;
};

export type PrivateAnswers = {
  sceneConflict: string;
  reactionSelections: string[];
  reactionPurpose: string;
  sceneProximity: string;
  mirrorCriticism: string;
  mirrorTruth: string;
  intentionImpact: string;
  patternHypothesis: string;
  desireFear: string;
  consent: boolean;
};

export type Answers = PublicAnswers & PrivateAnswers;

export type AnswerKey = keyof Answers;
export type AnswerValue = Answers[AnswerKey];
export type SetField = (key: AnswerKey, value: AnswerValue) => void;

export type Step = {
  key: AnswerKey;
  eyebrow: string;
  title: string;
  description: string;
  type:
    | "input"
    | "email"
    | "textarea"
    | "context"
    | "reaction"
    | "mirror"
    | "consent";
  placeholder?: string;
  helper?: string;
  guide?: string;
  fieldLabel?: string;
  secondaryTitle?: string;
  secondaryPlaceholder?: string;
};
