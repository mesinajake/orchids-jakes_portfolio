import React from "react";
import { Mail, Github, Linkedin, Phone, MapPin, ExternalLink } from "../components/icons";
import "../styles/clean.css";
import "./Resume.css";

const Resume = () => {
  return (
    <div className="resume-page">
      <div className="resume-container">
        {/* Header */}
        <header className="resume-header">
          <div className="resume-header-main">
            <h1 className="resume-name">Jake Mesina</h1>
            <p className="resume-title">Full-Stack Developer & AI Integration Specialist</p>
          </div>
          <div className="resume-contact">
            <a href="mailto:mesinajake9@gmail.com" className="contact-link">
              <Mail size={14} />
              <span>mesinajake9@gmail.com</span>
            </a>
            <a href="tel:+639473492672" className="contact-link">
              <Phone size={14} />
              <span>+63 947 349 2672</span>
            </a>
            <a href="https://github.com/jakemesina" target="_blank" rel="noopener noreferrer" className="contact-link">
              <Github size={14} />
              <span>github.com/jakemesina</span>
            </a>
            <a href="https://linkedin.com/in/jakemesina" target="_blank" rel="noopener noreferrer" className="contact-link">
              <Linkedin size={14} />
              <span>linkedin.com/in/jakemesina</span>
            </a>
          </div>
        </header>

        {/* Summary */}
        <section className="resume-section">
          <h2 className="section-heading">Professional Summary</h2>
          <p className="summary-text">
            Results-driven Full-Stack Developer with expertise in building AI-powered web applications 
            that deliver measurable business impact. Specialized in Node.js, React, and MongoDB with 
            a proven track record of reducing manual processes by 90% and improving system efficiency by 85%. 
            Passionate about clean code practices and scalable architecture.
          </p>
        </section>

        {/* Skills */}
        <section className="resume-section">
          <h2 className="section-heading">Technical Skills</h2>
          <div className="skills-grid">
            <div className="skill-row">
              <span className="skill-label">Frontend:</span>
                <span className="skill-value">React.js, JavaScript, HTML5, CSS3, Tailwind CSS</span>
            </div>
            <div className="skill-row">
              <span className="skill-label">Backend:</span>
              <span className="skill-value">Node.js, Express.js, MongoDB, REST APIs, JWT Authentication</span>
            </div>
            <div className="skill-row">
              <span className="skill-label">AI & Tools:</span>
              <span className="skill-value">OpenAI API, GPT-4 Integration, Git, Vite, Figma</span>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section className="resume-section">
          <h2 className="section-heading">Professional Experience</h2>
          
          <div className="experience-item">
            <div className="experience-header">
              <div className="experience-left">
                <h3 className="experience-title">Full-Stack Developer</h3>
                <p className="experience-company">AppliTrak — Job Application Tracking System</p>
              </div>
              <span className="experience-date">2024</span>
            </div>
            <ul className="experience-details">
              <li>Developed a comprehensive full-stack application with 60+ REST API endpoints for managing job applications</li>
              <li>Implemented secure JWT authentication and designed MongoDB database schema for optimal performance</li>
              <li>Built an intuitive React interface with responsive design, achieving 90% reduction in manual tracking processes</li>
              <li>Technologies: Node.js, Express.js, React, MongoDB, JWT, REST APIs</li>
            </ul>
          </div>

          <div className="experience-item">
            <div className="experience-header">
              <div className="experience-left">
                <h3 className="experience-title">AI Integration Developer</h3>
                <p className="experience-company">K-Wise — AI-Powered Document Automation</p>
              </div>
              <span className="experience-date">2024</span>
            </div>
            <ul className="experience-details">
              <li>Developed an AI-powered automation system with 3,200+ business rules for intelligent document processing</li>
              <li>Integrated OpenAI's GPT-4 API for natural language understanding and automated decision-making</li>
              <li>Reduced manual verification tasks by 85% and improved processing accuracy by 87%</li>
              <li>Technologies: Node.js, Express.js, MongoDB, OpenAI API, GPT-4</li>
            </ul>
          </div>
        </section>

        {/* Certifications */}
        <section className="resume-section">
          <h2 className="section-heading">Certifications</h2>
          <div className="certifications-grid">
            <div className="cert-item">
              <div className="cert-left">
                <span className="cert-name">JavaScript Algorithms and Data Structures</span>
                <span className="cert-issuer">freeCodeCamp</span>
              </div>
              <span className="cert-date">Dec 2023</span>
            </div>
            <div className="cert-item">
              <div className="cert-left">
                <span className="cert-name">Responsive Web Design</span>
                <span className="cert-issuer">freeCodeCamp</span>
              </div>
              <span className="cert-date">Nov 2023</span>
            </div>
            <div className="cert-item">
              <div className="cert-left">
                <span className="cert-name">Front End Development Libraries</span>
                <span className="cert-issuer">freeCodeCamp</span>
              </div>
              <span className="cert-date">Dec 2023</span>
            </div>
            <div className="cert-item">
              <div className="cert-left">
                <span className="cert-name">Back End Development and APIs</span>
                <span className="cert-issuer">freeCodeCamp</span>
              </div>
              <span className="cert-date">Jan 2024</span>
            </div>
          </div>
        </section>

        {/* Key Achievements */}
        <section className="resume-section">
          <h2 className="section-heading">Key Achievements</h2>
          <ul className="achievements-list">
            <li><strong>90%</strong> reduction in manual tracking processes through AppliTrak development</li>
            <li><strong>85%</strong> reduction in manual verification tasks with K-Wise AI automation</li>
            <li><strong>87%</strong> improvement in document processing accuracy</li>
            <li><strong>60+</strong> REST API endpoints designed and implemented</li>
            <li><strong>3,200+</strong> business rules integrated into AI-powered system</li>
          </ul>
        </section>

        {/* Footer */}
        <footer className="resume-footer">
          <p>References available upon request</p>
        </footer>
      </div>
    </div>
  );
};

export default Resume;
