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
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Resume Download Functionality
async function downloadResume() {
    try {
        // Show loading state
        const originalText = downloadResumeBtn.innerHTML;
        downloadResumeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating PDF...';
        downloadResumeBtn.disabled = true;

        // Create a new PDF document
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF('p', 'mm', 'a4');
        
        // Set font
        doc.setFont('helvetica');
        
        // Add title
        doc.setFontSize(20);
        doc.setFont('helvetica', 'bold');
        doc.text('Shibin Mariyan Stanly', 20, 30);
        
        // Add subtitle
        doc.setFontSize(14);
        doc.setFont('helvetica', 'normal');
        doc.text('Systems Analyst & Full Stack Developer', 20, 40);
        
        // Add contact information
        doc.setFontSize(10);
        doc.text('Email: shibinmariyanstanley@gmail.com', 20, 55);
        doc.text('Phone: +91 8075085487', 20, 62);
        doc.text('Location: Trivandrum, India', 20, 69);
        doc.text('LinkedIn: linkedin.com/in/shibinmariyanstanly', 20, 76);
        doc.text('GitHub: github.com/shibinmariyan', 20, 83);
        
        // Add line separator
        doc.setLineWidth(0.5);
        doc.line(20, 90, 190, 90);
        
        // Add Summary section
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Summary', 20, 105);
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        const summaryText = 'Highly experienced Systems Analyst and Senior Software Engineer with a proven track record of delivering web-based solutions. Expertise in full-stack development using the MEAN/MERN stack, with a strong focus on APIs and cloud services like AWS. Adept at translating business needs into technical requirements, managing project lifecycles, and leading cross-functional teams to successful outcomes.';
        const summaryLines = doc.splitTextToSize(summaryText, 170);
        doc.text(summaryLines, 20, 115);
        
        // Add Professional Experience section
        let yPosition = 140;
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Professional Experience', 20, yPosition);
        yPosition += 10;
        
        // Current Job
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('Systems Analyst | InApp Information Technologies India Pvt Ltd', 20, yPosition);
        yPosition += 7;
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text('July 2021 - Present | Trivandrum', 20, yPosition);
        yPosition += 10;
        
        const currentJobPoints = [
            'Analyzed complex business needs and translated them into detailed technical requirements and user stories',
            'Developed and deployed robust REST APIs using NodeJS and AWS (Lambda, S3)',
            'Spearheaded full-stack development of a real-time drawing application using ReactJS and NestJS',
            'Optimized application performance using IndexedDB and PostgreSQL',
            'Managed DevOps pipelines using Azure and maintained code quality with Nx',
            'Achievement: Best Employee of the Quarter (Q1 2025) and multiple performance awards'
        ];
        
        currentJobPoints.forEach(point => {
            doc.text('• ' + point, 25, yPosition);
            yPosition += 6;
        });
        
        yPosition += 5;
        
        // Previous Jobs
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('Senior Full Stack Engineer | Mckayne Technologies', 20, yPosition);
        yPosition += 7;
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text('June 2020 - June 2021 | Cochin', 20, yPosition);
        yPosition += 10;
        
        const prevJobPoints = [
            'Led a team of developers in end-to-end development using MEAN/MERN stack',
            'Managed server infrastructure and deployment using AWS',
            'Engaged directly with clients to capture solution requirements',
            'Implemented agile methodologies and maintained clear communication with stakeholders'
        ];
        
        prevJobPoints.forEach(point => {
            doc.text('• ' + point, 25, yPosition);
            yPosition += 6;
        });
        
        yPosition += 10;
        
        // Education
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Education', 20, yPosition);
        yPosition += 10;
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text('B.E. in Computer Science and Engineering | Anna University', 20, yPosition);
        yPosition += 6;
        doc.text('June 2014 - May 2018', 20, yPosition);
        yPosition += 10;
        
        // Skills
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Skills', 20, yPosition);
        yPosition += 10;
        
        const skills = [
            'Languages & Technologies: JavaScript, Python, NodeJS, HTML, CSS, Angular, React',
            'Cloud & DevOps: AWS, Lambda, S3, Azure, API Development, DevOps',
            'Frameworks & Libraries: Bootstrap, Tailwind CSS, NestJS, Express, Nx',
            'Methodologies: Agile, SDLC, System Analysis, Technical Documentation',
            'Soft Skills: Problem-Solving, Stakeholder Management, Client Collaboration, Team Leadership'
        ];
        
        skills.forEach(skill => {
            doc.text('• ' + skill, 20, yPosition);
            yPosition += 6;
        });
        
        // Save the PDF
        doc.save('Shibin_Mariyan_Stanly_Resume.pdf');
        
        // Reset button state
        downloadResumeBtn.innerHTML = originalText;
        downloadResumeBtn.disabled = false;
        
        // Show success message
        showMessage('Resume downloaded successfully!', 'success');
        
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
