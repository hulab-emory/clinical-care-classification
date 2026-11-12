import React, { useState, useMemo } from 'react';
import { NEWS_ARTICLES, UPCOMING_CONFERENCES, NewsArticle } from '../data/cccData';
import { AddNewsModal } from '../components/AddNewsModal';

interface NewsScreenProps {
  onNavigate: (screen: 'overview' | 'framework' | 'translations' | 'code-builder' | 'terminology' | 'news' | 'about' | 'contact') => void;
  onOpenArticle: (article: NewsArticle) => void;
  onOpenTerminology: () => void;
}

const STORAGE_KEY = 'ccc_custom_news_articles';

export const NewsScreen: React.FC<NewsScreenProps> = ({
  onNavigate,
  onOpenArticle,
  onOpenTerminology
}) => {
  // Articles state initialized from localStorage + defaults
  const [articles, setArticles] = useState<NewsArticle[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return [...parsed, ...NEWS_ARTICLES];
        }
      }
    } catch (e) {
      console.warn('Failed to read custom news from localStorage', e);
    }
    return NEWS_ARTICLES;
  });

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'ai' | 'conferences' | 'interviews' | 'system' | 'publications'>('all');
  const [subscribedEmail, setSubscribedEmail] = useState('');
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);

  const handleAddArticle = (newArticle: NewsArticle) => {
    setArticles(prev => {
      const updated = [newArticle, ...prev];
      try {
        const customOnly = updated.filter(a => a.id.startsWith('custom-news-'));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(customOnly));
      } catch (e) {
        console.warn('Failed to save custom news to localStorage', e);
      }
      return updated;
    });
    setToastMessage(`"${newArticle.title}" has been published!`);
    setTimeout(() => setToastMessage(null), 4500);
  };

  const handleDeleteArticle = (articleId: string) => {
    if (!confirm('Are you sure you want to remove this published article?')) return;
    setArticles(prev => {
      const updated = prev.filter(a => a.id !== articleId);
      try {
        const customOnly = updated.filter(a => a.id.startsWith('custom-news-'));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(customOnly));
      } catch (e) {
        console.warn('Failed to save updated news list to localStorage', e);
      }
      return updated;
    });
    setToastMessage('Article removed.');
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Filtered articles
  const filteredArticles = useMemo(() => {
    let list = articles;

    if (selectedCategory !== 'all') {
      list = list.filter(a => {
        if (selectedCategory === 'ai') return a.category === 'ai' || a.tags.some(t => t.toLowerCase().includes('ai') || t.toLowerCase().includes('llm'));
        if (selectedCategory === 'conferences') return a.category === 'conferences' || a.tags.some(t => t.toLowerCase().includes('symposium') || t.toLowerCase().includes('medinfo'));
        if (selectedCategory === 'interviews') return a.category === 'interviews' || a.tags.some(t => t.toLowerCase().includes('interview'));
        if (selectedCategory === 'system') return a.category === 'system' || a.tags.some(t => t.toLowerCase().includes('governance') || t.toLowerCase().includes('access'));
        if (selectedCategory === 'publications') return a.category === 'publications' || a.tags.some(t => t.toLowerCase().includes('research') || t.toLowerCase().includes('clinical'));
        return true;
      });
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.author.toLowerCase().includes(q) ||
        a.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    return list;
  }, [articles, searchQuery, selectedCategory]);

  const featuredArticle = filteredArticles[0] || articles[0] || NEWS_ARTICLES[0];

  const categoryCounts = useMemo(() => {
    return {
      all: articles.length,
      ai: articles.filter(a => a.category === 'ai' || a.tags.some(t => t.toLowerCase().includes('ai') || t.toLowerCase().includes('llm'))).length,
      conferences: articles.filter(a => a.category === 'conferences' || a.tags.some(t => t.toLowerCase().includes('symposium') || t.toLowerCase().includes('medinfo'))).length,
      interviews: articles.filter(a => a.category === 'interviews' || a.tags.some(t => t.toLowerCase().includes('interview'))).length,
      system: articles.filter(a => a.category === 'system' || a.tags.some(t => t.toLowerCase().includes('governance') || t.toLowerCase().includes('access'))).length,
      publications: articles.filter(a => a.category === 'publications' || a.tags.some(t => t.toLowerCase().includes('research') || t.toLowerCase().includes('clinical'))).length,
    };
  }, [articles]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (subscribedEmail) {
      setSubscribeSuccess(true);
      setTimeout(() => setSubscribeSuccess(false), 5000);
      setSubscribedEmail('');
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Subtle Header Scrim / Background Ambient Layer */}
      <div className="relative w-full overflow-hidden bg-surface-container-low pb-space-xl border-b border-border-subtle">
        <div className="absolute -top-32 right-10 w-96 h-96 bg-primary-fixed/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-20 -left-20 w-80 h-80 bg-secondary-fixed/30 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-gutter-lg pt-space-lg">
          {/* Breadcrumb navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-space-xs text-text-muted font-label-sm text-label-sm mb-space-md">
            <button
              onClick={() => onNavigate('overview')}
              className="hover:text-primary transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">home</span>
              <span>Home</span>
            </button>
            <span className="text-outline-variant">/</span>
            <span className="text-primary font-semibold">News &amp; Publications</span>
          </nav>

          {/* Editorial Intro Block */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-end">
            <div className="lg:col-span-8 space-y-space-sm">
              <div className="inline-flex items-center gap-space-xs px-space-sm py-1 bg-surface-container text-columbia-crown-blue rounded font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                <span className="w-2 h-2 rounded-full bg-secondary"></span>
                Emory School of Nursing &amp; CCC Repository
              </div>
              <h1 className="font-headline-xl text-headline-xl text-primary tracking-tight font-bold">
                News, Research &amp; System Updates
              </h1>
              <p className="font-body-lg text-body-lg text-text-muted max-w-3xl leading-relaxed">
                The latest announcements, clinical informatics research, international conference proceedings,
                and hospital EHR implementations from the Clinical Care Classification System and Emory University School of Nursing.
              </p>
            </div>

            {/* Academic Volume & Status Metrics */}
            <div className="lg:col-span-4 flex items-center lg:justify-end gap-space-md pt-space-sm">
              <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex items-center gap-space-md border border-border-subtle">
                <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-2xl">menu_book</span>
                </div>
                <div>
                  <div className="font-label-sm text-label-sm text-text-muted uppercase tracking-wide">
                    Archival Corpus
                  </div>
                  <div className="font-headline-sm text-headline-sm text-primary font-bold">
                    184 Papers &amp; Notes
                  </div>
                  <div className="font-label-sm text-label-sm text-secondary flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                    Updated Weekly
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search, Taxonomic Filter Pills & RSS Actions */}
          <div className="mt-space-lg bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col gap-space-md border border-border-subtle">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-space-md">
              {/* Live Search Input */}
              <div className="relative flex-1">
                <span className="absolute inset-y-0 left-0 pl-space-md flex items-center pointer-events-none text-text-muted">
                  <span className="material-symbols-outlined text-[20px]">search</span>
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by keyword, author, ontology code, or hospital..."
                  className="w-full pl-10 pr-space-md py-space-xs font-body-md text-body-md bg-surface text-on-surface rounded-lg placeholder-text-muted/70 focus:outline-none focus:bg-surface-container-lowest shadow-inner transition-colors border border-border-subtle"
                />
              </div>

              {/* Utility Buttons */}
              <div className="flex items-center gap-space-xs shrink-0 flex-wrap">
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-space-md py-space-xs rounded-lg bg-columbia-crown-blue hover:bg-primary text-on-primary font-label-md text-label-md shadow-sm transition-all cursor-pointer font-bold shrink-0"
                >
                  <span className="material-symbols-outlined text-[18px]">add_circle</span>
                  <span>Add News Article</span>
                </button>
                <button
                  onClick={() => alert('Syndicated RSS Feed initialized: https://clinicalcareclassification.org/feed.xml')}
                  className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-lg bg-surface hover:bg-surface-container text-on-surface-variant font-label-md text-label-md transition-colors cursor-pointer border border-border-subtle"
                >
                  <span className="material-symbols-outlined text-[18px] text-clinical-alert-red">rss_feed</span>
                  <span>RSS Feed</span>
                </button>
                <a
                  href="#newsletter-dock"
                  className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-lg bg-primary hover:bg-columbia-crown-blue text-on-primary font-label-md text-label-md shadow-sm transition-colors cursor-pointer font-semibold"
                >
                  <span className="material-symbols-outlined text-[18px]">notifications_active</span>
                  <span>Get Email Bulletins</span>
                </a>
              </div>
            </div>

            {/* Filter Chips with Counter Badges */}
            <div className="flex items-center gap-space-xs overflow-x-auto pb-1 text-nowrap scrollbar-none">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-space-md py-1.5 rounded-lg font-label-md text-label-md transition-all cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-primary text-on-primary shadow-sm font-bold'
                    : 'bg-surface text-on-surface-variant hover:bg-surface-container border border-border-subtle'
                }`}
              >
                All Updates ({categoryCounts.all})
              </button>
              <button
                onClick={() => setSelectedCategory('ai')}
                className={`px-space-md py-1.5 rounded-lg font-label-md text-label-md transition-all cursor-pointer ${
                  selectedCategory === 'ai'
                    ? 'bg-primary text-on-primary shadow-sm font-bold'
                    : 'bg-surface text-on-surface-variant hover:bg-surface-container border border-border-subtle'
                }`}
              >
                AI &amp; Informatics ({categoryCounts.ai})
              </button>
              <button
                onClick={() => setSelectedCategory('conferences')}
                className={`px-space-md py-1.5 rounded-lg font-label-md text-label-md transition-all cursor-pointer ${
                  selectedCategory === 'conferences'
                    ? 'bg-primary text-on-primary shadow-sm font-bold'
                    : 'bg-surface text-on-surface-variant hover:bg-surface-container border border-border-subtle'
                }`}
              >
                Conferences &amp; Symposia ({categoryCounts.conferences})
              </button>
              <button
                onClick={() => setSelectedCategory('interviews')}
                className={`px-space-md py-1.5 rounded-lg font-label-md text-label-md transition-all cursor-pointer ${
                  selectedCategory === 'interviews'
                    ? 'bg-primary text-on-primary shadow-sm font-bold'
                    : 'bg-surface text-on-surface-variant hover:bg-surface-container border border-border-subtle'
                }`}
              >
                Interviews &amp; Industry ({categoryCounts.interviews})
              </button>
              <button
                onClick={() => setSelectedCategory('system')}
                className={`px-space-md py-1.5 rounded-lg font-label-md text-label-md transition-all cursor-pointer ${
                  selectedCategory === 'system'
                    ? 'bg-primary text-on-primary shadow-sm font-bold'
                    : 'bg-surface text-on-surface-variant hover:bg-surface-container border border-border-subtle'
                }`}
              >
                System Announcements ({categoryCounts.system})
              </button>
              <button
                onClick={() => setSelectedCategory('publications')}
                className={`px-space-md py-1.5 rounded-lg font-label-md text-label-md transition-all cursor-pointer ${
                  selectedCategory === 'publications'
                    ? 'bg-primary text-on-primary shadow-sm font-bold'
                    : 'bg-surface text-on-surface-variant hover:bg-surface-container border border-border-subtle'
                }`}
              >
                Publications ({categoryCounts.publications})
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Body Content Area */}
      <div className="max-w-7xl mx-auto px-gutter-lg py-space-xl w-full">
        {/* Featured Story Bento Spotlight */}
        <div className="mb-space-xl">
          <div className="flex items-center justify-between mb-space-sm">
            <div className="flex items-center gap-space-xs text-text-muted">
              <span className="material-symbols-outlined text-secondary text-[20px]">star</span>
              <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold text-primary">
                Featured Editorial Spotlight
              </span>
            </div>
            <span className="font-label-sm text-label-sm text-text-muted">Lead Research Note • Fall 2026</span>
          </div>

          <article className="bg-surface-container-lowest rounded-2xl shadow-md overflow-hidden grid grid-cols-1 lg:grid-cols-12 transition-all hover:shadow-xl group border border-border-subtle">
            <div className="lg:col-span-7 p-space-xl flex flex-col justify-between space-y-space-md">
              <div className="space-y-space-sm">
                <div className="flex flex-wrap items-center gap-space-xs">
                  <span className="px-space-xs py-0.5 rounded text-[11px] font-label-sm font-semibold bg-secondary-fixed text-on-secondary-fixed">
                    Mobile Integration
                  </span>
                  <span className="px-space-xs py-0.5 rounded text-[11px] font-label-sm font-semibold bg-surface-container-high text-columbia-crown-blue">
                    Clinical Decision Support
                  </span>
                  <span className="px-space-xs py-0.5 rounded text-[11px] font-label-sm font-semibold bg-surface-container text-on-surface-variant">
                    CCC Tools
                  </span>
                </div>

                <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight font-bold group-hover:text-columbia-crown-blue transition-colors">
                  {featuredArticle.title}
                </h2>

                <div className="flex items-center gap-space-md text-text-muted font-label-sm text-label-sm pt-1">
                  <div className="flex items-center gap-1.5 text-primary font-semibold">
                    <span className="material-symbols-outlined text-[16px] text-secondary">person</span>
                    {featuredArticle.author}
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                    {featuredArticle.date}
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">schedule</span>
                    {featuredArticle.readTime}
                  </div>
                </div>

                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed pt-space-xs">
                  {featuredArticle.summary}
                </p>

                <blockquote className="bg-surface-container-low p-space-md rounded-xl font-body-sm text-body-sm text-columbia-crown-blue italic border-l-4 border-secondary">
                  {featuredArticle.quote}
                </blockquote>
              </div>

              <div className="pt-space-md flex flex-wrap items-center justify-between gap-space-md">
                <button
                  onClick={() => onOpenArticle(featuredArticle)}
                  className="inline-flex items-center gap-space-xs px-space-lg py-space-xs rounded-lg bg-primary hover:bg-columbia-crown-blue text-on-primary font-label-md text-label-md shadow-sm transition-all group-hover:translate-x-0.5 cursor-pointer font-bold"
                >
                  <span>Read Full Interview</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>

                {/* Social Sharing Cluster */}
                <div className="flex items-center gap-space-xs text-text-muted">
                  <span className="font-label-sm text-label-sm mr-1">Share:</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      alert('Article citation link copied!');
                    }}
                    className="w-8 h-8 rounded-lg bg-surface hover:bg-surface-container text-on-surface-variant flex items-center justify-center transition-colors cursor-pointer"
                    title="Copy Link"
                  >
                    <span className="material-symbols-outlined text-[18px]">share</span>
                  </button>
                  <button
                    onClick={() => onOpenArticle(featuredArticle)}
                    className="w-8 h-8 rounded-lg bg-surface hover:bg-surface-container text-on-surface-variant flex items-center justify-center transition-colors cursor-pointer"
                    title="Read Paper"
                  >
                    <span className="material-symbols-outlined text-[18px]">format_quote</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative bg-primary flex flex-col justify-end min-h-[300px] overflow-hidden">
              <img
                className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity group-hover:scale-105 transition-transform duration-500"
                alt="Modern clinical informatics workspace with a nurse reviewing an electronic health record tablet interface"
                src={featuredArticle.imageUrl}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent"></div>

              {/* Tactical Architecture Diagram Inset */}
              <div className="relative z-10 p-space-lg text-on-primary space-y-space-xs">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-secondary text-on-secondary font-label-sm text-label-sm uppercase font-bold">
                    Architecture Spotlight
                  </span>
                  <span className="text-primary-fixed font-code-badge text-code-badge">
                    v2.5 Synapse Engine
                  </span>
                </div>
                <div className="font-headline-sm text-headline-sm text-white font-bold">
                  4-Level Coding Automation
                </div>
                <p className="font-body-sm text-body-sm text-surface-container-highest line-clamp-2">
                  Mapping bedside physiological flowsheets directly to 21 Care Components and standardized nursing outcome indicators.
                </p>
              </div>
            </div>
          </article>
        </div>

        {/* Asymmetric 2-Column: Main Article Stream (8 cols) + Rich Academic Utilities Sidebar (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-start">
          {/* Primary Chronological Stream */}
          <section className="lg:col-span-8 space-y-space-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-space-xs">
              <h2 className="font-headline-md text-headline-md text-primary tracking-tight font-bold">
                Recent Dispatches &amp; Proceedings
              </h2>
              <div className="flex items-center gap-space-sm">
                <span className="font-label-sm text-label-sm text-text-muted">
                  Showing {filteredArticles.length} of {articles.length} dispatches
                </span>
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-space-sm py-1 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary border border-border-subtle font-label-sm text-label-sm font-semibold transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">add</span>
                  <span>Add Article</span>
                </button>
              </div>
            </div>

            {filteredArticles.length === 0 ? (
              <div className="bg-surface-container-lowest p-space-xl rounded-xl text-center border border-border-subtle text-text-muted">
                <span className="material-symbols-outlined text-4xl mb-2 text-text-muted">search_off</span>
                <p className="font-semibold text-primary">No articles found matching "{searchQuery}"</p>
                <p className="text-xs mt-1">Try searching for other topics like "AI", "EHR", "LOINC", or clear your filter.</p>
              </div>
            ) : (
              filteredArticles.map((article) => (
                <article
                  key={article.id}
                  className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm hover:shadow-md transition-shadow border border-border-subtle flex flex-col justify-between"
                >
                  <div className="flex flex-col sm:flex-row gap-space-md items-start">
                    {article.imageUrl && (
                      <div className="w-full sm:w-40 h-28 rounded-lg overflow-hidden shrink-0 border border-border-subtle bg-surface">
                        <img
                          src={article.imageUrl}
                          alt={article.title}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-space-xs">
                        <div className="flex flex-wrap items-center gap-space-xs">
                          {article.id.startsWith('custom-news-') && (
                            <span className="px-space-xs py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 uppercase tracking-wider border border-emerald-200">
                              User Published
                            </span>
                          )}
                          {article.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-space-xs py-0.5 rounded text-[11px] font-label-sm font-semibold bg-surface-container text-primary"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-1.5 text-text-muted font-label-sm text-label-sm shrink-0">
                          <span className="material-symbols-outlined text-[15px]">calendar_today</span>
                          <span>{article.date}</span>
                        </div>
                      </div>

                      <h3 className="font-headline-sm text-headline-sm text-primary hover:text-secondary transition-colors mb-space-xs font-bold">
                        <button
                          onClick={() => onOpenArticle(article)}
                          className="text-left cursor-pointer hover:underline"
                        >
                          {article.title}
                        </button>
                      </h3>

                      <p className="font-body-md text-body-md text-text-muted mb-space-sm leading-relaxed line-clamp-2">
                        {article.summary}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-space-xs border-t border-border-subtle/60 mt-space-sm">
                    <div className="flex items-center gap-space-xs text-text-muted font-label-sm text-label-sm">
                      <span className="material-symbols-outlined text-[16px] text-secondary">edit_note</span>
                      <span>By <strong>{article.author}</strong></span>
                    </div>

                    <div className="flex items-center gap-space-sm">
                      {article.id.startsWith('custom-news-') && (
                        <button
                          onClick={() => handleDeleteArticle(article.id)}
                          className="text-xs text-text-muted hover:text-clinical-alert-red transition-colors p-1 rounded hover:bg-surface-container flex items-center gap-1 cursor-pointer"
                          title="Delete article"
                        >
                          <span className="material-symbols-outlined text-[16px]">delete</span>
                          <span className="hidden sm:inline">Delete</span>
                        </button>
                      )}
                      <button
                        onClick={() => onOpenArticle(article)}
                        className="inline-flex items-center gap-1 text-primary hover:text-secondary font-label-md text-label-md transition-colors font-semibold cursor-pointer"
                      >
                        <span>Read Dispatch</span>
                        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                      </button>
                    </div>
                  </div>
                </article>
              ))
            )}

            {/* Academic Pagination Strip */}
            <nav aria-label="Pagination" className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-space-md mt-space-lg border border-border-subtle">
              <div className="font-label-sm text-label-sm text-text-muted">
                Viewing Page <strong className="text-primary">1</strong> of <strong>6</strong> ({filteredArticles.length} of 48 updates)
              </div>
              <div className="flex items-center gap-space-xs">
                <button className="w-9 h-9 rounded-lg bg-primary text-on-primary font-label-md text-label-md flex items-center justify-center shadow-sm font-bold cursor-pointer">
                  1
                </button>
                <button className="w-9 h-9 rounded-lg bg-surface text-on-surface hover:bg-surface-container font-label-md text-label-md flex items-center justify-center transition-colors cursor-pointer">
                  2
                </button>
                <button className="w-9 h-9 rounded-lg bg-surface text-on-surface hover:bg-surface-container font-label-md text-label-md flex items-center justify-center transition-colors cursor-pointer">
                  3
                </button>
                <span className="px-1 text-text-muted">...</span>
                <button className="px-space-md h-9 rounded-lg bg-surface text-on-surface hover:bg-surface-container font-label-md text-label-md inline-flex items-center gap-1 transition-colors cursor-pointer">
                  <span>Next</span>
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </button>
              </div>
              <button
                onClick={onOpenTerminology}
                className="font-label-sm text-label-sm text-columbia-crown-blue hover:text-primary underline flex items-center gap-1 cursor-pointer"
              >
                <span>Explore Terminology Archive</span>
                <span className="material-symbols-outlined text-[14px]">archive</span>
              </button>
            </nav>
          </section>

          {/* Sidebar / Scholarly Resource Hub */}
          <aside className="lg:col-span-4 space-y-space-lg">
            {/* Widget: Upcoming Nursing Informatics Conferences */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm space-y-space-md border border-border-subtle">
              <div className="flex items-center justify-between">
                <h3 className="font-headline-sm text-headline-sm text-primary flex items-center gap-space-xs font-bold">
                  <span className="material-symbols-outlined text-columbia-crown-blue text-[20px]">event_note</span>
                  Conferences
                </h3>
                <span className="px-space-xs py-0.5 rounded text-[10px] font-label-sm font-bold bg-surface-container text-text-muted uppercase">
                  Calendar
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-text-muted">
                Connect with CCC researchers and advisory board fellows at upcoming international symposia:
              </p>
              <div className="space-y-space-sm">
                {UPCOMING_CONFERENCES.map((conf, idx) => (
                  <div key={idx} className="bg-surface p-space-sm rounded-lg hover:bg-surface-container-low transition-colors border border-border-subtle">
                    <div className="flex items-center justify-between mb-1">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-label-sm font-semibold ${conf.badgeColor}`}>
                        {conf.month}
                      </span>
                      <span className="font-label-sm text-[11px] text-text-muted">{conf.location}</span>
                    </div>
                    <h4 className="font-label-md text-label-md text-primary font-semibold block">
                      {conf.title}
                    </h4>
                    <span className="font-body-sm text-[12px] text-text-muted block mt-0.5">
                      {conf.host}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Widget: Newsletter & Alert Subscription Dock */}
            <div
              className="bg-primary text-on-primary p-space-lg rounded-xl shadow-md space-y-space-md relative overflow-hidden"
              id="newsletter-dock"
            >
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-columbia-crown-blue/40 rounded-full blur-xl pointer-events-none"></div>
              <div className="space-y-space-xs relative z-10">
                <div className="flex items-center gap-space-xs text-secondary-fixed">
                  <span className="material-symbols-outlined text-[20px]">mail</span>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                    Scholarly Dispatch
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-white font-bold">
                  Monthly Terminology Updates
                </h3>
                <p className="font-body-sm text-body-sm text-surface-container leading-relaxed">
                  Receive updates on code modifications, LOINC &amp; SNOMED CT release maps, and curated informatics publications directly in your inbox.
                </p>
              </div>

              {subscribeSuccess ? (
                <div className="p-space-sm rounded-lg bg-emerald-700/80 text-white text-xs flex items-center gap-2 border border-emerald-500">
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                  <span>Thank you! You are subscribed to Clinical Care Classification bulletins.</span>
                </div>
              ) : (
                <form className="space-y-space-xs relative z-10" onSubmit={handleSubscribe}>
                  <label className="sr-only" htmlFor="subEmail">Work Email</label>
                  <input
                    id="subEmail"
                    type="email"
                    required
                    value={subscribedEmail}
                    onChange={(e) => setSubscribedEmail(e.target.value)}
                    placeholder="clinical.director@hospital.org"
                    className="w-full px-space-md py-space-xs rounded-lg font-body-sm text-body-sm text-on-surface bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary-fixed"
                  />
                  <button
                    type="submit"
                    className="w-full py-space-xs px-space-md rounded-lg bg-secondary hover:bg-opacity-90 text-on-secondary font-label-md text-label-md shadow-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer font-bold"
                  >
                    <span>Subscribe to Bulletins</span>
                    <span className="material-symbols-outlined text-[16px]">done</span>
                  </button>
                  <div className="text-[11px] font-label-sm text-surface-container-highest/80 text-center pt-1">
                    Zero marketing spam. Unsubscribe anytime.
                  </div>
                </form>
              )}
            </div>

            {/* Widget: Submit Research or Case Study */}
            <div className="bg-surface-container p-space-lg rounded-xl shadow-sm space-y-space-sm border border-border-subtle">
              <div className="flex items-center gap-space-xs text-columbia-crown-blue">
                <span className="material-symbols-outlined text-[20px]">upload_file</span>
                <span className="font-label-sm text-label-sm uppercase tracking-wide font-semibold">
                  Peer Contributions
                </span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
                Submit Implementation Data
              </h3>
              <p className="font-body-sm text-body-sm text-text-muted leading-relaxed">
                Are you utilizing CCC codes in bedside flowsheets, mobile apps, or clinical trial documentation?
                Share your findings with the international informatics community.
              </p>
              <button
                onClick={() => onNavigate('about')}
                className="inline-flex items-center gap-1 font-label-md text-label-md text-primary font-semibold hover:text-secondary pt-1 cursor-pointer"
              >
                <span>Review Submission Guidelines</span>
                <span className="material-symbols-outlined text-[16px]">arrow_right_alt</span>
              </button>
            </div>

            {/* Widget: Quick Download Resources */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm space-y-space-md border border-border-subtle">
              <div className="flex items-center justify-between">
                <h3 className="font-headline-sm text-headline-sm text-primary flex items-center gap-space-xs font-bold">
                  <span className="material-symbols-outlined text-secondary text-[20px]">folder_zip</span>
                  Terminology Files
                </h3>
                <span className="font-label-sm text-label-sm text-secondary font-semibold">
                  Free Open Access
                </span>
              </div>
              <ul className="space-y-space-xs font-body-sm text-body-sm">
                <li>
                  <button
                    onClick={() => alert('Downloading CCC v2.5 Crosswalk Table (.xlsx)...')}
                    className="w-full text-left p-space-xs rounded-lg hover:bg-surface flex items-center justify-between text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px] text-text-muted">table_chart</span>
                      <span>CCC v2.5 Crosswalk Table (.xlsx)</span>
                    </div>
                    <span className="material-symbols-outlined text-[16px] text-text-muted">download</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => alert('Downloading SNOMED CT & LOINC Map Set...')}
                    className="w-full text-left p-space-xs rounded-lg hover:bg-surface flex items-center justify-between text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px] text-text-muted">swap_horiz</span>
                      <span>SNOMED CT &amp; LOINC Map Set</span>
                    </div>
                    <span className="material-symbols-outlined text-[16px] text-text-muted">download</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={onOpenTerminology}
                    className="w-full text-left p-space-xs rounded-lg hover:bg-surface flex items-center justify-between text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px] text-text-muted">code</span>
                      <span>REST API &amp; JSON-LD Schemas</span>
                    </div>
                    <span className="material-symbols-outlined text-[16px] text-text-muted">open_in_new</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('framework')}
                    className="w-full text-left p-space-xs rounded-lg hover:bg-surface flex items-center justify-between text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px] text-text-muted">account_tree</span>
                      <span>21 Care Components Reference Guide</span>
                    </div>
                    <span className="material-symbols-outlined text-[16px] text-text-muted">picture_as_pdf</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Academic Citation Block */}
            <div className="p-space-md rounded-xl bg-surface-container-low text-text-muted space-y-space-xs border border-border-subtle">
              <div className="font-label-sm text-label-sm uppercase font-semibold text-columbia-crown-blue">
                Preferred Citation
              </div>
              <p className="font-body-sm text-[12px] leading-relaxed text-on-surface-variant">
                Bakken, S., Wolpin, S., &amp; Saba, V. K. (2026). <em>Clinical Care Classification (CCC) System: Release 2.5</em>.
                Emory University School of Nursing. DOI: 10.7916/d8-ccc-2026.
              </p>
            </div>
          </aside>
        </div>
      </div>

      {/* Add News & Publications Modal */}
      <AddNewsModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddArticle={handleAddArticle}
      />

      {/* Published Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl bg-primary text-on-primary shadow-2xl border border-white/20 animate-bounce">
          <span className="material-symbols-outlined text-[20px] text-secondary-fixed">check_circle</span>
          <span className="font-label-md text-label-md">{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
