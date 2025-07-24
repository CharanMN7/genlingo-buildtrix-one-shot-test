import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { X, Smile, Meh, Frown, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeedbackDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (feedback: { text: string; rating: number }) => Promise<void> | void;
}

const emojiOptions = [
  { icon: <Smile className="w-7 h-7" />, label: "Great", value: 5 },
  { icon: <Star className="w-7 h-7" />, label: "Good", value: 4 },
  { icon: <Meh className="w-7 h-7" />, label: "Okay", value: 3 },
  { icon: <Frown className="w-7 h-7" />, label: "Bad", value: 2 },
];

export function FeedbackDialog({ open, onOpenChange, onSubmit }: FeedbackDialogProps) {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await onSubmit({ text: feedback, rating: rating ?? 0 });
    setSubmitting(false);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setFeedback("");
      setRating(null);
      onOpenChange(false);
    }, 1800);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-xl p-0 overflow-hidden animate-in fade-in zoom-in-90">
        <form onSubmit={handleSubmit} className="flex flex-col gap-0">
          <DialogHeader className="flex flex-row items-center justify-between px-6 pt-6 pb-2">
            <DialogTitle className="font-heading text-xl text-genlingo-red">Share Your Thoughts</DialogTitle>
            <DialogClose asChild>
              <Button type="button" variant="ghost" size="icon" className="rounded-full hover:bg-light-red focus:outline-none focus:ring-2 focus:ring-genlingo-red">
                <X className="w-5 h-5 text-genlingo-red" />
              </Button>
            </DialogClose>
          </DialogHeader>
          <DialogDescription className="px-6 text-neutral-5 pb-2">
            We’d love your feedback! How do you feel about Genlingo so far?
          </DialogDescription>
          <div className="flex flex-row items-center justify-center gap-3 py-2">
            {emojiOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                aria-label={opt.label}
                className={cn(
                  "transition-all duration-200 ease-bounce rounded-full p-2 border-2 border-transparent bg-neutral-1 hover:bg-light-red focus:outline-none focus:ring-2 focus:ring-genlingo-red",
                  rating === opt.value && "scale-110 border-genlingo-red bg-light-red shadow-card"
                )}
                onClick={() => setRating(opt.value)}
                data-testid={`feedback-emoji-${opt.value}`}
              >
                {opt.icon}
              </button>
            ))}
          </div>
          <div className="px-6 pb-4">
            <Textarea
              className="rounded-lg border-neutral-2 focus:border-genlingo-blue focus:ring-2 focus:ring-genlingo-blue/30 transition-all min-h-[96px] text-base"
              placeholder="Type your feedback here..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
              minLength={5}
              maxLength={500}
              data-testid="feedback-textarea"
              disabled={submitting || success}
            />
          </div>
          <div className="px-6 pb-6 flex flex-col gap-2">
            <Button
              type="submit"
              className="bg-genlingo-red hover:bg-genlingo-blue text-white rounded-genlingo w-full py-3 text-lg font-bold shadow-button transition-all duration-200 ease-bounce active:scale-95 focus:outline-none focus:ring-4 focus:ring-genlingo-red/40 animate-bounce"
              disabled={submitting || !feedback || !rating}
              data-testid="feedback-submit"
            >
              {submitting ? "Submitting..." : "Submit Feedback"}
            </Button>
            {success && (
              <div className="flex flex-col items-center gap-1 animate-in fade-in zoom-in-90">
                <Smile className="w-8 h-8 text-genlingo-blue animate-bounce" />
                <span className="text-genlingo-blue font-heading font-semibold">Thank you for your feedback!</span>
              </div>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 