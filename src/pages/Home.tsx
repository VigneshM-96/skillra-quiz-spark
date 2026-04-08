import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Compass, Stethoscope, ShieldCheck } from "lucide-react";
import RegistrationPopup from "@/components/RegistrationPopup";

const quizzes = [
  {
    title: "BootCamp Discovery Quiz",
    description: "Find out which course suits you best — Tech, Design, Accounting, or Marketing!",
    icon: Compass,
    path: "/quiz/bootcamp",
    gradient: "from-primary to-secondary",
  },
  {
    title: "AI Medical Coding",
    description: "Test your basic medical & health knowledge — school level questions.",
    icon: Stethoscope,
    path: "/quiz/medical",
    gradient: "from-accent to-primary",
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [registered, setRegistered] = useState(
    () => localStorage.getItem("skillra_registered") === "true"
  );

  return (
    <>
      {!registered && <RegistrationPopup onComplete={() => setRegistered(true)} />}

    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl md:text-7xl font-heading font-bold gradient-text mb-4">
          Skillra Quiz Mania
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto">
          Discover your perfect course or test your knowledge!
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6 w-full max-w-3xl">
        {quizzes.map((q, i) => (
          <motion.button
            key={q.path}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
            whileHover={{ scale: 1.04, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(q.path)}
            className="glass-card p-8 text-left group"
          >
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${q.gradient} flex items-center justify-center mb-5 group-hover:animate-pulse-glow`}>
              <q.icon className="w-7 h-7 text-foreground" />
            </div>
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-2">{q.title}</h2>
            <p className="text-muted-foreground text-sm">{q.description}</p>
          </motion.button>
        ))}
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        onClick={() => navigate("/admin")}
        className="mt-10 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
      >
        <ShieldCheck className="w-4 h-4" /> Admin Panel
      </motion.button>
    </div>
  );
}
