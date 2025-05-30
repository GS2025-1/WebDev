document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.querySelector('.sidebar');
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const closeBtn = document.querySelector('.close-btn');
    const overlay = document.querySelector('.overlay');
    const navLinks = document.querySelectorAll('.nav-links a');
    const mainSections = document.querySelectorAll('.main-content section');

    const openSidebar = () => {
        sidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.classList.add('sidebar-open');
    };

    const closeSidebar = () => {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('sidebar-open');
    };

    hamburgerBtn.addEventListener('click', openSidebar);
    closeBtn.addEventListener('click', closeSidebar);
    overlay.addEventListener('click', closeSidebar);

    const highlightActiveNavLink = () => {
        let activeSectionId = '';
        const mainHeader = document.querySelector('.main-header');
        const headerHeight = mainHeader ? mainHeader.offsetHeight : 0;

        const currentPath = window.location.pathname;
        const currentFileName = currentPath.split('/').pop();

        if (currentFileName === 'index.html' || currentPath === '/') {
            mainSections.forEach(section => {
                const sectionTop = section.offsetTop - headerHeight - 50;
                const sectionBottom = sectionTop + section.offsetHeight;

                if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionBottom) {
                    activeSectionId = section.getAttribute('id');
                }
            });
            if (!activeSectionId && window.pageYOffset < (mainSections[0]?.offsetTop || 0) - headerHeight - 50) {
                   activeSectionId = 'pagina-inicial';
            }
        } else if (currentFileName === 'contato.html') {
            activeSectionId = 'contatos';
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkDataSection = link.getAttribute('data-section');
            const linkHref = link.getAttribute('href');
            const linkFileName = linkHref.split('/').pop().split('#')[0];

            if (linkDataSection && linkDataSection === activeSectionId) {
                link.classList.add('active');
            } else if (linkFileName === currentFileName && !linkHref.includes('#')) {
                link.classList.add('active');
            } else if (linkHref === '/index.html' && currentPath === '/') {
                link.classList.add('active');
            }
        });
    };

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            const targetHref = link.getAttribute('href');
            const isHashLink = targetHref.includes('#');
            const targetFileName = targetHref.split('/').pop().split('#')[0];
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

    window.addEventListener('scroll', highlightActiveNavLink);
    highlightActiveNavLink();

    const themeBtn = document.querySelector('.theme-btn');
    const lightModeIcon = themeBtn.querySelector('[data-mode="light"]');
    const darkModeIcon = themeBtn.querySelector('[data-mode="dark"]');
    const colorButtons = document.querySelectorAll('.color-btn');

    const applyTheme = (isDarkMode) => {
        if (isDarkMode) {
            document.body.classList.add('dark-theme');
            darkModeIcon.classList.add('active');
            lightModeIcon.classList.remove('active');
        } else {
            document.body.classList.remove('dark-theme');
            lightModeIcon.classList.add('active');
            darkModeIcon.classList.remove('active');
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
    if (savedTheme === 'dark') {
        applyTheme(true);
    } else {
        applyTheme(false);
    }

    themeBtn.addEventListener('click', () => {
        const isCurrentlyDark = document.body.classList.contains('dark-theme');
        applyTheme(!isCurrentlyDark);
    });

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
 /*Verificação de campos obrigatórios*/
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
            formMessage.style.borderColor = '';
            formMessage.textContent = '';
            
            requiredInputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('invalid-field');
                } else {
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

            const nomePessoa = fullNameInput.value.trim();
            const assuntoMensagem = subjectInput.value.trim() || "sem assunto";

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