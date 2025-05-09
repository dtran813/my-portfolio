import { Activity, Clapperboard, Mountain, Tent, Sparkles } from "lucide-react";

export const SITE_CONFIG = {
  name: "Hoa Tran",
  title: "Software Engineer",
  domain: "HoaTran.dev",
  description:
    "Software engineer specialized in crafting high-performance web applications and intuitive user interfaces.",
  socialLinks: {
    github: "https://github.com/dtran813",
    linkedin: "https://linkedin.com/in/duc-tran-6a141a1b4/",
  },
};

// Navigation items - used by Navbar component
export const NAV_ITEMS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "technologies", label: "Tech" },
];

// About data - used by AboutSection
export const CHAPTERS = [
  {
    title: "The Beginning",
    year: "2019",
    content:
      "My journey started with a fascication for technology. I began learning the basics of web development, diving into HTML, CSS, and JavaScript. It was a world of endless possibilities.",
    icon: "💡",
    color: "indigo",
    skills: ["HTML", "CSS", "JavaScript"],
  },
  {
    title: "Finding My Path",
    year: "2020-2021",
    content:
      "Diving deeper into development, I discovered the perfect intersection of logic and creativity. I embraced the challenge of solving complex problems while maintaining beautiful interfaces. Besides, I started to learn about not only other programming languages but also game development with C#.",
    icon: "🧭",
    color: "blue",
    skills: ["React", "C#", "Java", "Python"],
  },
  {
    title: "Growth & Learning",
    year: "2022-2023",
    content:
      "Expanding my skills across the full stack, I delved into backend development and database management. I learned to build robust applications that are not only functional but also scalable.",
    icon: "🌱",
    color: "green",
    skills: ["TypeScript", "Node.js", "MongoDB", "PostgreSQL"],
  },
  {
    title: "Where I Am Today",
    year: "2024-Present",
    content:
      "Now focused on creating impactful digital solutions, I combine technical expertise with a keen eye for design. I'm passionate about crafting experiences that are both functional and delightful.",
    icon: "✨",
    color: "purple",
    skills: ["Next.js", "UI/UX Design", "Agile Development", "Problem Solving"],
  },
];

export const FUN_FACTS = [
  {
    fact: "I once solo hiked to the summit of a 14ers",
    icon: <Mountain className="w-5 h-5 text-green-400" />,
    color: "green",
  },
  {
    fact: "I've camped in below-freezing temperatures with a summer tent",
    icon: <Tent className="w-5 h-5 text-blue-400" />,
    color: "blue",
  },
  {
    fact: "I've slept under the stars in the mountains",
    icon: <Sparkles className="w-5 h-5 text-purple-400" />,
    color: "purple",
  },
  {
    fact: "I've watched Spirited Away and Howl's Moving Castle over 3 times",
    icon: <Clapperboard className="w-5 h-5 text-yellow-400" />,
    color: "yellow",
  },
  {
    fact: "I'm dedicated to my fitness routine 6x weekly (of course I'm lazy sometimes)",
    icon: <Activity className="w-5 h-5 text-red-400" />,
    color: "red",
  },
];

export const TECHNICAL_SKILLS = [
  { skill: "JavaScript/TypeScript", level: 5 },
  { skill: "React & Next.js", level: 5 },
  { skill: "Node.js", level: 4 },
  { skill: "AWS Cloud", level: 3 },
];

export const DESIGN_SKILLS = [
  { skill: "UI/UX Design", level: 5 },
  { skill: "Responsive Layouts", level: 4 },
  { skill: "Animation & Interaction", level: 4 },
  { skill: "Design Systems", level: 3 },
];

export const CORE_VALUES = [
  {
    value: "User-Centered Approach",
    desc: "Always designing with the end user in mind",
  },
  {
    value: "Continuous Learning",
    desc: "Constantly expanding my knowledge and skills",
  },
  {
    value: "Attention to Detail",
    desc: "The little things make the biggest difference",
  },
  {
    value: "Collaborative Spirit",
    desc: "Best results come from teamwork and open communication",
  },
];
// End of About data

// Projects data - used by ProjectsSection
export const PROJECTS = [
  {
    id: 1,
    title: "Walden Medical Staffing",
    shortDescription: "A web application for WMS",
    description:
      "A real-world web application that supports the business operation of Walden Medical Staffing.",
    imageUrl: "/images/projects/wms.png",
    technologies: ["ASP.NET Core", "MySql", "Bootstrap"],
    github: null,
    live: "https://www.waldenmedstaffing.com/",
  },
  {
    id: 2,
    title: "Home Safari",
    shortDescription: "An Airbnb clone website",
    description:
      "An Airbnb clone website using Next.js and Prisma as the backend. It allows users to search for and book vacation rentals.",
    imageUrl: "/images/projects/homesafari.png",
    technologies: ["Next.js", "Prisma", "TailwindCSS"],
    github: "https://github.com/dtran813/airbnb-clone",
    live: "https://homesafari.vercel.app/",
  },
  {
    id: 3,
    title: "All For One",
    shortDescription: "AI SASS",
    description:
      "An AI SASS that allows users to generate images and text using AI.",
    imageUrl: "/images/projects/afo.png",
    technologies: ["Next.js", "Prisma", "TailwindCSS"],
    github: "https://github.com/dtran813/ai-saas",
    live: "https://afoai.vercel.app/",
  },
  {
    id: 4,
    title: "OH2K Bank",
    shortDescription: "Landing website",
    description:
      "A landing website helps provide essential information about an imaginary bank.",
    imageUrl: "/images/projects/oh2k.png",
    technologies: ["React", "TailwindCSS", "Vite"],
    github: "https://github.com/dtran813/bank-website",
    live: "https://oh2kbank.netlify.app/",
  },
  {
    id: 5,
    title: "CalcuNow",
    shortDescription: "A simple calculator",
    description:
      "Why Calculator when you can CalcuNow? A simple calculator app that performs basic arithmetic operations.",
    imageUrl: "/images/projects/calculator.png",
    technologies: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/dtran813/calculator",
    live: "https://calcunow.netlify.app/",
  },
  {
    id: 6,
    title: "Pig Game",
    shortDescription: "A simple dice game",
    description:
      "A simple dice game where players take turns rolling two dice and accumulating points.",
    imageUrl: "/images/projects/pig_game.png",
    technologies: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/dtran813/pig-game",
    live: "https://pig2.netlify.app/",
  },
];

// Experience data - used by ExperienceSection
export const EXPERIENCES = [
  {
    year: "2023 - Present",
    title: "Software Test Engineer",
    company: "Visa Inc.",
    location: "Highlands Ranch, CO",
    points: [
      "Develop automated test scripts using Python, significantly improving testing efficiency and coverage across various projects.",
      "Create automated test scripts in Python, improving test efficiency and coverage, directly contributing to faster product release cycles.",
      "Actively contribute to the Automation Test Manager project, streamlining test automation workflows with Angular frontend and Java backend.",
    ],
    isCurrent: true,
  },
  {
    year: "2021 - 2022",
    title: "Software Engineer",
    company: "NomanIT",
    location: "Alexandria, VA",
    points: [
      "Designed and implemented responsive web applications, enhancing system usability and performance.",
      "Developed RESTful APIs in Node.js, optimizing application functionality and data integration.",
      "Operated in Agile teams, managing sprint planning, retrospectives, and collaborative problem-solving.",
    ],
    isCurrent: false,
  },
  {
    year: "2022",
    title: "Software Test Engineer Intern",
    company: "Visa Inc.",
    location: "Highlands Ranch, CO",
    points: [
      "Enhanced testing frameworks by creating unit tests in Python for robust validation of application protocols.",
      "Upgraded existing test scripts to support additional protocols, ensuring seamless integration in Linux server environments.",
      "Collaborated with senior engineers to optimize gateway testing processes, enhancing overall testing efficiency.",
    ],
    isCurrent: false,
  },
];

// Technology data - used by TechnologiesSection
export const TECH_CATEGORIES = [
  {
    title: "Frontend",
    description:
      "Creating responsive, intuitive user interfaces with modern frameworks and tools",
    items: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Redux"],
    icon: "🎨",
  },
  {
    title: "Backend",
    description:
      "Building robust server-side applications and APIs that power web applications",
    items: ["Node.js", "Express", "MongoDB", "PostgreSQL"],
    icon: "⚙️",
  },
  {
    title: "DevOps",
    description:
      "Streamlining deployment and ensuring reliable, scalable application infrastructure",
    items: ["Docker", "AWS", "GitHub Actions", "Terraform", "Nginx"],
    icon: "🚀",
  },
  {
    title: "Tools",
    description:
      "Leveraging industry-standard tools to optimize the development workflow",
    items: ["Git", "VS Code", "Webpack", "Jest", "Figma"],
    icon: "🛠️",
  },
  {
    title: "Mobile",
    description:
      "Developing cross-platform mobile applications with native-like performance",
    items: ["React Native", "Kotlin", "Firebase"],
    icon: "📱",
  },
  {
    title: "Other",
    description:
      "Additional technologies and languages that round out my technical expertise",
    items: ["Python", "Java", "C#", "WebSockets"],
    icon: "🧠",
  },
];
