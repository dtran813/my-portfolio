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
    title: "E-commerce Platform",
    shortDescription: "A full-featured online shopping experience",
    description:
      "A complete e-commerce solution with payment processing, inventory management, and analytics dashboard.",
    imageUrl: `https://via.placeholder.com/300x200?text=Project+1`,
    technologies: ["React", "Node.js", "MongoDB"],
    github: "https://github.com/dtran813/project1",
    live: "https://project1.demo.com",
    featured: true,
  },
  // Add more projects here...
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
