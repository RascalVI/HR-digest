document.addEventListener('DOMContentLoaded', () => {
    // Получаем все ссылки в боковом меню
    const menuLinks = document.querySelectorAll('.sidebar a');
    
    // Добавляем обработчик для плавной прокрутки
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Подсветка активного пункта меню при прокрутке
    const sections = document.querySelectorAll('.content-section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        menuLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Добавляем эффект параллакса для изображений
    const imageContainers = document.querySelectorAll('.image-container');
    
    imageContainers.forEach(container => {
        const image = container.querySelector('img');
        
        container.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = container.getBoundingClientRect();
            const x = (e.clientX - left) / width;
            const y = (e.clientY - top) / height;
            
            // Инверсионное движение: когда курсор движется вправо, изображение движется влево и наоборот
            const moveX = (0.5 - x) * 20; // 20px максимальное смещение
            const moveY = (0.5 - y) * 20;
            
            image.style.transform = `scale(1.05) translate(${moveX}px, ${moveY}px)`;
        });
        
        container.addEventListener('mouseleave', () => {
            image.style.transform = 'scale(1) translate(0, 0)';
        });
        
        container.addEventListener('mouseenter', () => {
            image.style.transform = 'scale(1.05) translate(0, 0)';
        });
    });
}); 