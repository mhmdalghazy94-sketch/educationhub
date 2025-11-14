
        document.addEventListener('DOMContentLoaded', function() {
            // عناصر DOM
            const sidebarToggle = document.getElementById('sidebar-toggle');
            const hiddenSidebar = document.getElementById('hidden-sidebar');
            const closeSidebar = document.querySelector('.close-sidebar');
            const overlay = document.getElementById('overlay');
            const navbar = document.querySelector('.navbar');
            const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
            
            // فتح/إغلاق القائمة الجانبية
            sidebarToggle.addEventListener('click', function() {
                hiddenSidebar.classList.add('active');
                overlay.classList.add('active');
            });
            
            closeSidebar.addEventListener('click', function() {
                hiddenSidebar.classList.remove('active');
                overlay.classList.remove('active');
            });
            
            overlay.addEventListener('click', function() {
                hiddenSidebar.classList.remove('active');
                overlay.classList.remove('active');
            });
            
            // تأثير التمرير على شريط التنقل
            window.addEventListener('scroll', function() {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });
            
            // القوائم المنسدلة
            dropdownToggles.forEach(toggle => {
                toggle.addEventListener('click', function() {
                    const submenu = this.nextElementSibling;
                    if (submenu && submenu.classList.contains('submenu') || submenu.classList.contains('submenu-inner')) {
                        submenu.classList.toggle('active');
                        this.classList.toggle('active');
                    }
                });
            });
            
            // تأثيرات الظهور التدريجي للبطاقات
            const cards = document.querySelectorAll('.card');
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
            
            cards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                observer.observe(card);
            });
            
            // تأثير شريط التقدم
            const progressBar = document.querySelector('.progress');
            let progress = 0;
            const progressInterval = setInterval(() => {
                if (progress < 65) {
                    progress++;
                    progressBar.style.width = `${progress}%`;
                } else {
                    clearInterval(progressInterval);
                }
            }, 20);
        });