import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Upload, Plus, FileText, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

const colorPresets = [
  { name: 'Purple-Pink', value: 'from-purple-500/10 to-pink-500/10 hover:border-purple-500/30' },
  { name: 'Blue-Cyan', value: 'from-blue-500/10 to-cyan-500/10 hover:border-blue-500/30' },
  { name: 'Amber-Orange', value: 'from-amber-500/10 to-orange-500/10 hover:border-amber-500/30' },
  { name: 'Emerald-Teal', value: 'from-emerald-500/10 to-teal-500/10 hover:border-emerald-500/30' },
];

export default function UploadDashboard({ isOpen, onClose, onRefreshData }) {
  const [passcode, setPasscode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passcodeError, setPasscodeError] = useState(false);
  const [activeTab, setActiveTab] = useState('resume');

  // Resume Upload Form state
  const [resumeTitle, setResumeTitle] = useState('My Resume');
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeUploading, setResumeUploading] = useState(false);
  const [resumeSuccess, setResumeSuccess] = useState(false);
  const [resumeError, setResumeError] = useState('');

  // Certification Form state
  const [certTitle, setCertTitle] = useState('');
  const [certIssuer, setCertIssuer] = useState('');
  const [certId, setCertId] = useState('');
  const [certDate, setCertDate] = useState('');
  const [certLink, setCertLink] = useState('');
  const [certFile, setCertFile] = useState(null);
  const [certColor, setCertColor] = useState(colorPresets[0].value);
  const [certUploading, setCertUploading] = useState(false);
  const [certSuccess, setCertSuccess] = useState(false);
  const [certError, setCertError] = useState('');

  if (!isOpen) return null;

  const handleUnlock = (e) => {
    e.preventDefault();
    if (passcode === 'admin123') {
      setIsUnlocked(true);
      setPasscodeError(false);
    } else {
      setPasscodeError(true);
      setPasscode('');
    }
  };

  const handleResumeUpload = async (e) => {
    e.preventDefault();
    if (!resumeFile) {
      setResumeError('Please select a resume file.');
      return;
    }

    setResumeUploading(true);
    setResumeError('');
    setResumeSuccess(false);

    const formData = new FormData();
    formData.append('file', resumeFile);
    formData.append('title', resumeTitle);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/resume/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Resume upload failed.');
      }

      setResumeSuccess(true);
      setResumeFile(null);
      // Trigger update on home page
      if (onRefreshData) onRefreshData();
    } catch (err) {
      setResumeError(err.message || 'Something went wrong.');
    } finally {
      setResumeUploading(false);
    }
  };

  const handleCertUpload = async (e) => {
    e.preventDefault();
    if (!certTitle || !certIssuer || !certDate) {
      setCertError('Title, Issuer, and Date are required.');
      return;
    }

    setCertUploading(true);
    setCertError('');
    setCertSuccess(false);

    const formData = new FormData();
    formData.append('title', certTitle);
    formData.append('issuer', certIssuer);
    formData.append('credential_id', certId);
    formData.append('date', certDate);
    formData.append('verify_link', certLink);
    formData.append('color', certColor);
    if (certFile) {
      formData.append('file', certFile);
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/certifications/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to create certification.');
      }

      setCertSuccess(true);
      // Reset form fields
      setCertTitle('');
      setCertIssuer('');
      setCertId('');
      setCertDate('');
      setCertLink('');
      setCertFile(null);
      // Trigger update on home page
      if (onRefreshData) onRefreshData();
    } catch (err) {
      setCertError(err.message || 'Something went wrong.');
    } finally {
      setCertUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-md">
      {/* Backdrop */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

      {/* Main Panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-lg rounded-3xl border border-neutral-200/20 dark:border-white/10 bg-white dark:bg-zinc-950 p-6 sm:p-8 shadow-2xl z-10 overflow-hidden text-neutral-800 dark:text-neutral-200 max-h-[90vh] flex flex-col"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-white/5 border border-transparent hover:border-neutral-200 dark:hover:border-white/10 transition-all cursor-pointer"
        >
          <X className="w-4 h-4 text-neutral-400" />
        </button>

        {/* Lock Screen */}
        <AnimatePresence mode="wait">
          {!isUnlocked ? (
            <motion.div
              key="lock"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center justify-center py-8"
            >
              <div className="p-4 bg-accentPurple/10 text-accentPurple rounded-2xl mb-4">
                <Lock className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold mb-2">Admin Security</h2>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6 text-center max-w-xs">
                Please enter the passcode to access the resume and certification upload dashboard.
              </p>

              <form onSubmit={handleUnlock} className="w-full max-w-xs flex flex-col gap-3">
                <input
                  type="password"
                  placeholder="Enter passcode..."
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-white/10 bg-neutral-50 dark:bg-white/5 focus:outline-none focus:border-accentPurple text-center font-mono tracking-widest text-lg"
                  autoFocus
                />
                {passcodeError && (
                  <p className="text-xs text-red-500 text-center flex items-center justify-center gap-1">
                    <AlertCircle className="w-3 h-3" /> Incorrect passcode. Try 'admin123'
                  </p>
                )}
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl font-medium text-white bg-gradient-to-r from-accentPurple to-accentBlue cursor-pointer hover:scale-105 active:scale-95 transition-all shadow-lg shadow-accentPurple/20 mt-2"
                >
                  Verify Access
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col flex-1"
            >
              <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
                <Upload className="w-5 h-5 text-accentPurple" />
                Upload Center
              </h2>

              {/* Navigation Tabs */}
              <div className="flex gap-2 p-1 bg-neutral-100 dark:bg-white/5 rounded-xl mb-6">
                <button
                  onClick={() => setActiveTab('resume')}
                  className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all cursor-pointer ${
                    activeTab === 'resume'
                      ? 'bg-white dark:bg-zinc-900 shadow-md text-accentPurple'
                      : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-800'
                  }`}
                >
                  Resume
                </button>
                <button
                  onClick={() => setActiveTab('cert')}
                  className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all cursor-pointer ${
                    activeTab === 'cert'
                      ? 'bg-white dark:bg-zinc-900 shadow-md text-accentPurple'
                      : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-800'
                  }`}
                >
                  Certification
                </button>
              </div>

              {/* Form Areas */}
              <div className="flex-1 overflow-auto pr-1">
                {activeTab === 'resume' ? (
                  <form onSubmit={handleResumeUpload} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">Resume Display Name</label>
                      <input
                        type="text"
                        value={resumeTitle}
                        onChange={(e) => setResumeTitle(e.target.value)}
                        className="px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-white/10 bg-neutral-50 dark:bg-white/5 focus:outline-none focus:border-accentPurple text-sm"
                        placeholder="e.g. My Resume"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 font-mono">Select PDF File</label>
                      <div className="border-2 border-dashed border-neutral-300 dark:border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center bg-neutral-50 dark:bg-white/5 hover:bg-neutral-100/50 hover:border-accentPurple/50 transition-all relative">
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={(e) => setResumeFile(e.target.files[0])}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <FileText className="w-8 h-8 text-neutral-400 mb-2" />
                        <span className="text-xs text-neutral-500 text-center truncate max-w-full">
                          {resumeFile ? resumeFile.name : 'Drag & drop or click to upload resume (PDF only)'}
                        </span>
                      </div>
                    </div>

                    {resumeSuccess && (
                      <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 shrink-0" /> Resume uploaded successfully and set active!
                      </div>
                    )}

                    {resumeError && (
                      <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-500 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" /> {resumeError}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={resumeUploading}
                      className="w-full py-3.5 rounded-xl font-medium text-white bg-gradient-to-r from-accentPurple to-accentBlue cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all shadow-lg flex items-center justify-center gap-2"
                    >
                      {resumeUploading ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" /> Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4" /> Set Active Resume
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleCertUpload} className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5 text-left col-span-2">
                        <label className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">Certification Name</label>
                        <input
                          type="text"
                          value={certTitle}
                          onChange={(e) => setCertTitle(e.target.value)}
                          className="px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-white/10 bg-neutral-50 dark:bg-white/5 focus:outline-none focus:border-accentPurple text-sm"
                          placeholder="e.g. AWS Certified Solutions Architect"
                          required
                        />
                      </div>

                      <div className="flex flex-col gap-1.5 text-left">
                        <label className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">Issuer / Organization</label>
                        <input
                          type="text"
                          value={certIssuer}
                          onChange={(e) => setCertIssuer(e.target.value)}
                          className="px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-white/10 bg-neutral-50 dark:bg-white/5 focus:outline-none focus:border-accentPurple text-sm"
                          placeholder="e.g. Amazon Web Services"
                          required
                        />
                      </div>

                      <div className="flex flex-col gap-1.5 text-left">
                        <label className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">Date Issued</label>
                        <input
                          type="text"
                          value={certDate}
                          onChange={(e) => setCertDate(e.target.value)}
                          className="px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-white/10 bg-neutral-50 dark:bg-white/5 focus:outline-none focus:border-accentPurple text-sm"
                          placeholder="e.g. Issued 2025"
                          required
                        />
                      </div>

                      <div className="flex flex-col gap-1.5 text-left">
                        <label className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">Credential ID</label>
                        <input
                          type="text"
                          value={certId}
                          onChange={(e) => setCertId(e.target.value)}
                          className="px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-white/10 bg-neutral-50 dark:bg-white/5 focus:outline-none focus:border-accentPurple text-sm"
                          placeholder="e.g. AWS-12345 (Optional)"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5 text-left">
                        <label className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">Verification URL</label>
                        <input
                          type="url"
                          value={certLink}
                          onChange={(e) => setCertLink(e.target.value)}
                          className="px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-white/10 bg-neutral-50 dark:bg-white/5 focus:outline-none focus:border-accentPurple text-sm"
                          placeholder="https://..."
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">Upload Certificate File (PDF / Image)</label>
                      <div className="border-2 border-dashed border-neutral-300 dark:border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center bg-neutral-50 dark:bg-white/5 hover:bg-neutral-100/50 hover:border-accentPurple/50 transition-all relative">
                        <input
                          type="file"
                          accept=".pdf, image/*"
                          onChange={(e) => setCertFile(e.target.files[0])}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <Upload className="w-6 h-6 text-neutral-400 mb-1" />
                        <span className="text-xs text-neutral-500 text-center truncate max-w-full">
                          {certFile ? certFile.name : 'Select file (Optional)'}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">Card Color Style Theme</label>
                      <div className="grid grid-cols-2 gap-2">
                        {colorPresets.map((preset) => (
                          <button
                            key={preset.name}
                            type="button"
                            onClick={() => setCertColor(preset.value)}
                            className={`py-2 px-3 text-xs rounded-xl border text-center transition-all cursor-pointer ${
                              certColor === preset.value
                                ? 'border-accentPurple text-accentPurple bg-accentPurple/5 font-semibold'
                                : 'border-neutral-200 dark:border-white/10 text-neutral-500 hover:text-neutral-800 dark:hover:text-white'
                            }`}
                          >
                            {preset.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {certSuccess && (
                      <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 shrink-0" /> Certification created successfully!
                      </div>
                    )}

                    {certError && (
                      <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-500 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" /> {certError}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={certUploading}
                      className="w-full py-3.5 rounded-xl font-medium text-white bg-gradient-to-r from-accentPurple to-accentBlue cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all shadow-lg flex items-center justify-center gap-2 mt-2"
                    >
                      {certUploading ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" /> Saving...
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" /> Create Certification
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
