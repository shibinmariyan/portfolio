// Portfolio JavaScript - Clean Version

// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navbar = document.getElementById('navbar');
const contactForm = document.getElementById('contactForm');
const downloadResumeBtn = document.getElementById('download-resume');
const downloadResumeHero = document.getElementById('download-resume-hero');

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
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(26, 26, 46, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(26, 26, 46, 0.9)';
        navbar.style.boxShadow = 'none';
    }
});

// Resume Download Functionality - Direct PDF Download
async function downloadResumePDF() {
    console.log('downloadResumePDF called');
    try {
        // Track resume download
        if (typeof trackResumeDownload === 'function') {
            trackResumeDownload('portfolio_download');
        }
        
        // Show loading state
        const downloadButtons = document.querySelectorAll('[id*="download-resume"], .nav-link.download-btn, .download-btn');
        downloadButtons.forEach(btn => {
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating PDF...';
            btn.disabled = true;
            
            // Reset after 5 seconds
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 5000);
        });

        // Open resume.html in a hidden iframe to generate PDF
        const iframe = document.createElement('iframe');
        // Set explicit dimensions even though hidden - helps with layout calculation
        iframe.style.position = 'absolute';
        iframe.style.left = '-9999px';
        iframe.style.width = '1000px';
        iframe.style.height = '1400px';
        iframe.style.border = 'none';
        iframe.src = 'resume.html';
        document.body.appendChild(iframe);

        // Wait for iframe to load
        iframe.onload = async function() {
            console.log('Iframe loaded, waiting for libraries...');
            try {
                // Access the iframe's document
                const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                
                if (!iframeDoc) {
                    throw new Error('Cannot access iframe document');
                }
                
                // Wait for page to fully load and render, and for libraries to load
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Check if downloadPDF function exists
                if (typeof iframe.contentWindow.downloadPDF === 'function') {
                    console.log('Calling downloadPDF in iframe...');
                // Trigger the download function in the iframe
                iframe.contentWindow.downloadPDF();
                } else {
                    console.error('downloadPDF function not found in iframe');
                    throw new Error('downloadPDF function not available');
                }
                
                // Remove iframe after download
                setTimeout(() => {
                    if (document.body.contains(iframe)) {
                    document.body.removeChild(iframe);
                    }
                }, 3000);
                
            } catch (error) {
                console.error('Error accessing iframe:', error);
                // Fallback: open resume.html in new tab
                alert('Opening resume in new tab. Please click the download button there.');
                window.open('resume.html', '_blank');
                if (document.body.contains(iframe)) {
                document.body.removeChild(iframe);
                }
            }
        };

        // Fallback timeout
        setTimeout(() => {
            if (document.body.contains(iframe)) {
                document.body.removeChild(iframe);
            }
        }, 10000);
        
    } catch (error) {
        console.error('Error downloading resume:', error);
        // Fallback: open resume.html in new tab
        window.open('resume.html', '_blank');
    }
}

// Add event listeners for download buttons
document.addEventListener('DOMContentLoaded', function() {
    const downloadButtons = document.querySelectorAll('[id*="download-resume"]');
    
    if (downloadButtons.length === 0) {
        console.warn('No download resume buttons found');
    } else {
        console.log(`Found ${downloadButtons.length} download resume button(s)`);
    }
    
    downloadButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Download resume button clicked');
            downloadResumePDF();
        });
    });
    
    // Also add click handlers for buttons with class "download-btn" in nav
    const navDownloadBtns = document.querySelectorAll('.nav-link.download-btn, .download-btn');
    navDownloadBtns.forEach(btn => {
        if (!btn.id || !btn.id.includes('download-resume')) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Nav download button clicked');
                downloadResumePDF();
            });
        }
    });
});

// Contact Form Handling
// Option 1: FormSubmit (Free, no backend needed) - Currently Active
// Option 2: MailerSend via Backend (Uncomment and configure backend URL)
if (contactForm) {
// Enable/disable submit button based on form validity
const submitBtn = contactForm.querySelector('#submitBtn') || contactForm.querySelector('button[type="submit"]');
const formInputs = contactForm.querySelectorAll('input[required], textarea[required]');

function checkFormValidity() {
    let isValid = true;
    formInputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
        }
    });
    
    // Check email format
    const emailInput = contactForm.querySelector('input[type="email"]');
    if (emailInput && emailInput.value && !emailInput.validity.valid) {
        isValid = false;
    }
    
    if (submitBtn) {
        submitBtn.disabled = !isValid;
    }
}

// Add event listeners to all form fields
formInputs.forEach(input => {
    input.addEventListener('input', checkFormValidity);
    input.addEventListener('change', checkFormValidity);
    input.addEventListener('blur', checkFormValidity);
});

// Initial check
checkFormValidity();
contactForm.addEventListener('submit', async function(e) {
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
    // OPTION 1: FormSubmit (Free, currently active) - Let form submit naturally
    // FormSubmit will handle the submission and redirect back with success parameter
    // Don't prevent default - let the form submit to FormSubmit
    
    // OPTION 2: MailerSend via Backend (Uncomment to use instead of FormSubmit)
    // Uncomment the code below and comment out the form's action attribute
    /*
    e.preventDefault(); // Prevent default form submission
    
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    try {
        // Replace with your deployed backend URL
        const backendUrl = 'https://your-backend-url.railway.app/send-email';
        // Or: 'https://your-backend-url.herokuapp.com/send-email'
        // Or: 'https://your-backend-url.onrender.com/send-email'
        
        const response = await fetch(backendUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
                subject: subject,
                message: message
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            showMessage('Thank you! Your message has been sent successfully. I\'ll get back to you soon.', 'success');
            contactForm.reset();
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        } else {
            throw new Error(result.error || 'Failed to send email');
        }
    } catch (error) {
        console.error('Error sending message:', error);
        showMessage('Sorry, there was an error sending your message. Please try again or email me directly at shibinmariyanstanley@gmail.com', 'error');
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
    }
    */
});

// Check for success parameter in URL (FormSubmit redirect)
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('success') === 'true') {
    showMessage('Thank you! Your message has been sent successfully. I\'ll get back to you soon.', 'success');
    // Clean up URL
    window.history.replaceState({}, document.title, window.location.pathname);
}
}

/* 
 * IMPORTANT: MailerSend SMTP Setup
 * 
 * For security reasons, SMTP credentials cannot be used directly in frontend JavaScript.
 * To use MailerSend with your SMTP credentials, you have two options:
 * 
 * OPTION 1: Use FormSubmit (Current Implementation - FREE)
 * - Already configured above
 * - No setup required
 * - Works immediately
 * - Free for 50 submissions/month
 * 
 * OPTION 2: Use MailerSend via Backend
 * To use your MailerSend SMTP credentials securely, you need a backend server:
 * 
 * 1. Create a simple backend endpoint (Node.js/PHP/Python)
 * 2. Use your MailerSend SMTP credentials on the backend
 * 3. Send POST requests from frontend to your backend
 * 
 * Example Node.js backend code:
 * ```javascript
 * const nodemailer = require('nodemailer');
 * 
 * const transporter = nodemailer.createTransport({
 *   host: 'smtp.mailersend.net',
 *   port: 587,
 *   secure: false,
 *   auth: {
 *     user: 'MS_V1EG9m@test-q3enl6kq1kr42vwr.mlsender.net',
 *     pass: 'mssp.0EX7Spx.neqvygm3j6jl0p7w.8G5QbXS'
 *   }
 * });
 * ```
 * 
 * OPTION 3: Use MailerSend API (Recommended)
 * - Get API token from MailerSend dashboard
 * - Use MailerSend REST API instead of SMTP
 * - More secure and designed for transactional emails
 */

// Show message function
function showMessage(message, type) {
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `message message-${type}`;
    messageEl.textContent = message;
    
    // Style the message
    messageEl.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
    `;
    
    if (type === 'success') {
        messageEl.style.background = '#4CAF50';
    } else if (type === 'error') {
        messageEl.style.background = '#f44336';
    }
    
    // Add to page
    document.body.appendChild(messageEl);
    
    // Remove after 5 seconds
    setTimeout(() => {
        messageEl.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(messageEl);
        }, 300);
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
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
    animatedElements.forEach(el => observer.observe(el));
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
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 1000);
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Scroll-based Skills Animation
function animateSkills() {
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Add smooth reveal animation for skill tags
function animateSkillTags() {
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
            setTimeout(() => {
                tag.style.opacity = '1';
            tag.style.transform = 'scale(1)';
        }, index * 50);
    });
}

// Trigger skill tag animation when skills section is visible
const skillsSection = document.querySelector('.skills');
if (skillsSection) {
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillTags();
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

        skillsObserver.observe(skillsSection);
    }

// Add click-to-copy functionality for contact details (excluding WhatsApp and email links)
document.addEventListener('DOMContentLoaded', () => {
    const contactItems = document.querySelectorAll('.contact-item a');
    contactItems.forEach(item => {
        // Skip WhatsApp and email links - let them work normally
        const href = item.getAttribute('href') || '';
        if (href.includes('wa.me') || href.includes('whatsapp') || href.startsWith('mailto:')) {
            return; // Skip this link, let it work normally
        }
        
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const text = this.textContent;
            navigator.clipboard.writeText(text).then(() => {
                showMessage(`${text} copied to clipboard!`, 'success');
            });
        });
    });
});

// Add hover effects for timeline items
document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
});

// Interactive 3D effect for skill cards
document.addEventListener('DOMContentLoaded', () => {
    const skillCards = document.querySelectorAll('.skill-category');
    skillCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
});

// Enhanced 3D effect for profile card
document.addEventListener('DOMContentLoaded', () => {
    const profileCard = document.querySelector('.profile-card');
    if (profileCard) {
        profileCard.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });

        profileCard.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
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
        // Close mobile menu
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Add focus management for accessibility
document.addEventListener('DOMContentLoaded', () => {
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #3498db';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
});

// Project Filter Functionality
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');
                
                const filter = button.getAttribute('data-filter');
                
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});

// Scroll Animations with Section Tracking
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Track section views
                const section = entry.target.closest('section');
                if (section && typeof trackSectionView === 'function') {
                    const sectionId = section.id || section.className.split(' ')[0];
                    trackSectionView(sectionId);
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        scrollObserver.observe(element);
    });
});

// AI Chatbot Functionality
class AIChatbot {
    constructor() {
        this.toggle = document.getElementById('aiChatbotToggle');
        this.chatbot = document.getElementById('aiChatbot');
        this.messages = document.getElementById('chatbotMessages');
        this.input = document.getElementById('chatbotInput');
        this.sendBtn = document.getElementById('sendMessage');
        this.closeBtn = document.getElementById('closeChatbot');
        
        this.isOpen = false;
        this.init();
    }
    
    init() {
        this.toggle.addEventListener('click', () => this.toggleChatbot());
        this.closeBtn.addEventListener('click', () => this.closeChatbot());
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
        
        // Auto-open after 10 seconds
        setTimeout(() => {
            if (!this.isOpen) {
                this.showWelcomeMessage();
            }
        }, 10000);
    }
    
    toggleChatbot() {
        this.isOpen ? this.closeChatbot() : this.openChatbot();
    }
    
    openChatbot() {
        this.chatbot.style.display = 'flex';
        this.toggle.classList.add('active');
        this.isOpen = true;
        this.input.focus();
    }
    
    closeChatbot() {
        this.chatbot.style.display = 'none';
        this.toggle.classList.remove('active');
        this.isOpen = false;
    }
    
    showWelcomeMessage() {
        this.toggle.style.animation = 'pulse 2s infinite';
        setTimeout(() => {
            this.toggle.style.animation = '';
        }, 5000);
    }
    
    addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = isUser ? 'user-message' : 'ai-message';
        messageDiv.textContent = text;
        this.messages.appendChild(messageDiv);
        this.messages.scrollTop = this.messages.scrollHeight;
    }
    
    async sendMessage() {
        const message = this.input.value.trim();
        if (!message) return;
        
        this.addMessage(message, true);
        this.input.value = '';
        
        // Track chatbot usage
        if (typeof trackChatbotUsage === 'function') {
            trackChatbotUsage(message, '');
        }
        
        // Show typing indicator
        const typingDiv = document.createElement('div');
        typingDiv.className = 'ai-message';
        typingDiv.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Thinking...';
        this.messages.appendChild(typingDiv);
        
        // Simulate AI response delay
        setTimeout(() => {
            this.messages.removeChild(typingDiv);
            const response = this.generateResponse(message);
            this.addMessage(response);
            
            // Track response
            if (typeof trackChatbotUsage === 'function') {
                trackChatbotUsage(message, response);
            }
        }, 1000 + Math.random() * 1000);
    }
    
    generateResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Experience and background
        if (lowerMessage.includes('experience') || lowerMessage.includes('background')) {
            return "Shibin has 6+ years of experience as a Systems Analyst and Senior Full Stack Developer. He's worked at InApp Information Technologies (current), Mckayne Technologies, and MalaLife Pvt Ltd. At InApp, he architected and developed a sophisticated 2D web-based CAD-like drawing tool using React, Node.js, and Nx monorepo, enabling technical drawings over Google Maps, images, plans, or blank canvases. He implemented complex mathematical algorithms for geometric operations (segment distance calculations, rotation, mirroring, scaling) and developed robust PDF generation functionality. He's an active TMO member conducting code reviews, leads a JavaScript learning community, participates in cultural activities (Aala, CSIR, Elefaanty), and was cricket team captain in 2023. He specializes in MEAN/MERN stack, AWS, Azure, and has won multiple performance awards including Best Employee of the Quarter Q1 2025.";
        }
        
        // Skills
        if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('tech')) {
            return "Shibin's core skills include: JavaScript, Node.js, React, Angular, AWS, Azure, MongoDB, PostgreSQL, Nx Monorepo, Microservices, API Development, Cloud Architecture, DevOps, CI/CD, Shell Script, Systems Analysis, Mathematical Algorithms, PDF Generation, IndexedDB, and Team Leadership. He's also experienced with Docker, NestJS, Express, Python, and complex geometric operations for technical drawing applications.";
        }
        
        // Availability
        if (lowerMessage.includes('available') || lowerMessage.includes('hiring') || lowerMessage.includes('job')) {
            return "Shibin is open to new opportunities! He's available for Systems Analyst, Full Stack Developer, and Senior Software Engineer positions. His notice period is 2 months, and he's located in Trivandrum, Kerala, India. He's open to remote and hybrid work opportunities.";
        }
        
        // Projects
        if (lowerMessage.includes('project') || lowerMessage.includes('work')) {
            return "Shibin has worked on several impressive projects including MetalTech/CAD-like Drawing Tool (sophisticated 2D web-based drawing application similar to AutoCAD using React, Node.js, Nx monorepo, Azure, and PostgreSQL - features include multi-layer support over Google Maps/images/plans/blank canvas, complex mathematical algorithms for geometric operations like segment distance calculations, rotation, mirroring, scaling, PDF generation, RBAC, drawing optimization, and history management - with 3D capabilities planned), Hyphen (microservices backend with AWS), Kutubi (AI transcription app), DR Connect (healthcare platform), and EventCo (event management). Each project showcases different aspects of his full-stack expertise.";
        }
        
        // Awards
        if (lowerMessage.includes('award') || lowerMessage.includes('achievement') || lowerMessage.includes('recognition')) {
            return "Shibin has received multiple awards including Best Employee of the Quarter Q1 2025, Kudos-2, Bravo-1, and Hi5-1 performance awards. These recognize his exceptional work, leadership, and contribution to team success.";
        }
        
        // Leadership
        if (lowerMessage.includes('leadership') || lowerMessage.includes('team') || lowerMessage.includes('management')) {
            return "Shibin demonstrates strong leadership through his TMO membership conducting code reviews and cross-project support, leading a JavaScript learning community, active participation in cultural activities (Aala, CSIR, Elefaanty children programs), and serving as cricket team captain in 2023. He combines technical expertise with people management and community building skills.";
        }
        
        // Contact
        if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('email')) {
            return "You can contact Shibin at shibinmariyanstanley@gmail.com or +91 8075085487. He's also active on LinkedIn (linkedin.com/in/shibinmariyanstanly) and GitHub (github.com/shibinmariyan). He's based in Trivandrum, Kerala, India.";
        }
        
        // Salary/Compensation
        if (lowerMessage.includes('salary') || lowerMessage.includes('compensation') || lowerMessage.includes('pay')) {
            return "Shibin is looking for competitive compensation as per industry standards. Given his 6+ years of experience, multiple awards, and expertise in modern technologies, he's open to discussing compensation based on the role and company.";
        }
        
        // Default responses
        const defaultResponses = [
            "That's a great question! Shibin has extensive experience in full-stack development and systems analysis. Would you like to know more about his specific skills or projects?",
            "I'd be happy to help! Shibin is a highly skilled developer with 6+ years of experience. What specific aspect of his background interests you most?",
            "Great question! Shibin is open to new opportunities and has a strong track record. Feel free to ask about his experience, skills, projects, or availability.",
            "I can tell you more about Shibin's experience, skills, projects, or availability. What would you like to know?"
        ];
        
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }
}

// Particles.js Animation
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#ffffff'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#ffffff',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 6,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'repulse'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 400,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }
}

// Update Current Year
function updateCurrentYear() {
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
}

// Initialize AI Chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AIChatbot();
    
    // Initialize Particles.js
    initParticles();
    
    // Update current year
    updateCurrentYear();
    
    // Initialize profile image with fallback
    initProfileImage();
    
    // Make all phone numbers clickable with WhatsApp
    makePhoneNumbersClickable();
});

// Make phone numbers clickable with WhatsApp links
function makePhoneNumbersClickable() {
    // Ensure WhatsApp links work properly - remove any interfering handlers
    document.addEventListener('click', function(e) {
        const target = e.target.closest('a');
        if (target && (target.href.includes('wa.me') || target.href.includes('whatsapp') || target.classList.contains('whatsapp-phone-link'))) {
            // Don't prevent default - let WhatsApp links work normally
            // Remove any toast messages that might be triggered
            e.stopPropagation();
            return true;
        }
    }, false);
    
    // Phone number patterns to match
    const phonePatterns = [
        /(\+91[\s-]?)?([6-9]\d{9})/g, // Indian phone numbers
        /(\+?1[\s.-]?)?\(?([0-9]{3})\)?[\s.-]?([0-9]{3})[\s.-]?([0-9]{4})/g, // US numbers
        /(\+?\d{1,3}[\s.-]?)?\(?\d{1,4}\)?[\s.-]?\d{1,4}[\s.-]?\d{1,9}/g // General international
    ];
    
    const whatsappNumber = '918075085487'; // WhatsApp number without + or spaces
    
    // Function to convert phone number to WhatsApp format
    function normalizePhoneNumber(phone) {
        // Remove all non-digit characters except +
        let cleaned = phone.replace(/[^\d+]/g, '');
        // Remove + if present and add country code if missing
        if (cleaned.startsWith('91')) {
            return cleaned;
        } else if (cleaned.startsWith('+91')) {
            return cleaned.substring(1);
        } else if (cleaned.length === 10) {
            return '91' + cleaned;
        }
        return cleaned;
    }
    
    // Function to wrap phone numbers in links
    function wrapPhoneNumber(text, phoneNumber) {
        const normalized = normalizePhoneNumber(phoneNumber);
        const whatsappUrl = `https://wa.me/${normalized}`;
        return `<a href="${whatsappUrl}" target="_blank" rel="noopener" class="whatsapp-phone-link" style="color: inherit; text-decoration: none; cursor: pointer;">${phoneNumber}</a>`;
    }
    
    // Find all text nodes and elements that might contain phone numbers
    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );
    
    const textNodes = [];
    let node;
    while (node = walker.nextNode()) {
        // Skip if parent is already a link or script/style tag
        const parent = node.parentElement;
        if (parent && (
            parent.tagName === 'A' ||
            parent.tagName === 'SCRIPT' ||
            parent.tagName === 'STYLE' ||
            parent.closest('a')
        )) {
            continue;
        }
        
        // Check if text contains phone number patterns
        const text = node.textContent;
        if (text && (text.includes('8075085487') || text.includes('+91') || /\d{10}/.test(text))) {
            textNodes.push(node);
        }
    }
    
    // Process each text node
    textNodes.forEach(textNode => {
        let text = textNode.textContent;
        let modified = false;
        
        // Match and replace phone numbers
        phonePatterns.forEach(pattern => {
            const matches = [...text.matchAll(pattern)];
            if (matches.length > 0) {
                matches.forEach(match => {
                    const phoneNumber = match[0].trim();
                    // Skip if it's already in a link or too short/long
                    if (phoneNumber.length >= 10 && phoneNumber.length <= 15 && !textNode.parentElement.closest('a')) {
                        const normalized = normalizePhoneNumber(phoneNumber);
                        // Only replace if it matches our target number or is a valid Indian number
                        if (normalized.includes('8075085487') || (normalized.startsWith('91') && normalized.length === 12)) {
                            const whatsappUrl = `https://wa.me/${normalized}`;
                            const link = `<a href="${whatsappUrl}" target="_blank" rel="noopener" class="whatsapp-phone-link">${phoneNumber}</a>`;
                            text = text.replace(phoneNumber, link);
                            modified = true;
                        }
                    }
                });
            }
        });
        
        if (modified) {
            const wrapper = document.createElement('span');
            wrapper.innerHTML = text;
            textNode.parentNode.replaceChild(wrapper, textNode);
        }
    });
    
    // Also handle specific known phone numbers in the HTML
    const knownPhoneNumbers = [
        '+91 8075085487',
        '+918075085487',
        '8075085487',
        '918075085487'
    ];
    
    knownPhoneNumbers.forEach(phone => {
        const normalized = normalizePhoneNumber(phone);
        const whatsappUrl = `https://wa.me/${normalized}`;
        
        // Find all instances of this phone number
        const xpath = `//text()[contains(., '${phone}')]`;
        const result = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
        let node;
        
        while (node = result.iterateNext()) {
            // Skip if already in a link
            if (node.parentElement && node.parentElement.tagName === 'A') {
                continue;
            }
            
            const text = node.textContent;
            if (text.includes(phone)) {
                const newText = text.replace(new RegExp(phone.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), 
                    `<a href="${whatsappUrl}" target="_blank" rel="noopener" class="whatsapp-phone-link">${phone}</a>`);
                
                if (newText !== text) {
                    const wrapper = document.createElement('span');
                    wrapper.innerHTML = newText;
                    node.parentNode.replaceChild(wrapper, node);
                }
            }
        }
    });
}

// Profile image loading with fallback
function initProfileImage() {
  const profileImg = document.getElementById('profile-img');
  if (profileImg) {
    // Set up error handling for profile image (only once)
    profileImg.addEventListener('error', function() {
      // Stop error handling to prevent infinite loop
      this.onerror = null;
      console.warn('Profile image failed to load');
    }, { once: true });
    
    // Set up load success handler
    profileImg.addEventListener('load', function() {
      console.log('Profile image loaded successfully');
      this.style.opacity = '1';
    });
    
    // Initial opacity for smooth loading
    profileImg.style.opacity = '0';
    profileImg.style.transition = 'opacity 0.3s ease';
  }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease;
    }
    
    .fade-in-left {
        opacity: 0;
        transform: translateX(-20px);
        transition: all 0.6s ease;
    }
    
    .fade-in-right {
        opacity: 0;
        transform: translateX(20px);
        transition: all 0.6s ease;
    }
    
    .fade-in.visible,
    .fade-in-left.visible,
    .fade-in-right.visible {
        opacity: 1;
        transform: translate(0);
    }
`;
document.head.appendChild(style);

// Background Music - Auto-play functionality (no controls)
function initBackgroundMusic() {
    const soundcloudPlayer = document.getElementById('soundcloud-player');
    
    if (!soundcloudPlayer) return;
    
    // Wait for SoundCloud widget API to load and auto-play
    function initWidget() {
        if (window.SC && soundcloudPlayer.contentWindow) {
            try {
                const widget = window.SC.Widget(soundcloudPlayer);
                
                // Listen for ready event and auto-play
                widget.bind(window.SC.Widget.Events.READY, function() {
                    console.log('Background music player ready');
                    // Try to play after a short delay to handle autoplay restrictions
                    setTimeout(function() {
                        widget.getDuration(function(duration) {
                            if (duration > 0) {
                                // Player is ready, try to play
                                widget.play();
                                console.log('Background music started');
                            }
                        });
                    }, 1000);
                });
                
                // Auto-restart when track finishes
                widget.bind(window.SC.Widget.Events.FINISH, function() {
                    console.log('Background music finished, restarting...');
                    setTimeout(function() {
                        widget.seekTo(0);
                        widget.play();
                    }, 500);
                });
            } catch (e) {
                console.error('Error initializing background music:', e);
            }
        } else {
            // Retry after a short delay
            setTimeout(initWidget, 500);
        }
    }
    
    // Initialize widget when SoundCloud API is ready
    if (window.SC) {
        setTimeout(initWidget, 500);
    } else {
        // Wait for SoundCloud API to load
        window.addEventListener('load', function() {
            setTimeout(initWidget, 1500);
        });
    }
}

// Initialize background music on page load
document.addEventListener('DOMContentLoaded', function() {
    initBackgroundMusic();
});