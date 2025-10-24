// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const downloadResumeBtn = document.getElementById('download-resume');
const downloadResumeHero = document.getElementById('download-resume-hero');
const contactForm = document.getElementById('contactForm');

// Initialize Particles.js and update current year
document.addEventListener('DOMContentLoaded', function() {
    // Update current year in footer
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // Initialize Particles.js
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 100, density: { enable: true, value_area: 800 } },
                color: { value: '#ffffff' },
                shape: { type: 'circle' },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#ffffff',
                    opacity: 0.4,
                    width: 1,
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                },
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'grab' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true,
                },
            },
            retina_detect: true,
        });
    }
});

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(26, 26, 46, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(26, 26, 46, 0.9)';
        navbar.style.boxShadow = 'none';
    }
});

// ATS-Friendly Resume Download Functionality with Multi-page Support
async function downloadResume() {
    try {
        // Show loading state
        const originalText = downloadResumeBtn.innerHTML;
        downloadResumeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating PDF...';
        downloadResumeBtn.disabled = true;

        // Create a new PDF document with ATS-friendly formatting
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF('p', 'mm', 'a4');
        
        // Set margins and page dimensions for A4 (210mm x 297mm)
        const pageWidth = 210;
        const pageHeight = 297;
        const margin = 20;
        const contentWidth = pageWidth - (2 * margin);
        const maxContentHeight = pageHeight - (2 * margin) - 20; // Leave space for footer
        const footerY = pageHeight - 15;
        
        let currentPage = 1;
        let totalPages = 1;
        let yPosition = 20;
        
        // Helper function to check if we need a new page
        function checkNewPage(requiredHeight) {
            if (yPosition + requiredHeight > maxContentHeight) {
                // Add footer to current page
                addPageFooter(currentPage, totalPages);
                
                // Add new page
                doc.addPage();
                currentPage++;
                totalPages++;
                yPosition = 20;
                return true;
            }
            return false;
        }
        
        // Helper function to add page footer
        function addPageFooter(pageNum, totalPages) {
            doc.setFontSize(8);
            doc.setFont('helvetica', 'normal');
            doc.text('Generated on: ' + new Date().toLocaleDateString(), margin, footerY);
            doc.text(`Page ${pageNum} of ${totalPages}`, pageWidth - margin - 20, footerY);
        }
        
        // Helper function to add text with proper wrapping and pagination
        function addText(text, x, y, maxWidth = contentWidth, fontSize = 10, fontStyle = 'normal') {
            doc.setFontSize(fontSize);
            doc.setFont('helvetica', fontStyle);
            const lines = doc.splitTextToSize(text, maxWidth);
            const lineHeight = fontSize * 0.4;
            const totalHeight = lines.length * lineHeight;
            
            // Check if we need a new page
            if (checkNewPage(totalHeight)) {
                // Add text to new page
                doc.text(lines, x, yPosition);
                return yPosition + totalHeight;
            }
            
            // Add text to current page
            doc.text(lines, x, y);
            return y + totalHeight;
        }
        
        // Helper function to add section header with pagination
        function addSectionHeader(title, y) {
            const headerHeight = 8;
            if (checkNewPage(headerHeight)) {
                y = yPosition;
            }
            
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.text(title, margin, y);
            // Add underline
            doc.setLineWidth(0.5);
            doc.line(margin, y + 2, margin + 30, y + 2);
            return y + headerHeight;
        }
        
        // Helper function to add bullet points with pagination
        function addBulletPoints(items, startY, fontSize = 9) {
            let currentY = startY;
            const lineHeight = fontSize * 0.4;
            
            items.forEach(item => {
                const text = '• ' + item;
                const lines = doc.splitTextToSize(text, contentWidth - 5);
                const itemHeight = lines.length * lineHeight;
                
                if (checkNewPage(itemHeight)) {
                    currentY = yPosition;
                }
                
                doc.setFontSize(fontSize);
                doc.setFont('helvetica', 'normal');
                doc.text(lines, margin + 5, currentY);
                currentY += itemHeight;
            });
            
            return currentY;
        }
        
        // Header Section - ATS Friendly
        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        doc.text('SHIBIN MARIYAN STANLY', margin, yPosition);
        yPosition += 8;
        
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text('Systems Analyst & Full Stack Developer', margin, yPosition);
        yPosition += 12;
        
        // Contact Information - ATS Friendly Format
        const contactInfo = [
            'Email: shibinmariyanstanley@gmail.com',
            'Phone: +91 8075085487',
            'Location: Trivandrum, Kerala, India',
            'LinkedIn: linkedin.com/in/shibinmariyanstanly',
            'GitHub: github.com/shibinmariyan'
        ];
        
        contactInfo.forEach(info => {
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.text(info, margin, yPosition);
            yPosition += 5;
        });
        
        yPosition += 5;
        
        // Professional Summary
        yPosition = addSectionHeader('PROFESSIONAL SUMMARY', yPosition);
        const summaryText = 'Experienced Systems Analyst and Senior Software Engineer with 6+ years of expertise in MEAN/MERN stack development, AWS cloud services, and full-stack web applications. Proven track record of translating business requirements into technical solutions, leading cross-functional teams, and delivering high-quality software products. Award-winning professional with strong analytical skills and expertise in API development, microservices architecture, and DevOps practices.';
        yPosition = addText(summaryText, margin, yPosition, contentWidth, 10, 'normal') + 5;
        
        // Technical Skills - ATS Friendly
        yPosition = addSectionHeader('TECHNICAL SKILLS', yPosition);
        
        const skillsData = [
            { category: 'Programming Languages', skills: 'JavaScript, TypeScript, HTML5, CSS3' },
            { category: 'Frameworks & Libraries', skills: 'React, Angular, Next.js, Node.js, NestJS, Express.js' },
            { category: 'Cloud & DevOps', skills: 'AWS (Lambda, S3, EC2, EKS, Cognito, SQS), Azure, Docker, CI/CD' },
            { category: 'Databases', skills: 'MongoDB, PostgreSQL, Redis, IndexedDB' },
            { category: 'AI & Automation Tools', skills: 'ChatGPT, Claude AI, GitHub Copilot, Automated Testing' },
            { category: 'Tools & Technologies', skills: 'Git, Nx, JIRA, Microservices, REST API, GraphQL' },
            { category: 'Methodologies', skills: 'Agile, SDLC, System Analysis, Technical Documentation' }
        ];
        
        skillsData.forEach(skill => {
            doc.setFontSize(10);
            doc.setFont('helvetica', 'bold');
            doc.text(skill.category + ':', margin, yPosition);
            doc.setFont('helvetica', 'normal');
            doc.text(skill.skills, margin + 40, yPosition);
            yPosition += 6;
        });
        
        yPosition += 5;
        
        // Professional Experience
        yPosition = addSectionHeader('PROFESSIONAL EXPERIENCE', yPosition);
        
        // Current Position
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text('Systems Analyst', margin, yPosition);
        doc.setFont('helvetica', 'normal');
        doc.text('InApp Information Technologies India Pvt Ltd', margin + 35, yPosition);
        yPosition += 6;
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'italic');
        doc.text('July 2021 - Present | Trivandrum, Kerala', margin, yPosition);
        yPosition += 8;
        
        const currentJobAchievements = [
            'Analyzed complex business requirements and translated them into detailed technical specifications and user stories',
            'Developed and deployed robust REST APIs using Node.js and AWS services (Lambda, S3, EC2)',
            'Led full-stack development of revolutionary drawing tool application similar to AutoCAD with Google Maps integration',
            'Built real-time collaborative drawing features using React.js, NestJS, and WebSocket technologies',
            'Optimized application performance by implementing IndexedDB and PostgreSQL database solutions',
            'Managed DevOps pipelines using Azure and maintained code quality standards with Nx monorepo',
            'Collaborated with cross-functional teams to deliver projects on time and within budget',
            'Achieved Best Employee of the Quarter (Q1 2025) and multiple performance awards'
        ];
        
        yPosition = addBulletPoints(currentJobAchievements, yPosition, 9);
        yPosition += 5;
        
        // Previous Position
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text('Senior Full Stack Engineer', margin, yPosition);
        doc.setFont('helvetica', 'normal');
        doc.text('Mckayne Technologies', margin + 45, yPosition);
        yPosition += 6;
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'italic');
        doc.text('June 2020 - June 2021 | Cochin, Kerala', margin, yPosition);
        yPosition += 8;
        
        const prevJobAchievements = [
            'Led development team in end-to-end application development using MEAN/MERN stack',
            'Managed server infrastructure and deployment processes using AWS cloud services',
            'Engaged directly with clients to gather and analyze solution requirements',
            'Implemented agile methodologies and maintained clear communication with stakeholders',
            'Developed scalable web applications with modern frontend and backend technologies'
        ];
        
        yPosition = addBulletPoints(prevJobAchievements, yPosition, 9);
        yPosition += 5;
        
        // Earlier Position
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text('Frontend Developer', margin, yPosition);
        doc.setFont('helvetica', 'normal');
        doc.text('MalaLife Pvt Ltd', margin + 35, yPosition);
        yPosition += 6;
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'italic');
        doc.text('May 2018 - April 2019 | Bangalore, Karnataka', margin, yPosition);
        yPosition += 8;
        
        const earlyJobAchievements = [
            'Developed responsive, cross-browser compatible websites using HTML, CSS, and JavaScript',
            'Contributed to development of key user-facing features and functionality',
            'Collaborated with design team to implement pixel-perfect UI/UX designs'
        ];
        
        yPosition = addBulletPoints(earlyJobAchievements, yPosition, 9);
        yPosition += 8;
        
        // Key Projects
        yPosition = addSectionHeader('KEY PROJECTS', yPosition);
        
        // MetalTech Project
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text('MetalTech - Drawing Tool Application (2024-2025)', margin, yPosition);
        yPosition += 6;
        
        const metalTechDescription = 'Revolutionary drawing tool application similar to AutoCAD that operates directly on top of Google Maps. Built with React and Nx monorepo architecture, featuring real-time collaborative drawing, precision measurement tools, and seamless map integration for architectural and engineering workflows.';
        yPosition = addText(metalTechDescription, margin, yPosition, contentWidth, 9, 'normal') + 3;
        
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.text('Technologies: ', margin, yPosition);
        doc.setFont('helvetica', 'normal');
        doc.text('React, Nx, NestJS, PostgreSQL, Google Maps API, Canvas API, Azure', margin + 25, yPosition);
        yPosition += 8;
        
        // Hyphen Project
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text('Hyphen - Microservices Platform (2021-2024)', margin, yPosition);
        yPosition += 6;
        
        const hyphenDescription = 'Backend development project focusing on robust API development, microservices architecture, and cloud infrastructure. Designed and implemented comprehensive microservices ecosystem handling 50+ API endpoints with 60% performance improvement.';
        yPosition = addText(hyphenDescription, margin, yPosition, contentWidth, 9, 'normal') + 3;
        
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.text('Technologies: ', margin, yPosition);
        doc.setFont('helvetica', 'normal');
        doc.text('NodeJS, Microservices, AWS, MSSQL, Terraform', margin + 25, yPosition);
        yPosition += 8;
        
        // Education
        yPosition = addSectionHeader('EDUCATION', yPosition);
        
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text('Bachelor of Engineering in Computer Science and Engineering', margin, yPosition);
        yPosition += 6;
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text('Anna University, Chennai, Tamil Nadu', margin, yPosition);
        yPosition += 5;
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'italic');
        doc.text('June 2014 - May 2018', margin, yPosition);
        yPosition += 8;
        
        // Languages
        yPosition = addSectionHeader('LANGUAGES', yPosition);
        
        const languages = [
            'English: Fluent',
            'Malayalam: Native',
            'Tamil: Conversational'
        ];
        
        yPosition = addBulletPoints(languages, yPosition, 10);
        yPosition += 5;
        
        // Interests
        yPosition = addSectionHeader('INTERESTS', yPosition);
        
        const interests = [
            'Problem-Solving',
            'Team Leadership',
            'Continuous Learning',
            'Technology Innovation'
        ];
        
        yPosition = addBulletPoints(interests, yPosition, 10);
        
        // Add footer to the last page
        addPageFooter(currentPage, totalPages);
        
        // Save the PDF with ATS-friendly filename
        doc.save('Shibin_Mariyan_Stanly_Resume_ATS.pdf');
        
        // Reset button state
        downloadResumeBtn.innerHTML = originalText;
        downloadResumeBtn.disabled = false;
        
        // Show success message
        showMessage(`ATS-friendly resume downloaded successfully! (${totalPages} page${totalPages > 1 ? 's' : ''})`, 'success');
        
    } catch (error) {
        console.error('Error generating PDF:', error);
        
        // Reset button state
        downloadResumeBtn.innerHTML = originalText;
        downloadResumeBtn.disabled = false;
        
        // Show error message
        showMessage('Error generating PDF. Please try again.', 'error');
    }
}

// Add event listeners for download buttons
downloadResumeBtn.addEventListener('click', downloadResume);
downloadResumeHero.addEventListener('click', downloadResume);

// Add event listener for recruiter download button
const downloadResumeRecruiter = document.getElementById('download-resume-recruiter');
if (downloadResumeRecruiter) {
    downloadResumeRecruiter.addEventListener('click', downloadResume);
}

// Contact Form Handling
contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    
    try {
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual email service)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // For demo purposes, we'll just show a success message
        // In a real implementation, you would send the data to your backend
        showMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
        
        // Reset form
        contactForm.reset();
        
    } catch (error) {
        console.error('Error sending message:', error);
        showMessage('Error sending message. Please try again.', 'error');
    } finally {
        // Reset button state
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
    }
});

// Show message function
function showMessage(text, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const message = document.createElement('div');
    message.className = `message ${type}`;
    message.textContent = text;
    
    // Insert message at the top of the contact form
    const contactForm = document.getElementById('contactForm');
    contactForm.insertBefore(message, contactForm.firstChild);
    
    // Auto remove message after 5 seconds
    setTimeout(() => {
        if (message.parentNode) {
            message.remove();
        }
    }, 5000);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.timeline-item, .skill-category, .about-text, .contact-info, .contact-form');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        setTimeout(() => {
            typeWriter(heroTitle, originalText.replace(/<[^>]*>/g, ''), 50);
        }, 1000);
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Scroll-based Skills Animation
function initSkillsScrollAnimation() {
    const skillsTrack = document.querySelector('.skills-track');
    if (!skillsTrack) return;
    
    // Clone all skill items for seamless scrolling
    const skillItems = skillsTrack.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        const clone = item.cloneNode(true);
        skillsTrack.appendChild(clone);
    });
    
    // Add scroll-based animation
    const skillsContainer = document.querySelector('.skills-scroll-container');
    if (skillsContainer) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    skillsTrack.style.animationPlayState = 'running';
                } else {
                    skillsTrack.style.animationPlayState = 'paused';
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(skillsContainer);
    }
}

// Add smooth reveal animation for skill tags
function animateSkillTags() {
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        setTimeout(() => {
            tag.style.opacity = '0';
            tag.style.transform = 'translateY(20px)';
            tag.style.transition = 'all 0.3s ease';
            
            setTimeout(() => {
                tag.style.opacity = '1';
                tag.style.transform = 'translateY(0)';
            }, 100);
        }, index * 50);
    });
}

// Trigger skill tag animation when skills section is visible
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillTags();
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }
    
    // Initialize scroll-based skills animation
    initSkillsScrollAnimation();
    
    // Initialize project filters
    console.log('Initializing project filters...');
    initProjectFilters();
    
    // Initialize scroll animations
    initScrollAnimations();
    
});

// Add click-to-copy functionality for contact details
document.addEventListener('DOMContentLoaded', () => {
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => {
            const text = item.querySelector('p').textContent;
            navigator.clipboard.writeText(text).then(() => {
                showMessage(`${text} copied to clipboard!`, 'success');
            }).catch(() => {
                showMessage('Unable to copy to clipboard', 'error');
            });
        });
    });
});

// Add hover effects for timeline items
document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateX(10px)';
            item.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(0)';
        });
    });
});

// Interactive 3D effect for skill cards
document.addEventListener('DOMContentLoaded', () => {
    const skillCards = document.querySelectorAll('.skill-category');
    skillCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const x = e.offsetX;
            const y = e.offsetY;
            const rotateY = (-1 / 5) * x + 20;
            const rotateX = (4 / 30) * y - 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(500px) rotateX(5deg)';
        });
    });
});

// Enhanced 3D effect for profile card
document.addEventListener('DOMContentLoaded', () => {
    const profileCard = document.querySelector('.profile-card');
    if (profileCard) {
        profileCard.addEventListener('mousemove', (e) => {
            const rect = profileCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            profileCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
        });

        profileCard.addEventListener('mouseleave', () => {
            profileCard.style.transform = 'perspective(1000px) rotateX(5deg)';
        });
    }
});

// Performance optimization: Lazy load images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Add focus management for accessibility
document.addEventListener('DOMContentLoaded', () => {
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
    focusableElements.forEach(element => {
        element.addEventListener('focus', () => {
            element.style.outline = '2px solid #2563eb';
            element.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', () => {
            element.style.outline = 'none';
        });
    });
});

// Project Filter Functionality
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    console.log('Found filter buttons:', filterButtons.length);
    console.log('Found project cards:', projectCards.length);
    
    // Check if elements exist
    if (!filterButtons.length || !projectCards.length) {
        console.warn('Project filter elements not found');
        return;
    }
    
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            try {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');
                
                const filter = button.getAttribute('data-filter');
                
                if (!filter) {
                    console.warn('No filter attribute found on button');
                    return;
                }
                
                // Filter projects with animation
                projectCards.forEach((card, index) => {
                    const category = card.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        // Show project with fade-in animation
                        setTimeout(() => {
                            if (card) {
                                card.classList.remove('hidden', 'fade-out');
                                card.classList.add('fade-in');
                            }
                        }, index * 50); // Reduced stagger for better performance
                    } else {
                        // Hide project with fade-out animation
                        if (card) {
                            card.classList.add('fade-out');
                            setTimeout(() => {
                                if (card) {
                                    card.classList.add('hidden');
                                    card.classList.remove('fade-in');
                                }
                            }, 200); // Reduced timeout
                        }
                    }
                });
            } catch (error) {
                console.error('Error in project filter:', error);
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    // Create intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Add hover effects to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(5deg) translateY(0) scale(1)';
        });
    });

    // Add floating animation to skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('float-animation');
    });
}

