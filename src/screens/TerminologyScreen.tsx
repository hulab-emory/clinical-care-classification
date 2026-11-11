import React from 'react';
import { TerminologyBrowser } from '../components/TerminologyBrowser';

interface TerminologyScreenProps {
  onNavigate: (screen: 'overview' | 'framework' | 'translations' | 'code-builder' | 'terminology' | 'news' | 'about' | 'contact') => void;
  onSelectComponentForBuilder?: (componentCode: string) => void;
  onSelectDiagnosisForBuilder?: (componentCode: string, diagCode: string) => void;
  onSelectInterventionForBuilder?: (componentCode: string, intervCode: string) => void;
}

export const TerminologyScreen: React.FC<TerminologyScreenProps> = ({
  onNavigate,
  onSelectComponentForBuilder,
  onSelectDiagnosisForBuilder,
  onSelectInterventionForBuilder
}) => {
  const handleSelectComponent = (code: string) => {
    if (onSelectComponentForBuilder) {
      onSelectComponentForBuilder(code);
    } else {
      onNavigate('code-builder');
    }
  };

  const handleSelectDiagnosis = (compCode: string, diagCode: string) => {
    if (onSelectDiagnosisForBuilder) {
      onSelectDiagnosisForBuilder(compCode, diagCode);
    } else {
      onNavigate('code-builder');
    }
  };

  const handleSelectIntervention = (compCode: string, intervCode: string) => {
    if (onSelectInterventionForBuilder) {
      onSelectInterventionForBuilder(compCode, intervCode);
    } else {
      onNavigate('code-builder');
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Banner & Breadcrumb */}
      <section className="w-full bg-surface-container-low border-b border-border-subtle py-space-lg px-gutter-lg">
        <div className="max-w-7xl mx-auto space-y-space-md">
          {/* Consistent Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-space-xs text-text-muted font-label-sm text-label-sm">
            <button
              onClick={() => onNavigate('overview')}
              className="hover:text-primary transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">home</span>
              <span>Home</span>
            </button>
            <span className="text-outline-variant">/</span>
            <span className="text-primary font-semibold">Terminology Browser</span>
          </nav>

          {/* Screen Title & Quick CTA */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
            <div className="max-w-3xl space-y-space-xs">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-space-xs py-0.5 rounded text-[11px] font-label-sm uppercase tracking-wider bg-primary text-on-primary font-bold">
                  MASTER ONTOLOGY INDEX
                </span>
                <span className="px-space-xs py-0.5 rounded text-[11px] font-label-sm bg-surface-container-high text-columbia-crown-blue font-bold border border-border-subtle">
                  CCC v2.5 Standard
                </span>
                <span className="text-text-muted text-[12px] font-label-sm">
                  NLM UMLS • SNOMED CT • LOINC Concordance
                </span>
              </div>
              <h1 className="font-headline-xl text-headline-xl text-primary font-bold tracking-tight">
                Clinical Care Classification Terminology Browser
              </h1>
              <p className="font-body-md text-body-md text-text-muted">
                Explore the complete relational architecture of the CCC System across all 21 Care Components, 176 Diagnoses, 546 Interventions, and standardized crosswalk mappings.
              </p>
            </div>

            <button
              onClick={() => onNavigate('code-builder')}
              className="inline-flex items-center gap-2 px-space-lg py-2.5 rounded-lg bg-primary hover:bg-columbia-crown-blue text-on-primary font-label-md text-label-md font-semibold transition-all shadow-sm cursor-pointer self-start lg:self-center shrink-0"
            >
              <span className="material-symbols-outlined text-[18px]">construction</span>
              <span>Open Code Builder</span>
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-space-sm pt-space-xs">
            <div className="bg-surface-card border border-border-subtle px-space-sm py-space-xs rounded-lg shadow-sm flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-text-muted">Components</span>
              <span className="font-headline-sm text-headline-sm font-bold text-primary">21</span>
            </div>
            <div className="bg-surface-card border border-border-subtle px-space-sm py-space-xs rounded-lg shadow-sm flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-text-muted">Diagnoses</span>
              <span className="font-headline-sm text-headline-sm font-bold text-primary">176</span>
            </div>
            <div className="bg-surface-card border border-border-subtle px-space-sm py-space-xs rounded-lg shadow-sm flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-text-muted">Interventions</span>
              <span className="font-headline-sm text-headline-sm font-bold text-primary">546</span>
            </div>
            <div className="bg-surface-card border border-border-subtle px-space-sm py-space-xs rounded-lg shadow-sm flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-text-muted">Action Types</span>
              <span className="font-headline-sm text-headline-sm font-bold text-secondary">4 Atomic</span>
            </div>
            <div className="bg-surface-card border border-border-subtle px-space-sm py-space-xs rounded-lg shadow-sm flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-text-muted">Outcomes</span>
              <span className="font-headline-sm text-headline-sm font-bold text-primary">3-Tier</span>
            </div>
            <div className="bg-surface-card border border-border-subtle px-space-sm py-space-xs rounded-lg shadow-sm flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-text-muted">Crosswalks</span>
              <span className="font-label-sm text-[12px] font-bold text-secondary">SNOMED &amp; LOINC</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Terminology Browser Workspace */}
      <section className="max-w-7xl mx-auto w-full px-gutter-lg py-space-xl">
        <TerminologyBrowser
          onSelectComponent={handleSelectComponent}
          onSelectDiagnosis={handleSelectDiagnosis}
          onSelectIntervention={handleSelectIntervention}
        />
      </section>
    </div>
  );
};
