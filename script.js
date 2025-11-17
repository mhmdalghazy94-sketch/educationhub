// كود JavaScript للتفاعلية
document.addEventListener('DOMContentLoaded', function() {
    // إضافة تأثيرات تفاعلية للبطاقات
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
    
    // تنعيم التمرير للروابط الداخلية
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // إضافة تأثيرات للروابط في القائمة
    const scienceLinks = document.querySelectorAll('.science-list a');
    
    scienceLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.parentElement.style.boxShadow = '0 4px 8px rgba(52, 152, 219, 0.2)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.parentElement.style.boxShadow = 'none';
        });
    });
    
    // إضافة تأثيرات للرأس عند التمرير
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        const nav = document.querySelector('nav');
        
        if (window.scrollY > 50) {
            header.style.padding = '1rem 0';
            nav.style.padding = '0.5rem 0';
        } else {
            header.style.padding = '2rem 0';
            nav.style.padding = '0.8rem 0';
        }
    });
    
    // إضافة رسالة ترحيب تفاعلية
    const welcomeSection = document.querySelector('.welcome-section');
    
    if (welcomeSection) {
        setTimeout(() => {
            welcomeSection.style.transform = 'scale(1.02)';
            welcomeSection.style.transition = 'transform 0.3s ease';
            
            setTimeout(() => {
                welcomeSection.style.transform = 'scale(1)';
            }, 300);
        }, 500);
    }
    
    // إضافة تأثيرات للبطاقات عند التمرير
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    categoryCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
});
