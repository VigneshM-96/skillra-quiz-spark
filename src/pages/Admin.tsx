import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Plus, Trash2, Save, Lock } from "lucide-react";
import { Question, getQuestions, saveQuestions } from "@/data/quizData";

const ADMIN_PASSWORD = "skillra123";

function generateId() {
  return Math.random().toString(36).slice(2, 9);
}

function QuizEditor({ slug, label }: { slug: string; label: string }) {
  const [questions, setQuestions] = useState<Question[]>(() => getQuestions(slug));

  const update = (idx: number, field: keyof Question, value: any) => {
    setQuestions((prev) => prev.map((q, i) => (i === idx ? { ...q, [field]: value } : q)));
  };

  const updateOption = (qIdx: number, oIdx: number, value: string) => {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === qIdx ? { ...q, options: q.options.map((o, j) => (j === oIdx ? value : o)) } : q
      )
    );
  };

  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      { id: generateId(), question: "", options: ["", "", "", ""], correctAnswer: 0 },
    ]);
  };

  const removeQuestion = (idx: number) => {
    setQuestions((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSave = () => {
    saveQuestions(slug, questions);
    alert("Questions saved!");
  };

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-heading text-xl font-semibold text-foreground">{label}</h2>
        <div className="flex gap-2">
          <button onClick={addQuestion} className="gradient-btn px-3 py-2 text-sm flex items-center gap-1">
            <Plus className="w-4 h-4" /> Add
          </button>
          <button onClick={handleSave} className="gradient-btn-accent px-3 py-2 text-sm flex items-center gap-1">
            <Save className="w-4 h-4" /> Save
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {questions.map((q, qi) => (
          <div key={q.id} className="glass-card p-4">
            <div className="flex items-start justify-between gap-2 mb-3">
              <span className="text-xs text-muted-foreground font-mono">#{qi + 1}</span>
              <button onClick={() => removeQuestion(qi)} className="text-destructive hover:text-destructive/80">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <input
              className="w-full bg-muted/50 rounded-md px-3 py-2 text-foreground text-sm mb-3 border border-border focus:outline-none focus:ring-2 focus:ring-primary/40"
              placeholder="Question text"
              value={q.question}
              onChange={(e) => update(qi, "question", e.target.value)}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
              {q.options.map((opt, oi) => (
                <input
                  key={oi}
                  className="bg-muted/50 rounded-md px-3 py-2 text-foreground text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/40"
                  placeholder={`Option ${oi + 1}`}
                  value={opt}
                  onChange={(e) => updateOption(qi, oi, e.target.value)}
                />
              ))}
            </div>
            <label className="text-xs text-muted-foreground">
              Correct answer:
              <select
                className="ml-2 bg-muted rounded px-2 py-1 text-foreground text-sm border border-border"
                value={q.correctAnswer}
                onChange={(e) => update(qi, "correctAnswer", Number(e.target.value))}
              >
                {q.options.map((_, i) => (
                  <option key={i} value={i}>Option {i + 1}</option>
                ))}
              </select>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Admin() {
  const navigate = useNavigate();
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setAuthed(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-8 max-w-sm w-full text-center"
        >
          <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <Lock className="w-7 h-7 text-muted-foreground" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-foreground mb-4">Admin Access</h1>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="w-full bg-muted/50 rounded-md px-4 py-3 text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary/40 mb-3"
          />
          {error && <p className="text-destructive text-sm mb-3">Incorrect password</p>}
          <button onClick={handleLogin} className="gradient-btn w-full py-3">
            Enter
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8 max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-heading text-2xl font-bold text-foreground">Admin Panel</h1>
      </div>
      <QuizEditor slug="bootcamp" label="BootCamp Quiz Editor" />
      <QuizEditor slug="medical" label="Medical Coding Editor" />
    </div>
  );
}
