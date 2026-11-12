export interface CareComponent {
  code: string;
  name: string;
  pattern: 'Physiological' | 'Functional' | 'Psychological' | 'Health Behavioral';
  description: string;
  codeRoot: string;
  conceptCount?: number;
}

export interface DiagnosisConcept {
  code: string;
  componentCode: string;
  name: string;
  definition: string;
  majorCode: string;
  majorName: string;
  snomed: string;
  icd10: string;
}

export interface InterventionConcept {
  code: string;
  componentCode: string;
  name: string;
  definition: string;
  majorCode: string;
  majorName: string;
  snomed: string;
  loinc: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  author: string;
  date: string;
  readTime: string;
  category: 'ai' | 'conferences' | 'interviews' | 'system' | 'publications';
  tags: string[];
  summary: string;
  fullContent: string[];
  quote?: string;
  imageUrl?: string;
}

export const CARE_COMPONENTS: CareComponent[] = [
  // 10 Physiological
  {
    code: 'C',
    name: 'Cardiac',
    pattern: 'Physiological',
    description: 'Cardiovascular functioning, hemodynamic status, coronary perfusion, and vascular regulation.',
    codeRoot: 'C00',
    conceptCount: 14
  },
  {
    code: 'L',
    name: 'Respiratory',
    pattern: 'Physiological',
    description: 'Airway patency, gas exchange, ventilation capacity, and pulmonary clearing mechanisms.',
    codeRoot: 'L00',
    conceptCount: 12
  },
  {
    code: 'I',
    name: 'Metabolic',
    pattern: 'Physiological',
    description: 'Endocrine equilibrium, glycemic control, thyroid regulation, and hormonal processing.',
    codeRoot: 'I00',
    conceptCount: 9
  },
  {
    code: 'J',
    name: 'Nutritional',
    pattern: 'Physiological',
    description: 'Dietary intake, caloric consumption, enteral feeding, and metabolic body mass balance.',
    codeRoot: 'J00',
    conceptCount: 11
  },
  {
    code: 'K',
    name: 'Physical Regulation',
    pattern: 'Physiological',
    description: 'Thermoregulation, infection resistance, immune response, and physiological defense.',
    codeRoot: 'K00',
    conceptCount: 8
  },
  {
    code: 'B',
    name: 'Bowel Elimination',
    pattern: 'Physiological',
    description: 'Gastrointestinal motility, bowel continence, ostomy care, and digestive excretion.',
    codeRoot: 'B00',
    conceptCount: 9
  },
  {
    code: 'T',
    name: 'Urinary Elimination',
    pattern: 'Physiological',
    description: 'Renal excretion, bladder emptying, urinary continence, and catheter management.',
    codeRoot: 'T00',
    conceptCount: 10
  },
  {
    code: 'F',
    name: 'Fluid Volume',
    pattern: 'Physiological',
    description: 'Hydration balance, fluid overload, dehydration, edema, and electrolyte equilibrium.',
    codeRoot: 'F00',
    conceptCount: 7
  },
  {
    code: 'R',
    name: 'Skin Integrity',
    pattern: 'Physiological',
    description: 'Cutaneous protection, surgical incisions, pressure injuries, and wound staging.',
    codeRoot: 'R00',
    conceptCount: 11
  },
  {
    code: 'S',
    name: 'Tissue Perfusion',
    pattern: 'Physiological',
    description: 'Peripheral circulation, microvascular capillary refill, and cellular oxygenation.',
    codeRoot: 'S00',
    conceptCount: 6
  },

  // 3 Functional
  {
    code: 'A',
    name: 'Activity',
    pattern: 'Functional',
    description: 'Health patterns related to energy expenditure, physical mobility, exercise, and activities of daily living.',
    codeRoot: 'A00',
    conceptCount: 10
  },
  {
    code: 'P',
    name: 'Self-Care',
    pattern: 'Functional',
    description: 'Activities of daily living (ADLs), hygiene, dressing, and feeding autonomy.',
    codeRoot: 'P00',
    conceptCount: 8
  },
  {
    code: 'Q',
    name: 'Sensory',
    pattern: 'Functional',
    description: 'Vision, hearing, taste, tactile perception, and neuro-sensory acuity.',
    codeRoot: 'Q00',
    conceptCount: 7
  },

  // 4 Psychological
  {
    code: 'D',
    name: 'Cognitive / Neuro',
    pattern: 'Psychological',
    description: 'Orientation, memory, processing speed, consciousness, and neurological focus.',
    codeRoot: 'D00',
    conceptCount: 12
  },
  {
    code: 'E',
    name: 'Coping',
    pattern: 'Psychological',
    description: 'Stress management, emotional resilience, adaptation, and crisis navigation.',
    codeRoot: 'E00',
    conceptCount: 9
  },
  {
    code: 'N',
    name: 'Self-Concept',
    pattern: 'Psychological',
    description: 'Body image, self-esteem, identity preservation, and personal affirmation.',
    codeRoot: 'N00',
    conceptCount: 6
  },
  {
    code: 'M',
    name: 'Role Relationship',
    pattern: 'Psychological',
    description: 'Family dynamics, social connectivity, caregiver burden, and community role.',
    codeRoot: 'M00',
    conceptCount: 8
  },

  // 4 Health Behavioral
  {
    code: 'G',
    name: 'Health Behavior',
    pattern: 'Health Behavioral',
    description: 'Health literacy, treatment adherence, health seeking habits, and preventive measures.',
    codeRoot: 'G00',
    conceptCount: 7
  },
  {
    code: 'H',
    name: 'Medication',
    pattern: 'Health Behavioral',
    description: 'Pharmaceutical administration, reconciliation, polypharmacy oversight, and side effect tracking.',
    codeRoot: 'H00',
    conceptCount: 8
  },
  {
    code: 'O',
    name: 'Safety',
    pattern: 'Health Behavioral',
    description: 'Fall prevention, environmental hazard mitigation, physical trauma avoidance, and surveillance.',
    codeRoot: 'O00',
    conceptCount: 9
  },
  {
    code: 'U',
    name: 'Life Cycle',
    pattern: 'Health Behavioral',
    description: 'Growth transitions, perinatal care, pediatric milestones, and end-of-life palliative comfort.',
    codeRoot: 'U00',
    conceptCount: 7
  }
];

export const DIAGNOSES: DiagnosisConcept[] = [
  // Activity (A)
  {
    code: 'A01.0',
    componentCode: 'A',
    name: 'Activity Intolerance',
    definition: 'Insufficient physiological energy to endure or complete daily activities.',
    majorCode: '01.0',
    majorName: 'Activity Alteration',
    snomed: '409586006',
    icd10: 'R53.83'
  },
  {
    code: 'A03.0',
    componentCode: 'A',
    name: 'Physical Mobility Deficit',
    definition: 'Limitation in independent, purposeful physical movement of the body.',
    majorCode: '03.0',
    majorName: 'Mobility Alteration',
    snomed: '282920008',
    icd10: 'R26.2'
  },
  {
    code: 'A07.0',
    componentCode: 'A',
    name: 'Sleep Pattern Disturbance',
    definition: 'Disruptions in sleep amount and quality causing functional impairment.',
    majorCode: '07.0',
    majorName: 'Sleep Alteration',
    snomed: '30134003',
    icd10: 'G47.9'
  },
  {
    code: 'A11.0',
    componentCode: 'A',
    name: 'Transfer Ability Deficit',
    definition: 'Limitation in purposeful independent physical movement between surfaces.',
    majorCode: '11.0',
    majorName: 'Transfer Alteration',
    snomed: '282914008',
    icd10: 'R29.898'
  },

  // Cardiac (C)
  {
    code: 'C03.0',
    componentCode: 'C',
    name: 'Cardiac Output Alteration',
    definition: 'Inadequate blood pumped by heart to meet metabolic demands of tissues.',
    majorCode: '03.0',
    majorName: 'Cardiac Alteration',
    snomed: '399144008',
    icd10: 'I50.9'
  },
  {
    code: 'C06.0',
    componentCode: 'C',
    name: 'Blood Pressure Alteration',
    definition: 'Disruption in arterial hydrostatic pressure regulation.',
    majorCode: '06.0',
    majorName: 'Pressure Alteration',
    snomed: '38341003',
    icd10: 'I10'
  },

  // Respiratory (L)
  {
    code: 'L01.0',
    componentCode: 'L',
    name: 'Breathing Pattern Impairment',
    definition: 'Inhalation or exhalation pattern that does not enable adequate ventilation.',
    majorCode: '01.0',
    majorName: 'Respiration Alteration',
    snomed: '248587009',
    icd10: 'R06.00'
  },
  {
    code: 'L03.0',
    componentCode: 'L',
    name: 'Airway Clearance Impairment',
    definition: 'Inability to clear secretions or obstructions from the respiratory tract.',
    majorCode: '03.0',
    majorName: 'Airway Clearance',
    snomed: '248589007',
    icd10: 'R09.3'
  },

  // Bowel Elimination (B)
  {
    code: 'B01.0',
    componentCode: 'B',
    name: 'Bowel Incontinence',
    definition: 'Change in normal bowel habits characterized by involuntary passage of stool.',
    majorCode: '01.0',
    majorName: 'Bowel Elimination Alteration',
    snomed: '72042002',
    icd10: 'R15.9'
  },
  {
    code: 'B02.0',
    componentCode: 'B',
    name: 'Constipation',
    definition: 'Decrease in normal frequency of defecation accompanied by difficult passage of stool.',
    majorCode: '02.0',
    majorName: 'Constipation Alteration',
    snomed: '14760008',
    icd10: 'K59.00'
  },

  // Fluid Volume (F)
  {
    code: 'F01.0',
    componentCode: 'F',
    name: 'Fluid Volume Deficit',
    definition: 'Decreased intravascular, interstitial, and/or intracellular fluid.',
    majorCode: '01.0',
    majorName: 'Fluid Volume Alteration',
    snomed: '34095006',
    icd10: 'E86.0'
  },
  {
    code: 'F02.0',
    componentCode: 'F',
    name: 'Fluid Volume Excess',
    definition: 'Increased isotonic fluid retention and extracellular volume expansion.',
    majorCode: '02.0',
    majorName: 'Fluid Overload',
    snomed: '236427003',
    icd10: 'E87.70'
  },

  // Skin Integrity (R)
  {
    code: 'R01.0',
    componentCode: 'R',
    name: 'Skin Integrity Impairment',
    definition: 'Altered epidermis and/or dermis causing tissue disruption or vulnerability.',
    majorCode: '01.0',
    majorName: 'Integumentary Alteration',
    snomed: '225544001',
    icd10: 'L98.9'
  },

  // Medication (H)
  {
    code: 'H01.0',
    componentCode: 'H',
    name: 'Medication Regimen Adherence Alteration',
    definition: 'Non-concordance with prescribed pharmacotherapeutic instructions.',
    majorCode: '01.0',
    majorName: 'Medication Regimen Alteration',
    snomed: '414603000',
    icd10: 'Z91.19'
  }
];

export const INTERVENTIONS: InterventionConcept[] = [
  // Activity (A)
  {
    code: 'A10.0',
    componentCode: 'A',
    name: 'Exercise Ambulation',
    definition: 'Promotion, assistance, and monitoring of assisted or progressive gait training.',
    majorCode: '10.0',
    majorName: 'Exercise Care',
    snomed: '409586006',
    loinc: '75282-4'
  },
  {
    code: 'A02.0',
    componentCode: 'A',
    name: 'Activity Therapy',
    definition: 'Prescription of purposeful activity to enhance physical, cognitive, or affective status.',
    majorCode: '02.0',
    majorName: 'Activity Care',
    snomed: '225337009',
    loinc: '75283-2'
  },
  {
    code: 'A14.0',
    componentCode: 'A',
    name: 'Physical Therapy Protocol',
    definition: 'Coordinated musculoskeletal physical rehab maneuvers and joint preservation routines.',
    majorCode: '14.0',
    majorName: 'Rehab Protocol',
    snomed: '91251008',
    loinc: '75284-0'
  },
  {
    code: 'A01.2',
    componentCode: 'A',
    name: 'Energy Conservation',
    definition: 'Actions performed and techniques instructed to preserve physiological energy reserves.',
    majorCode: '01.0',
    majorName: 'Activity Care',
    snomed: '710078008',
    loinc: '75282-4'
  },

  // Cardiac (C)
  {
    code: 'C05.0',
    componentCode: 'C',
    name: 'Vital Signs Monitoring',
    definition: 'Serial hemodynamic surveillance of arterial blood pressure, pulse, and oxygen saturation.',
    majorCode: '05.0',
    majorName: 'Cardiac Care',
    snomed: '371907003',
    loinc: '85354-9'
  },
  {
    code: 'C07.0',
    componentCode: 'C',
    name: 'Cardiac Precautions Care',
    definition: 'Implementation of continuous telemetry, bed rest pacing, and cardiac ischemia precautions.',
    majorCode: '07.0',
    majorName: 'Cardiac Precaution Protocol',
    snomed: '225345004',
    loinc: '75285-7'
  },

  // Respiratory (L)
  {
    code: 'L02.0',
    componentCode: 'L',
    name: 'Oxygen Therapy Administration',
    definition: 'Delivery of supplemental medical oxygen through cannula, mask, or high-flow circuits.',
    majorCode: '02.0',
    majorName: 'Respiratory Care',
    snomed: '57485005',
    loinc: '75286-5'
  },
  {
    code: 'L05.0',
    componentCode: 'L',
    name: 'Airway Suctioning Protocol',
    definition: 'Mechanical aspiration of pulmonary secretions to maintain patent tracheobronchial tree.',
    majorCode: '05.0',
    majorName: 'Airway Care',
    snomed: '230040009',
    loinc: '75287-3'
  },

  // Bowel Elimination (B)
  {
    code: 'B03.0',
    componentCode: 'B',
    name: 'Bowel Training Program',
    definition: 'Assisting the patient to train the bowel to evacuate at regular intervals.',
    majorCode: '03.0',
    majorName: 'Bowel Care',
    snomed: '225358000',
    loinc: '75288-1'
  },

  // Skin Integrity (R)
  {
    code: 'R02.0',
    componentCode: 'R',
    name: 'Wound Care Protocol',
    definition: 'Aseptic cleansing, dressing changes, debridement oversight, and staging evaluation.',
    majorCode: '02.0',
    majorName: 'Wound Protocol',
    snomed: '225358003',
    loinc: '75289-9'
  }
];

export const QUALIFIERS = [
  { code: '0', label: 'Standard / None', description: 'Default condition without secondary modifier.' },
  { code: '1', label: 'Impaired', description: 'Functional reduction, limitation, or physiological compromise.' },
  { code: '2', label: 'Decreased', description: 'Diminished quantity, frequency, or degree.' },
  { code: '3', label: 'Deficient', description: 'Inadequate supply, absence, or incomplete fulfillment.' },
  { code: '4', label: 'Potential / Risk', description: 'Vulnerability to developing condition without clinical manifestation.' }
];

export const GOALS = [
  { code: '1', label: 'Improve', description: 'Anticipated positive trajectory in functional ability or physiological stabilization.' },
  { code: '2', label: 'Stabilize', description: 'Condition maintained at current level; prevent further deterioration.' },
  { code: '3', label: 'Deteriorate', description: 'Anticipated clinical decline or palliative comfort care trajectory.' }
];

export const ACTION_TYPES = [
  { code: '1', label: 'Assess / Monitor', description: 'Systematic observation, diagnostic surveillance, baseline audit.' },
  { code: '2', label: 'Care / Perform', description: 'Direct hands-on clinical procedure or nursing intervention execution.' },
  { code: '3', label: 'Teach / Instruct', description: 'Patient, family, or caregiver education and behavioral guidance.' },
  { code: '4', label: 'Manage / Refer', description: 'Interprofessional collaboration, discharge liaison, care coordination.' }
];

export const OUTCOMES = [
  { code: '1', label: 'Improved', description: 'Documented positive progression relative to baseline.' },
  { code: '2', label: 'Stabilized', description: 'Condition held stable within expected baseline parameters.' },
  { code: '3', label: 'Deteriorated', description: 'Documented clinical regression or physiological breakdown.' }
];

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 'nursebrain',
    title: "Interview with Samu Mhlambi RN, BSN, MCiM – Inventor and CEO of 'NurseBrain® Synapse'",
    slug: 'nursebrain-synapse-interview',
    author: 'Seth Wolpin',
    date: 'September 29, 2026',
    readTime: '8 min clinical read',
    category: 'interviews',
    tags: ['Mobile Integration', 'Clinical Decision Support', 'CCC Tools'],
    quote: '"NurseBrain® Synapse is nursing software I originally created to help clinicians synthesize shifting patient baselines into deterministic, machine-readable terminology at shift handoff."',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKpt5Hy8q7CU0jk9P-ICIzOU3dbVLacav6N5nI7k7Oz_Wm-tZPqwpsu9n9OMbAqluHuXOafGRcIBFP4PVjHAYIC-9EKWLMbI0EhyzlfyWFyjo_uc8HpDd2IeY0CeaH6_UwPIteGzoBwaoD8taTtZnzwxn8ob3ckZvl6LQSNUTPbSJLn69E6Eyvpaunyk9W8kaWBxdP8ZCXKo85TZPPM4NCoE-4Osekv9AfJyxZD6FDy1T5a1gHl7D1AA',
    summary: 'Exploring how modern nursing workflow software leverages the atomic structures of the Clinical Care Classification System to streamline bedside handoffs, automate diagnostic coding, and drastically reduce nurse cognitive burden in acute environments.',
    fullContent: [
      'In this in-depth discussion, Samu Mhlambi shares his journey from bedside clinical practice to health tech founder. He describes how acute care nurses spend up to 40% of their shifts entering unstructured narrative notes that fail to feed downstream clinical research.',
      'By integrating the CCC System v2.5 taxonomy directly into mobile tablets, NurseBrain Synapse maps vital signs and physical assessments to the 21 Care Components in real time, generating suggested nursing diagnoses and recommended actions.',
      'The result is a closed-loop system where shift handoffs become structured, defensible, and fully FHIR R4 interoperable across EHR boundaries without placing repetitive typing loads on nursing staff.'
    ]
  },
  {
    id: 'open-access',
    title: 'A New Year and a New Way to Access CCC Tools',
    slug: 'new-way-to-access-ccc-tools',
    author: 'Seth Wolpin',
    date: 'December 22, 2025',
    readTime: '4 min read',
    category: 'system',
    tags: ['Open Access', 'Terminology Tools', 'Governance'],
    summary: 'Removing barriers to terminology adoption — the Emory School of Nursing stewardship group has systematically modernized access. CCC terminology files, crosswalk tables, and research datasets are now directly downloadable with no registration, login, or gatekeeping required.',
    fullContent: [
      'Effective immediately, all Clinical Care Classification System tables, crosswalks, code builders, and REST API definitions are made freely available under open academic licensing without login or paywalls.',
      'Our stewardship team at Emory University School of Nursing believes that open scientific terminology is a prerequisite for equitable healthcare informatics. Researchers and hospital systems can clone, map, and deploy CCC tables immediately.'
    ]
  },
  {
    id: 'china-seminar',
    title: 'First CCC Seminar Held in China on Transforming Nursing Practice: Leveraging Standards, Technology, and Artificial Intelligence',
    slug: 'first-ccc-seminar-china',
    author: 'Seth Wolpin',
    date: 'December 10, 2025',
    readTime: '6 min read',
    category: 'conferences',
    tags: ['Artificial Intelligence', 'Symposium', 'International'],
    summary: 'HeNan HongLi Hospital hosted a landmark two-day clinical informatics symposium (Nov 14–15, 2025) bringing together clinical specialists and nursing scholars across East Asia. The seminar explored real-world CCC deployment in high-volume EHRs and automated clinical decision support for acute nursing pathways.',
    fullContent: [
      'Over 400 clinical leaders gathered in Henan Province to study bilingual implementation of the 21 Care Components across Chinese regional electronic medical record systems.',
      'Keynote presentations showcased predictive outcomes modeling where nursing interventions coded in CCC successfully flagged high-risk pressure injuries and fall liabilities 48 hours prior to acute deterioration.'
    ]
  },
  {
    id: 'medinfo-2025',
    title: 'The CCCS at MedInfo 2025: Transforming Nursing Practice with Standards, Technology, and AI',
    slug: 'medinfo-2025-symposium',
    author: 'Seth Wolpin',
    date: 'September 26, 2025',
    readTime: '5 min read',
    category: 'conferences',
    tags: ['MedInfo 2025', 'Panel Presentation', 'Advisory Board'],
    summary: 'Convened in Taipei, the CCC International Advisory Board presented a session focusing on ontological precision, HL7 FHIR mapping for standardized nursing care plans, and leveraging historical longitudinal trajectories to evaluate predictive patient safety indicators.',
    fullContent: [
      'The international panel demonstrated how four-level coding enables granular EHR bedside capture that seamlessly rolls up into national quality registries without data loss.',
      'Participants from 18 nations discussed ongoing translations in German, Dutch, Portuguese, and Mandarin.'
    ]
  },
  {
    id: 'hao-fan',
    title: 'Using LLMs and the Clinical Care Classification System for Aligning EHR Flowsheets: An Interview with Hao Fan',
    slug: 'llms-flowsheet-alignment-hao-fan',
    author: 'Seth Wolpin',
    date: 'June 20, 2025',
    readTime: '7 min read',
    category: 'ai',
    tags: ['LLM & NLP', 'Informatics Research', 'Interview'],
    summary: 'In conversation with Hao Fan, PhD candidate in Biomedical Informatics and Data Science at Washington University School of Medicine in St. Louis. The study outlines breakthroughs in prompt-engineering and model fine-tuning to reliably align heterogeneous EHR nursing flowsheets with canonical CCC terminology codes.',
    fullContent: [
      'Hao Fan explains how modern transformers can resolve ambiguous free-text clinical notes into discrete CCC action types with 94.2% agreement with expert nursing informaticians.',
      'This breakthrough drastically speeds up the retrospective conversion of legacy nursing documentation into structured analytics databases.'
    ]
  },
  {
    id: 'fnlm-webinar',
    title: 'How Can AI Help Nursing Terminologies? Free Webinar Recording from the FNLM',
    slug: 'ai-nursing-terminologies-fnlm-webinar',
    author: 'Seth Wolpin',
    date: 'May 22, 2025',
    readTime: '4 min read',
    category: 'ai',
    tags: ['Webinar Recording', 'FNLM', 'Education'],
    summary: 'The Friends of the National Library of Medicine hosted an intensive 4-hour symposium featuring forward-thinking clinical researchers examining how natural language processing and transformer architectures can automate terminological alignment without compromising clinical nuance.',
    fullContent: [
      'The symposium recordings provide continuing education credits for nurse informaticists exploring semantic interoperability and generative documentation tools.',
      'Key sessions emphasized safety guardrails, human-in-the-loop review, and bias reduction in automated care plan suggestions.'
    ]
  },
  {
    id: 'dr-kang',
    title: "Interview with Dr. Min-Jeoung Kang from Harvard Medical School / Brigham and Women's Hospital",
    slug: 'interview-dr-kang-harvard-bwh',
    author: 'Seth Wolpin',
    date: 'April 3, 2025',
    readTime: '9 min read',
    category: 'interviews',
    tags: ['Hospital Implementation', 'Harvard / BWH', 'Clinical Analytics'],
    summary: 'Dr. Min-Jeoung Kang reviews two multi-center inpatient investigations demonstrating the utility of CCC coding structures to track nursing interventions for fall prevention, monitor care continuity, and correlate nurse activity with patient discharge outcomes.',
    fullContent: [
      'Dr. Kang shares findings from clinical trials across multiple academic medical centers demonstrating how discrete coding of nurse-led fall precautions correlated directly with reduced length of stay.',
      'The research establishes concrete empirical proof that nurse workload metrics captured in CCC v2.5 predict patient recovery trajectories with remarkable statistical accuracy.'
    ]
  },
  {
    id: 'emory-transition',
    title: 'CCC System Transitions from HCA to Emory University School of Nursing',
    slug: 'ccc-system-emory-nursing-transition',
    author: 'Seth Wolpin',
    date: 'July 12, 2024',
    readTime: '5 min read',
    category: 'system',
    tags: ['Governance Milestone', 'Institutional Stewardship'],
    summary: 'Stewardship of the Clinical Care Classification System transferred to the Emory University School of Nursing, led by Dr. Suzanne Bakken. This institutional milestone cements the terminology as an open-access international asset dedicated to open science, vendor-neutral EHR integration, and informatics education.',
    fullContent: [
      'Building on the legacy of pioneering informatics architect Dr. Virginia K. Saba, Emory Nursing establishes a dedicated repository, executive advisory board, and continuous maintenance pipeline.',
      'The transition guarantees ongoing maintenance, ANSI recognition, and seamless alignment with evolving HL7 FHIR and ONC standards.'
    ]
  }
];

export const UPCOMING_CONFERENCES = [
  {
    month: 'June 2026',
    location: 'Minneapolis, MN',
    title: 'Nursing Knowledge Big Data Science Conference',
    host: 'University of Minnesota School of Nursing',
    badgeColor: 'bg-secondary-fixed text-on-secondary-fixed'
  },
  {
    month: 'July 2026',
    location: 'Baltimore, MD',
    title: 'Summer Institute in Nursing Informatics (SINI)',
    host: 'University of Maryland School of Nursing',
    badgeColor: 'bg-surface-container-high text-columbia-crown-blue'
  },
  {
    month: 'November 2026',
    location: 'Chicago, IL',
    title: 'AMIA 2026 Annual Symposium',
    host: 'American Medical Informatics Association',
    badgeColor: 'bg-primary-fixed text-on-primary-fixed'
  }
];

export const REPOSITORY_SPECS = [
  {
    title: 'Information Model',
    desc: 'Conceptual UML architecture, entity relational diagrams, and metadata models.',
    tag: 'UML & Relational'
  },
  {
    title: 'Tables Index',
    desc: 'Master tabular index of diagnostic and intervention classifications with unique codes.',
    tag: 'Master Index'
  },
  {
    title: '21 Components Reference',
    desc: 'Comprehensive definitions, scope markers, and clinical inclusion boundaries.',
    tag: 'Domain Reference'
  },
  {
    title: '176 Nursing Diagnoses',
    desc: 'Full catalog of standardized nursing diagnoses, diagnostic codes, and criteria.',
    tag: '176 Concepts'
  },
  {
    title: '804 Interventions',
    desc: 'Clinical actions catalog expanded with 4 distinct action types.',
    tag: '804 Actions'
  },
  {
    title: 'Action Types',
    desc: 'Detailed specifications for Monitor, Perform, Teach, and Manage qualifiers.',
    tag: 'Role Functions'
  },
  {
    title: 'Nursing Outcomes',
    desc: '528 Outcome matrix for measuring clinical improvement, stability, or deterioration.',
    tag: '528 Outcomes'
  },
  {
    title: 'Multilingual Translations',
    desc: 'Validated international translations in Spanish, Portuguese, German, Dutch, and Turkish.',
    tag: 'Global Sets'
  },
  {
    title: 'Online Code Builder',
    desc: 'Interactive web tool to assemble compliant 5-character CCC codes on-the-fly.',
    tag: 'Active Tool'
  }
];
