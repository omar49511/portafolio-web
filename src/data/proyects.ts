import { Project } from "@/types/project"; // Adjust the path as needed

export const projects: Project[] = [
  {
    id: 1,
    title: "Plataforma de Comercio Electrónico",
    imageUrl: "/gato.webp",
    category: "Comercio Electrónico",
    description:
      "Una plataforma de comercio electrónico completamente responsiva con filtrado de productos, funcionalidad de carrito y integración de pagos.",
    liveUrl: "https://example.com/ecommerce",
    githubUrl: "https://github.com/user/ecommerce",
    technologies: ["React", "Next.js", "Tailwind CSS", "Stripe", "MongoDB"],
    process: [
      {
        title: "Planificación e Investigación",
        description:
          "Comenzamos con investigación de mercado y análisis de competidores para identificar características clave y necesidades de los usuarios. Creamos wireframes y flujos de usuario para planificar la estructura de la aplicación.",
        image: "/gato.webp",
      },
      {
        title: "Diseño UI/UX",
        description:
          "Diseñamos la interfaz de usuario con un enfoque en la usabilidad y la optimización de conversiones. Creamos un sistema de diseño consistente para componentes y diseños.",
        image: "/gato.webp",
      },
      {
        title: "Desarrollo Frontend",
        description:
          "Construimos el frontend usando React y Next.js con una arquitectura basada en componentes. Implementamos diseños responsivos con Tailwind CSS para todos los tamaños de dispositivos.",
        image: "/gato.webp",
      },
      {
        title: "Integración Backend",
        description:
          "Integración con MongoDB para almacenamiento de datos y Stripe para procesamiento de pagos. Implementamos sistemas seguros de autenticación y autorización.",
        image: "/gato.webp",
      },
      {
        title: "Pruebas y Despliegue",
        description:
          "Realizamos pruebas exhaustivas de funcionalidad, rendimiento y seguridad. Desplegamos la aplicación con pipelines de CI/CD para actualizaciones automatizadas.",
        image: "/gato.webp",
      },
    ],
    challenges: [
      "Optimizar el rendimiento para catálogos de productos grandes con muchas opciones de filtrado",
      "Implementar un proceso de pago seguro y fluido con múltiples opciones de pago",
      "Garantizar una experiencia de usuario consistente en diferentes dispositivos y navegadores",
    ],
    learnings: [
      "Importancia de una planificación y arquitectura exhaustiva antes de la implementación",
      "Valor de las pruebas de usuario y retroalimentación durante el proceso de desarrollo",
      "Técnicas para optimizar el rendimiento en aplicaciones con gran cantidad de datos",
      "Mejores prácticas para el procesamiento seguro de pagos y manejo de datos",
    ],
    featured: true,
    imageHeight: 300,
  },
  {
    id: 2,
    title: "Sitio Web de Portafolio",
    imageUrl: "/gato.webp",
    category: "Personal",
    description:
      "Un sitio web de portafolio moderno que muestra trabajos creativos con animaciones y elementos interactivos.",
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
        title: "Concepto y Diseño",
        description:
          "Creamos un concepto único enfocado en la narrativa visual y la interacción del usuario. Diseñamos maquetas con atención a la tipografía, espaciado y jerarquía visual.",
        image: "/gato.webp",
      },
      {
        title: "Planificación de Animaciones",
        description:
          "Planificamos animaciones y transiciones para mejorar la experiencia del usuario sin ser distractivas. Creamos storyboards para elementos interactivos clave.",
        image: "/gato.webp",
      },
      {
        title: "Desarrollo",
        description:
          "Construimos el sitio con React e implementamos animaciones usando GSAP y Framer Motion. Creamos elementos 3D con Three.js para un impacto visual.",
        image: "/gato.webp",
      },
      {
        title: "Optimización",
        description:
          "Optimizamos el rendimiento cargando recursos de forma diferida, dividiendo el código e implementando técnicas de renderizado eficientes para animaciones.",
        image: "/gato.webp",
      },
    ],
    challenges: [
      "Equilibrar el atractivo visual con el rendimiento y los tiempos de carga",
      "Crear animaciones fluidas que funcionen en diferentes dispositivos y navegadores",
      "Implementar elementos 3D que mejoren en lugar de distraer del contenido",
    ],
    learnings: [
      "Técnicas para crear animaciones y transiciones de alto rendimiento",
      "Enfoques para la mejora progresiva en diferentes capacidades de dispositivos",
      "Métodos para optimizar la carga y renderizado de recursos",
      "Importancia de la accesibilidad incluso en interfaces altamente visuales",
    ],
    featured: false,
    imageHeight: 300,
  },
  {
    id: 3,
    title: "Aplicación de Gestión de Tareas",
    imageUrl: "/gato.webp",
    category: "Productividad",
    description:
      "Una aplicación de productividad para gestionar tareas, proyectos y plazos con actualizaciones en tiempo real.",
    liveUrl: "https://example.com/taskmanager",
    githubUrl: "https://github.com/user/taskmanager",
    technologies: ["React", "Firebase", "Redux", "Material UI", "PWA"],
    process: [
      {
        title: "Investigación de Usuarios",
        description:
          "Realizamos entrevistas con usuarios y analizamos herramientas de productividad existentes para identificar puntos de dolor y oportunidades de mejora.",
        image: "/gato.webp",
      },
      {
        title: "Planificación de Funcionalidades",
        description:
          "Definimos las funcionalidades principales y las priorizamos según las necesidades de los usuarios. Creamos historias de usuario y criterios de aceptación para el desarrollo.",
        image: "/gato.webp",
      },
      {
        title: "Diseño de Interfaz",
        description:
          "Diseñamos una interfaz limpia y enfocada que minimiza distracciones y enfatiza la finalización de tareas. Creamos un lenguaje visual consistente.",
        image: "/gato.webp",
      },
      {
        title: "Desarrollo",
        description:
          "Construimos la aplicación con React e implementamos la gestión de estado con Redux. Integramos Firebase para sincronización de datos en tiempo real y autenticación.",
        image: "/gato.webp",
      },
      {
        title: "Implementación de PWA",
        description:
          "Implementamos características de Progressive Web App para funcionalidad offline, notificaciones push e instalación en dispositivos.",
        image: "/gato.webp",
      },
    ],
    challenges: [
      "Diseñar una interfaz intuitiva que escale desde la gestión simple hasta la compleja de tareas",
      "Implementar sincronización en tiempo real con resolución de conflictos",
      "Crear una experiencia responsiva que funcione bien tanto en dispositivos móviles como en escritorio",
    ],
    learnings: [
      "Patrones efectivos para la sincronización de datos en tiempo real",
      "Técnicas para construir aplicaciones con capacidad offline",
      "Enfoques para la gestión de estado en aplicaciones complejas",
      "Métodos para crear interfaces de usuario intuitivas para herramientas de productividad",
    ],
    featured: true,
    imageHeight: 300,
  },
];
