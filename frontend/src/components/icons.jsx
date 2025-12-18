import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faArrowUpRightFromSquare,
  faAward,
  faBars,
  faBell,
  faBolt,
  faBox,
  faBrain,
  faBriefcase,
  faCalendar,
  faChevronRight,
  faCircleCheck,
  faCode,
  faComment,
  faDatabase,
  faDownload,
  faEnvelope,
  faEye,
  faFileLines,
  faFire,
  faGlobe,
  faGraduationCap,
  faHeart,
  faLayerGroup,
  faLocationDot,
  faLock,
  faMessage,
  faMicrochip,
  faMoon,
  faPaperPlane,
  faPhone,
  faRobot,
  faServer,
  faShareNodes,
  faShieldHalved,
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
  faCss3Alt,
  faDocker,
  faFigma,
  faGitAlt,
  faGithub,
  faHtml5,
  faInstagram,
  faJs,
  faLinkedin,
  faNodeJs,
  faPython,
  faReact,
  faTiktok,
  faVuejs,
  faXTwitter,
  faYoutube,
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

// Tech Icons
export const ReactIcon = createIconComponent(faReact);
export const JsIcon = createIconComponent(faJs);
export const HtmlIcon = createIconComponent(faHtml5);
export const CssIcon = createIconComponent(faCss3Alt);
export const NodeIcon = createIconComponent(faNodeJs);
export const PythonIcon = createIconComponent(faPython);
export const VueIcon = createIconComponent(faVuejs);
export const DockerIcon = createIconComponent(faDocker);
export const FigmaIcon = createIconComponent(faFigma);
export const GitIcon = createIconComponent(faGitAlt);
export const DatabaseIcon = createIconComponent(faDatabase);
export const ServerIcon = createIconComponent(faServer);
export const RobotIcon = createIconComponent(faRobot);
export const BrainIcon = createIconComponent(faBrain);
export const ShieldIcon = createIconComponent(faShieldHalved);
export const LockIcon = createIconComponent(faLock);
export const BoltIcon = createIconComponent(faBolt);

export const JwtIcon = ({ size = 24, className, style, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 48 48"
    className={className}
    style={style}
    {...props}
  >
    <polygon fill="#546e7a" points="21.906,31.772 24.507,29.048 27.107,31.772 27.107,43 21.906,43" />
    <polygon fill="#f50057" points="17.737,29.058 21.442,28.383 21.945,32.115 15.345,41.199 11.138,38.141" />
    <polygon fill="#d500f9" points="15.962,24.409 19.355,26.041 17.569,29.356 6.89,32.825 5.283,27.879" />
    <polygon fill="#29b6f6" points="17.256,19.607 19.042,22.922 15.649,24.554 4.97,21.084 6.577,16.137" />
    <polygon fill="#00e5ff" points="21.126,16.482 20.623,20.214 16.918,19.539 10.318,10.455 14.526,7.398" />
    <polygon fill="#546e7a" points="26.094,16.228 23.493,18.952 20.893,16.228 20.893,5 26.094,5" />
    <polygon fill="#f50057" points="30.262,18.943 26.558,19.618 26.055,15.886 32.654,6.802 36.862,9.859" />
    <polygon fill="#d500f9" points="32.039,23.59 28.645,21.958 30.431,18.643 41.11,15.174 42.717,20.12" />
    <polygon fill="#29b6f6" points="30.744,28.393 28.958,25.078 32.351,23.447 43.03,26.916 41.423,31.863" />
    <polygon fill="#00e5ff" points="26.874,31.518 27.378,27.786 31.082,28.461 37.682,37.545 33.474,40.602" />
  </svg>
);

export const TechIcon = ({ name, ...props }) => {
  const normalized = name.toLowerCase();
  if (normalized.includes("react")) return <ReactIcon {...props} />;
  if (normalized.includes("javascript") || normalized === "js")
    return <JsIcon {...props} />;
  if (normalized.includes("html")) return <HtmlIcon {...props} />;
  if (normalized.includes("css")) return <CssIcon {...props} />;
  if (normalized.includes("node")) return <NodeIcon {...props} />;
  if (normalized.includes("python")) return <PythonIcon {...props} />;
  if (normalized.includes("vue")) return <VueIcon {...props} />;
  if (normalized.includes("docker")) return <DockerIcon {...props} />;
  if (normalized.includes("figma")) return <FigmaIcon {...props} />;
  if (normalized.includes("git")) return <GitIcon {...props} />;
  if (normalized.includes("mongo") || normalized.includes("database"))
    return <DatabaseIcon {...props} />;
  if (normalized.includes("express") || normalized.includes("server"))
    return <ServerIcon {...props} />;
  if (
    normalized.includes("ai") ||
    normalized.includes("llama") ||
    normalized.includes("deepseek") ||
    normalized.includes("ollama")
  )
    return <RobotIcon {...props} />;
  if (normalized.includes("jwt")) return <JwtIcon {...props} />;
  if (normalized.includes("security") || normalized.includes("auth"))
    return <ShieldIcon {...props} />;
  if (normalized.includes("vite")) return <BoltIcon {...props} />;

  return <Code {...props} />;
};
