import { Home, BookOpen, User } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { key: "learn", label: "Learn", icon: Home },
  { key: "scenarios", label: "Scenarios", icon: BookOpen },
  { key: "profile", label: "Profile", icon: User },
];

interface MainNavigationProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export function MainNavigation({ currentTab, onTabChange }: MainNavigationProps) {
  return (
    <>
      {/* Mobile: Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 flex sm:hidden bg-white/90 border-t border-neutral-2 shadow-card h-16 justify-around items-center">
        {NAV_ITEMS.map((item) => {
          const active = currentTab === item.key;
          const Icon = item.icon;
          return (
            <button
              key={item.key}
              className={cn(
                "flex flex-col items-center justify-center gap-1 flex-1 h-full transition-all duration-200 ease-bounce focus:outline-none",
                active ? "text-genlingo-blue scale-110" : "text-neutral-4 hover:text-genlingo-red"
              )}
              aria-label={item.label}
              aria-current={active ? "page" : undefined}
              onClick={() => onTabChange(item.key)}
              data-testid={`nav-${item.key}`}
              style={{ minWidth: 44, minHeight: 44 }}
            >
              <Icon className={cn("w-7 h-7 mb-0.5 transition-all", active && "animate-bounce")} />
              <span className="text-xs font-body font-medium">{item.label}</span>
              {active && <span className="block w-2 h-2 rounded-full bg-genlingo-blue mt-0.5 animate-bounce" />}
            </button>
          );
        })}
      </nav>
      {/* Desktop: Left Sidebar */}
      <nav className="hidden sm:flex flex-col fixed top-0 left-0 h-screen w-20 bg-white border-r border-neutral-2 shadow-card items-center py-8 gap-6 z-40">
        {NAV_ITEMS.map((item) => {
          const active = currentTab === item.key;
          const Icon = item.icon;
          return (
            <button
              key={item.key}
              className={cn(
                "flex flex-col items-center gap-1 w-full py-3 transition-all duration-200 ease-bounce focus:outline-none",
                active ? "text-genlingo-red scale-110" : "text-neutral-4 hover:text-genlingo-blue"
              )}
              aria-label={item.label}
              aria-current={active ? "page" : undefined}
              onClick={() => onTabChange(item.key)}
              data-testid={`nav-${item.key}`}
              style={{ minWidth: 44, minHeight: 44 }}
            >
              <Icon className={cn("w-7 h-7 mb-0.5 transition-all", active && "animate-bounce")} />
              <span className="text-xs font-body font-medium">{item.label}</span>
              {active && <span className="block w-2 h-2 rounded-full bg-genlingo-red mt-0.5 animate-bounce" />}
            </button>
          );
        })}
      </nav>
    </>
  );
} 