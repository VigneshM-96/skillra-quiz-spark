import { motion, AnimatePresence } from "framer-motion";

interface Props {
  type: "correct" | "wrong" | "selected" | null;
}

const emojis = ["🎉", "🌟", "✨", "🏆", "🔥"];
const sadEmojis = ["😢", "💔", "😞"];

export default function AnswerFeedback({ type }: Props) {
  if (!type || type === "selected") return null;

  if (type === "correct") {
    return (
      <AnimatePresence>
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {/* Center text */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.3, 1] }}
                transition={{ duration: 0.5 }}
                className="text-5xl md:text-6xl font-heading font-bold text-success drop-shadow-lg"
              >
                🎉
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg font-heading font-bold text-success mt-2"
              >
                Correct!
              </motion.p>
            </div>
          </motion.div>

          {/* Floating emojis */}
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.span
              key={i}
              initial={{
                x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 400),
                y: (typeof window !== "undefined" ? window.innerHeight : 600) + 40,
                opacity: 1,
                scale: 0.5 + Math.random() * 0.8,
                rotate: 0,
              }}
              animate={{
                y: -80,
                opacity: [1, 1, 0],
                rotate: Math.random() * 360 - 180,
              }}
              transition={{
                duration: 1.2 + Math.random() * 0.6,
                delay: Math.random() * 0.3,
                ease: "easeOut",
              }}
              className="absolute text-2xl md:text-3xl"
            >
              {emojis[i % emojis.length]}
            </motion.span>
          ))}
        </div>
      </AnimatePresence>
    );
  }

  // Wrong answer
  return (
    <AnimatePresence>
      <div className="fixed inset-0 pointer-events-none z-50">
        {/* Screen flash */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.15, 0] }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 bg-destructive"
        />

        {/* Center text */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <motion.div
            animate={{ x: [0, -8, 8, -6, 6, -3, 3, 0] }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.3, 1] }}
              transition={{ duration: 0.5 }}
              className="text-5xl md:text-6xl"
            >
              {sadEmojis[Math.floor(Math.random() * sadEmojis.length)]}
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg font-heading font-bold text-destructive mt-2"
            >
              Oops! Wrong
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
