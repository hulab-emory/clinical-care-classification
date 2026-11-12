import React, { useState } from 'react';
import { CARE_COMPONENTS, REPOSITORY_SPECS } from '../data/cccData';

interface FrameworkScreenProps {
  onNavigate: (screen: 'overview' | 'framework' | 'translations' | 'code-builder' | 'terminology' | 'news' | 'about' | 'contact') => void;
  onSelectComponentForBuilder?: (componentCode: string) => void;
}

export const FrameworkScreen: React.FC<FrameworkScreenProps> = ({ onNavigate, onSelectComponentForBuilder }) => {
  const [flowMode, setFlowMode] = useState<'bedside-to-agg' | 'agg-to-bedside'>('bedside-to-agg');
  const [selectedCompDetail, setSelectedCompDetail] = useState<string | null>(null);

  const physiologicalComponents = CARE_COMPONENTS.filter(c => c.pattern === 'Physiological');
  const functionalComponents = CARE_COMPONENTS.filter(c => c.pattern === 'Functional');
  const psychologicalComponents = CARE_COMPONENTS.filter(c => c.pattern === 'Psychological');
  const behavioralComponents = CARE_COMPONENTS.filter(c => c.pattern === 'Health Behavioral');

  const handleLaunchComponentInBuilder = (code: string) => {
    if (onSelectComponentForBuilder) {
      onSelectComponentForBuilder(code);
    }
    onNavigate('code-builder');
  };

  const copyCitation = () => {
    const text = 'Saba, V. K., & Emory University School of Nursing. (2026). Clinical Care Classification (CCC) System Manual: A Guide to Nursing Documentation in the Electronic Health Record (Version 2.5). Springer Publishing Company. https://clinicalcareclassification.org/framework/';
    navigator.clipboard.writeText(text);
    alert('Academic citation copied to clipboard!');
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Breadcrumb & Status Ribbon */}
      <section className="w-full bg-surface-container-low py-space-sm px-gutter-lg border-b border-border-subtle">
        <div className="max-w-[1280px] mx-auto flex flex-wrap items-center justify-between gap-space-sm">
          <nav aria-label="Breadcrumb" className="flex items-center gap-space-xs text-text-muted font-label-sm text-label-sm">
            <button
              onClick={() => onNavigate('overview')}
              className="hover:text-primary transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">home</span>
              <span>Home</span>
            </button>
            <span className="text-outline-variant">/</span>
            <span className="text-primary font-semibold">Framework &amp; Architecture</span>
          </nav>

          <div className="flex items-center gap-space-sm">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-code-badge text-code-badge">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              ANA RECOGNIZED TERMINOLOGY
            </span>
            <span className="text-on-surface-variant font-label-sm text-label-sm hidden sm:inline">
              HL7 • SNOMED CT Crosswalk Compatible
            </span>
          </div>
        </div>
      </section>

      {/* Hero & Primary Architecture Overview */}
      <section className="w-full bg-surface py-space-xl px-gutter-lg">
        <div className="max-w-[1280px] mx-auto flex flex-col gap-space-md">
          <div className="flex items-center gap-space-xs text-secondary font-label-md text-label-md">
            <span className="material-symbols-outlined text-[20px]">account_tree</span>
            <span>ENTERPRISE CLINICAL ARCHITECTURE • RELEASE 2.5</span>
          </div>

          <h1 className="font-display-lg text-display-lg text-primary tracking-tight leading-tight">
            The Clinical Care Classification (CCC) System Framework
          </h1>

          <p className="font-body-lg text-body-lg text-text-muted leading-relaxed max-w-4xl">
            Version 2.5 standardized nursing architecture for electronic health records (EHR). An atomic, relational framework
            categorizing nursing practice across 4 hierarchical levels, 4 healthcare patterns, 21 care components, 176 nursing
            diagnoses, 804 nursing interventions, and 528 nursing outcomes.
          </p>

          {/* Quick Metrics Bento Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-space-sm pt-space-sm">
            <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-1 shadow-sm hover:shadow-md transition-shadow">
              <span className="font-headline-xl text-headline-xl text-primary font-bold">4</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">Healthcare Patterns</span>
              <span className="font-code-badge text-code-badge text-secondary font-bold">Level 1 Roots</span>
            </div>
            <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-1 shadow-sm hover:shadow-md transition-shadow">
              <span className="font-headline-xl text-headline-xl text-primary font-bold">21</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">Care Components</span>
              <span className="font-code-badge text-code-badge text-secondary font-bold">Letters A - V</span>
            </div>
            <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-1 shadow-sm hover:shadow-md transition-shadow">
              <span className="font-headline-xl text-headline-xl text-columbia-crown-blue font-bold">176</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">Diagnoses &amp; Problems</span>
              <span className="font-code-badge text-code-badge text-secondary font-bold">Atomic CCCD</span>
            </div>
            <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-1 shadow-sm hover:shadow-md transition-shadow">
              <span className="font-headline-xl text-headline-xl text-columbia-crown-blue font-bold">804</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">Interventions / Actions</span>
              <span className="font-code-badge text-code-badge text-secondary font-bold">201 × 4 Actions</span>
            </div>
            <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-1 shadow-sm hover:shadow-md transition-shadow">
              <span className="font-headline-xl text-headline-xl text-primary font-bold">528</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">Care Outcomes</span>
              <span className="font-code-badge text-code-badge text-secondary font-bold">176 × 3 Qualifiers</span>
            </div>
            <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-1 shadow-sm hover:shadow-md transition-shadow">
              <span className="font-headline-xl text-headline-xl text-secondary font-bold">5-Char</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">Alphanumeric</span>
              <span className="font-code-badge text-code-badge text-secondary font-bold">ICD-10 Style</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-space-sm pt-space-xs">
            <a
              href="#four-levels"
              className="inline-flex items-center gap-2 px-space-lg py-space-sm rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:bg-columbia-crown-blue transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">account_tree</span>
              <span>Interactive Ontology Explorer</span>
            </a>
            <a
              href="#coding-breakdown"
              className="inline-flex items-center gap-2 px-space-lg py-space-sm rounded-lg bg-surface-container-high text-primary font-label-md text-label-md hover:bg-surface-variant transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">terminal</span>
              <span>Code Structure Cheat Sheet</span>
            </a>
            <button
              onClick={() => alert('Clinical Care Classification System v2.5 Specification PDF download initialized.')}
              className="inline-flex items-center gap-2 px-space-md py-space-sm rounded-lg bg-secondary text-on-secondary font-label-md text-label-md hover:bg-on-secondary-container transition-colors shadow-sm cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              <span>Download Framework Model (.PDF)</span>
            </button>
            <button
              onClick={() => onNavigate('translations')}
              className="inline-flex items-center gap-2 px-space-md py-space-sm rounded-lg bg-surface-container text-primary font-label-md text-label-md hover:bg-surface-container-high transition-colors shadow-sm cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">g_translate</span>
              <span>Multilingual Translations &amp; Concordance</span>
            </button>
          </div>
        </div>
      </section>

      {/* Interactive 4 Hierarchical Levels Architecture */}
      <section className="w-full bg-surface-canvas py-space-xl px-gutter-lg" id="four-levels">
        <div className="max-w-[1280px] mx-auto flex flex-col gap-space-xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
            <div className="flex flex-col gap-1 max-w-3xl">
              <span className="font-code-badge text-code-badge text-secondary font-bold tracking-wider uppercase">
                STRUCTURAL HIERARCHY
              </span>
              <h2 className="font-headline-xl text-headline-xl text-primary font-bold">
                Four Hierarchical Levels of the CCC System
              </h2>
              <p className="font-body-md text-body-md text-text-muted">
                The CCC System operates as a bi-directional taxonomy: concepts parse downward to granular bedside EHR
                documentation and aggregate upward to population health patterns.
              </p>
            </div>

            {/* Toggle Flow Mode */}
            <div className="flex items-center gap-1 p-1 bg-surface-container-low rounded-xl border border-border-subtle">
              <button
                onClick={() => setFlowMode('bedside-to-agg')}
                className={`px-3 py-1.5 rounded-lg font-label-sm text-label-sm transition-all cursor-pointer ${
                  flowMode === 'bedside-to-agg'
                    ? 'bg-primary text-on-primary font-bold shadow-sm'
                    : 'text-text-muted hover:text-primary'
                }`}
              >
                Bedside to Aggregate
              </button>
              <button
                onClick={() => setFlowMode('agg-to-bedside')}
                className={`px-3 py-1.5 rounded-lg font-label-sm text-label-sm transition-all cursor-pointer ${
                  flowMode === 'agg-to-bedside'
                    ? 'bg-primary text-on-primary font-bold shadow-sm'
                    : 'text-text-muted hover:text-primary'
                }`}
              >
                Aggregate to Bedside
              </button>
            </div>
          </div>

          {/* 4 Level Hierarchy Flow */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {/* Level 1 */}
            <div className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-space-md group hover:shadow-md transition-all border border-border-subtle">
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-surface-container-high text-primary font-code-badge text-code-badge">
                    LEVEL 1
                  </span>
                  <span className="material-symbols-outlined text-secondary text-[24px]">hub</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-primary font-bold">4 Healthcare Patterns</h3>
                <p className="font-body-sm text-body-sm text-text-muted">
                  Broad theoretical domains synthesizing physiological, psychological, functional, and behavioral clinical scope into unified clinical categories.
                </p>
                <div className="space-y-1.5 pt-space-xs">
                  <span className="flex items-center gap-2 font-label-sm text-label-sm text-primary">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Physiological Pattern
                  </span>
                  <span className="flex items-center gap-2 font-label-sm text-label-sm text-primary">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Psychological Pattern
                  </span>
                  <span className="flex items-center gap-2 font-label-sm text-label-sm text-primary">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Functional Pattern
                  </span>
                  <span className="flex items-center gap-2 font-label-sm text-label-sm text-primary">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Health Behavioral Pattern
                  </span>
                </div>
              </div>
              <div className="pt-space-sm">
                <div className="px-space-sm py-1.5 rounded bg-surface-container-low text-primary font-label-sm text-label-sm flex items-center justify-between">
                  <span>Aggregation Level</span>
                  <span className="font-code-badge text-code-badge text-secondary font-bold">Executive/Research</span>
                </div>
              </div>
            </div>

            {/* Level 2 */}
            <div className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-space-md group hover:shadow-md transition-all border border-border-subtle">
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-surface-container-high text-primary font-code-badge text-code-badge">
                    LEVEL 2
                  </span>
                  <span className="material-symbols-outlined text-secondary text-[24px]">view_comfy</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-primary font-bold">21 Care Components</h3>
                <p className="font-body-sm text-body-sm text-text-muted">
                  Standardized clinical assessment clusters (Letters A through V) mapping all nursing problems and corresponding therapeutic interventions.
                </p>
                <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col gap-1">
                  <div className="flex items-center justify-between text-xs text-text-muted">
                    <span>Alpha Index Range</span>
                    <span className="font-bold text-primary">A — V</span>
                  </div>
                  <p className="font-label-sm text-label-sm text-primary">
                    Activity, Bowel, Cardiac, Neuro, Coping, Fluid, Nutrition, Medication...
                  </p>
                </div>
              </div>
              <div className="pt-space-sm">
                <div className="px-space-sm py-1.5 rounded bg-surface-container-low text-primary font-label-sm text-label-sm flex items-center justify-between">
                  <span>Unit of Measure</span>
                  <span className="font-code-badge text-code-badge text-secondary font-bold">21 Domains</span>
                </div>
              </div>
            </div>

            {/* Level 3 */}
            <div className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-space-md group hover:shadow-md transition-all border border-border-subtle">
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-surface-container-high text-primary font-code-badge text-code-badge">
                    LEVEL 3
                  </span>
                  <span className="material-symbols-outlined text-secondary text-[24px]">reorder</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-primary font-bold">Two Core Terminologies</h3>
                <p className="font-body-sm text-body-sm text-text-muted">
                  Dual distinct relational vocabularies allowing discrete problem diagnosis and active nursing therapy prescription.
                </p>
                <div className="space-y-2 pt-space-xs">
                  <div className="p-space-xs rounded bg-surface-container-low">
                    <div className="font-label-md text-label-md text-primary font-bold">176 Diagnoses</div>
                    <div className="text-xs text-text-muted">Nursing problems &amp; conditions</div>
                  </div>
                  <div className="p-space-xs rounded bg-surface-container-low">
                    <div className="font-label-md text-label-md text-primary font-bold">201 Core Interventions</div>
                    <div className="text-xs text-text-muted">Clinical actions &amp; treatment paths</div>
                  </div>
                </div>
              </div>
              <div className="pt-space-sm">
                <div className="px-space-sm py-1.5 rounded bg-surface-container-low text-primary font-label-sm text-label-sm flex items-center justify-between">
                  <span>Atomic Resolution</span>
                  <span className="font-code-badge text-code-badge text-secondary font-bold">EHR Concepts</span>
                </div>
              </div>
            </div>

            {/* Level 4 */}
            <div className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-space-md group hover:shadow-md transition-all border border-border-subtle">
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-surface-container-high text-primary font-code-badge text-code-badge">
                    LEVEL 4
                  </span>
                  <span className="material-symbols-outlined text-secondary text-[24px]">tune</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-primary font-bold">Concept Qualifiers</h3>
                <p className="font-body-sm text-body-sm text-text-muted">
                  Granular terminal modifiers defining measurable clinical outcomes and precise nursing role functions.
                </p>
                <div className="space-y-2 pt-space-xs">
                  <div className="p-space-xs rounded bg-surface-container-low flex flex-col gap-1">
                    <span className="font-label-sm text-label-sm text-primary font-bold">3 Outcome Qualifiers:</span>
                    <span className="text-xs text-text-muted">.1 Improved, .2 Stabilized, .3 Deteriorated (528 Outcomes)</span>
                  </div>
                  <div className="p-space-xs rounded bg-surface-container-low flex flex-col gap-1">
                    <span className="font-label-sm text-label-sm text-secondary font-bold">4 Action Qualifiers:</span>
                    <span className="text-xs text-text-muted">.1 Assess/Monitor, .2 Care/Perform, .3 Teach, .4 Manage (804 Total)</span>
                  </div>
                </div>
              </div>
              <div className="pt-space-sm">
                <div className="px-space-sm py-1.5 rounded bg-surface-container-low text-primary font-label-sm text-label-sm flex items-center justify-between">
                  <span>Granular Granularity</span>
                  <span className="font-code-badge text-code-badge text-secondary font-bold">Full Expansion</span>
                </div>
              </div>
            </div>
          </div>

          {/* Upward / Downward Aggregation Narrative Banner */}
          <div className="p-space-lg rounded-2xl bg-surface-container-low flex flex-col lg:flex-row items-center justify-between gap-space-lg border border-border-subtle">
            <div className="flex items-start gap-space-md">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-on-primary shrink-0">
                <span className="material-symbols-outlined text-[24px]">swap_vert</span>
              </div>
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm text-primary font-bold">
                  Bi-Directional Informatics Utility
                </span>
                <p className="font-body-sm text-body-sm text-text-muted">
                  Documenting at Level 4 immediately populates atomic FHIR resources, which aggregate automatically through
                  Level 2 components and Level 1 health patterns for hospital-wide clinical quality measures (CQMs) and CMS compliance.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-space-sm shrink-0">
              <a
                href="#matrix-components"
                className="px-space-md py-space-sm rounded-lg bg-surface-container-highest text-primary font-label-md text-label-md hover:bg-surface-variant transition-colors"
              >
                View 21 Components Matrix
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Complete 21 Care Components Matrix by 4 Patterns */}
      <section className="w-full bg-surface py-space-xl px-gutter-lg" id="matrix-components">
        <div className="max-w-[1280px] mx-auto flex flex-col gap-space-xl">
          <div className="flex flex-col gap-space-xs max-w-3xl">
            <div className="flex items-center gap-2 text-secondary font-label-md text-label-md">
              <span className="material-symbols-outlined text-[20px]">grid_view</span>
              <span>COMPREHENSIVE TAXONOMIC MATRIX</span>
            </div>
            <h2 className="font-headline-xl text-headline-xl text-primary font-bold">
              The 21 Care Components by Healthcare Pattern
            </h2>
            <p className="font-body-md text-body-md text-text-muted">
              Every care component acts as a standardized class grouping clinical diagnoses and interventions.
              Click any card to inspect its details or test it in the Code Builder.
            </p>
          </div>

          {/* Pattern 1: Physiological */}
          <div className="flex flex-col gap-space-md">
            <div className="flex items-center justify-between p-space-md rounded-xl bg-surface-container-high border border-border-subtle">
              <div className="flex items-center gap-space-sm">
                <span className="w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center font-headline-sm text-headline-sm font-bold">
                  1
                </span>
                <div className="flex flex-col">
                  <span className="font-headline-sm text-headline-sm text-primary font-bold">Physiological Pattern</span>
                  <span className="font-label-sm text-label-sm text-text-muted">
                    10 Clinical Care Components • Bio-physical bodily systems &amp; clinical homeostasis
                  </span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-surface-container-lowest text-primary font-code-badge text-code-badge">
                10 COMPONENTS
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-space-sm">
              {physiologicalComponents.map((c) => (
                <div
                  key={c.code}
                  onClick={() => handleLaunchComponentInBuilder(c.code)}
                  className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between border border-border-subtle cursor-pointer group"
                >
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="w-7 h-7 rounded bg-primary-fixed text-on-primary-fixed font-headline-sm text-headline-sm flex items-center justify-center font-bold">
                        {c.code}
                      </span>
                      <span className="font-code-badge text-code-badge text-secondary font-bold">CCCD/I</span>
                    </div>
                    <span className="font-headline-sm text-headline-sm text-primary font-bold mt-1 group-hover:text-columbia-crown-blue transition-colors">
                      {c.name}
                    </span>
                    <p className="font-body-sm text-body-sm text-text-muted line-clamp-3">
                      {c.description}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 bg-surface-container-low/50 px-2 py-1 rounded flex items-center justify-between">
                    <span className="text-xs text-secondary font-label-sm text-label-sm">Code Root: {c.codeRoot}</span>
                    <span className="material-symbols-outlined text-[14px] text-text-muted group-hover:translate-x-0.5 transition-transform">
                      arrow_forward
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pattern 2 & 3: Functional & Psychological Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
            {/* Pattern 2: Functional */}
            <div className="flex flex-col gap-space-md">
              <div className="flex items-center justify-between p-space-md rounded-xl bg-surface-container-high border border-border-subtle">
                <div className="flex items-center gap-space-sm">
                  <span className="w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center font-headline-sm text-headline-sm font-bold">
                    2
                  </span>
                  <div className="flex flex-col">
                    <span className="font-headline-sm text-headline-sm text-primary font-bold">Functional Pattern</span>
                    <span className="font-label-sm text-label-sm text-text-muted">
                      3 Components • Daily living &amp; kinetic independence
                    </span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-surface-container-lowest text-primary font-code-badge text-code-badge">
                  3 COMPONENTS
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm">
                {functionalComponents.map((c) => (
                  <div
                    key={c.code}
                    onClick={() => handleLaunchComponentInBuilder(c.code)}
                    className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between border border-border-subtle cursor-pointer group"
                  >
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <span className="w-7 h-7 rounded bg-secondary-container text-on-secondary-container font-headline-sm text-headline-sm flex items-center justify-center font-bold">
                          {c.code}
                        </span>
                        <span className="font-code-badge text-code-badge text-secondary font-bold">{c.codeRoot}</span>
                      </div>
                      <span className="font-headline-sm text-headline-sm text-primary font-bold mt-1 group-hover:text-secondary transition-colors">
                        {c.name}
                      </span>
                      <p className="font-body-sm text-body-sm text-text-muted line-clamp-3">
                        {c.description}
                      </p>
                    </div>
                    <span className="text-xs text-text-muted mt-2 pt-2 border-t border-border-subtle">
                      {c.conceptCount} Concepts
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pattern 3: Psychological */}
            <div className="flex flex-col gap-space-md">
              <div className="flex items-center justify-between p-space-md rounded-xl bg-surface-container-high border border-border-subtle">
                <div className="flex items-center gap-space-sm">
                  <span className="w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center font-headline-sm text-headline-sm font-bold">
                    3
                  </span>
                  <div className="flex flex-col">
                    <span className="font-headline-sm text-headline-sm text-primary font-bold">Psychological Pattern</span>
                    <span className="font-label-sm text-label-sm text-text-muted">
                      4 Components • Mental, affective, and interpersonal state
                    </span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-surface-container-lowest text-primary font-code-badge text-code-badge">
                  4 COMPONENTS
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                {psychologicalComponents.map((c) => (
                  <div
                    key={c.code}
                    onClick={() => handleLaunchComponentInBuilder(c.code)}
                    className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between border border-border-subtle cursor-pointer group"
                  >
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <span className="w-7 h-7 rounded bg-primary-fixed-dim text-primary font-headline-sm text-headline-sm flex items-center justify-center font-bold">
                          {c.code}
                        </span>
                        <span className="font-code-badge text-code-badge text-secondary font-bold">{c.codeRoot}</span>
                      </div>
                      <span className="font-headline-sm text-headline-sm text-primary font-bold mt-1 group-hover:text-primary transition-colors">
                        {c.name}
                      </span>
                      <p className="font-body-sm text-body-sm text-text-muted line-clamp-3">
                        {c.description}
                      </p>
                    </div>
                    <span className="text-xs text-text-muted mt-2 pt-2 border-t border-border-subtle">
                      {c.conceptCount} Concepts
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pattern 4: Health Behavioral */}
          <div className="flex flex-col gap-space-md">
            <div className="flex items-center justify-between p-space-md rounded-xl bg-surface-container-high border border-border-subtle">
              <div className="flex items-center gap-space-sm">
                <span className="w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center font-headline-sm text-headline-sm font-bold">
                  4
                </span>
                <div className="flex flex-col">
                  <span className="font-headline-sm text-headline-sm text-primary font-bold">Health Behavioral Pattern</span>
                  <span className="font-label-sm text-label-sm text-text-muted">
                    4 Components • Health maintenance, therapeutic regimens, and environmental safety
                  </span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-surface-container-lowest text-primary font-code-badge text-code-badge">
                4 COMPONENTS
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-sm">
              {behavioralComponents.map((c) => (
                <div
                  key={c.code}
                  onClick={() => handleLaunchComponentInBuilder(c.code)}
                  className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between border border-border-subtle cursor-pointer group"
                >
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="w-7 h-7 rounded bg-surface-variant text-primary font-headline-sm text-headline-sm flex items-center justify-center font-bold">
                        {c.code}
                      </span>
                      <span className="font-code-badge text-code-badge text-secondary font-bold">{c.codeRoot}</span>
                    </div>
                    <span className="font-headline-sm text-headline-sm text-primary font-bold mt-1 group-hover:text-primary transition-colors">
                      {c.name}
                    </span>
                    <p className="font-body-sm text-body-sm text-text-muted line-clamp-3">
                      {c.description}
                    </p>
                  </div>
                  <span className="text-xs text-secondary font-label-sm text-label-sm mt-3 pt-2 bg-surface-container-low/50 px-2 py-1 rounded">
                    Code Root: {c.codeRoot}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Coding Structure: 5-Character Alphanumeric Architecture */}
      <section className="w-full bg-surface-canvas py-space-xl px-gutter-lg" id="coding-breakdown">
        <div className="max-w-[1280px] mx-auto flex flex-col gap-space-xl">
          <div className="flex flex-col gap-space-xs max-w-3xl">
            <span className="font-code-badge text-code-badge text-secondary font-bold uppercase tracking-wider">
              ICD-10 SYNTAX ALIGNMENT
            </span>
            <h2 className="font-headline-xl text-headline-xl text-primary font-bold">
              Five-Character Alphanumeric Coding Architecture
            </h2>
            <p className="font-body-md text-body-md text-text-muted">
              Structured explicitly for interoperability and rapid database ingestion, each CCC code follows a 5-part
              alphanumeric syntax compatible with ANSI, HL7, and SNOMED CT terminology tables.
            </p>
          </div>

          {/* Anatomical Code Architecture Diagram */}
          <div className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-lg border border-border-subtle">
            <div className="flex flex-col lg:flex-row items-stretch justify-between gap-space-md">
              {/* Character 1 */}
              <div className="flex-1 p-space-md rounded-xl bg-surface-container-low flex flex-col items-center text-center gap-space-xs">
                <span className="font-code-badge text-code-badge text-on-surface-variant font-bold">CHARACTER 1</span>
                <div className="w-14 h-14 rounded-xl bg-primary text-on-primary flex items-center justify-center font-display-lg text-display-lg font-bold">
                  A
                </div>
                <span className="font-headline-sm text-headline-sm text-primary font-bold mt-1">Care Component</span>
                <span className="font-body-sm text-body-sm text-text-muted">
                  Alpha character indicating 1 of 21 components (e.g., A = Activity)
                </span>
              </div>

              <div className="hidden lg:flex items-center text-text-muted">
                <span className="material-symbols-outlined text-[24px]">add</span>
              </div>

              {/* Characters 2 & 3 */}
              <div className="flex-1 p-space-md rounded-xl bg-surface-container-low flex flex-col items-center text-center gap-space-xs">
                <span className="font-code-badge text-code-badge text-on-surface-variant font-bold">CHARACTERS 2 • 3</span>
                <div className="w-14 h-14 rounded-xl bg-columbia-crown-blue text-on-primary flex items-center justify-center font-display-lg text-display-lg font-bold">
                  01
                </div>
                <span className="font-headline-sm text-headline-sm text-primary font-bold mt-1">Major Concept</span>
                <span className="font-body-sm text-body-sm text-text-muted">
                  Two-digit major diagnostic or intervention domain (e.g., Activity Alteration)
                </span>
              </div>

              <div className="hidden lg:flex items-center text-text-muted">
                <span className="material-symbols-outlined text-[24px]">fiber_manual_record</span>
              </div>

              {/* Character 4 (Subconcept) */}
              <div className="flex-1 p-space-md rounded-xl bg-surface-container-low flex flex-col items-center text-center gap-space-xs">
                <span className="font-code-badge text-code-badge text-on-surface-variant font-bold">CHARACTER 4</span>
                <div className="w-14 h-14 rounded-xl bg-secondary text-on-secondary flex items-center justify-center font-display-lg text-display-lg font-bold">
                  .1
                </div>
                <span className="font-headline-sm text-headline-sm text-primary font-bold mt-1">Subconcept</span>
                <span className="font-body-sm text-body-sm text-text-muted">
                  Specific subclass atomic definition (e.g., .1 = Activity Intolerance)
                </span>
              </div>

              <div className="hidden lg:flex items-center text-text-muted">
                <span className="material-symbols-outlined text-[24px]">fiber_manual_record</span>
              </div>

              {/* Character 5 (Qualifier) */}
              <div className="flex-1 p-space-md rounded-xl bg-surface-container-high flex flex-col items-center text-center gap-space-xs">
                <span className="font-code-badge text-code-badge text-secondary font-bold">CHARACTER 5 (TERMINAL)</span>
                <div className="w-14 h-14 rounded-xl bg-surface-container-highest text-primary flex items-center justify-center font-display-lg text-display-lg font-bold">
                  .1
                </div>
                <span className="font-headline-sm text-headline-sm text-primary font-bold mt-1">Concept Qualifier</span>
                <span className="font-body-sm text-body-sm text-text-muted">
                  Diagnosis: Outcome (1-3)<br />
                  Intervention: Action Type (1-4)
                </span>
              </div>
            </div>

            {/* Terminal Qualifier Legend Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md pt-space-xs">
              <div className="p-space-md rounded-xl bg-surface-container-high/60 flex flex-col gap-space-xs">
                <div className="flex items-center justify-between">
                  <span className="font-headline-sm text-headline-sm text-primary font-bold">
                    Terminal Outcome Qualifiers (Diagnoses)
                  </span>
                  <span className="font-code-badge text-code-badge text-primary bg-surface-container-lowest px-2 py-0.5 rounded">
                    3 States
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-text-muted">
                  Appended to any of the 176 nursing diagnoses to encode expected vs. observed outcome evaluations.
                </p>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <div className="p-2 rounded bg-surface-container-lowest text-center">
                    <span className="font-code-badge text-code-badge text-secondary font-bold block">.1</span>
                    <span className="font-label-sm text-label-sm text-primary">Improved</span>
                  </div>
                  <div className="p-2 rounded bg-surface-container-lowest text-center">
                    <span className="font-code-badge text-code-badge text-primary font-bold block">.2</span>
                    <span className="font-label-sm text-label-sm text-primary">Stabilized</span>
                  </div>
                  <div className="p-2 rounded bg-surface-container-lowest text-center">
                    <span className="font-code-badge text-code-badge text-clinical-alert-red font-bold block">.3</span>
                    <span className="font-label-sm text-label-sm text-primary">Deteriorated</span>
                  </div>
                </div>
              </div>

              <div className="p-space-md rounded-xl bg-surface-container-high/60 flex flex-col gap-space-xs">
                <div className="flex items-center justify-between">
                  <span className="font-headline-sm text-headline-sm text-primary font-bold">
                    Terminal Action Type Qualifiers (Interventions)
                  </span>
                  <span className="font-code-badge text-code-badge text-secondary bg-surface-container-lowest px-2 py-0.5 rounded">
                    4 Actions
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-text-muted">
                  Appended to any of the 201 core nursing interventions to delineate precise nursing role functions.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
                  <div className="p-2 rounded bg-surface-container-lowest text-center">
                    <span className="font-code-badge text-code-badge text-secondary font-bold block">.1</span>
                    <span className="font-label-sm text-label-sm text-primary">Assess / Monitor</span>
                  </div>
                  <div className="p-2 rounded bg-surface-container-lowest text-center">
                    <span className="font-code-badge text-code-badge text-secondary font-bold block">.2</span>
                    <span className="font-label-sm text-label-sm text-primary">Care / Perform</span>
                  </div>
                  <div className="p-2 rounded bg-surface-container-lowest text-center">
                    <span className="font-code-badge text-code-badge text-secondary font-bold block">.3</span>
                    <span className="font-label-sm text-label-sm text-primary">Teach / Instruct</span>
                  </div>
                  <div className="p-2 rounded bg-surface-container-lowest text-center">
                    <span className="font-code-badge text-code-badge text-secondary font-bold block">.4</span>
                    <span className="font-label-sm text-label-sm text-primary">Manage / Refer</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Real-world Clinical Side-by-Side Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
            {/* Diagnosis Concept Example Card */}
            <div className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-md border border-border-subtle">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-code-badge text-code-badge">
                  DIAGNOSIS (CCCD) RECORDING
                </span>
                <span className="material-symbols-outlined text-secondary text-[24px]">stethoscope</span>
              </div>
              <div className="flex items-baseline gap-space-sm">
                <span className="font-display-lg text-display-lg text-primary tracking-tight font-bold">A01.1.1</span>
                <span className="font-code-badge text-code-badge text-secondary">Validated Syntax</span>
              </div>
              <div className="space-y-2 pt-space-xs text-body-sm">
                <div className="flex items-start gap-2">
                  <span className="w-6 h-6 rounded bg-surface-container-high text-primary font-bold flex items-center justify-center shrink-0">
                    A
                  </span>
                  <span className="text-on-surface"><strong>Activity Component</strong> (Level 2 Care Component)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-6 h-6 rounded bg-surface-container-high text-primary font-bold flex items-center justify-center shrink-0">
                    01
                  </span>
                  <span className="text-on-surface"><strong>Activity Alteration</strong> (Level 3 Major Nursing Concept)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-6 h-6 rounded bg-surface-container-high text-primary font-bold flex items-center justify-center shrink-0">
                    .1
                  </span>
                  <span className="text-on-surface"><strong>Activity Intolerance</strong> (Level 3 Specific Sub-Concept)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-6 h-6 rounded bg-secondary-container text-on-secondary-container font-bold flex items-center justify-center shrink-0">
                    .1
                  </span>
                  <span className="text-on-surface"><strong>Improved</strong> (Level 4 Terminal Outcome Qualifier)</span>
                </div>
              </div>
              <div className="p-space-sm rounded-lg bg-surface-container-low text-xs text-text-muted">
                Clinical Expression: Patient exhibits improved endurance and absence of dyspnea during physical ambulation relative to admission baseline.
              </div>
            </div>

            {/* Intervention Concept Example Card */}
            <div className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-md border border-border-subtle">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-code-badge text-code-badge">
                  INTERVENTION (CCCI) ACTION
                </span>
                <span className="material-symbols-outlined text-secondary text-[24px]">healing</span>
              </div>
              <div className="flex items-baseline gap-space-sm">
                <span className="font-display-lg text-display-lg text-columbia-crown-blue tracking-tight font-bold">A01.2.2</span>
                <span className="font-code-badge text-code-badge text-secondary">Validated Syntax</span>
              </div>
              <div className="space-y-2 pt-space-xs text-body-sm">
                <div className="flex items-start gap-2">
                  <span className="w-6 h-6 rounded bg-surface-container-high text-primary font-bold flex items-center justify-center shrink-0">
                    A
                  </span>
                  <span className="text-on-surface"><strong>Activity Component</strong> (Level 2 Care Component)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-6 h-6 rounded bg-surface-container-high text-primary font-bold flex items-center justify-center shrink-0">
                    01
                  </span>
                  <span className="text-on-surface"><strong>Activity Care</strong> (Level 3 Major Nursing Concept)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-6 h-6 rounded bg-surface-container-high text-primary font-bold flex items-center justify-center shrink-0">
                    .2
                  </span>
                  <span className="text-on-surface"><strong>Energy Conservation</strong> (Level 3 Intervention Concept)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-6 h-6 rounded bg-secondary text-on-secondary font-bold flex items-center justify-center shrink-0">
                    .2
                  </span>
                  <span className="text-on-surface"><strong>Care / Perform</strong> (Level 4 Nursing Action Type)</span>
                </div>
              </div>
              <div className="p-space-sm rounded-lg bg-surface-container-low text-xs text-text-muted">
                Clinical Expression: Nurse directly implements planned energy pacing, structured rest intervals, and assistive device mobilization at bedside.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Six-Step Nursing Process & Interoperability */}
      <section className="w-full bg-surface py-space-xl px-gutter-lg">
        <div className="max-w-[1280px] mx-auto flex flex-col gap-space-xl">
          <div className="flex flex-col gap-space-xs max-w-3xl">
            <span className="font-code-badge text-code-badge text-secondary font-bold uppercase tracking-wider">
              CLINICAL WORKFLOW INTEGRATION
            </span>
            <h2 className="font-headline-xl text-headline-xl text-primary font-bold">
              The Six-Step Nursing Process Model
            </h2>
            <p className="font-body-md text-body-md text-text-muted">
              The CCC System is architected intentionally to mirror the universal ANA Standards of Nursing Practice,
              embedding diagnostic integrity and structured evaluation at every touchpoint.
            </p>
          </div>

          {/* Step Cards (1 to 6) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-space-sm">
            {/* Step 1 */}
            <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col justify-between gap-space-sm hover:bg-surface-container-high transition-colors border border-border-subtle">
              <div className="flex flex-col gap-2">
                <span className="font-headline-xl text-headline-xl text-primary font-bold">01</span>
                <span className="font-headline-sm text-headline-sm text-primary font-bold">Assessment</span>
                <p className="font-body-sm text-body-sm text-text-muted">
                  Nurse assesses patient health patterns using the 21 Care Components.
                </p>
              </div>
              <span className="px-2 py-1 rounded bg-surface-container-lowest text-xs font-bold text-secondary">
                Care Component
              </span>
            </div>

            {/* Step 2 */}
            <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col justify-between gap-space-sm hover:bg-surface-container-high transition-colors border border-border-subtle">
              <div className="flex flex-col gap-2">
                <span className="font-headline-xl text-headline-xl text-primary font-bold">02</span>
                <span className="font-headline-sm text-headline-sm text-primary font-bold">Diagnosis</span>
                <p className="font-body-sm text-body-sm text-text-muted">
                  Identify atomic clinical nursing problems from 176 CCC diagnoses.
                </p>
              </div>
              <span className="px-2 py-1 rounded bg-surface-container-lowest text-xs font-bold text-secondary">
                CCCD Concept
              </span>
            </div>

            {/* Step 3 */}
            <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col justify-between gap-space-sm hover:bg-surface-container-high transition-colors border border-border-subtle">
              <div className="flex flex-col gap-2">
                <span className="font-headline-xl text-headline-xl text-primary font-bold">03</span>
                <span className="font-headline-sm text-headline-sm text-primary font-bold">Expected Outcome</span>
                <p className="font-body-sm text-body-sm text-text-muted">
                  Select projected goal state (Improved, Stabilized, or Deteriorated).
                </p>
              </div>
              <span className="px-2 py-1 rounded bg-surface-container-lowest text-xs font-bold text-secondary">
                Goal Qualifier
              </span>
            </div>

            {/* Step 4 */}
            <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col justify-between gap-space-sm hover:bg-surface-container-high transition-colors border border-border-subtle">
              <div className="flex flex-col gap-2">
                <span className="font-headline-xl text-headline-xl text-primary font-bold">04</span>
                <span className="font-headline-sm text-headline-sm text-primary font-bold">Planning</span>
                <p className="font-body-sm text-body-sm text-text-muted">
                  Prescribe interventions from 201 core interventions to reach target goals.
                </p>
              </div>
              <span className="px-2 py-1 rounded bg-surface-container-lowest text-xs font-bold text-secondary">
                Intervention Core
              </span>
            </div>

            {/* Step 5 */}
            <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col justify-between gap-space-sm hover:bg-surface-container-high transition-colors border border-border-subtle">
              <div className="flex flex-col gap-2">
                <span className="font-headline-xl text-headline-xl text-primary font-bold">05</span>
                <span className="font-headline-sm text-headline-sm text-primary font-bold">Implementation</span>
                <p className="font-body-sm text-body-sm text-text-muted">
                  Execute care using 1 of 4 action qualifiers (Assess, Care, Teach, Manage).
                </p>
              </div>
              <span className="px-2 py-1 rounded bg-surface-container-lowest text-xs font-bold text-secondary">
                Action Type
              </span>
            </div>

            {/* Step 6 */}
            <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col justify-between gap-space-sm hover:bg-surface-container-high transition-colors border border-border-subtle">
              <div className="flex flex-col gap-2">
                <span className="font-headline-xl text-headline-xl text-primary font-bold">06</span>
                <span className="font-headline-sm text-headline-sm text-primary font-bold">Evaluation</span>
                <p className="font-body-sm text-body-sm text-text-muted">
                  Evaluate actual patient outcome against baseline expected goal state.
                </p>
              </div>
              <span className="px-2 py-1 rounded bg-surface-container-lowest text-xs font-bold text-secondary">
                Observed Outcome
              </span>
            </div>
          </div>

          {/* Semantic Interoperability EHR Crosswalk Mosaic */}
          <div className="p-space-lg rounded-2xl bg-surface-container-high flex flex-col lg:flex-row items-center justify-between gap-space-lg border border-border-subtle">
            <div className="flex flex-col gap-space-xs max-w-2xl">
              <span className="font-code-badge text-code-badge text-secondary font-bold uppercase">
                SEMANTIC INTEROPERABILITY
              </span>
              <h3 className="font-headline-md text-headline-md text-primary font-bold">
                Pre-Built EHR &amp; Clinical Terminological Crosswalks
              </h3>
              <p className="font-body-sm text-body-sm text-text-muted">
                The CCC System features established reference mappings to SNOMED CT, LOINC, and RxNorm, functioning
                out-of-the-box in leading clinical EHR platforms such as Epic, Oracle Health (Cerner), and the VA VistA clinical data repository.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-space-sm w-full lg:w-auto">
              <div className="p-space-md rounded-xl bg-surface-container-lowest text-center shadow-sm">
                <span className="font-headline-sm text-headline-sm text-primary font-bold block">SNOMED CT</span>
                <span className="font-label-sm text-label-sm text-text-muted">Direct Concept Map</span>
              </div>
              <div className="p-space-md rounded-xl bg-surface-container-lowest text-center shadow-sm">
                <span className="font-headline-sm text-headline-sm text-primary font-bold block">LOINC</span>
                <span className="font-label-sm text-label-sm text-text-muted">Assessment Panels</span>
              </div>
              <div className="p-space-md rounded-xl bg-surface-container-lowest text-center shadow-sm">
                <span className="font-headline-sm text-headline-sm text-primary font-bold block">HL7 FHIR</span>
                <span className="font-label-sm text-label-sm text-text-muted">CarePlan Resources</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Framework Documentation & Sub-pages Directory */}
      <section className="w-full bg-surface-canvas py-space-xl px-gutter-lg">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg">
          {/* Directory Grid */}
          <div className="lg:col-span-8 flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-code-badge text-code-badge text-secondary font-bold uppercase tracking-wider">
                  OFFICIAL REPOSITORY DIRECTORY
                </span>
                <h2 className="font-headline-lg text-headline-lg text-primary font-bold">
                  Framework Documentation &amp; Sub-Pages
                </h2>
              </div>
              <span className="font-label-sm text-label-sm text-text-muted">9 Technical Specifications</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-space-sm">
              {REPOSITORY_SPECS.map((spec, i) => (
                <div
                  key={i}
                  onClick={() => onNavigate('code-builder')}
                  className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all flex flex-col justify-between group border border-border-subtle cursor-pointer"
                >
                  <div className="flex flex-col gap-1">
                    <span className="font-headline-sm text-headline-sm text-primary group-hover:text-secondary transition-colors font-bold">
                      {spec.title}
                    </span>
                    <p className="font-body-sm text-body-sm text-text-muted leading-relaxed">
                      {spec.desc}
                    </p>
                  </div>
                  <span className="flex items-center gap-1 font-label-sm text-label-sm text-secondary mt-3 font-semibold">
                    <span>Explore Model</span>
                    <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Authority & Citation Box */}
          <div className="lg:col-span-4 flex flex-col gap-space-md">
            <div className="p-space-lg rounded-2xl bg-surface-container-high flex flex-col gap-space-md shadow-sm border border-border-subtle">
              <div className="flex items-center gap-space-xs text-primary font-bold">
                <span className="material-symbols-outlined text-[24px]">menu_book</span>
                <span className="font-headline-sm text-headline-sm">Suggested Academic Citation</span>
              </div>
              <div className="p-space-md rounded-xl bg-surface-container-lowest font-mono text-xs text-on-surface leading-relaxed select-all border border-border-subtle">
                Saba, V. K., &amp; Emory University School of Nursing. (2026).{' '}
                <em>Clinical Care Classification (CCC) System Manual: A Guide to Nursing Documentation in the Electronic Health Record</em>{' '}
                (Version 2.5). Springer Publishing Company. https://clinicalcareclassification.org/framework/
              </div>
              <p className="font-body-sm text-body-sm text-text-muted">
                The CCC System is copyright protected under open academic licensing. Users may adapt terminology tables with appropriate institutional attribution.
              </p>
              <div className="pt-space-xs flex flex-wrap gap-2">
                <span className="px-2.5 py-1 rounded bg-surface-container-lowest text-xs font-bold text-primary border border-border-subtle">
                  ANA Endorsed
                </span>
                <span className="px-2.5 py-1 rounded bg-surface-container-lowest text-xs font-bold text-primary border border-border-subtle">
                  NLM Metathesaurus
                </span>
                <span className="px-2.5 py-1 rounded bg-surface-container-lowest text-xs font-bold text-primary border border-border-subtle">
                  ISO / TR 18104
                </span>
              </div>
            </div>

            {/* Share and Community Section */}
            <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex items-center justify-between border border-border-subtle">
              <span className="font-label-md text-label-md text-primary font-bold">Share Framework Model</span>
              <div className="flex items-center gap-2 text-text-muted">
                <button
                  aria-label="Copy Citation"
                  className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center hover:text-primary transition-colors cursor-pointer"
                  onClick={copyCitation}
                  type="button"
                  title="Copy Citation"
                >
                  <span className="material-symbols-outlined text-[18px]">share</span>
                </button>
                <button
                  aria-label="Print Page"
                  className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center hover:text-primary transition-colors cursor-pointer"
                  onClick={() => window.print()}
                  type="button"
                  title="Print Specification"
                >
                  <span className="material-symbols-outlined text-[18px]">print</span>
                </button>
                <button
                  aria-label="Email Resource"
                  className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center hover:text-primary transition-colors cursor-pointer"
                  onClick={() => window.location.href = 'mailto:?subject=Clinical Care Classification Framework v2.5&body=Check out the CCC Framework: https://clinicalcareclassification.org/framework/'}
                  type="button"
                  title="Email"
                >
                  <span className="material-symbols-outlined text-[18px]">mail</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
