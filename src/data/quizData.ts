export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface QuizData {
  title: string;
  slug: string;
  description: string;
  questions: Question[];
}

export const defaultBootcampQuestions: Question[] = [
  { id: "bc1", question: "Who was the first President of India?", options: ["Dr. Rajendra Prasad", "Jawaharlal Nehru", "Mahatma Gandhi", "Sardar Patel"], correctAnswer: 0 },
  { id: "bc2", question: "Which river is known as the 'Sorrow of Bihar'?", options: ["Ganga", "Kosi", "Yamuna", "Brahmaputra"], correctAnswer: 1 },
  { id: "bc3", question: "What is the capital of Uttarakhand?", options: ["Haridwar", "Nainital", "Dehradun", "Rishikesh"], correctAnswer: 2 },
  { id: "bc4", question: "Who gave the slogan 'Do or Die'?", options: ["Subhas Chandra Bose", "Bhagat Singh", "Mahatma Gandhi", "Bal Gangadhar Tilak"], correctAnswer: 2 },
  { id: "bc5", question: "Which is the largest state of India by area?", options: ["Madhya Pradesh", "Maharashtra", "Uttar Pradesh", "Rajasthan"], correctAnswer: 3 },
  { id: "bc6", question: "The Jallianwala Bagh massacre took place in which year?", options: ["1917", "1919", "1921", "1930"], correctAnswer: 1 },
  { id: "bc7", question: "Which Indian city is known as the 'Pink City'?", options: ["Jodhpur", "Udaipur", "Jaipur", "Jaisalmer"], correctAnswer: 2 },
  { id: "bc8", question: "Who wrote the Indian national anthem?", options: ["Bankim Chandra Chatterjee", "Rabindranath Tagore", "Sarojini Naidu", "Muhammad Iqbal"], correctAnswer: 1 },
  { id: "bc9", question: "Which is the longest river in India?", options: ["Yamuna", "Godavari", "Brahmaputra", "Ganga"], correctAnswer: 3 },
  { id: "bc10", question: "The Battle of Plassey was fought in which year?", options: ["1757", "1764", "1857", "1947"], correctAnswer: 0 },
];

export const defaultMedicalQuestions: Question[] = [
  { id: "mc1", question: "What does ICD stand for?", options: ["International Classification of Diseases", "International Code of Diagnosis", "Internal Classification of Disorders", "International Coding for Diseases"], correctAnswer: 0 },
  { id: "mc2", question: "Which ICD-10-CM code range covers diseases of the circulatory system?", options: ["A00-B99", "I00-I99", "J00-J99", "K00-K93"], correctAnswer: 1 },
  { id: "mc3", question: "What is the CPT code category for Evaluation and Management?", options: ["00100-01999", "99201-99499", "70010-79999", "80047-89398"], correctAnswer: 1 },
  { id: "mc4", question: "In medical coding, what does 'modifier 25' indicate?", options: ["Bilateral procedure", "Significant, separately identifiable E/M service", "Repeat procedure", "Discontinued procedure"], correctAnswer: 1 },
  { id: "mc5", question: "Which coding system is used for reporting outpatient procedures?", options: ["ICD-10-PCS", "CPT/HCPCS", "DRG", "NDC"], correctAnswer: 1 },
  { id: "mc6", question: "What does the term 'sequela' mean in ICD-10?", options: ["Initial encounter", "Subsequent encounter", "Late effect of a condition", "Acute condition"], correctAnswer: 2 },
  { id: "mc7", question: "Which ICD-10 chapter covers neoplasms?", options: ["Chapter 1", "Chapter 2", "Chapter 5", "Chapter 10"], correctAnswer: 1 },
  { id: "mc8", question: "What is the purpose of a 7th character in ICD-10-CM?", options: ["Specify laterality", "Indicate encounter type", "Specify severity", "Add etiology"], correctAnswer: 1 },
  { id: "mc9", question: "In medical terminology, 'dyspnea' refers to?", options: ["Chest pain", "Difficulty breathing", "Difficulty swallowing", "Irregular heartbeat"], correctAnswer: 1 },
  { id: "mc10", question: "What is the correct ICD-10 code prefix for Type 2 Diabetes?", options: ["E10", "E11", "E13", "E08"], correctAnswer: 1 },
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
