export interface SubDiagnosisConcept {
  code: string;
  parentDiagCode: string;
  componentCode: string;
  name: string;
  definition: string;
  snomed: string;
  icd10: string;
}

export interface SubInterventionConcept {
  code: string;
  parentIntervCode: string;
  componentCode: string;
  name: string;
  definition: string;
  snomed: string;
  loinc: string;
}

export const KNOWN_SUB_DIAGNOSES: Record<string, SubDiagnosisConcept[]> = {
  // Activity (A)
  'A01.0': [
    {
      code: 'A01.1',
      parentDiagCode: 'A01.0',
      componentCode: 'A',
      name: 'Activity Intolerance',
      definition: 'Insufficient physiological energy to endure or complete daily activities.',
      snomed: '409586006',
      icd10: 'R53.83'
    },
    {
      code: 'A01.2',
      parentDiagCode: 'A01.0',
      componentCode: 'A',
      name: 'Bed Mobility Impairment',
      definition: 'Limitation in purposeful independent physical movement in bed.',
      snomed: '282914008',
      icd10: 'R26.2'
    },
    {
      code: 'A01.3',
      parentDiagCode: 'A01.0',
      componentCode: 'A',
      name: 'Fatigue Syndrome',
      definition: 'Overwhelming sustained sense of exhaustion and decreased physical capacity.',
      snomed: '84229001',
      icd10: 'R53.83'
    }
  ],
  'A03.0': [
    {
      code: 'A03.1',
      parentDiagCode: 'A03.0',
      componentCode: 'A',
      name: 'Physical Mobility Deficit',
      definition: 'Impaired physical mobility during independent ambulation.',
      snomed: '282920008',
      icd10: 'R26.2'
    },
    {
      code: 'A03.2',
      parentDiagCode: 'A03.0',
      componentCode: 'A',
      name: 'Walking & Gait Impairment',
      definition: 'Limitation in unassisted walking or upright propulsion.',
      snomed: '282914008',
      icd10: 'R26.89'
    },
    {
      code: 'A03.3',
      parentDiagCode: 'A03.0',
      componentCode: 'A',
      name: 'Wheelchair Mobility Deficit',
      definition: 'Impaired operation and locomotion using manual or electric wheelchair.',
      snomed: '282916005',
      icd10: 'Z99.3'
    }
  ],
  'A07.0': [
    {
      code: 'A07.1',
      parentDiagCode: 'A07.0',
      componentCode: 'A',
      name: 'Sleep Pattern Disturbance',
      definition: 'Disruptions in sleep quantity and quality causing daytime fatigue.',
      snomed: '30134003',
      icd10: 'G47.9'
    },
    {
      code: 'A07.2',
      parentDiagCode: 'A07.0',
      componentCode: 'A',
      name: 'Circadian Sleep Rhythm Disorder',
      definition: 'Desynchronization between endogenous circadian rhythm and sleep environment.',
      snomed: '417387002',
      icd10: 'G47.20'
    }
  ],
  'A11.0': [
    {
      code: 'A11.1',
      parentDiagCode: 'A11.0',
      componentCode: 'A',
      name: 'Transfer Ability Deficit',
      definition: 'Limitation in purposeful movement between bed, chair, or stretcher.',
      snomed: '282914008',
      icd10: 'R29.898'
    },
    {
      code: 'A11.2',
      parentDiagCode: 'A11.0',
      componentCode: 'A',
      name: 'Bed-to-Chair Transfer Deficit',
      definition: 'Inability to safely transition weight from recumbent to sitting surfaces.',
      snomed: '282915009',
      icd10: 'R29.898'
    }
  ],

  // Cardiac (C)
  'C03.0': [
    {
      code: 'C03.1',
      parentDiagCode: 'C03.0',
      componentCode: 'C',
      name: 'Cardiac Output Alteration',
      definition: 'Inadequate blood pumped by heart to meet metabolic tissue demands.',
      snomed: '399144008',
      icd10: 'I50.9'
    },
    {
      code: 'C03.2',
      parentDiagCode: 'C03.0',
      componentCode: 'C',
      name: 'Decreased Myocardial Perfusion',
      definition: 'Vulnerability to decrease in coronary circulation and acute ischemia.',
      snomed: '233843008',
      icd10: 'I25.9'
    },
    {
      code: 'C03.3',
      parentDiagCode: 'C03.0',
      componentCode: 'C',
      name: 'Arrhythmia & Conduction Deficit',
      definition: 'Alteration in cardiac electrical conduction causing hemodynamic instability.',
      snomed: '698247007',
      icd10: 'I49.9'
    }
  ],
  'C06.0': [
    {
      code: 'C06.1',
      parentDiagCode: 'C06.0',
      componentCode: 'C',
      name: 'Essential Hypertension',
      definition: 'Persistent elevation of systemic arterial blood pressure.',
      snomed: '38341003',
      icd10: 'I10'
    },
    {
      code: 'C06.2',
      parentDiagCode: 'C06.0',
      componentCode: 'C',
      name: 'Postural Hypotension',
      definition: 'Abnormal drop in blood pressure upon standing with orthostatic dizziness.',
      snomed: '28651003',
      icd10: 'I95.1'
    }
  ],

  // Respiratory (L)
  'L01.0': [
    {
      code: 'L01.1',
      parentDiagCode: 'L01.0',
      componentCode: 'L',
      name: 'Breathing Pattern Impairment',
      definition: 'Inspiratory or expiratory ventilation that fails to provide adequate aeration.',
      snomed: '268636005',
      icd10: 'R06.00'
    },
    {
      code: 'L01.2',
      parentDiagCode: 'L01.0',
      componentCode: 'L',
      name: 'Impaired Gas Exchange',
      definition: 'Excess or deficit in alveolar-capillary oxygenation and carbon dioxide elimination.',
      snomed: '271825005',
      icd10: 'J96.90'
    }
  ],
  'L03.0': [
    {
      code: 'L03.1',
      parentDiagCode: 'L03.0',
      componentCode: 'L',
      name: 'Airway Clearance Impairment',
      definition: 'Inability to clear secretions or obstructions from the tracheobronchial tree.',
      snomed: '271824009',
      icd10: 'R09.3'
    },
    {
      code: 'L03.2',
      parentDiagCode: 'L03.0',
      componentCode: 'L',
      name: 'Ineffective Cough Reflex',
      definition: 'Suppression or muscular weakness of protective tussive mechanism.',
      snomed: '263731006',
      icd10: 'R05.9'
    }
  ],

  // Bowel (B)
  'B01.0': [
    {
      code: 'B01.1',
      parentDiagCode: 'B01.0',
      componentCode: 'B',
      name: 'Bowel Incontinence',
      definition: 'Change in normal bowel habits characterized by involuntary stool passage.',
      snomed: '72042002',
      icd10: 'R15.9'
    }
  ],
  'B02.0': [
    {
      code: 'B02.1',
      parentDiagCode: 'B02.0',
      componentCode: 'B',
      name: 'Constipation Acute / Chronic',
      definition: 'Decrease in normal frequency of defecation accompanied by difficult passage.',
      snomed: '14760008',
      icd10: 'K59.00'
    },
    {
      code: 'B02.2',
      parentDiagCode: 'B02.0',
      componentCode: 'B',
      name: 'Fecal Impaction Colonic',
      definition: 'Accumulation of hardened feces in the rectum or colon obstructing passage.',
      snomed: '64642004',
      icd10: 'K56.41'
    }
  ],

  // Fluid Volume (F)
  'F01.0': [
    {
      code: 'F01.1',
      parentDiagCode: 'F01.0',
      componentCode: 'F',
      name: 'Fluid Volume Deficit',
      definition: 'Decreased intravascular, interstitial, or intracellular fluid.',
      snomed: '34095006',
      icd10: 'E86.0'
    }
  ],
  'F02.0': [
    {
      code: 'F02.1',
      parentDiagCode: 'F02.0',
      componentCode: 'F',
      name: 'Fluid Volume Excess',
      definition: 'Increased isotonic fluid retention resulting in dependent peripheral edema.',
      snomed: '236427003',
      icd10: 'E87.70'
    }
  ],

  // Skin (R)
  'R01.0': [
    {
      code: 'R01.1',
      parentDiagCode: 'R01.0',
      componentCode: 'R',
      name: 'Skin Integrity Impairment',
      definition: 'Altered epidermis and/or dermis causing vulnerability and tissue loss.',
      snomed: '225544001',
      icd10: 'L98.9'
    },
    {
      code: 'R01.2',
      parentDiagCode: 'R01.0',
      componentCode: 'R',
      name: 'Pressure Injury Stage II+',
      definition: 'Localized damage to skin and underlying soft tissue over bony prominence.',
      snomed: '420324007',
      icd10: 'L89.90'
    }
  ],

  // Medication (H)
  'H01.0': [
    {
      code: 'H01.1',
      parentDiagCode: 'H01.0',
      componentCode: 'H',
      name: 'Medication Non-Adherence',
      definition: 'Non-concordance with prescribed pharmacotherapeutic instructions.',
      snomed: '414603000',
      icd10: 'Z91.19'
    },
    {
      code: 'H01.2',
      parentDiagCode: 'H01.0',
      componentCode: 'H',
      name: 'Adverse Drug Reaction Risk',
      definition: 'Vulnerability to noxious or unintended pharmaceutical response.',
      snomed: '281647001',
      icd10: 'T88.7'
    }
  ]
};

export const KNOWN_SUB_INTERVENTIONS: Record<string, SubInterventionConcept[]> = {
  // Activity (A)
  'A10.0': [
    {
      code: 'A10.1',
      parentIntervCode: 'A10.0',
      componentCode: 'A',
      name: 'Assisted Ambulation Protocol',
      definition: 'Physical assistance, walker coaching, and progressive ambulation distance.',
      snomed: '409586006',
      loinc: '75282-4'
    },
    {
      code: 'A10.2',
      parentIntervCode: 'A10.0',
      componentCode: 'A',
      name: 'Active / Passive Range of Motion',
      definition: 'Joint mobilization exercises to maintain flexibility and prevent contractures.',
      snomed: '229215003',
      loinc: '75283-2'
    },
    {
      code: 'A10.3',
      parentIntervCode: 'A10.0',
      componentCode: 'A',
      name: 'Progressive Gait Training',
      definition: 'Structured rhythmic gait mechanics practice with assistive equipment.',
      snomed: '229191001',
      loinc: '75284-0'
    }
  ],
  'A02.0': [
    {
      code: 'A02.1',
      parentIntervCode: 'A02.0',
      componentCode: 'A',
      name: 'Activity Therapy Administration',
      definition: 'Prescription and guidance of purposeful therapeutic activities.',
      snomed: '225337009',
      loinc: '75283-2'
    },
    {
      code: 'A02.2',
      parentIntervCode: 'A02.0',
      componentCode: 'A',
      name: 'Energy Conservation Technique',
      definition: 'Instruction and scheduling of paced energy expenditure routines.',
      snomed: '710078008',
      loinc: '75282-4'
    }
  ],
  'A14.0': [
    {
      code: 'A14.1',
      parentIntervCode: 'A14.0',
      componentCode: 'A',
      name: 'Physical Therapy Protocol Oversight',
      definition: 'Coordinated musculoskeletal physical therapy maneuvers.',
      snomed: '91251008',
      loinc: '75284-0'
    },
    {
      code: 'A14.2',
      parentIntervCode: 'A14.0',
      componentCode: 'A',
      name: 'Muscle Strengthening Regimen',
      definition: 'Resistance training to rebuild postural and limb muscle power.',
      snomed: '229221008',
      loinc: '75284-0'
    }
  ],

  // Cardiac (C)
  'C05.0': [
    {
      code: 'C05.1',
      parentIntervCode: 'C05.0',
      componentCode: 'C',
      name: 'Hemodynamic Vital Signs Monitoring',
      definition: 'Serial measurement and graphing of blood pressure, heart rate, and MAP.',
      snomed: '371907003',
      loinc: '85354-9'
    },
    {
      code: 'C05.2',
      parentIntervCode: 'C05.0',
      componentCode: 'C',
      name: 'Continuous Telemetry Surveillance',
      definition: 'Continuous lead II/V1 cardiac telemetry rhythm monitoring and alarm verification.',
      snomed: '252465000',
      loinc: '85354-9'
    },
    {
      code: 'C05.3',
      parentIntervCode: 'C05.0',
      componentCode: 'C',
      name: 'Pulse Oximetry Titration',
      definition: 'Continuous peripheral capillary oxygen saturation monitoring and alarm bounds.',
      snomed: '250774007',
      loinc: '85354-9'
    }
  ],
  'C07.0': [
    {
      code: 'C07.1',
      parentIntervCode: 'C07.0',
      componentCode: 'C',
      name: 'Cardiac Precautions Implementation',
      definition: 'Bed rest pacing, valsalva avoidance, and myocardial work reduction.',
      snomed: '225345004',
      loinc: '75285-7'
    },
    {
      code: 'C07.2',
      parentIntervCode: 'C07.0',
      componentCode: 'C',
      name: 'Ischemia & Chest Pain Assessment',
      definition: 'Rapid targeted assessment for angina, diaphoresis, and radiation.',
      snomed: '410604004',
      loinc: '75285-7'
    }
  ],

  // Respiratory (L)
  'L02.0': [
    {
      code: 'L02.1',
      parentIntervCode: 'L02.0',
      componentCode: 'L',
      name: 'Low-Flow Cannula Oxygen Administration',
      definition: 'Administration of humidified nasal cannula oxygen therapy at 1-6 L/min.',
      snomed: '371907003',
      loinc: '75286-5'
    },
    {
      code: 'L02.2',
      parentIntervCode: 'L02.0',
      componentCode: 'L',
      name: 'High-Flow Venturi / Reservoir Delivery',
      definition: 'Precise FiO2 oxygen delivery through high-flow reservoir interfaces.',
      snomed: '425848008',
      loinc: '75286-5'
    }
  ],
  'L05.0': [
    {
      code: 'L05.1',
      parentIntervCode: 'L05.0',
      componentCode: 'L',
      name: 'Airway Suctioning Protocol',
      definition: 'Endotracheal or oropharyngeal catheter suctioning to clear pooled secretions.',
      snomed: '230040009',
      loinc: '75287-3'
    },
    {
      code: 'L05.2',
      parentIntervCode: 'L05.0',
      componentCode: 'L',
      name: 'Chest Physiotherapy & Drainage',
      definition: 'Percussion and vibration maneuvers to loosen tracheobronchial secretions.',
      snomed: '34431008',
      loinc: '75287-3'
    }
  ],

  // Bowel (B)
  'B03.0': [
    {
      code: 'B03.1',
      parentIntervCode: 'B03.0',
      componentCode: 'B',
      name: 'Scheduled Bowel Training Program',
      definition: 'Structured evacuation schedule and physiological gastrocolic reflex stimulation.',
      snomed: '225358003',
      loinc: '75288-1'
    },
    {
      code: 'B03.2',
      parentIntervCode: 'B03.0',
      componentCode: 'B',
      name: 'Enteral Enema / Suppository Admin',
      definition: 'Therapeutic administration of cleansing enemas or rectal suppositories.',
      snomed: '385750009',
      loinc: '75288-1'
    }
  ],

  // Skin (R)
  'R02.0': [
    {
      code: 'R02.1',
      parentIntervCode: 'R02.0',
      componentCode: 'R',
      name: 'Aseptic Wound Care Protocol',
      definition: 'Sterile wound irrigation, cleansing, topical medication, and dressing.',
      snomed: '225358003',
      loinc: '75289-9'
    },
    {
      code: 'R02.2',
      parentIntervCode: 'R02.0',
      componentCode: 'R',
      name: 'Pressure Ulcer Dressing Application',
      definition: 'Application of hydrocolloid, foam, or calcium alginate moisture barriers.',
      snomed: '385750009',
      loinc: '75289-9'
    },
    {
      code: 'R02.3',
      parentIntervCode: 'R02.0',
      componentCode: 'R',
      name: 'Frequent Repositioning Schedule',
      definition: 'Every 2-hour pressure-relieving lateral turn and heel suspension.',
      snomed: '229824005',
      loinc: '75289-9'
    }
  ]
};

export function getSubDiagnoses(
  diagCode: string,
  componentCode: string,
  componentName: string,
  diagName: string
): SubDiagnosisConcept[] {
  if (KNOWN_SUB_DIAGNOSES[diagCode]) {
    return KNOWN_SUB_DIAGNOSES[diagCode];
  }
  const baseNum = diagCode.replace(/^[A-Z]/, '').split('.')[0] || '01';
  return [
    {
      code: `${componentCode}${baseNum}.1`,
      parentDiagCode: diagCode,
      componentCode,
      name: `${diagName} (Specific Sub-Diagnosis)`,
      definition: `Detailed clinical diagnostic specification for ${diagName} under ${componentName}.`,
      snomed: '409586006',
      icd10: 'R53.83'
    },
    {
      code: `${componentCode}${baseNum}.2`,
      parentDiagCode: diagCode,
      componentCode,
      name: `${diagName} Secondary Impairment`,
      definition: `Manifest secondary or functional decline associated with ${diagName}.`,
      snomed: '282920008',
      icd10: 'R26.2'
    }
  ];
}

export function getSubInterventions(
  intervCode: string,
  componentCode: string,
  componentName: string,
  intervName: string
): SubInterventionConcept[] {
  if (KNOWN_SUB_INTERVENTIONS[intervCode]) {
    return KNOWN_SUB_INTERVENTIONS[intervCode];
  }
  const baseNum = intervCode.replace(/^[A-Z]/, '').split('.')[0] || '10';
  return [
    {
      code: `${componentCode}${baseNum}.1`,
      parentIntervCode: intervCode,
      componentCode,
      name: `${intervName} Direct Protocol`,
      definition: `Specialized bedside interventional protocol executing ${intervName}.`,
      snomed: '371907003',
      loinc: '75282-4'
    },
    {
      code: `${componentCode}${baseNum}.2`,
      parentIntervCode: intervCode,
      componentCode,
      name: `${intervName} Surveillance Routine`,
      definition: `Structured observational and clinical oversight protocol for ${intervName}.`,
      snomed: '225337009',
      loinc: '75283-2'
    }
  ];
}
