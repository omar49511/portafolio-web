import type { Project } from "@/types/project";

// Sample data for projects
// This data can be replaced with actual data from a database or API
export const projects: Project[] = [
  {
    id: 1,
    title: "E-commerce Platform",
    imageUrl: "/gato.webp",
    category: "E-commerce",
    description:
      "A fully responsive e-commerce platform with product filtering, cart functionality, and payment integration.",
    liveUrl: "https://example.com/ecommerce",
    githubUrl: "https://github.com/user/ecommerce",
    technologies: ["React", "Next.js", "Tailwind CSS", "Stripe", "MongoDB"],
    process: [
      {
        title: "Planning & Research",
        description:
          "Started with market research and competitor analysis to identify key features and user needs. Created wireframes and user flows to plan the application structure.",
        image: "/gato.webp",
      },
      {
        title: "UI/UX Design",
        description:
          "Designed the user interface with a focus on usability and conversion optimization. Created a consistent design system for components and layouts.",
        image: "/gato.webp",
      },
      {
        title: "Frontend Development",
        description:
          "Built the frontend using React and Next.js with a component-based architecture. Implemented responsive layouts with Tailwind CSS for all device sizes.",
        image: "/gato.webp",
      },
      {
        title: "Backend Integration",
        description:
          "Integrated with MongoDB for data storage and Stripe for payment processing. Implemented secure authentication and authorization systems.",
        image: "/gato.webp",
      },
      {
        title: "Testing & Deployment",
        description:
          "Conducted thorough testing for functionality, performance, and security. Deployed the application with CI/CD pipelines for automated updates.",
        image: "/gato.webp",
      },
    ],
    challenges: [
      "Optimizing performance for large product catalogs with many filtering options",
      "Implementing a secure and seamless checkout process with multiple payment options",
      "Ensuring consistent user experience across different devices and browsers",
    ],
    learnings: [
      "Importance of thorough planning and architecture before implementation",
      "Value of user testing and feedback throughout the development process",
      "Techniques for optimizing performance in data-heavy applications",
      "Best practices for secure payment processing and data handling",
    ],
    featured: true,
    imageHeight: 300,
  },
  {
    id: 2,
    title: "Portfolio Website",
    imageUrl: "/gato.webp",
    category: "Personal",
    description:
      "A modern portfolio website showcasing creative work with animations and interactive elements.",
    liveUrl: "https://example.com/portfolio",
    githubUrl: "https://github.com/user/portfolio",
    technologies: [
      "React",
      "Three.js",
      "GSAP",
      "Tailwind CSS",
      "Framer Motion",
    ],
    process: [
      {
        title: "Concept & Design",
        description:
          "Created a unique concept focusing on visual storytelling and user engagement. Designed mockups with attention to typography, spacing, and visual hierarchy.",
        image: "/gato.webp",
      },
      {
        title: "Animation Planning",
        description:
          "Planned animations and transitions to enhance the user experience without being distracting. Created storyboards for key interactive elements.",
        image: "/gato.webp",
      },
      {
        title: "Development",
        description:
          "Built the site with React and implemented animations using GSAP and Framer Motion. Created 3D elements with Three.js for visual impact.",
        image: "/gato.webp",
      },
      {
        title: "Optimization",
        description:
          "Optimized performance by lazy loading assets, code splitting, and implementing efficient rendering techniques for animations.",
        image: "/gato.webp",
      },
    ],
    challenges: [
      "Balancing visual appeal with performance and load times",
      "Creating smooth animations that work across different devices and browsers",
      "Implementing 3D elements that enhance rather than distract from the content",
    ],
    learnings: [
      "Techniques for creating performant animations and transitions",
      "Approaches to progressive enhancement for different device capabilities",
      "Methods for optimizing asset loading and rendering",
      "Importance of accessibility even in highly visual interfaces",
    ],
    featured: false,
    imageHeight: 300,
  },
  {
    id: 3,
    title: "Task Management App",
    imageUrl: "/gato.webp",
    category: "Productivity",
    description:
      "A productivity app for managing tasks, projects, and deadlines with real-time updates.",
    liveUrl: "https://example.com/taskmanager",
    githubUrl: "https://github.com/user/taskmanager",
    technologies: ["React", "Firebase", "Redux", "Material UI", "PWA"],
    process: [
      {
        title: "User Research",
        description:
          "Conducted user interviews and analyzed existing productivity tools to identify pain points and opportunities for improvement.",
        image: "/gato.webp",
      },
      {
        title: "Feature Planning",
        description:
          "Defined core features and prioritized them based on user needs. Created user stories and acceptance criteria for development.",
        image: "/gato.webp",
      },
      {
        title: "UI Design",
        description:
          "Designed a clean, focused interface that minimizes distractions and emphasizes task completion. Created a consistent visual language.",
        image: "/gato.webp",
      },
      {
        title: "Development",
        description:
          "Built the application with React and Redux for state management. Integrated Firebase for real-time data synchronization and authentication.",
        image: "/gato.webp",
      },
      {
        title: "PWA Implementation",
        description:
          "Implemented Progressive Web App features for offline functionality, push notifications, and installation on devices.",
        image: "/gato.webp",
      },
    ],
    challenges: [
      "Designing an intuitive interface that scales from simple to complex task management",
      "Implementing real-time synchronization with conflict resolution",
      "Creating a responsive experience that works well on both mobile and desktop",
    ],
    learnings: [
      "Effective patterns for real-time data synchronization",
      "Techniques for building offline-capable applications",
      "Approaches to state management in complex applications",
      "Methods for creating intuitive user interfaces for productivity tools",
    ],
    featured: true,
    imageHeight: 300,
  },
  {
    id: 4,
    title: "Social Media Dashboard",
    imageUrl: "/gato.webp",
    category: "Analytics",
    description:
      "An analytics dashboard for tracking social media performance across multiple platforms.",
    liveUrl: "https://example.com/socialdashboard",
    githubUrl: "https://github.com/user/socialdashboard",
    technologies: ["Vue.js", "D3.js", "Node.js", "Express", "MongoDB"],
    process: [
      {
        title: "Requirements Gathering",
        description:
          "Identified key metrics and KPIs that social media managers need to track. Researched API capabilities of major social platforms.",
        image: "/gato.webp",
      },
      {
        title: "Data Architecture",
        description:
          "Designed data models and API endpoints for collecting and aggregating social media metrics from multiple sources.",
        image: "/gato.webp",
      },
      {
        title: "Visualization Design",
        description:
          "Created wireframes and prototypes for data visualizations that communicate insights effectively and allow for exploration.",
        image: "/gato.webp",
      },
      {
        title: "Frontend Development",
        description:
          "Built the dashboard interface with Vue.js and implemented interactive charts and graphs with D3.js.",
        image: "/gato.webp",
      },
      {
        title: "Backend Development",
        description:
          "Developed a Node.js/Express backend with scheduled jobs for data collection and APIs for frontend consumption.",
        image: "/gato.webp",
      },
    ],
    challenges: [
      "Handling rate limits and API changes from different social media platforms",
      "Creating visualizations that effectively communicate complex data",
      "Designing a flexible system that can accommodate new data sources",
    ],
    learnings: [
      "Techniques for effective data visualization and dashboard design",
      "Approaches to working with multiple external APIs reliably",
      "Methods for processing and aggregating large amounts of time-series data",
      "Patterns for creating maintainable and extensible data pipelines",
    ],
    featured: false,
    imageHeight: 300,
  },
];
