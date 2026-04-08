import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Trophy, RotateCcw, Home, Sparkles } from "lucide-react";
import { getRecommendedCourse } from "@/data/quizData";

function getMedicalDiscount(score: number): number {
  if (score <= 0) return 0;
  // Max 20% discount for 10/10, reduce by 2% per missed question
  return Math.max(0, 20 - (10 - score) * 2);
}

export default function Result() {
  const { state } = useLocation() as {
    state: { score: number; total: number; slug: string; answers?: number[] } | null;
  };
  const navigate = useNavigate();

  if (!state) {
    navigate("/");
    return null;
  }

  const { score, total, slug, answers } = state;
  const isBootcamp = slug === "bootcamp";

  // Bootcamp: show course recommendation
  const recommendation = isBootcamp && answers ? getRecommendedCourse(answers) : null;

  // Medical: show discount
  const pct = Math.round((score / total) * 100);
  const discount = !isBootcamp ? getMedicalDiscount(score) : 0;

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-card p-8 md:p-12 text-center max-w-md w-full"
      >
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-6">
          {isBootcamp ? (
            <Sparkles className="w-10 h-10 text-foreground" />
          ) : (
            <Trophy className="w-10 h-10 text-foreground" />
          )}
        </div>

        <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
          {isBootcamp ? "Discovery Complete!" : "Quiz Complete!"}
        </h1>
        <p className="text-muted-foreground mb-6">
          {isBootcamp ? "BootCamp Discovery Quiz" : "AI Medical Coding"}
        </p>

        {isBootcamp && recommendation ? (
          <>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-lg bg-primary/10 border border-primary/30 p-6 mb-8"
            >
              <p className="text-4xl mb-3">{recommendation.emoji}</p>
              <p className="text-muted-foreground text-sm mb-2">Based on your performance</p>
              <p className="text-foreground font-heading font-bold text-xl mb-1">
                {recommendation.course}
              </p>
              <p className="text-primary text-sm font-medium">
                is the best course for you!
              </p>
            </motion.div>
          </>
        ) : (
          <>
            <div className="text-6xl font-heading font-bold gradient-text mb-1">
              {score}/{total}
            </div>
            <p className="text-muted-foreground mb-6">{pct}% correct</p>

            {discount > 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="rounded-lg bg-success/10 border border-success/30 p-4 mb-8"
              >
                <p className="text-success font-semibold text-lg">
                  🎉 Congratulations! You earned {discount}% discount
                </p>
              </motion.div>
            ) : (
              <p className="text-muted-foreground mb-8">Better luck next time! Keep practicing.</p>
            )}
          </>
        )}

        <div className="flex gap-3 justify-center">
          <button
            onClick={() => navigate(`/quiz/${slug}`)}
            className="gradient-btn px-5 py-3 flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" /> Restart
          </button>
          <button
            onClick={() => navigate("/")}
            className="glass-card px-5 py-3 flex items-center gap-2 text-foreground hover:ring-2 hover:ring-primary/30 transition-all"
          >
            <Home className="w-4 h-4" /> Home
          </button>
        </div>
      </motion.div>
    </div>
  );
}
