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

        if (window.location.pathname.endsWith('/index.html') || window.location.pathname.endsWith('/')) {
            mainSections.forEach(section => {
                const sectionTop = section.offsetTop - headerHeight - 50;
                const sectionBottom = sectionTop + section.offsetHeight;

                if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionBottom) {
                    activeSectionId = section.getAttribute('id');
                }
            });
        } else if (window.location.pathname.includes('/src/pages/contato.html')) {
            activeSectionId = 'contatos';
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkDataSection = link.getAttribute('data-section');
            const linkHref = link.getAttribute('href');

            if (linkDataSection && linkDataSection === activeSectionId) {
                link.classList.add('active');
            } else if (linkHref && window.location.pathname.includes(linkHref.split('/').pop().split('#')[0]) && !linkHref.includes('#')) {
                link.classList.add('active');
            }
        });
    };

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            const targetHref = link.getAttribute('href');
            const isHashLink = targetHref.startsWith('#');
            const isLinkToCurrentPage = targetHref.split('#')[0].endsWith(window.location.pathname.split('/').pop());

            if (isHashLink && isLinkToCurrentPage) {
                event.preventDefault();
                const targetId = targetHref.substring(1);
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
});