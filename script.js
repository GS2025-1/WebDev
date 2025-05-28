document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('main section');

    // Função para adicionar a classe 'active' ao link de navegação correto
    const highlightNavLink = () => {
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - header.offsetHeight - 50; // Ajuste para o header fixo
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === currentSection) {
                link.classList.add('active');
            }
        });
    };

    // Adiciona smooth scrolling para os links do menu
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            const headerOffset = document.querySelector('header').offsetHeight; // Altura do cabeçalho fixo
            const elementPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });

    // Observa a rolagem para destacar o link ativo no menu
    const header = document.querySelector('header');
    window.addEventListener('scroll', highlightNavLink);

    // Chama na carga da página para definir a seção inicial
    highlightNavLink();
});