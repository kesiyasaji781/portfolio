import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Send, Copy, Check, MessageSquare } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';
import confetti from 'canvas-confetti';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedField, setCopiedField] = useState(null);

  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email address';
    }
    if (!formData.message.trim()) errors.message = 'Message is required';
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);

    // Simulate sending network request
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Trigger premium interactive confetti celebration!
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#8b5cf6', '#3b82f6', '#ec4899']
      });

      // Reset form
      setFormData({ name: '', email: '', message: '' });
      alert('Message sent successfully! Thank you for reaching out.');
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-neutral-900/5 dark:bg-black/10">
      {/* Background radial soft lights */}
      <div className="absolute left-1/4 bottom-0 w-[500px] h-[500px] bg-accentPurple/5 blur-[150px] pointer-events-none" />
      <div className="absolute right-1/4 top-0 w-[400px] h-[400px] bg-accentBlue/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white"
          >
            Get In <span className="bg-clip-text text-transparent bg-gradient-to-r from-accentPurple to-accentBlue text-glow-purple">Touch</span>
          </motion.h2>
          <div className="w-16 h-1 bg-gradient-to-r from-accentPurple to-accentBlue mx-auto mt-4 rounded-full" />
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-stretch">
          
          {/* Left Column: Contact details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 glass-card rounded-3xl p-8 border border-white/5 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
                Let's Build Something Together
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-8 font-light leading-relaxed">
                Whether you have an interesting project idea, are looking for an enthusiastic AI/ML intern, or just want to connect, feel free to drop a message or reach out via phone/email.
              </p>

              {/* Action Contact Cards */}
              <div className="flex flex-col gap-4">
                {/* Email Card */}
                <div 
                  onClick={() => copyToClipboard('kesiyasaji781@gmail.com', 'email')}
                  className="flex items-center justify-between p-4 rounded-2xl bg-white/10 dark:bg-white/5 border border-white/5 hover:border-accentPurple/30 cursor-pointer group transition-all duration-300"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-accentPurple">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">Email Address</p>
                      <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">kesiyasaji781@gmail.com</p>
                    </div>
                  </div>
                  <button className="text-neutral-400 hover:text-accentPurple p-1 rounded-lg">
                    {copiedField === 'email' ? <Check className="w-4 h-4 text-emerald-500 animate-bounce" /> : <Copy className="w-4 h-4 group-hover:scale-105" />}
                  </button>
                </div>

                {/* Phone Card */}
                <div 
                  onClick={() => copyToClipboard('+918301968218', 'phone')}
                  className="flex items-center justify-between p-4 rounded-2xl bg-white/10 dark:bg-white/5 border border-white/5 hover:border-accentBlue/30 cursor-pointer group transition-all duration-300"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-accentBlue">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">Mobile Number</p>
                      <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">+91 8301968218</p>
                    </div>
                  </div>
                  <button className="text-neutral-400 hover:text-accentBlue p-1 rounded-lg">
                    {copiedField === 'phone' ? <Check className="w-4 h-4 text-emerald-500 animate-bounce" /> : <Copy className="w-4 h-4 group-hover:scale-105" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Social Grid */}
            <div className="mt-8 border-t border-neutral-200 dark:border-white/5 pt-6">
              <p className="text-xs font-mono text-neutral-500 dark:text-neutral-400 mb-4 text-left">Find me on social media</p>
              <div className="flex gap-4">
                <a
                  href="https://github.com/kesiyasaji781"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border border-neutral-300 dark:border-white/10 bg-neutral-100/50 dark:bg-white/5 text-neutral-700 dark:text-neutral-300 hover:bg-accentPurple/10 hover:text-accentPurple dark:hover:text-purple-400 hover:border-accentPurple/30 transition-all duration-300"
                >
                  <FaGithub className="w-4 h-4" />
                  <span className="text-sm font-medium">GitHub</span>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border border-neutral-300 dark:border-white/10 bg-neutral-100/50 dark:bg-white/5 text-neutral-700 dark:text-neutral-300 hover:bg-accentBlue/10 hover:text-accentBlue dark:hover:text-sky-400 hover:border-accentBlue/30 transition-all duration-300"
                >
                  <FaLinkedin className="w-4 h-4" />
                  <span className="text-sm font-medium">LinkedIn</span>
                </a>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Message Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 glass-card rounded-3xl p-8 border border-white/5 flex flex-col"
          >
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-6 text-left flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-accentPurple" /> Send a Message
            </h3>

            <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-5 text-left">
              {/* Name Field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono text-neutral-500 dark:text-neutral-400">Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`px-4 py-3 rounded-xl border bg-neutral-100/50 dark:bg-white/5 text-neutral-800 dark:text-neutral-200 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-accentPurple transition-colors duration-200 ${
                    formErrors.name ? 'border-red-500 focus:ring-red-500' : 'border-neutral-300 dark:border-white/10'
                  }`}
                />
                {formErrors.name && <span className="text-xs text-red-500 font-mono mt-0.5">{formErrors.name}</span>}
              </div>

              {/* Email Field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono text-neutral-500 dark:text-neutral-400">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`px-4 py-3 rounded-xl border bg-neutral-100/50 dark:bg-white/5 text-neutral-800 dark:text-neutral-200 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-accentPurple transition-colors duration-200 ${
                    formErrors.email ? 'border-red-500 focus:ring-red-500' : 'border-neutral-300 dark:border-white/10'
                  }`}
                />
                {formErrors.email && <span className="text-xs text-red-500 font-mono mt-0.5">{formErrors.email}</span>}
              </div>

              {/* Message Field */}
              <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-xs font-mono text-neutral-500 dark:text-neutral-400">Message</label>
                <textarea
                  rows="4"
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`px-4 py-3 rounded-xl border bg-neutral-100/50 dark:bg-white/5 text-neutral-800 dark:text-neutral-200 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-accentPurple transition-colors duration-200 resize-none flex-1 min-h-[120px] ${
                    formErrors.message ? 'border-red-500 focus:ring-red-500' : 'border-neutral-300 dark:border-white/10'
                  }`}
                />
                {formErrors.message && <span className="text-xs text-red-500 font-mono mt-0.5">{formErrors.message}</span>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 w-full py-4 rounded-xl text-white font-medium bg-gradient-to-r from-accentPurple to-accentBlue shadow-lg shadow-accentPurple/15 hover:shadow-accentPurple/25 hover:scale-102 active:scale-98 transition-all duration-300 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                ) : (
                  <>
                    <Send className="w-4.5 h-4.5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
