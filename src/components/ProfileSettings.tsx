import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { LogOut, Bell, Globe, Info, User } from "lucide-react";
import { useState } from "react";

interface ProfileSettingsProps {
  user?: { name: string; avatarUrl?: string; level?: number };
  onSignOut?: () => void;
}

const SETTINGS = [
  { key: "account", label: "Account Settings", icon: User },
  { key: "notifications", label: "Notification Preferences", icon: Bell, toggle: true },
  { key: "language", label: "App Language", icon: Globe },
  { key: "about", label: "About Genlingo", icon: Info },
];

export function ProfileSettings({ user, onSignOut }: ProfileSettingsProps) {
  const [notifications, setNotifications] = useState(true);
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);

  return (
    <div className="w-full max-w-md mx-auto flex flex-col gap-6">
      {/* Profile Header */}
      <Card className="flex flex-col items-center gap-3 py-8 px-6 bg-white rounded-xl shadow-card">
        <Avatar className="w-20 h-20 mb-2 shadow-card">
          {user?.avatarUrl ? (
            <AvatarImage src={user.avatarUrl} alt={user.name} />
          ) : (
            <AvatarFallback className="bg-genlingo-blue text-white text-3xl">{user?.name?.[0] || "U"}</AvatarFallback>
          )}
        </Avatar>
        <div className="font-heading text-xl font-bold text-genlingo-blue">{user?.name || "Your Name"}</div>
        <div className="flex items-center gap-2 text-genlingo-accent font-body text-sm">
          <span className="font-semibold">Level {user?.level ?? 5}</span>
          <span className="inline-block w-2 h-2 rounded-full bg-genlingo-accent animate-pulse" />
        </div>
      </Card>
      {/* Settings List */}
      <div className="flex flex-col gap-3">
        {SETTINGS.map((item) => {
          const Icon = item.icon;
          return (
            <Card
              key={item.key}
              className="flex items-center justify-between px-5 py-4 rounded-xl hover:bg-light-blue/40 active:bg-light-blue/60 transition-all cursor-pointer group"
              tabIndex={0}
              role="button"
              aria-label={item.label}
              onClick={() => {
                if (item.key === "notifications") setNotifications((n) => !n);
                // Placeholder: handle navigation for other settings
              }}
              data-testid={`settings-${item.key}`}
              style={{ minHeight: 44 }}
            >
              <div className="flex items-center gap-3">
                <Icon className={"w-6 h-6 text-genlingo-blue group-hover:text-genlingo-red transition-all"} />
                <span className="font-body text-base text-neutral-7 group-hover:text-genlingo-red">{item.label}</span>
              </div>
              {item.toggle ? (
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              ) : (
                <span className="text-neutral-4">›</span>
              )}
            </Card>
          );
        })}
        {/* Sign Out Row */}
        <Card
          className="flex items-center justify-between px-5 py-4 rounded-xl hover:bg-light-red/40 active:bg-light-red/60 transition-all cursor-pointer group"
          tabIndex={0}
          role="button"
          aria-label="Sign Out"
          onClick={() => setShowSignOutConfirm(true)}
          data-testid="settings-signout"
          style={{ minHeight: 44 }}
        >
          <div className="flex items-center gap-3">
            <LogOut className="w-6 h-6 text-error group-hover:text-genlingo-red transition-all" />
            <span className="font-body text-base text-error group-hover:text-genlingo-red">Sign Out</span>
          </div>
        </Card>
      </div>
      {/* Sign Out Confirmation */}
      {showSignOutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <Card className="p-8 rounded-xl flex flex-col items-center gap-4 bg-white shadow-card animate-in fade-in zoom-in-90">
            <div className="font-heading text-lg text-genlingo-red font-bold">Sign Out?</div>
            <div className="font-body text-neutral-6 text-center">Are you sure you want to sign out?</div>
            <div className="flex gap-4 mt-2">
              <Button
                className="bg-genlingo-red hover:bg-error text-white rounded-genlingo px-6 py-2 font-bold shadow-button"
                onClick={() => { setShowSignOutConfirm(false); onSignOut?.(); }}
                data-testid="signout-confirm"
              >
                Yes, Sign Out
              </Button>
              <Button
                variant="secondary"
                className="rounded-genlingo px-6 py-2 font-bold"
                onClick={() => setShowSignOutConfirm(false)}
                data-testid="signout-cancel"
              >
                Cancel
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
} 