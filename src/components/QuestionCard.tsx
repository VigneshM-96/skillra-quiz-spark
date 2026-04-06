import { motion } from "framer-motion";
import { Question } from "@/data/quizData";

interface Props {
  question: Question;
  selectedAnswer: number | null;
  onSelect: (index: number) => void;
  showResult: boolean;
}

const optionLabels = ["A", "B", "C", "D"];

export default function QuestionCard({ question, selectedAnswer, onSelect, showResult }: Props) {
  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.35 }}
      className="w-full"
    >
      <h2 className="font-heading text-xl md:text-2xl font-semibold mb-6 text-foreground">
        {question.question}
      </h2>
      <div className="grid gap-3">
        {question.options.map((option, i) => {
          let classes = "glass-card p-4 cursor-pointer transition-all duration-200 flex items-center gap-3 text-foreground";
          if (showResult) {
            if (i === question.correctAnswer) classes += " !border-success ring-2 ring-success/40";
            else if (i === selectedAnswer) classes += " !border-destructive ring-2 ring-destructive/40";
          } else if (i === selectedAnswer) {
            classes += " ring-2 ring-primary/60 !border-primary";
          } else {
            classes += " hover:ring-2 hover:ring-primary/30";
          }
          return (
            <button
              key={i}
              className={classes}
              onClick={() => !showResult && onSelect(i)}
              disabled={showResult}
            >
              <span className="w-8 h-8 rounded-md flex items-center justify-center text-sm font-bold bg-muted text-muted-foreground shrink-0">
                {optionLabels[i]}
              </span>
              <span className="text-left">{option}</span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
