export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // For medical quiz: the correct answer index. For bootcamp: unused (all answers are valid personality choices)
}

export interface QuizData {
  title: string;
  slug: string;
  description: string;
  questions: Question[];
}

// Bootcamp Discovery Quiz - answers map to categories:
// 0 (A) → Tech/AI/Flutter, 1 (B) → Design/Canva, 2 (C) → Tally/Accounting, 3 (D) → Digital Marketing
export const defaultBootcampQuestions: Question[] = [
  { id: "bc1", question: "What do you enjoy doing in your free time?", options: ["Exploring apps / tech tools", "Designing posts / editing photos", "Watching business or finance content", "Posting or scrolling social media"], correctAnswer: 0 },
  { id: "bc2", question: "Which activity sounds most interesting?", options: ["Creating something using AI tools", "Designing posters or logos", "Managing money or budgets", "Running an Instagram page"], correctAnswer: 0 },
  { id: "bc3", question: "How do you usually solve a problem?", options: ["Use tools or Google solutions", "Think creatively", "Calculate and analyze", "Ask people / communicate"], correctAnswer: 0 },
  { id: "bc4", question: "What type of career do you prefer?", options: ["Tech-based future career", "Creative field", "Finance/business role", "Marketing/social media"], correctAnswer: 0 },
  { id: "bc5", question: "What excites you more?", options: ["AI, apps, and technology", "Colors, design, creativity", "Business and money management", "Influencing people online"], correctAnswer: 0 },
  { id: "bc6", question: "Which skill would you love to learn?", options: ["AI tools / app building", "Graphic design", "Accounting / Tally", "Digital marketing"], correctAnswer: 0 },
  { id: "bc7", question: "How do you like working?", options: ["Experimenting with tools", "Creative freedom", "Structured and number-based", "Interactive with people"], correctAnswer: 0 },
  { id: "bc8", question: "What kind of content do you consume most?", options: ["Tech / AI videos", "Design / reels / edits", "Finance / business", "Influencers / social media"], correctAnswer: 0 },
  { id: "bc9", question: "What is your goal after learning a skill?", options: ["Build something using tech", "Create visually appealing content", "Manage business/accounts", "Grow a page or brand"], correctAnswer: 0 },
  { id: "bc10", question: "Which role sounds closest to you?", options: ["Tech creator", "Designer", "Accountant", "Marketer"], correctAnswer: 0 },
];

export const defaultMedicalQuestions: Question[] = [
  { id: "mc1", question: "What is the full form of ICD?", options: ["International Classification of Diseases", "Indian Code of Diagnosis", "Internal Classification of Disorders", "International Coding Directory"], correctAnswer: 0 },
  { id: "mc2", question: "Which organ pumps blood throughout the body?", options: ["Lungs", "Liver", "Heart", "Kidney"], correctAnswer: 2 },
  { id: "mc3", question: "What does BP stand for in medical terms?", options: ["Body Pain", "Blood Pressure", "Bone Problem", "Brain Pulse"], correctAnswer: 1 },
  { id: "mc4", question: "Which vitamin is obtained from sunlight?", options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"], correctAnswer: 3 },
  { id: "mc5", question: "What is the normal human body temperature?", options: ["95°F", "98.6°F", "100°F", "102°F"], correctAnswer: 1 },
  { id: "mc6", question: "Which blood cells fight infections?", options: ["Red Blood Cells", "White Blood Cells", "Platelets", "Plasma"], correctAnswer: 1 },
  { id: "mc7", question: "What does an ECG measure?", options: ["Brain activity", "Heart activity", "Lung capacity", "Blood sugar"], correctAnswer: 1 },
  { id: "mc8", question: "Which part of the body is affected by asthma?", options: ["Heart", "Stomach", "Lungs", "Liver"], correctAnswer: 2 },
  { id: "mc9", question: "What is the largest organ of the human body?", options: ["Liver", "Brain", "Skin", "Heart"], correctAnswer: 2 },
  { id: "mc10", question: "Which deficiency causes Anaemia?", options: ["Calcium", "Iron", "Vitamin C", "Protein"], correctAnswer: 1 },
];

const STORAGE_KEY_BOOTCAMP = "skillra_bootcamp_questions";
const STORAGE_KEY_MEDICAL = "skillra_medical_questions";

export function getQuestions(slug: string): Question[] {
  const key = slug === "bootcamp" ? STORAGE_KEY_BOOTCAMP : STORAGE_KEY_MEDICAL;
  const defaults = slug === "bootcamp" ? defaultBootcampQuestions : defaultMedicalQuestions;
  try {
    const stored = localStorage.getItem(key);
    if (stored) return JSON.parse(stored);
  } catch {}
  return [...defaults];
}

export function saveQuestions(slug: string, questions: Question[]) {
  const key = slug === "bootcamp" ? STORAGE_KEY_BOOTCAMP : STORAGE_KEY_MEDICAL;
  localStorage.setItem(key, JSON.stringify(questions));
}

// Category mapping for bootcamp discovery quiz
export const CATEGORY_MAP: Record<number, { label: string; course: string; emoji: string }> = {
  0: { label: "Tech / AI", course: "Flutter Development & AI Tools", emoji: "🚀" },
  1: { label: "Design", course: "Canva & Graphic Design Mastery", emoji: "🎨" },
  2: { label: "Accounting", course: "Tally & Accounting Fundamentals", emoji: "📊" },
  3: { label: "Marketing", course: "Digital Marketing & Social Media", emoji: "📱" },
};

export function getRecommendedCourse(answers: number[]): { label: string; course: string; emoji: string } {
  const counts = [0, 0, 0, 0];
  answers.forEach((a) => {
    if (a >= 0 && a <= 3) counts[a]++;
  });
  const maxIdx = counts.indexOf(Math.max(...counts));
  return CATEGORY_MAP[maxIdx];
}
