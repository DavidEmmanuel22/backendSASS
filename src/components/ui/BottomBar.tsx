
import React, { useState } from "react";
import { useSidebar } from "./sidebar";
import { cn } from "./utils";

export interface BottomBarMenuItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: number;
}

interface BottomBarProps {
  menuItems: BottomBarMenuItem[];
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function BottomBar({ menuItems, activeSection, onSectionChange }: BottomBarProps) {
  const { isMobile } = useSidebar();
  const [showMore, setShowMore] = useState(false);

  if (!isMobile || !menuItems || menuItems.length === 0) return null;

  // Show first 4 items, rest go under 'Más'
  const mainItems = menuItems.slice(0, 4);
  const moreItems = menuItems.slice(4);

  return (
    <>
      <nav
        className={cn(
          "fixed bottom-0 left-0 z-50 flex w-full bg-white border-t border-gray-200 shadow-lg",
          "h-16 flex-row justify-around items-center md:hidden"
        )}
        data-slot="bottom-bar"
      >
        {mainItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full py-2",
                isActive ? "text-teal-600 font-bold" : "text-gray-500"
              )}
              onClick={() => onSectionChange(item.id)}
              aria-label={item.label}
            >
              <div className="relative">
                <Icon className="w-6 h-6" />
                {/* Badge eliminado para evitar desplazamiento del menú */}
              </div>
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          );
        })}
        {moreItems.length > 0 && (
          <button
            className="flex flex-col items-center justify-center flex-1 h-full py-2 text-gray-500"
            onClick={() => setShowMore(true)}
            aria-label="Más"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#888" strokeWidth="2" /><circle cx="8" cy="12" r="1.5" fill="#888" /><circle cx="12" cy="12" r="1.5" fill="#888" /><circle cx="16" cy="12" r="1.5" fill="#888" /></svg>
            <span className="text-xs mt-1">Más</span>
          </button>
        )}
      </nav>
      {/* Modal for more items */}
      {showMore && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-40 md:hidden" onClick={() => setShowMore(false)}>
          <div className="w-full bg-white rounded-t-xl p-4 max-h-[60vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex flex-col gap-2">
              {moreItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    className={cn(
                      "flex items-center gap-3 w-full p-3 rounded-lg",
                      isActive ? "bg-teal-50 text-teal-700 font-bold" : "text-gray-700 hover:bg-gray-50"
                    )}
                    onClick={() => {
                      onSectionChange(item.id);
                      setShowMore(false);
                    }}
                    aria-label={item.label}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="flex-1 text-left truncate">{item.label}</span>
                    {/* Badge eliminado para evitar desplazamiento del menú */}
                  </button>
                );
              })}
            </div>
            <button className="mt-4 w-full py-2 rounded-lg bg-gray-100 text-gray-700" onClick={() => setShowMore(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </>
  );
}
