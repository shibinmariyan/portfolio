
import {
    Code2,
    Layers,
    Cloud,
    Database,
    Sparkles,
    Users,
    Award,
    Mail,
    MessageCircle,
    Phone,
    Linkedin,
    Github,
    Globe
} from "lucide-react";

export const portfolioData = {
    personalInfo: {
        name: "SHIBIN MARIYAN STANLY",
        title: "Systems Analyst & Senior Full Stack Developer",
        email: "shibinmariyanstanley@gmail.com",
        phone: "+91 8075085487",
        location: "Trivandrum, Kerala, India",
        linkedin: "linkedin.com/in/shibinmariyanstanly",
        portfolio: "shibinmariyan.github.io/portfolio",
        socials: [
            {
                name: "Email",
                value: "shibinmariyanstanley@gmail.com",
                href: "mailto:shibinmariyanstanley@gmail.com",
                icon: Mail,
                color: "text-neutral-900 dark:text-white",
            },
            {
                name: "WhatsApp",
                value: "+91 8075085487",
                href: "https://wa.me/918075085487",
                icon: MessageCircle,
                color: "text-green-600 dark:text-green-400",
            },
            {
                name: "Phone",
                value: "+91 8075085487",
                href: "tel:+918075085487",
                icon: Phone,
                color: "text-secondary-600 dark:text-secondary-400"
            },
            {
                name: "LinkedIn",
                value: "Connect",
                href: "https://www.linkedin.com/in/shibinmariyanstanly",
                icon: Linkedin,
                color: "text-blue-600 dark:text-blue-400",
            },
            {
                name: "Github",
                value: "Profile",
                href: "https://github.com/shibinmariyan",
                icon: Github,
                color: "text-neutral-900 dark:text-white"
            },
            {
                name: "Portfolio",
                value: "View Work",
                href: "https://shibinmariyan.github.io/portfolio/",
                icon: Globe,
                color: "text-primary-600 dark:text-primary-400"
            }
        ]
    },
    summary: `Experienced Systems Analyst and Senior Full Stack Developer with 7+ years of expertise in MEAN/MERN stack, AWS, Azure, and modern web technologies. Best Employee Award Winner who architected and developed a sophisticated CAD-like 2D web-based drawing tool (similar to AutoCAD). Proven track record of delivering innovative web-based solutions across diverse industries including healthcare, construction, fintech, and event management.`,
    experience: [
        {
            company: "InApp Information Technologies India Pvt Ltd",
            position: "System Analyst",
            positions: ["Software Engineer", "Senior Software Engineer", "System Analyst"],
            location: "Trivandrum, Kerala, India",
            startDate: "2021-jul",
            endDate: "Present",
            duration: "4+ years",
            description: [
                "Architected a high-performance 2D CAD web tool using React, Node.js, and Nx Monorepo, enabling precision technical drawing over Google Maps.",
                "Led digital transformation for Hyphen Solutions, migrating legacy monoliths to modern React and AWS serverless architecture (BuilderGM & SupplyPro).",
                "Engineered complex mathematical algorithms for spatial operations, ensuring high-fidelity accuracy for technical documentation.",
                "Designed a scalable event-driven Microservices architecture using AWS (Lambda, SQS, EventBridge) and Azure, resulting in 40% performance improvement.",
                "Optimized data processing for massive JSON payloads (up to 125k lines) by leveraging PostgreSQL stored procedures and IndexedDB.",
                "Established robust CI/CD pipelines using GitHub Actions and AWS CodePipeline, reducing deployment cycles by 60%.",
                "Provided technical leadership within the Technical Management Office (TMO), conducting architectural reviews, code reviews, and mentoring.",
                "Recognized as 'Best Employee of the Quarter (Q1 2025)' and recipient of multiple excellence awards (Kudos, Bravo, Hi5).",
            ],
        },
        {
            company: "Mckayne Technologies",
            position: "Senior Full Stack Engineer",
            location: "Cochin, Kerala, India",
            startDate: "2020-jun",
            endDate: "2021-jun",
            duration: "1 year",
            description: [
                "Spearheaded end-to-end development of the company's digital platform using MERN/MEAN stack.",
                "Managed cloud infrastructure and deployment strategies on AWS for high availability.",
                "Bridged the gap between technical teams and stakeholders using Agile methodologies.",
            ],
        },
        {
            company: "NDimensionZ Solutions Private Limited",
            position: "Junior Software Engineer",
            location: "Kochi, Kerala, India",
            startDate: "2019-may",
            endDate: "2020-mar",
            duration: "11 months",
            description: [
                "Developed robust RESTful APIs to handle core business logic.",
                "Automated routine system maintenance using complex shell scripts.",
                "Generated data-driven reports and analytics for strategic decision-making.",
            ],
        },
        {
            company: "MalaLife Pvt Ltd",
            position: "Frontend Developer",
            location: "Bangalore, Karnataka, India",
            startDate: "2018-may",
            endDate: "2019-apr",
            duration: "1 year",
            description: [
                "Engineered responsive, cross-browser compatible frontend features using Angular and ag-Grid.",
                "Developed key user-facing modules including compatibility analysis algorithms.",
                "Focused on UI/UX optimization, improving user engagement and navigation.",
            ],
        },
    ],
    projects: [
        {
            name: "MetalTech",
            type: "Full Stack",
            period: "2024 - Ongoing",
            description:
                "A high-precision 2D CAD engine enabling technical overlays on geospatial data. Designed to bridge the gap between GIS and engineering design.",
            highlights: [
                "Architected React-based CAD engine with custom Canvas API rendering.",
                "Engineered proprietary mathematical layer for geometric operations.",
                "Designed robust state management using IndexedDB for offline capabilities.",
            ],
            technologies: ["React", "Node.js", "Nx", "PostgreSQL", "Azure", "Canvas API"],
        },
        {
            name: "Hyphen Solutions",
            type: "Full Stack",
            period: "2021 - 2024",
            description:
                "The leading ERP ecosystem for North American residential construction. Led digital transformation of BuilderGM and SupplyPro platforms.",
            highlights: [
                "Orchestrated migration of legacy monoliths to React/AWS Lambda.",
                "Designed event-driven architecture handling 122,000+ users.",
                "Optimized PostgreSQL queries for massive data migrations.",
            ],
            technologies: ["React", "Node.js", "NestJS", "AWS Lambda", "Microservices"],
        },
        {
            name: "DR Connect",
            type: "Full Stack",
            period: "2020",
            description:
                "Secure Healthcare-as-a-Service (HaaS) platform for real-time patient-provider connectivity.",
            highlights: [
                "Architected HIPAA-compliant APIs with end-to-end encryption.",
                "Leveraged MongoDB on AWS for flexible clinical data schemas.",
            ],
            technologies: ["React", "Node.js", "MongoDB", "AWS", "HIPAA"],
        },
        {
            name: "Bipzz & EventCo",
            type: "Backend",
            period: "2020",
            description:
                "High-throughput backend systems for Fintech and Event Management sectors.",
            highlights: [
                "Developed modular Node.js microservices for financial processing.",
                "Built decoupled event-driven systems for high-traffic sales.",
            ],
            technologies: ["Node.js", "AWS EC2", "MongoDB", "Firebase"],
        },
        {
            name: "MalaMatch",
            type: "Frontend",
            period: "2018 - 2019",
            description:
                "Consumer-facing matchmaking app with complex algo-driven compatibility reports.",
            highlights: [
                "Built highly interactive UI using Angular and ag-Grid.",
                "Visualized complex algorithmic data into user dashboards.",
            ],
            technologies: ["Angular", "TypeScript", "ag-Grid", "Ex UI/UX"],
        },
    ],
    skillCategories: [
        {
            category: "Languages & Core",
            icon: Code2,
            skills: ["TypeScript", "JavaScript", "Node.js", "HTML5/CSS3", "Shell", "Next.js", "React", "Angular"],
        },
        {
            category: "Architecture",
            icon: Layers,
            skills: ["Microservices", "Micro Frontends", "Event-Driven", "NestJS", "Express", "REST/GraphQL", "Nx"],
        },
        {
            category: "Cloud & DevOps",
            icon: Cloud,
            skills: ["AWS", "Azure", "Docker", "K8s", "CI/CD", "Serverless", "IaC"],
        },
        {
            category: "Data & Security",
            icon: Database,
            skills: ["PostgreSQL", "MongoDB", "Redis", "Auth0", "Cognito", "Azure B2C", "RBAC"],
        },
        {
            category: "AI & Tools",
            icon: Sparkles,
            skills: ["AI Integration", "Prompt Eng", "Cursor/Copilot", "Claude/GPT", "JIRA", "Git Flow"],
        },
        {
            category: "Leadership",
            icon: Users,
            skills: ["Tech Management", "System Analysis", "Mentorship", "Agile/Scrum", "Code Reviews"],
        },
    ],
    education: [
        {
            degree: "B.E Computer Science and Engineering",
            college: "Mar Ephraem College of Engineering and Technology / Anna University",
            period: "2014 - 2018"
        }
    ],
    certifications: [
        "CutShort Certified HTML/CSS",
        "CutShort Certified Angular",
        "CutShort Certified Javascript",
        "CutShort Certified NodeJS (Node.js)",
    ],
    achievements: [
        "Best Employee of the Quarter (Q1 2025)",
        "Multiple Performance Awards (Kudos-2, Bravo-1, Hi5-1)",
        "Led cross-functional teams in successful project delivery",
        "Implemented scalable microservices architecture",
        "Optimized application performance for large-scale systems",
    ]
};
