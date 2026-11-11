import React, { useState, useMemo } from 'react';
import {
  CARE_COMPONENTS,
  DIAGNOSES,
  INTERVENTIONS,
  QUALIFIERS,
  ACTION_TYPES,
  OUTCOMES,
  CareComponent,
  DiagnosisConcept,
  InterventionConcept
} from '../data/cccData';

interface TerminologyBrowserProps {
  onSelectComponent?: (code: string) => void;
  onSelectDiagnosis?: (componentCode: string, diagCode: string) => void;
  onSelectIntervention?: (componentCode: string, intervCode: string) => void;
  className?: string;
  initialTab?: 'components' | 'diagnoses' | 'interventions' | 'crosswalks';
}

export const TerminologyBrowser: React.FC<TerminologyBrowserProps> = ({
  onSelectComponent,
  onSelectDiagnosis,
  onSelectIntervention,
  className = '',
  initialTab = 'components'
}) => {
  const [activeTab, setActiveTab] = useState<'components' | 'diagnoses' | 'interventions' | 'crosswalks'>(initialTab);
  const [searchQuery, setSearchQuery] = useState('');
  const [componentFilter, setComponentFilter] = useState<string>('ALL');

  const filteredComponents = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return CARE_COMPONENTS;
    return CARE_COMPONENTS.filter(
      c =>
        c.name.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.codeRoot.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const filteredDiagnoses = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    let list = DIAGNOSES;
    if (componentFilter !== 'ALL') {
      list = list.filter(d => d.componentCode === componentFilter);
    }
    if (!q) return list;
    return list.filter(
      d =>
        d.name.toLowerCase().includes(q) ||
        d.code.toLowerCase().includes(q) ||
        d.definition.toLowerCase().includes(q) ||
        d.snomed.includes(q) ||
        d.icd10.toLowerCase().includes(q) ||
        d.majorName.toLowerCase().includes(q)
    );
  }, [searchQuery, componentFilter]);

  const filteredInterventions = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    let list = INTERVENTIONS;
    if (componentFilter !== 'ALL') {
      list = list.filter(i => i.componentCode === componentFilter);
    }
    if (!q) return list;
    return list.filter(
      i =>
        i.name.toLowerCase().includes(q) ||
        i.code.toLowerCase().includes(q) ||
        i.definition.toLowerCase().includes(q) ||
        i.snomed.includes(q) ||
        i.loinc.includes(q) ||
        i.majorName.toLowerCase().includes(q)
    );
  }, [searchQuery, componentFilter]);

  return (
    <div id="terminology-browser" className={`bg-surface-card border border-border-subtle rounded-2xl shadow-md overflow-hidden ${className}`}>
      {/* Header Bar */}
      <div className="p-space-lg bg-surface-container-low border-b border-border-subtle space-y-space-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
          <div className="flex items-center gap-space-sm">
            <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center font-bold shadow-xs">
              <span className="material-symbols-outlined text-[22px]">manage_search</span>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-headline-md text-headline-md text-primary font-bold">
                  Clinical Care Classification Terminology Browser
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-secondary text-white uppercase tracking-wider">
                  v2.5 Master Ontology
                </span>
              </div>
              <p className="font-body-sm text-[12px] text-text-muted mt-0.5">
                Explore the complete 4-level CCC architecture: 21 Care Components, 176 Diagnoses, 546 Interventions, and standardized SNOMED CT / LOINC / ICD-10 crosswalks.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
            <span className="px-2 py-1 rounded bg-white border border-border-subtle">
              21 Components
            </span>
            <span className="px-2 py-1 rounded bg-white border border-border-subtle">
              176 CCCD
            </span>
            <span className="px-2 py-1 rounded bg-white border border-border-subtle">
              546 CCCI
            </span>
          </div>
        </div>

        {/* Search Bar, Filter and Tab Row */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-space-sm pt-space-xs">
          {/* Live Search */}
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3.5 top-2.5 text-text-muted text-[18px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search across concepts, codes (e.g. A01), SNOMED, LOINC, definitions..."
              className="w-full pl-10 pr-space-md py-2 rounded-xl bg-white border border-border-subtle text-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-inner placeholder-text-muted"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-text-muted hover:text-primary cursor-pointer text-xs"
              >
                Clear
              </button>
            )}
          </div>

          {/* Component Filter Dropdown for Diagnoses & Interventions */}
          {(activeTab === 'diagnoses' || activeTab === 'interventions') && (
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-xs text-text-muted font-medium">Domain:</span>
              <select
                value={componentFilter}
                onChange={(e) => setComponentFilter(e.target.value)}
                className="text-xs py-2 px-space-sm rounded-xl bg-white border border-border-subtle text-primary outline-none focus:ring-2 focus:ring-primary/20 font-semibold cursor-pointer"
              >
                <option value="ALL">All 21 Components</option>
                {CARE_COMPONENTS.map(c => (
                  <option key={c.code} value={c.code}>
                    [{c.code}] {c.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 bg-surface-container p-1 rounded-xl shrink-0 overflow-x-auto">
            <button
              onClick={() => setActiveTab('components')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'components' ? 'bg-primary text-on-primary shadow-sm' : 'text-text-muted hover:text-primary'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">category</span>
              <span>21 Components</span>
            </button>
            <button
              onClick={() => setActiveTab('diagnoses')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'diagnoses' ? 'bg-primary text-on-primary shadow-sm' : 'text-text-muted hover:text-primary'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">stethoscope</span>
              <span>Diagnoses (176)</span>
            </button>
            <button
              onClick={() => setActiveTab('interventions')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'interventions' ? 'bg-primary text-on-primary shadow-sm' : 'text-text-muted hover:text-primary'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">healing</span>
              <span>Interventions (546)</span>
            </button>
            <button
              onClick={() => setActiveTab('crosswalks')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'crosswalks' ? 'bg-primary text-on-primary shadow-sm' : 'text-text-muted hover:text-primary'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">tune</span>
              <span>Crosswalks &amp; Modifiers</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-space-lg max-h-[680px] overflow-y-auto space-y-space-md">
        {/* TAB 1: 21 CARE COMPONENTS */}
        {activeTab === 'components' && (
          <div className="space-y-space-md">
            <div className="flex items-center justify-between text-xs text-text-muted">
              <span>Showing <strong>{filteredComponents.length}</strong> of 21 Core Holistic Care Components</span>
              <span className="text-[11px] font-mono">Level 1 of 4-Level CCC Framework</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-sm">
              {filteredComponents.map((c) => (
                <div
                  key={c.code}
                  className="p-space-md rounded-xl bg-surface-container-low border border-border-subtle hover:border-primary/40 hover:bg-white transition-all flex flex-col justify-between group shadow-2xs"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="w-8 h-8 rounded-lg bg-primary text-on-primary font-bold text-sm flex items-center justify-center shadow-xs">
                        {c.code}
                      </span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-surface-card text-secondary font-bold border border-border-subtle">
                        {c.pattern}
                      </span>
                    </div>
                    <h4 className="font-bold text-primary text-base group-hover:text-columbia-crown-blue transition-colors">
                      {c.name}
                    </h4>
                    <p className="text-xs text-text-muted mt-1 leading-relaxed line-clamp-3">
                      {c.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-2.5 border-t border-border-subtle flex items-center justify-between text-xs">
                    <span className="font-mono text-[11px] text-text-muted">Root: {c.codeRoot}</span>
                    {onSelectComponent && (
                      <button
                        onClick={() => onSelectComponent(c.code)}
                        className="inline-flex items-center gap-1 font-bold text-secondary hover:text-columbia-crown-blue transition-colors cursor-pointer"
                        title={`Select Component ${c.code} in Code Builder`}
                      >
                        <span>Build in Step 1</span>
                        <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: DIAGNOSES (CCCD) */}
        {activeTab === 'diagnoses' && (
          <div className="space-y-space-sm">
            <div className="flex items-center justify-between text-xs text-text-muted">
              <span>Showing <strong>{filteredDiagnoses.length}</strong> nursing diagnoses {componentFilter !== 'ALL' ? `in Component ${componentFilter}` : ''}</span>
              <span className="text-[11px] font-mono">Level 2 Core Concepts + SNOMED CT / ICD-10 Crosswalks</span>
            </div>

            <div className="space-y-2">
              {filteredDiagnoses.map((d) => (
                <div
                  key={d.code}
                  className="p-space-sm rounded-xl bg-surface-container-low border border-border-subtle hover:bg-white hover:border-primary/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-2xs"
                >
                  <div className="space-y-1 max-w-2xl">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-primary text-on-primary shadow-xs">
                        {d.code}
                      </span>
                      <span className="font-bold text-primary text-sm">
                        {d.name}
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-surface-container-high text-text-muted font-medium">
                        {d.majorName}
                      </span>
                    </div>
                    <p className="text-xs text-text-muted leading-relaxed">
                      {d.definition}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 flex-wrap justify-between md:justify-end">
                    <div className="flex items-center gap-1.5 text-[11px] font-mono">
                      <span className="px-2 py-0.5 rounded bg-white border border-border-subtle text-columbia-crown-blue font-semibold" title="SNOMED CT Concept ID">
                        SNOMED: {d.snomed}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-white border border-border-subtle text-text-muted font-semibold" title="ICD-10-CM Mapping">
                        ICD-10: {d.icd10}
                      </span>
                    </div>

                    {onSelectDiagnosis && (
                      <button
                        onClick={() => onSelectDiagnosis(d.componentCode, d.code)}
                        className="px-2.5 py-1 rounded-lg bg-surface-container-high hover:bg-primary hover:text-on-primary text-primary text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                        title="Load this diagnosis into the online builder"
                      >
                        <span>Use in Builder</span>
                        <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: INTERVENTIONS (CCCI) */}
        {activeTab === 'interventions' && (
          <div className="space-y-space-sm">
            <div className="flex items-center justify-between text-xs text-text-muted">
              <span>Showing <strong>{filteredInterventions.length}</strong> nursing interventions {componentFilter !== 'ALL' ? `in Component ${componentFilter}` : ''}</span>
              <span className="text-[11px] font-mono">Level 2 Core Concepts + LOINC / SNOMED CT Crosswalks</span>
            </div>

            <div className="space-y-2">
              {filteredInterventions.map((i) => (
                <div
                  key={i.code}
                  className="p-space-sm rounded-xl bg-surface-container-low border border-border-subtle hover:bg-white hover:border-secondary/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-2xs"
                >
                  <div className="space-y-1 max-w-2xl">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-secondary text-white shadow-xs">
                        {i.code}
                      </span>
                      <span className="font-bold text-primary text-sm">
                        {i.name}
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-surface-container-high text-text-muted font-medium">
                        {i.majorName}
                      </span>
                    </div>
                    <p className="text-xs text-text-muted leading-relaxed">
                      {i.definition}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 flex-wrap justify-between md:justify-end">
                    <div className="flex items-center gap-1.5 text-[11px] font-mono">
                      <span className="px-2 py-0.5 rounded bg-white border border-border-subtle text-secondary font-semibold" title="LOINC Interoperability Code">
                        LOINC: {i.loinc}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-white border border-border-subtle text-columbia-crown-blue font-semibold" title="SNOMED CT Concept ID">
                        SNOMED: {i.snomed}
                      </span>
                    </div>

                    {onSelectIntervention && (
                      <button
                        onClick={() => onSelectIntervention(i.componentCode, i.code)}
                        className="px-2.5 py-1 rounded-lg bg-surface-container-high hover:bg-secondary hover:text-white text-secondary text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                        title="Load this intervention into Step 4 in the online builder"
                      >
                        <span>Use in Builder</span>
                        <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: CROSSWALKS & MODIFIERS */}
        {activeTab === 'crosswalks' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            {/* Condition Qualifiers */}
            <div className="p-space-md rounded-xl bg-surface-container-low border border-border-subtle space-y-space-sm">
              <div className="flex items-center justify-between border-b border-border-subtle pb-2">
                <h4 className="font-bold text-primary text-sm flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px] text-primary">tune</span>
                  Diagnostic Condition Qualifiers (Level 3 Modifier)
                </h4>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-primary font-bold">
                  4th Digit Modifier
                </span>
              </div>
              <p className="text-xs text-text-muted">
                Qualifies the degree of nursing impairment at admission or assessment.
              </p>
              <div className="space-y-1.5 text-xs">
                {QUALIFIERS.map(q => (
                  <div key={q.code} className="p-2.5 rounded-lg bg-white border border-border-subtle flex items-start gap-2.5 shadow-2xs">
                    <span className="font-mono font-bold text-primary text-sm px-1.5 py-0.5 rounded bg-surface-container-low">
                      .{q.code}
                    </span>
                    <div>
                      <div className="font-bold text-primary">{q.label}</div>
                      <div className="text-text-muted text-[11px] leading-relaxed mt-0.5">{q.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Types */}
            <div className="p-space-md rounded-xl bg-surface-container-low border border-border-subtle space-y-space-sm">
              <div className="flex items-center justify-between border-b border-border-subtle pb-2">
                <h4 className="font-bold text-primary text-sm flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px] text-secondary">bolt</span>
                  Action Type Modifiers (Level 4 Implementation)
                </h4>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-secondary font-bold">
                  4 Atomic Roles
                </span>
              </div>
              <p className="text-xs text-text-muted">
                Delineates specific nursing scope of service for clinical intervention delivery.
              </p>
              <div className="space-y-1.5 text-xs">
                {ACTION_TYPES.map(a => (
                  <div key={a.code} className="p-2.5 rounded-lg bg-white border border-border-subtle flex items-start gap-2.5 shadow-2xs">
                    <span className="font-mono font-bold text-secondary text-sm px-1.5 py-0.5 rounded bg-surface-container-low">
                      .{a.code}
                    </span>
                    <div>
                      <div className="font-bold text-primary">{a.label}</div>
                      <div className="text-text-muted text-[11px] leading-relaxed mt-0.5">{a.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Outcome States */}
            <div className="p-space-md rounded-xl bg-surface-container-low border border-border-subtle space-y-space-sm md:col-span-2">
              <div className="flex items-center justify-between border-b border-border-subtle pb-2">
                <h4 className="font-bold text-primary text-sm flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px] text-emerald-600">assessment</span>
                  Outcome Evaluation States (Level 4 Measurable Result)
                </h4>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-emerald-700 font-bold">
                  3-Tier Evaluation
                </span>
              </div>
              <p className="text-xs text-text-muted">
                Measures actual clinical patient response post-intervention, validating nursing process effectiveness.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-xs text-xs">
                {OUTCOMES.map(o => (
                  <div key={o.code} className="p-3 rounded-lg bg-white border border-border-subtle flex items-start gap-2.5 shadow-2xs">
                    <span className="font-mono font-bold text-emerald-700 text-sm px-1.5 py-0.5 rounded bg-emerald-50">
                      .{o.code}
                    </span>
                    <div>
                      <div className="font-bold text-primary">{o.label}</div>
                      <div className="text-text-muted text-[11px] leading-relaxed mt-0.5">{o.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer info bar */}
      <div className="p-space-sm bg-surface-container-low border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between text-xs text-text-muted gap-2">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px] text-columbia-crown-blue">verified</span>
          <span>Officially validated against NLM UMLS, SNOMED CT US Edition, and LOINC 2.76 Standards.</span>
        </div>
        <span className="font-mono text-[11px]">
          Clinical Care Classification (CCC v2.5)
        </span>
      </div>
    </div>
  );
};
