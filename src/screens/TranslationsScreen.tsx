import React, { useState, useMemo } from 'react';

interface TranslationsScreenProps {
  onNavigate: (screen: 'overview' | 'framework' | 'translations' | 'code-builder' | 'terminology' | 'news' | 'about' | 'contact') => void;
  onOpenTerminology: () => void;
}

interface TranslationItem {
  id: string;
  language: string;
  nativeName: string;
  flag: string;
  versions: ('v2.5' | 'v2.0' | 'v1.0')[];
  formats: ('PDF' | 'DOC' | 'ZIP' | 'HTML')[];
  institution: string;
  translators: string;
  description: string;
  primaryFile: {
    label: string;
    format: string;
    size: string;
    filename: string;
    icon: string;
  };
  secondaryFile?: {
    label: string;
    format: string;
    size: string;
    filename: string;
    icon: string;
  };
  altAction?: {
    label: string;
    tooltip: string;
    icon: string;
    filename: string;
  };
}

const TRANSLATIONS: TranslationItem[] = [
  {
    id: 'chinese',
    language: 'Chinese',
    nativeName: '中文',
    flag: '🇨🇳',
    versions: ['v2.5'],
    formats: ['ZIP'],
    institution: 'Zhongwei Institute of Nursing Information',
    translators: 'Profs. Lei Yang & Jian Wei Yan',
    description:
      'Translated by Profs. Lei Yang & Jian Wei Yan. Complete four-level architecture update submitted to the IAB in Oct 2025.',
    primaryFile: {
      label: '202510 (.ZIP)',
      format: 'ZIP',
      size: '3.2 MB',
      filename: 'CCC_Chinese_v2.5_202510.zip',
      icon: 'download'
    },
    secondaryFile: {
      label: 'Jan 2021 (201708)',
      format: 'ZIP',
      size: '5.67 MB',
      filename: 'CCC_Chinese_v2.0_201708.zip',
      icon: 'history'
    },
    altAction: {
      label: 'Previous Archive',
      tooltip: 'Previous 201708 Archive',
      icon: 'folder',
      filename: 'CCC_Chinese_v2.0_201708.zip'
    }
  },
  {
    id: 'italian',
    language: 'Italian',
    nativeName: 'Italiano',
    flag: '🇮🇹',
    versions: ['v2.5'],
    formats: ['PDF'],
    institution: 'Saint Camillus International University, Rome',
    translators: 'Assistant Professor Fabio D’Agostino, PhD, RN',
    description:
      'Translated by Assistant Professor Fabio D’Agostino, PhD, RN. Full clinical classification framework released in October 2019.',
    primaryFile: {
      label: 'Download Italian v2.5 (PDF)',
      format: 'PDF',
      size: '680 KB',
      filename: 'CCC_Italian_v2.5_Clinical_Classification.pdf',
      icon: 'picture_as_pdf'
    }
  },
  {
    id: 'spanish',
    language: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇨',
    versions: ['v2.5', 'v2.0'],
    formats: ['PDF', 'DOC'],
    institution: 'Ciudadela Universitaria, Guayaquil, Ecuador',
    translators: 'Patricia Levi, RN, MSc',
    description:
      'Translated by Patricia Levi, RN, MSc. Deployed broadly across Latin American tertiary hospitals and clinical nursing curricula.',
    primaryFile: {
      label: 'v2.5 (PDF)',
      format: 'PDF',
      size: '597 KB',
      filename: 'CCC_Spanish_v2.5_Manual.pdf',
      icon: 'download'
    },
    secondaryFile: {
      label: 'v2.5 (DOCX)',
      format: 'DOC',
      size: '105 KB',
      filename: 'CCC_Spanish_v2.5_Manual.docx',
      icon: 'description'
    }
  },
  {
    id: 'persian',
    language: 'Persian / Farsi',
    nativeName: 'فارسی',
    flag: '🇮🇷',
    versions: ['v2.5'],
    formats: ['PDF'],
    institution: 'Tehran University of Medical Sciences, Iran',
    translators: 'Dr. Maryam Rassouli, PhD, RN',
    description:
      'Translated by Dr. Maryam Rassouli, PhD, RN. Full crosswalk of Iranian nursing interventions and health informatics benchmarks.',
    primaryFile: {
      label: 'Download Persian v2.5 (PDF)',
      format: 'PDF',
      size: '1.6 MB',
      filename: 'CCC_Persian_Farsi_v2.5_Ontology.pdf',
      icon: 'picture_as_pdf'
    }
  },
  {
    id: 'slovene',
    language: 'Slovene',
    nativeName: 'Slovenščina',
    flag: '🇸🇮',
    versions: ['v2.5', 'v1.0'],
    formats: ['PDF', 'HTML'],
    institution: 'Slovenian Nursing Informatics Working Group',
    translators: 'Majda Šlajmer Japelj',
    description:
      'v1.0 translated by pioneer Majda Šlajmer Japelj; followed by v2.5 clinical primer and periodic informatics newsletters.',
    primaryFile: {
      label: 'Primer (PDF)',
      format: 'PDF',
      size: '206 KB',
      filename: 'CCC_Slovene_v2.5_Clinical_Primer.pdf',
      icon: 'menu_book'
    },
    secondaryFile: {
      label: 'Newsletter',
      format: 'PDF',
      size: '575 KB',
      filename: 'CCC_Slovene_v2.5_Newsletter_Brief.pdf',
      icon: 'newspaper'
    }
  },
  {
    id: 'korean',
    language: 'Korean',
    nativeName: '한국어',
    flag: '🇰🇷',
    versions: ['v2.0'],
    formats: ['DOC', 'PDF'],
    institution: 'Seoul National University, Seoul, Korea',
    translators: 'Prof. Hyeoun-Ae Park, PhD, RN, FAAN',
    description:
      'Translated by Prof. Hyeoun-Ae Park, PhD, RN, FAAN. Formally adapted for Korean EHR nursing care plan terminology systems.',
    primaryFile: {
      label: 'MS Word',
      format: 'DOC',
      size: '1.8 MB',
      filename: 'CCC_Korean_v2.0_Terminology.doc',
      icon: 'description'
    },
    secondaryFile: {
      label: 'PDF',
      format: 'PDF',
      size: '1.1 MB',
      filename: 'CCC_Korean_v2.0_Canonical.pdf',
      icon: 'picture_as_pdf'
    }
  },
  {
    id: 'norwegian',
    language: 'Norwegian',
    nativeName: 'Norsk',
    flag: '🇳🇴',
    versions: ['v2.0'],
    formats: ['DOC', 'PDF'],
    institution: 'Oslo University Hospital & NSF',
    translators: 'Katryn Niemi Mølstad & Karl Øyri',
    description:
      'Translated by Katryn Niemi Mølstad & Karl Øyri of Oslo, Norway. Validated with the Norwegian Nurses Organisation.',
    primaryFile: {
      label: 'MS Word',
      format: 'DOC',
      size: '420 KB',
      filename: 'CCC_Norwegian_v2.0_Nordic_Template.doc',
      icon: 'description'
    },
    secondaryFile: {
      label: 'PDF',
      format: 'PDF',
      size: '427 KB',
      filename: 'CCC_Norwegian_v2.0_Standardized.pdf',
      icon: 'picture_as_pdf'
    }
  },
  {
    id: 'turkish',
    language: 'Turkish',
    nativeName: 'Türkçe',
    flag: '🇹🇷',
    versions: ['v2.0'],
    formats: ['DOC', 'PDF'],
    institution: 'Hacettepe & Pamukkale Universities',
    translators: 'Prof. Oya Nuran Emiroğlu & Dr. Gülbahar Korkmaz Aslan',
    description:
      'Translated by Prof. Oya Nuran Emiroğlu & Dr. Gülbahar Korkmaz Aslan of Ankara, Turkey. Comprehensive diagnostic sub-codes.',
    primaryFile: {
      label: 'MS Word',
      format: 'DOC',
      size: '522 KB',
      filename: 'CCC_Turkish_v2.0_EHR_Specification.doc',
      icon: 'description'
    },
    secondaryFile: {
      label: 'PDF',
      format: 'PDF',
      size: '471 KB',
      filename: 'CCC_Turkish_v2.0_Formal_Document.pdf',
      icon: 'picture_as_pdf'
    }
  },
  {
    id: 'portuguese',
    language: 'Portuguese',
    nativeName: 'Português',
    flag: '🇧🇷',
    versions: ['v1.0'],
    formats: ['HTML'],
    institution: 'Federal University of São Paulo (UNIFESP)',
    translators: 'Dr. Heimar de Fatima Marin, PhD, RN, FACMI',
    description:
      'Translated by esteemed informaticist Dr. Heimar de Fatima Marin, PhD, RN, FACMI. Foundation for early Brazilian clinical nursing systems.',
    primaryFile: {
      label: 'Explore Portuguese Documentation (HTML)',
      format: 'HTML',
      size: 'Web Portal',
      filename: 'CCC_Portuguese_v1.0_Portal.html',
      icon: 'open_in_browser'
    }
  }
];

export const TranslationsScreen: React.FC<TranslationsScreenProps> = ({ onNavigate, onOpenTerminology }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [versionFilter, setVersionFilter] = useState<'all' | 'v2.5' | 'v2.0' | 'v1.0'>('all');
  const [formatFilter, setFormatFilter] = useState<'all' | 'PDF' | 'DOC' | 'ZIP' | 'HTML'>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Proposal Modal State
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);
  const [proposalLang, setProposalLang] = useState('');
  const [proposalInvestigator, setProposalInvestigator] = useState('');
  const [proposalInstitution, setProposalInstitution] = useState('');
  const [proposalCountry, setProposalCountry] = useState('');
  const [proposalSubmitted, setProposalSubmitted] = useState(false);

  // Technical Assistance Modal
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 3800);
  };

  const handleDownload = (filename: string, label: string) => {
    // Generate simulated download blob
    const content = `Clinical Care Classification (CCC) System v2.5 Linguistic Concordance\nPackage: ${filename}\nTitle: ${label}\nDownloaded: ${new Date().toISOString()}\nLicense: Creative Commons CC BY-NC 4.0\nPartner: Columbia University School of Nursing`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(`Downloading package: ${filename} (${label})`);
  };

  const handleCopyCitation = (text: string, title: string) => {
    navigator.clipboard.writeText(text);
    showToast(`Copied ${title} citation to clipboard!`);
  };

  const handleProposalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProposalSubmitted(true);
    setTimeout(() => {
      setIsProposalModalOpen(false);
      setProposalSubmitted(false);
      setProposalLang('');
      setProposalInvestigator('');
      setProposalInstitution('');
      setProposalCountry('');
      showToast('Translation proposal submitted to Columbia Nursing IAB Committee!');
    }, 1200);
  };

  // Filtered Directory
  const filteredTranslations = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return TRANSLATIONS.filter((item) => {
      // Search match
      const matchesSearch =
        !q ||
        item.language.toLowerCase().includes(q) ||
        item.nativeName.toLowerCase().includes(q) ||
        item.institution.toLowerCase().includes(q) ||
        item.translators.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);

      // Version match
      const matchesVersion = versionFilter === 'all' || item.versions.includes(versionFilter);

      // Format match
      const matchesFormat = formatFilter === 'all' || item.formats.includes(formatFilter);

      return matchesSearch && matchesVersion && matchesFormat;
    });
  }, [searchQuery, versionFilter, formatFilter]);

  const resetFilters = () => {
    setSearchQuery('');
    setVersionFilter('all');
    setFormatFilter('all');
  };

  return (
    <div className="flex flex-col w-full">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl bg-primary text-on-primary shadow-2xl border border-white/20 animate-bounce">
          <span className="material-symbols-outlined text-[20px] text-secondary-fixed">check_circle</span>
          <span className="font-label-md text-label-md">{toastMessage}</span>
        </div>
      )}

      {/* Top Academic Context Banner */}
      <div className="w-full bg-surface-container-high/60 border-b border-border-subtle py-2 px-gutter-lg">
        <div className="max-w-[1280px] mx-auto flex flex-wrap items-center justify-between gap-y-2 text-label-sm font-label-sm text-text-muted">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-secondary text-[16px]">verified</span>
            <span>Standardized Nursing Terminology • Recognized by the American Nurses Association (ANA)</span>
          </div>
          <div className="flex items-center gap-space-md">
            <span className="inline-flex items-center gap-1 text-primary font-code-badge font-semibold">
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
              Columbia University School of Nursing Global Partnership
            </span>
            <span className="hidden md:inline text-outline-variant">|</span>
            <span className="hidden md:inline">ICN Harmonization Working Group</span>
          </div>
        </div>
      </div>

      {/* Breadcrumbs & Compliance Header */}
      <section className="w-full bg-surface px-gutter-lg pt-space-xl pb-space-lg">
        <div className="max-w-[1280px] mx-auto flex flex-col gap-space-md">
          {/* Breadcrumb Bar */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-space-xs text-text-muted font-label-sm text-label-sm">
            <button
              onClick={() => onNavigate('overview')}
              className="hover:text-primary transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">home</span>
              <span>Home</span>
            </button>
            <span className="text-outline-variant">/</span>
            <span className="text-primary font-semibold">Multilingual Translations</span>
          </nav>

          {/* Compliance Badges */}
          <div className="flex flex-wrap items-center gap-space-xs mt-space-xs">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary font-code-badge text-code-badge font-bold">
              <span className="material-symbols-outlined text-[14px]">public</span>
              Global Interoperability Standard
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary/10 text-secondary font-code-badge text-code-badge font-bold">
              <span className="material-symbols-outlined text-[14px]">health_and_safety</span>
              WHO / ICN Harmonized
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[14px]">schedule</span>
              Page Last Updated: Nov 19, 2025
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container text-columbia-crown-blue font-label-sm text-label-sm font-semibold">
              <span className="material-symbols-outlined text-[14px]">lock_open</span>
              CC BY-NC 4.0 Open Access
            </span>
          </div>

          {/* Main Headline Block */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg mt-space-sm">
            <div className="max-w-3xl flex flex-col gap-space-xs">
              <span className="font-code-badge text-code-badge uppercase tracking-wider text-secondary font-bold">
                Clinical Terminology Concordance
              </span>
              <h1 className="font-display-lg text-display-lg text-primary tracking-tight font-bold">
                Multilingual Translations &amp; Global Concordance
              </h1>
              <p className="font-body-lg text-body-lg text-text-muted mt-space-xs leading-relaxed">
                Official international linguistic adaptations and cross-cultural terminology concordances of the Clinical Care Classification (CCC) System versions 1.0, 2.0, and 2.5, validated by national informatics authorities and academic research fellows.
              </p>
            </div>

            {/* Quick Corpus Download Action Card */}
            <div className="shrink-0 flex flex-col items-start lg:items-end gap-space-xs p-space-md rounded-xl bg-surface-container-low shadow-sm border border-border-subtle">
              <span className="text-label-sm font-label-sm text-text-muted">Single Archive Repository</span>
              <button
                onClick={() =>
                  handleDownload(
                    'CCC_Complete_Multilingual_Corpus_v2.5.zip',
                    'Download Complete Corpus (.ZIP)'
                  )
                }
                className="inline-flex items-center gap-2 px-space-md py-space-sm rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:bg-columbia-crown-blue transition-colors shadow-sm cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">folder_zip</span>
                <span>Download Complete Corpus (.ZIP)</span>
              </button>
              <span className="text-label-sm font-label-sm text-outline">v2.5, v2.0 &amp; v1.0 • 28.4 MB total</span>
            </div>
          </div>

          {/* Global Translation Metrics Ribbon */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-space-md mt-space-md pt-space-lg border-t border-border-subtle">
            <div className="p-space-md rounded-xl bg-surface-card shadow-sm border border-border-subtle flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-text-muted font-medium">Target Languages</span>
                <span className="material-symbols-outlined text-secondary text-[20px]">language</span>
              </div>
              <span className="font-display-lg-mobile text-display-lg-mobile text-primary font-bold mt-1">9</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant mt-1 leading-snug">
                Chinese, Italian, Korean, Norwegian, Persian, Portuguese, Slovene, Spanish, Turkish
              </span>
            </div>

            <div className="p-space-md rounded-xl bg-surface-card shadow-sm border border-border-subtle flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-text-muted font-medium">Ontology Versions</span>
                <span className="material-symbols-outlined text-columbia-crown-blue text-[20px]">layers</span>
              </div>
              <span className="font-display-lg-mobile text-display-lg-mobile text-primary font-bold mt-1">3</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant mt-1 leading-snug">
                Version 2.5 (Current), Version 2.0 (Legacy), Version 1.0 (Historical)
              </span>
            </div>

            <div className="p-space-md rounded-xl bg-surface-card shadow-sm border border-border-subtle flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-text-muted font-medium">Academic License</span>
                <span className="material-symbols-outlined text-secondary text-[20px]">verified_user</span>
              </div>
              <span className="font-display-lg-mobile text-display-lg-mobile text-primary font-bold mt-1">100%</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant mt-1 leading-snug">
                Open Access for EHR implementation, education, and health systems research
              </span>
            </div>

            <div className="p-space-md rounded-xl bg-surface-card shadow-sm border border-border-subtle flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-text-muted font-medium">Interoperable Formats</span>
                <span className="material-symbols-outlined text-primary-container text-[20px]">dataset</span>
              </div>
              <span className="font-display-lg-mobile text-display-lg-mobile text-primary font-bold mt-1">5</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant mt-1 leading-snug">
                Full documentation in ZIP packages, PDF guidelines, DOCX mappings, and HTML
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Global Map & Visual Distribution Teaser */}
      <section className="w-full bg-surface-canvas px-gutter-lg py-space-lg">
        <div className="max-w-[1280px] mx-auto rounded-xl bg-surface-card shadow-sm border border-border-subtle p-space-lg">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-space-lg">
            <div className="max-w-xl flex flex-col gap-space-xs">
              <div className="inline-flex items-center gap-1.5 text-secondary font-code-badge text-code-badge uppercase font-bold">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                Worldwide Academic Deployment
              </div>
              <h2 className="font-headline-lg text-headline-lg text-primary font-bold">
                Harmonized Care Semantics Across Five Continents
              </h2>
              <p className="font-body-md text-body-md text-text-muted leading-relaxed">
                The CCC System’s four-level architectural model facilitates direct cross-mapping to international electronic health records. Certified translators work in partnership with academic hospitals in Rome, Seoul, Tehran, Oslo, São Paulo, Guayaquil, and Ankara.
              </p>
              <div className="flex flex-wrap gap-space-sm pt-space-xs">
                <span className="px-2 py-1 bg-surface-container text-primary font-code-badge text-code-badge font-bold rounded">
                  ISO/TR 12300:2014 Compliant
                </span>
                <span className="px-2 py-1 bg-surface-container text-primary font-code-badge text-code-badge font-bold rounded">
                  HL7 Nursing CDA Compatible
                </span>
                <span className="px-2 py-1 bg-surface-container text-primary font-code-badge text-code-badge font-bold rounded">
                  SNOMED CT Crosswalk Ready
                </span>
              </div>
            </div>

            {/* Photographic Visual of Clinical Nursing Informatics Lab */}
            <div className="relative w-full lg:w-[480px] h-56 rounded-lg overflow-hidden shadow-sm shrink-0">
              <img
                className="w-full h-full object-cover"
                alt="Modern clinical nursing informatics command center at Columbia University School of Nursing, showing nurse researchers analyzing multilingual patient terminology trees on high-resolution curved monitors"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXJa6hxdBH5OsspmJfZKz59N10xn9So0eiPkQD2YMUgOj03BxOoUNQrUSlla1l3IzbOYOwLiTY1y95ckGwHXCJUS-Z-2Ewz8LrNbdx5rH_tYg07iVrVqloFQSA3KFyfDQf6g5kXKHqkKrQTr-2JiH4BE70oEKbhdufT3tUkeTCRl2bRF_Z17dv_kdNI7slxv-3ZYN81MGZ3qdtyMqfh2V3okuwo5rNGvTmBQZrGj-HpD7Ek8nIMvvnvw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent flex items-end p-space-md">
                <div className="text-on-primary">
                  <p className="font-label-md text-label-md font-semibold">Columbia School of Nursing Informatics Laboratory</p>
                  <p className="font-label-sm text-label-sm text-primary-fixed">Host repository for official translation releases &amp; semantic alignment.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spotlight: Latest Translation Release (Chinese v2.5 - Oct/Nov 2025) */}
      <section className="w-full bg-surface px-gutter-lg py-space-xl">
        <div className="max-w-[1280px] mx-auto flex flex-col gap-space-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-secondary text-[24px]">new_releases</span>
              <span className="font-headline-md text-headline-md text-primary font-bold">Featured Translation Release</span>
            </div>
            <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary font-label-sm text-label-sm font-semibold">
              IAB Approved: Nov 2025
            </span>
          </div>

          {/* Spotlight Card */}
          <div className="w-full rounded-xl bg-gradient-to-br from-surface-card via-surface-card to-surface-container-low shadow-md border border-border-subtle p-space-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-fixed/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
              <div className="lg:col-span-8 flex flex-col gap-space-sm">
                <div className="flex flex-wrap items-center gap-space-xs">
                  <span className="px-2.5 py-0.5 rounded-full bg-primary text-on-primary font-code-badge text-code-badge font-bold">
                    CHINESE (中文)
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-surface-container-high text-primary font-code-badge text-code-badge font-bold">
                    RELEASE v2.5
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-code-badge text-code-badge font-bold">
                    UPDATE VERSION: 202510
                  </span>
                </div>
                <h3 className="font-headline-xl text-headline-xl text-primary tracking-tight font-bold">
                  Chinese Official v2.5 Classification &amp; Terminology Concordance
                </h3>
                <p className="font-body-md text-body-md text-text-muted leading-relaxed">
                  Prepared by <strong className="text-primary font-semibold">Professors Lei Yang and Jian Wei Yan</strong> of the Zhongwei Institute of Nursing Information. Submitted to the International Advisory Board (IAB) in October 2025 and officially uploaded to the master repository in November 2025.
                </p>

                {/* Metadata Specs Bento */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm mt-space-sm">
                  <div className="p-space-sm rounded-lg bg-surface-container-lowest border border-border-subtle shadow-sm flex flex-col">
                    <span className="font-label-sm text-label-sm text-outline">Care Architecture</span>
                    <span className="font-headline-sm text-headline-sm text-primary font-bold">21 Components</span>
                    <span className="font-label-sm text-label-sm text-text-muted">Full 4-level coding index</span>
                  </div>
                  <div className="p-space-sm rounded-lg bg-surface-container-lowest border border-border-subtle shadow-sm flex flex-col">
                    <span className="font-label-sm text-label-sm text-outline">Clinical Coverage</span>
                    <span className="font-headline-sm text-headline-sm text-primary font-bold">176 Diagnoses</span>
                    <span className="font-label-sm text-label-sm text-text-muted">804 Interventions / Actions</span>
                  </div>
                  <div className="p-space-sm rounded-lg bg-surface-container-lowest border border-border-subtle shadow-sm flex flex-col">
                    <span className="font-label-sm text-label-sm text-outline">Target Environments</span>
                    <span className="font-headline-sm text-headline-sm text-primary font-bold">Inpatient &amp; Community</span>
                    <span className="font-label-sm text-label-sm text-text-muted">Harmonized for Hospital EHRs</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-space-md pt-space-md">
                  <button
                    onClick={() => handleDownload('CCC_Chinese_v2.5_202510.zip', 'Chinese 202510 Release')}
                    className="inline-flex items-center gap-2 px-space-md py-space-sm rounded-lg bg-secondary text-on-secondary font-label-md text-label-md hover:bg-secondary/90 transition-colors shadow-sm cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">download</span>
                    <span>Download 202510 Release (.ZIP — 3.2 MB)</span>
                  </button>

                  <button
                    onClick={() => handleDownload('CCC_Chinese_v2.0_201708.zip', 'Chinese 201708 Archive')}
                    className="inline-flex items-center gap-2 px-space-md py-space-sm rounded-lg bg-surface-container text-primary font-label-md text-label-md hover:bg-surface-container-high transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">history</span>
                    <span>Previous 201708 Archive (.ZIP — 5.67 MB)</span>
                  </button>

                  <button
                    onClick={() => {
                      showToast('Opening International Advisory Board (IAB) Chinese v2.5 Ratification Document.');
                    }}
                    className="font-label-sm text-label-sm text-secondary hover:underline flex items-center gap-1 cursor-pointer font-semibold"
                  >
                    <span>View IAB Approval Documentation</span>
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col justify-between rounded-xl bg-surface-container-lowest border border-border-subtle p-space-md shadow-sm">
                <div className="flex flex-col gap-space-xs">
                  <div className="flex items-center gap-2 text-primary font-label-md text-label-md font-bold">
                    <span className="material-symbols-outlined text-secondary">verified_user</span>
                    <span>Lead Translators Profile</span>
                  </div>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold text-headline-sm shadow-sm">
                      LY
                    </div>
                    <div>
                      <h4 className="font-headline-sm text-headline-sm text-primary font-bold">
                        Prof. Lei Yang &amp; Prof. Jian Wei Yan
                      </h4>
                      <p className="font-body-sm text-body-sm text-text-muted">Zhongwei Institute of Nursing Information</p>
                    </div>
                  </div>
                  <p className="font-body-sm text-body-sm text-text-muted mt-2 italic leading-relaxed">
                    “This 2025 revision establishes seamless terminological fidelity with mainland electronic medical records, aligning nursing diagnoses, interventions, and care outcome benchmarks with national health informatics guidelines.”
                  </p>
                </div>
                <div className="pt-space-md border-t border-border-subtle mt-space-md flex items-center justify-between text-label-sm text-text-muted">
                  <span>Submitted: Oct 2025</span>
                  <span>Published: Nov 2025</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Interactive Directory Section */}
      <section className="w-full bg-surface-canvas px-gutter-lg py-space-xl">
        <div className="max-w-[1280px] mx-auto flex flex-col gap-space-lg">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
            <div>
              <span className="font-code-badge text-code-badge text-secondary uppercase font-bold">International Lexicon</span>
              <h2 className="font-headline-xl text-headline-xl text-primary tracking-tight font-bold">
                Complete Translation Directory
              </h2>
              <p className="font-body-md text-body-md text-text-muted mt-1">
                Access validated translation deliverables, academic primers, EHR documentation dictionaries, and legacy archives.
              </p>
            </div>
            <div className="flex items-center gap-2 text-label-sm text-text-muted bg-surface-card px-3.5 py-2 rounded-lg shadow-sm border border-border-subtle shrink-0">
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
              <span>
                Showing <strong className="text-primary font-bold">{filteredTranslations.length}</strong> official international languages
              </span>
            </div>
          </div>

          {/* Search, Version Filter Pills, and Format Toolbar */}
          <div className="w-full bg-surface-card rounded-xl p-space-md shadow-sm border border-border-subtle flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-space-md">
            {/* Live Search Field */}
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by language, translator, institution, or country (e.g. Italian, Fabio D'Agostino, Ecuador)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-surface text-on-surface font-body-sm text-body-sm placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-secondary/40 border border-border-subtle shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-primary cursor-pointer"
                  title="Clear search"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              )}
            </div>

            {/* Version Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 bg-surface-container-low p-1 rounded-lg">
              <button
                onClick={() => setVersionFilter('all')}
                className={`px-3 py-1.5 rounded-md font-label-md text-label-md transition-all cursor-pointer ${
                  versionFilter === 'all'
                    ? 'bg-primary text-on-primary font-semibold shadow-sm'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                All Versions
              </button>
              <button
                onClick={() => setVersionFilter('v2.5')}
                className={`px-3 py-1.5 rounded-md font-label-md text-label-md transition-all cursor-pointer ${
                  versionFilter === 'v2.5'
                    ? 'bg-primary text-on-primary font-semibold shadow-sm'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                Release 2.5 (Current)
              </button>
              <button
                onClick={() => setVersionFilter('v2.0')}
                className={`px-3 py-1.5 rounded-md font-label-md text-label-md transition-all cursor-pointer ${
                  versionFilter === 'v2.0'
                    ? 'bg-primary text-on-primary font-semibold shadow-sm'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                Release 2.0 (Legacy)
              </button>
              <button
                onClick={() => setVersionFilter('v1.0')}
                className={`px-3 py-1.5 rounded-md font-label-md text-label-md transition-all cursor-pointer ${
                  versionFilter === 'v1.0'
                    ? 'bg-primary text-on-primary font-semibold shadow-sm'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                Release 1.0 (Historical)
              </button>
            </div>

            {/* Format Selector */}
            <div className="relative shrink-0">
              <select
                value={formatFilter}
                onChange={(e) => setFormatFilter(e.target.value as any)}
                className="appearance-none bg-surface text-on-surface font-label-md text-label-md py-2.5 pl-4 pr-10 rounded-lg shadow-sm border border-border-subtle focus:outline-none focus:ring-2 focus:ring-secondary/40 cursor-pointer"
              >
                <option value="all">All File Formats</option>
                <option value="PDF">PDF Documents</option>
                <option value="DOC">Word (.doc / .docx)</option>
                <option value="ZIP">Full ZIP Packages</option>
                <option value="HTML">Web Documentation</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-outline text-[18px]">
                expand_more
              </span>
            </div>
          </div>

          {/* Directory Cards Grid */}
          {filteredTranslations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
              {filteredTranslations.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col justify-between rounded-xl bg-surface-card p-space-lg shadow-sm hover:shadow-md border border-border-subtle transition-shadow"
                >
                  <div>
                    <div className="flex items-center justify-between pb-space-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-[20px]">{item.flag}</span>
                        <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
                          {item.language} ({item.nativeName})
                        </h3>
                      </div>
                      <div className="flex items-center gap-1">
                        {item.versions.map((ver) => (
                          <span
                            key={ver}
                            className={`px-2 py-0.5 rounded font-code-badge text-code-badge font-bold ${
                              ver === 'v2.5'
                                ? 'bg-primary-fixed text-primary'
                                : 'bg-surface-container text-on-surface-variant'
                            }`}
                          >
                            {ver}
                          </span>
                        ))}
                      </div>
                    </div>

                    <p className="font-label-sm text-label-sm text-secondary font-medium mt-0.5">
                      {item.institution}
                    </p>

                    <p className="font-body-sm text-body-sm text-text-muted mt-2 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Meta Specs Row */}
                    <div className="mt-4 pt-3 border-t border-border-subtle flex flex-col gap-2">
                      <div className="flex items-center justify-between text-label-sm text-text-muted">
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px] text-secondary">
                            {item.primaryFile.icon}
                          </span>
                          Primary Package:
                        </span>
                        <span className="font-code-badge text-code-badge text-primary font-bold">
                          {item.primaryFile.format} ({item.primaryFile.size})
                        </span>
                      </div>
                      {item.secondaryFile && (
                        <div className="flex items-center justify-between text-label-sm text-text-muted">
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px]">
                              {item.secondaryFile.icon}
                            </span>
                            Secondary/Archive:
                          </span>
                          <span className="font-code-badge text-code-badge text-text-muted">
                            {item.secondaryFile.format} ({item.secondaryFile.size})
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons Footer */}
                  <div className="pt-space-md mt-space-md border-t border-border-subtle flex items-center justify-between gap-2">
                    <button
                      onClick={() =>
                        handleDownload(item.primaryFile.filename, `${item.language} ${item.primaryFile.label}`)
                      }
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-primary font-label-md text-label-md font-semibold transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">{item.primaryFile.icon}</span>
                      <span>{item.primaryFile.label}</span>
                    </button>

                    {item.secondaryFile && (
                      <button
                        onClick={() =>
                          handleDownload(item.secondaryFile!.filename, `${item.language} ${item.secondaryFile!.label}`)
                        }
                        className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-primary font-label-md text-label-md transition-colors cursor-pointer"
                        title={item.secondaryFile.label}
                      >
                        <span className="material-symbols-outlined text-[16px]">{item.secondaryFile.icon}</span>
                      </button>
                    )}

                    {item.altAction && (
                      <button
                        onClick={() =>
                          handleDownload(item.altAction!.filename, `${item.language} ${item.altAction!.label}`)
                        }
                        className="inline-flex items-center justify-center p-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface-variant transition-colors cursor-pointer"
                        title={item.altAction.tooltip}
                      >
                        <span className="material-symbols-outlined text-[18px]">{item.altAction.icon}</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center p-space-xl bg-surface-card rounded-xl text-center border border-border-subtle">
              <span className="material-symbols-outlined text-outline text-[48px] mb-2">find_in_page</span>
              <h4 className="font-headline-md text-headline-md text-primary font-bold">No Matching Translations Found</h4>
              <p className="font-body-md text-body-md text-text-muted mt-1 max-w-md">
                We couldn’t find translations matching your current search parameters. You may clear your filters or submit a new linguistic proposal.
              </p>
              <button
                onClick={resetFilters}
                className="mt-space-md px-4 py-2 rounded-lg bg-secondary text-on-secondary font-label-md text-label-md hover:bg-secondary/90 transition-colors shadow-sm cursor-pointer"
              >
                Reset Filter Criteria
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Translation Methodology & IAB Scientific Workflow */}
      <section className="w-full bg-surface px-gutter-lg py-space-xl">
        <div className="max-w-[1280px] mx-auto flex flex-col gap-space-lg">
          <div className="max-w-3xl flex flex-col gap-space-xs">
            <span className="font-code-badge text-code-badge uppercase text-secondary font-bold">
              Rigorous Academic Governance
            </span>
            <h2 className="font-headline-xl text-headline-xl text-primary tracking-tight font-bold">
              IAB Translation &amp; Validation Protocol
            </h2>
            <p className="font-body-md text-body-md text-text-muted leading-relaxed">
              To preserve semantic precision and ontological validity across electronic health records, international CCC System translations must fulfill the 4-stage validation guidelines established by Dr. Virginia K. Saba and the International Advisory Board (IAB).
            </p>
          </div>

          {/* 4-Step Process Bento */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
            {/* Step 1 */}
            <div className="p-space-lg rounded-xl bg-surface-card shadow-sm border border-border-subtle flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-primary text-on-primary flex items-center justify-center font-bold text-headline-sm mb-space-sm shadow-sm">
                  01
                </div>
                <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
                  Forward Translation &amp; Equivalence
                </h3>
                <p className="font-body-sm text-body-sm text-text-muted mt-2 leading-relaxed">
                  Dual independent translation conducted by bilingual nursing informatics scholars to capture conceptual equivalence over literal word-for-word substitution.
                </p>
              </div>
              <div className="pt-space-md mt-space-md border-t border-border-subtle text-label-sm text-secondary font-semibold">
                Standard: ISO/TR 12300 §4.2
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-space-lg rounded-xl bg-surface-card shadow-sm border border-border-subtle flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-surface-container-high text-primary flex items-center justify-center font-bold text-headline-sm mb-space-sm shadow-sm">
                  02
                </div>
                <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
                  Back-Translation &amp; Harmonization
                </h3>
                <p className="font-body-sm text-body-sm text-text-muted mt-2 leading-relaxed">
                  A blind back-translation into canonical English by an independent third party, reconciled against CCC v2.5 definitions to resolve discrepancies.
                </p>
              </div>
              <div className="pt-space-md mt-space-md border-t border-border-subtle text-label-sm text-secondary font-semibold">
                Semantic Fidelity Check
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-space-lg rounded-xl bg-surface-card shadow-sm border border-border-subtle flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-surface-container text-columbia-crown-blue flex items-center justify-center font-bold text-headline-sm mb-space-sm shadow-sm">
                  03
                </div>
                <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
                  Clinical Delphi Expert Review
                </h3>
                <p className="font-body-sm text-body-sm text-text-muted mt-2 leading-relaxed">
                  Target country validation with practicing clinical nurses, EHR system analysts, and academic researchers to confirm contextual readability.
                </p>
              </div>
              <div className="pt-space-md mt-space-md border-t border-border-subtle text-label-sm text-secondary font-semibold">
                Delphi Consensus &gt; 85%
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-space-lg rounded-xl bg-surface-card shadow-sm border border-border-subtle flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-secondary text-on-secondary flex items-center justify-center font-bold text-headline-sm mb-space-sm shadow-sm">
                  04
                </div>
                <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
                  IAB Ratification &amp; Archival
                </h3>
                <p className="font-body-sm text-body-sm text-text-muted mt-2 leading-relaxed">
                  Submission to the International Advisory Board at Columbia University School of Nursing for final verification, DOI tagging, and publication.
                </p>
              </div>
              <div className="pt-space-md mt-space-md border-t border-border-subtle text-label-sm text-secondary font-semibold">
                Official Global Release
              </div>
            </div>
          </div>

          {/* Action Card: Propose a Translation */}
          <div className="rounded-xl bg-primary text-on-primary p-space-lg shadow-md flex flex-col lg:flex-row items-center justify-between gap-space-lg">
            <div className="flex flex-col gap-1 max-w-2xl">
              <div className="flex items-center gap-2 text-secondary-fixed">
                <span className="material-symbols-outlined text-[20px]">add_circle</span>
                <span className="font-code-badge text-code-badge uppercase font-bold">
                  Call for International Investigators
                </span>
              </div>
              <h3 className="font-headline-lg text-headline-lg text-on-primary font-bold">
                Propose a New Translation or Revision
              </h3>
              <p className="font-body-md text-body-md text-surface-container-high/80 mt-1 leading-relaxed">
                Is your national informatics society or academic institution interested in translating CCC System v2.5 into German, French, Arabic, or Japanese? Contact the Columbia School of Nursing stewardship committee for authorization packets and terminology crosswalk toolkits.
              </p>
            </div>
            <div className="shrink-0 flex flex-wrap items-center gap-space-sm">
              <button
                onClick={() => setIsProposalModalOpen(true)}
                className="px-space-md py-space-sm rounded-lg bg-secondary text-on-secondary font-label-md text-label-md font-semibold hover:bg-secondary/90 transition-colors shadow-sm whitespace-nowrap cursor-pointer"
              >
                Submit Translation Proposal
              </button>
              <button
                onClick={() =>
                  handleDownload(
                    'CCC_v2.5_Translation_Protocol_Packet.zip',
                    'Translation Protocol Packet'
                  )
                }
                className="px-space-md py-space-sm rounded-lg bg-surface-container-high/20 text-on-primary font-label-md text-label-md hover:bg-surface-container-high/30 transition-colors whitespace-nowrap cursor-pointer border border-white/20"
              >
                Download Translation Packet
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Citations & Licensing Notice with Cross-Framework Sidebar */}
      <section className="w-full bg-surface-canvas px-gutter-lg py-space-xl">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
          {/* Main Content: Citation & Licensing */}
          <div className="lg:col-span-8 flex flex-col gap-space-lg">
            {/* Citation Guidance Card */}
            <div className="rounded-xl bg-surface-card p-space-lg shadow-sm border border-border-subtle flex flex-col gap-space-sm">
              <div className="flex items-center gap-2 text-primary font-headline-sm text-headline-sm font-bold">
                <span className="material-symbols-outlined text-secondary">format_quote</span>
                <span>Academic Citation Guidelines</span>
              </div>
              <p className="font-body-sm text-body-sm text-text-muted leading-relaxed">
                When publishing clinical research, EHR trial results, or comparative terminology mappings utilizing any CCC translation, please attribute both the primary canonical English reference and the specific national translator in your bibliography.
              </p>

              {/* Citation Block 1 */}
              <div className="p-space-md rounded-lg bg-surface-container-low font-code-badge text-code-badge text-on-surface-variant flex flex-col gap-1 border border-border-subtle relative group">
                <div className="flex items-center justify-between">
                  <span className="text-primary font-bold">Canonical CCC Reference:</span>
                  <button
                    onClick={() =>
                      handleCopyCitation(
                        'Saba, V. K. (2012). Clinical Care Classification (CCC) System Manual: A Guide to Nursing Documentation. Springer Publishing Company.',
                        'Canonical CCC'
                      )
                    }
                    className="text-primary hover:text-secondary flex items-center gap-1 text-[11px] font-sans font-semibold cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[14px]">content_copy</span>
                    <span>Copy</span>
                  </button>
                </div>
                <span className="leading-relaxed font-mono text-[11px]">
                  Saba, V. K. (2012). Clinical Care Classification (CCC) System Manual: A Guide to Nursing Documentation. Springer Publishing Company.
                </span>
              </div>

              {/* Citation Block 2 */}
              <div className="p-space-md rounded-lg bg-surface-container-low font-code-badge text-code-badge text-on-surface-variant flex flex-col gap-1 border border-border-subtle relative group">
                <div className="flex items-center justify-between">
                  <span className="text-primary font-bold">Chinese Translation Citation Example:</span>
                  <button
                    onClick={() =>
                      handleCopyCitation(
                        'Yang, L., & Yan, J. W. (2025). Clinical Care Classification System v2.5: Official Chinese Translation and Concordance (Version 202510). Zhongwei Institute of Nursing Information & Clinical Care Classification International Advisory Board.',
                        'Chinese Translation'
                      )
                    }
                    className="text-primary hover:text-secondary flex items-center gap-1 text-[11px] font-sans font-semibold cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[14px]">content_copy</span>
                    <span>Copy</span>
                  </button>
                </div>
                <span className="leading-relaxed font-mono text-[11px]">
                  Yang, L., &amp; Yan, J. W. (2025). Clinical Care Classification System v2.5: Official Chinese Translation and Concordance (Version 202510). Zhongwei Institute of Nursing Information &amp; Clinical Care Classification International Advisory Board.
                </span>
              </div>

              {/* Citation Block 3 */}
              <div className="p-space-md rounded-lg bg-surface-container-low font-code-badge text-code-badge text-on-surface-variant flex flex-col gap-1 border border-border-subtle relative group">
                <div className="flex items-center justify-between">
                  <span className="text-primary font-bold">Italian Translation Citation Example:</span>
                  <button
                    onClick={() =>
                      handleCopyCitation(
                        'D’Agostino, F. (2019). Clinical Care Classification (CCC) System: Traduzione Italiana v2.5. Saint Camillus International University of Health and Medical Sciences, Rome, Italy.',
                        'Italian Translation'
                      )
                    }
                    className="text-primary hover:text-secondary flex items-center gap-1 text-[11px] font-sans font-semibold cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[14px]">content_copy</span>
                    <span>Copy</span>
                  </button>
                </div>
                <span className="leading-relaxed font-mono text-[11px]">
                  D’Agostino, F. (2019). Clinical Care Classification (CCC) System: Traduzione Italiana v2.5. Saint Camillus International University of Health and Medical Sciences, Rome, Italy.
                </span>
              </div>
            </div>

            {/* Open Access & CC License Card */}
            <div className="rounded-xl bg-surface-card p-space-lg shadow-sm border border-border-subtle flex flex-col gap-space-sm">
              <div className="flex items-center gap-2 text-primary font-headline-sm text-headline-sm font-bold">
                <span className="material-symbols-outlined text-secondary">license</span>
                <span>Intellectual Property &amp; Open Access License</span>
              </div>
              <p className="font-body-sm text-body-sm text-text-muted leading-relaxed">
                The CCC System and its official translations are released under the <strong className="text-primary font-semibold">Creative Commons Attribution-NonCommercial 4.0 International License (CC BY-NC 4.0)</strong>.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm mt-2">
                <div className="flex items-start gap-2 p-space-sm rounded-lg bg-surface border border-border-subtle">
                  <span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">
                    check_circle
                  </span>
                  <div className="text-label-sm text-text-muted leading-snug">
                    <span className="font-bold text-primary">Academic &amp; Clinical EHR Use:</span> Free to adapt, translate, embed in electronic medical records, and deploy for hospital patient care and research.
                  </div>
                </div>
                <div className="flex items-start gap-2 p-space-sm rounded-lg bg-surface border border-border-subtle">
                  <span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">
                    info
                  </span>
                  <div className="text-label-sm text-text-muted leading-snug">
                    <span className="font-bold text-primary">Commercial Vendors:</span> Commercial software vendors repackaging CCC dictionaries for proprietary licensing should contact Columbia University Licensing.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Framework Sub-navigation Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-space-md">
            <div className="rounded-xl bg-surface-card p-space-lg shadow-sm border border-border-subtle flex flex-col gap-space-sm">
              <div className="flex items-center justify-between pb-space-xs border-b border-border-subtle">
                <span className="font-code-badge text-code-badge uppercase text-secondary font-bold">
                  Framework Hub
                </span>
                <span className="font-label-sm text-label-sm text-text-muted">9 Core Modules</span>
              </div>
              <p className="font-body-sm text-body-sm text-text-muted leading-snug">
                The translation corpus directly mirrors all architectural tiers of the clinical model:
              </p>

              <nav className="flex flex-col gap-1 mt-2">
                <button
                  onClick={() => onNavigate('framework')}
                  className="flex items-center justify-between p-2.5 rounded-lg text-on-surface hover:bg-surface-container-low transition-colors font-label-md text-label-md text-left cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[18px]">account_tree</span>
                    <span>Information Model &amp; Architecture</span>
                  </span>
                  <span className="material-symbols-outlined text-outline text-[16px]">chevron_right</span>
                </button>

                <button
                  onClick={() => onNavigate('framework')}
                  className="flex items-center justify-between p-2.5 rounded-lg text-on-surface hover:bg-surface-container-low transition-colors font-label-md text-label-md text-left cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[18px]">table_chart</span>
                    <span>Classification Tables Index</span>
                  </span>
                  <span className="material-symbols-outlined text-outline text-[16px]">chevron_right</span>
                </button>

                <button
                  onClick={() => onNavigate('framework')}
                  className="flex items-center justify-between p-2.5 rounded-lg text-on-surface hover:bg-surface-container-low transition-colors font-label-md text-label-md text-left cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[18px]">category</span>
                    <span>21 Care Components</span>
                  </span>
                  <span className="font-code-badge text-code-badge px-2 py-0.5 rounded bg-surface-container text-primary font-bold">
                    21
                  </span>
                </button>

                <button
                  onClick={() => onNavigate('framework')}
                  className="flex items-center justify-between p-2.5 rounded-lg text-on-surface hover:bg-surface-container-low transition-colors font-label-md text-label-md text-left cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[18px]">stethoscope</span>
                    <span>Nursing Diagnoses (CCCD)</span>
                  </span>
                  <span className="font-code-badge text-code-badge px-2 py-0.5 rounded bg-surface-container text-primary font-bold">
                    176
                  </span>
                </button>

                <button
                  onClick={() => onNavigate('framework')}
                  className="flex items-center justify-between p-2.5 rounded-lg text-on-surface hover:bg-surface-container-low transition-colors font-label-md text-label-md text-left cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[18px]">medication</span>
                    <span>Nursing Interventions (CCCI)</span>
                  </span>
                  <span className="font-code-badge text-code-badge px-2 py-0.5 rounded bg-surface-container text-primary font-bold">
                    804
                  </span>
                </button>

                <button
                  onClick={() => onNavigate('framework')}
                  className="flex items-center justify-between p-2.5 rounded-lg text-on-surface hover:bg-surface-container-low transition-colors font-label-md text-label-md text-left cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[18px]">tune</span>
                    <span>Action Types (4 Qualifiers)</span>
                  </span>
                  <span className="material-symbols-outlined text-outline text-[16px]">chevron_right</span>
                </button>

                <button
                  onClick={() => onNavigate('framework')}
                  className="flex items-center justify-between p-2.5 rounded-lg text-on-surface hover:bg-surface-container-low transition-colors font-label-md text-label-md text-left cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[18px]">assessment</span>
                    <span>Nursing Outcomes Evaluation</span>
                  </span>
                  <span className="material-symbols-outlined text-outline text-[16px]">chevron_right</span>
                </button>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold">
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">g_translate</span>
                    <span>Multilingual Translations</span>
                  </span>
                  <span className="w-2 h-2 rounded-full bg-secondary"></span>
                </div>
              </nav>
            </div>

            {/* Technical Assistance Card */}
            <div className="rounded-xl bg-surface-container-low p-space-md shadow-sm border border-border-subtle flex flex-col gap-2">
              <div className="flex items-center gap-2 text-primary font-label-md text-label-md font-bold">
                <span className="material-symbols-outlined text-secondary">support</span>
                <span>Informatics Implementation Support</span>
              </div>
              <p className="font-body-sm text-body-sm text-text-muted leading-relaxed">
                Need guidance mapping CCC translations into Cerner, Epic, MEDITECH, or local hospital information system database schemas?
              </p>
              <button
                onClick={() => setIsSupportModalOpen(true)}
                className="mt-1 font-label-sm text-label-sm text-secondary hover:underline inline-flex items-center gap-1 font-semibold text-left cursor-pointer"
              >
                <span>Contact CCC Integration Analysts</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Translation Proposal Modal */}
      {isProposalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-surface-card rounded-2xl max-w-lg w-full p-space-lg shadow-2xl border border-border-subtle flex flex-col gap-space-md">
            <div className="flex items-center justify-between border-b border-border-subtle pb-space-sm">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[24px]">translate</span>
                <h3 className="font-headline-md text-headline-md text-primary font-bold">
                  Propose Linguistic Translation
                </h3>
              </div>
              <button
                onClick={() => setIsProposalModalOpen(false)}
                className="text-outline hover:text-primary p-1 rounded-lg cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {proposalSubmitted ? (
              <div className="py-8 flex flex-col items-center text-center gap-2">
                <span className="material-symbols-outlined text-emerald-600 text-5xl">task_alt</span>
                <h4 className="font-headline-sm text-headline-sm text-primary font-bold">Proposal Received!</h4>
                <p className="font-body-sm text-text-muted max-w-sm">
                  Thank you for contributing to international nursing informatics. The Columbia School of Nursing committee will review your proposal.
                </p>
              </div>
            ) : (
              <form onSubmit={handleProposalSubmit} className="flex flex-col gap-3">
                <div>
                  <label className="block font-label-sm text-label-sm font-semibold text-primary mb-1">
                    Target Language *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. German, French, Arabic, Japanese..."
                    value={proposalLang}
                    onChange={(e) => setProposalLang(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-border-subtle font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/40"
                  />
                </div>

                <div>
                  <label className="block font-label-sm text-label-sm font-semibold text-primary mb-1">
                    Lead Investigator / Translator(s) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Jane Smith, PhD, RN"
                    value={proposalInvestigator}
                    onChange={(e) => setProposalInvestigator(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-border-subtle font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/40"
                  />
                </div>

                <div>
                  <label className="block font-label-sm text-label-sm font-semibold text-primary mb-1">
                    Academic Institution or Clinical Society *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. University School of Nursing, National Hospital..."
                    value={proposalInstitution}
                    onChange={(e) => setProposalInstitution(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-border-subtle font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/40"
                  />
                </div>

                <div>
                  <label className="block font-label-sm text-label-sm font-semibold text-primary mb-1">
                    Country &amp; Jurisdiction
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Germany, Switzerland, Canada..."
                    value={proposalCountry}
                    onChange={(e) => setProposalCountry(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-border-subtle font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/40"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2 border-t border-border-subtle mt-2">
                  <button
                    type="button"
                    onClick={() => setIsProposalModalOpen(false)}
                    className="px-4 py-2 rounded-lg text-text-muted hover:bg-surface-container font-label-md text-label-md cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-secondary text-on-secondary font-label-md text-label-md font-semibold hover:bg-secondary/90 transition-colors shadow-sm cursor-pointer"
                  >
                    Submit Proposal
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Integration Analysts Support Modal */}
      {isSupportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-surface-card rounded-2xl max-w-md w-full p-space-lg shadow-2xl border border-border-subtle flex flex-col gap-space-md">
            <div className="flex items-center justify-between border-b border-border-subtle pb-space-sm">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[24px]">support_agent</span>
                <h3 className="font-headline-md text-headline-md text-primary font-bold">
                  Informatics Integration Support
                </h3>
              </div>
              <button
                onClick={() => setIsSupportModalOpen(false)}
                className="text-outline hover:text-primary p-1 rounded-lg cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-3 font-body-sm text-text-muted">
              <p>
                Our clinical informatics analysts at Columbia School of Nursing provide schema mappings and HL7 / FHIR R4 crosswalk advice for:
              </p>
              <ul className="list-disc list-inside space-y-1 font-medium text-primary">
                <li>Epic Systems (SmartPhrases &amp; Flowsheet Rows)</li>
                <li>Oracle Cerner (Millennium CareAware)</li>
                <li>MEDITECH Expanse Nursing Workstation</li>
                <li>Regional &amp; National Ministry of Health Repositories</li>
              </ul>
              <div className="p-3 bg-surface-container-low rounded-lg border border-border-subtle">
                <span className="font-semibold text-primary block">Stewardship Office:</span>
                <span>informatics-liaison@nursing.columbia.edu</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => {
                  setIsSupportModalOpen(false);
                  showToast('Support inquiry noted. Our informatics team will follow up.');
                }}
                className="px-4 py-2 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-semibold hover:bg-columbia-crown-blue cursor-pointer"
              >
                Close &amp; Acknowledge
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
