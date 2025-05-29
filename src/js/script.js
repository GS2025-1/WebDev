document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.querySelector('.sidebar');
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const closeBtn = document.querySelector('.close-btn');
    const overlay = document.querySelector('.overlay');
    const navLinks = document.querySelectorAll('.nav-links a');
    const mainSections = document.querySelectorAll('main section');

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
});