import React from 'react';

interface BoardMember {
  id: string;
  name: string;
  position: string;
  isCoChair: boolean;
  institution?: string;
  profileUrl?: string;
}

const BOARD_MEMBERS: BoardMember[] = [
  {
    id: 'bakken',
    name: 'Suzanne Bakken, PhD, MS, FAAN, FACMI, FIAHSI',
    position: 'Board Member',
    isCoChair: false,
    institution: 'Columbia University School of Nursing'
  },
  {
    id: 'davis',
    name: 'Avaretta Davis, DNP, MS, MHS, RN-BC',
    position: 'Board Member',
    isCoChair: false,
    institution: 'Veterans Health Administration (VHA)'
  },
  {
    id: 'dykes',
    name: 'Patricia C. Dykes, PhD, RN, FAAN, FACMI, FIAHSI',
    position: 'Board Co-chair, Emory University School of Nursing (Profile)',
    isCoChair: true,
    institution: 'Emory University School of Nursing',
    profileUrl: 'https://www.nursing.emory.edu/faculty-staff/patti-dykes'
  },
  {
    id: 'harman',
    name: 'Tiffany Harman, RN, MSN',
    position: 'Board Member',
    isCoChair: false
  },
  {
    id: 'hess',
    name: 'Sherri Hess, MS-IS, BSN, RN-BC, FHIMSS',
    position: 'Board Member',
    isCoChair: false
  },
  {
    id: 'johnson',
    name: 'Steve Johnson, PhD',
    position: 'Board Member',
    isCoChair: false
  },
  {
    id: 'kim',
    name: 'Tae Youn Kim, PhD, RN',
    position: 'Board Member',
    isCoChair: false
  },
  {
    id: 'mykkanen',
    name: 'Minna Mykkanen, MHSc, PhD, RN',
    position: 'Board Member',
    isCoChair: false
  },
  {
    id: 'saranto',
    name: 'Kaija Saranto, PhD, RN, FAAN, FACMI, FIAHSI',
    position: 'Board Member',
    isCoChair: false
  },
  {
    id: 'sengstack',
    name: 'Patricia Sengstack, DNP, RN-BC, FAAN',
    position: 'Board Member',
    isCoChair: false
  },
  {
    id: 'whittenburg',
    name: 'Luann Whittenburg, PhD, RN, FAAN',
    position: 'Board Co-chair',
    isCoChair: true
  }
];

const REGULAR_BOARD_MEMBERS = BOARD_MEMBERS.filter((m) => !m.isCoChair);

interface AboutScreenProps {
  onNavigate: (screen: 'overview' | 'framework' | 'translations' | 'code-builder' | 'terminology' | 'news' | 'about' | 'contact') => void;
  onOpenTerminology: () => void;
}

export const AboutScreen: React.FC<AboutScreenProps> = ({ onNavigate, onOpenTerminology }) => {
  return (
    <div className="flex flex-col w-full">
      {/* Top Banner */}
      <section className="w-full bg-surface-container-low border-b border-border-subtle py-space-lg px-gutter-lg">
        <div className="max-w-7xl mx-auto space-y-space-sm">
          <nav aria-label="Breadcrumb" className="flex items-center gap-space-xs text-text-muted font-label-sm text-label-sm">
            <button
              onClick={() => onNavigate('overview')}
              className="hover:text-primary transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">home</span>
              <span>Home</span>
            </button>
            <span className="text-outline-variant">/</span>
            <span className="text-primary font-semibold">About &amp; Governance</span>
          </nav>

          <div className="max-w-3xl space-y-space-xs">
            <div className="inline-flex items-center gap-space-xs px-space-sm py-1 bg-surface-container text-columbia-crown-blue rounded font-label-sm text-label-sm uppercase tracking-wider font-semibold">
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
              Institutional Governance &amp; History
            </div>
            <h1 className="font-headline-xl text-headline-xl text-primary font-bold tracking-tight">
              About the Clinical Care Classification System
            </h1>
            <p className="font-body-lg text-body-lg text-text-muted leading-relaxed">
              Maintained in academic partnership with the Emory University School of Nursing, the CCC System represents over 30 years of continuous clinical ontology research, empowering nurses to document patient care with atomic precision.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="max-w-7xl mx-auto px-gutter-lg py-space-xl space-y-space-xl">
        {/* Founder Legacy & Emory Stewardship Bento */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-stretch">
          <div className="lg:col-span-7 bg-surface-card p-space-xl rounded-2xl shadow-sm border border-border-subtle space-y-space-md flex flex-col justify-between">
            <div className="space-y-space-sm">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
                Pioneering Founder
              </span>
              <h2 className="font-headline-lg text-headline-lg text-primary font-bold">
                The Legacy of Dr. Virginia K. Saba, EdD, RN, FAAN, FACMI
              </h2>
              <p className="font-body-md text-body-md text-text-muted leading-relaxed">
                Dr. Virginia Saba was a titan and founding visionary in nursing informatics. Beginning with her seminal research at Georgetown University and the Home Health Care Classification (HHCC) project, Dr. Saba recognized that nursing practice required a discrete, relational vocabulary capable of connecting assessments, interventions, and measured outcomes.
              </p>
              <p className="font-body-md text-body-md text-text-muted leading-relaxed">
                Her groundbreaking 4-level model and 21 Care Components bridged the gap between human clinical reasoning and computational data structures, establishing a global precedent for nursing documentation in electronic health records.
              </p>
            </div>

            <div className="p-space-md rounded-xl bg-surface-container-low border border-border-subtle flex items-center justify-between gap-space-sm">
              <div>
                <span className="font-bold text-primary text-sm block">Open Science &amp; Global Access</span>
                <span className="text-xs text-text-muted">Dr. Saba dedicated the terminology to the public domain for global health equity.</span>
              </div>
              <span className="material-symbols-outlined text-secondary text-3xl">public</span>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-primary to-columbia-crown-blue text-on-primary p-space-xl rounded-2xl shadow-md flex flex-col justify-between space-y-space-md">
            <div className="space-y-space-sm">
              <span className="px-2.5 py-1 rounded-full bg-white/20 text-secondary-fixed text-xs font-bold uppercase tracking-wider">
                Institutional Partnership
              </span>
              <h3 className="font-headline-lg text-headline-lg text-white font-bold">
                Emory University School of Nursing
              </h3>
              <p className="font-body-sm text-body-sm text-surface-container leading-relaxed">
                Under the leadership of Dr. Suzanne Bakken and the informatics faculty at Emory Nursing, the CCC System continues to evolve as a modern, vendor-neutral standard for EHR interoperability, artificial intelligence research, and global healthcare registries.
              </p>
            </div>

            <div className="space-y-2 pt-space-xs border-t border-white/20 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-surface-container-highest">Repository Hub:</span>
                <span className="font-bold text-white">Emory Center For Data Science</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-surface-container-highest">Version Release:</span>
                <span className="font-mono font-bold text-secondary-fixed">2.5 Canonical</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-surface-container-highest">Licensing:</span>
                <span className="font-bold text-white">Open Access (Attribution-NC)</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Core Tenets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          <div className="p-space-lg rounded-xl bg-surface-card border border-border-subtle shadow-sm space-y-space-xs">
            <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-primary mb-space-sm">
              <span className="material-symbols-outlined text-2xl">lock_open</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-primary font-bold">Freely Accessible Worldwide</h3>
            <p className="font-body-sm text-body-sm text-text-muted leading-relaxed">
              No subscription fees, developer royalties, or registration gates. Health systems and research teams can download the full terminology tables and crosswalks anytime.
            </p>
          </div>

          <div className="p-space-lg rounded-xl bg-surface-card border border-border-subtle shadow-sm space-y-space-xs">
            <div className="w-12 h-12 rounded-lg bg-secondary-container flex items-center justify-center text-secondary mb-space-sm">
              <span className="material-symbols-outlined text-2xl">hub</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-primary font-bold">Vendor-Neutral Interoperability</h3>
            <p className="font-body-sm text-body-sm text-text-muted leading-relaxed">
              Pre-built mappings to SNOMED CT, LOINC, and HL7 FHIR ensure immediate compatibility with Epic Systems, Oracle Health (Cerner), VA VistA, and MEDITECH.
            </p>
          </div>

          <div className="p-space-lg rounded-xl bg-surface-card border border-border-subtle shadow-sm space-y-space-xs">
            <div className="w-12 h-12 rounded-lg bg-primary-fixed flex items-center justify-center text-primary mb-space-sm">
              <span className="material-symbols-outlined text-2xl">verified</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-primary font-bold">Accredited Standards</h3>
            <p className="font-body-sm text-body-sm text-text-muted leading-relaxed">
              Recognized by the American Nurses Association (ANA), Office of the National Coordinator (ONC), and indexed into the National Library of Medicine (NLM) Metathesaurus.
            </p>
          </div>
        </div>

        {/* International Advisory Board */}
        <div className="bg-surface-card p-space-xl rounded-2xl shadow-sm border border-border-subtle space-y-space-lg">
          {/* Header Row */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md border-b border-border-subtle pb-space-md">
            <div>
              <div className="inline-flex items-center gap-space-xs px-2.5 py-0.5 rounded bg-surface-container text-secondary font-label-sm text-label-sm uppercase tracking-wider font-bold mb-2">
                <span className="material-symbols-outlined text-[16px]">groups</span>
                Governance &amp; Leadership
              </div>
              <h2 className="font-headline-lg text-headline-lg text-primary font-bold">
                International Advisory Board
              </h2>
              <p className="font-body-sm text-body-sm text-text-muted mt-1 max-w-2xl leading-relaxed">
                An interdisciplinary council of global nursing informatics leaders, scholars, and clinical terminologists overseeing ontological integrity, standards alignment, and version releases.
              </p>
            </div>
          </div>

          {/* Co-Chairs Leadership Spotlight */}

          <div className="space-y-space-sm pt-space-xs">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-text-muted font-bold">
                Board Co-chairs
              </span>
            </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">

              <div className="p-space-md rounded-xl bg-gradient-to-br from-primary/5 via-surface to-surface-container-low border border-primary/20 flex flex-col justify-between shadow-xs">
              <div className="space-y-1">
                <h3 className="font-headline-sm text-[16px] font-bold text-primary leading-snug">
                  Patricia C. Dykes, PhD, RN, FAAN, FACMI, FIAHSI
                </h3>
                <p className="font-body-sm text-xs text-text-muted leading-relaxed">
                  Emory University School of Nursing{' '}
                  <a
                    href="https://www.nursing.emory.edu/faculty-staff/patti-dykes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-0.5 text-secondary font-semibold hover:underline"
                  >
                    (Profile)
                    <span className="material-symbols-outlined text-[13px]">open_in_new</span>
                  </a>
                </p>
              </div>
            </div>

            <div className="p-space-md rounded-xl bg-gradient-to-br from-primary/5 via-surface to-surface-container-low border border-primary/20 flex flex-col justify-between shadow-xs">
              <div className="space-y-1">
           
                <h3 className="font-headline-sm text-[16px] font-bold text-primary leading-snug">
                  Luann Whittenburg, PhD, RN, FAAN
                </h3>
                <p className="font-body-sm text-xs text-text-muted leading-relaxed">
                  Nursing Informatics Leadership &amp; Ontological Governance
                </p>
              </div>
            </div>
          </div>
          </div>

          {/* Board Members Cards (Co-chairs removed from bottom cards) */}
          <div className="space-y-space-sm pt-space-xs">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-text-muted font-bold">
                Board Members
              </span>
              <span className="text-xs text-text-muted">
                {REGULAR_BOARD_MEMBERS.length} Appointed Members
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-space-md">
              {REGULAR_BOARD_MEMBERS.map((member) => (
                <div
                  key={member.id}
                  className="p-space-md rounded-xl border border-border-subtle bg-surface hover:border-primary/30 transition-all flex flex-col justify-between shadow-xs"
                >
                  <div>

                    <h4 className="font-headline-sm text-[15px] font-bold text-primary leading-snug">
                      {member.name}
                    </h4>
                     {member.institution && (
                      <p className="text-xs text-text-muted mt-0.5">{member.institution}</p>
                    )}
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* Board Secretariat & Submissions Footer Note */}
          <div className="p-space-md rounded-xl bg-surface-container-low border border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-space-md text-xs text-text-muted">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[18px]">verified</span>
              <span>All 11 board appointments confirmed for CCC System Release 2.5 governance cycle.</span>
            </div>
            <button
              onClick={() => onNavigate('contact')}
              className="font-semibold text-primary hover:text-secondary flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>Submit Concept Proposal to Board</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Global Translations Section */}
        <div className="bg-surface-container-low p-space-xl rounded-2xl border border-border-subtle flex flex-col md:flex-row items-center justify-between gap-space-lg">
          <div className="space-y-1">
            <span className="font-code-badge text-code-badge text-secondary font-bold uppercase">International Harmonization</span>
            <h3 className="font-headline-md text-headline-md text-primary font-bold">Multilingual Terminology Translations</h3>
            <p className="font-body-sm text-body-sm text-text-muted max-w-xl">
              The CCC System has been validated and translated into Spanish, Portuguese, German, Dutch, Turkish, and Mandarin to empower nurses globally.
            </p>
          </div>
          <div className="flex items-center gap-space-xs flex-wrap">
            <button
              onClick={() => onNavigate('translations')}
              className="px-space-md py-2 rounded-lg bg-primary hover:bg-columbia-crown-blue text-on-primary font-label-md text-label-md font-semibold transition-colors cursor-pointer shadow-sm flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">g_translate</span>
              <span>View Multilingual Translations</span>
            </button>
          </div>
        </div>

        {/* Official Contact & Secretariat Card */}
        <div className="bg-surface-card p-space-xl rounded-2xl border border-border-subtle flex flex-col md:flex-row items-center justify-between gap-space-lg shadow-sm">
          <div className="space-y-1">
            <span className="font-code-badge text-code-badge text-columbia-crown-blue font-bold uppercase">Official Inquiries &amp; Secretariat</span>
            <h3 className="font-headline-md text-headline-md text-primary font-bold">Contact the CCC System Team &amp; Advisory Board</h3>
            <p className="font-body-sm text-body-sm text-text-muted max-w-xl">
              Have questions regarding CCC concepts, codes, care component classes, or proposing new concepts? Reach out through our official inquiry portal.
            </p>
          </div>
          <div className="flex items-center gap-space-xs flex-wrap">
            <button
              onClick={() => onNavigate('contact')}
              className="px-space-md py-2 rounded-lg bg-primary hover:bg-columbia-crown-blue text-on-primary font-label-md text-label-md font-semibold transition-colors cursor-pointer shadow-sm flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">mail</span>
              <span>Open Contact Form</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
