import React from 'react';
import { NewsArticle } from '../data/cccData';

interface ArticleModalProps {
  article: NewsArticle | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose }) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 bg-primary/40 backdrop-blur-sm flex items-center justify-center p-gutter">
      <div className="bg-surface-card rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[88vh] border border-border-subtle">
        {/* Header */}
        <div className="p-space-lg bg-surface-container-low border-b border-border-subtle flex items-start justify-between gap-space-md">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-space-xs">
              {article.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-space-xs py-0.5 rounded text-[11px] font-label-sm font-semibold bg-surface-container-high text-columbia-crown-blue"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="font-headline-md text-headline-md text-primary font-bold tracking-tight">
              {article.title}
            </h2>
            <div className="flex items-center gap-space-sm text-text-muted font-label-sm text-[12px] pt-1">
              <span>By {article.author}</span>
              <span>•</span>
              <span>{article.date}</span>
              <span>•</span>
              <span>{article.readTime}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-text-muted hover:text-primary hover:bg-surface-container transition-colors cursor-pointer shrink-0"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-space-lg overflow-y-auto space-y-space-md text-on-surface">
          {article.imageUrl && (
            <div className="rounded-xl overflow-hidden shadow-sm mb-space-md max-h-72">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          {article.quote && (
            <blockquote className="bg-surface-container-low p-space-md rounded-xl font-body-md text-columbia-crown-blue italic border-l-4 border-secondary leading-relaxed">
              {article.quote}
            </blockquote>
          )}

          <p className="font-body-lg text-body-lg text-text-primary font-medium leading-relaxed">
            {article.summary}
          </p>

          <div className="space-y-space-md font-body-md text-on-surface-variant leading-relaxed">
            {article.fullContent.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="p-space-md rounded-xl bg-surface-container-low border border-border-subtle mt-space-lg">
            <div className="text-[11px] font-bold uppercase text-columbia-crown-blue tracking-wide mb-1">
              Informatics Reference Notes
            </div>
            <p className="text-xs text-text-muted leading-relaxed">
              Clinical Care Classification (CCC) System Release 2.5 is maintained under the academic stewardship of Columbia University School of Nursing. Published for nursing professionals, hospital EHR developers, and healthcare research scientists worldwide.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-space-md bg-surface-container-low border-t border-border-subtle flex items-center justify-between">
          <span className="text-xs text-text-muted">Clinical Care Classification Library</span>
          <button
            onClick={onClose}
            className="px-space-md py-1.5 rounded-lg bg-primary text-on-primary font-label-sm font-semibold hover:bg-columbia-crown-blue transition-colors cursor-pointer"
          >
            Close Article
          </button>
        </div>
      </div>
    </div>
  );
};
