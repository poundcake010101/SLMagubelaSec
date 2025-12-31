// Hamburger Menu Toggle Function
function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    
    if (menu && icon) {
        menu.classList.toggle("open");
        icon.classList.toggle("open");
        
        // Prevent body scroll when menu is open
        if (menu.classList.contains("open")) {
            document.body.style.overflow = "hidden";
            document.body.style.height = "100vh";
        } else {
            document.body.style.overflow = "auto";
            document.body.style.height = "auto";
        }
    }
}

// Close menu when clicking on menu links
document.addEventListener('DOMContentLoaded', function() {
    const menuLinks = document.querySelectorAll('.menu-links a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            const menu = document.querySelector(".menu-links");
            const icon = document.querySelector(".hamburger-icon");
            if (menu && icon) {
                menu.classList.remove("open");
                icon.classList.remove("open");
                document.body.style.overflow = "auto";
                document.body.style.height = "auto";
            }
        });
    });
});

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    const menu = document.querySelector('.menu-links');
    const icon = document.querySelector('.hamburger-icon');
    const hamburgerNav = document.getElementById('hamburger-nav');
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    
    // Check if click is outside the menu and hamburger icon
    if (menu && menu.classList.contains('open') && 
        hamburgerNav && 
        !hamburgerNav.contains(event.target) &&
        !hamburgerIcon.contains(event.target)) {
        menu.classList.remove('open');
        if (icon) icon.classList.remove('open');
        document.body.style.overflow = "auto";
        document.body.style.height = "auto";
    }
});

// Close menu with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const menu = document.querySelector('.menu-links');
        const icon = document.querySelector('.hamburger-icon');
        if (menu && menu.classList.contains('open')) {
            menu.classList.remove('open');
            if (icon) icon.classList.remove('open');
            document.body.style.overflow = "auto";
            document.body.style.height = "auto";
        }
    }
});

// Smooth scrolling for anchor links
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

// Close hamburger menu when resizing to desktop
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        const menu = document.querySelector(".menu-links");
        const icon = document.querySelector(".hamburger-icon");
        if (menu && icon) {
            menu.classList.remove("open");
            icon.classList.remove("open");
            document.body.style.overflow = "auto";
            document.body.style.height = "auto";
        }
    }
});

// Team Video Modal Functions
function openTeamVideoModal() {
    const modal = document.getElementById("teamVideoModal");
    modal.style.display = "block";
    
    // Try to play video automatically
    const video = document.getElementById("teamVideoFrame");
    if (video) {
        video.play().catch(error => {
            console.log("Auto-play was prevented:", error);
        });
    }
}

function closeTeamVideoModal() {
    const modal = document.getElementById("teamVideoModal");
    const video = document.getElementById("teamVideoFrame");
    
    // Pause and reset video
    if (video) {
        video.pause();
        video.currentTime = 0;
    }
    
    modal.style.display = "none";
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById("teamVideoModal");
    if (event.target === modal) {
        closeTeamVideoModal();
    }
};

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeTeamVideoModal();
    }
});

// Contact Form Handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value
    };
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
        alert('Please fill in all required fields (Name, Email, Message).');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Show loading state
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Send to Formspree
    fetch('https://formspree.io/f/mqayorar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (response.ok) {
            alert('Thank you for your message! We will get back to you shortly.');
            this.reset();
            // Reset form validation colors
            document.querySelectorAll('#contactForm input, #contactForm textarea').forEach(input => {
                input.style.borderColor = '#e9ecef';
            });
        } else {
            throw new Error('Network response was not ok');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Sorry, there was an error sending your message. Please try again or contact us directly.');
    })
    .finally(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
});

// Form validation with visual feedback
document.querySelectorAll('#contactForm input, #contactForm textarea, #contactForm select').forEach(input => {
    input.addEventListener('blur', function() {
        // Reset border color
        this.style.borderColor = '#e9ecef';
        
        // Check if field is required and empty
        if (this.hasAttribute('required') && !this.value.trim()) {
            this.style.borderColor = '#e74c3c';
            return;
        }
        
        // Special validation for email
        if (this.type === 'email' && this.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(this.value.trim())) {
                this.style.borderColor = '#e74c3c';
                return;
            }
        }
        
        // If field has value and passes validation
        if (this.value.trim()) {
            this.style.borderColor = '#27ae60';
        }
    });
    
    // Real-time validation for required fields
    input.addEventListener('input', function() {
        if (this.hasAttribute('required') && this.value.trim()) {
            this.style.borderColor = '#27ae60';
        } else if (this.hasAttribute('required') && !this.value.trim()) {
            this.style.borderColor = '#e74c3c';
        }
    });
});

// Initialize form validation on page load
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scroll to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Don't prevent default for menu toggle links
            if (!this.getAttribute('onclick') || !this.getAttribute('onclick').includes('toggleMenu')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId !== '#') {
                    const target = document.querySelector(targetId);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            }
        });
    });
});