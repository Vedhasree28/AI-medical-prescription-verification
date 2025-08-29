
export enum ActiveSection {
  Dashboard = 'dashboard',
  Interactions = 'interactions',
  Dosage = 'dosage',
  Alternatives = 'alternatives',
  TextAnalysis = 'text-analysis',
}

export interface InteractionResult {
  drugs: string[];
  severity: 'High' | 'Medium' | 'Low' | 'None';
  description: string;
  recommendation: string;
}

export interface DosageResult {
  drugName: string;
  ageGroup: string;
  recommendedDosage: string;
  maxDailyDosage: string;
  considerations: string;
}

export interface AlternativeResult {
  alternative: string;
  reason: string;
  potentialBenefits: string;
}

export interface ExtractedInfo {
    drugName: string;
    dosage: string;
    frequency: string;
    duration: string;
}
