
import {
    Code2,
    Layers,
    Cloud,
    Database,
    Sparkles,
    Users,
    Phone,
    Github,
    Globe
} from "lucide-react";
import { FaWhatsapp, FaLinkedin } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

const experience = [
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
            "Led technical decision-making and architectural planning for scalable system design.",
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
];

const getExperienceYears = () => {
    const monthMap: { [key: string]: number } = {
        jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
        jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11
    };

    let earliestTimestamp = Date.now();

    experience.forEach(exp => {
        const [yearStr, monthStr] = exp.startDate.split('-');
        if (yearStr && monthStr) {
            const year = parseInt(yearStr);
            const month = monthMap[monthStr.toLowerCase()] || 0;
            const date = new Date(year, month, 1);
            if (date.getTime() < earliestTimestamp) {
                earliestTimestamp = date.getTime();
            }
        }
    });

    const diff = Date.now() - earliestTimestamp;
    const years = diff / (1000 * 60 * 60 * 24 * 365.25);
    return Math.floor(years) + "+";
};

export const portfolioData = {
    personalInfo: {
        firstName: "Shibin",
        middleName: "Mariyan",
        lastName: "Stanly",
        name: "Shibin Mariyan Stanly",
        title: "Systems Analyst & Senior Full Stack Developer",
        tagline: "Building AI-powered healthcare platforms, interactive EdTech solutions, and precision CAD engines that transform industries.",
        email: "shibinmariyanstanley@gmail.com",
        phone: "+91 8075085487",
        location: "Trivandrum, Kerala, India",
        address: {
            city: "Trivandrum",
            region: "Kerala",
            country: "India",
        },
        preferredLocations: ["Bangalore", "Kochi", "Trivandrum"],
        linkedin: "linkedin.com/in/shibinmariyanstanly",
        portfolio: "shibinmariyan.github.io/portfolio",
        availability: "Actively Seeking",
        keywords: [
            "Senior Full Stack Developer",
            "React Developer",
            "Node.js Engineer",
            "AWS Developer",
            "System Analyst",
            "Microservices",
            "AI Platforms",
            "React",
            "Node.js",
            "AWS",
            "Next.js",
            "TypeScript",
            "Software Architect"
        ],
        socials: [
            {
                name: "Email",
                value: "shibinmariyanstanley@gmail.com",
                href: "mailto:shibinmariyanstanley@gmail.com",
                icon: SiGmail,
                color: "text-red-600 dark:text-red-400",
            },
            {
                name: "WhatsApp",
                value: "+91 8075085487",
                href: "https://wa.me/918075085487",
                icon: FaWhatsapp,
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
                value: "shibinmariyanstanly",
                href: "https://www.linkedin.com/in/shibinmariyanstanly",
                icon: FaLinkedin,
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
        ],
        socialStats: {
            stackoverflow: {
                reputation: "3,200+",
                answers: "150+",
                topTags: ["React", "Node.js", "AWS"]
            },
            github: {
                activeRepos: "12",
                stars: "85+"
            },
            gitlab: {
                activeRepos: "82"
            }
        }
    },
    profileDescription: [
        `Systems Analyst & Senior Full Stack Developer with ${getExperienceYears()} years architecting enterprise solutions across healthcare, education, and geospatial domains. Specialized in AI platforms, CAD engines, and microservices serving 100K+ users.`,
        "Proven track record: PIPEDA-compliant healthcare systems, DPR rendering algorithms, and cloud migrations for legacy systems.",
        "Expert in building real-time collaborative systems, implementing LLM-powered automation, and designing scalable cloud architectures on AWS and Azure. Passionate about creating intuitive user experiences backed by robust engineering.",
        "As a Technical Lead, I set high engineering standards, architect complex systems, and mentor developers to build robust, scalable solutions. I focus on clean code architecture, performance optimization, and driving technical excellence across the stack."
    ],
    summary: `Experienced Systems Analyst and Senior Full Stack Developer with ${getExperienceYears()} years of expertise in MEAN/MERN stack, AWS, Azure, and modern web technologies. Best Employee Award Winner who architected sophisticated solutions including a CAD-like 2D web-based drawing tool, AI-powered healthcare CRM, and interactive EdTech platforms. Proven track record of delivering innovative, compliance-focused web applications across diverse industries including healthcare (PIPEDA/HIPAA), education, construction, fintech, and event management. Specialized in AI/LLM integration, event-driven architectures, and scalable cloud solutions.`,
    experience,
    projects: [
        {
            name: "MetalTech",
            type: "Full Stack",
            period: "2024 - Ongoing",
            description:
                "A high-precision 2D CAD engine built on Google Maps, enabling technical drawing overlays with CAD operations on geospatial data. Combines mapping with professional CAD drawing tools.",
            highlights: [
                "Architected React-based CAD engine with Google Maps integration, achieving 60FPS rendering performance.",
                "Implemented DPR (Device Pixel Ratio) logic, ensuring 100% drawing accuracy across all device types.",
                "Built comprehensive CAD toolset, reducing drafting time by 40% for field engineers.",
                "Designed robust state management using IndexedDB, enabling offline capability for 500+ daily active users.",
            ],
            technologies: ["React", "Node.js", "Nx", "PostgreSQL", "Azure", "Google Maps API", "Canvas API"],
        },
        {
            name: "Kutubi",
            type: "Full Stack",
            period: "2023 - 2024",
            description:
                "Interactive student learning application featuring synchronized audio-text highlighting for EPUB-based storybooks. Enhances reading comprehension through multi-sensory learning.",
            highlights: [
                "Engineered real-time text highlighting synchronized with AWS Polly, reducing audio-text latency to <100ms.",
                "Built EPUB parser pipeline, automating 90% of book ingestion process.",
                "Implemented enterprise-grade RBAC with AWS Cognito, securing data for 50+ institutional clients.",
            ],
            technologies: ["React", "Node.js", "EPUB", "AWS Polly", "AWS Lambda", "S3", "PostgreSQL", "Redis", "Cognito"],
        },
        {
            name: "Speech4All",
            type: "Full Stack",
            period: "2022 - 2023",
            description:
                "Comprehensive CRM and practice management platform for Canadian speech therapists. Features AI-powered clinical report generation, appointment scheduling, and payment tracking.",
            highlights: [
                "Architected PIPEDA-compliant platform, ensuring 100% data privacy compliance for Canadian healthcare standards.",
                "Integrated LLM models to auto-generate reports, cutting documentation time by 50% for therapists.",
                "Built full-featured CRM handling $1M+ in annual payment processing.",
            ],
            technologies: ["React", "NestJS", "AWS", "PostgreSQL", "AWS SQS", "LLM", "AI Integration"],
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
            skills: ["AWS", "Azure", "Docker", "CI/CD", "Serverless", "AWS SQS", "AWS Polly"],
        },
        {
            category: "Data & Security",
            icon: Database,
            skills: ["PostgreSQL", "MongoDB", "Redis", "Auth0", "Cognito", "Azure B2C", "RBAC", "PIPEDA/HIPAA"],
        },
        {
            category: "AI & Tools",
            icon: Sparkles,
            skills: ["LLM Integration", "AI Integration", "Prompt Eng", "Cursor/Copilot", "Claude/GPT", "JIRA", "Git Flow"],
        },
        {
            category: "Leadership",
            icon: Users,
            skills: ["Tech Management", "System Analysis", "Mentorship", "Delivery Management", "Code Reviews"],
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
    ],
    languages: [
        {
            name: "English",
            proficiency: "Fluent"
        },
        {
            name: "Malayalam",
            proficiency: "Native"
        },
        {
            name: "Tamil",
            proficiency: "Conversational"
        },
        {
            name: "Hindi",
            proficiency: "Conversational"
        }
    ],
    interests: ["Cooking", "Photography", "Gardening", "Cricket"]
};
