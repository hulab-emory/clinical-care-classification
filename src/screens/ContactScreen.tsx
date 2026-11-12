import React, { useState, useEffect } from 'react';

interface ContactScreenProps {
  onNavigate: (screen: 'overview' | 'framework' | 'translations' | 'code-builder' | 'terminology' | 'news' | 'about' | 'contact') => void;
  onOpenTerminology?: () => void;
}

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  confirmEmail: string;
  organization: string;
  category: string;
  subject: string;
  message: string;
  newsletterConsent: boolean;
  iabConsent: boolean;
  captchaAnswer: string;
}

interface SubmittedData extends FormState {
  ticketId: string;
  submittedAt: string;
}

export const ContactScreen: React.FC<ContactScreenProps> = ({ onNavigate, onOpenTerminology }) => {
  const [formData, setFormData] = useState<FormState>({
    firstName: '',
    lastName: '',
    email: '',
    confirmEmail: '',
    organization: '',
    category: 'General Questions / Contact',
    subject: '',
    message: '',
    newsletterConsent: false,
    iabConsent: true,
    captchaAnswer: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<SubmittedData | null>(null);

  // Simple math challenge CAPTCHA
  const [captchaChallenge, setCaptchaChallenge] = useState({ num1: 6, num2: 7, answer: 13 });

  const generateCaptcha = () => {
    const n1 = Math.floor(Math.random() * 8) + 2;
    const n2 = Math.floor(Math.random() * 8) + 2;
    setCaptchaChallenge({ num1: n1, num2: n2, answer: n1 + n2 });
    setFormData(prev => ({ ...prev, captchaAnswer: '' }));
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required.';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.confirmEmail.trim()) {
      newErrors.confirmEmail = 'Please confirm your email address.';
    } else if (formData.email.trim().toLowerCase() !== formData.confirmEmail.trim().toLowerCase()) {
      newErrors.confirmEmail = 'Email addresses do not match.';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please provide your question or comments.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long.';
    }

    if (parseInt(formData.captchaAnswer.trim(), 10) !== captchaChallenge.answer) {
      newErrors.captcha = `Incorrect verification answer. What is ${captchaChallenge.num1} + ${captchaChallenge.num2}?`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate network submission to Emory Nursing CCC repository
    setTimeout(() => {
      const ticketId = `CCC-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedData({
        ...formData,
        ticketId,
        submittedAt: new Date().toLocaleString('en-US', {
          dateStyle: 'medium',
          timeStyle: 'short'
        })
      });
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 900);
  };

  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      confirmEmail: '',
      organization: '',
      category: 'General Questions / Contact',
      subject: '',
      message: '',
      newsletterConsent: false,
      iabConsent: true,
      captchaAnswer: ''
    });
    setErrors({});
    setSubmittedData(null);
    generateCaptcha();
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Banner & Standardized Breadcrumb */}
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
            <span className="text-primary font-semibold">Contact Us</span>
          </nav>

          {/* Screen Title & Quick Meta */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
            <div className="max-w-3xl space-y-space-xs">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-space-xs py-0.5 rounded text-[11px] font-label-sm uppercase tracking-wider bg-primary text-on-primary font-bold">
                  OFFICIAL INQUIRY PORTAL
                </span>
                <span className="px-space-xs py-0.5 rounded text-[11px] font-label-sm bg-surface-container-high text-columbia-crown-blue font-bold border border-border-subtle">
                  Emory University School of Nursing
                </span>
                <span className="text-text-muted text-[12px] font-label-sm">
                  CCC International Advisory Board Secretariat
                </span>
              </div>
              <h1 className="font-headline-xl text-headline-xl text-primary font-bold tracking-tight">
                Contact the Clinical Care Classification System
              </h1>
              <p className="font-body-md text-body-md text-text-muted">
                If you have questions regarding CCC concepts, codes, care component classes, EHR interoperability, or the International Advisory Board (IAB), please submit the form below or reach out to our academic liaison team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Form & Information Grid */}
      <section className="max-w-7xl mx-auto w-full px-gutter-lg py-space-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-start">
          {/* Left Column: Contact Form or Success Screen */}
          <div className="lg:col-span-8 bg-surface-card rounded-2xl border border-border-subtle p-space-xl shadow-sm">
            {submittedData ? (
              /* Success Confirmation View */
              <div className="space-y-space-lg">
                <div className="p-space-lg rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-space-md">
                  <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <span className="material-symbols-outlined text-[28px]">check_circle</span>
                  </div>
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded text-[11px] font-code-badge uppercase font-bold bg-emerald-100 text-emerald-800">
                      Inquiry Received
                    </div>
                    <h2 className="font-headline-md text-headline-md font-bold text-emerald-950">
                      Thank You, {submittedData.firstName}!
                    </h2>
                    <p className="font-body-sm text-body-sm text-emerald-900 leading-relaxed">
                      Your message has been transmitted to the Emory University School of Nursing CCC System team and International Advisory Board Secretariat.
                    </p>
                  </div>
                </div>

                {/* Receipt Details Box */}
                <div className="bg-surface-container-low rounded-xl border border-border-subtle p-space-md space-y-space-sm">
                  <div className="flex items-center justify-between border-b border-border-subtle pb-space-xs text-xs font-label-sm text-text-muted">
                    <span>Reference Ticket ID:</span>
                    <span className="font-code-badge font-bold text-primary text-sm">{submittedData.ticketId}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm text-xs font-body-sm">
                    <div>
                      <span className="text-text-muted">Submitter:</span>
                      <div className="font-semibold text-primary">{submittedData.firstName} {submittedData.lastName}</div>
                    </div>
                    <div>
                      <span className="text-text-muted">Confirmation Sent To:</span>
                      <div className="font-semibold text-primary">{submittedData.email}</div>
                    </div>
                    <div>
                      <span className="text-text-muted">Inquiry Category:</span>
                      <div className="font-semibold text-columbia-crown-blue">{submittedData.category}</div>
                    </div>
                    <div>
                      <span className="text-text-muted">Organization:</span>
                      <div className="font-semibold text-primary">{submittedData.organization || 'Not specified'}</div>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-border-subtle">
                    <span className="text-text-muted text-xs font-label-sm">Subject:</span>
                    <div className="font-semibold text-primary text-sm mt-0.5">{submittedData.subject}</div>
                    <div className="mt-1 text-xs text-on-surface-variant bg-surface p-2.5 rounded border border-border-subtle italic">
                      "{submittedData.message}"
                    </div>
                  </div>
                  <div className="pt-1 text-[11px] text-text-muted flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-secondary">schedule</span>
                    <span>Expected response time: 2–3 academic business days.</span>
                  </div>
                </div>

                {/* Post-submission Actions */}
                <div className="flex flex-wrap items-center gap-space-sm pt-space-xs">
                  <button
                    onClick={handleReset}
                    className="px-space-md py-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-label-md font-semibold transition-colors cursor-pointer border border-border-subtle flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[18px]">edit_note</span>
                    <span>Submit Another Question</span>
                  </button>

                  <button
                    onClick={() => onNavigate('terminology')}
                    className="px-space-md py-2.5 rounded-lg bg-primary hover:bg-columbia-crown-blue text-on-primary font-label-md text-label-md font-semibold transition-colors cursor-pointer shadow-sm flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[18px]">search</span>
                    <span>Explore Terminology Browser</span>
                  </button>

                  <button
                    onClick={() => onNavigate('code-builder')}
                    className="px-space-md py-2.5 rounded-lg bg-surface-container-high hover:bg-surface-variant text-primary font-label-md text-label-md font-semibold transition-colors cursor-pointer border border-border-subtle flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[18px]">construction</span>
                    <span>Online Code Builder</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Contact Form Input View */
              <form onSubmit={handleSubmit} noValidate className="space-y-space-md">
                <div className="border-b border-border-subtle pb-space-sm">
                  <h2 className="font-headline-md text-headline-md text-primary font-bold">
                    Send an Inquiry to the CCC System Team
                  </h2>
                  <p className="font-body-sm text-body-sm text-text-muted mt-1">
                    Required fields are indicated with an asterisk (<span className="text-red-500 font-bold">*</span>).
                  </p>
                </div>

                {/* Name Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                  <div>
                    <label htmlFor="firstName" className="block font-label-md text-label-md text-primary font-semibold mb-1">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="e.g. Virginia"
                      className={`w-full px-space-sm py-2 rounded-lg bg-surface border text-primary font-body-sm focus:outline-none focus:ring-2 ${
                        errors.firstName ? 'border-red-500 ring-red-100' : 'border-border-subtle focus:border-primary focus:ring-primary/20'
                      }`}
                    />
                    {errors.firstName && <p className="text-red-600 text-xs mt-1">{errors.firstName}</p>}
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block font-label-md text-label-md text-primary font-semibold mb-1">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="e.g. Saba"
                      className={`w-full px-space-sm py-2 rounded-lg bg-surface border text-primary font-body-sm focus:outline-none focus:ring-2 ${
                        errors.lastName ? 'border-red-500 ring-red-100' : 'border-border-subtle focus:border-primary focus:ring-primary/20'
                      }`}
                    />
                    {errors.lastName && <p className="text-red-600 text-xs mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                {/* Email and Confirm Email (faithful to clinicalcareclassification.org/contact/) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                  <div>
                    <label htmlFor="email" className="block font-label-md text-label-md text-primary font-semibold mb-1">
                      Enter Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@institution.edu"
                      className={`w-full px-space-sm py-2 rounded-lg bg-surface border text-primary font-body-sm focus:outline-none focus:ring-2 ${
                        errors.email ? 'border-red-500 ring-red-100' : 'border-border-subtle focus:border-primary focus:ring-primary/20'
                      }`}
                    />
                    {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="confirmEmail" className="block font-label-md text-label-md text-primary font-semibold mb-1">
                      Confirm Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="confirmEmail"
                      type="email"
                      value={formData.confirmEmail}
                      onChange={e => setFormData({ ...formData, confirmEmail: e.target.value })}
                      placeholder="Re-enter your email"
                      className={`w-full px-space-sm py-2 rounded-lg bg-surface border text-primary font-body-sm focus:outline-none focus:ring-2 ${
                        errors.confirmEmail ? 'border-red-500 ring-red-100' : 'border-border-subtle focus:border-primary focus:ring-primary/20'
                      }`}
                    />
                    {errors.confirmEmail && <p className="text-red-600 text-xs mt-1">{errors.confirmEmail}</p>}
                  </div>
                </div>

                {/* Organization and Inquiry Category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                  <div>
                    <label htmlFor="organization" className="block font-label-md text-label-md text-primary font-semibold mb-1">
                      Institution / Health System <span className="text-text-muted text-xs font-normal">(Optional)</span>
                    </label>
                    <input
                      id="organization"
                      type="text"
                      value={formData.organization}
                      onChange={e => setFormData({ ...formData, organization: e.target.value })}
                      placeholder="e.g. Emory University, Mayo Clinic"
                      className="w-full px-space-sm py-2 rounded-lg bg-surface border border-border-subtle text-primary font-body-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div>
                    <label htmlFor="category" className="block font-label-md text-label-md text-primary font-semibold mb-1">
                      Inquiry Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="category"
                      value={formData.category}
                      onChange={e => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-space-sm py-2 rounded-lg bg-surface border border-border-subtle text-primary font-body-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 cursor-pointer"
                    >
                      <option value="General Questions / Contact">General Questions / Contact</option>
                      <option value="Concepts & Codes Inquiry">Concepts &amp; Codes Inquiry</option>
                      <option value="Care Component Classes">Care Component Classes</option>
                      <option value="International Advisory Board (IAB) - Code Additions">International Advisory Board (IAB) - Code Additions</option>
                      <option value="EHR Interoperability & FHIR Integration">EHR Interoperability &amp; FHIR Integration</option>
                      <option value="Multilingual Translation Proposal">Multilingual Translation Proposal</option>
                      <option value="Academic Research & Citation">Academic Research &amp; Citation</option>
                    </select>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block font-label-md text-label-md text-primary font-semibold mb-1">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="subject"
                    type="text"
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Brief summary of your question"
                    className={`w-full px-space-sm py-2 rounded-lg bg-surface border text-primary font-body-sm focus:outline-none focus:ring-2 ${
                      errors.subject ? 'border-red-500 ring-red-100' : 'border-border-subtle focus:border-primary focus:ring-primary/20'
                    }`}
                  />
                  {errors.subject && <p className="text-red-600 text-xs mt-1">{errors.subject}</p>}
                </div>

                {/* Questions / Comments */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="message" className="block font-label-md text-label-md text-primary font-semibold">
                      Questions / Comments <span className="text-red-500">*</span>
                    </label>
                    <span className="text-xs text-text-muted">{formData.message.length} characters</span>
                  </div>
                  <textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Please describe your question, clinical context, or feedback in detail..."
                    className={`w-full px-space-sm py-2.5 rounded-lg bg-surface border text-primary font-body-sm focus:outline-none focus:ring-2 ${
                      errors.message ? 'border-red-500 ring-red-100' : 'border-border-subtle focus:border-primary focus:ring-primary/20'
                    }`}
                  />
                  {errors.message && <p className="text-red-600 text-xs mt-1">{errors.message}</p>}
                </div>

                {/* Official Consent / Opt-in Checkboxes from clinicalcareclassification.org/contact/ */}
                <div className="space-y-space-xs p-space-sm rounded-xl bg-surface-container-low border border-border-subtle">
                  <span className="font-label-sm text-xs font-bold uppercase tracking-wider text-secondary block">
                    Communication Preferences &amp; Consents
                  </span>

                  <label className="flex items-start gap-2.5 cursor-pointer text-xs font-body-sm text-primary">
                    <input
                      type="checkbox"
                      checked={formData.newsletterConsent}
                      onChange={e => setFormData({ ...formData, newsletterConsent: e.target.checked })}
                      className="mt-0.5 rounded text-primary focus:ring-primary border-border-subtle cursor-pointer"
                    />
                    <span>
                      <strong>Consent to CCC System Newsletter:</strong> I agree to receive periodic announcements and research updates from the Emory University School of Nursing CCC repository (less than 1 message per month).
                    </span>
                  </label>

                  <label className="flex items-start gap-2.5 cursor-pointer text-xs font-body-sm text-primary">
                    <input
                      type="checkbox"
                      checked={formData.iabConsent}
                      onChange={e => setFormData({ ...formData, iabConsent: e.target.checked })}
                      className="mt-0.5 rounded text-primary focus:ring-primary border-border-subtle cursor-pointer"
                    />
                    <span>
                      <strong>International Advisory Board (IAB) Coordination:</strong> I consent to share my contact and inquiry details with members of the CCC International Advisory Board to assist with terminology guidance and research consensus.
                    </span>
                  </label>
                </div>

                {/* Anti-Spam Math CAPTCHA verification */}
                <div className="p-space-sm rounded-xl bg-surface-container-highest/60 border border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-9 h-9 rounded-lg bg-surface flex items-center justify-center text-primary border border-border-subtle shrink-0">
                      <span className="material-symbols-outlined text-[20px]">security</span>
                    </div>
                    <div>
                      <span className="font-label-sm text-xs font-bold text-primary block">
                        Security Verification <span className="text-red-500">*</span>
                      </span>
                      <span className="text-xs text-text-muted">
                        Please solve: <strong className="text-primary font-mono text-sm">{captchaChallenge.num1} + {captchaChallenge.num2} = ?</strong>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={formData.captchaAnswer}
                      onChange={e => setFormData({ ...formData, captchaAnswer: e.target.value })}
                      placeholder="Answer"
                      className="w-24 px-space-xs py-1.5 rounded-lg bg-surface border border-border-subtle text-primary font-mono text-center font-bold text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                    <button
                      type="button"
                      onClick={generateCaptcha}
                      className="p-1.5 rounded-lg bg-surface hover:bg-surface-container border border-border-subtle text-text-muted hover:text-primary transition-colors cursor-pointer"
                      title="Generate new verification question"
                    >
                      <span className="material-symbols-outlined text-[18px]">refresh</span>
                    </button>
                  </div>
                </div>
                {errors.captcha && <p className="text-red-600 text-xs">{errors.captcha}</p>}

                {/* Form Buttons */}
                <div className="pt-space-xs flex items-center justify-between gap-space-sm">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-space-md py-2.5 rounded-lg text-text-muted hover:text-primary font-label-md text-label-md font-medium transition-colors cursor-pointer"
                  >
                    Clear Form
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-space-xl py-2.5 rounded-lg bg-primary hover:bg-columbia-crown-blue disabled:opacity-50 text-on-primary font-label-md text-label-md font-semibold transition-all shadow-sm cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        <span>Sending Inquiry...</span>
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-[18px]">send</span>
                        <span>Submit Inquiry</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Institutional Stewardship & Contact Info */}
          <div className="lg:col-span-4 space-y-space-md">
            {/* Emory Stewardship Card */}
            <div className="bg-surface-card rounded-2xl border border-border-subtle p-space-lg shadow-sm space-y-space-sm">
              <div className="flex items-center gap-2 text-columbia-crown-blue">
                <span className="material-symbols-outlined text-[22px]">account_balance</span>
                <span className="font-label-sm text-xs font-bold uppercase tracking-wider">
                  Academic Custody &amp; Host
                </span>
              </div>

              <h3 className="font-headline-sm text-headline-sm font-bold text-primary">
                Emory University School of Nursing
              </h3>

              <p className="font-body-sm text-body-sm text-text-muted leading-relaxed">
                The Clinical Care Classification System is maintained under academic custody at Emory Nursing, continuing the lifelong vision and research of Dr. Virginia K. Saba.
              </p>

              <div className="space-y-space-xs pt-space-xs text-xs font-body-sm text-text-muted border-t border-border-subtle">
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[16px] text-primary shrink-0 mt-0.5">location_on</span>
                  <span>1520 Clifton Rd NE<br />Atlanta, GA 30322 USA</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-primary shrink-0">mail</span>
                  <a href="mailto:ccc@nursing.emory.edu" className="text-columbia-crown-blue hover:underline font-semibold">
                    ccc@nursing.emory.edu
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-primary shrink-0">language</span>
                  <a href="https://clinicalcareclassification.org" target="_blank" rel="noopener noreferrer" className="text-columbia-crown-blue hover:underline">
                    clinicalcareclassification.org
                  </a>
                </div>
              </div>
            </div>

            {/* Advisory Board Inquiries Card */}
            <div className="bg-surface-card rounded-2xl border border-border-subtle p-space-lg shadow-sm space-y-space-sm">
              <div className="flex items-center gap-2 text-secondary">
                <span className="material-symbols-outlined text-[22px]">groups</span>
                <span className="font-label-sm text-xs font-bold uppercase tracking-wider">
                  International Advisory Board
                </span>
              </div>

              <h4 className="font-headline-sm text-[15px] font-bold text-primary">
                Proposing New Codes &amp; Concepts
              </h4>

              <p className="font-body-sm text-body-sm text-text-muted leading-relaxed">
                Researchers, hospital systems, and terminology specialists may propose new nursing diagnoses or interventions. Submissions are reviewed bi-annually by the CCC International Advisory Board.
              </p>

              <button
                onClick={() => onNavigate('about')}
                className="w-full text-left py-1.5 text-xs text-columbia-crown-blue hover:underline font-semibold flex items-center justify-between cursor-pointer"
              >
                <span>Read Board Charter &amp; Members</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>

            {/* Quick Self-Service Links */}
            <div className="bg-surface-container-low rounded-2xl border border-border-subtle p-space-md space-y-space-xs">
              <span className="font-label-sm text-xs font-bold uppercase tracking-wider text-text-muted block">
                Instant Online Tools
              </span>

              <button
                onClick={() => onNavigate('terminology')}
                className="w-full text-left p-space-xs rounded-lg hover:bg-surface-container flex items-center justify-between text-xs font-medium text-primary cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-secondary">search</span>
                  <span>Browse 176 Diagnoses &amp; 546 Interventions</span>
                </div>
                <span className="material-symbols-outlined text-[14px] text-text-muted">chevron_right</span>
              </button>

              <button
                onClick={() => onNavigate('code-builder')}
                className="w-full text-left p-space-xs rounded-lg hover:bg-surface-container flex items-center justify-between text-xs font-medium text-primary cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-primary">construction</span>
                  <span>Generate HL7 &amp; FHIR EHR Payloads</span>
                </div>
                <span className="material-symbols-outlined text-[14px] text-text-muted">chevron_right</span>
              </button>

              <button
                onClick={() => onNavigate('translations')}
                className="w-full text-left p-space-xs rounded-lg hover:bg-surface-container flex items-center justify-between text-xs font-medium text-primary cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-columbia-crown-blue">g_translate</span>
                  <span>Download Multilingual Packages</span>
                </div>
                <span className="material-symbols-outlined text-[14px] text-text-muted">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
