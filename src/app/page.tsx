"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sparkles, MessageCircle } from "lucide-react";
import { useState } from "react";
import { FeedbackDialog } from "@/components/FeedbackDialog";
import { MainNavigation } from "@/components/MainNavigation";
import { ProfileSettings } from "@/components/ProfileSettings";

export default function Home() {
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState("learn");
  const handleFeedbackSubmit = async (data: { text: string; rating: number }) => {
    // Placeholder: log feedback, integrate API later
    console.log("Feedback submitted:", data);
  };
  const handleSignOut = () => {
    // Placeholder: log sign out, integrate auth later
    console.log("User signed out");
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gradient-to-b from-light-blue via-neutral-0 to-light-red">
      <MainNavigation currentTab={currentTab} onTabChange={setCurrentTab} />
      {/* Header */}
      <header className="w-full flex justify-center py-8">
        <div className="flex items-center gap-3">
          {/* Placeholder for mascot/character */}
          <div className="w-10 h-10 rounded-full bg-genlingo-blue flex items-center justify-center shadow-card animate-bounce">
            <span className="text-2xl" role="img" aria-label="Genlingo Mascot">🇰🇷</span>
          </div>
          <span className="font-heading text-2xl font-bold text-genlingo-blue tracking-tight">Genlingo</span>
        </div>
      </header>

      {/* Main Content by Tab */}
      <main className="flex flex-col items-center flex-1 w-full px-4">
        {currentTab === "learn" && (
          <div className="w-full max-w-content flex flex-col items-center gap-8">
            {/* Hero Illustration Placeholder */}
            <div className="w-full flex justify-center">
              <div className="w-[320px] h-[200px] sm:w-[480px] sm:h-[300px] bg-gradient-to-tr from-genlingo-blue/80 to-genlingo-red/80 rounded-xl shadow-card flex items-center justify-center animate-pulse">
                <span className="text-5xl sm:text-7xl" role="img" aria-label="Korean BBQ Illustration">🍖🎤🛒</span>
              </div>
            </div>
            <h1 className="font-heading text-display-m sm:text-display-d text-genlingo-blue text-center font-bold leading-tight">
              Learn Korean for Real Life
            </h1>
            <p className="font-body text-body-m sm:text-body-d text-neutral-6 text-center max-w-xl">
              Enjoy Korean songs, dramas, and culture like a native! Genlingo makes learning fun, scenario-based, and truly effective.
            </p>
            <Button className="bg-genlingo-blue hover:bg-genlingo-red text-white rounded-genlingo px-8 py-4 text-lg font-bold shadow-button transition-all duration-200 ease-bounce active:scale-95 focus:outline-none focus:ring-4 focus:ring-genlingo-blue/40 animate-bounce" size="lg" data-testid="cta-start">
              <Sparkles className="inline-block mr-2 -mt-1" />
              Start Learning for Free
            </Button>
          </div>
        )}
        {currentTab === "scenarios" && (
          <div className="w-full max-w-content flex flex-col items-center gap-8 py-24">
            <h2 className="font-heading text-h2-m sm:text-h2-d text-genlingo-red font-bold">Scenarios</h2>
            <p className="font-body text-body-m text-neutral-6 text-center">Scenario-based lessons coming soon!</p>
          </div>
        )}
        {currentTab === "profile" && (
          <ProfileSettings
            user={{ name: "Charan", avatarUrl: undefined, level: 5 }}
            onSignOut={handleSignOut}
          />
        )}
        {/* Feature Highlights only on Learn tab */}
        {currentTab === "learn" && (
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-content">
            <div className="bg-white rounded-xl shadow-card p-6 flex flex-col items-center gap-2">
              <Sparkles className="text-genlingo-blue w-8 h-8 mb-1" />
              <span className="font-heading text-lg font-semibold text-genlingo-blue">Learn Real Conversations</span>
              <span className="font-body text-sm text-neutral-5 text-center">Practice scenarios you’ll actually use in Korea.</span>
            </div>
            <div className="bg-white rounded-xl shadow-card p-6 flex flex-col items-center gap-2">
              <Sparkles className="text-genlingo-red w-8 h-8 mb-1" />
              <span className="font-heading text-lg font-semibold text-genlingo-red">Sound Like a Native</span>
              <span className="font-body text-sm text-neutral-5 text-center">Master pronunciation and natural expressions.</span>
            </div>
            <div className="bg-white rounded-xl shadow-card p-6 flex flex-col items-center gap-2">
              <Sparkles className="text-genlingo-accent w-8 h-8 mb-1" />
              <span className="font-heading text-lg font-semibold text-genlingo-accent">Culture Immersion</span>
              <span className="font-body text-sm text-neutral-5 text-center">Learn with music, food, and real-life stories.</span>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full flex flex-col items-center py-8 gap-2 text-neutral-4 text-sm">
        <div className="flex gap-4">
          <a href="#" className="hover:underline">About Us</a>
          <a href="#" className="hover:underline">Privacy Policy</a>
        </div>
        <span>© {new Date().getFullYear()} Genlingo. All rights reserved.</span>
      </footer>

      {/* Floating Feedback Button */}
      <Button
        className="fixed bottom-20 right-6 z-50 bg-genlingo-red hover:bg-genlingo-blue text-white rounded-full w-14 h-14 shadow-lg flex items-center justify-center text-2xl animate-bounce"
        onClick={() => setFeedbackOpen(true)}
        aria-label="Give Feedback"
        data-testid="open-feedback"
      >
        <MessageCircle className="w-7 h-7" />
      </Button>
      <FeedbackDialog
        open={feedbackOpen}
        onOpenChange={setFeedbackOpen}
        onSubmit={handleFeedbackSubmit}
      />
    </div>
  );
}
