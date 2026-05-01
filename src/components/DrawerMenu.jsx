import { X, Home, Vote, BarChart3, Info, HelpCircle, LogOut, User } from 'lucide-react';
import { SCREENS } from '../constants';

const MENU_ITEMS = [
  { icon: Home,      label: 'Home',        sub: 'Home screen',               screen: 'home' },
  { icon: Vote,      label: 'Cast Vote',   sub: 'Vote for a candidate',      screen: 'candidates' },
  { icon: BarChart3, label: 'Live Results',sub: 'See vote tallies',           screen: 'results' },
  { icon: Info,      label: 'About ECI',  sub: 'About Election Commission',  screen: 'info' },
  { icon: HelpCircle,label: 'FAQ',        sub: 'Frequently Asked Questions', screen: 'info' },
];

export default function DrawerMenu({ isOpen, onClose, nav }) {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/40" onClick={onClose} />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 left-0 h-full w-72 z-50 flex flex-col shadow-2xl transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ background: '#fff' }}>

        {/* Profile header */}
        <div className="px-5 pt-10 pb-6 flex items-center gap-4 relative"
          style={{ background: 'linear-gradient(135deg, #1a237e, #283593)' }}>
          <button onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white p-1">
            <X size={20} />
          </button>
          <div className="w-14 h-14 rounded-full bg-saffron-500 flex items-center justify-center text-white font-bold text-xl"
            style={{ background: '#FF9933' }}>
            <User size={26} />
          </div>
          <div>
            <p className="text-white font-bold text-sm">Indian Voter</p>
            <p className="text-blue-200 text-xs">voter@electiq.in</p>
          </div>
        </div>

        {/* Nav items */}
        <div className="flex-1 py-4">
          {MENU_ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <button key={i} onClick={() => nav(item.screen)}
                className="w-full flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors text-left">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: '#eef0fb' }}>
                  <Icon size={20} style={{ color: '#1565c0' }} />
                </div>
                <div>
                  <p className="font-semibold text-sm" style={{ color: '#1a237e' }}>{item.label}</p>
                  <p className="text-xs text-slate-400">{item.sub}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Logo + logout */}
        <div className="px-5 pb-8 border-t border-slate-100 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-xl">🇮🇳</span>
              <span className="font-extrabold text-lg" style={{ color: '#1a237e' }}>
                ELECT<span style={{ color: '#FF9933' }}>IQ</span>
              </span>
            </div>
            <button className="flex items-center gap-2 text-slate-500 text-sm hover:text-red-500 transition-colors">
              <LogOut size={16} /> Sign Out
            </button>
          </div>
          <p className="text-xs text-slate-400 mt-1">भारत का चुनाव शिक्षा मंच</p>
        </div>
      </div>
    </>
  );
}
