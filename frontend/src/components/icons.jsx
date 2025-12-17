import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faArrowUpRightFromSquare,
  faAward,
  faBars,
  faBell,
  faBox,
  faBriefcase,
  faCalendar,
  faChevronRight,
  faCircleCheck,
  faCode,
  faComment,
  faDownload,
  faEnvelope,
  faEye,
  faFileLines,
  faShareNodes,
  faFire,
  faGlobe,
  faGraduationCap,
  faHeart,
  faLayerGroup,
  faLocationDot,
  faMessage,
  faMicrochip,
  faMoon,
  faPaperPlane,
  faPhone,
  faStar,
  faSun,
  faTableColumns,
  faThumbtack,
  faTrophy,
  faUser,
  faUserCheck,
  faUsers,
  faWindowMaximize,
  faWindowMinimize,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faInstagram,
  faLinkedin,
  faXTwitter,
  faYoutube,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";

function createIconComponent(icon) {
  const IconComponent = ({ size, className, style, ...props }) => {
    const mergedStyle = {
      ...(size ? { width: size, height: size } : null),
      ...style,
    };

    return (
      <FontAwesomeIcon
        icon={icon}
        className={className}
        style={mergedStyle}
        {...props}
      />
    );
  };

  return IconComponent;
}

// Solid
export const Mail = createIconComponent(faEnvelope);
export const Bell = createIconComponent(faBell);
export const User = createIconComponent(faUser);
export const Users = createIconComponent(faUsers);
export const Trophy = createIconComponent(faTrophy);
export const Flame = createIconComponent(faFire);
export const Calendar = createIconComponent(faCalendar);
export const Briefcase = createIconComponent(faBriefcase);
export const GraduationCap = createIconComponent(faGraduationCap);
export const MessageSquare = createIconComponent(faMessage);
export const MessageCircle = createIconComponent(faComment);
export const Award = createIconComponent(faAward);
export const ExternalLink = createIconComponent(faArrowUpRightFromSquare);
export const ArrowUpRight = createIconComponent(faArrowUpRightFromSquare);
export const ArrowLeft = createIconComponent(faArrowLeft);
export const ArrowRight = createIconComponent(faArrowRight);
export const Pin = createIconComponent(faThumbtack);
export const Heart = createIconComponent(faHeart);
export const Share2 = createIconComponent(faShareNodes);
export const Code = createIconComponent(faCode);
export const Code2 = createIconComponent(faCode);
export const Cpu = createIconComponent(faMicrochip);
export const Sparkles = createIconComponent(faStar);
export const Phone = createIconComponent(faPhone);
export const MapPin = createIconComponent(faLocationDot);
export const ChevronRight = createIconComponent(faChevronRight);
export const Download = createIconComponent(faDownload);
export const Eye = createIconComponent(faEye);
export const Minimize2 = createIconComponent(faWindowMinimize);
export const Maximize2 = createIconComponent(faWindowMaximize);
export const X = createIconComponent(faXmark);
export const Sun = createIconComponent(faSun);
export const Moon = createIconComponent(faMoon);
export const FileText = createIconComponent(faFileLines);
export const UserCheck = createIconComponent(faUserCheck);
export const Globe = createIconComponent(faGlobe);
export const Menu = createIconComponent(faBars);
export const CheckCircle = createIconComponent(faCircleCheck);
export const Layers = createIconComponent(faLayerGroup);
export const Layout = createIconComponent(faTableColumns);
export const Package = createIconComponent(faBox);
export const Send = createIconComponent(faPaperPlane);
export const Star = createIconComponent(faStar);

// Brands
export const Github = createIconComponent(faGithub);
export const Linkedin = createIconComponent(faLinkedin);
export const Instagram = createIconComponent(faInstagram);
export const Youtube = createIconComponent(faYoutube);
export const TikTok = createIconComponent(faTiktok);
export const Twitter = createIconComponent(faXTwitter);
