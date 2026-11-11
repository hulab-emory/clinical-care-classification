import React from 'react';

interface OverviewScreenProps {
  onNavigate: (screen: 'overview' | 'framework' | 'translations' | 'code-builder' | 'terminology' | 'news' | 'about' | 'contact') => void;
  onOpenTerminology: () => void;
}

export const OverviewScreen: React.FC<OverviewScreenProps> = ({ onNavigate, onOpenTerminology }) => {
  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = 'Clinical Care Classification (CCC) System v2.5';
    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'email') {
      window.location.href = `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(url)}`;
    } else if (platform === 'whatsapp') {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* HERO SECTION */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-surface-container-low via-surface to-surface-canvas py-space-xl lg:py-24">
        <div className="max-w-7xl mx-auto px-gutter-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-center">
            {/* Left Column: Typography & CTAs */}
            <div className="lg:col-span-7 flex flex-col items-start gap-space-lg">
              {/* Eyebrow Badge */}
              <div className="inline-flex items-center gap-space-xs px-3.5 py-1.5 rounded-full bg-secondary-fixed/50 border-none text-secondary">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                <span className="font-label-sm text-label-sm font-semibold tracking-wide uppercase">
                  Standardized Terminology for Electronic Health Records • Freely Accessible Worldwide
                </span>
              </div>

              {/* Main Headline */}
              <div className="space-y-space-xs">
                <h1 className="font-display-lg text-display-lg text-primary tracking-tight font-bold">
                  Coding for nursing
                </h1>
                <p className="font-body-lg text-body-lg text-text-muted max-w-2xl leading-relaxed">
                  The CCC System facilitates the electronic documentation of nursing plans of care (POCs) in a whole new way.
                  And it's available for free to all.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-space-md pt-space-xs w-full sm:w-auto">
                <button
                  onClick={() => onNavigate('code-builder')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-space-lg py-3 rounded-lg bg-primary hover:bg-columbia-crown-blue text-on-primary font-label-md text-label-md transition-all shadow-md hover:shadow-lg group cursor-pointer"
                >
                  <span>Start building nursing codes</span>
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </button>

                <button
                  onClick={() => onNavigate('framework')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-space-lg py-3 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-label-md transition-colors shadow-sm cursor-pointer"
                >
                  <span>Learn more</span>
                  <span className="material-symbols-outlined text-[18px]">menu_book</span>
                </button>
              </div>

              {/* Trust Markers */}
              <div className="pt-space-md flex flex-wrap items-center gap-y-3 gap-x-6 text-text-muted">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[20px]">
                    verified
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                    Recognized by ANA &amp; ONC
                  </span>
                </div>
                <div className="w-1 h-1 rounded-full bg-outline-variant hidden sm:block"></div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[20px]">
                    local_hospital
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                    Integrated into VA Health Care
                  </span>
                </div>
                <div className="w-1 h-1 rounded-full bg-outline-variant hidden sm:block"></div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[20px]">
                    account_tree
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                    Four-Level Hierarchical Model
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Showcase */}
            <div className="lg:col-span-5 relative">
              {/* Backdrop Soft Glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-secondary-container/40 via-surface-container-highest/60 to-primary-fixed/40 rounded-3xl blur-2xl -z-10"></div>

              {/* Image Wrapper with Card Framing */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-surface-container-lowest">
                <img
                  alt="Clinical informatics workstation interface displaying care plan flowcharts, clinical classification ontology networks, and healthcare analytics dashboards"
                  className="w-full h-[440px] object-cover object-center"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDKRi9DLWxOyLn4WfkRwVbyYY6qycEdLWnF7NJ82sJFSsDOjalxavFN9rYgt-sbr1NIaxKSgkj5s5Ap4rb4gq4Cs9lSJA_YdhFhmndDbPxRodnfKIB4YXP6PinWe-PfJ5RuKFbxks6MI3YXhcdegUyWNFQ_yyDgJPqLQzWjhAeqZdmkNXGiOy_BqmNG1ywSfHXLyW3ynZVA4Wni8wKMEvexwWVn5PLWTcbD6fKljuimRjhz2GvJB7n-A"
                  referrerPolicy="no-referrer"
                />

                {/* Gradient Overlay Scrim for legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent"></div>

                {/* In-image Clinical Badges */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-on-primary">
                  <div>
                    <p className="font-label-sm text-[11px] uppercase tracking-wider text-secondary-fixed opacity-95">
                      Clinical Decision Support
                    </p>
                    <p className="font-headline-sm text-headline-sm font-semibold text-on-primary">
                      Bedside EHR Workflow Interoperability
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-secondary-fixed text-2xl">
                    verified_user
                  </span>
                </div>
              </div>

              {/* Floating Metric Card 1: Diagnoses */}
              <div className="absolute -top-4 -left-6 bg-surface-container-lowest text-on-surface rounded-xl p-space-md shadow-xl hidden sm:flex items-center gap-space-sm transition-transform hover:-translate-y-1">
                <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[22px]">diagnosis</span>
                </div>
                <div>
                  <div className="font-headline-md text-headline-md font-bold text-primary">176+</div>
                  <div className="font-label-sm text-label-sm text-text-muted">Nursing Diagnoses</div>
                </div>
              </div>

              {/* Floating Metric Card 2: Interventions */}
              <div className="absolute -bottom-6 -right-4 bg-surface-container-lowest text-on-surface rounded-xl p-space-md shadow-xl hidden sm:flex items-center gap-space-sm transition-transform hover:-translate-y-1">
                <div className="w-10 h-10 rounded-lg bg-secondary-container flex items-center justify-center text-on-secondary-container">
                  <span className="material-symbols-outlined text-[22px]">clinical_notes</span>
                </div>
                <div>
                  <div className="font-headline-md text-headline-md font-bold text-secondary">546+</div>
                  <div className="font-label-sm text-label-sm text-text-muted">Coded Interventions</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION: Four Core Pillars */}
      <section className="w-full py-space-xl bg-surface-canvas">
        <div className="max-w-7xl mx-auto px-gutter-lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-space-md">
            <div>
              <div className="flex items-center gap-space-xs text-secondary font-label-sm text-label-sm uppercase tracking-wider font-semibold mb-space-xs">
                <span className="material-symbols-outlined text-[16px]">apps</span>
                <span>Features of the CCC System</span>
              </div>
              <h2 className="font-headline-xl text-headline-xl text-primary font-bold">
                Features
              </h2>
            </div>
            <p className="font-body-md text-body-md text-text-muted max-w-md">
              Engineered for clinical utility, standardized communication, and bidirectional big data aggregation across diverse electronic health ecosystems.
            </p>
          </div>

          {/* 4-Card Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {/* Card 1: A New Approach */}
            <div
              onClick={() => onNavigate('framework')}
              className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-primary mb-space-md group-hover:bg-primary group-hover:text-on-primary transition-colors">
                  <span className="material-symbols-outlined text-[26px]">lightbulb</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-primary font-semibold mb-space-sm">
                  A New Approach
                </h3>
                <p className="font-body-sm text-body-sm text-text-muted leading-relaxed">
                  The CCC System facilitates the electronic documentation of nursing plans of care (POCs) in a whole new way. And it's available for free to all.
                </p>
              </div>
              <div className="mt-space-lg pt-space-md flex items-center gap-1 text-primary font-label-sm text-label-sm">
                <span>Explore concepts</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                  chevron_right
                </span>
              </div>
            </div>

            {/* Card 2: Framework */}
            <div
              onClick={() => onNavigate('framework')}
              className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="w-12 h-12 rounded-lg bg-secondary-container flex items-center justify-center text-secondary mb-space-md group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
                  <span className="material-symbols-outlined text-[26px]">schema</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-primary font-semibold mb-space-sm">
                  Framework
                </h3>
                <p className="font-body-sm text-body-sm text-text-muted leading-relaxed">
                  The framework makes it possible to code data represented in four levels. It allows the coded data to be aggregated upward for big data or to dissect the coded data downward to obtain atomic level data elements.
                </p>
              </div>
              <div className="mt-space-lg pt-space-md flex items-center gap-1 text-secondary font-label-sm text-label-sm">
                <span>Four-tier structure</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                  chevron_right
                </span>
              </div>
            </div>

            {/* Card 3: Accredited */}
            <div
              onClick={() => onNavigate('about')}
              className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="w-12 h-12 rounded-lg bg-primary-fixed flex items-center justify-center text-primary mb-space-md group-hover:bg-primary group-hover:text-on-primary transition-colors">
                  <span className="material-symbols-outlined text-[26px]">workspace_premium</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-primary font-semibold mb-space-sm">
                  Accredited
                </h3>
                <p className="font-body-sm text-body-sm text-text-muted leading-relaxed">
                  The CCC System is recognized as the terminology of choice for documenting the essence of patient care in the electronic health record (EHR) systems.
                </p>
              </div>
              <div className="mt-space-lg pt-space-md flex items-center gap-1 text-primary font-label-sm text-label-sm">
                <span>Standards &amp; mappings</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                  chevron_right
                </span>
              </div>
            </div>

            {/* Card 4: Free Online Tools */}
            <div className="bg-surface-container-high p-space-lg rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center text-on-primary mb-space-md">
                  <span className="material-symbols-outlined text-[26px]">construction</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-primary font-semibold mb-space-sm">
                  Free Online Tools
                </h3>
                <p className="font-body-sm text-body-sm text-text-muted leading-relaxed mb-space-sm">
                  Check out our fast{' '}
                  <button
                    onClick={() => onNavigate('code-builder')}
                    className="text-secondary font-semibold hover:underline cursor-pointer"
                  >
                    code builder &amp; EHR export tool
                  </button>{' '}
                  with complete plans of care validation.
                </p>
              </div>
              <div className="mt-space-md flex items-center gap-2">
                <button
                  onClick={() => onNavigate('code-builder')}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-primary text-on-primary font-label-sm text-label-sm hover:bg-columbia-crown-blue transition-colors cursor-pointer shadow-sm"
                >
                  <span>Launch Builder</span>
                  <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE SECTION: 4-Level Framework & Online Tools Showcase */}
      <section className="w-full py-space-xl bg-surface">
        <div className="max-w-7xl mx-auto px-gutter-lg">
          <div className="text-center max-w-3xl mx-auto mb-space-xl">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
              Information Architecture
            </span>
            <h2 className="font-headline-xl text-headline-xl text-primary font-bold mt-space-xs">
              Explore the 4-Level Framework &amp; Online Tools
            </h2>
            <p className="font-body-md text-body-md text-text-muted mt-space-xs">
              An organized two-interrelated architecture: The Nursing Diagnosis Terminology and Nursing Intervention Terminology mapped seamlessly to outcomes.
            </p>
          </div>

          {/* Framework Stepper Visual */}
          <div className="bg-surface-container-lowest rounded-2xl p-space-lg lg:p-space-xl shadow-sm mb-space-xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter relative">
              {/* Step 1 */}
              <div
                onClick={() => onNavigate('framework')}
                className="flex flex-col p-space-md bg-surface-container-low rounded-xl cursor-pointer hover:bg-surface-container transition-colors"
              >
                <div className="flex items-center justify-between mb-space-sm">
                  <span className="px-2.5 py-1 rounded bg-primary text-on-primary font-code-badge text-code-badge">
                    LEVEL 1
                  </span>
                  <span className="material-symbols-outlined text-primary">category</span>
                </div>
                <h4 className="font-headline-sm text-headline-sm text-primary font-bold mb-1">
                  21 Care Components
                </h4>
                <p className="font-body-sm text-body-sm text-text-muted mb-space-md">
                  Universal health patterns organizing physical, behavioral, and functional clusters.
                </p>
                <div className="mt-auto">
                  <span className="inline-block px-2 py-0.5 rounded bg-surface-container-highest text-primary font-code-badge text-[11px]">
                    e.g. Activity (A)
                  </span>
                </div>
              </div>

              {/* Step 2 */}
              <div
                onClick={() => onNavigate('framework')}
                className="flex flex-col p-space-md bg-surface-container-low rounded-xl cursor-pointer hover:bg-surface-container transition-colors"
              >
                <div className="flex items-center justify-between mb-space-sm">
                  <span className="px-2.5 py-1 rounded bg-columbia-crown-blue text-on-primary font-code-badge text-code-badge">
                    LEVEL 2
                  </span>
                  <span className="material-symbols-outlined text-columbia-crown-blue">medical_information</span>
                </div>
                <h4 className="font-headline-sm text-headline-sm text-primary font-bold mb-1">
                  Nursing Diagnoses
                </h4>
                <p className="font-body-sm text-body-sm text-text-muted mb-space-md">
                  176 clinical judgments regarding individual, family, or community responses.
                </p>
                <div className="mt-auto">
                  <span className="inline-block px-2 py-0.5 rounded bg-surface-container-highest text-primary font-code-badge text-[11px]">
                    176 Concepts
                  </span>
                </div>
              </div>

              {/* Step 3 */}
              <div
                onClick={() => onNavigate('framework')}
                className="flex flex-col p-space-md bg-surface-container-low rounded-xl cursor-pointer hover:bg-surface-container transition-colors"
              >
                <div className="flex items-center justify-between mb-space-sm">
                  <span className="px-2.5 py-1 rounded bg-secondary text-on-secondary font-code-badge text-code-badge">
                    LEVEL 3
                  </span>
                  <span className="material-symbols-outlined text-secondary">vaccines</span>
                </div>
                <h4 className="font-headline-sm text-headline-sm text-primary font-bold mb-1">
                  Nursing Interventions
                </h4>
                <p className="font-body-sm text-body-sm text-text-muted mb-space-md">
                  546 discrete clinical treatments, preventative steps, and assessment protocols.
                </p>
                <div className="mt-auto">
                  <span className="inline-block px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-code-badge text-[11px]">
                    546 Actions
                  </span>
                </div>
              </div>

              {/* Step 4 */}
              <div
                onClick={() => onNavigate('framework')}
                className="flex flex-col p-space-md bg-surface-container-low rounded-xl cursor-pointer hover:bg-surface-container transition-colors"
              >
                <div className="flex items-center justify-between mb-space-sm">
                  <span className="px-2.5 py-1 rounded bg-tertiary-container text-on-tertiary-container font-code-badge text-code-badge">
                    LEVEL 4
                  </span>
                  <span className="material-symbols-outlined text-tertiary-container">assessment</span>
                </div>
                <h4 className="font-headline-sm text-headline-sm text-primary font-bold mb-1">
                  Action Types &amp; Outcomes
                </h4>
                <p className="font-body-sm text-body-sm text-text-muted mb-space-md">
                  Assess, Care, Teach, Manage action types paired with 3-tier outcome states.
                </p>
                <div className="mt-auto">
                  <span className="inline-block px-2 py-0.5 rounded bg-surface-container-highest text-primary font-code-badge text-[11px]">
                    Improved / Stabilized
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Launch Tool Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {/* Online Code Builder */}
            <button
              onClick={() => onNavigate('code-builder')}
              className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm hover:shadow-md transition-all group flex flex-col justify-between text-left cursor-pointer"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary mb-space-sm group-hover:bg-primary group-hover:text-on-primary transition-colors">
                  <span className="material-symbols-outlined">terminal</span>
                </div>
                <h4 className="font-headline-sm text-headline-sm text-primary font-semibold mb-1">
                  Online Code Builder
                </h4>
                <p className="font-body-sm text-body-sm text-text-muted">
                  Interactive web builder to assemble plans of care, code modifiers, and syntax.
                </p>
              </div>
              <div className="mt-space-md flex items-center gap-1 text-primary font-label-sm text-label-sm font-semibold">
                <span>Open Tool</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            </button>

            {/* Code Builder & EHR Summary */}
            <button
              onClick={() => onNavigate('code-builder')}
              className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm hover:shadow-md transition-all group flex flex-col justify-between text-left cursor-pointer"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-secondary-container flex items-center justify-center text-secondary mb-space-sm group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
                  <span className="material-symbols-outlined">smartphone</span>
                </div>
                <h4 className="font-headline-sm text-headline-sm text-primary font-semibold mb-1">
                  Online Code Builder &amp; Final Export
                </h4>
                <p className="font-body-sm text-body-sm text-text-muted">
                  Interactive step-by-step care plan pair synthesizer, full clinical audit table, and FHIR R4 / Epic SmartPhrase exports.
                </p>
              </div>
              <div className="mt-space-md flex items-center gap-1 text-secondary font-label-sm text-label-sm font-semibold">
                <span>Launch Builder</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            </button>

            {/* Teaching Toolkit */}
            <button
              onClick={() => onNavigate('news')}
              className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm hover:shadow-md transition-all group flex flex-col justify-between text-left cursor-pointer"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-columbia-crown-blue mb-space-sm group-hover:bg-columbia-crown-blue group-hover:text-on-primary transition-colors">
                  <span className="material-symbols-outlined">school</span>
                </div>
                <h4 className="font-headline-sm text-headline-sm text-primary font-semibold mb-1">
                  Teaching Toolkit &amp; Papers
                </h4>
                <p className="font-body-sm text-body-sm text-text-muted">
                  Curriculum guides, clinical cases, and syllabus resources for university nurse educators.
                </p>
              </div>
              <div className="mt-space-md flex items-center gap-1 text-columbia-crown-blue font-label-sm text-label-sm font-semibold">
                <span>Faculty Kit</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            </button>

            {/* Downloads & Mappings */}
            <button
              onClick={onOpenTerminology}
              className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm hover:shadow-md transition-all group flex flex-col justify-between text-left cursor-pointer"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary mb-space-sm group-hover:bg-primary group-hover:text-on-primary transition-colors">
                  <span className="material-symbols-outlined">download</span>
                </div>
                <h4 className="font-headline-sm text-headline-sm text-primary font-semibold mb-1">
                  Downloads &amp; Mappings
                </h4>
                <p className="font-body-sm text-body-sm text-text-muted">
                  Comprehensive crosswalk tables for SNOMED CT, LOINC, and machine-readable data sets.
                </p>
              </div>
              <div className="mt-space-md flex items-center gap-1 text-primary font-label-sm text-label-sm font-semibold">
                <span>Access Files</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="w-full py-space-xl bg-surface-canvas">
        <div className="max-w-7xl mx-auto px-gutter-lg">
          <div className="flex flex-col items-center text-center mb-space-xl">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
              Comments from users involved in the Care Classification System
            </span>
            <h2 className="font-headline-xl text-headline-xl text-primary font-bold mt-space-xs">
              What People Are Saying
            </h2>
            <div className="w-12 h-1 bg-secondary rounded-full mt-space-sm"></div>
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {/* Quote 1: Dr. Avaretta Davis */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 text-surface-container-highest">
                <span className="material-symbols-outlined text-4xl">format_quote</span>
              </div>
              <div className="relative z-10 mb-space-lg">
                <p className="font-body-md text-body-md text-text-primary italic leading-relaxed">
                  “We are very excited to integrate the CCC System into our care planning tools at the VA. With it, we can map interventions to outcomes and ultimately use data for improving patient outcomes.”
                </p>
              </div>
              <div className="relative z-10 pt-space-md border-t-0 bg-surface-container-low p-space-md rounded-lg">
                <div className="font-headline-sm text-[15px] font-bold text-primary">
                  Dr. Avaretta Davis, DNP, RN-BC Informatics
                </div>
                <div className="font-body-sm text-[13px] text-text-muted mt-0.5">
                  Deputy Chief Nursing Informatics Officer, Veterans Health Administration
                </div>
              </div>
            </div>

            {/* Quote 2: Dr. Seth Wolpin */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 text-surface-container-highest">
                <span className="material-symbols-outlined text-4xl">format_quote</span>
              </div>
              <div className="relative z-10 mb-space-lg">
                <p className="font-body-md text-body-md text-text-primary italic leading-relaxed">
                  “I've been working with the CCCS for over 16 years and I continue to be impressed with how it can be used to document the nursing process. It is critical that we can connect nursing assessments and actions with patient outcomes.”
                </p>
              </div>
              <div className="relative z-10 pt-space-md border-t-0 bg-surface-container-low p-space-md rounded-lg">
                <div className="font-headline-sm text-[15px] font-bold text-primary">
                  Dr. Seth Wolpin, PhD, MPH, RN
                </div>
                <div className="font-body-sm text-[13px] text-text-muted mt-0.5">
                  Clinical Associate Professor, University of Washington School of Nursing
                </div>
              </div>
            </div>

            {/* Quote 3: Toni J. Laracuente */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 text-surface-container-highest">
                <span className="material-symbols-outlined text-4xl">format_quote</span>
              </div>
              <div className="relative z-10 mb-space-lg">
                <p className="font-body-md text-body-md text-text-primary italic leading-relaxed">
                  “Coupled with the Medicomp Systems clinical data engine, the CCC structured terminology and Quippe Nursing documentation and care planning tools give nurses back their time, without sacrificing patient care or data quality.”
                </p>
              </div>
              <div className="relative z-10 pt-space-md border-t-0 bg-surface-container-low p-space-md rounded-lg">
                <div className="font-headline-sm text-[15px] font-bold text-primary">
                  Toni J. Laracuente, RN, BSN, CNO
                </div>
                <div className="font-body-sm text-[13px] text-text-muted mt-0.5">
                  Medicomp Systems, Inc.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SUMMARY & GOVERNANCE CALLOUT */}
      <section className="w-full py-space-xl bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto px-gutter-lg">
          <div className="bg-gradient-to-r from-primary to-primary-container text-on-primary rounded-2xl p-space-lg md:p-space-xl shadow-xl relative overflow-hidden">
            {/* Decorative subtle pattern */}
            <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-white/5 pointer-events-none"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center relative z-10">
              <div className="lg:col-span-8 space-y-space-md">
                <div className="inline-flex items-center gap-space-xs px-3 py-1 rounded-full bg-surface-container-high/20 text-tertiary-fixed text-label-sm font-semibold tracking-wider uppercase">
                  <span className="material-symbols-outlined text-[16px]">info</span>
                  <span>About Care Classification</span>
                </div>
                <p className="font-headline-md text-headline-md font-medium text-white leading-relaxed">
                  The CCC System facilitates the electronic documentation of nursing plans of care (POCs). The CCC Framework makes it possible to code the data represented in the four levels, and is recognized as the terminology of choice for documenting the essence of patient care in the electronic health record (EHR) systems.
                </p>
                <div className="flex flex-wrap items-center gap-space-md pt-space-xs">
                  <button
                    onClick={() => onNavigate('about')}
                    className="inline-flex items-center gap-2 px-space-md py-2 rounded-lg bg-surface-container-lowest text-primary font-label-md text-label-md hover:bg-surface-container-high transition-colors shadow-sm cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">menu_book</span>
                    <span>User's Guide &amp; Specs</span>
                  </button>
                  <button
                    onClick={() => onNavigate('about')}
                    className="inline-flex items-center gap-2 px-space-md py-2 rounded-lg bg-white/10 text-white font-label-md text-label-md hover:bg-white/20 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">public</span>
                    <span>International Advisory Board</span>
                  </button>
                  <button
                    onClick={() => onNavigate('about')}
                    className="inline-flex items-center gap-2 px-space-md py-2 rounded-lg bg-white/10 text-white font-label-md text-label-md hover:bg-white/20 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">history_edu</span>
                    <span>Legacy: Dr. Virginia K. Saba</span>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-space-md bg-white/10 p-space-lg rounded-xl backdrop-blur-sm">
                <div className="flex items-center gap-space-sm text-secondary-fixed">
                  <span className="material-symbols-outlined text-[24px]">share</span>
                  <span className="font-headline-sm text-headline-sm font-semibold text-white">Share this resource</span>
                </div>
                <p className="font-body-sm text-body-sm text-surface-container-highest">
                  Help disseminate standardized nursing informatics across healthcare systems, university faculties, and clinical research groups.
                </p>

                {/* Social Sharing Buttons */}
                <div className="flex items-center gap-space-sm">
                  <button
                    onClick={() => handleShare('facebook')}
                    className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                    title="Facebook"
                  >
                    <span className="material-symbols-outlined text-[20px]">share</span>
                  </button>
                  <button
                    onClick={() => handleShare('twitter')}
                    className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                    title="Twitter"
                  >
                    <span className="material-symbols-outlined text-[20px]">tag</span>
                  </button>
                  <button
                    onClick={() => handleShare('email')}
                    className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                    title="Email"
                  >
                    <span className="material-symbols-outlined text-[20px]">mail</span>
                  </button>
                  <button
                    onClick={() => handleShare('whatsapp')}
                    className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                    title="WhatsApp"
                  >
                    <span className="material-symbols-outlined text-[20px]">chat</span>
                  </button>
                  <button
                    onClick={() => handleShare('copy')}
                    className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                    title="Copy Link"
                  >
                    <span className="material-symbols-outlined text-[20px]">link</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
