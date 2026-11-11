import React, { useState, useMemo, useEffect } from 'react';
import {
  CARE_COMPONENTS,
  DIAGNOSES,
  INTERVENTIONS,
  QUALIFIERS,
  GOALS,
  ACTION_TYPES,
  OUTCOMES,
  CareComponent,
  DiagnosisConcept,
  InterventionConcept
} from '../data/cccData';
import {
  getSubDiagnoses,
  getSubInterventions,
  SubDiagnosisConcept,
  SubInterventionConcept
} from '../data/cascadingData';
interface QueuedCarePlan {
  id: string;
  pairCode: string;
  actionName: string;
  description: string;
}

interface CodeBuilderScreenProps {
  onNavigate: (screen: 'overview' | 'framework' | 'translations' | 'code-builder' | 'terminology' | 'news' | 'about' | 'contact') => void;
  onOpenFhirModal: (data: any) => void;
  selectedComponentCode?: string;
}

export const CodeBuilderScreen: React.FC<CodeBuilderScreenProps> = ({
  onNavigate,
  onOpenFhirModal,
  selectedComponentCode = 'A'
}) => {
  // Mode: 'step' | 'direct'
  const [mode, setMode] = useState<'step' | 'direct'>('step');
  const [directSearchVal, setDirectSearchVal] = useState('A01.1.1-A10.0.2.1');

  // Step 1: Care Component
  const [componentCode, setComponentCode] = useState(selectedComponentCode || 'A');
  const [componentFilter, setComponentFilter] = useState('');

  useEffect(() => {
    if (selectedComponentCode) {
      setComponentCode(selectedComponentCode);
    }
  }, [selectedComponentCode]);

  // Step 2 & 2b: Diagnosis, Cascading Selection, Condition Qualifier
  const [selectedDiagCode, setSelectedDiagCode] = useState('A01.0');
  const [hasCascadingDiag, setHasCascadingDiag] = useState<boolean>(true);
  const [selectedSubDiagCode, setSelectedSubDiagCode] = useState<string>('A01.1');
  const [qualifierCode, setQualifierCode] = useState('1'); // .1 Impaired

  // Step 3: Expected Goal
  const [goalCode, setGoalCode] = useState('1'); // .1 Improve

  // Step 4 & 4b: Intervention & Cascading Selection
  const [selectedIntervCode, setSelectedIntervCode] = useState('A10.0');
  const [hasCascadingInterv, setHasCascadingInterv] = useState<boolean>(true);
  const [selectedSubIntervCode, setSelectedSubIntervCode] = useState<string>('A10.1');
  const [intervFilter, setIntervFilter] = useState('');

  // Step 5: Action Type
  const [actionCode, setActionCode] = useState('2'); // .2 Care / Perform

  // Step 6: Actual Outcome
  const [outcomeCode, setOutcomeCode] = useState('1'); // .1 Improved

  // Active Care Plan Queue
  const [queue, setQueue] = useState<QueuedCarePlan[]>([
    {
      id: '1',
      pairCode: 'A01.1.1 - A10.0.2.1',
      actionName: 'Care',
      description: 'Activity Intolerance (Impaired) → Exercise Ambulation → Improved'
    },
    {
      id: '2',
      pairCode: 'C03.1.2 - C05.0.1.2',
      actionName: 'Assess',
      description: 'Cardiac Output (Decreased) → Vital Signs Monitoring → Stabilized'
    }
  ]);

  const [copiedCode, setCopiedCode] = useState(false);

  // Derived current component
  const currentComp = useMemo(() => {
    return CARE_COMPONENTS.find(c => c.code === componentCode) || CARE_COMPONENTS[0];
  }, [componentCode]);

  // Filtered components list (ordered A-U for consistent grid layout)
  const filteredComponents = useMemo(() => {
    const sorted = [...CARE_COMPONENTS].sort((a, b) => a.code.localeCompare(b.code));
    const q = componentFilter.toLowerCase().trim();
    if (!q) return sorted;
    return sorted.filter(c => c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q));
  }, [componentFilter]);

  // Diagnoses for the selected component (fallback to sample if none exist)
  const availableDiagnoses = useMemo(() => {
    const list = DIAGNOSES.filter(d => d.componentCode === componentCode);
    if (list.length > 0) return list;
    return [
      {
        code: `${componentCode}01.0`,
        componentCode: componentCode,
        name: `${currentComp.name} Alteration`,
        definition: `Disruption or clinical compromise within ${currentComp.name} homeostasis.`,
        majorCode: '01.0',
        majorName: `${currentComp.name} Alteration`,
        snomed: '409586006',
        icd10: 'R53.83'
      },
      {
        code: `${componentCode}02.0`,
        componentCode: componentCode,
        name: `${currentComp.name} Risk Impairment`,
        definition: `Vulnerability to physiological decline in ${currentComp.name} performance.`,
        majorCode: '02.0',
        majorName: `${currentComp.name} Management`,
        snomed: '282920008',
        icd10: 'Z91.89'
      }
    ];
  }, [componentCode, currentComp]);

  // Active Core Diagnosis object
  const currentDiag = useMemo(() => {
    return availableDiagnoses.find(d => d.code === selectedDiagCode) || availableDiagnoses[0];
  }, [availableDiagnoses, selectedDiagCode]);

  // Available cascading sub-diagnoses for Step 2b
  const availableSubDiagnoses = useMemo(() => {
    return getSubDiagnoses(selectedDiagCode, componentCode, currentComp.name, currentDiag.name);
  }, [selectedDiagCode, componentCode, currentComp.name, currentDiag.name]);

  // Active cascading sub-diagnosis object
  const currentSubDiag = useMemo(() => {
    return availableSubDiagnoses.find(sd => sd.code === selectedSubDiagCode) || availableSubDiagnoses[0];
  }, [availableSubDiagnoses, selectedSubDiagCode]);

  // Interventions for component
  const availableInterventions = useMemo(() => {
    let list = INTERVENTIONS.filter(i => i.componentCode === componentCode);
    if (list.length === 0) {
      list = [
        {
          code: `${componentCode}01.0`,
          componentCode: componentCode,
          name: `${currentComp.name} Surveillance Protocol`,
          definition: `Clinical surveillance, assessment, and care routines for ${currentComp.name}.`,
          majorCode: '01.0',
          majorName: `${currentComp.name} Protocol`,
          snomed: '371907003',
          loinc: '85354-9'
        },
        {
          code: `${componentCode}02.0`,
          componentCode: componentCode,
          name: `${currentComp.name} Therapeutic Care`,
          definition: `Structured nursing interventions to restore ${currentComp.name} function.`,
          majorCode: '02.0',
          majorName: `${currentComp.name} Therapy`,
          snomed: '225337009',
          loinc: '75283-2'
        }
      ];
    }
    const q = intervFilter.toLowerCase().trim();
    if (!q) return list;
    return list.filter(i => i.name.toLowerCase().includes(q) || i.code.toLowerCase().includes(q));
  }, [componentCode, currentComp, intervFilter]);

  // Active Core Intervention object
  const currentInterv = useMemo(() => {
    return availableInterventions.find(i => i.code === selectedIntervCode) || availableInterventions[0];
  }, [availableInterventions, selectedIntervCode]);

  // Available cascading sub-interventions for Step 4b
  const availableSubInterventions = useMemo(() => {
    return getSubInterventions(selectedIntervCode, componentCode, currentComp.name, currentInterv.name);
  }, [selectedIntervCode, componentCode, currentComp.name, currentInterv.name]);

  // Active cascading sub-intervention object
  const currentSubInterv = useMemo(() => {
    return availableSubInterventions.find(si => si.code === selectedSubIntervCode) || availableSubInterventions[0];
  }, [availableSubInterventions, selectedSubIntervCode]);

  // Labels for modifiers
  const qualifierObj = QUALIFIERS.find(q => q.code === qualifierCode) || QUALIFIERS[1];
  const goalObj = GOALS.find(g => g.code === goalCode) || GOALS[0];
  const actionObj = ACTION_TYPES.find(a => a.code === actionCode) || ACTION_TYPES[1];
  const outcomeObj = OUTCOMES.find(o => o.code === outcomeCode) || OUTCOMES[0];

  // Active diagnosis representations (cascaded vs direct)
  const activeDiagCode = hasCascadingDiag ? currentSubDiag.code : currentDiag.code;
  const activeDiagName = hasCascadingDiag ? currentSubDiag.name : currentDiag.name;
  const activeDiagSnomed = hasCascadingDiag ? currentSubDiag.snomed : currentDiag.snomed;
  const activeDiagIcd = hasCascadingDiag ? currentSubDiag.icd10 : currentDiag.icd10;

  // Synthesized Diagnosis Code (with optional qualifier modifier)
  const synthesizedDiagCode = hasCascadingDiag
    ? (qualifierCode !== '0' ? `${currentSubDiag.code}.${qualifierCode}` : currentSubDiag.code)
    : currentDiag.code;
  const diagWithGoalCode = `${synthesizedDiagCode}.${goalCode}`;

  // Active intervention representations (cascaded vs direct)
  const activeIntervCode = hasCascadingInterv ? currentSubInterv.code : currentInterv.code;
  const activeIntervName = hasCascadingInterv ? currentSubInterv.name : currentInterv.name;
  const activeIntervSnomed = hasCascadingInterv ? currentSubInterv.snomed : currentInterv.snomed;
  const activeIntervLoinc = hasCascadingInterv ? currentSubInterv.loinc : currentInterv.loinc;

  // Synthesized Intervention Code
  const intervPairCode = `${activeIntervCode}.${actionCode}.${outcomeCode}`;
  const fullPairCode = `${diagWithGoalCode} - ${intervPairCode}`;

  // Goal alignment logic
  const isGoalMet = goalCode === outcomeCode;

  const currentBuilderState = {
    componentCode,
    componentName: currentComp.name,
    diagCode: diagWithGoalCode,
    diagName: activeDiagName,
    qualifierName: qualifierObj.label,
    qualifierCode,
    goalName: goalObj.label,
    goalCode,
    intervCode: activeIntervCode,
    intervName: activeIntervName,
    actionName: actionObj.label,
    actionCode,
    outcomeName: outcomeObj.label,
    outcomeCode,
    fullCode: fullPairCode,
    snomed: activeDiagSnomed,
    loinc: activeIntervLoinc,
    isGoalMet,
    hasCascadingDiag,
    hasCascadingInterv
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(fullPairCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopyFeedback(label);
    setTimeout(() => setCopyFeedback(null), 2000);
  };

  const epicSmartPhrase = `*** CLINICAL CARE CLASSIFICATION (CCC v2.5) NURSING NOTE ***
.CCCPLAN [DX: ${activeDiagName} (${diagWithGoalCode}) -> INT: ${actionObj.label} ${activeIntervName} (${intervPairCode}) -> OUT: ${outcomeObj.label}]

ASSESSMENT: Component [${componentCode}] ${currentComp.name}
DIAGNOSIS: [${currentDiag.code}] ${currentDiag.name}${hasCascadingDiag ? ` | Step 2b Sub-Dx: [${currentSubDiag.code}] ${currentSubDiag.name} (SNOMED: ${activeDiagSnomed})` : ` | Direct Concept (SNOMED: ${activeDiagSnomed})`}
EXPECTED OUTCOME: [${goalCode}] ${goalObj.label}
INTERVENTION: [${currentInterv.code}] ${currentInterv.name}${hasCascadingInterv ? ` | Step 4b Sub-Int: [${currentSubInterv.code}] ${currentSubInterv.name} (LOINC: ${activeIntervLoinc})` : ` | Direct Intervention (LOINC: ${activeIntervLoinc})`}
ACTION TYPE: [${actionCode}] ${actionObj.label}
EVALUATION: [${outcomeCode}] ${outcomeObj.label} (${isGoalMet ? 'Goal met - positive trajectory recorded' : 'Clinical delta recorded'}).`;

  const hl7Snippet = `MSH|^~\\&|CCC_BUILDER|COLUMBIA_NURSING|EPIC_ADT|HOSPITAL_SYS|20261024103000||ADT^A08|MSG000984|P|2.5.1
PID|1||987654321^^^MRN||DOE^JANE^^^^||19820412|F
PV1|1|I|4W^402^01||||12345^NURSE_INFORMATICS^^^^|||||||||||IP|||||||||||||||||
ZCC|1|${componentCode}|${currentComp.name}|${synthesizedDiagCode}|${activeDiagName}|${goalCode}|${goalObj.label}|SNOMED^${activeDiagSnomed}
ZCI|1|${activeIntervCode}|${activeIntervName}|${actionCode}|${actionObj.label}|${outcomeCode}|${outcomeObj.label}|LOINC^${activeIntervLoinc}`;

  const handleOpenFhir = () => {
    onOpenFhirModal(currentBuilderState);
  };

  const handleAddToQueue = () => {
    const newItem: QueuedCarePlan = {
      id: Date.now().toString(),
      pairCode: fullPairCode,
      actionName: actionObj.label.split('/')[0].trim(),
      description: `${currentDiag.name} (${qualifierObj.label}) → ${currentInterv.name} → ${outcomeObj.label}`
    };
    setQueue([newItem, ...queue]);
  };

  const handleClearQueue = () => {
    setQueue([]);
  };

  const handleExportCsv = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,Pair_Code,Care_Component,Diagnosis,Condition_Qualifier,Goal,Intervention,Action_Type,Actual_Outcome\n' +
      `${fullPairCode},"${currentComp.name}","${currentDiag.name}","${qualifierObj.label}","${goalObj.label}","${currentInterv.name}","${actionObj.label}","${outcomeObj.label}"`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `CCC_CarePlan_${componentCode}_${synthesizedDiagCode}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadBatch = () => {
    if (queue.length === 0) {
      alert('Your queue is currently empty. Add plans of care before downloading.');
      return;
    }
    const content = queue.map(q => `${q.pairCode} | ${q.description}`).join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CCC_Batch_CarePlan_${new Date().toISOString().slice(0, 10)}.poc`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const [activePayloadTab, setActivePayloadTab] = useState<'epic' | 'hl7' | 'fhir' | 'csv'>('epic');

  const csvSnippet = `Pair_Code,Care_Component,Diagnosis_Code,Diagnosis_Name,Qualifier,Expected_Goal,Intervention_Code,Intervention_Name,Action_Type,Actual_Outcome,SNOMED_CT,LOINC,ICD_10
"${fullPairCode}","${currentComp.name}","${synthesizedDiagCode}","${activeDiagName}","${qualifierObj.label}","${goalObj.label}","${activeIntervCode}","${activeIntervName}","${actionObj.label}","${outcomeObj.label}","${activeDiagSnomed}","${activeIntervLoinc}","${activeDiagIcd}"`;

  const handleDownloadEpic = () => {
    const blob = new Blob([epicSmartPhrase], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CCC_EpicSmartPhrase_${componentCode}_${synthesizedDiagCode}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadHl7 = () => {
    const blob = new Blob([hl7Snippet], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CCC_HL7_ADT_${componentCode}_${synthesizedDiagCode}.hl7`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const fhirSnippet = `{
  "resourceType": "CarePlan",
  "id": "ccc-careplan-${componentCode.toLowerCase()}01-${new Date().getFullYear()}",
  "status": "completed",
  "intent": "plan",
  "category": [
    {
      "coding": [
        {
          "system": "http://clinicalcareclassification.org/v25/component",
          "code": "${componentCode}",
          "display": "${currentComp.name}"
        }
      ]
    }
  ],
  "addresses": [
    {
      "concept": {
        "coding": [
          {
            "system": "http://clinicalcareclassification.org/v25/diagnosis",
            "code": "${diagWithGoalCode}",
            "display": "${activeDiagName} [Expected: ${goalObj.label}]"
          },
          {
            "system": "http://snomed.info/sct",
            "code": "${activeDiagSnomed}",
            "display": "${activeDiagName} (finding)"
          }
        ]
      }
    }
  ],
  "activity": [
    {
      "detail": {
        "code": {
          "coding": [
            {
              "system": "http://clinicalcareclassification.org/v25/intervention",
              "code": "${intervPairCode}",
              "display": "${actionObj.label} ${activeIntervName}"
            },
            {
              "system": "http://loinc.org",
              "code": "${activeIntervLoinc}",
              "display": "${activeIntervName} counseling"
            }
          ]
        },
        "status": "completed"
      },
      "outcomeCodeableConcept": [
        {
          "coding": [
            {
              "system": "http://clinicalcareclassification.org/v25/outcome",
              "code": "${outcomeCode}",
              "display": "${outcomeObj.label}"
            }
          ]
        }
      ]
    }
  ]
};`;

  const handleDownloadFhir = () => {
    const blob = new Blob([fhirSnippet], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CCC_CarePlan_${componentCode}_${synthesizedDiagCode}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrintSummary = () => {
    window.print();
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Context Header & Metadata Bar */}
      <section className="w-full bg-surface-container-low border-b border-border-subtle px-gutter-lg py-space-lg">
        <div className="max-w-7xl mx-auto flex flex-col gap-space-md">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-space-xs text-text-muted font-label-sm text-label-sm">
            <button
              onClick={() => onNavigate('overview')}
              className="hover:text-primary transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">home</span>
              <span>Home</span>
            </button>
            <span className="text-outline-variant">/</span>
            <span className="text-primary font-semibold">Online Code Builder</span>
          </nav>

          {/* Main Headline + Meta */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg">
            <div className="max-w-3xl space-y-space-xs">
              <div className="flex items-center gap-space-sm flex-wrap">
                <span className="px-space-xs py-0.5 rounded text-[11px] font-label-sm uppercase tracking-wider bg-primary text-on-primary font-bold">
                  CCC SYSTEM V2.5
                </span>
                <span className="flex items-center gap-1.5 px-space-sm py-0.5 rounded text-[12px] font-label-sm bg-emerald-100 text-emerald-800 font-semibold border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                  HL7® / FHIR® Ready
                </span>
                <span className="text-text-muted text-[12px] font-label-sm">
                  Columbia Nursing Informatics Pipeline
                </span>
              </div>
              <h1 className="font-headline-xl text-headline-xl text-primary tracking-tight font-bold">
                Interactive Online Code Builder
              </h1>
              <p className="font-body-md text-body-md text-text-muted">
                Construct, validate, and export standardized CCC Care Plans (POCs) through guided clinical steps for EHR interoperability.
                Seamlessly link Diagnoses, Interventions, Action Types, and Measurable Outcomes.
              </p>
            </div>

            {/* Quick Mode Switch Segmented Controller */}
            <div className="bg-surface-container-highest p-1 rounded-xl flex items-center self-start lg:self-center shadow-inner border border-border-subtle">
              <button
                onClick={() => setMode('step')}
                className={`flex items-center gap-1.5 px-space-md py-space-xs rounded-lg font-label-md text-label-md transition-all cursor-pointer ${
                  mode === 'step'
                    ? 'bg-surface-card text-primary font-bold shadow-sm'
                    : 'text-text-muted hover:text-primary font-semibold'
                }`}
              >
                <span className="material-symbols-outlined text-[18px] text-columbia-crown-blue">account_tree</span>
                <span>Step-by-Step Builder</span>
              </button>
              <button
                onClick={() => setMode('direct')}
                className={`flex items-center gap-1.5 px-space-md py-space-xs rounded-lg font-label-md text-label-md transition-all cursor-pointer ${
                  mode === 'direct'
                    ? 'bg-surface-card text-primary font-bold shadow-sm'
                    : 'text-text-muted hover:text-primary font-semibold'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">terminal</span>
                <span>Direct Code Lookup</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-space-sm pt-space-xs">
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
              <span className="font-label-sm text-label-sm text-text-muted">Outcome States</span>
              <span className="font-headline-sm text-headline-sm font-bold text-primary">3-Tier</span>
            </div>
            <div className="col-span-2 sm:col-span-1 bg-surface-card border border-border-subtle px-space-sm py-space-xs rounded-lg shadow-sm flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-text-muted">Crosswalks</span>
              <span className="font-label-sm text-[12px] font-bold text-secondary">SNOMED &amp; LOINC</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive 2-Column Workspace */}
      <section className="max-w-7xl mx-auto w-full px-gutter-lg py-space-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-start">
          {/* LEFT COLUMN: Guided Clinical Steps (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-space-xl">
            {/* DIRECT CODE SEARCH DRAWER */}
            {mode === 'direct' && (
              <div className="bg-surface-card border border-border-subtle rounded-xl p-space-lg shadow-sm space-y-space-md">
                <div className="flex items-center justify-between">
                  <h3 className="font-headline-sm text-headline-sm text-primary font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary">manage_search</span>
                    Direct Code &amp; Concept Syntax Lookup
                  </h3>
                  <span className="font-label-sm text-label-sm text-text-muted">Auto-resolves v2.5 tokens</span>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={directSearchVal}
                    onChange={(e) => setDirectSearchVal(e.target.value)}
                    placeholder="Type CCC code e.g. A01.1 or term e.g. 'Activity Impaired'..."
                    className="w-full bg-surface-container-low border border-border-subtle px-space-md py-space-sm pl-11 rounded-lg text-primary placeholder-text-muted font-body-md focus:bg-surface-card outline-none focus:ring-2 focus:ring-primary/20 shadow-sm transition-all"
                  />
                  <span className="material-symbols-outlined text-text-muted absolute left-3.5 top-3 text-[20px]">
                    search
                  </span>
                </div>
                <div className="p-space-sm rounded-lg bg-surface-container text-primary font-body-sm text-body-sm flex items-center gap-2 border border-border-subtle">
                  <span className="material-symbols-outlined text-secondary text-[20px]">check_circle</span>
                  <span>
                    Parsed query matches: <strong>Activity Intolerance (Impaired)</strong> with <strong>Exercise Ambulation (Care)</strong> targeted for <strong>Improvement</strong>.
                  </span>
                </div>
              </div>
            )}

            {/* STEP 1: CARE COMPONENT SELECTION */}
            <div className="bg-surface-card border border-border-subtle rounded-xl p-space-lg shadow-sm space-y-space-md relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-space-sm">
                  <div className="w-8 h-8 rounded-lg bg-primary text-on-primary font-bold font-headline-sm text-[14px] flex items-center justify-center shrink-0 shadow-sm">
                    1
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="font-headline-sm text-headline-sm text-primary font-bold">
                        Step 1: Care Component
                      </h2>
                      <span className="px-space-xs py-0.5 rounded text-[11px] font-label-sm bg-surface-container-high text-primary font-bold border border-border-subtle">
                        21 Domains
                      </span>
                      <span className="px-space-xs py-0.5 rounded text-[10px] font-label-sm uppercase tracking-wide bg-secondary-container text-on-secondary-container font-bold">
                        Step 1: Clinical Assessment
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-text-muted mt-0.5">
                      Select the holistic nursing domain governing the care plan entry.
                    </p>
                  </div>
                </div>

                <div className="relative w-full sm:w-48">
                  <input
                    type="text"
                    value={componentFilter}
                    onChange={(e) => setComponentFilter(e.target.value)}
                    placeholder="Search 21 domains..."
                    className="w-full text-xs py-1.5 px-space-sm rounded-lg bg-surface-container-low border border-border-subtle text-text-primary placeholder-text-muted outline-none focus:border-primary transition-all"
                  />
                </div>
              </div>

              {/* Component Grid Selector (3 columns × 7 rows = 21 Care Components, fits without scrolling) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {filteredComponents.map((c) => {
                  const isActive = c.code === componentCode;
                  return (
                    <button
                      key={c.code}
                      onClick={() => {
                        setComponentCode(c.code);
                        // Reset diagnosis selection if not in available
                        const firstDiag = DIAGNOSES.find(d => d.componentCode === c.code);
                        if (firstDiag) setSelectedDiagCode(firstDiag.code);
                        const firstInterv = INTERVENTIONS.find(i => i.componentCode === c.code);
                        if (firstInterv) setSelectedIntervCode(firstInterv.code);
                      }}
                      className={`text-left p-2.5 rounded-lg transition-all flex flex-col justify-between min-h-[52px] cursor-pointer group border ${
                        isActive
                          ? 'bg-primary text-on-primary shadow-sm border-primary ring-2 ring-primary/20'
                          : 'bg-surface-container-low hover:bg-surface-container border-border-subtle text-primary hover:border-primary/40'
                      }`}
                      title={`Code ${c.code}: ${c.name} (${c.pattern})`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className={`font-label-sm text-[11px] uppercase tracking-wider font-bold ${
                          isActive ? 'text-secondary-fixed' : 'text-text-muted'
                        }`}>
                          Code {c.code}
                        </span>
                        {isActive ? (
                          <span className="material-symbols-outlined text-[16px] text-secondary-fixed">
                            check_circle
                          </span>
                        ) : (
                          <span className="text-[10px] text-text-muted font-mono opacity-70">
                            {c.conceptCount ? `${c.conceptCount} concepts` : ''}
                          </span>
                        )}
                      </div>
                      <span className={`font-label-md text-label-md truncate mt-0.5 ${isActive ? 'font-bold text-white' : 'font-semibold text-primary'}`}>
                        {c.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Component Description Callout */}
              <div className="p-space-sm rounded-lg bg-surface-container-low border border-border-subtle flex items-start gap-space-sm text-text-muted">
                <span className="material-symbols-outlined text-columbia-crown-blue text-[20px] shrink-0 mt-0.5">
                  info
                </span>
                <div>
                  <span className="font-label-sm text-label-sm font-bold text-primary">
                    Selected: Component {currentComp.code} — {currentComp.name}
                  </span>
                  <p className="font-body-sm text-body-sm text-text-muted">
                    {currentComp.description}
                  </p>
                </div>
              </div>
            </div>

            {/* STEP 2: NURSING DIAGNOSIS */}
            <div className="bg-surface-card border border-border-subtle rounded-xl p-space-lg shadow-sm space-y-space-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-space-sm">
                  <div className="w-8 h-8 rounded-lg bg-primary text-on-primary font-bold font-headline-sm text-[14px] flex items-center justify-center shrink-0 shadow-sm">
                    2
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="font-headline-sm text-headline-sm text-primary font-bold">
                        Step 2: Nursing Diagnosis
                      </h2>
                      <span className="px-space-xs py-0.5 rounded text-[10px] font-label-sm uppercase tracking-wide bg-secondary-container text-on-secondary-container font-bold">
                        Step 2: Diagnostic Concept
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-text-muted mt-0.5">
                      Choose primary nursing diagnosis concept under {currentComp.name}.
                    </p>
                  </div>
                </div>
                <span className="px-space-xs py-0.5 rounded text-[11px] font-label-sm bg-surface-container-high text-primary font-semibold border border-border-subtle self-start sm:self-center">
                  Filtered by Component {componentCode}
                </span>
              </div>

              {/* Diagnoses Radio Card List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-sm">
                {availableDiagnoses.map((d) => {
                  const isChecked = d.code === selectedDiagCode;
                  return (
                    <label
                      key={d.code}
                      onClick={() => {
                        setSelectedDiagCode(d.code);
                        const subList = getSubDiagnoses(d.code, componentCode, currentComp.name, d.name);
                        if (subList.length > 0) setSelectedSubDiagCode(subList[0].code);
                      }}
                      className={`cursor-pointer rounded-lg p-space-sm border shadow-sm flex flex-col justify-between gap-space-xs transition-all ${
                        isChecked
                          ? 'bg-blue-50/70 border-primary border-2'
                          : 'bg-surface-card hover:bg-surface-container-low border-border-subtle'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                            isChecked ? 'bg-primary text-on-primary' : 'bg-surface-container text-text-muted'
                          }`}>
                            {d.code}
                          </span>
                          <div className="font-label-md text-label-md font-bold text-primary mt-1">
                            {d.name}
                          </div>
                          <div className="font-body-sm text-[12px] text-text-muted">
                            {d.definition}
                          </div>
                        </div>
                        <input
                          type="radio"
                          name="diagnosis_base"
                          checked={isChecked}
                          onChange={() => {
                            setSelectedDiagCode(d.code);
                            const subList = getSubDiagnoses(d.code, componentCode, currentComp.name, d.name);
                            if (subList.length > 0) setSelectedSubDiagCode(subList[0].code);
                          }}
                          className="accent-primary h-4 w-4 mt-1 text-primary focus:ring-primary cursor-pointer"
                        />
                      </div>
                    </label>
                  );
                })}
              </div>

              {/* Step 2 Cascading Selection Controller */}
              <div className="flex items-center justify-between p-space-sm rounded-lg bg-surface-container-low border border-border-subtle flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[20px]">account_tree</span>
                  <div>
                    <span className="font-label-sm text-xs font-bold text-primary">
                      Cascading Selection (Step 2b):
                    </span>
                    <p className="font-body-sm text-[11px] text-text-muted">
                      Show Step 2b only if cascading into specific sub-diagnoses and qualifiers.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-surface-card p-1 rounded-lg border border-border-subtle shadow-inner">
                  <button
                    type="button"
                    onClick={() => setHasCascadingDiag(false)}
                    className={`px-3 py-1 rounded text-xs font-label-md transition-all cursor-pointer ${
                      !hasCascadingDiag
                        ? 'bg-primary text-on-primary font-bold shadow-sm'
                        : 'text-text-muted hover:text-primary font-medium'
                    }`}
                  >
                    Direct Concept (No 2b)
                  </button>
                  <button
                    type="button"
                    onClick={() => setHasCascadingDiag(true)}
                    className={`px-3 py-1 rounded text-xs font-label-md transition-all flex items-center gap-1.5 cursor-pointer ${
                      hasCascadingDiag
                        ? 'bg-secondary text-white font-bold shadow-sm'
                        : 'text-text-muted hover:text-primary font-medium'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[15px]">subdirectory_arrow_right</span>
                    <span>Cascade into Sub-Diagnosis (Step 2b)</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/20 font-mono font-bold">
                      {availableSubDiagnoses.length} available
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* STEP 2b: SUB-DIAGNOSIS & CONDITION QUALIFIER (CONDITIONAL: SHOWN ONLY IF CASCADING SELECTION) */}
            {hasCascadingDiag && (
              <div className="bg-surface-card border-2 border-secondary/30 rounded-xl p-space-lg shadow-sm space-y-space-md transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border-subtle pb-space-sm">
                  <div className="flex items-start gap-space-sm">
                    <div className="w-8 h-8 rounded-lg bg-secondary text-white font-bold font-headline-sm text-[12px] flex items-center justify-center shrink-0 shadow-sm">
                      2b
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="font-headline-sm text-headline-sm text-primary font-bold">
                          Step 2b: Sub-Diagnosis &amp; Condition Modifier
                        </h2>
                        <span className="px-space-xs py-0.5 rounded text-[10px] font-label-sm uppercase tracking-wide bg-secondary-container text-on-secondary-container font-bold">
                          Cascading Selection Active
                        </span>
                      </div>
                      <p className="font-body-sm text-body-sm text-text-muted mt-0.5">
                        Choose discrete sub-diagnosis under {currentDiag.name} and assign optional condition qualifier.
                      </p>
                    </div>
                  </div>
                  <span className="px-space-xs py-0.5 rounded text-[11px] font-label-sm bg-surface-container-high text-secondary font-bold border border-border-subtle self-start sm:self-center">
                    Sub-Concepts of {currentDiag.code}
                  </span>
                </div>

                {/* Sub-Diagnoses Radio Cards */}
                <div className="space-y-space-xs">
                  <div className="text-xs font-bold text-primary flex items-center gap-1.5 mb-1">
                    <span className="material-symbols-outlined text-[16px] text-secondary">format_list_bulleted</span>
                    <span>Select Specific Child Sub-Diagnosis:</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-space-sm">
                    {availableSubDiagnoses.map((sd) => {
                      const isChecked = sd.code === selectedSubDiagCode;
                      return (
                        <label
                          key={sd.code}
                          onClick={() => setSelectedSubDiagCode(sd.code)}
                          className={`cursor-pointer rounded-lg p-space-sm border shadow-sm flex flex-col justify-between gap-space-xs transition-all ${
                            isChecked
                              ? 'bg-blue-50/70 border-secondary border-2'
                              : 'bg-surface-card hover:bg-surface-container-low border-border-subtle'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                                isChecked ? 'bg-secondary text-white' : 'bg-surface-container text-text-muted'
                              }`}>
                                {sd.code}
                              </span>
                              <div className="font-label-md text-label-md font-bold text-primary mt-1">
                                {sd.name}
                              </div>
                              <div className="font-body-sm text-[12px] text-text-muted mt-0.5">
                                {sd.definition}
                              </div>
                            </div>
                            <input
                              type="radio"
                              name="sub_diagnosis_radio"
                              checked={isChecked}
                              onChange={() => setSelectedSubDiagCode(sd.code)}
                              className="accent-secondary h-4 w-4 mt-1 text-secondary focus:ring-secondary cursor-pointer"
                            />
                          </div>
                          <div className="pt-1.5 border-t border-border-subtle/60 flex items-center justify-between text-[11px] text-text-muted mt-1">
                            <span>SNOMED: <strong className="font-mono text-primary">{sd.snomed}</strong></span>
                            <span>ICD-10: <strong className="font-mono text-secondary">{sd.icd10}</strong></span>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Diagnostic Condition / Qualifier (CCC 4th digit modifier) */}
                <div className="bg-surface-container-low border border-border-subtle p-space-md rounded-lg space-y-space-xs">
                  <div className="flex items-center justify-between mb-space-xs">
                    <label className="font-label-md text-label-md text-primary font-bold flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px] text-secondary">tune</span>
                      Diagnostic Condition / Qualifier Modifier:
                    </label>
                    <span className="font-label-sm text-[11px] text-text-muted">Affects terminal digit</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-space-xs">
                    {QUALIFIERS.map((q) => {
                      const isActive = q.code === qualifierCode;
                      return (
                        <button
                          key={q.code}
                          type="button"
                          onClick={() => setQualifierCode(q.code)}
                          className={`px-space-sm py-space-xs rounded-lg text-left transition-all cursor-pointer ${
                            isActive
                              ? 'bg-secondary text-white border border-secondary shadow-sm'
                              : 'bg-surface-card border border-border-subtle hover:bg-surface-container text-primary'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className={`font-mono text-[11px] font-bold ${isActive ? 'text-white' : 'text-text-muted'}`}>
                              .{q.code}
                            </span>
                            {isActive && (
                              <span className="material-symbols-outlined text-[14px] text-white">
                                check
                              </span>
                            )}
                          </div>
                          <div className={`font-label-sm text-[12px] mt-0.5 ${isActive ? 'font-bold' : 'font-medium text-primary'}`}>
                            {q.label}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-space-sm flex items-center justify-between text-[12px] font-body-sm text-text-muted pt-1">
                    <span>
                      Synthesized Sub-Diagnosis Code:{' '}
                      <strong className="text-primary font-mono bg-white px-2 py-0.5 rounded border border-border-subtle shadow-sm">
                        {synthesizedDiagCode}
                      </strong>
                    </span>
                    <span className="text-secondary font-semibold">
                      Active: {currentSubDiag.name}{qualifierCode !== '0' ? `, ${qualifierObj.label}` : ''}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: OUTCOME IDENTIFICATION (EXPECTED GOAL) */}
            <div className="bg-surface-card border border-border-subtle rounded-xl p-space-lg shadow-sm space-y-space-md">
              <div className="flex items-start gap-space-sm">
                <div className="w-8 h-8 rounded-lg bg-primary text-on-primary font-bold font-headline-sm text-[14px] flex items-center justify-center shrink-0 shadow-sm">
                  3
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="font-headline-sm text-headline-sm text-primary font-bold">
                      Step 3: Outcome Identification (Expected Goal)
                    </h2>
                    <span className="px-space-xs py-0.5 rounded text-[10px] font-label-sm uppercase tracking-wide bg-secondary-container text-on-secondary-container font-bold">
                      Step 3: Clinical Trajectory
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-text-muted mt-0.5">
                    Set the anticipated patient trajectory and measurable goal for the care plan entry.
                  </p>
                </div>
              </div>

              <div className="bg-surface-container-low border border-border-subtle p-space-md rounded-lg space-y-space-xs">
                <div className="flex items-center justify-between mb-space-xs">
                  <div className="flex items-center gap-2">
                    <label className="font-label-md text-label-md text-primary font-bold flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px] text-secondary">flag</span>
                      Expected Clinical Goal:
                    </label>
                  </div>
                  <span className="font-label-sm text-[11px] text-text-muted">Goal Suffix: .[Goal]</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-xs">
                  {GOALS.map((g) => {
                    const isActive = g.code === goalCode;
                    return (
                      <button
                        key={g.code}
                        type="button"
                        onClick={() => setGoalCode(g.code)}
                        className={`p-space-sm rounded-lg text-left transition-all flex flex-col justify-between cursor-pointer ${
                          isActive
                            ? 'bg-primary text-on-primary border border-primary shadow-sm'
                            : 'bg-surface-card border border-border-subtle hover:bg-surface-container text-primary'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`font-mono text-[11px] font-bold ${isActive ? 'text-secondary-fixed' : 'text-text-muted'}`}>
                            .{g.code}
                          </span>
                          {isActive && (
                            <span className="material-symbols-outlined text-[16px] text-secondary-fixed">
                              check
                            </span>
                          )}
                        </div>
                        <div className={`font-label-sm text-[13px] mt-1 ${isActive ? 'font-bold' : 'font-semibold text-primary'}`}>
                          {g.label}
                        </div>
                        <div className={`text-[11px] leading-tight mt-0.5 ${isActive ? 'text-secondary-fixed/90' : 'text-text-muted'}`}>
                          {g.description}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="pt-2 flex items-center justify-between text-[12px] font-body-sm border-t border-border-subtle mt-space-xs">
                  <span className="text-text-muted">
                    Synthesized Diagnosis + Goal Code:{' '}
                    <strong className="text-primary font-mono text-sm bg-white px-2 py-0.5 rounded border border-border-subtle shadow-sm">
                      {diagWithGoalCode}
                    </strong>
                  </span>
                  <span className="text-secondary font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px]">verified</span> Expected Goal: {goalObj.label} (.{goalCode})
                  </span>
                </div>
              </div>
            </div>

            {/* STEP 4: NURSING INTERVENTION */}
            <div className="bg-surface-card border border-border-subtle rounded-xl p-space-lg shadow-sm space-y-space-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-space-sm">
                  <div className="w-8 h-8 rounded-lg bg-primary text-on-primary font-bold font-headline-sm text-[14px] flex items-center justify-center shrink-0 shadow-sm">
                    4
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="font-headline-sm text-headline-sm text-primary font-bold">
                        Step 4: Nursing Intervention
                      </h2>
                      <span className="px-space-xs py-0.5 rounded text-[10px] font-label-sm uppercase tracking-wide bg-secondary-container text-on-secondary-container font-bold">
                        Step 4: Clinical Planning
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-text-muted mt-0.5">
                      Determine core nursing action concept prescribed or implemented under {currentComp.name}.
                    </p>
                  </div>
                </div>

                <div className="relative w-full sm:w-48">
                  <input
                    type="text"
                    value={intervFilter}
                    onChange={(e) => setIntervFilter(e.target.value)}
                    placeholder="Filter interventions..."
                    className="w-full text-xs py-1.5 px-space-sm rounded-lg bg-surface-container-low border border-border-subtle text-text-primary placeholder-text-muted outline-none focus:border-primary transition-all"
                  />
                </div>
              </div>

              {/* Intervention Cards */}
              <div className="space-y-space-xs">
                {availableInterventions.map((item) => {
                  const isChecked = item.code === selectedIntervCode;
                  return (
                    <label
                      key={item.code}
                      onClick={() => {
                        setSelectedIntervCode(item.code);
                        const subList = getSubInterventions(item.code, componentCode, currentComp.name, item.name);
                        if (subList.length > 0) setSelectedSubIntervCode(subList[0].code);
                      }}
                      className={`cursor-pointer block p-space-sm rounded-lg shadow-sm transition-all border ${
                        isChecked
                          ? 'bg-blue-50/70 border-primary border-2'
                          : 'bg-surface-card hover:bg-surface-container-low border-border-subtle'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-space-sm">
                          <input
                            type="radio"
                            name="intervention_radio"
                            checked={isChecked}
                            onChange={() => {
                              setSelectedIntervCode(item.code);
                              const subList = getSubInterventions(item.code, componentCode, currentComp.name, item.name);
                              if (subList.length > 0) setSelectedSubIntervCode(subList[0].code);
                            }}
                            className="accent-primary h-4 w-4 text-primary focus:ring-primary cursor-pointer"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className={`font-mono text-xs font-bold px-1.5 py-0.5 rounded ${
                                isChecked ? 'bg-primary text-on-primary' : 'bg-surface-container text-text-muted'
                              }`}>
                                {item.code}
                              </span>
                              <span className="font-label-md text-label-md font-bold text-primary">
                                {item.name}
                              </span>
                            </div>
                            <div className="font-body-sm text-[12px] text-text-muted">
                              {item.definition}
                            </div>
                          </div>
                        </div>

                        <div className="hidden sm:flex items-center gap-2 text-right">
                          <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-white border border-border-subtle text-columbia-crown-blue font-semibold">
                            SNOMED: {item.snomed}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-white border border-border-subtle text-secondary font-semibold">
                            LOINC: {item.loinc}
                          </span>
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>

              {/* Step 4 Cascading Selection Controller */}
              <div className="flex items-center justify-between p-space-sm rounded-lg bg-surface-container-low border border-border-subtle flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[20px]">account_tree</span>
                  <div>
                    <span className="font-label-sm text-xs font-bold text-primary">
                      Cascading Selection (Step 4b):
                    </span>
                    <p className="font-body-sm text-[11px] text-text-muted">
                      Show Step 4b only if cascading into discrete bedside protocols.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-surface-card p-1 rounded-lg border border-border-subtle shadow-inner">
                  <button
                    type="button"
                    onClick={() => setHasCascadingInterv(false)}
                    className={`px-3 py-1 rounded text-xs font-label-md transition-all cursor-pointer ${
                      !hasCascadingInterv
                        ? 'bg-primary text-on-primary font-bold shadow-sm'
                        : 'text-text-muted hover:text-primary font-medium'
                    }`}
                  >
                    Direct Intervention (No 4b)
                  </button>
                  <button
                    type="button"
                    onClick={() => setHasCascadingInterv(true)}
                    className={`px-3 py-1 rounded text-xs font-label-md transition-all flex items-center gap-1.5 cursor-pointer ${
                      hasCascadingInterv
                        ? 'bg-secondary text-white font-bold shadow-sm'
                        : 'text-text-muted hover:text-primary font-medium'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[15px]">subdirectory_arrow_right</span>
                    <span>Cascade into Sub-Intervention (Step 4b)</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/20 font-mono font-bold">
                      {availableSubInterventions.length} available
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* STEP 4b: SUB-INTERVENTION PROTOCOL (CONDITIONAL: SHOWN ONLY IF CASCADING SELECTION) */}
            {hasCascadingInterv && (
              <div className="bg-surface-card border-2 border-secondary/30 rounded-xl p-space-lg shadow-sm space-y-space-md transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border-subtle pb-space-sm">
                  <div className="flex items-start gap-space-sm">
                    <div className="w-8 h-8 rounded-lg bg-secondary text-white font-bold font-headline-sm text-[12px] flex items-center justify-center shrink-0 shadow-sm">
                      4b
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="font-headline-sm text-headline-sm text-primary font-bold">
                          Step 4b: Sub-Intervention Protocol
                        </h2>
                        <span className="px-space-xs py-0.5 rounded text-[10px] font-label-sm uppercase tracking-wide bg-secondary-container text-on-secondary-container font-bold">
                          Cascading Selection Active
                        </span>
                      </div>
                      <p className="font-body-sm text-body-sm text-text-muted mt-0.5">
                        Choose discrete bedside protocol executing {currentInterv.name}.
                      </p>
                    </div>
                  </div>
                  <span className="px-space-xs py-0.5 rounded text-[11px] font-label-sm bg-surface-container-high text-secondary font-bold border border-border-subtle self-start sm:self-center">
                    Sub-Protocols of {currentInterv.code}
                  </span>
                </div>

                {/* Sub-Interventions Radio Cards */}
                <div className="space-y-space-xs">
                  <div className="text-xs font-bold text-primary flex items-center gap-1.5 mb-1">
                    <span className="material-symbols-outlined text-[16px] text-secondary">format_list_bulleted</span>
                    <span>Select Discrete Bedside Protocol:</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-space-sm">
                    {availableSubInterventions.map((si) => {
                      const isChecked = si.code === selectedSubIntervCode;
                      return (
                        <label
                          key={si.code}
                          onClick={() => setSelectedSubIntervCode(si.code)}
                          className={`cursor-pointer rounded-lg p-space-sm border shadow-sm flex flex-col justify-between gap-space-xs transition-all ${
                            isChecked
                              ? 'bg-blue-50/70 border-secondary border-2'
                              : 'bg-surface-card hover:bg-surface-container-low border-border-subtle'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                                isChecked ? 'bg-secondary text-white' : 'bg-surface-container text-text-muted'
                              }`}>
                                {si.code}
                              </span>
                              <div className="font-label-md text-label-md font-bold text-primary mt-1">
                                {si.name}
                              </div>
                              <div className="font-body-sm text-[12px] text-text-muted mt-0.5">
                                {si.definition}
                              </div>
                            </div>
                            <input
                              type="radio"
                              name="sub_intervention_radio"
                              checked={isChecked}
                              onChange={() => setSelectedSubIntervCode(si.code)}
                              className="accent-secondary h-4 w-4 mt-1 text-secondary focus:ring-secondary cursor-pointer"
                            />
                          </div>
                          <div className="pt-1.5 border-t border-border-subtle/60 flex items-center justify-between text-[11px] text-text-muted mt-1">
                            <span>LOINC: <strong className="font-mono text-secondary">{si.loinc}</strong></span>
                            <span>SNOMED: <strong className="font-mono text-primary">{si.snomed}</strong></span>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className="p-space-sm rounded-lg bg-surface-container-low border border-border-subtle flex items-center justify-between text-[12px] font-body-sm text-text-muted">
                  <span>
                    Selected Sub-Intervention Code:{' '}
                    <strong className="text-secondary font-mono bg-white px-2 py-0.5 rounded border border-border-subtle shadow-sm font-bold">
                      {currentSubInterv.code}
                    </strong>
                  </span>
                  <span className="text-primary font-semibold">
                    Protocol: {currentSubInterv.name}
                  </span>
                </div>
              </div>
            )}

            {/* STEP 5: ACTION TYPE MODIFIER */}
            <div className="bg-surface-card border border-border-subtle rounded-xl p-space-lg shadow-sm space-y-space-md">
              <div className="flex items-start gap-space-sm">
                <div className="w-8 h-8 rounded-lg bg-primary text-on-primary font-bold font-headline-sm text-[14px] flex items-center justify-center shrink-0 shadow-sm">
                  5
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="font-headline-sm text-headline-sm text-primary font-bold">
                      Step 5: Action Type Modifier
                    </h2>
                    <span className="px-space-xs py-0.5 rounded text-[10px] font-label-sm uppercase tracking-wide bg-secondary-container text-on-secondary-container font-bold">
                      Step 5: Implementation
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-text-muted mt-0.5">
                    Configure the action workload factor (Assess, Care, Teach, or Manage).
                  </p>
                </div>
              </div>

              <div className="bg-surface-container-low border border-border-subtle p-space-md rounded-lg space-y-space-xs">
                <div className="flex items-center justify-between mb-space-xs">
                  <div className="flex items-center gap-2">
                    <label className="font-label-md text-label-md text-primary font-bold flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[18px] text-secondary">bolt</span>
                      4 Atomic Action Types:
                    </label>
                  </div>
                  <span className="font-label-sm text-[11px] text-text-muted">Terminal Action Digit: .[Action]</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                  {ACTION_TYPES.map((act) => {
                    const isActive = act.code === actionCode;
                    return (
                      <button
                        key={act.code}
                        type="button"
                        onClick={() => setActionCode(act.code)}
                        className={`p-space-sm rounded-lg text-left transition-all flex items-start justify-between cursor-pointer border ${
                          isActive
                            ? 'bg-primary text-on-primary border-primary shadow-sm'
                            : 'bg-surface-card border-border-subtle hover:bg-surface-container text-primary'
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded mt-0.5 ${
                            isActive ? 'bg-primary-container text-secondary-fixed' : 'bg-surface-container text-primary'
                          }`}>
                            .{act.code}
                          </span>
                          <div>
                            <div className={`font-label-md text-label-md ${isActive ? 'font-bold' : 'font-semibold text-primary'}`}>
                              {act.label}
                            </div>
                            <div className={`text-[12px] leading-snug mt-0.5 ${isActive ? 'text-secondary-fixed/90' : 'text-text-muted'}`}>
                              {act.description}
                            </div>
                          </div>
                        </div>
                        {isActive && (
                          <span className="material-symbols-outlined text-[18px] text-secondary-fixed shrink-0 mt-0.5">
                            check_circle
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="pt-2 flex items-center justify-between text-[12px] font-body-sm border-t border-border-subtle mt-space-xs">
                  <span className="text-text-muted">
                    Selected Action Code:{' '}
                    <strong className="text-primary font-mono text-xs bg-white px-2 py-0.5 rounded border border-border-subtle shadow-sm">
                      .{actionCode} ({actionObj.label})
                    </strong>
                  </span>
                  <span className="text-secondary font-semibold">
                    Workload Scope: {actionObj.description}
                  </span>
                </div>
              </div>
            </div>

            {/* STEP 6: ACTUAL OUTCOME EVALUATION */}
            <div className="bg-surface-card border border-border-subtle rounded-xl p-space-lg shadow-sm space-y-space-md">
              <div className="flex items-start gap-space-sm">
                <div className="w-8 h-8 rounded-lg bg-primary text-on-primary font-bold font-headline-sm text-[14px] flex items-center justify-center shrink-0 shadow-sm">
                  6
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="font-headline-sm text-headline-sm text-primary font-bold">
                      Step 6: Actual Outcome Evaluation
                    </h2>
                    <span className="px-space-xs py-0.5 rounded text-[10px] font-label-sm uppercase tracking-wide bg-secondary-container text-on-secondary-container font-bold">
                      Step 6: Clinical Evaluation
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-text-muted mt-0.5">
                    Record measured actual patient outcome and compare against expected goal trajectory.
                  </p>
                </div>
              </div>

              <div className="bg-surface-container-low border border-border-subtle p-space-md rounded-lg space-y-space-xs">
                <div className="flex items-center justify-between mb-space-xs">
                  <div className="flex items-center gap-2">
                    <label className="font-label-md text-label-md text-primary font-bold flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[18px] text-secondary">assignment_turned_in</span>
                      Measured Actual Outcome:
                    </label>
                  </div>
                  <span className="font-label-sm text-[11px] text-text-muted">Terminal Evaluation Digit: .[Outcome]</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-xs">
                  {OUTCOMES.map((out) => {
                    const isActive = out.code === outcomeCode;
                    return (
                      <button
                        key={out.code}
                        type="button"
                        onClick={() => setOutcomeCode(out.code)}
                        className={`p-space-sm rounded-lg text-left transition-all flex flex-col justify-between cursor-pointer border ${
                          isActive
                            ? 'bg-primary text-on-primary border-primary shadow-sm'
                            : 'bg-surface-card border-border-subtle hover:bg-surface-container text-primary'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`font-mono text-xs font-bold px-1.5 py-0.5 rounded ${
                            isActive ? 'bg-primary-container text-secondary-fixed' : 'bg-surface-container text-primary'
                          }`}>
                            .{out.code}
                          </span>
                          {isActive && (
                            <span className="material-symbols-outlined text-[16px] text-secondary-fixed">
                              check
                            </span>
                          )}
                        </div>
                        <div className={`font-label-md text-label-md mt-1.5 ${isActive ? 'font-bold' : 'font-semibold text-primary'}`}>
                          {out.label}
                        </div>
                        <div className={`text-[11px] leading-tight mt-0.5 ${isActive ? 'text-secondary-fixed/90' : 'text-text-muted'}`}>
                          {out.description}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="pt-2 flex items-center justify-between text-[12px] font-body-sm border-t border-border-subtle mt-space-xs">
                  <span className="text-text-muted">
                    Actual Outcome Code:{' '}
                    <strong className="text-primary font-mono text-xs bg-white px-2 py-0.5 rounded border border-border-subtle shadow-sm">
                      .{outcomeCode} ({outcomeObj.label})
                    </strong>
                  </span>
                  <span className="text-secondary font-semibold">
                    Measured Result: {outcomeObj.description}
                  </span>
                </div>
              </div>

              {/* Goal Delta Comparison banner */}
              <div className={`mt-space-md p-space-sm rounded-lg border font-body-sm text-[13px] flex items-center justify-between flex-wrap gap-2 ${
                isGoalMet
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : 'bg-amber-50 border-amber-200 text-amber-900'
              }`}>
                <div className="flex items-center gap-2">
                  <span className={`material-symbols-outlined text-[20px] ${isGoalMet ? 'text-emerald-700' : 'text-amber-700'}`}>
                    {isGoalMet ? 'task_alt' : 'trending_flat'}
                  </span>
                  <span className="font-medium">
                    Goal Comparison: Expected <strong>[{goalCode} {goalObj.label}]</strong>{' '}
                    {isGoalMet ? 'matches' : 'differs from'} Actual <strong>[{outcomeCode} {outcomeObj.label}]</strong>
                  </span>
                </div>
                <span className={`font-mono font-bold text-[11px] px-2.5 py-1 rounded border ${
                  isGoalMet
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    : 'bg-amber-100 text-amber-800 border-amber-300'
                }`}>
                  {isGoalMet ? 'Goal Met' : 'Clinical Delta'}
                </span>
              </div>

              {/* Validation notice */}
              <div className="pt-space-sm flex items-center justify-between flex-wrap gap-2">
                <span className="font-label-sm text-[12px] text-text-muted">
                  Steps 1–6 configured • Care plan pair validated
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Clean, Light-Themed Live Synthesizer & Active Queue (4 cols) - Ends at Step 6 */}
          <div className="lg:col-span-4 sticky top-24 space-y-space-lg">
            {/* Live Synthesizer Card */}
            <div className="bg-surface-card border border-border-subtle rounded-xl p-space-md shadow-md space-y-space-md">
              <div className="flex items-center justify-between border-b border-border-subtle pb-space-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-columbia-crown-blue animate-pulse"></div>
                  <span className="font-headline-sm text-sm font-bold text-primary uppercase tracking-wide">
                    Live Synthesizer
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-label-sm bg-emerald-100 text-emerald-800 font-bold border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                  Valid Syntax (v2.5)
                </span>
              </div>

              {/* Synthesized Code Callout */}
              <div className="bg-surface-container-low border border-border-subtle rounded-xl p-space-sm space-y-space-xs">
                <div className="flex items-center justify-between text-text-muted font-label-sm text-[11px]">
                  <span className="uppercase tracking-wider font-semibold text-columbia-crown-blue">
                    Combined CCC Care Plan Pair
                  </span>
                  <span className="font-mono text-[10px] text-text-muted bg-white px-1.5 py-0.5 rounded border border-border-subtle">
                    HL7 / FHIR
                  </span>
                </div>

                <div className="font-mono text-xl sm:text-2xl font-bold tracking-tight text-primary py-1 flex items-center justify-between">
                  {fullPairCode}
                </div>

                <div className="grid grid-cols-2 gap-space-xs pt-space-xs border-t border-border-subtle">
                  <div className="bg-white p-2 rounded-lg border border-border-subtle">
                    <div className="text-[10px] text-text-muted uppercase font-mono font-semibold">
                      Diagnosis (Steps 2-3)
                    </div>
                    <div className="font-mono text-sm font-bold text-primary">
                      {diagWithGoalCode}
                    </div>
                    <div className="text-[11px] text-text-muted truncate mt-0.5">
                      {activeDiagName} ({qualifierObj.label})
                    </div>
                  </div>

                  <div className="bg-white p-2 rounded-lg border border-border-subtle">
                    <div className="text-[10px] text-text-muted uppercase font-mono font-semibold">
                      Intervention (Steps 4-6)
                    </div>
                    <div className="font-mono text-sm font-bold text-secondary">
                      {intervPairCode}
                    </div>
                    <div className="text-[11px] text-text-muted truncate mt-0.5">
                      {activeIntervName} ({actionObj.label.split('/')[0]})
                    </div>
                  </div>
                </div>

                <div className="pt-space-xs flex items-center justify-between">
                  <button
                    onClick={handleCopyCode}
                    className="text-primary hover:text-columbia-crown-blue font-label-sm text-xs flex items-center gap-1 font-semibold transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">content_copy</span>
                    <span>{copiedCode ? 'Copied!' : 'Copy Pair Code'}</span>
                  </button>

                  <button
                    onClick={handleOpenFhir}
                    className="text-columbia-crown-blue hover:text-primary font-label-sm text-xs flex items-center gap-1 font-semibold transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">data_object</span>
                    <span>View FHIR JSON</span>
                  </button>
                </div>
              </div>

              {/* EHR Mapping Crosswalk section */}
              <div className="space-y-space-xs pt-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase font-bold text-text-muted tracking-wider">
                    EHR Mapping Crosswalk
                  </span>
                  <span className="text-[10px] text-secondary font-semibold">Columbia Terminology</span>
                </div>

                <div className="grid grid-cols-2 gap-space-xs">
                  <div className="bg-surface-container-low border border-border-subtle p-2 rounded-lg text-left">
                    <div className="text-[10px] text-text-muted font-label-sm uppercase font-semibold">
                      SNOMED CT Concept
                    </div>
                    <div className="font-mono text-xs font-bold text-primary">
                      {activeDiagSnomed}
                    </div>
                  </div>

                  <div className="bg-surface-container-low border border-border-subtle p-2 rounded-lg text-left">
                    <div className="text-[10px] text-text-muted font-label-sm uppercase font-semibold">
                      LOINC Panel ID
                    </div>
                    <div className="font-mono text-xs font-bold text-secondary">
                      {activeIntervLoinc}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-text-muted pt-1">
                  <span className="material-symbols-outlined text-[15px] text-secondary">verified</span>
                  <span>Compatible with Epic Nursing POC, Cerner CareNet, VA VistA</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="space-y-space-xs pt-space-xs">
                <button
                  onClick={handleAddToQueue}
                  className="w-full py-2.5 px-space-md rounded-lg bg-primary hover:bg-columbia-crown-blue text-on-primary font-label-md text-label-md font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">add_circle</span>
                  <span>Save to Care Plan Queue</span>
                </button>

                <div className="grid grid-cols-2 gap-space-xs">
                  <button
                    onClick={handleExportCsv}
                    className="py-2 px-space-sm rounded-lg bg-surface-container-high hover:bg-surface-container text-primary font-label-sm text-label-sm font-semibold transition-all border border-border-subtle flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">file_download</span>
                    <span>Export CSV</span>
                  </button>

                  <button
                    onClick={handleOpenFhir}
                    className="py-2 px-space-sm rounded-lg bg-surface-container-high hover:bg-surface-container text-primary font-label-sm text-label-sm font-semibold transition-all border border-border-subtle flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">data_object</span>
                    <span>Export FHIR JSON</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Active Care Plan Queue */}
            <div className="bg-surface-card border border-border-subtle rounded-xl p-space-md shadow-sm space-y-space-sm">
              <div className="flex items-center justify-between border-b border-border-subtle pb-space-xs">
                <div className="flex items-center gap-2">
                  <h3 className="font-headline-sm text-sm font-bold text-primary">
                    Active Care Plan Queue
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary text-on-primary">
                    {queue.length}
                  </span>
                </div>
                {queue.length > 0 && (
                  <button
                    onClick={handleClearQueue}
                    className="text-xs text-text-muted hover:text-clinical-alert-red transition-colors cursor-pointer"
                  >
                    Clear All
                  </button>
                )}
              </div>

              <div className="space-y-space-xs max-h-52 overflow-y-auto pr-0.5">
                {queue.length === 0 ? (
                  <div className="p-3 text-xs text-text-muted text-center bg-surface-container-low rounded-lg border border-border-subtle">
                    Batch queue is currently empty.
                  </div>
                ) : (
                  queue.map((item) => (
                    <div
                      key={item.id}
                      className="p-2.5 rounded-lg bg-surface-container-low border border-border-subtle text-xs space-y-1 relative"
                    >
                      <div className="flex items-center justify-between font-mono font-bold text-primary">
                        <span>{item.pairCode}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container font-semibold">
                          {item.actionName}
                        </span>
                      </div>
                      <div className="text-text-primary text-[11px]">
                        {item.description}
                      </div>
                    </div>
                  ))
                )}
              </div>

              <button
                onClick={handleDownloadBatch}
                className="w-full py-2 px-space-sm rounded-lg bg-surface-container hover:bg-surface-container-high text-primary font-label-sm text-label-sm font-bold transition-all border border-border-subtle flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">download</span>
                <span>Download Full Plan of Care (.POC)</span>
              </button>
            </div>
          </div>
        </div>

        {/* FULL-WIDTH FINAL SECTION: CARE PLAN SUMMARY & CERTIFIED EHR EXPORT */}
        <div className="mt-space-xl">
          <div id="step-7-summary" className="bg-surface-card border-2 border-primary/20 rounded-xl p-space-lg shadow-md space-y-space-md scroll-mt-28 w-full">
            {/* Header with Title, Status Badges & Quick Primary Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border-subtle pb-space-sm">
              <div className="flex items-start gap-space-sm">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="font-headline-sm text-headline-sm text-primary font-bold">
                      Final: Care Plan Summary &amp; Certified EHR Export
                    </h2>
                    <span className="px-space-xs py-0.5 rounded text-[10px] font-label-sm uppercase tracking-wide bg-emerald-100 text-emerald-800 font-bold border border-emerald-200">
                      Care Plan Validated
                    </span>
                    <span className="px-space-xs py-0.5 rounded text-[10px] font-label-sm uppercase tracking-wide bg-blue-100 text-blue-800 font-bold border border-blue-200">
                      6-Step Architecture Complete
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-text-muted mt-0.5">
                    Synthesized clinical care pair, standardized informatics crosswalks, and certified EHR export payloads.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => handleCopy(fullPairCode, 'Full Code')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container text-primary font-label-sm text-[12px] font-bold transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">content_copy</span>
                  <span>{copyFeedback === 'Full Code' ? 'Copied Code!' : 'Copy Pair Code'}</span>
                </button>
                <button
                  onClick={handleAddToQueue}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary hover:bg-columbia-crown-blue text-on-primary font-label-sm text-[12px] font-bold shadow-sm transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">playlist_add</span>
                  <span>+ Add to Queue</span>
                </button>
                <button
                  onClick={handlePrintSummary}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-border-subtle hover:bg-surface-container text-primary font-label-sm text-[12px] font-bold transition-all cursor-pointer"
                  title="Print Clinical Care Plan Summary"
                >
                  <span className="material-symbols-outlined text-[16px]">print</span>
                  <span>Print Plan</span>
                </button>
              </div>
            </div>

            {/* Clinical Trajectory & Decision Support Banner */}
            <div className={`p-space-md rounded-xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
              isGoalMet ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950' : 'bg-amber-50/70 border-amber-200 text-amber-950'
            }`}>
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                  isGoalMet ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'
                }`}>
                  <span className="material-symbols-outlined text-[20px]">
                    {isGoalMet ? 'task_alt' : 'clinical_notes'}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-label-md text-sm font-bold">
                      {isGoalMet ? 'Goal Achieved & Trajectory Confirmed' : 'Clinical Trajectory Note & Outcome Delta'}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      isGoalMet ? 'bg-emerald-200 text-emerald-900' : 'bg-amber-200 text-amber-900'
                    }`}>
                      {isGoalMet ? 'Goal Met' : 'Clinical Delta'}
                    </span>
                  </div>
                  <p className="font-body-sm text-xs mt-0.5 opacity-90 max-w-2xl">
                    {isGoalMet
                      ? `Expected goal [${goalCode} ${goalObj.label}] aligns with actual outcome [${outcomeCode} ${outcomeObj.label}]. Dr. Saba's relational model validates clinical resolution for [${synthesizedDiagCode}] ${activeDiagName}.`
                      : `Expected goal [${goalCode} ${goalObj.label}] recorded outcome delta [${outcomeCode} ${outcomeObj.label}]. Clinical monitoring indicates active surveillance under care component [${componentCode}].`
                    }
                  </p>
                </div>
              </div>

              {/* Saba Relational Formula Tag */}
              <div className="bg-white/90 border border-border-subtle rounded-lg px-3 py-1.5 shrink-0 shadow-2xs font-mono text-xs">
                <div className="text-[10px] text-text-muted font-sans font-semibold uppercase tracking-wider">
                  Saba Relational Formula
                </div>
                <div className="font-bold text-primary text-[13px]">
                  {fullPairCode}
                </div>
              </div>
            </div>

            {/* Synthesized Pair Display Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-sm pt-1">
              {/* Diagnosis Summary Card */}
              <div className="p-space-md rounded-lg bg-surface-container-low border border-border-subtle flex flex-col justify-between gap-space-xs">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-primary text-on-primary">
                      CCCD • DIAGNOSIS
                    </span>
                    <span className="font-label-sm text-[11px] text-text-muted">Expected Goal: {goalObj.label}</span>
                  </div>
                  <div className="font-mono text-lg font-bold text-primary mt-1.5">
                    {diagWithGoalCode}
                  </div>
                  <div className="font-label-md text-sm font-bold text-primary mt-0.5">
                    {activeDiagName} ({qualifierObj.label})
                  </div>
                </div>
                <div className="pt-2 border-t border-border-subtle flex items-center justify-between text-[11px] text-text-muted">
                  <span>SNOMED CT: <strong className="font-mono text-primary">{activeDiagSnomed}</strong></span>
                  <span>ICD-10-CM: <strong className="font-mono text-primary">{activeDiagIcd}</strong></span>
                </div>
              </div>

              {/* Intervention Summary Card */}
              <div className="p-space-md rounded-lg bg-surface-container-low border border-border-subtle flex flex-col justify-between gap-space-xs">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-secondary text-white">
                      CCCI • INTERVENTION
                    </span>
                    <span className="font-label-sm text-[11px] text-text-muted">Actual Outcome: {outcomeObj.label}</span>
                  </div>
                  <div className="font-mono text-lg font-bold text-primary mt-1.5">
                    {intervPairCode}
                  </div>
                  <div className="font-label-md text-sm font-bold text-primary mt-0.5">
                    {actionObj.label.split('/')[0].trim()} {activeIntervName}
                  </div>
                </div>
                <div className="pt-2 border-t border-border-subtle flex items-center justify-between text-[11px] text-text-muted">
                  <span>LOINC: <strong className="font-mono text-secondary">{activeIntervLoinc}</strong></span>
                  <span>SNOMED CT: <strong className="font-mono text-secondary">{activeIntervSnomed}</strong></span>
                </div>
              </div>
            </div>

            {/* Complete Step-by-Step Nursing Process Flow Audit Table */}
            <div className="border border-border-subtle rounded-lg overflow-hidden">
              <div className="bg-surface-container-high px-space-md py-2 border-b border-border-subtle flex items-center justify-between">
                <span className="font-label-sm text-xs font-bold text-primary uppercase tracking-wider">
                  {hasCascadingDiag || hasCascadingInterv ? 'Detailed Process Flow Audit (with Cascading Steps)' : 'Step-by-Step Nursing Process Flow Audit'}
                </span>
                <span className="font-mono text-[11px] text-text-muted">Pair Code: {fullPairCode}</span>
              </div>
              <div className="divide-y divide-border-subtle font-body-sm text-[12px] bg-white">
                <div className="p-2.5 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-surface-container text-primary font-bold flex items-center justify-center text-[11px]">1</span>
                    <span className="font-semibold text-primary">Assessment:</span>
                    <span className="text-text-muted">Care Component [{componentCode}] {currentComp.name}</span>
                  </div>
                  <span className="font-mono text-[11px] bg-surface-container-low px-1.5 py-0.5 rounded text-primary">Root: {currentComp.codeRoot}</span>
                </div>

                <div className="p-2.5 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-surface-container text-primary font-bold flex items-center justify-center text-[11px]">2</span>
                    <span className="font-semibold text-primary">Diagnosis:</span>
                    <span className="text-text-muted">{currentDiag.name}</span>
                  </div>
                  <span className="font-mono text-[11px] bg-surface-container-low px-1.5 py-0.5 rounded text-primary font-bold">{currentDiag.code}</span>
                </div>

                {hasCascadingDiag && (
                  <div className="p-2.5 flex items-center justify-between gap-2 bg-blue-50/50">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded bg-secondary text-white font-bold flex items-center justify-center text-[10px]">2b</span>
                      <span className="font-semibold text-secondary">Sub-Diagnosis &amp; Qualifier:</span>
                      <span className="text-text-muted">{currentSubDiag.name} (Modifier .{qualifierCode} {qualifierObj.label})</span>
                    </div>
                    <span className="font-mono text-[11px] bg-white border border-border-subtle px-1.5 py-0.5 rounded text-secondary font-bold">{synthesizedDiagCode}</span>
                  </div>
                )}

                <div className="p-2.5 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-surface-container text-primary font-bold flex items-center justify-center text-[11px]">3</span>
                    <span className="font-semibold text-primary">Outcome Goal:</span>
                    <span className="text-text-muted">Expected {goalObj.label}</span>
                  </div>
                  <span className="font-mono text-[11px] bg-surface-container-low px-1.5 py-0.5 rounded text-primary font-bold">.{goalCode} ({diagWithGoalCode})</span>
                </div>

                <div className="p-2.5 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-surface-container text-primary font-bold flex items-center justify-center text-[11px]">4</span>
                    <span className="font-semibold text-primary">Intervention:</span>
                    <span className="text-text-muted">{currentInterv.name}</span>
                  </div>
                  <span className="font-mono text-[11px] bg-surface-container-low px-1.5 py-0.5 rounded text-secondary font-bold">{currentInterv.code}</span>
                </div>

                {hasCascadingInterv && (
                  <div className="p-2.5 flex items-center justify-between gap-2 bg-blue-50/50">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded bg-secondary text-white font-bold flex items-center justify-center text-[10px]">4b</span>
                      <span className="font-semibold text-secondary">Sub-Intervention:</span>
                      <span className="text-text-muted">{currentSubInterv.name}</span>
                    </div>
                    <span className="font-mono text-[11px] bg-white border border-border-subtle px-1.5 py-0.5 rounded text-secondary font-bold">{currentSubInterv.code}</span>
                  </div>
                )}

                <div className="p-2.5 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-surface-container text-primary font-bold flex items-center justify-center text-[11px]">5</span>
                    <span className="font-semibold text-primary">Implementation:</span>
                    <span className="text-text-muted">Action Type: {actionObj.label}</span>
                  </div>
                  <span className="font-mono text-[11px] bg-surface-container-low px-1.5 py-0.5 rounded text-secondary font-bold">.{actionCode}</span>
                </div>

                <div className="p-2.5 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-surface-container text-primary font-bold flex items-center justify-center text-[11px]">6</span>
                    <span className="font-semibold text-primary">Evaluation:</span>
                    <span className="text-text-muted">Actual Outcome: {outcomeObj.label}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[11px] bg-surface-container-low px-1.5 py-0.5 rounded text-secondary font-bold">.{outcomeCode}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${isGoalMet ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                      {isGoalMet ? 'Goal Met' : 'Clinical Delta'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* TABBED EHR INTEGRATION PAYLOAD WORKBENCH (FULL DASHBOARD CONTEXT INLINE) */}
            <div className="border border-border-subtle rounded-xl overflow-hidden bg-white shadow-xs">
              {/* Tab Navigation Header */}
              <div className="bg-surface-container-low px-space-md pt-3 border-b border-border-subtle flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-1 overflow-x-auto pb-px">
                  <button
                    onClick={() => setActivePayloadTab('epic')}
                    className={`px-3 py-2 font-label-sm text-xs font-bold rounded-t-lg transition-colors flex items-center gap-1.5 cursor-pointer border-t border-x ${
                      activePayloadTab === 'epic'
                        ? 'bg-white text-primary border-border-subtle border-b-transparent shadow-xs'
                        : 'border-transparent text-text-muted hover:text-primary hover:bg-surface-container'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px] text-columbia-crown-blue">clinical_notes</span>
                    <span>Epic SmartPhrase</span>
                  </button>

                  <button
                    onClick={() => setActivePayloadTab('hl7')}
                    className={`px-3 py-2 font-label-sm text-xs font-bold rounded-t-lg transition-colors flex items-center gap-1.5 cursor-pointer border-t border-x ${
                      activePayloadTab === 'hl7'
                        ? 'bg-white text-primary border-border-subtle border-b-transparent shadow-xs'
                        : 'border-transparent text-text-muted hover:text-primary hover:bg-surface-container'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px] text-secondary">cable</span>
                    <span>HL7 v2.5.1 ADT</span>
                  </button>

                  <button
                    onClick={() => setActivePayloadTab('fhir')}
                    className={`px-3 py-2 font-label-sm text-xs font-bold rounded-t-lg transition-colors flex items-center gap-1.5 cursor-pointer border-t border-x ${
                      activePayloadTab === 'fhir'
                        ? 'bg-white text-primary border-border-subtle border-b-transparent shadow-xs'
                        : 'border-transparent text-text-muted hover:text-primary hover:bg-surface-container'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px] text-amber-600">data_object</span>
                    <span>FHIR R4 JSON</span>
                  </button>

                  <button
                    onClick={() => setActivePayloadTab('csv')}
                    className={`px-3 py-2 font-label-sm text-xs font-bold rounded-t-lg transition-colors flex items-center gap-1.5 cursor-pointer border-t border-x ${
                      activePayloadTab === 'csv'
                        ? 'bg-white text-primary border-border-subtle border-b-transparent shadow-xs'
                        : 'border-transparent text-text-muted hover:text-primary hover:bg-surface-container'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px] text-emerald-600">table_chart</span>
                    <span>CSV Tabular</span>
                  </button>
                </div>

                {/* Tab Context Action Buttons */}
                <div className="flex items-center gap-2 pb-2">
                  {activePayloadTab === 'epic' && (
                    <>
                      <button
                        onClick={() => handleCopy(epicSmartPhrase, 'Epic')}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold bg-white border border-border-subtle hover:bg-surface-container text-primary transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[14px]">content_copy</span>
                        <span>{copyFeedback === 'Epic' ? '✓ Copied' : 'Copy SmartPhrase'}</span>
                      </button>
                      <button
                        onClick={handleDownloadEpic}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold bg-surface-container hover:bg-surface-container-high text-primary transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[14px]">download</span>
                        <span>Download .txt</span>
                      </button>
                    </>
                  )}

                  {activePayloadTab === 'hl7' && (
                    <>
                      <button
                        onClick={() => handleCopy(hl7Snippet, 'HL7')}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold bg-white border border-border-subtle hover:bg-surface-container text-primary transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[14px]">content_copy</span>
                        <span>{copyFeedback === 'HL7' ? '✓ Copied' : 'Copy HL7'}</span>
                      </button>
                      <button
                        onClick={handleDownloadHl7}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold bg-surface-container hover:bg-surface-container-high text-primary transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[14px]">download</span>
                        <span>Download .hl7</span>
                      </button>
                    </>
                  )}

                  {activePayloadTab === 'fhir' && (
                    <>
                      <button
                        onClick={() => handleCopy(fhirSnippet, 'FHIR')}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold bg-white border border-border-subtle hover:bg-surface-container text-primary transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[14px]">content_copy</span>
                        <span>{copyFeedback === 'FHIR' ? '✓ Copied' : 'Copy JSON'}</span>
                      </button>
                      <button
                        onClick={handleDownloadFhir}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold bg-surface-container hover:bg-surface-container-high text-primary transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[14px]">download</span>
                        <span>Download .json</span>
                      </button>
                      <button
                        onClick={handleOpenFhir}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-bold bg-primary text-on-primary hover:bg-columbia-crown-blue transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                        <span>Interactive Modal</span>
                      </button>
                    </>
                  )}

                  {activePayloadTab === 'csv' && (
                    <>
                      <button
                        onClick={() => handleCopy(csvSnippet, 'CSV')}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold bg-white border border-border-subtle hover:bg-surface-container text-primary transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[14px]">content_copy</span>
                        <span>{copyFeedback === 'CSV' ? '✓ Copied' : 'Copy CSV'}</span>
                      </button>
                      <button
                        onClick={handleExportCsv}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold bg-surface-container hover:bg-surface-container-high text-primary transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[14px]">download</span>
                        <span>Download .csv</span>
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Tab Content Body */}
              <div className="p-space-md">
                {activePayloadTab === 'epic' && (
                  <div className="space-y-space-sm">
                    <div className="flex items-center justify-between text-xs text-text-muted">
                      <span>Compatible with: <strong>Epic Hyperspace, Cerner Millennium (.dot-phrase), MEDITECH Expanse, Allscripts</strong></span>
                      <span className="font-mono text-[11px]">Format: Structured Clinical Progress Note</span>
                    </div>
                    <pre className="p-space-md rounded-lg bg-surface-container-lowest border border-border-subtle font-mono text-xs text-text-primary whitespace-pre-wrap leading-relaxed overflow-x-auto shadow-inner">
                      {epicSmartPhrase}
                    </pre>
                    <div className="flex items-center gap-2 text-[11px] text-text-muted bg-surface-container-low p-2 rounded border border-border-subtle">
                      <span className="material-symbols-outlined text-[16px] text-columbia-crown-blue">info</span>
                      <span>Paste directly into Epic SmartPhrase Manager (.CCCPLAN) or clinical flowsheets to record standardized CCC v2.5 nursing care plans.</span>
                    </div>
                  </div>
                )}

                {activePayloadTab === 'hl7' && (
                  <div className="space-y-space-sm">
                    <div className="flex items-center justify-between text-xs text-text-muted">
                      <span>Standard: <strong>HL7 International v2.5.1 / v2.8 ADT Integration Interface</strong></span>
                      <span className="font-mono text-[11px]">Custom Segments: ZCC (Diagnosis), ZCI (Intervention)</span>
                    </div>
                    <pre className="p-space-md rounded-lg bg-surface-container-lowest border border-border-subtle font-mono text-xs text-text-primary whitespace-pre-wrap leading-relaxed overflow-x-auto shadow-inner">
                      {hl7Snippet}
                    </pre>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[11px] text-text-muted bg-surface-container-low p-2.5 rounded border border-border-subtle font-mono">
                      <div><strong className="text-primary font-sans">MSH:</strong> Message Header</div>
                      <div><strong className="text-primary font-sans">PID:</strong> Patient Identity</div>
                      <div><strong className="text-primary font-sans">PV1:</strong> Inpatient Visit</div>
                      <div><strong className="text-secondary font-sans">ZCC:</strong> CCC Diagnosis</div>
                      <div><strong className="text-secondary font-sans">ZCI:</strong> CCC Intervention</div>
                    </div>
                  </div>
                )}

                {activePayloadTab === 'fhir' && (
                  <div className="space-y-space-sm">
                    <div className="flex items-center justify-between text-xs text-text-muted">
                      <span>Standard: <strong>HL7 FHIR Release 4 (R4) Resource / US Core Implementation Guide</strong></span>
                      <span className="font-mono text-[11px]">Resource: CarePlan / addresses + activity</span>
                    </div>
                    <pre className="p-space-md rounded-lg bg-surface-container-lowest border border-border-subtle font-mono text-[11px] text-text-primary whitespace-pre leading-relaxed overflow-x-auto max-h-80 shadow-inner">
                      {fhirSnippet}
                    </pre>
                    <div className="flex items-center justify-between text-[11px] text-text-muted bg-surface-container-low p-2 rounded border border-border-subtle">
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-amber-600">verified</span>
                        <span>Standardized terminology URIs included for CCC Component, CCC Diagnosis, SNOMED CT, CCC Intervention, and LOINC.</span>
                      </div>
                      <button
                        onClick={handleOpenFhir}
                        className="text-secondary hover:underline font-semibold cursor-pointer"
                      >
                        Open Full-Screen Interactive FHIR Viewer →
                      </button>
                    </div>
                  </div>
                )}

                {activePayloadTab === 'csv' && (
                  <div className="space-y-space-sm">
                    <div className="flex items-center justify-between text-xs text-text-muted">
                      <span>Format: <strong>RFC 4180 Standard Comma-Separated Values (CSV)</strong></span>
                      <span className="font-mono text-[11px]">Schema: CCC Care Plan Analytics Dataset</span>
                    </div>
                    <pre className="p-space-md rounded-lg bg-surface-container-lowest border border-border-subtle font-mono text-[11px] text-text-primary whitespace-pre-wrap leading-relaxed overflow-x-auto shadow-inner">
                      {csvSnippet}
                    </pre>
                    <div className="flex items-center justify-between text-[11px] text-text-muted bg-surface-container-low p-2 rounded border border-border-subtle">
                      <span>Ideal for clinical registry submission, hospital nursing quality analytics, and relational database ingest.</span>
                      <button
                        onClick={handleExportCsv}
                        className="text-primary hover:underline font-semibold cursor-pointer"
                      >
                        Download CSV File →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM SUPPORTING SECTION: CCC Architectural Syntax & Educational Guide */}
      <section className="w-full bg-surface-container-low border-t border-border-subtle py-space-xl px-gutter-lg mt-space-lg">
        <div className="max-w-7xl mx-auto space-y-space-xl">
          {/* Logic Breakdown Diagram Header */}
          <div className="text-center max-w-2xl mx-auto space-y-space-xs">
            <span className="font-label-sm text-[11px] uppercase tracking-wider text-secondary font-bold">
              Standardized Informatics Architecture
            </span>
            <h2 className="font-headline-xl text-headline-xl text-primary font-bold">
              Understanding CCC Syntax &amp; Step-by-Step Architecture
            </h2>
            <p className="font-body-md text-body-md text-text-muted">
              Dr. Virginia Saba designed the CCC System with an atomic, relational architecture. Every point of care link
              combines diagnostic reasoning, specific intervention workload, and quantitative evaluation across distinct clinical steps.
            </p>
          </div>

          {/* Bento Visual Breakdown Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-space-md">
            {/* Part 1 */}
            <div className="bg-surface-card border border-border-subtle p-space-md rounded-xl shadow-sm space-y-space-xs">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-primary text-on-primary">
                  Domain [A]
                </span>
                <span className="material-symbols-outlined text-secondary">category</span>
              </div>
              <h3 className="font-headline-sm text-sm font-bold text-primary">1. Care Component</h3>
              <p className="font-body-sm text-[13px] text-text-muted">
                The 21 Care Components classify healthcare patterns across physiological, behavioral, and functional domains.
              </p>
              <div className="font-mono text-xs text-secondary font-bold pt-1">Example: A (Activity)</div>
            </div>

            {/* Part 2 */}
            <div className="bg-surface-card border border-border-subtle p-space-md rounded-xl shadow-sm space-y-space-xs">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-primary text-on-primary">
                  Diag [A01.1]
                </span>
                <span className="material-symbols-outlined text-secondary">stethoscope</span>
              </div>
              <h3 className="font-headline-sm text-sm font-bold text-primary">2. Diagnostic Concept</h3>
              <p className="font-body-sm text-[13px] text-text-muted">
                176 nursing diagnoses expanded with condition modifier digits specifying conditions: .1 Impaired, .2 Decreased, .3 Deficient, .4 Risk.
              </p>
              <div className="font-mono text-xs text-secondary font-bold pt-1">Structure: [A][01].[1]</div>
            </div>

            {/* Part 3 */}
            <div className="bg-surface-card border border-border-subtle p-space-md rounded-xl shadow-sm space-y-space-xs">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-primary text-on-primary">
                  Action [A10.0]
                </span>
                <span className="material-symbols-outlined text-secondary">healing</span>
              </div>
              <h3 className="font-headline-sm text-sm font-bold text-primary">3. Nursing Intervention</h3>
              <p className="font-body-sm text-[13px] text-text-muted">
                546 core nursing actions identifying diagnostic, therapeutic, instructional, and management protocols.
              </p>
              <div className="font-mono text-xs text-secondary font-bold pt-1">Structure: [A][10].[0]</div>
            </div>

            {/* Part 4 */}
            <div className="bg-surface-card border border-border-subtle p-space-md rounded-xl shadow-sm space-y-space-xs">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-secondary text-on-secondary">
                  Modifiers [.2.1]
                </span>
                <span className="material-symbols-outlined text-secondary">insights</span>
              </div>
              <h3 className="font-headline-sm text-sm font-bold text-primary">4. Workload &amp; Outcome</h3>
              <p className="font-body-sm text-[13px] text-text-muted">
                Two relational terminal modifiers: digit 1 specifies the 4 Action Types; digit 2 specifies the 3 Expected Outcomes.
              </p>
              <div className="font-mono text-xs text-secondary font-bold pt-1">Suffix: .2 (Care) + .1 (Improved)</div>
            </div>
          </div>

          {/* Developer & Academic Resource Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md pt-space-md">
            <button
              onClick={() => onNavigate('framework')}
              className="p-space-md rounded-xl bg-surface-card border border-border-subtle shadow-sm hover:shadow-md transition-shadow flex items-start gap-space-sm group text-left cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined">api</span>
              </div>
              <div>
                <h4 className="font-label-md text-label-md text-primary font-bold group-hover:text-secondary transition-colors">
                  Terminology API Specs
                </h4>
                <p className="font-body-sm text-[12px] text-text-muted mt-1">
                  REST endpoints for CCC v2.5 hierarchy, fast fuzzy-search, and crosswalk lookups.
                </p>
              </div>
            </button>

            <button
              onClick={() => onNavigate('framework')}
              className="p-space-md rounded-xl bg-surface-card border border-border-subtle shadow-sm hover:shadow-md transition-shadow flex items-start gap-space-sm group text-left cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined">table_view</span>
              </div>
              <div>
                <h4 className="font-label-md text-label-md text-primary font-bold group-hover:text-secondary transition-colors">
                  Raw Crosswalk Tables
                </h4>
                <p className="font-body-sm text-[12px] text-text-muted mt-1">
                  Download official SNOMED CT and LOINC correlation tables vetted by Columbia Nursing.
                </p>
              </div>
            </button>

            <button
              onClick={handleOpenFhir}
              className="p-space-md rounded-xl bg-surface-card border border-border-subtle shadow-sm hover:shadow-md transition-shadow flex items-start gap-space-sm group text-left cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined">menu_book</span>
              </div>
              <div>
                <h4 className="font-label-md text-label-md text-primary font-bold group-hover:text-secondary transition-colors">
                  FHIR Implementation Guide
                </h4>
                <p className="font-body-sm text-[12px] text-text-muted mt-1">
                  HL7 FHIR R4 mapping guide for CarePlan, Condition, and Procedure resources.
                </p>
              </div>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
