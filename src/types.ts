export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  speechCode: string;
  placeholder: string;
  welcomeMessage: string;
}

export interface Bookmark {
  id: string;
  title: string;
  category: string;
  date: string;
  snippet: string;
  prompt: string;
  tab: string;
}

export interface CourtTemplate {
  id: string;
  title: string;
  urduTitle: string;
  cpcSection: string;
  category: string;
  isUrgent?: boolean;
  description: string;
  courtName?: string;
  suitType?: string;
  notes?: string[];
  contentTemplate: string;
}

export interface DeptField {
  name: string;
  label: string;
  placeholder: string;
  defaultValue: string;
}

export interface DeptSubTemplate {
  id: string;
  title: string;
  urduTitle: string;
  purpose: string;
  fields?: DeptField[];
  content: string;
}

export interface DeptCategory {
  id: string;
  title: string;
  urduTitle: string;
  icon: string;
  color: string;
  description: string;
  templates: DeptSubTemplate[];
}

export interface CourseLesson {
  title: string;
  content: string;
  keyPoints?: string[];
}

export interface CourseModule {
  title: string;
  lessons: CourseLesson[];
}

export interface Course {
  id: string;
  title: string;
  urduTitle: string;
  category: string;
  duration: string;
  icon: string;
  badge: string;
  description: string;
  modules: CourseModule[];
}

export interface Flashcard {
  id: string;
  subject: string;
  title: string;
  formula: string;
  variables: string;
  example: string;
}

export interface FormulaCard {
  id: string;
  name: string;
  subject: string;
  formula: string;
  explanation: string;
}
