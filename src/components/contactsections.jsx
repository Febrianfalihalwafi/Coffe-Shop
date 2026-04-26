"use client";

import { motion } from "framer-motion";
import { useState } from "react";

<<<<<<< HEAD
// Easing & timing persis seperti Hero
=======
// 🎯 Easing & timing persis seperti Hero
>>>>>>> dbf93039bff7ee776a341311335251917a043ddf
const modernEase = [0.22, 1, 0.36, 1];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3, ease: modernEase },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: modernEase },
  },
};

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    type: "general",
  });
  const [status, setStatus] = useState("idle"); // idle, submitting, success, error
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const FORMSPREE_ENDPOINT = "https://formspree.io/f/mgorzvon";

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: `[${formData.type.toUpperCase()}] ${formData.subject}`,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          type: "general",
        });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        throw new Error("Failed to send message");
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        "Something went wrong. Please try again or email us directly.",
      );
    }
  };

  const contactMethods = [
    {
      icon: "✉️",
      title: "Email Us",
      value: "hello@coffeetelkom.id",
      link: "mailto:hello@coffeetelkom.id",
      desc: "We respond within 24 hours",
    },
    {
      icon: "📍",
      title: "Visit Us",
      value: "Telkom Innovation Center, Bandung",
      link: "https://maps.app.goo.gl/3eJmX2JTsYLEREbHA",
      desc: "Open daily • 8AM - 8PM",
    },
    {
      icon: "📱",
      title: "Instagram",
      value: "@coffeetelkom",
      link: "https://instagram.com/coffeetelkom",
      desc: "DM us for quick questions",
    },
  ];

  return (
    <section className="relative w-full py-20 md:py-32 bg-[#faf7f3] overflow-hidden">
      {/* 🔹 Background Layer */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1510626176961-4b37d0d4d5c3?auto=format&fit=crop&w=1600&q=80"
          alt="Coffee cup"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#faf7f3]/90 via-[#faf7f3]/50 to-[#faf7f3]/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(43,32,24,0.2)_100%)]" />
      </div>

      {/* 🔹 Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-16"
        >
          {/* Header */}
          <div className="text-center space-y-6">
            <motion.div variants={itemVariants}></motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-3xl lg:text-5xl font-light uppercase tracking-[0.25em] text-[#2c231a] leading-tight"
            >
              Let's Start a <br />
              <span className="font-semibold text-[#7a5e3a]">Conversation</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="max-w-2xl mx-auto text-base md:text-lg text-[#4b3b2a]/90 leading-relaxed"
            >
              Have a question, suggestion, or feedback? We'd love to hear from
              you. Fill out the form below or reach out through any of our
              channels.
            </motion.p>
          </div>

          {/* Contact Methods Cards */}
          <motion.div
            variants={itemVariants}
            className="grid md:grid-cols-3 gap-4 md:gap-6"
          >
            {contactMethods.map((method, idx) => (
              <motion.a
                key={idx}
                href={method.link}
                target={method.link.startsWith("http") ? "_blank" : undefined}
                rel={
                  method.link.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                whileHover={{ y: -5, scale: 1.02 }}
                className="p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-[#e6e1da] hover:border-[#7a5e3a]/40 transition-all duration-300 text-left group"
              >
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {method.icon}
                </div>
                <h3 className="text-lg font-semibold text-[#2f2417] mb-1 uppercase tracking-wide">
                  {method.title}
                </h3>
                <p className="text-[#7a5e3a] font-medium mb-2">
                  {method.value}
                </p>
                <p className="text-sm text-[#4b3b2a]/70">{method.desc}</p>
              </motion.a>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants} className="max-w-2xl mx-auto">
            <div className="p-6 md:p-8 rounded-3xl bg-white/60 backdrop-blur-sm border border-[#e6e1da] shadow-lg">
              <h2 className="text-xl font-semibold text-[#2f2417] mb-6 text-center uppercase tracking-wide">
                Send Us a Message
              </h2>

              {/* Success Message */}
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 text-green-800 text-sm text-center"
                >
                  ✓ Thank you! Your message has been sent. We'll get back to you
                  soon.
                </motion.div>
              )}

              {/* Error Message */}
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm text-center"
                >
                  ✗ {errorMsg}{" "}
                  <a
                    href="mailto:hello@coffeetelkom.id"
                    className="underline font-medium"
                  >
                    Email us directly
                  </a>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Message Type */}
                <div>
                  <label className="block text-sm font-medium text-[#4b3b2a] mb-2 uppercase tracking-wide">
                    I'm reaching out about
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-[#e6e1da] bg-white/80 text-[#2c231a] focus:outline-none focus:ring-2 focus:ring-[#7a5e3a]/30 focus:border-[#7a5e3a] transition-all"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="feedback">Feedback / Suggestion</option>
                    <option value="complaint">Complaint / Issue</option>
                    <option value="collab">Collaboration / Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Name & Email */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#4b3b2a] mb-2 uppercase tracking-wide">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl border border-[#e6e1da] bg-white/80 text-[#2c231a] placeholder-[#4b3b2a]/50 focus:outline-none focus:ring-2 focus:ring-[#7a5e3a]/30 focus:border-[#7a5e3a] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#4b3b2a] mb-2 uppercase tracking-wide">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-[#e6e1da] bg-white/80 text-[#2c231a] placeholder-[#4b3b2a]/50 focus:outline-none focus:ring-2 focus:ring-[#7a5e3a]/30 focus:border-[#7a5e3a] transition-all"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-[#4b3b2a] mb-2 uppercase tracking-wide">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="How can we help?"
                    className="w-full px-4 py-3 rounded-xl border border-[#e6e1da] bg-white/80 text-[#2c231a] placeholder-[#4b3b2a]/50 focus:outline-none focus:ring-2 focus:ring-[#7a5e3a]/30 focus:border-[#7a5e3a] transition-all"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-[#4b3b2a] mb-2 uppercase tracking-wide">
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell us more about your inquiry..."
                    className="w-full px-4 py-3 rounded-xl border border-[#e6e1da] bg-white/80 text-[#2c231a] placeholder-[#4b3b2a]/50 focus:outline-none focus:ring-2 focus:ring-[#7a5e3a]/30 focus:border-[#7a5e3a] transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={status === "submitting"}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full md:w-auto px-8 py-4 bg-[#7a5e3a] text-white text-sm font-medium rounded-full uppercase tracking-wide hover:bg-[#5d4a2f] transition-all duration-300 shadow-lg shadow-[#7a5e3a]/25 hover:shadow-xl hover:shadow-[#7a5e3a]/30 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {status === "submitting" ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </>
                  )}
                </motion.button>

                {/* Privacy Note */}
                <p className="text-xs text-[#4b3b2a]/60 text-center pt-2">
                  We respect your privacy. Your information will only be used to
                  respond to your inquiry.
                </p>
              </form>
            </div>
          </motion.div>

          {/* Footer Note */}
          <motion.div variants={itemVariants} className="text-center">
            <p className="text-sm text-[#4b3b2a]/70">
              Prefer to call?{" "}
              <a
                href="tel:+6285212793050"
                className="text-[#7a5e3a] font-medium hover:underline"
              >
                +62 852 1279 3050
              </a>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
