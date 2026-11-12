import React, { useState, useRef } from 'react';
import { NewsArticle } from '../data/cccData';

interface AddNewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddArticle: (article: NewsArticle) => void;
}

const PRESET_IMAGES = [
  {
    label: 'AI & Clinical Tech',
    url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    caption: 'Modern Clinical Dashboard'
  },
  {
    label: 'Emory Campus',
    url: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80',
    caption: 'Academic Medical Center'
  },
  {
    label: 'Nurse Informatics',
    url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80',
    caption: 'Informatics & Bedside Care'
  },
  {
    label: 'Global Symposium',
    url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    caption: 'International Health Conference'
  }
];

export const AddNewsModal: React.FC<AddNewsModalProps> = ({ isOpen, onClose, onAddArticle }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState<'ai' | 'conferences' | 'interviews' | 'system' | 'publications'>('ai');
  const [readTime, setReadTime] = useState('4 min read');
  const [summary, setSummary] = useState('');
  const [fullContentText, setFullContentText] = useState('');
  const [quote, setQuote] = useState('');
  const [tagsInput, setTagsInput] = useState('EHR, Emory, Nursing Informatics');
  
  // Image Drag & Drop states
  const [imageUrl, setImageUrl] = useState<string>('');
  const [imageFileName, setImageFileName] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, WEBP, or SVG).');
      return;
    }
    setImageFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setImageUrl(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      processFile(file);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const handleRemoveImage = () => {
    setImageUrl('');
    setImageFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!title.trim()) newErrors.title = 'Article title is required.';
    if (!author.trim()) newErrors.author = 'Author name and credentials are required.';
    if (!summary.trim()) newErrors.summary = 'Article summary lead is required.';
    if (!fullContentText.trim()) newErrors.fullContent = 'Article content is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Parse paragraphs
    const paragraphs = fullContentText
      .split('\n\n')
      .map(p => p.trim())
      .filter(p => p.length > 0);

    // Parse tags
    const tags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const newArticle: NewsArticle = {
      id: `custom-news-${Date.now()}`,
      title: title.trim(),
      slug: slug || `news-${Date.now()}`,
      author: author.trim(),
      date: formattedDate,
      readTime: readTime.trim() || '3 min read',
      category,
      tags: tags.length > 0 ? tags : ['Clinical Informatics', 'CCC System'],
      summary: summary.trim(),
      fullContent: paragraphs.length > 0 ? paragraphs : [summary.trim()],
      quote: quote.trim() || undefined,
      imageUrl: imageUrl.trim() || undefined
    };

    onAddArticle(newArticle);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-primary/60 backdrop-blur-sm flex items-center justify-center p-gutter overflow-y-auto">
      <div className="bg-surface-card rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden flex flex-col my-auto border border-border-subtle max-h-[92vh]">
        {/* Header */}
        <div className="p-space-lg bg-surface-container-low border-b border-border-subtle flex items-start justify-between gap-space-md shrink-0">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-label-sm font-bold bg-primary text-on-primary uppercase tracking-wider">
              <span className="material-symbols-outlined text-[14px]">edit_document</span>
              <span>Publish News &amp; Updates</span>
            </div>
            <h2 className="font-headline-md text-headline-md text-primary font-bold tracking-tight">
              Add New Clinical Article or Bulletin
            </h2>
            <p className="font-body-sm text-body-sm text-text-muted">
              Submit news, symposium announcements, research summaries, or clinical implementation updates.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-text-muted hover:text-primary hover:bg-surface-container transition-colors cursor-pointer shrink-0"
            aria-label="Close"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} noValidate className="p-space-lg overflow-y-auto space-y-space-md text-primary">
          {/* Title */}
          <div>
            <label htmlFor="articleTitle" className="block font-label-md text-label-md text-primary font-semibold mb-1">
              Article Title <span className="text-red-500">*</span>
            </label>
            <input
              id="articleTitle"
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Emory Nursing Announces Multicenter CCC Terminology Study"
              className={`w-full px-space-sm py-2 rounded-lg bg-surface border text-primary font-body-sm focus:outline-none focus:ring-2 ${
                errors.title ? 'border-red-500 ring-red-100' : 'border-border-subtle focus:border-primary focus:ring-primary/20'
              }`}
            />
            {errors.title && <p className="text-red-600 text-xs mt-1">{errors.title}</p>}
          </div>

          {/* Row: Author, Category, Read Time */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md">
            <div>
              <label htmlFor="articleAuthor" className="block font-label-md text-label-md text-primary font-semibold mb-1">
                Author &amp; Credentials <span className="text-red-500">*</span>
              </label>
              <input
                id="articleAuthor"
                type="text"
                value={author}
                onChange={e => setAuthor(e.target.value)}
                placeholder="e.g. Dr. Jane Doe, DNP, RN"
                className={`w-full px-space-sm py-2 rounded-lg bg-surface border text-primary font-body-sm focus:outline-none focus:ring-2 ${
                  errors.author ? 'border-red-500 ring-red-100' : 'border-border-subtle focus:border-primary focus:ring-primary/20'
                }`}
              />
              {errors.author && <p className="text-red-600 text-xs mt-1">{errors.author}</p>}
            </div>

            <div>
              <label htmlFor="articleCategory" className="block font-label-md text-label-md text-primary font-semibold mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="articleCategory"
                value={category}
                onChange={e => setCategory(e.target.value as any)}
                className="w-full px-space-sm py-2 rounded-lg bg-surface border border-border-subtle text-primary font-body-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 cursor-pointer"
              >
                <option value="ai">AI &amp; Informatics</option>
                <option value="conferences">Conferences &amp; Symposia</option>
                <option value="interviews">Expert Interviews</option>
                <option value="system">System Governance</option>
                <option value="publications">Research Publications</option>
              </select>
            </div>

            <div>
              <label htmlFor="articleReadTime" className="block font-label-md text-label-md text-primary font-semibold mb-1">
                Estimated Read Time
              </label>
              <input
                id="articleReadTime"
                type="text"
                value={readTime}
                onChange={e => setReadTime(e.target.value)}
                placeholder="e.g. 4 min read"
                className="w-full px-space-sm py-2 rounded-lg bg-surface border border-border-subtle text-primary font-body-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          {/* IMAGE DROP ZONE (Requested) */}
          <div className="space-y-space-xs">
            <div className="flex items-center justify-between">
              <label className="block font-label-md text-label-md text-primary font-semibold">
                Cover Image (Drop or Upload)
              </label>
              {imageUrl && (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="text-xs text-clinical-alert-red hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px]">delete</span>
                  <span>Remove Image</span>
                </button>
              )}
            </div>

            {/* Drag & Drop Canvas Area */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative rounded-xl border-2 border-dashed p-space-md text-center cursor-pointer transition-all ${
                isDragging
                  ? 'border-primary bg-primary/5 ring-4 ring-primary/20 scale-[0.99]'
                  : imageUrl
                  ? 'border-border-subtle bg-surface-container-low hover:border-primary/50'
                  : 'border-border-subtle bg-surface-container-lowest hover:bg-surface-container-low hover:border-primary/50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
                className="hidden"
              />

              {imageUrl ? (
                /* Uploaded Image Preview */
                <div className="flex flex-col sm:flex-row items-center gap-space-md text-left">
                  <div className="w-32 h-20 rounded-lg overflow-hidden border border-border-subtle shadow-sm shrink-0 bg-surface">
                    <img
                      src={imageUrl}
                      alt="Uploaded preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                      <span className="material-symbols-outlined text-[16px]">check_circle</span>
                      <span>Image Ready &amp; Attached</span>
                    </div>
                    <p className="text-xs font-mono text-text-muted truncate max-w-md">
                      {imageFileName || 'Custom Image (Preset or File)'}
                    </p>
                    <p className="text-[11px] text-text-muted">
                      Click to choose another image or drag and drop a new one over this area.
                    </p>
                  </div>
                </div>
              ) : (
                /* Empty Drop State */
                <div className="py-space-md flex flex-col items-center justify-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-primary shadow-xs">
                    <span className="material-symbols-outlined text-[26px]">add_photo_alternate</span>
                  </div>
                  <div className="space-y-0.5">
                    <p className="font-label-md text-label-md font-semibold text-primary">
                      Drag &amp; drop an image here, or <span className="text-columbia-crown-blue underline">browse files</span>
                    </p>
                    <p className="text-xs text-text-muted">
                      Supports JPG, PNG, WEBP, or SVG (processed in-browser)
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Curated Preset Image Selection */}
            <div className="pt-1">
              <span className="text-[11px] text-text-muted uppercase font-label-sm font-semibold tracking-wider block mb-1.5">
                Or select a high-resolution clinical stock photo:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {PRESET_IMAGES.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setImageUrl(preset.url);
                      setImageFileName(preset.caption);
                    }}
                    className={`text-left p-1.5 rounded-lg border text-xs transition-all flex items-center gap-2 cursor-pointer ${
                      imageUrl === preset.url
                        ? 'border-primary bg-primary/10 ring-1 ring-primary'
                        : 'border-border-subtle bg-surface hover:bg-surface-container'
                    }`}
                  >
                    <img
                      src={preset.url}
                      alt={preset.label}
                      className="w-8 h-8 rounded object-cover shrink-0"
                    />
                    <span className="truncate text-[11px] font-medium text-primary">
                      {preset.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Summary Lead */}
          <div>
            <label htmlFor="articleSummary" className="block font-label-md text-label-md text-primary font-semibold mb-1">
              Summary Lead <span className="text-red-500">*</span>
            </label>
            <textarea
              id="articleSummary"
              rows={2}
              value={summary}
              onChange={e => setSummary(e.target.value)}
              placeholder="A brief 1-2 sentence overview displayed in news cards and feeds..."
              className={`w-full px-space-sm py-2 rounded-lg bg-surface border text-primary font-body-sm focus:outline-none focus:ring-2 ${
                errors.summary ? 'border-red-500 ring-red-100' : 'border-border-subtle focus:border-primary focus:ring-primary/20'
              }`}
            />
            {errors.summary && <p className="text-red-600 text-xs mt-1">{errors.summary}</p>}
          </div>

          {/* Full Article Content */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="articleContent" className="block font-label-md text-label-md text-primary font-semibold">
                Full Article Content <span className="text-red-500">*</span>
              </label>
              <span className="text-xs text-text-muted">Separate paragraphs with a blank line</span>
            </div>
            <textarea
              id="articleContent"
              rows={6}
              value={fullContentText}
              onChange={e => setFullContentText(e.target.value)}
              placeholder="Paragraph 1: Background and context of the development...&#10;&#10;Paragraph 2: Detailed clinical or technical findings, EHR implications, and outcomes...&#10;&#10;Paragraph 3: Recommendations and future implementation directions."
              className={`w-full px-space-sm py-2 rounded-lg bg-surface border text-primary font-body-sm focus:outline-none focus:ring-2 ${
                errors.fullContent ? 'border-red-500 ring-red-100' : 'border-border-subtle focus:border-primary focus:ring-primary/20'
              }`}
            />
            {errors.fullContent && <p className="text-red-600 text-xs mt-1">{errors.fullContent}</p>}
          </div>

          {/* Optional Pull Quote & Tags Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
            <div>
              <label htmlFor="articleQuote" className="block font-label-md text-label-md text-primary font-semibold mb-1">
                Featured Clinical Quote <span className="text-text-muted text-xs font-normal">(Optional)</span>
              </label>
              <input
                id="articleQuote"
                type="text"
                value={quote}
                onChange={e => setQuote(e.target.value)}
                placeholder="e.g. Standardized outcomes unlock longitudinal patient insights."
                className="w-full px-space-sm py-2 rounded-lg bg-surface border border-border-subtle text-primary font-body-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label htmlFor="articleTags" className="block font-label-md text-label-md text-primary font-semibold mb-1">
                Tags <span className="text-text-muted text-xs font-normal">(Comma separated)</span>
              </label>
              <input
                id="articleTags"
                type="text"
                value={tagsInput}
                onChange={e => setTagsInput(e.target.value)}
                placeholder="e.g. EHR, Emory, Research, FHIR"
                className="w-full px-space-sm py-2 rounded-lg bg-surface border border-border-subtle text-primary font-body-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-space-sm border-t border-border-subtle flex items-center justify-between gap-space-sm">
            <button
              type="button"
              onClick={onClose}
              className="px-space-md py-2.5 rounded-lg text-text-muted hover:text-primary font-label-md text-label-md font-medium transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-space-xl py-2.5 rounded-lg bg-primary hover:bg-columbia-crown-blue text-on-primary font-label-md text-label-md font-semibold transition-all shadow-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">publish</span>
              <span>Publish Article</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
