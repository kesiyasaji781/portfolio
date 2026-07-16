import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Download, FileText, Image } from 'lucide-react';

export default function DocViewer({ url, title, onClose }) {
  if (!url) return null;

  const isPdf = url.toLowerCase().endsWith('.pdf') || url.includes('/resumes/') || url.includes('type=pdf');

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/85 backdrop-blur-md">
        {/* Backdrop overlay click handler */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 cursor-zoom-out"
          onClick={onClose}
        />

        {/* Modal Content Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 250 }}
          className="relative w-full max-w-4xl rounded-3xl border border-white/10 bg-neutral-900/80 dark:bg-zinc-950/80 backdrop-blur-xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/5">
            <div className="flex items-center gap-3">
              {isPdf ? (
                <FileText className="w-5 h-5 text-accentBlue" />
              ) : (
                <Image className="w-5 h-5 text-accentPurple" />
              )}
              <h3 className="text-base sm:text-lg font-bold text-white truncate max-w-[200px] sm:max-w-md">
                {title || 'Document Preview'}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-red-500/25 hover:border-red-500/40 text-neutral-400 hover:text-white transition-all cursor-pointer"
              aria-label="Close Preview"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body Viewer */}
          <div className="flex-1 p-4 overflow-auto flex items-center justify-center bg-neutral-950/40 min-h-[50vh]">
            {isPdf ? (
              <iframe
                src={`${url}#toolbar=0`}
                className="w-full h-[65vh] border-0 rounded-2xl bg-neutral-900 shadow-inner"
                title={title}
              />
            ) : (
              <img
                src={url}
                alt={title}
                className="max-w-full max-h-[65vh] object-contain rounded-2xl shadow-xl border border-white/5"
              />
            )}
          </div>

          {/* Footer Actions */}
          <div className="flex flex-wrap items-center justify-end gap-3 px-6 py-4 border-t border-white/5 bg-white/5">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium rounded-xl border border-white/10 bg-white/5 text-neutral-200 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" />
              Open in New Tab
            </a>
            <a
              href={url}
              download
              className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium rounded-xl text-white bg-gradient-to-r from-accentPurple to-accentBlue hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-lg shadow-accentPurple/15"
            >
              <Download className="w-4 h-4" />
              Download
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
