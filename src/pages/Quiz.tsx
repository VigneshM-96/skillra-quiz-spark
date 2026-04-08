import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import QuestionCard from "@/components/QuestionCard";
import AnswerFeedback from "@/components/AnswerFeedback";
import { getQuestions } from "@/data/quizData";
import { playCorrectSound, playWrongSound } from "@/data/sounds";

const TIMER_SECONDS = 12;

export default function Quiz() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const isBootcamp = slug === "bootcamp";
  const [questions] = useState(() => getQuestions(slug || "bootcamp"));
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(TIMER_SECONDS);
  const [answers, setAnswers] = useState<number[]>([]);
  const [feedbackType, setFeedbackType] = useState<"correct" | "wrong" | "selected" | null>(null);

  const title = isBootcamp ? "BootCamp Discovery Quiz" : "AI Medical Coding";
  const total = questions.length;
  const q = questions[current];

  const goNext = useCallback(() => {
    if (current + 1 >= total) {
      navigate(`/result`, { state: { score, total, slug, answers } });
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setShowResult(false);
      setFeedbackType(null);
      setTimer(TIMER_SECONDS);
    }
  }, [current, total, score, slug, navigate, answers]);

  // Timer
  useEffect(() => {
    if (showResult) return;
    if (timer <= 0) {
      // For bootcamp, record -1 (no answer); for medical, just skip
      if (isBootcamp) {
        setAnswers((prev) => [...prev, -1]);
      }
      setShowResult(true);
      setTimeout(goNext, 1200);
      return;
    }
    const id = setTimeout(() => setTimer((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timer, showResult, goNext, isBootcamp]);

  const handleSelect = (i: number) => {
    if (showResult) return;
    setSelected(i);

    if (isBootcamp) {
      setAnswers((prev) => [...prev, i]);
      playCorrectSound();
      setFeedbackType("selected");
    } else {
      const correct = i === q.correctAnswer;
      if (correct) {
        playCorrectSound();
        setScore((s) => s + 1);
        setFeedbackType("correct");
      } else {
        playWrongSound();
        setFeedbackType("wrong");
      }
    }

    setShowResult(true);
    setTimeout(goNext, 1500);
  };

  const progress = ((current) / total) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-8 max-w-2xl mx-auto">
      {/* Header */}
      <div className="w-full flex items-center justify-between mb-6">
        <button onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-heading text-lg font-semibold text-foreground">{title}</h1>
        <span className="text-sm text-muted-foreground">{current + 1}/{total}</span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 rounded-full bg-muted mb-4 overflow-hidden">
        <div className="progress-bar-fill h-full rounded-full" style={{ width: `${progress}%` }} />
      </div>

      {/* Timer */}
      <motion.div
        key={timer}
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        className={`text-3xl font-heading font-bold mb-6 ${timer <= 3 ? "text-destructive" : "text-foreground"}`}
      >
        {timer}s
      </motion.div>

      {/* Question */}
      <AnimatePresence mode="wait">
        {q && (
          <QuestionCard
            question={q}
            selectedAnswer={selected}
            onSelect={handleSelect}
            showResult={showResult}
            isDiscovery={isBootcamp}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
