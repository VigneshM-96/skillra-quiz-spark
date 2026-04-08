import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

const SHEET_URL =
  "https://script.google.com/macros/s/AKfycbxZ3HqkhgfgSyMGjz0EuVQ58D0rALar66OcuJsVSSaPJ2lDeXYDGo4k0hSnyXf91zJG/exec";

const ages = Array.from({ length: 87 }, (_, i) => String(i + 14)); // 14–100

interface Props {
  onComplete: () => void;
}

export default function RegistrationPopup({ onComplete }: Props) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [contact, setContact] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim() || !age || !contact.trim()) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      return;
    }

    if (!/^\d{10}$/.test(contact.trim())) {
      toast({ title: "Enter a valid 10-digit contact number", variant: "destructive" });
      return;
    }

    setSubmitting(true);

    const now = new Date();
    const date = now.toLocaleDateString("en-IN");
    const time = now.toLocaleTimeString("en-IN");
    const payload = {
      date,
      time,
      name: name.trim(),
      age,
      contact: contact.trim(),
    };

    try {
      await fetch(SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });

      localStorage.setItem("skillra_user", name.trim());
      toast({ title: "Welcome to Skillra Quiz Mania! 🎉" });
      onComplete();
    } catch {
      toast({ title: "Something went wrong. Please try again.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="glass-card p-8 w-full max-w-md"
        >
          <h2 className="font-heading text-2xl md:text-3xl font-bold gradient-text text-center mb-2">
            Welcome to Skillra! 🚀
          </h2>
          <p className="text-muted-foreground text-sm text-center mb-6">
            Register to start the quiz
          </p>

          <div className="space-y-4">
           <div>
  <label className="text-sm text-muted-foreground mb-1 block">
    Your Name
  </label>

  <Input
    placeholder="Enter your name"
    value={name}
    onChange={(e) => {
      const value = e.target.value;

      // Allow only letters and spaces
      if (/^[A-Za-z ]*$/.test(value)) {
        setName(value);
      }
    }}
    maxLength={50}
    className="bg-muted/50 border-border"
  />

  {/* Validation Message */}
  {name.length > 0 && name.length < 3 && (
    <p className="text-red-500 text-sm mt-1">
      Name must be at least 3 characters
    </p>
  )}
</div>

            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Age</label>
              <Select value={age} onValueChange={setAge}>
                <SelectTrigger className="bg-muted/50 border-border">
                  <SelectValue placeholder="Select your age" />
                </SelectTrigger>
                <SelectContent className="z-[200] max-h-60">
                  {ages.map((a) => (
                    <SelectItem key={a} value={a}>
                      {a}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Contact Number</label>
              <Input
                placeholder="10-digit mobile number"
                value={contact}
                onChange={(e) => setContact(e.target.value.replace(/\D/g, "").slice(0, 10))}
                inputMode="numeric"
                maxLength={10}
                className="bg-muted/50 border-border"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full gradient-btn py-3 text-lg font-heading disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Let's Go! 🎯"}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
