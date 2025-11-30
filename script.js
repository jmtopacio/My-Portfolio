// --- AOS Initialization ---
AOS.init({ offset: 120, duration: 1000 });

// --- Slideshow Functionality ---
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    if (slides.length === 0) return;

    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}

const prevButton = document.querySelector('.slideshow-container .prev');
const nextButton = document.querySelector('.slideshow-container .next');
if (prevButton && nextButton) {
    prevButton.addEventListener('click', () => plusSlides(-1));
    nextButton.addEventListener('click', () => plusSlides(1));
}

// --- Header & Navigation ---
const header = document.querySelector("header");
const menuBtn = document.querySelector(".menu-btn");
const navigation = document.querySelector(".navigation");
const navigationItems = document.querySelectorAll(".navigation a");

window.addEventListener("scroll", function () {
    if (header) {
        header.classList.toggle("sticky", window.scrollY > 0);
    }
});

if (menuBtn && navigation) {
    menuBtn.addEventListener("click", () => {
        menuBtn.classList.toggle("active");
        navigation.classList.toggle("active");
    });
}

navigationItems.forEach((navItem) => {
    navItem.addEventListener("click", () => {
        if (menuBtn && navigation) {
            menuBtn.classList.remove("active");
            navigation.classList.remove("active");
        }
    });
});

window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section[id]");
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const id = current.getAttribute("id");
        const navLink = document.querySelector(".navigation a[href*=" + id + "]");
        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add("active");
            } else {
                navLink.classList.remove("active");
            }
        }
    });
});

// --- Theme Chooser ---
const body = document.body;
const darkModeToggle = document.getElementById('darkModeToggle');

// Helper function to get CSS variable value
function getCssVariable(variable) {
    return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
}

// Function to update tsParticles colors based on current mode
function updateTsParticlesColors() {
    const particlesInstance = tsParticles.dom().find(instance => instance.id === "tsparticles");
    if (particlesInstance) {
        particlesInstance.updateOptions({
            particles: {
                color: { value: getCssVariable('--primary-color') },
                links: { color: getCssVariable('--text-muted') }
            }
        });
    }
}

// Function to apply the saved theme preference
function applyThemePreference() {
    const isDarkMode = localStorage.getItem('theme') === 'dark';
    if (isDarkMode) {
        body.classList.add('dark-mode');
        if (darkModeToggle) darkModeToggle.classList.add('active');
    } else {
        body.classList.remove('dark-mode');
        if (darkModeToggle) darkModeToggle.classList.remove('active');
    }

    // Use a small timeout to ensure CSS variables are updated before tsParticles reads them
    setTimeout(() => {
        updateTsParticlesColors();
    }, 50);
}

// --- Typed.js Initialization ---
var typed = new Typed('#typed-text', {
    strings: [ 'App Developer', 'Web Developer'],
    typeSpeed: 70,
    backSpeed: 40,
    loop: true,
    smartBackspace: true
});

// --- Skills Section Animation ---
const skillsSection = document.querySelector('#skills');
const skillLines = document.querySelectorAll('.skills .line');

const skillsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            skillLines.forEach(line => {
                line.classList.add('animate');
            });
            skillsObserver.unobserve(skillsSection);
        }
    });
}, { threshold: 0.5 });

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// --- Chatbot Functionality ---
const chatbotToggler = document.querySelector(".chatbot-toggler");
const chatbotContainer = document.querySelector(".chatbot-container");
const closeBtn = document.querySelector(".close-btn");
const chatMessages = document.querySelector(".chatbot-messages");
const chatOptions = document.querySelector(".chatbot-options");

function toggleChatbot() {
    chatbotContainer.classList.toggle("active");
    chatbotToggler.classList.toggle("active");
}

chatbotToggler.addEventListener("click", toggleChatbot);
closeBtn.addEventListener("click", toggleChatbot);

const conversation = {
    "start": {
        "bot": "Hello! I'm JM's AI assistant. How can I help you today?",
        "options": ["Show me your work", "What are your skills?", "Tell me a fun fact", "How can I contact you?"]
    },
    "responses": {
        "Show me your work": {
            "bot": "Of course! You can see some of JM's featured projects in the <a href='#work'>Work</a> section. He's particularly proud of the Happy Smile 365 system.",
            "options": ["What are your skills?", "How can I contact you?", "Start Over"]
        },
        "What are your skills?": {
            "bot": "JM is a Web and App Developer with skills in HTML, CSS, JavaScript, PHP, Java, Firebase, MySQL and more. For a detailed list, head over to the <a href='#skills'>Skills</a> section.",
            "options": ["Show me your work", "How can I contact you?", "Start Over"]
        },
        "Tell me a fun fact": {
            "bot": "Fun fact: Aside from coding, he loves enjoying a cup of matcha. It keeps him energized while he codes!",
            "options": ["Show me your work", "What are your skills?", "Start Over"]
        },
        "How can I contact you?": {
            "bot": "The best way is through the <a href='#contact'>Contact Form</a> on this page. He's looking forward to hearing from you!",
            "options": ["Show me your work", "What are your skills?", "Start Over"]
        },
        "Start Over": {
            "bot": "No problem. What would you like to know?",
            "options": ["Show me your work", "What are your skills?", "Tell me a fun fact", "How can I contact you?"]
        }
    }
};

function addMessage(message, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", `${sender}-message`);
    messageDiv.innerHTML = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showOptions(options) {
    chatOptions.innerHTML = "";
    options.forEach(option => {
        const button = document.createElement("button");
        button.classList.add("option-btn");
        button.textContent = option;
        button.addEventListener("click", () => handleOptionClick(option));
        chatOptions.appendChild(button);
    });
}

function handleOptionClick(optionText) {
    addMessage(optionText, "user");
    chatOptions.innerHTML = '<p class="typing-indicator">Bot is typing...</p>';
    setTimeout(() => {
        const response = conversation.responses[optionText];
        addMessage(response.bot, "bot");
        showOptions(response.options);
    }, 1000);
}

function startChat() {
    chatMessages.innerHTML = "";
    addMessage(conversation.start.bot, "bot");
    showOptions(conversation.start.options);
}

chatbotToggler.addEventListener("click", () => {
    if (chatbotContainer.classList.contains("active") && chatMessages.children.length === 0) {
        startChat();
    }
});

// --- Theme Chooser Event Listeners ---
if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        darkModeToggle.classList.toggle('active');
        localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
        updateTsParticlesColors();
    });
}

// --- "See More" Services Button ---
const seeMoreBtn = document.getElementById('see-more-services-btn');
const hiddenServices = document.querySelectorAll('.services .card.hidden-service');

if (seeMoreBtn && hiddenServices.length > 0) {
    hiddenServices.forEach(service => {
        service.style.display = 'none';
    });

    seeMoreBtn.addEventListener('click', function () {
        const isShowingMore = this.textContent === 'See Less';
        hiddenServices.forEach(service => {
            service.style.display = isShowingMore ? 'none' : 'flex'; // Use flex to match other cards
        });
        this.textContent = isShowingMore ? 'See More' : 'See Less';
    });
}

// --- tsParticles Initialization ---
// Apply dark mode preference before initializing tsParticles to get correct initial colors
applyThemePreference();

tsParticles.load("tsparticles", {
    fpsLimit: 60,
    interactivity: {
        events: {
            onHover: {
                enable: true,
                mode: "repulse"
            },
            resize: true
        },
        modes: {
            repulse: {
                distance: 100,
                duration: 0.4
            }
        }
    },
    particles: {
        color: { // Dynamically get color from CSS variable
            value: getCssVariable('--primary-color')
        },
        links: {
            color: getCssVariable('--text-muted'), // Dynamically get link color
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1
        },
        collisions: {
            enable: true
        },
        move: {
            direction: "none",
            enable: true,
            outModes: {
                default: "bounce"
            },
            random: false,
            speed: 2,
            straight: false
        },
        number: {
            density: {
                enable: true,
                area: 800
            },
            value: 80
        },
        opacity: {
            value: 0.5
        },
        shape: {
            type: "circle"
        },
        size: {
            value: {
                min: 1,
                max: 5
            }
        }
    },
    detectRetina: true
});