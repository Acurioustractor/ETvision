import { HomeIcon, ChartBarIcon, UserGroupIcon, BookOpenIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const mainTabs = [
  { id: 'vision', label: 'Vision', icon: HomeIcon },
  { id: 'visualisations', label: 'Visuals', icon: ChartBarIcon },
  { id: 'impact', label: 'Impact', icon: UserGroupIcon },
  { id: 'gallery', label: 'Gallery', icon: BookOpenIcon },
  { id: 'phase1', label: 'Phase 1' },
  { id: 'phase2', label: 'Phase 2' },
  { id: 'phase3', label: 'Phase 3' },
  { id: 'invest', label: 'Investment Opportunities' },
];

const bottomTabs = mainTabs.slice(0, 4);
const moreTabs = mainTabs.slice(4);

export function MobileTabBar({ activeTab, setActiveTab }) {
  const [showMore, setShowMore] = useState(false);
  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-t border-gray-200 flex justify-around items-center h-16 shadow-lg md:hidden">
        {bottomTabs.map(tab => (
          <button
            key={tab.id}
            className={`flex flex-col items-center justify-center flex-1 transition-all ${
              activeTab === tab.id ? 'text-indigo-600' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon && <tab.icon className={`h-7 w-7 mb-1 ${activeTab === tab.id ? 'scale-110' : ''}`} />}
            <span className="text-xs font-medium">{tab.label}</span>
            {activeTab === tab.id && (
              <span className="block w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1" />
            )}
          </button>
        ))}
        <button
          className={`flex flex-col items-center justify-center flex-1 transition-all ${
            moreTabs.some(tab => tab.id === activeTab) ? 'text-indigo-600' : 'text-gray-500'
          }`}
          onClick={() => setShowMore(true)}
          aria-label="More"
        >
          <EllipsisHorizontalIcon className="h-7 w-7 mb-1" />
          <span className="text-xs font-medium">More</span>
          {moreTabs.some(tab => tab.id === activeTab) && (
            <span className="block w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1" />
          )}
        </button>
      </nav>
      {showMore && (
        <div className="fixed inset-0 z-50 flex items-end md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowMore(false)} />
          <div className="relative w-full bg-white rounded-t-2xl shadow-2xl p-6 animate-slide-up">
            <div className="flex flex-col gap-3">
              {moreTabs.map(tab => (
                <button
                  key={tab.id}
                  className={`w-full text-left px-4 py-3 rounded-lg text-base font-semibold transition-all ${
                    activeTab === tab.id ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setShowMore(false);
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <button className="mt-6 w-full text-center text-indigo-500 font-semibold" onClick={() => setShowMore(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
} 