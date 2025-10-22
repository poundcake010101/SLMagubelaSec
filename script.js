function toggleMenu(){
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

// Team Video Modal Functions
function openTeamVideoModal() {
    const modal = document.getElementById("teamVideoModal");
    modal.style.display = "block";
    
    
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
    
    
    if (video) {
        video.pause();
        video.currentTime = 0;
    }
    
    modal.style.display = "none";
}


window.onclick = function(event) {
    const modal = document.getElementById("teamVideoModal");
    if (event.target === modal) {
        closeTeamVideoModal();
    }
};


document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeTeamVideoModal();
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const menuLinks = document.querySelectorAll('.menu-links a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            const menu = document.querySelector(".menu-links");
            const icon = document.querySelector(".hamburger-icon");
            if (menu && icon) {
                menu.classList.remove("open");
                icon.classList.remove("open");
            }
        });
    });
});


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


window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        const menu = document.querySelector(".menu-links");
        const icon = document.querySelector(".hamburger-icon");
        if (menu && icon) {
            menu.classList.remove("open");
            icon.classList.remove("open");
        }
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
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (response.ok) {
            alert('Thank you for your message! We will get back to you shortly.');
            this.reset();
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

// Validation
document.querySelectorAll('#contactForm input, #contactForm textarea').forEach(input => {
    input.addEventListener('blur', function() {
        if (this.hasAttribute('required') && !this.value) {
            this.style.borderColor = '#e74c3c';
        } else if (this.type === 'email' && this.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(this.value)) {
                this.style.borderColor = '#e74c3c';
            } else {
                this.style.borderColor = '#27ae60';
            }
        } else if (this.value) {
            this.style.borderColor = '#27ae60';
        } else {
            this.style.borderColor = '#e9ecef';
        }
    });
});
