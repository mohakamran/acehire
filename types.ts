
export enum InterviewPhase {
  SETUP = 'SETUP',
  INTERVIEW = 'INTERVIEW',
  EVALUATION = 'EVALUATION'
}

export interface CandidateProfile {
  field: string;
  specialization: string;
  level: 'Junior' | 'Mid-level' | 'Senior';
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface EvaluationReport {
  profile: CandidateProfile;
  technicalCompetency: {
    strengths: string[];
    weaknesses: string[];
    depth: 'Low' | 'Medium' | 'High';
  };
  problemSolving: string;
  communication: string;
  redFlags: string[];
  score: number;
  recommendation: 'Strong Hire' | 'Hire' | 'Borderline' | 'No Hire';
  suggestions: string;
}
