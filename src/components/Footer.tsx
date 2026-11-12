import React from 'react';

interface FooterProps {
  onNavigate: (screen: 'overview' | 'framework' | 'translations' | 'code-builder' | 'terminology' | 'news' | 'about' | 'contact') => void;
  onOpenTerminology: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenTerminology }) => {
  return (
    <footer className="w-full bg-surface-container-lowest border-t border-border-subtle mt-space-xl">
      <div className="max-w-7xl mx-auto px-gutter-lg py-space-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-gutter-lg mb-space-xl">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-space-md">
            <div className="flex items-center gap-space-sm">
              <span className="font-headline-sm text-headline-sm text-primary tracking-tight font-bold">
                Clinical Care Classification System
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-text-muted pr-margin leading-relaxed">
              A standardized, coded nursing terminology that identifies the discrete elements of nursing practice.
              Developed to support electronic health records (EHR) interoperability, clinical decision support, and
              nursing informatics research in partnership with the Emory University School of Nursing.
            </p>
            <div className="flex items-center gap-space-sm text-text-muted">
              <span className="font-label-sm text-label-sm uppercase tracking-wide">Institutional Affiliation:</span>
              <span className="font-label-sm text-label-sm text-columbia-crown-blue font-semibold">
                Emory University School of Nursing
              </span>
            </div>
          </div>

          {/* Framework Links */}
          <div>
            <h4 className="font-label-md text-label-md text-primary uppercase tracking-wider mb-space-md font-semibold">
              Framework
            </h4>
            <ul className="space-y-space-sm font-body-sm text-body-sm text-text-muted">
              <li>
                <button
                  onClick={() => onNavigate('framework')}
                  className="hover:text-primary transition-colors text-left cursor-pointer"
                >
                  Six-Step Model
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('framework')}
                  className="hover:text-primary transition-colors text-left cursor-pointer"
                >
                  21 Care Components
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('terminology')}
                  className="hover:text-primary transition-colors text-left cursor-pointer"
                >
                  Nursing Diagnoses (178)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('terminology')}
                  className="hover:text-primary transition-colors text-left cursor-pointer"
                >
                  Nursing Interventions (546)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('framework')}
                  className="hover:text-primary transition-colors text-left cursor-pointer"
                >
                  Nursing Outcomes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('translations')}
                  className="text-secondary font-semibold hover:text-primary transition-colors text-left cursor-pointer flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[15px]">g_translate</span>
                  <span>Multilingual Translations</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Tools & Tables */}
          <div>
            <h4 className="font-label-md text-label-md text-primary uppercase tracking-wider mb-space-md font-semibold">
              Tools &amp; Tables
            </h4>
            <ul className="space-y-space-sm font-body-sm text-body-sm text-text-muted">
              <li>
                <button
                  onClick={() => onNavigate('code-builder')}
                  className="hover:text-primary transition-colors text-left cursor-pointer"
                >
                  Online Code Builder &amp; EHR Export
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('terminology')}
                  className="hover:text-primary transition-colors text-left cursor-pointer"
                >
                  Terminology Browser
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('framework')}
                  className="hover:text-primary transition-colors text-left cursor-pointer"
                >
                  SNOMED CT &amp; LOINC Maps
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('news')}
                  className="hover:text-primary transition-colors text-left cursor-pointer"
                >
                  Downloads &amp; API Specs
                </button>
              </li>
            </ul>
          </div>

          {/* Governance */}
          <div>
            <h4 className="font-label-md text-label-md text-primary uppercase tracking-wider mb-space-md font-semibold">
              Governance
            </h4>
            <ul className="space-y-space-sm font-body-sm text-body-sm text-text-muted">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-primary transition-colors text-left cursor-pointer"
                >
                  About Virginia Saba, EdD
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-primary transition-colors text-left cursor-pointer"
                >
                  Advisory Board
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('news')}
                  className="hover:text-primary transition-colors text-left cursor-pointer"
                >
                  Research Publications
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-primary transition-colors text-left cursor-pointer"
                >
                  Contact &amp; Inquiries
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-primary transition-colors text-left cursor-pointer"
                >
                  Accessibility Statement
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="border-t border-border-subtle pt-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md text-text-muted font-body-sm text-body-sm">
          <div>
            © 2026 Clinical Care Classification System. All rights reserved. Maintained in collaboration with Emory University School of Nursing.
          </div>
          <div className="flex items-center gap-space-lg text-text-muted font-label-sm text-label-sm">
            <button onClick={() => onNavigate('about')} className="hover:text-primary transition-colors cursor-pointer">
              Privacy Policy
            </button>
            <button onClick={() => onNavigate('about')} className="hover:text-primary transition-colors cursor-pointer">
              Terms of Use
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
