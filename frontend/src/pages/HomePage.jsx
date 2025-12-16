import React, { useState, useEffect } from "react";
import { 
  Mail, Bell, User, Trophy, Flame, Calendar, 
  Briefcase, GraduationCap, Users, MessageSquare,
  Award, ExternalLink, Pin, Heart, MessageCircle, Share2
} from "lucide-react";
import "./HomePage.css";
import ProfilePhoto from "../assets/profile_jake.jpg";

const HomePage = () => {
  const [portfolioData, setPortfolioData] = useState(null);
  const [activeTab, setActiveTab] = useState("All");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetch('/portfolio.json')
      .then(res => res.json())
      .then(data => setPortfolioData(data))
      .catch(err => console.error('Error loading portfolio data:', err));
  }, []);

  if (!portfolioData) return <div>Loading...</div>;

  const { personal, experience, education, certifications, skills } = portfolioData;

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
          <button className="nav-tab nav-tab-active">Home</button>
          <button className="nav-tab">Learn</button>
          <button className="nav-tab">Calendar</button>
          <button className="nav-tab">Admin</button>
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
                <h2 className="profile-name-text">{personal.name.split(' ')[0]} {personal.name.split(' ')[1].charAt(0)}</h2>
                <span className="profile-badge">ADMIN</span>
              </div>
              <div className="profile-member">
                <span className="member-badge">⭐ PRO MEMBER</span>
                <span className="verified-badge">✓</span>
              </div>
              <p className="profile-bio">
                I am {personal.name.split(' ')[0]}, {personal.title.toLowerCase()}. {personal.tagline}...
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

            <div className="profile-streak">
              <div className="streak-icon">🔥</div>
              <div className="streak-content">
                <div className="streak-number">{Math.min(streak, 999)}</div>
                <div className="streak-label">day streak</div>
                <div className="streak-best">Best: {Math.min(streak, 999)} days</div>
              </div>
              <div className="streak-emoji">🔥</div>
            </div>

            <button className="share-progress-btn">
              📤 Share Progress
            </button>

            <div className="quick-links">
              <h3 className="quick-links-title">QUICK LINKS</h3>
              <a href="#projects" className="quick-link-item">
                <div className="quick-link-icon">📧</div>
                <span>Messages</span>
                <span className="quick-link-arrow">›</span>
              </a>
              <a href="#skills" className="quick-link-item">
                <div className="quick-link-icon">🏆</div>
                <span>Leaderboard</span>
                <span className="quick-link-arrow">›</span>
              </a>
              <a href="#education" className="quick-link-item">
                <div className="quick-link-icon">👥</div>
                <span>Members</span>
                <span className="quick-link-arrow">›</span>
              </a>
            </div>
          </div>
        </aside>

        {/* Center Feed */}
        <main className="home-feed">
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
        </main>

        {/* Right Sidebar */}
        <aside className="home-sidebar-right">
          <div className="streak-widget">
            <div className="widget-header">
              <Flame size={20} className="widget-icon" />
              <h3 className="widget-title">Your Streak</h3>
              <button className="widget-info-btn">ⓘ</button>
            </div>
            <div className="streak-display">
              <div className="streak-number-large">{Math.min(streak, 999)}</div>
              <div className="streak-label">days</div>
              <div className="streak-subtext">Daily learning streak</div>
            </div>
            <div className="streak-stats">
              <div className="streak-stat-row">
                <span className="streak-stat-label">🏆 Best</span>
                <span className="streak-stat-value">{Math.min(streak, 999)} days</span>
              </div>
            </div>
            <div className="streak-status">
              🔥 On fire!
            </div>
          </div>

          <div className="leaderboard-widget">
            <div className="widget-header">
              <Trophy size={20} className="widget-icon" />
              <h3 className="widget-title">Leaderboard</h3>
              <button className="widget-link">All ›</button>
            </div>
            <div className="leaderboard-status">
              <span className="online-indicator">●</span>
              <span className="online-text">2 online</span>
            </div>

            <div className="leaderboard-podium">
              <div className="podium-item">
                <img src={ProfilePhoto} alt="Abdul" className="podium-avatar" />
                <span className="podium-name">Abdul</span>
                <span className="podium-score">+926</span>
              </div>
              <div className="podium-item podium-winner">
                <div className="winner-badge">🏆</div>
                <img src={ProfilePhoto} alt={personal.name.split(' ')[0]} className="podium-avatar" />
                <span className="podium-name">{personal.name.split(' ')[0]}</span>
                <span className="podium-score">+{personal.technicalProficiency.overall * 17}</span>
              </div>
              <div className="podium-item">
                <img src={ProfilePhoto} alt="Leonar" className="podium-avatar" />
                <span className="podium-name">Leonar</span>
                <span className="podium-score">+884</span>
              </div>
            </div>

            <div className="leaderboard-list">
              <div className="leaderboard-row">
                <span className="rank-number">#1</span>
                <img src={ProfilePhoto} alt={personal.name.split(' ')[0]} className="rank-avatar" />
                <div className="rank-info">
                  <span className="rank-name">{personal.name.split(' ')[0]}</span>
                  <div className="rank-badges">
                    <span className="rank-badge">L3</span>
                    <span className="online-dot">●</span>
                    <span>Online</span>
                  </div>
                </div>
                <span className="rank-score">+{personal.technicalProficiency.overall * 17}</span>
              </div>

              <div className="leaderboard-row">
                <span className="rank-number">#2</span>
                <img src={ProfilePhoto} alt="Abdul" className="rank-avatar" />
                <div className="rank-info">
                  <span className="rank-name">Abdul</span>
                  <div className="rank-badges">
                    <span className="rank-badge">L3</span>
                    <span>63</span>
                  </div>
                </div>
                <span className="rank-score">+926</span>
              </div>

              <div className="leaderboard-row">
                <span className="rank-number">#3</span>
                <img src={ProfilePhoto} alt="Leonard" className="rank-avatar" />
                <div className="rank-info">
                  <span className="rank-name">Leonard</span>
                  <div className="rank-badges">
                    <span className="rank-badge">L3</span>
                    <span>64</span>
                  </div>
                </div>
                <span className="rank-score">+884</span>
              </div>

              <div className="leaderboard-row">
                <span className="rank-number">#4</span>
                <img src={ProfilePhoto} alt="Faisal" className="rank-avatar" />
                <div className="rank-info">
                  <span className="rank-name">Faisal</span>
                  <div className="rank-badges">
                    <span className="rank-badge">L3</span>
                    <span>57</span>
                  </div>
                </div>
                <span className="rank-score">+880</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default HomePage;
