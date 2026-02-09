// Carousel functionality
let currentSlideIndex = 0;

function changeSlide(n) {
    showSlide(currentSlideIndex += n);
}

function currentSlide(n) {
    showSlide(currentSlideIndex = n);
}

function showSlide(n) {
    const slides = document.querySelectorAll('.carousel-image');
    const indicators = document.querySelectorAll('.indicator');

    if (n >= slides.length) {
        currentSlideIndex = 0;
    } else if (n < 0) {
        currentSlideIndex = slides.length - 1;
    }

    slides.forEach((slide) => {
        slide.classList.remove('active');
    });

    indicators.forEach((indicator) => {
        indicator.classList.remove('active');
    });

    slides[currentSlideIndex].classList.add('active');
    indicators[currentSlideIndex].classList.add('active');
}

// Auto-advance carousel every 10 seconds
// setInterval(() => {
//     changeSlide(1);
// }, 10000);

// Form submission handler
function handleSubmit(event) {
    event.preventDefault();

    // Get form data
    const formData = new FormData(event.target);
    const name = event.target.elements[0].value;
    const email = event.target.elements[1].value;
    const phone = event.target.elements[2].value;
    const message = event.target.elements[3].value;

    // Simple validation
    if (!name || !email || !phone || !message) {
        alert('Please fill in all fields');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }

    // Phone validation (basic)
    if (phone.length < 10) {
        alert('Please enter a valid phone number');
        return;
    }

    // Success message
    alert(`Thank you, ${name}! We have received your message and will get back to you soon.`);

    // Reset form
    event.target.reset();

    // Here you would typically send the form data to a server
    // Example:
    // fetch('your-backend-endpoint', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //         name: name,
    //         email: email,
    //         phone: phone,
    //         message: message
    //     })
    // })
    // .then(response => response.json())
    // .then(data => console.log('Success:', data))
    // .catch((error) => console.error('Error:', error));
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    });
});

// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');
const menuBackdrop = document.querySelector('.mobile-menu-backdrop');

function toggleMobileMenu() {
    const isActive = navLinks.classList.contains('active');
    mobileMenuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    if (menuBackdrop) {
        menuBackdrop.classList.toggle('active');
    }
}

function closeMobileMenu() {
    mobileMenuToggle.classList.remove('active');
    navLinks.classList.remove('active');
    if (menuBackdrop) {
        menuBackdrop.classList.remove('active');
    }
}

if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);

    // Close menu when clicking on backdrop
    if (menuBackdrop) {
        menuBackdrop.addEventListener('click', closeMobileMenu);
    }

    // Close menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
}

// Initialize carousel on page load
document.addEventListener('DOMContentLoaded', function () {
    showSlide(currentSlideIndex);
});

// Keyboard navigation for carousel
document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') {
        changeSlide(-1);
    } else if (event.key === 'ArrowRight') {
        changeSlide(1);
    }
});

// Pause auto-advance on mouse hover over carousel
const carousel = document.querySelector('.carousel-container');
let autoAdvanceTimer = setInterval(() => changeSlide(1), 5000);

if (carousel) {
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoAdvanceTimer);
    });

    carousel.addEventListener('mouseleave', () => {
        autoAdvanceTimer = setInterval(() => changeSlide(1), 5000);
    });
}

// Add scroll animation for feature cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px',
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card').forEach((card) => {
    observer.observe(card);
});
