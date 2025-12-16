import React, { useState, useEffect } from "react";
import { 
  Mail, Bell, User, Trophy, Flame, Calendar, 
  Briefcase, GraduationCap, Users, MessageSquare,
  Award, ExternalLink, Pin, Heart, MessageCircle, Share2, Code, Cpu
} from "lucide-react";
import "./HomePage.css";
import ProfilePhoto from "../assets/profile_jake.jpg";

const HomePage = () => {
  const [portfolioData, setPortfolioData] = useState(null);
  const [activeTab, setActiveTab] = useState("All");
  const [activeSection, setActiveSection] = useState("Home");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetch('/portfolio.json')
      .then(res => res.json())
      .then(data => setPortfolioData(data))
      .catch(err => console.error('Error loading portfolio data:', err));
  }, []);

  if (!portfolioData) return <div>Loading...</div>;

    const { personal, experience, education, certifications, skills, social } = portfolioData;

    const socialLinks = Object.entries(social || {}).filter(([, url]) => url);

    const calculateStreak = () => {

    const startDate = new Date(personal.startDate);
    const today = new Date();
    const days = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
    return days;
  };

    const streak = calculateStreak();

    const feedTabs = [
      { id: "All", label: "All", icon: null },
      { id: "Projects", label: "Project Showcase", icon: Briefcase },
      { id: "Frontend", label: "Frontend Dev", icon: Award },
    ];

    const renderHomeFeed = () => (
      <>
        <div className="feed-input">
          <img src={ProfilePhoto} alt="You" className="feed-input-avatar" />
          <input type="text" placeholder="Write something..." className="feed-input-field" />
          <div className="feed-input-actions">
            <button className="feed-action-btn">🖼️</button>
            <button className="feed-action-btn">🎥</button>
          </div>
        </div>

        <div className="feed-tabs">
          {feedTabs.map(tab => (
            <button
              key={tab.id}
              className={`feed-tab ${activeTab === tab.id ? 'feed-tab-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon && <tab.icon size={16} />}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Pinned Post */}
        <div className="feed-post pinned-post">
          <div className="pinned-header">
            <Pin size={16} />
            PINNED POST
          </div>
          <div className="post-header">
            <img src={ProfilePhoto} alt={personal.name} className="post-avatar" />
            <div className="post-author-info">
              <div className="post-author-row">
                <span className="post-author-name">{personal.name.split(' ')[0]} {personal.name.split(' ')[1].charAt(0)}</span>
                <span className="post-level">L4</span>
              </div>
              <span className="post-time">2 days ago</span>
            </div>
          </div>
          <div className="post-tag">📢 Announcements</div>
          <h3 className="post-title">🚀 Platform Updates - Exciting New Features!</h3>
          <p className="post-content">
            Hey everyone! 👋 We've been working hard to improve your learning experience, 
            and we're excited to share some major updates: {experience[0].keyMetrics[0].description}...
          </p>
          <div className="post-reactions">
            <div className="reaction-avatars">
              <div className="reaction-avatar">🔥</div>
              <div className="reaction-avatar">😊</div>
              <div className="reaction-avatar">👍</div>
              <span className="reaction-text">You and 13 others</span>
            </div>
            <span className="post-comments">21 Comments</span>
          </div>
          <div className="post-actions">
            <button className="post-action-btn">
              <Flame size={16} />
              Inspiring
            </button>
            <button className="post-action-btn">
              <MessageCircle size={16} />
              Comment
            </button>
            <button className="post-action-btn">
              <Share2 size={16} />
              Share
            </button>
          </div>
        </div>

        {/* Regular Posts */}
        {experience.map((exp, index) => (
          <div key={exp.id} className="feed-post">
            <div className="post-header">
              <img src={ProfilePhoto} alt={personal.name} className="post-avatar" />
              <div className="post-author-info">
                <div className="post-author-row">
                  <span className="post-author-name">{personal.name.split(' ')[0]} {personal.name.split(' ')[1].charAt(0)}</span>
                  <span className="post-level">L{index + 3}</span>
                </div>
                <span className="post-time">{exp.duration.split('—')[0].trim()}</span>
              </div>
            </div>
            <div className="post-tag">
              {exp.type === "Full-Stack Development" ? "📱 Accountability" : "🎨 Frontend"}
            </div>
            <h3 className="post-title">{exp.project}</h3>
            <p className="post-content">
              {exp.description}
            </p>
            <div className="post-reactions">
              <div className="reaction-avatars">
                <span className="reaction-text">{index + 15} reactions</span>
              </div>
              <span className="post-comments">{index + 8} Comments</span>
            </div>
            <div className="post-actions">
              <button className="post-action-btn">
                <Flame size={16} />
                Inspiring
              </button>
              <button className="post-action-btn">
                <MessageCircle size={16} />
                Comment
              </button>
              <button className="post-action-btn">
                <Share2 size={16} />
                Share
              </button>
            </div>
          </div>
          ))}
      </>
    );

    const renderAboutSection = () => (
      <>
        <div className="feed-post">
          <div className="section-header">
            <User size={20} />
            <h2 className="section-title">About</h2>
          </div>
          <h3 className="post-title">{personal.title}</h3>
          <p className="post-content">I'm a Web Developer and Front-End Developer with a passion for creating beautiful, responsive, and user-friendly web experiences. Currently pursuing IT at City College of Calamba, I specialize in modern front-end technologies like React, JavaScript, and CSS.

I focus on building clean, intuitive interfaces with attention to design details, accessibility, and performance. From pixel-perfect layouts to smooth animations, I craft websites that not only look great but also deliver exceptional user experiences.

My goal is to bridge the gap between design and development, turning creative visions into functional, high-quality web applications that make a real impact.</p>
          <div className="about-grid">
            <div className="about-chip">📍 {personal.location}</div>
            <div className="about-chip">📧 {personal.email}</div>
            <div className="about-chip">📅 {personal.yearsOfExperience}+ years experience</div>
          </div>
        </div>
        <div className="feed-post">
          <div className="section-header">
            <Briefcase size={20} />
            <h2 className="section-title">Recent Experience</h2>
          </div>
          {experience.slice(0, 2).map((exp) => (
            <div key={exp.id} className="about-exp-row">
              <div>
                <div className="post-title">{exp.project}</div>
                <div className="post-content">{exp.position} — {exp.company}</div>
              </div>
              <div className="about-chip">{exp.duration}</div>
            </div>
          ))}
        </div>
      </>
    );

    const renderCertificationsSection = () => (
      <div className="feed-post">
        <div className="section-header">
          <Award size={20} />
          <h2 className="section-title">Certifications</h2>
        </div>
        <div className="cert-list">
          {certifications.map((cert) => (
            <div key={cert.id} className="cert-row">
              <div className="cert-icon">🎖️</div>
              <div className="cert-info">
                <div className="post-title">{cert.name}</div>
                <div className="post-content">{cert.issuer}</div>
              </div>
              <div className="about-chip">{cert.year}</div>
            </div>
          ))}
        </div>
      </div>
    );

    const renderContactSection = () => (
      <div className="feed-post">
        <div className="section-header">
          <Mail size={20} />
          <h2 className="section-title">Get In Touch</h2>
        </div>
        <p className="post-content">
          Let's collaborate on AI-powered web apps or integrate automation into your workflows. Reach out anytime!
        </p>
        <div className="contact-grid">
          <div className="contact-card">
            <div className="contact-icon">✉️</div>
            <div>
              <div className="post-title">Email</div>
              <div className="post-content">{personal.email}</div>
            </div>
          </div>
          <div className="contact-card">
            <div className="contact-icon">📞</div>
            <div>
              <div className="post-title">Phone</div>
              <div className="post-content">{personal.phone}</div>
            </div>
          </div>
          <div className="contact-card">
            <div className="contact-icon">🌐</div>
            <div>
              <div className="post-title">Portfolio</div>
              <a className="post-content" href={social?.portfolio || '#'} target="_blank" rel="noreferrer">{social?.portfolio || 'Portfolio link'}</a>
            </div>
          </div>
        </div>
      </div>
    );

    return (
      <div className="home-layout">

      {/* Header */}
      <header className="home-header">
          <div className="header-left">
            <div className="logo">
              <span className="logo-icon">🎓</span>
              <div className="logo-text">
                <div className="logo-title">The Developer's</div>
                <div className="logo-subtitle">Portfolio</div>
              </div>
            </div>
          </div>

          <nav className="header-nav">
            <button
              className={`nav-tab ${activeSection === 'Home' ? 'nav-tab-active' : ''}`}
              onClick={() => setActiveSection('Home')}
            >
              Home
            </button>
            <button
              className={`nav-tab ${activeSection === 'About' ? 'nav-tab-active' : ''}`}
              onClick={() => setActiveSection('About')}
            >
              About
            </button>
            <button
              className={`nav-tab ${activeSection === 'Certifications' ? 'nav-tab-active' : ''}`}
              onClick={() => setActiveSection('Certifications')}
            >
              Certifications
            </button>
            <button
              className={`nav-tab ${activeSection === 'Contact' ? 'nav-tab-active' : ''}`}
              onClick={() => setActiveSection('Contact')}
            >
              Get In Touch
            </button>
          </nav>


        <div className="header-actions">
          <button className="header-icon-btn">
            <Mail size={20} />
          </button>
          <button className="header-icon-btn header-notif">
            <Bell size={20} />
            <span className="notif-badge">{certifications.length}</span>
          </button>
          <button className="header-avatar">
            <img src={ProfilePhoto} alt={personal.name} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="home-main">
        {/* Left Sidebar */}
        <aside className="home-sidebar-left">
          <div className="profile-card">
            <div className="profile-banner"></div>
            <div className="profile-avatar-wrapper">
              <img src={ProfilePhoto} alt={personal.name} className="profile-avatar" />
              <span className="profile-status"></span>
            </div>

            <div className="profile-info">
              <div className="profile-name-row">
                <h2 className="profile-name-text">{personal.name.split(' ')[0]} {personal.name.split(' ')[1].charAt(0)}.</h2>
              </div>
              <p className="profile-bio">
                I build clean, intuitive interfaces with strong attention to design, accessibility, and performance—crafting websites that look great and deliver exceptional user experiences.
              </p>
            </div>

            <div className="profile-stats">
              <div className="stat-card">
                <div className="stat-icon">💻</div>
                <div className="stat-content">
                  <div className="stat-label">Developer</div>
                  <div className="stat-value">{personal.technicalProficiency.overall}%</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🏆</div>
                <div className="stat-content">
                  <div className="stat-label">#2</div>
                  <div className="stat-value">Rank</div>
                </div>
              </div>
            </div>

              <div className="quick-links">
                <h3 className="quick-links-title">SOCIAL LINKS</h3>
                {socialLinks.length === 0 && (
                  <div className="quick-link-item">
                    <div className="quick-link-icon">ℹ️</div>
                    <span>No social links provided</span>
                  </div>
                )}
                {socialLinks.map(([key, url]) => {
                  const socialEmojis = {
                    github: "🐙",
                    linkedin: "💼",
                    instagram: "📸",
                    twitter: "🐦",
                    portfolio: "🌐"
                  };
                  return (
                    <a key={key} href={url} target="_blank" rel="noreferrer" className="quick-link-item">
                      <div className="quick-link-icon">{socialEmojis[key] || "🔗"}</div>
                      <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                      <span className="quick-link-arrow">›</span>
                    </a>
                  );
                })}
              </div>

          </div>
        </aside>

        {/* Center Feed */}
        <main className="home-feed">
          {activeSection === 'Home' && renderHomeFeed()}
          {activeSection === 'About' && renderAboutSection()}
          {activeSection === 'Certifications' && renderCertificationsSection()}
          {activeSection === 'Contact' && renderContactSection()}
        </main>

        {/* Right Sidebar */}
        <aside className="home-sidebar-right">
          <div className="streak-widget education-widget">
            <div className="widget-header">
              <GraduationCap size={20} className="widget-icon" />
              <h3 className="widget-title">Education</h3>
              <button className="widget-info-btn">ⓘ</button>
            </div>
            <div className="education-widget-list">
              {education.map((edu) => (
                <div key={edu.id} className="education-widget-item">
                  <div className="education-widget-icon">🎓</div>
                  <div>
                    <div className="education-widget-degree">{edu.degree}</div>
                    <div className="education-widget-school">{edu.school}</div>
                    <div className="education-widget-duration">{edu.duration}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="leaderboard-widget techstack-widget">
            <div className="widget-header">
              <Code size={20} className="widget-icon" />
              <h3 className="widget-title">Tech Stack</h3>
              <button className="widget-link">All ›</button>
            </div>
            <div className="techstack-widget-group">
              <div className="tech-category-title">Frontend</div>
              {skills.frontend.slice(0, 6).map((skill) => (
                <div key={skill.name} className="techstack-item">
                  <span className="tech-name">{skill.name}</span>
                  <div className="tech-level-bar">
                    <div className="tech-level-fill" style={{ width: `${skill.level}%` }}></div>
                  </div>
                  <span className="tech-level-text">{skill.level}%</span>
                </div>
              ))}
            </div>
            <div className="techstack-widget-group">
              <div className="tech-category-title">Backend</div>
              {skills.backend.slice(0, 6).map((skill) => (
                <div key={skill.name} className="techstack-item">
                  <span className="tech-name">{skill.name}</span>
                  <div className="tech-level-bar">
                    <div className="tech-level-fill" style={{ width: `${skill.level}%` }}></div>
                  </div>
                  <span className="tech-level-text">{skill.level}%</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default HomePage;
