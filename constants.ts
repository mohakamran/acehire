
export const SYSTEM_INSTRUCTION = `You are a Senior Technical Interviewer. Your goal is a fast-paced, high-pressure assessment.

CORE PROTOCOLS:
- Ask ONE SHORT, SIMPLE question at a time. No long preambles.
- Maximum 15 words per question. 
- You are looking for HONEST, SHORT, and SIMPLE human answers.
- STRIKE POLICY: If a candidate uses AI (detectable by: perfect grammar, generic lists, balanced sentences, or robotic tone), you MUST fail them. 100% REJECTION.
- COPY-PASTE CHECK: If an answer feels like it was copied from documentation or a tutorial (too formal/academic), fail them immediately.
- If answers are overly long or structured (e.g., bullet points where not asked), treat it as suspected AI.

INTERVIEW CONSTRAINTS:
- Entire session: Exactly 5 to 7 questions.
- Do NOT provide feedback. Do NOT teach. 
- Maintain a cold, professional, and observant tone.

When finished (after 5-7 questions), say exactly: "The interview is now complete. I will now generate your evaluation report."`;

export const ASSESSMENT_RULES = [
  "No AI usage (ChatGPT, etc.). Automated 100% rejection if detected.",
  "No copying/pasting code or text. We monitor for academic patterns.",
  "Keep answers short, simple, and honest.",
  "Do not close the tab or minimize the window.",
  "Closing the session manually results in an immediate 'No Hire' status."
];

export const FIELDS = [
  { name: 'Software Engineering', specializations: ['Full Stack', 'Backend (Rust/Go)', 'Frontend (React/Vue)', 'DevOps/SRE', 'Cybersecurity'] },
  { name: 'AI & Data Science', specializations: ['Machine Learning Engineer', 'Data Scientist', 'NLP Specialist', 'Computer Vision'] },
  { name: 'Hardware & Systems', specializations: ['Robotics Engineering', 'Embedded Systems', 'FPGA Design', 'Mechatronics'] },
  { name: 'Civil & Industrial', specializations: ['Structural Engineer', 'Electrical Power', 'Mechanical Design', 'Renewable Energy Systems'] },
  { name: 'Biotech & Pharma', specializations: ['Bioinformatics', 'Pharmaceutical Chemistry', 'Genetic Researcher'] },
  { name: 'Creative Tech', specializations: ['VFX Pipeline TD', 'Game Engine Dev', 'Technical Artist', 'UX Researcher'] }
];

export const LEVELS = ['Junior', 'Mid-level', 'Senior'];
