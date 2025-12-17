import React, { useState, useEffect } from "react";
import { 
  Mail, Bell, User, Trophy, Flame, Calendar, 
  Briefcase, GraduationCap, Users, MessageSquare,
  Award, ExternalLink, Pin, Heart, MessageCircle, Share2, Code, Cpu
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/Avatar";
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
          <Card className="mb-4">
            <CardContent className="pt-6">
              <div className="flex gap-3 items-start">
                <Avatar>
                  <AvatarImage src={ProfilePhoto} alt="You" />
                  <AvatarFallback>{personal.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <input type="text" placeholder="Write something..." className="flex-1 px-4 py-2 rounded-md border border-input bg-background" />
                <Button size="icon" variant="ghost">🖼️</Button>
                <Button size="icon" variant="ghost">🎥</Button>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-2 mb-4 overflow-x-auto">
            {feedTabs.map(tab => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon && <tab.icon size={16} />}
                {tab.label}
              </Button>
            ))}
          </div>

        <Card className="mb-4 border-primary/50">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 text-primary mb-2">
              <Pin size={16} />
              <span className="text-xs font-semibold">PINNED POST</span>
            </div>
            <div className="flex items-start gap-3">
              <Avatar>
                <AvatarImage src={ProfilePhoto} alt={personal.name} />
                <AvatarFallback>{personal.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{personal.name.split(' ')[0]} {personal.name.split(' ')[1].charAt(0)}</span>
                  <Badge variant="secondary" className="text-xs">L4</Badge>
                </div>
                <span className="text-xs text-muted-foreground">2 days ago</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <Badge>📢 Announcements</Badge>
            <CardTitle className="text-xl">🚀 Platform Updates - Exciting New Features!</CardTitle>
            <CardDescription className="text-sm">
              Hey everyone! 👋 We've been working hard to improve your learning experience, 
              and we're excited to share some major updates: {experience[0].keyMetrics[0].description}...
            </CardDescription>
            <div className="flex items-center justify-between pt-2 border-t">
              <div className="flex items-center gap-1">
                <span>🔥</span>
                <span>😊</span>
                <span>👍</span>
                <span className="text-sm text-muted-foreground ml-1">You and 13 others</span>
              </div>
              <span className="text-sm text-muted-foreground">21 Comments</span>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button variant="ghost" size="sm" className="flex-1">
              <Flame size={16} />
              Inspiring
            </Button>
            <Button variant="ghost" size="sm" className="flex-1">
              <MessageCircle size={16} />
              Comment
            </Button>
            <Button variant="ghost" size="sm" className="flex-1">
              <Share2 size={16} />
              Share
            </Button>
          </CardFooter>
        </Card>

        {experience.map((exp, index) => (
          <Card key={exp.id} className="mb-4">
            <CardHeader className="pb-3">
              <div className="flex items-start gap-3">
                <Avatar>
                  <AvatarImage src={ProfilePhoto} alt={personal.name} />
                  <AvatarFallback>{personal.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{personal.name.split(' ')[0]} {personal.name.split(' ')[1].charAt(0)}</span>
                    <Badge variant="secondary" className="text-xs">L{index + 3}</Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">{exp.duration.split('—')[0].trim()}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <Badge variant="outline">
                {exp.type === "Full-Stack Development" ? "📱 Accountability" : "🎨 Frontend"}
              </Badge>
              <CardTitle className="text-xl">{exp.project}</CardTitle>
              <CardDescription className="text-sm">
                {exp.description}
              </CardDescription>
              <div className="flex items-center justify-between pt-2 border-t">
                <span className="text-sm text-muted-foreground">{index + 15} reactions</span>
                <span className="text-sm text-muted-foreground">{index + 8} Comments</span>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button variant="ghost" size="sm" className="flex-1">
                <Flame size={16} />
                Inspiring
              </Button>
              <Button variant="ghost" size="sm" className="flex-1">
                <MessageCircle size={16} />
                Comment
              </Button>
              <Button variant="ghost" size="sm" className="flex-1">
                <Share2 size={16} />
                Share
              </Button>
            </CardFooter>
          </Card>
        ))}
      </>
    );

    const renderAboutSection = () => (
      <>
        <Card className="mb-4">
          <CardHeader>
            <div className="flex items-center gap-2">
              <User size={20} />
              <CardTitle>About</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-3">{personal.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">
                I'm a Web Developer and Front-End Developer with a passion for creating beautiful, responsive, and user-friendly web experiences. Currently pursuing IT at City College of Calamba, I specialize in modern front-end technologies like React, JavaScript, and CSS.
              </p>
              <p className="text-sm text-muted-foreground mb-2">
                I focus on building clean, intuitive interfaces with attention to design details, accessibility, and performance. From pixel-perfect layouts to smooth animations, I craft websites that not only look great but also deliver exceptional user experiences.
              </p>
              <p className="text-sm text-muted-foreground">
                My goal is to bridge the gap between design and development, turning creative visions into functional, high-quality web applications that make a real impact.
              </p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Badge variant="secondary">📍 {personal.location}</Badge>
              <Badge variant="secondary">📧 {personal.email}</Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Briefcase size={20} />
              <CardTitle>Recent Experience</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {experience.slice(0, 2).map((exp) => (
              <div key={exp.id} className="flex justify-between items-start pb-4 border-b last:border-0 last:pb-0">
                <div className="space-y-1">
                  <h4 className="font-semibold">{exp.project}</h4>
                  <p className="text-sm text-muted-foreground">{exp.position} — {exp.company}</p>
                </div>
                <Badge variant="outline">{exp.duration}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </>
    );

    const renderCertificationsSection = () => (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Award size={20} />
            <CardTitle>Certifications</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {certifications.map((cert) => (
            <div key={cert.id} className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0">
              <div className="text-2xl">🎖️</div>
              <div className="flex-1 space-y-1">
                <h4 className="font-semibold">{cert.name}</h4>
                <p className="text-sm text-muted-foreground">{cert.issuer}</p>
              </div>
              <Badge variant="secondary">{cert.year}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    );

    const renderContactSection = () => (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Mail size={20} />
            <CardTitle>Get In Touch</CardTitle>
          </div>
          <CardDescription>
            Let's collaborate on AI-powered web apps or integrate automation into your workflows. Reach out anytime!
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-1">
          <Card className="border-2">
            <CardContent className="flex items-center gap-3 pt-6">
              <div className="text-3xl">✉️</div>
              <div className="space-y-1">
                <h4 className="font-semibold">Email</h4>
                <p className="text-sm text-muted-foreground">{personal.email}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-2">
            <CardContent className="flex items-center gap-3 pt-6">
              <div className="text-3xl">📞</div>
              <div className="space-y-1">
                <h4 className="font-semibold">Phone</h4>
                <p className="text-sm text-muted-foreground">{personal.phone}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-2">
            <CardContent className="flex items-center gap-3 pt-6">
              <div className="text-3xl">🌐</div>
              <div className="space-y-1">
                <h4 className="font-semibold">Portfolio</h4>
                <a 
                  className="text-sm text-primary hover:underline" 
                  href={social?.portfolio || '#'} 
                  target="_blank" 
                  rel="noreferrer"
                >
                  {social?.portfolio || 'Portfolio link'}
                </a>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
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


          <div className="header-actions flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Mail size={20} />
            </Button>
            <div className="relative">
              <Button variant="ghost" size="icon">
                <Bell size={20} />
              </Button>
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                {certifications.length}
              </Badge>
            </div>
            <Avatar className="cursor-pointer">
              <AvatarImage src={ProfilePhoto} alt={personal.name} />
              <AvatarFallback>{personal.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
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
