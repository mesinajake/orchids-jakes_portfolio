import React, { useEffect, memo, useMemo } from "react";
import {
  FileText,
  Code,
  Award,
  Globe,
  ArrowUpRight,
  Sparkles,
  UserCheck,
} from "../components/icons";
import AOS from "aos";
import "aos/dist/aos.css";
import './About.css';
import FormalPic from '../assets/FormalPic.webp';

// Memoized Components
const Header = memo(() => (
  <div className="about-header">
    <div className="about-header-title-wrapper">
      <h2
        className="about-header-title"
        data-aos="zoom-in-up"
        data-aos-duration="600"
      >
        About Me
      </h2>
    </div>
    <p
      className="about-header-subtitle"
      data-aos="zoom-in-up"
      data-aos-duration="800"
    >
      <Sparkles className="about-sparkles-icon" />
      Transforming ideas into digital experiences
      <Sparkles className="about-sparkles-icon" />
    </p>
  </div>
));

const ProfileImage = memo(() => (
  <div className="about-profile-container">
    <div className="about-profile-wrapper" data-aos="fade-up" data-aos-duration="1000">
      {/* Optimized gradient backgrounds with reduced complexity for mobile */}
      <div className="about-profile-bg-effects">
        <div className="about-profile-bg-gradient-1" />
        <div className="about-profile-bg-gradient-2" />
        <div className="about-profile-bg-gradient-3" />
      </div>
      <div className="about-profile-relative">
        <div className="about-profile-image-container">
          <div className="about-profile-border" />

          {/* Optimized overlay effects - disabled on mobile */}
          <div className="about-profile-overlay-1" />
          <div className="about-profile-overlay-2" />

          <img
            src={FormalPic}
            alt="Profile"
            className="about-profile-image"
            loading="lazy"
          />

          {/* Advanced hover effects - desktop only */}
          <div className="about-profile-hover-effects">
            <div className="about-profile-shine-1" />
            <div className="about-profile-shine-2" />
            <div className="about-profile-ring" />
          </div>
        </div>
      </div>
    </div>
  </div>
));

const StatCard = memo(
  ({ icon: Icon, color, value, label, description, animation }) => (
    <div
      data-aos={animation}
      data-aos-duration={1300}
      className="about-stat-card"
    >
      <div className={`about-stat-card-bg about-stat-card-bg-${color === 'from-[#6366f1] to-[#a855f7]' ? '1' : color === 'from-[#a855f7] to-[#6366f1]' ? '2' : '3'}`}></div>

      <div className="about-stat-card-header">
        <div className="about-stat-card-icon-wrapper">
          <Icon className="about-stat-card-icon" />
        </div>
        <span
          className="about-stat-card-value"
          data-aos="fade-up-left"
          data-aos-duration="1500"
          data-aos-anchor-placement="top-bottom"
        >
          {value}
        </span>
      </div>

      <div>
        <p
          className="about-stat-card-label"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-anchor-placement="top-bottom"
        >
          {label}
        </p>
        <div className="about-stat-card-footer">
          <p
            className="about-stat-card-description"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-anchor-placement="top-bottom"
          >
            {description}
          </p>
          <ArrowUpRight className="about-stat-card-arrow" />
        </div>
      </div>
    </div>
  )
);

const AboutPage = () => {
  // Memoized calculations
  const { totalProjects, totalCertificates, YearExperience } = useMemo(() => {
    const storedProjects = JSON.parse(localStorage.getItem("projects") || "[]");
    const storedCertificates = JSON.parse(
      localStorage.getItem("certificates") || "[]"
    );

    const startDate = new Date("2021-11-06");
    const today = new Date();
    const experience =
      today.getFullYear() -
      startDate.getFullYear() -
      (today <
      new Date(today.getFullYear(), startDate.getMonth(), startDate.getDate())
        ? 1
        : 0);

    return {
      totalProjects: storedProjects.length,
      totalCertificates: storedCertificates.length,
      YearExperience: experience,
    };
  }, []);

  // Optimized AOS initialization
  useEffect(() => {
    const initAOS = () => {
      AOS.init({
        once: false,
      });
    };

    initAOS();

    // Debounced resize handler
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(initAOS, 250);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  // Memoized stats data
  const statsData = useMemo(
    () => [
      {
        icon: Code,
        color: "from-[#3B82F6] to-[#9333EA]",
        value: "2",
        label: "Major Projects",
        description: "AppliTrak & K-Wise AI systems",
        animation: "fade-right",
      },
      {
        icon: Award,
        color: "from-[#9333EA] to-[#3B82F6]",
        value: "4",
        label: "Certifications",
        description: "AWS, Skyscanner, Accenture, Data Analytics",
        animation: "fade-up",
      },
      {
        icon: Globe,
        color: "from-[#3B82F6] to-[#9333EA]",
        value: "82%",
        label: "Technical Proficiency",
        description: "Across full-stack & AI integration",
        animation: "fade-left",
      },
    ],
    []
  );

  return (
    <div
      className="about-container"
      id="About"
    >
      <Header />

      <div className="about-main-wrapper">
        <div className="about-main-grid">
          <div className="about-main-content">
            <h2
              className="about-main-title"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              <span className="about-main-title-gradient">
                Hello, I'm
              </span>
              <span
                className="about-main-title-name"
                data-aos="fade-right"
                data-aos-duration="1300"
              >
                Jake Mesina
              </span>
            </h2>

            <p
              className="about-main-description"
              data-aos="fade-right"
              data-aos-duration="1500"
            >
              Full-stack developer specializing in AI-powered web applications with expertise in React, Node.js, and local LLM integration. I've built enterprise-grade systems like AppliTrak (90% reduction in screening time) and K-Wise (85% elimination of manual consultations). Passionate about creating user-centric solutions that blend cutting-edge AI with practical business value.
            </p>

            <div
              className="about-achievements"
              data-aos="fade-right"
              data-aos-duration="1700"
            >
              <div className="about-achievement-item">
                <span className="text-gradient font-bold text-xl">90%</span>
                <span className="text-sm text-gray-400">Time Reduction in AppliTrak</span>
              </div>
              <div className="about-achievement-item">
                <span className="text-gradient font-bold text-xl">85%</span>
                <span className="text-sm text-gray-400">Consultation Elimination in K-Wise</span>
              </div>
              <div className="about-achievement-item">
                <span className="text-gradient font-bold text-xl">82%</span>
                <span className="text-sm text-gray-400">Overall Technical Proficiency</span>
              </div>
            </div>

            <div className="about-buttons-container">
              <a
                href=""
                className="about-button-link"
              >
                <button
                  data-aos="fade-up"
                  data-aos-duration="800"
                  className="about-button-primary"
                >
                  <FileText className="about-button-icon" /> Download CV
                </button>
              </a>
              <a href="#Portofolio" className="about-button-link">
                <button
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  className="about-button-secondary"
                >
                  <Code className="about-button-icon" /> View Projects
                </button>
              </a>
            </div>
          </div>

          <ProfileImage />
        </div>

        <a href="#Portofolio">
          <div className="about-stats-container">
            {statsData.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </a>
      </div>
    </div>
  );
};

export default memo(AboutPage);
