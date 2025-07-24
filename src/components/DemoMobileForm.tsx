import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type DemoMobileFormData = {
  name: string;
  feedback: string;
  level: string;
  agree: boolean;
  gender: string;
};

interface DemoMobileFormProps {
  onSubmit: (data: DemoMobileFormData) => void;
  initial?: Partial<DemoMobileFormData>;
}

const LEVELS = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

export function DemoMobileForm({ onSubmit, initial }: DemoMobileFormProps) {
  const [name, setName] = useState(initial?.name || "");
  const [feedback, setFeedback] = useState(initial?.feedback || "");
  const [level, setLevel] = useState(initial?.level || "");
  const [agree, setAgree] = useState(initial?.agree || false);
  const [gender, setGender] = useState(initial?.gender || "");
  const [touched, setTouched] = useState<{ [k: string]: boolean }>({});
  const [submitted, setSubmitted] = useState(false);

  const errors = {
    name: !name ? "Name is required" : undefined,
    feedback: feedback.length < 5 ? "Feedback must be at least 5 characters" : undefined,
    level: !level ? "Select your level" : undefined,
    agree: !agree ? "You must agree to continue" : undefined,
    gender: !gender ? "Select a gender" : undefined,
  };
  const hasError = Object.values(errors).some(Boolean);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, feedback: true, level: true, agree: true, gender: true });
    setSubmitted(true);
    if (!hasError) {
      onSubmit({ name, feedback, level, agree, gender });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto flex flex-col gap-6 p-4 sm:p-8 bg-white rounded-xl shadow-card"
      autoComplete="off"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="font-heading text-base text-neutral-7 mb-1">Name</label>
        <Input
          id="name"
          className={cn(
            "rounded-lg border-neutral-2 focus:border-genlingo-blue focus:ring-2 focus:ring-genlingo-blue/30 transition-all min-h-[44px] text-base px-4 py-3",
            errors.name && touched.name && "border-error focus:border-error focus:ring-error/30 animate-shake"
          )}
          placeholder="Enter your name"
          value={name}
          onChange={e => setName(e.target.value)}
          onBlur={() => setTouched(t => ({ ...t, name: true }))}
          aria-invalid={!!errors.name}
          aria-describedby="name-error"
        />
        {errors.name && touched.name && (
          <span id="name-error" className="text-error text-sm animate-fade-in">{errors.name}</span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="feedback" className="font-heading text-base text-neutral-7 mb-1">Feedback</label>
        <Textarea
          id="feedback"
          className={cn(
            "rounded-lg border-neutral-2 focus:border-genlingo-red focus:ring-2 focus:ring-genlingo-red/30 transition-all min-h-[64px] text-base px-4 py-3",
            errors.feedback && touched.feedback && "border-error focus:border-error focus:ring-error/30 animate-shake"
          )}
          placeholder="Share your thoughts..."
          value={feedback}
          onChange={e => setFeedback(e.target.value)}
          onBlur={() => setTouched(t => ({ ...t, feedback: true }))}
          aria-invalid={!!errors.feedback}
          aria-describedby="feedback-error"
        />
        {errors.feedback && touched.feedback && (
          <span id="feedback-error" className="text-error text-sm animate-fade-in">{errors.feedback}</span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="level" className="font-heading text-base text-neutral-7 mb-1">Level</label>
        <select
          id="level"
          className={cn(
            "rounded-lg border-neutral-2 focus:border-genlingo-blue focus:ring-2 focus:ring-genlingo-blue/30 transition-all min-h-[44px] text-base px-4 py-3",
            errors.level && touched.level && "border-error focus:border-error focus:ring-error/30 animate-shake"
          )}
          value={level}
          onChange={e => setLevel(e.target.value)}
          onBlur={() => setTouched(t => ({ ...t, level: true }))}
          aria-invalid={!!errors.level}
          aria-describedby="level-error"
        >
          <option value="">Select your level</option>
          {LEVELS.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
        </select>
        {errors.level && touched.level && (
          <span id="level-error" className="text-error text-sm animate-fade-in">{errors.level}</span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-heading text-base text-neutral-7 mb-1">Gender</span>
        <div className="flex gap-4">
          {['male', 'female', 'other'].map(g => (
            <label key={g} className={cn(
              "flex items-center gap-2 rounded-lg px-3 py-2 min-w-[44px] min-h-[44px] cursor-pointer border border-neutral-2 transition-all",
              gender === g && "border-genlingo-accent bg-light-blue/30 scale-105 shadow-card"
            )}>
              <input
                type="radio"
                name="gender"
                value={g}
                checked={gender === g}
                onChange={() => setGender(g)}
                onBlur={() => setTouched(t => ({ ...t, gender: true }))}
                className="accent-genlingo-accent w-5 h-5"
                aria-checked={gender === g}
                aria-invalid={!!errors.gender}
                style={{ minWidth: 20, minHeight: 20 }}
              />
              <span className="capitalize font-body text-base">{g}</span>
            </label>
          ))}
        </div>
        {errors.gender && touched.gender && (
          <span className="text-error text-sm animate-fade-in">{errors.gender}</span>
        )}
      </div>
      <div className="flex items-center gap-2 min-h-[44px]">
        <input
          type="checkbox"
          id="agree"
          checked={agree}
          onChange={e => setAgree(e.target.checked)}
          onBlur={() => setTouched(t => ({ ...t, agree: true }))}
          className="accent-genlingo-blue w-6 h-6 rounded-md border-neutral-2 focus:ring-2 focus:ring-genlingo-blue/30 transition-all"
          aria-checked={agree}
          aria-invalid={!!errors.agree}
          style={{ minWidth: 24, minHeight: 24 }}
        />
        <label htmlFor="agree" className="font-body text-base text-neutral-7 select-none">I agree to the terms</label>
        {errors.agree && touched.agree && (
          <span className="text-error text-sm animate-fade-in ml-2">{errors.agree}</span>
        )}
      </div>
      <Button
        type="submit"
        className="bg-genlingo-blue hover:bg-genlingo-red text-white rounded-genlingo w-full py-3 text-lg font-bold shadow-button transition-all duration-200 ease-bounce active:scale-95 focus:outline-none focus:ring-4 focus:ring-genlingo-blue/40 animate-bounce"
        disabled={hasError && submitted}
        data-testid="demoform-submit"
        style={{ minHeight: 44 }}
      >
        Submit
      </Button>
    </form>
  );
} 