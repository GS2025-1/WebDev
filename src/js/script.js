let slideIndex = 1;
let slideshowTimeoutId;

function displaySlide(n) {
    let slides = document.querySelectorAll(".slide");
    let dots = document.querySelectorAll(".dot");

    if (slides.length === 0) {
        return;
    }

    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    if (dots.length > 0) {
        for (let i = 0; i < dots.length; i++) {
            if (dots[i]) {
                dots[i].className = dots[i].className.replace(" active", "");
            }
        }
        if (dots[slideIndex - 1]) {
            dots[slideIndex - 1].className += " active";
        }
    }
    
    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].style.display = "block";
    }
}

function autoAdvanceSlides() {
    slideIndex++;
    displaySlide(slideIndex);
    slideshowTimeoutId = setTimeout(autoAdvanceSlides, 5000); 
}

window.plusSlides = function(n) {
    clearTimeout(slideshowTimeoutId);
    displaySlide(slideIndex += n);
    slideshowTimeoutId = setTimeout(autoAdvanceSlides, 5000);
};

window.currentSlide = function(n) {
    clearTimeout(slideshowTimeoutId);
    displaySlide(slideIndex = n);
    slideshowTimeoutId = setTimeout(autoAdvanceSlides, 5000);
};

document.addEventListener('DOMContentLoaded', () => {
    displaySlide(slideIndex); 
    slideshowTimeoutId = setTimeout(autoAdvanceSlides, 5000);
    
    const sidebar = document.querySelector('.sidebar');
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const closeBtn = document.querySelector('.close-btn');
    const overlay = document.querySelector('.overlay');
    const navLinks = document.querySelectorAll('.nav-links a');
    const mainSections = document.querySelectorAll('.main-content section');
    const themeBtn = document.querySelector('.theme-btn');
    const lightModeIcon = themeBtn ? themeBtn.querySelector('[data-mode="light"]') : null;
    const darkModeIcon = themeBtn ? themeBtn.querySelector('[data-mode="dark"]') : null;
    const colorButtons = document.querySelectorAll('.color-btn');

    const openSidebar = () => {
        if (sidebar) sidebar.classList.add('active');
        if (overlay) overlay.classList.add('active');
        document.body.classList.add('sidebar-open');
    };

    const closeSidebar = () => {
        if (sidebar) sidebar.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        document.body.classList.remove('sidebar-open');
    };

    if (hamburgerBtn) hamburgerBtn.addEventListener('click', openSidebar);
    if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
    if (overlay) overlay.addEventListener('click', closeSidebar);

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            const targetHref = link.getAttribute('href');
            const isHashLink = targetHref && targetHref.includes('#');
            const targetFileName = targetHref ? targetHref.split('/').pop().split('#')[0] : '';
            const currentFileName = window.location.pathname.split('/').pop();

            if (isHashLink && (targetFileName === '' || targetFileName === currentFileName || (currentFileName === '' && targetFileName === 'index.html'))) {
                event.preventDefault();
                const targetId = targetHref.split('#').pop();
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    const mainHeader = document.querySelector('.main-header');
                    const headerOffset = mainHeader ? mainHeader.offsetHeight : 0;
                    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
            closeSidebar();
        });
    });

    const highlightActiveNavLink = () => {
        let activeSectionId = '';
        const mainHeader = document.querySelector('.main-header');
        const headerHeight = mainHeader ? mainHeader.offsetHeight : 0;
        const currentPath = window.location.pathname;
        const currentFileName = currentPath.split('/').pop() || 'index.html'; 

        if (currentFileName === 'index.html') { 
            if (mainSections.length > 0) { 
                 mainSections.forEach(section => {
                    const sectionTop = section.offsetTop - headerHeight - 50; 
                    const sectionBottom = sectionTop + section.offsetHeight;

                    if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionBottom) {
                        activeSectionId = section.getAttribute('id');
                    }
                });
                if (!activeSectionId && mainSections[0] && window.pageYOffset < (mainSections[0].offsetTop - headerHeight - 50)) {
                     activeSectionId = navLinks[0]?.getAttribute('data-section') || 'hero'; 
                }
            }
        } else if (currentFileName === 'contato.html') {
            activeSectionId = 'contatos'; 
        } else if (currentFileName === 'quiz.html') {
            activeSectionId = 'quiz'; 
        }
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkDataSection = link.getAttribute('data-section');
            const linkHref = link.getAttribute('href');
            
            if (linkDataSection && linkDataSection === activeSectionId && (currentFileName === 'index.html' || (linkHref && (linkHref.startsWith('#') || linkHref.includes('index.html#'))))) {
                link.classList.add('active');
            } 
            else if (linkHref && linkHref.includes(currentFileName) && !linkHref.includes('#') && currentFileName !== 'index.html') {
                 link.classList.add('active');
            }
            else if (link && link.dataset && linkHref && (linkHref === '/index.html' || link.dataset.section === 'problema' && linkHref.endsWith('index.html')) && (currentFileName === 'index.html' || currentPath === '/') && activeSectionId === (link.dataset.section || 'hero') ) {
                 link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', highlightActiveNavLink);
    highlightActiveNavLink(); 


    const applyTheme = (isDarkMode) => {
        if (isDarkMode) {
            document.body.classList.add('dark-theme');
            if (darkModeIcon) darkModeIcon.classList.add('active'); 
            if (lightModeIcon) lightModeIcon.classList.remove('active');
        } else {
            document.body.classList.remove('dark-theme');
            if (lightModeIcon) lightModeIcon.classList.add('active');
            if (darkModeIcon) darkModeIcon.classList.remove('active');
        }
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

        const savedBaseColor = localStorage.getItem('selected-body-bg');
        if (savedBaseColor) {
            colorButtons.forEach(button => {
                if (button.dataset.lightBg === savedBaseColor) {
                    const targetColor = isDarkMode ? button.dataset.darkBg : button.dataset.lightBg;
                    document.body.style.backgroundColor = targetColor;
                    button.classList.add('active');
                } else {
                    button.classList.remove('active');
                }
            });
        } else {
            document.body.style.backgroundColor = ''; 
            colorButtons.forEach(button => button.classList.remove('active'));
        }
    };
    
    const savedTheme = localStorage.getItem('theme');
    applyTheme(savedTheme === 'dark');

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const isCurrentlyDark = document.body.classList.contains('dark-theme');
            applyTheme(!isCurrentlyDark);
        });
    }

    colorButtons.forEach(button => {
        button.addEventListener('click', () => {
            const isCurrentlyDark = document.body.classList.contains('dark-theme');
            const selectedLightBg = button.dataset.lightBg;
            const selectedDarkBg = button.dataset.darkBg;
            const targetColor = isCurrentlyDark ? selectedDarkBg : selectedLightBg;

            document.body.style.backgroundColor = targetColor;
            localStorage.setItem('selected-body-bg', selectedLightBg); 

            colorButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('form-message');

    if (contactForm && formMessage) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const fullNameInput = document.getElementById('fullName');
            const emailAddressInput = document.getElementById('emailAddress');
            const subjectInput = document.getElementById('subject');
            const problemDetailsInput = document.getElementById('problemDetails');

            let isValid = true;
            const requiredInputs = [fullNameInput, emailAddressInput, problemDetailsInput];

            formMessage.classList.remove('show');
            formMessage.style.backgroundColor = '';
            formMessage.style.color = '';
            formMessage.textContent = '';
            
            requiredInputs.forEach(input => {
                if (input && !input.value.trim()) { 
                    isValid = false;
                    input.classList.add('invalid-field');
                } else if (input) {
                    input.classList.remove('invalid-field');
                }
            });

            if (!isValid) {
                formMessage.style.backgroundColor = '#f8d7da';
                formMessage.style.color = '#721c24';
                formMessage.style.borderColor = '#f5c6cb';
                formMessage.textContent = 'Por favor, preencha todos os campos obrigatórios destacados.';
                formMessage.classList.add('show');
                setTimeout(() => {
                    formMessage.classList.remove('show');
                }, 5000);
                return;
            }
            
            const nomePessoa = fullNameInput ? fullNameInput.value.trim() : "Usuário";
            const assuntoMensagem = subjectInput && subjectInput.value.trim() ? subjectInput.value.trim() : "sem assunto";

            formMessage.style.backgroundColor = '#d4edda';
            formMessage.style.color = '#155724';
            formMessage.style.borderColor = '#c3e6cb';
            formMessage.textContent = `Olá ${nomePessoa}, a sua mensagem "${assuntoMensagem}" foi enviada com sucesso, logo entraremos em contato!`;
            formMessage.classList.add('show');

            contactForm.reset();

            setTimeout(() => {
                formMessage.classList.remove('show');
            }, 5000);
        });
    }
});