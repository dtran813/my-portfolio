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
      "An AI SASS that's so smart, it makes your computer look like it's still in kindergarten. A web application that allows users to generate images and text using AI.",
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
      "Pig Game has two players, so to make it fair, let's give them two dice instead. A simple dice game where players take turns rolling two dice and accumulating points.",
    imageUrl: "/images/projects/pig_game.png",
    technologies: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/dtran813/pig-game",
    live: "https://pig2.netlify.app/",
  },
];

// Experience data - used by ExperienceSection
export const EXPERIENCES = [
  {
    year: "2022 - Present",
    title: "Senior Software Engineer",
    company: "Company Three",
    location: "San Francisco, CA",
    points: [
      "Led development of mission-critical features for the flagship product",
      "Mentored junior developers and conducted technical interviews",
      "Architected scalable backend services using Node.js and AWS",
    ],
    technologies: ["React", "Node.js", "AWS", "MongoDB"],
    isCurrent: true,
  },
  {
    year: "2020 - 2022",
    title: "Software Engineer",
    company: "Company Two",
    location: "Seattle, WA",
    points: [
      "Developed and maintained RESTful APIs and frontend components",
      "Collaborated with design team to implement UI/UX improvements",
      "Improved test coverage and CI/CD pipeline efficiency",
    ],
    isCurrent: false,
  },
  {
    year: "2018 - 2020",
    title: "Junior Developer",
    company: "Company One",
    location: "Boston, MA",
    points: [
      "Built responsive web applications using React and TypeScript",
      "Assisted with database design and query optimization",
      "Participated in agile development process and sprint planning",
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
    items: ["Node.js", "Express", "MongoDB", "PostgreSQL", "GraphQL"],
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
    items: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"],
    icon: "📱",
  },
  {
    title: "Other",
    description:
      "Additional technologies and languages that round out my technical expertise",
    items: ["Python", "Java", "C#", "WebSockets", "Redis"],
    icon: "🧠",
  },
];
