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