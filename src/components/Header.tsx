import React, { useState } from 'react';

interface HeaderProps {
  currentScreen: 'overview' | 'framework' | 'translations' | 'code-builder' | 'terminology' | 'news' | 'about' | 'contact';
  onNavigate: (screen: 'overview' | 'framework' | 'translations' | 'code-builder' | 'terminology' | 'news' | 'about' | 'contact') => void;
  onOpenTerminology: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentScreen, onNavigate, onOpenTerminology }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-surface/95 backdrop-blur-xl border-b border-border-subtle shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-20 max-w-7xl mx-auto px-gutter-lg flex items-center justify-between gap-gutter">
        {/* Brand */}
        <div className="flex items-center gap-space-lg">
          <button
            onClick={() => onNavigate('overview')}
            className="flex items-center group text-left cursor-pointer focus:outline-none"
          >
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-space-xs">
                <span className="font-headline-sm text-headline-sm text-primary tracking-tight font-bold group-hover:text-columbia-crown-blue transition-colors">
                  CCC System
                </span>
                <span className="px-space-xs py-0.5 rounded text-[10px] font-label-sm font-semibold uppercase bg-surface-container-high text-columbia-crown-blue border border-border-subtle">
                  v2.5
                </span>
              </div>
              <span className="font-label-sm text-[11px] text-text-muted leading-tight">
                Clinical Care Classification
              </span>
            </div>
          </button>
        </div>

        {/* Navigation Desktop */}
        <nav className="hidden xl:flex items-center gap-space-sm">
          <button
            onClick={() => onNavigate('overview')}
            className={`px-space-sm py-space-xs font-label-md text-label-md rounded-lg transition-colors cursor-pointer ${
              currentScreen === 'overview'
                ? 'bg-surface-container text-primary font-semibold'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => onNavigate('framework')}
            className={`px-space-sm py-space-xs font-label-md text-label-md rounded-lg transition-colors cursor-pointer ${
              currentScreen === 'framework' || currentScreen === 'translations'
                ? 'bg-surface-container text-primary font-semibold'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
            }`}
          >
            Framework
          </button>

          <button
            onClick={() => onNavigate('news')}
            className={`px-space-sm py-space-xs font-label-md text-label-md rounded-lg transition-colors cursor-pointer ${
              currentScreen === 'news'
                ? 'bg-surface-container text-primary font-semibold'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
            }`}
          >
            News
          </button>

          <button
            onClick={() => onNavigate('about')}
            className={`px-space-sm py-space-xs font-label-md text-label-md rounded-lg transition-colors cursor-pointer ${
              currentScreen === 'about'
                ? 'bg-surface-container text-primary font-semibold'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
            }`}
          >
            About
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-space-sm">
          <button
            onClick={() => onNavigate('code-builder')}
            className={`inline-flex items-center justify-center px-space-md py-space-xs rounded-lg font-label-md text-label-md font-semibold transition-colors shadow-sm cursor-pointer ${
              currentScreen === 'code-builder'
                ? 'bg-columbia-crown-blue text-on-primary ring-2 ring-primary/30'
                : 'bg-primary hover:bg-columbia-crown-blue text-on-primary'
            }`}
          >
            Online Code Builder
          </button>

          <button
            onClick={() => onNavigate('terminology')}
            className={`inline-flex items-center justify-center px-space-md py-space-xs rounded-lg font-label-md text-label-md font-semibold transition-colors shadow-xs cursor-pointer border ${
              currentScreen === 'terminology'
                ? 'bg-columbia-crown-blue text-on-primary ring-2 ring-primary/30 border-columbia-crown-blue'
                : 'bg-surface-container-high hover:bg-surface-container text-primary border-border-subtle'
            }`}
            title="Browse all 21 Components, Diagnoses, Interventions, and Crosswalks"
          >
            Terminology Browser
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg text-primary hover:bg-surface-container-low"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-surface-card border-b border-border-subtle px-gutter-lg py-space-md space-y-2 shadow-lg">
          <button
            onClick={() => {
              onNavigate('overview');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-space-sm py-2 rounded-lg font-label-md ${
              currentScreen === 'overview' ? 'bg-surface-container text-primary font-bold' : 'text-on-surface-variant'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => {
              onNavigate('framework');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-space-sm py-2 rounded-lg font-label-md ${
              currentScreen === 'framework' ? 'bg-surface-container text-primary font-bold' : 'text-on-surface-variant'
            }`}
          >
            Framework
          </button>
          <button
            onClick={() => {
              onNavigate('news');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-space-sm py-2 rounded-lg font-label-md ${
              currentScreen === 'news' ? 'bg-surface-container text-primary font-bold' : 'text-on-surface-variant'
            }`}
          >
            News &amp; Publications
          </button>
          <button
            onClick={() => {
              onNavigate('about');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-space-sm py-2 rounded-lg font-label-md ${
              currentScreen === 'about' ? 'bg-surface-container text-primary font-bold' : 'text-on-surface-variant'
            }`}
          >
            About &amp; Governance
          </button>
          <div className="pt-2 border-t border-border-subtle flex flex-col gap-2">
            <button
              onClick={() => {
                onNavigate('code-builder');
                setMobileMenuOpen(false);
              }}
              className="w-full text-center py-2.5 rounded-lg bg-primary hover:bg-columbia-crown-blue text-on-primary font-label-md font-semibold transition-colors shadow-sm cursor-pointer"
            >
              Online Code Builder
            </button>
            <button
              onClick={() => {
                onNavigate('terminology');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-center py-2.5 rounded-lg font-label-md font-semibold transition-colors shadow-sm cursor-pointer ${
                currentScreen === 'terminology'
                  ? 'bg-columbia-crown-blue text-on-primary'
                  : 'bg-surface-container-high hover:bg-surface-container text-primary border border-border-subtle'
              }`}
            >
              Terminology Browser
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
