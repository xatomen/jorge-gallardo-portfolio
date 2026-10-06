export type Locale = "en" | "es";

export const translations = {
  en: {
    nav: { about: "About", skills: "Skills", projects: "Projects", contact: "Contact", menu: "Open navigation menu" },
    hero: { greeting: "Hi, I’m", role: "DevOps Engineer", description: "Focused on cloud infrastructure, automation, CI/CD and software engineering.", projects: "View Projects", github: "GitHub", linkedin: "LinkedIn", eyebrow: "Cloud · Automation · Delivery" },
    about: { title: "About", intro: "I am a graduate of Civil Engineering in Computer Science, with a specialization in Informatics, professionally focused on DevOps, cloud infrastructure, automation and CI/CD.", second: "I also build software products and tools as personal projects, combining my infrastructure background with web and application development.", degree: "Civil Engineering in Computer Science", specialization: "Specialization in Informatics", cloud: "DevOps & Cloud", development: "Software Development", location: "Chile" },
    expertise: { title: "What I Do", lead: "Areas I focus on and where I have the most experience.", items: [
      ["Cloud Infrastructure", "Designing and working with cloud infrastructure and services, mainly across AWS and Azure."],
      ["CI/CD & Automation", "Automating integration, deployment and operational processes."],
      ["Infrastructure as Code", "Defining and managing reproducible infrastructure using Terraform."],
      ["Containers", "Working with container technologies and orchestration platforms."],
      ["Observability", "Monitoring, logging, metrics and infrastructure/application analysis."],
      ["Software Development", "Building web, backend and application projects."],
    ] },
    technologies: { title: "Technologies", lead: "Tools and technologies I work with.", groups: ["Cloud", "DevOps & CI/CD", "Containers", "Observability", "Development", "Databases & Services"] },
    projects: { title: "Projects", lead: "Some of the projects I have built.", view: "View Project", docmarkSubtitle: "Markdown to PDF", docmarkBody: "A web tool for creating PDF documents from Markdown directly in the browser.", docmarkSecondary: "Built with a local-first approach: document content is processed in the browser without needing to send it to a backend.", docmarkAlt: "Docmark interface displayed on a MacBook", scrambleTitle: "Speedcubing timer and statistics application.", scrambleBody: "An application designed for speedcubers to record solves, generate scrambles and analyze results and statistics.", mathTitle: "Educational numerical methods platform.", mathBody: "A web application with interactive calculators for solving and visualizing different numerical methods.", scrambleAlt: "ScrambleTimer running on a MacBook with a 3×3 speed cube", mathAlt: "IntegraMath interface displayed on a MacBook" },
    contact: { title: "Contact", intro: "Interested in talking about technology, development or professional opportunities?", second: "You can find me through the following channels.", linkedin: "Connect with me", github: "Explore my projects", email: "Send me a message" },
    footer: { tagline: "Focused on cloud infrastructure, automation and software engineering.", rights: "All rights reserved." },
  },
  es: {
    nav: { about: "Sobre mí", skills: "Conocimientos", projects: "Proyectos", contact: "Contacto", menu: "Abrir menú de navegación" },
    hero: { greeting: "Hola, soy", role: "DevOps Engineer", description: "Enfocado en infraestructura cloud, automatización, CI/CD e ingeniería de software.", projects: "Ver proyectos", github: "GitHub", linkedin: "LinkedIn", eyebrow: "Cloud · Automatización · Entrega" },
    about: { title: "Sobre mí", intro: "Soy Ingeniero Civil en Computación mención Informática, enfocado profesionalmente en DevOps, infraestructura cloud, automatización y CI/CD.", second: "También desarrollo productos y herramientas de software como proyectos personales, combinando mi experiencia en infraestructura con desarrollo web y aplicaciones.", degree: "Ingeniería Civil en Computación", specialization: "mención Informática", cloud: "DevOps & Cloud", development: "Desarrollo de software", location: "Chile" },
    expertise: { title: "Qué hago", lead: "Áreas en las que me enfoco y donde tengo mayor experiencia.", items: [
      ["Cloud Infrastructure", "Diseño y trabajo con infraestructura y servicios cloud, principalmente en AWS y Azure."],
      ["CI/CD & Automation", "Automatización de procesos de integración, despliegue y operaciones."],
      ["Infrastructure as Code", "Definición y administración de infraestructura reproducible mediante Terraform."],
      ["Containers", "Trabajo con tecnologías de contenedores y plataformas de orquestación."],
      ["Observability", "Monitoreo, logs, métricas y análisis de infraestructura y aplicaciones."],
      ["Software Development", "Desarrollo de aplicaciones web, backend y aplicaciones como proyectos personales."],
    ] },
    technologies: { title: "Tecnologías", lead: "Herramientas y tecnologías con las que trabajo.", groups: ["Cloud", "DevOps & CI/CD", "Containers", "Observability", "Development", "Databases & Services"] },
    projects: { title: "Proyectos", lead: "Algunos de los proyectos que he desarrollado.", view: "Ver proyecto", docmarkSubtitle: "Markdown to PDF", docmarkBody: "Herramienta web para crear documentos PDF a partir de Markdown directamente desde el navegador.", docmarkSecondary: "Diseñada con un enfoque local-first: el contenido se procesa en el navegador sin necesidad de enviar los documentos a un backend.", docmarkAlt: "Interfaz de Docmark en un MacBook", scrambleTitle: "Aplicación de cronometraje y estadísticas para speedcubing.", scrambleBody: "Aplicación orientada a speedcubers para registrar resoluciones, generar scrambles y analizar resultados y estadísticas.", mathTitle: "Plataforma educativa de métodos numéricos.", mathBody: "Aplicación web con calculadoras interactivas para resolver y visualizar distintos métodos numéricos.", scrambleAlt: "ScrambleTimer en un MacBook con un cubo de velocidad 3×3", mathAlt: "Interfaz de IntegraMath en un MacBook" },
    contact: { title: "Contacto", intro: "¿Quieres conversar sobre tecnología, desarrollo o alguna oportunidad profesional?", second: "Puedes encontrarme en los siguientes canales.", linkedin: "Conecta conmigo", github: "Revisa mis proyectos", email: "Escríbeme directamente" },
    footer: { tagline: "Enfocado en infraestructura cloud, automatización e ingeniería de software.", rights: "Todos los derechos reservados." },
  },
} as const;

export const technologyGroups = [
  [
    { name: "AWS", icon: "/assets/tech/aws.svg" },
    { name: "Azure", icon: "/assets/tech/azure.svg" },
    { name: "Cloudflare", icon: "/assets/tech/cloudflare.svg" },
    { name: "Google Cloud", icon: "/assets/tech/googlecloud.svg" },
  ],
  [
    { name: "Terraform", icon: "/assets/tech/terraform.svg" },
    { name: "GitHub Actions", icon: "/assets/tech/githubactions.svg" },
    { name: "GitLab CI", icon: "/assets/tech/gitlab.svg" },
  ],
  [
    { name: "Docker", icon: "/assets/tech/docker.svg" },
    { name: "Kubernetes", icon: "/assets/tech/kubernetes.svg" },
    { name: "Amazon ECS", icon: "/assets/tech/aws.svg" },
    { name: "AKS", icon: "/assets/tech/azure.svg" },
  ],
  [
    { name: "Amazon CloudWatch", icon: "/assets/tech/aws.svg" },
    { name: "Azure Monitor", icon: "/assets/tech/azure.svg" },
    { name: "Grafana", icon: "/assets/tech/grafana.svg" },
  ],
  [
    { name: "TypeScript", icon: "/assets/tech/typescript.svg" },
    { name: "JavaScript", icon: "/assets/tech/javascript.svg" },
    { name: "Node.js", icon: "/assets/tech/nodejs.svg" },
    { name: "Next.js", icon: "/assets/tech/nextjs.svg" },
    { name: "Kotlin", icon: "/assets/tech/kotlin.svg" },
  ],
  [
    { name: "MongoDB Atlas", icon: "/assets/tech/mongodb.svg" },
    { name: "Firebase", icon: "/assets/tech/firebase.svg" },
    { name: "SQL", icon: "/assets/tech/sql.svg" },
  ],
] as const;
