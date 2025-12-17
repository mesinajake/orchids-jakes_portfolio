import React, { useState, useEffect } from "react";
import { Mail, Github, Linkedin, Phone, MapPin, Calendar, ExternalLink, ChevronRight, Download, Eye, X, Sun, Moon } from "../components/icons";
import { motion, useScroll, useTransform } from "framer-motion";
import "../styles/clean.css";
import "./Portfolio.css";
import ProfilePhoto from "../assets/profile_jake.jpg";
import ResumePDF from "../assets/Resume_Jake_Mesina.pdf";

const Portfolio = () => {
  const { scrollYProgress } = useScroll();
  const [showConfetti, setShowConfetti] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleDownloadCV = (e) => {
    e.preventDefault();
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
    // Download the CV
    const link = document.createElement('a');
    link.href = ResumePDF;
    link.download = 'Resume_Jake_Mesina.pdf';
    link.click();
  };

  const handlePreviewCV = (e) => {
    e.preventDefault();
    setShowResumeModal(true);
  };

  return (
    <div className="portfolio-layout">
      {/* Scroll Progress Indicator */}
      <motion.div 
        className="scroll-progress"
        style={{ scaleX: scrollYProgress }}
      />

      {showConfetti && (
        <div className="confetti-container">
          {[...Array(50)].map((_, i) => (
            <div key={i} className="confetti" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 0.5}s`,
              background: i % 2 === 0 ? '#3b82f6' : '#60a5fa'
            }} />
          ))}
        </div>
      )}

      {/* Left Sidebar - Fixed Profile */}
      <aside className="sidebar">
        <div className="sidebar-content">
          {/* Profile Image */}
          <div className="profile-image-wrapper">
            <div className="profile-image">
              <img src={ProfilePhoto} alt="Jake Mesina" className="profile-photo" />
            </div>
          </div>

          {/* Name & Title */}
          <h1 className="profile-name">Jake Mesina</h1>
          <p className="profile-location">Calamba, Laguna, Philippines</p>
          <p className="profile-role">Web Developer • Front-End Developer</p>

          {/* CTA Buttons */}
          <div className="profile-actions">
            <a href="mailto:mesinajake9@gmail.com" className="btn-primary">
              <Mail size={16} />
              Send Email
            </a>
            <div className="btn-group">
              <motion.button
                onClick={handlePreviewCV}
                className="btn-secondary btn-secondary-left"
              >
                <Eye size={16} />
                Preview Resume
              </motion.button>
              <motion.button
                onClick={handleDownloadCV}
                className="btn-secondary btn-secondary-right"
              >
                <Download size={16} />
              </motion.button>
            </div>
          </div>

          {/* Social Links */}
          <div className="social-links">
            <a href="https://github.com/jakemesina" target="_blank" rel="noopener noreferrer" className="social-btn">
              <Github size={18} />
            </a>
            <a href="https://linkedin.com/in/jakemesina" target="_blank" rel="noopener noreferrer" className="social-btn">
              <Linkedin size={18} />
            </a>
            <a href="mailto:mesinajake9@gmail.com" className="social-btn">
              <Mail size={18} />
            </a>
            <button onClick={toggleDarkMode} className="social-btn theme-toggle" title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </aside>

      {/* Right Content - Scrollable */}
      <main className="main-content">
        {/* Row 1: About (left) + Education (right) */}
        <div className="content-row">
          {/* About Section */}
          <section id="about" className="content-section content-half">
            <h2 className="section-title">About</h2>
            <div className="about-text">
              <p>
                I'm a Web Developer and Front-End Developer with a passion for creating beautiful, 
                responsive, and user-friendly web experiences. Currently pursuing IT at City College 
                of Calamba, I specialize in modern front-end technologies like React, JavaScript, and CSS.
              </p>
              <p>
                I focus on building clean, intuitive interfaces with attention to design details, 
                accessibility, and performance. From pixel-perfect layouts to smooth animations, 
                I craft websites that not only look great but also deliver exceptional user experiences.
              </p>
              <p>
                My goal is to bridge the gap between design and development, turning creative visions 
                into functional, high-quality web applications that make a real impact.
              </p>
            </div>
          </section>

          {/* Education Section */}
          <section id="education" className="content-section content-half">
            <h2 className="section-title">Education</h2>
            <div className="education-card">
              <div className="education-header">
                <div>
                  <h3 className="education-school">City College of Calamba</h3>
                  <p className="education-degree">BS, Information Technology</p>
                </div>
                <span className="education-date">2022 — Present</span>
              </div>
              <p className="education-coursework">
                <strong>Relevant Coursework:</strong> Web Development, Front-End Development, 
                Responsive Web Design Principles, Software Development
              </p>
            </div>
          </section>
        </div>

        {/* Row 2: Projects (full width, centered) */}
        <section id="projects" className="content-section content-full">
          <h2 className="section-title">Recent Projects</h2>
          
          <div className="project-detail-card">
            <div className="project-header">
              <div>
                <h3 className="project-title">AppliTrak: AI-Powered Job Portal</h3>
                <p className="project-role">Full-stack Developer</p>
              </div>
              <span className="project-date">May 2025 — Present</span>
            </div>
            <ul className="project-details">
              <li>Enterprise-grade job marketplace featuring local LLM integration (Ollama + LLaMA 3.2) for automated resume-to-job compatibility scoring, eliminating manual screening time from <strong>5-7 minutes to 30 seconds</strong></li>
              <li>Architected multi-role system with RBAC, <strong>60+ RESTful endpoints</strong>, 8 MongoDB schemas with geospatial indexing, and intelligent document parsing (PDF/DOCX/TXT) with secure file handling</li>
              <li>Advanced system design integrating 3 external job APIs with data normalization, JWT authentication with role-based middleware, real-time analytics using aggregation pipelines, and privacy-first AI processing (zero cloud costs)</li>
              <li><strong>Technical Proficiency: 82%</strong> across full stack (Node.js 85%, MongoDB 88%, JWT Auth 92%, React 78%, AI Integration 75%, API Integration 86%)</li>
            </ul>
            <div className="project-tech">
              <span className="tech-tag">Node.js</span>
              <span className="tech-tag">MongoDB</span>
              <span className="tech-tag">React</span>
              <span className="tech-tag">Ollama</span>
              <span className="tech-tag">LLaMA 3.2</span>
              <span className="tech-tag">JWT</span>
            </div>
          </div>

          <div className="project-detail-card">
            <div className="project-header">
              <div>
                <h3 className="project-title">K-Wise: AI-Driven Kiosk System</h3>
                <p className="project-role">Front-end Developer</p>
              </div>
              <span className="project-date">Feb 2025 — Nov 2025</span>
            </div>
            <ul className="project-details">
              <li>Architected React-based self-service kiosk UI with real-time AI integration, enabling customers to visualize PC compatibility instantly—achieving <strong>3.80/4.0 user satisfaction</strong> and <strong>32% conversion rate</strong></li>
              <li>Built responsive product comparison interface consuming <strong>150+ API endpoints</strong> to render real-time compatibility scores from hybrid AI engine (<strong>3,200+ rules + DeepSeek R1</strong>)—eliminating <strong>85% of manual staff consultations</strong></li>
              <li>Implemented advanced UX patterns: drag-and-drop build configurator, tier-based visual indicators, real-time price calculations, and AI-driven recommendation panels—reducing average build time from <strong>15 minutes to 2 minutes</strong></li>
              <li>Optimized front-end performance with LRU caching strategy, lazy loading for 1000+ product images, and debounced API calls—achieving <strong>&lt;300ms UI response time</strong> and <strong>99.5% uptime</strong></li>
            </ul>
            <div className="project-tech">
              <span className="tech-tag">React</span>
              <span className="tech-tag">Node.js</span>

              <span className="tech-tag">DeepSeek R1</span>
              <span className="tech-tag">Express</span>
            </div>
          </div>
        </section>

        {/* Row 3: Certifications (left) + Skills (right) */}
        <div className="content-row">
          {/* Certifications Section */}
          <section id="certifications" className="content-section content-half">
            <h2 className="section-title">Recent Certifications</h2>
            <div className="certs-list">
              <div className="cert-item">
                <div className="cert-info">
                  <h3 className="cert-name">Accenture UK Developer and Technology Virtual Experience Programme</h3>
                  <p className="cert-issuer">Forage</p>
                </div>
                <span className="cert-date">Oct 2025</span>
              </div>
              <div className="cert-item">
                <div className="cert-info">
                  <h3 className="cert-name">AWS APAC Solutions Architecture Virtual Experience Program</h3>
                  <p className="cert-issuer">Forage</p>
                </div>
                <span className="cert-date">Sep 2025</span>
              </div>
              <div className="cert-item">
                <div className="cert-info">
                  <h3 className="cert-name">Skyscanner's Front-End Software Engineering</h3>
                  <p className="cert-issuer">Forage</p>
                </div>
                <span className="cert-date">Sep 2025</span>
              </div>
              <div className="cert-item">
                <div className="cert-info">
                  <h3 className="cert-name">Fundamentals of Statistics with Microsoft Excel</h3>
                  <p className="cert-issuer">Data Analytics Philippines</p>
                </div>
                <span className="cert-date">May 2025</span>
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section id="skills" className="content-section content-half">
            <h2 className="section-title">Tech Stack</h2>
            <div className="skills-grid">
              <div className="skill-category">
                <h3 className="skill-category-title">Languages</h3>
                <div className="tech-tags">
                  <span className="tech-tag">HTML5</span>
                  <span className="tech-tag">CSS3</span>
                  <span className="tech-tag">JavaScript</span>

                </div>
              </div>
              <div className="skill-category">
                <h3 className="skill-category-title">Frameworks</h3>
                <div className="tech-tags">
                  <span className="tech-tag">ReactJS</span>
                  <span className="tech-tag">Node.js</span>
                  <span className="tech-tag">Express.js</span>
                  <span className="tech-tag">Vite</span>
                </div>
              </div>
              <div className="skill-category">
                <h3 className="skill-category-title">Developer Tools</h3>
                <div className="tech-tags">
                  <span className="tech-tag">Visual Studio Code</span>
                  <span className="tech-tag">Git</span>
                  <span className="tech-tag">GitHub</span>
                  <span className="tech-tag">GitHub Copilot</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Contact Section */}
        <section id="contact" className="content-section content-full">
          <h2 className="section-title">Get in Touch</h2>
          <div className="contact-grid">
            <a href="mailto:mesinajake9@gmail.com" className="contact-card">
              <Mail size={20} />
              <div className="contact-info">
                <span className="contact-label">Email</span>
                <span className="contact-value">mesinajake9@gmail.com</span>
              </div>
            </a>
            <a href="tel:+639473492672" className="contact-card">
              <Phone size={20} />
              <div className="contact-info">
                <span className="contact-label">Phone</span>
                <span className="contact-value">+63 947 349 2672</span>
              </div>
            </a>
            <a href="https://github.com/mesinajake" target="_blank" rel="noopener noreferrer" className="contact-card">
              <Github size={20} />
              <div className="contact-info">
                <span className="contact-label">GitHub</span>
                <span className="contact-value">github.com/mesinajake</span>
              </div>
            </a>
            <a href="https://www.linkedin.com/in/jake-mesina-b16908307/" target="_blank" rel="noopener noreferrer" className="contact-card">
              <Linkedin size={20} />
              <div className="contact-info">
                <span className="contact-label">LinkedIn</span>
                <span className="contact-value">linkedin.com/in/jakemesina</span>
              </div>
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <p>© 2025 Jake Mesina. All rights reserved.</p>
        </footer>
      </main>

      {/* Resume Preview Modal */}
      {showResumeModal && (
        <div
          className="resume-modal-overlay"
          onClick={() => setShowResumeModal(false)}
        >
          <div className="resume-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="resume-modal-header">
              <h3>Resume Preview</h3>
              <button
                className="resume-modal-close"
                onClick={() => setShowResumeModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="resume-modal-body">
              <iframe
                src={ResumePDF}
                title="Resume Preview"
                className="resume-iframe"
              />
            </div>
            <div className="resume-modal-footer">
              <button
                className="btn-modal-secondary"
                onClick={() => setShowResumeModal(false)}
              >
                Close
              </button>
              <button
                className="btn-modal-primary"
                onClick={(e) => {
                  handleDownloadCV(e);
                  setShowResumeModal(false);
                }}
              >
                <Download size={16} />
                Download Resume
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
