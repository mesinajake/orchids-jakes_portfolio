import {
  ArrowLeft as ArrowLeftIcon,
  ArrowRight as ArrowRightIcon,
  ArrowUpRight as ArrowUpRightIcon,
  Award as AwardIcon,
  Bell as BellIcon,
  Bot as BotIcon,
  Brain as BrainIconLucide,
  Briefcase as BriefcaseIcon,
  Calendar as CalendarIcon,
  ChevronRight as ChevronRightIcon,
  CircleCheck as CircleCheckIcon,
  Code as CodeIcon,
  Code2 as Code2Icon,
  Cpu as CpuIcon,
  Database as DatabaseIconLucide,
  Download as DownloadIcon,
  ExternalLink as ExternalLinkIcon,
  Eye as EyeIcon,
  Figma as FigmaIconLucide,
  FileCode as FileCodeIcon,
  FileCode2 as FileCode2Icon,
  FileText as FileTextIcon,
  Flame as FlameIcon,
  GitBranch as GitBranchIcon,
  Github as GithubIcon,
  Globe as GlobeIcon,
  GraduationCap as GraduationCapIcon,
  Heart as HeartIcon,
  Instagram as InstagramIcon,
  Layers as LayersIcon,
  LayoutGrid as LayoutGridIcon,
  Linkedin as LinkedinIcon,
  Lock as LockIconLucide,
  Mail as MailIcon,
  MapPin as MapPinIcon,
  Maximize2 as Maximize2Icon,
  Menu as MenuIcon,
  MessageCircle as MessageCircleIcon,
  MessageSquare as MessageSquareIcon,
  Minimize2 as Minimize2Icon,
  Moon as MoonIcon,
  Music2 as Music2Icon,
  Package as PackageLucideIcon,
  Phone as PhoneIcon,
  Pin as PinIcon,
  Send as SendIcon,
  Server as ServerIconLucide,
  Share2 as Share2Icon,
  ShieldCheck as ShieldCheckIcon,
  Sparkles as SparklesIcon,
  Star as StarIcon,
  Sun as SunIcon,
  Trophy as TrophyIcon,
  Twitter as TwitterIcon,
  User as UserIcon,
  UserCheck as UserCheckIcon,
  Users as UsersIcon,
  X as XIcon,
  Youtube as YoutubeIcon,
  Zap as ZapIcon,
} from "lucide-react";

function createIconComponent(Icon) {
  const IconComponent = ({ size = 20, className, style, ...props }) => (
    <Icon size={size} className={className} style={style} {...props} />
  );

  return IconComponent;
}

// Solid
export const Mail = createIconComponent(MailIcon);
export const Bell = createIconComponent(BellIcon);
export const User = createIconComponent(UserIcon);
export const Users = createIconComponent(UsersIcon);
export const Trophy = createIconComponent(TrophyIcon);
export const Flame = createIconComponent(FlameIcon);
export const Calendar = createIconComponent(CalendarIcon);
export const Briefcase = createIconComponent(BriefcaseIcon);
export const GraduationCap = createIconComponent(GraduationCapIcon);
export const MessageSquare = createIconComponent(MessageSquareIcon);
export const MessageCircle = createIconComponent(MessageCircleIcon);
export const Award = createIconComponent(AwardIcon);
export const ExternalLink = createIconComponent(ExternalLinkIcon);
export const ArrowUpRight = createIconComponent(ArrowUpRightIcon);
export const ArrowLeft = createIconComponent(ArrowLeftIcon);
export const ArrowRight = createIconComponent(ArrowRightIcon);
export const Pin = createIconComponent(PinIcon);
export const Heart = createIconComponent(HeartIcon);
export const Share2 = createIconComponent(Share2Icon);
export const Code = createIconComponent(CodeIcon);
export const Code2 = createIconComponent(Code2Icon);
export const Cpu = createIconComponent(CpuIcon);
export const Sparkles = createIconComponent(SparklesIcon);
export const Phone = createIconComponent(PhoneIcon);
export const MapPin = createIconComponent(MapPinIcon);
export const ChevronRight = createIconComponent(ChevronRightIcon);
export const Download = createIconComponent(DownloadIcon);
export const Eye = createIconComponent(EyeIcon);
export const Minimize2 = createIconComponent(Minimize2Icon);
export const Maximize2 = createIconComponent(Maximize2Icon);
export const X = createIconComponent(XIcon);
export const Sun = createIconComponent(SunIcon);
export const Moon = createIconComponent(MoonIcon);
export const FileText = createIconComponent(FileTextIcon);
export const UserCheck = createIconComponent(UserCheckIcon);
export const Globe = createIconComponent(GlobeIcon);
export const Menu = createIconComponent(MenuIcon);
export const CheckCircle = createIconComponent(CircleCheckIcon);
export const Layers = createIconComponent(LayersIcon);
export const Layout = createIconComponent(LayoutGridIcon);
export const Package = createIconComponent(PackageLucideIcon);
export const Send = createIconComponent(SendIcon);
export const Star = createIconComponent(StarIcon);

// Brands
export const Github = createIconComponent(GithubIcon);
export const Linkedin = createIconComponent(LinkedinIcon);
export const Instagram = createIconComponent(InstagramIcon);
export const Youtube = createIconComponent(YoutubeIcon);
export const TikTok = createIconComponent(Music2Icon);
export const Twitter = createIconComponent(TwitterIcon);

// Tech Icons
export const ReactIcon = createIconComponent(Code2Icon);
export const JsIcon = createIconComponent(FileCode2Icon);
export const HtmlIcon = createIconComponent(FileCodeIcon);
export const CssIcon = createIconComponent(FileCodeIcon);
export const NodeIcon = createIconComponent(ServerIconLucide);
export const PythonIcon = createIconComponent(BotIcon);
export const VueIcon = createIconComponent(LayoutGridIcon);
export const DockerIcon = createIconComponent(PackageLucideIcon);
export const FigmaIcon = createIconComponent(FigmaIconLucide);
export const GitIcon = createIconComponent(GitBranchIcon);
export const DatabaseIcon = createIconComponent(DatabaseIconLucide);
export const ServerIcon = createIconComponent(ServerIconLucide);
export const RobotIcon = createIconComponent(BotIcon);
export const BrainIcon = createIconComponent(BrainIconLucide);
export const ShieldIcon = createIconComponent(ShieldCheckIcon);
export const LockIcon = createIconComponent(LockIconLucide);
export const BoltIcon = createIconComponent(ZapIcon);

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

export const MongoIcon = ({ size = 24, className, style, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 216.56 448.5"
    className={className}
    style={style}
    {...props}
  >
    <path fill="currentColor" d="M202.8,179.68c-23-101.47-71-128.49-83.18-147.59C113,21.7,106.25,5.91,106.25,5.91c-.66,9-1.83,14.7-9.51,21.54C81.36,41.16,16,94.42,10.51,209.72c-5.12,107.5,79,173.8,90.18,180.65,8.54,4.2,19,.08,24-3.77,40.54-27.84,96-102.07,78.06-206.92"/>
    <path fill="#b8c4c2" d="M109.73,333.11c-2.11,26.62-3.63,42.11-9,57.29,0,0,3.54,25.33,6,52.17l8.77,0a488.62,488.62,0,0,1,9.57-56.2C113.71,380.8,110.16,356.46,109.73,333.11Z"/>
    <path fill="#12924f" d="M125.06,386.39h0c-11.48-5.3-14.8-30.13-15.31-53.28A1090.8,1090.8,0,0,0,112.2,218.4c-.6-20.07.3-185.92-4.94-210.2,2.12,4.75,7.24,15.91,12.36,23.88,12.23,19.11,60.19,46.13,83.17,147.61C220.7,284.27,165.57,358.37,125.06,386.39Z"/>
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
  if (normalized.includes("mongo")) return <MongoIcon {...props} />;
  if (normalized.includes("database")) return <DatabaseIcon {...props} />;
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
