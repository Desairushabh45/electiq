import { Home, Vote, BarChart3, Info } from 'lucide-react';

const TABS = [
  { icon: Home,      label: 'Home',    screen: 'home' },
  { icon: Vote,      label: 'Vote',    screen: 'candidates' },
  { icon: BarChart3, label: 'Results', screen: 'results' },
  { icon: Info,      label: 'Info',    screen: 'info' },
];

export default function BottomNav({ screen, nav }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-slate-200 flex shadow-lg">
      {TABS.map((tab, i) => {
        const Icon = tab.icon;
        const active = screen === tab.screen;
        return (
          <button
            key={i}
            onClick={() => nav(tab.screen)}
            className="flex-1 flex flex-col items-center py-3 gap-1 transition-all"
          >
            <Icon
              size={22}
              style={{ color: active ? '#1565c0' : '#94a3b8' }}
            />
            <span
              className="text-xs font-semibold"
              style={{ color: active ? '#1565c0' : '#94a3b8' }}
            >
              {tab.label}
            </span>
            {active && (
              <span className="w-1 h-1 rounded-full"
                style={{ background: '#1565c0' }} />
            )}
          </button>
        );
      })}
    </div>
  );
}
