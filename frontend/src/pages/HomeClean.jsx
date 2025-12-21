import React from "react";
import { Mail, Github, Linkedin } from "../components/icons";
import "../styles/clean.css";
import "./HomeClean.css";

const Home = () => {
  return (
    <div className="home-clean">
      {/* Navigation */}
      <nav className="nav">
        <div className="nav-container">
          <a href="#" className="nav-logo">Jake Mesina</a>
          <ul className="nav-links">
            <li><a href="#about" className="nav-link">About</a></li>
            <li><a href="#experience" className="nav-link">Experience</a></li>
            <li><a href="#projects" className="nav-link">Projects</a></li>
            <li><a href="#contact" className="nav-link">Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Jake Mesina</h1>
            <p className="hero-subtitle">Aspiring Web Developer / Frontend Developer</p>
            <p className="hero-description">
              Building AI-powered web applications that deliver measurable business impact. 
              Specialized in scalable systems with Node.js, React, and MongoDB.
            </p>
            <div className="hero-actions">
              <a href="#contact" className="btn">Get in Touch</a>
              <a href="#projects" className="btn-secondary">View Projects</a>
            </div>
            <div className="hero-social">
              <a href="https://github.com/jakemesina" target="_blank" rel="noopener noreferrer" className="social-link">
                <Github size={20} />
              </a>
              <a href="https://linkedin.com/in/jakemesina" target="_blank" rel="noopener noreferrer" className="social-link">
                <Linkedin size={20} />
              </a>
              <a href="mailto:mesinajake9@gmail.com" className="social-link">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section section-about">
        <div className="container">
          <h2 className="section-title">About</h2>
          <div className="about-content">
            <p className="about-text">
              I'm a Full-Stack Developer with a passion for creating efficient, user-friendly applications 
              that solve real business problems. My recent work includes developing scalable REST APIs, 
              integrating AI capabilities, and building rule-based automation systems.
            </p>
            <p className="about-text">
              With expertise in modern web technologies and a strong focus on clean code practices, 
              I've delivered solutions that reduced manual processes by 90% and improved system efficiency by 85%.
            </p>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">2</div>
              <div className="stat-label">Major Projects</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">4</div>
              <div className="stat-label">Certifications</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">82%</div>
              <div className="stat-label">Tech Proficiency</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section id="skills" className="section section-skills">
        <div className="container">
          <h2 className="section-title">Tech Stack</h2>
          <div className="tech-grid">
            <div className="tech-category">
              <h3 className="tech-category-title">Frontend</h3>
              <div className="tech-items">
                <span className="tech-badge">React.js</span>
                <span className="tech-badge">JavaScript</span>

                <span className="tech-badge">HTML5</span>
                <span className="tech-badge">CSS3</span>
                <span className="tech-badge">Tailwind CSS</span>
              </div>
            </div>
            <div className="tech-category">
              <h3 className="tech-category-title">Backend</h3>
              <div className="tech-items">
                <span className="tech-badge">Node.js</span>
                <span className="tech-badge">Express.js</span>
                <span className="tech-badge">MongoDB</span>

                <span className="tech-badge">JWT</span>
                <span className="tech-badge">REST APIs</span>
              </div>
            </div>
            <div className="tech-category">
              <h3 className="tech-category-title">AI & Tools</h3>
              <div className="tech-items">
                <span className="tech-badge">OpenAI API</span>
                <span className="tech-badge">Git</span>
                <span className="tech-badge">Vite</span>
                <span className="tech-badge">Figma</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience/Projects */}
      <section id="projects" className="section section-projects">
        <div className="container">
          <h2 className="section-title">Experience</h2>
          
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-date">2024</div>
              <h3 className="timeline-title">AppliTrak Development</h3>
              <p className="timeline-company">Job Application Tracking System</p>
              <p className="timeline-description">
                Built a comprehensive full-stack application with 60+ REST API endpoints for managing job applications. 
                Implemented JWT authentication, MongoDB database design, and an intuitive React interface. 
                Achieved 90% reduction in manual tracking processes.
              </p>
              <div className="project-tags">
                <span className="tech-badge">Node.js</span>
                <span className="tech-badge">React</span>
                <span className="tech-badge">MongoDB</span>
                <span className="tech-badge">JWT</span>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-date">2024</div>
              <h3 className="timeline-title">K-Wise AI System</h3>
              <p className="timeline-company">AI-Powered Document Automation</p>
              <p className="timeline-description">
                Developed an AI-powered automation system with 3,200+ business rules for intelligent document processing. 
                Integrated OpenAI's GPT-4 API for natural language understanding, reducing manual verification tasks by 85% 
                and improving accuracy by 87%.
              </p>
              <div className="project-tags">
                <span className="tech-badge">OpenAI API</span>
                <span className="tech-badge">Node.js</span>
                <span className="tech-badge">MongoDB</span>
                <span className="tech-badge">Express.js</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section id="certifications" className="section section-certs">
        <div className="container">
          <h2 className="section-title">Certifications</h2>
          <div className="certs-grid">
            <div className="cert-card">
              <h3 className="cert-title">JavaScript Algorithms and Data Structures</h3>
              <p className="cert-issuer">freeCodeCamp</p>
              <p className="cert-date">Dec 2023</p>
            </div>
            <div className="cert-card">
              <h3 className="cert-title">Responsive Web Design</h3>
              <p className="cert-issuer">freeCodeCamp</p>
              <p className="cert-date">Nov 2023</p>
            </div>
            <div className="cert-card">
              <h3 className="cert-title">Front End Development Libraries</h3>
              <p className="cert-issuer">freeCodeCamp</p>
              <p className="cert-date">Dec 2023</p>
            </div>
            <div className="cert-card">
              <h3 className="cert-title">Back End Development and APIs</h3>
              <p className="cert-issuer">freeCodeCamp</p>
              <p className="cert-date">Jan 2024</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section section-contact">
        <div className="container">
          <div className="contact-content">
            <h2 className="section-title">Get in Touch</h2>
            <p className="contact-description">
              I'm currently available for new opportunities. Feel free to reach out if you'd like to discuss a project or just connect.
            </p>
            <div className="contact-info">
              <a href="mailto:mesinajake9@gmail.com" className="contact-item">
                <Mail size={20} />
                <span>mesinajake9@gmail.com</span>
              </a>
              <a href="https://github.com/jakemesina" target="_blank" rel="noopener noreferrer" className="contact-item">
                <Github size={20} />
                <span>github.com/jakemesina</span>
              </a>
              <a href="https://linkedin.com/in/jakemesina" target="_blank" rel="noopener noreferrer" className="contact-item">
                <Linkedin size={20} />
                <span>linkedin.com/in/jakemesina</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p className="footer-text">© 2024 Jake Mesina. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
