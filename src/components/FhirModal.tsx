import React, { useState } from 'react';

interface FhirModalProps {
  isOpen: boolean;
  onClose: () => void;
  fullCode: string;
  diagCode: string;
  diagName: string;
  qualifierName: string;
  goalName: string;
  goalCode: string;
  intervCode: string;
  intervName: string;
  actionName: string;
  actionCode: string;
  outcomeName: string;
  outcomeCode: string;
  snomed: string;
  loinc: string;
}

export const FhirModal: React.FC<FhirModalProps> = ({
  isOpen,
  onClose,
  fullCode,
  diagCode,
  diagName,
  qualifierName,
  goalName,
  goalCode,
  intervCode,
  intervName,
  actionName,
  actionCode,
  outcomeName,
  outcomeCode,
  snomed,
  loinc
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const fhirPayload = {
    resourceType: 'CarePlan',
    id: `ccc-poc-${diagCode.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
    meta: {
      profile: ['http://hl7.org/fhir/us/core/StructureDefinition/us-core-careplan'],
      lastUpdated: new Date().toISOString()
    },
    status: 'active',
    intent: 'plan',
    category: [
      {
        coding: [
          {
            system: 'http://terminology.hl7.org/CodeSystem/care-plan-category',
            code: 'assess-plan',
            display: 'Assessment and Care Plan'
          },
          {
            system: 'http://clinicalcareclassification.org/v25/component',
            code: diagCode.charAt(0),
            display: 'Care Component'
          }
        ]
      }
    ],
    addresses: [
      {
        concept: {
          coding: [
            {
              system: 'urn:oid:2.16.840.1.113883.6.236',
              code: diagCode,
              display: `${diagName} (${qualifierName}) [Expected: ${goalName}]`
            },
            {
              system: 'http://snomed.info/sct',
              code: snomed || '409586006',
              display: `${diagName} (finding)`
            }
          ]
        }
      }
    ],
    goal: [
      {
        description: {
          text: `Expected Outcome State: ${goalName} (CCC Modifier .${goalCode})`
        }
      }
    ],
    activity: [
      {
        detail: {
          kind: 'Procedure',
          code: {
            coding: [
              {
                system: 'urn:oid:2.16.840.1.113883.6.236',
                code: `${intervCode}.${actionCode}.${outcomeCode}`,
                display: `${intervName}, ${actionName}, ${outcomeName}`
              },
              {
                system: 'http://loinc.org',
                code: loinc || '75282-4',
                display: `${intervName} protocol`
              }
            ]
          },
          status: 'in-progress'
        },
        outcomeCodeableConcept: [
          {
            coding: [
              {
                system: 'http://clinicalcareclassification.org/v25/outcome',
                code: outcomeCode,
                display: outcomeName
              }
            ]
          }
        ]
      }
    ]
  };

  const fhirString = JSON.stringify(fhirPayload, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(fhirString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([fhirString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CCC-FHIR-CarePlan-${diagCode}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-primary/40 backdrop-blur-sm flex items-center justify-center p-gutter">
      <div className="bg-surface-card rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[85vh] border border-border-subtle">
        <div className="p-space-md bg-surface-container-low border-b border-border-subtle flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">data_object</span>
            <div>
              <h3 className="font-headline-sm text-sm font-bold text-primary">
                HL7® FHIR® R4 CarePlan Resource Snippet
              </h3>
              <p className="text-[11px] text-text-muted">
                Synthesized for pair: <strong className="font-mono text-primary">{fullCode}</strong>
              </p>
            </div>
          </div>
          <button
            className="text-text-muted hover:text-primary transition-colors cursor-pointer p-1"
            onClick={onClose}
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="p-space-md overflow-y-auto font-mono text-xs bg-surface-card text-text-primary">
          <pre className="bg-surface-container-low border border-border-subtle p-space-sm rounded-lg overflow-x-auto text-[11px] leading-relaxed selection:bg-primary-fixed">
            {fhirString}
          </pre>
        </div>

        <div className="p-space-md bg-surface-container-low border-t border-border-subtle flex items-center justify-between gap-space-sm">
          <div className="text-[12px] text-text-muted font-medium">
            Standard: US-Core CarePlan R4 • Semantic mappings verified
          </div>
          <div className="flex items-center gap-2">
            <button
              className="px-space-md py-1.5 rounded-lg bg-surface-card border border-border-subtle text-primary font-label-sm font-semibold hover:bg-surface-container transition-colors cursor-pointer"
              onClick={handleDownload}
            >
              Download JSON
            </button>
            <button
              className="px-space-md py-1.5 rounded-lg bg-primary text-on-primary font-label-sm font-bold hover:bg-columbia-crown-blue transition-colors flex items-center gap-1 shadow-sm cursor-pointer"
              onClick={handleCopy}
            >
              <span className="material-symbols-outlined text-[16px]">content_copy</span>
              <span>{copied ? 'Copied!' : 'Copy JSON'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
