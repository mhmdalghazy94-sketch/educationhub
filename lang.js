(function(){
  const translations = {
    en: {
      nav_home: 'Home',
      nav_lessons: 'Lessons',
      nav_examples: 'Examples',
      nav_quiz: 'Quick Quiz',
      nav_developer: 'Developer',
      nav_settings: 'Settings',
      nav_school: 'School Learning',
      nav_self: 'Self Learning',
      nav_tracks: 'Tracks',
      page_title_index: 'Start your learning journey',
      page_title_quranic: 'Quranic Basics',
      page_title_english_kids: 'English for Kids',
      page_title_kindergarten: 'Kindergarten',
      page_title_school_learning: 'School Learning Track',
      page_title_self_learning: 'Self Learning Track',
      page_title_settings: 'Settings',
      page_title_track: 'Learning Tracks',
      page_title_developer: 'Developer Info',
      back_to_home: '← Back to home',
      back_to_top: 'Back to top',
      watch_videos: 'Watch videos on YouTube',
      download_book: 'Download the book',
      start_test: 'Start test',
      lang_button_en: 'EN',
      lang_button_ar: 'ع',
      footer_copyright: '© 2025 Arabic Learning Platform. All rights reserved.'
    },
    ar: {
      nav_home: 'الصفحة الرئيسية',
      nav_lessons: 'الدروس',
      nav_examples: 'أمثلة',
      nav_quiz: 'اختبار سريع',
      nav_developer: 'مطور الموقع',
      nav_settings: 'الإعدادات',
      nav_school: 'التعلم المدرسي',
      nav_self: 'التعلم الذاتي',
      nav_tracks: 'المسارات',
      page_title_index: 'ابدأ رحلتك التعليمية',
      page_title_quranic: 'القاعدة النورانية',
      page_title_english_kids: 'الإنجليزية للأطفال',
      page_title_kindergarten: 'الروضة',
      page_title_school_learning: 'مسار التعليم المدرسي',
      page_title_self_learning: 'مسار التعلم الذاتي',
      page_title_settings: 'الإعدادات',
      page_title_track: 'مسار التعليم',
      page_title_developer: 'معلومات المطور',
      back_to_home: '← العودة إلى الصفحة الرئيسية',
      back_to_top: 'العودة للأعلى',
      watch_videos: '🎥 شاهد الفيديوهات على YouTube',
      download_book: '⬇️ تحميل الكتاب',
      start_test: 'بدء الاختبار',
      lang_button_en: 'EN',
      lang_button_ar: 'ع',
      footer_copyright: '© 2025 منصة التعليم العربية. جميع الحقوق محفوظة.'
    }
  };

  function applyLang(lang){
    if(!translations[lang]) lang = 'ar';
    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';

    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const key = el.getAttribute('data-i18n');
      if(translations[lang][key]) el.textContent = translations[lang][key];
    });

    document.querySelectorAll('[data-i18n-title]').forEach(el=>{
      const key = el.getAttribute('data-i18n-title');
      if(translations[lang][key]) el.setAttribute('title', translations[lang][key]);
    });

    const langBtn = document.getElementById('langToggle');
    if(langBtn){
      langBtn.textContent = (lang === 'ar') ? translations['ar']['lang_button_en'] : translations['en']['lang_button_ar'];
    }

    localStorage.setItem('site_lang', lang);
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    const stored = localStorage.getItem('site_lang') || 'ar';
    applyLang(stored);

    const toggle = document.getElementById('langToggle');
    if(toggle){
      toggle.addEventListener('click', ()=>{
        const cur = document.documentElement.lang || 'ar';
        const next = (cur === 'ar') ? 'en' : 'ar';
        applyLang(next);
      });
    }
  });

  // Re-apply translations after dynamic includes (header/footer) are loaded
  document.addEventListener('includeLoaded', ()=>{
    const stored = localStorage.getItem('site_lang') || 'ar';
    applyLang(stored);
    // reattach lang toggle handler if header was injected
    const toggle = document.getElementById('langToggle');
    if(toggle){
      toggle.addEventListener('click', ()=>{
        const cur = document.documentElement.lang || 'ar';
        const next = (cur === 'ar') ? 'en' : 'ar';
        applyLang(next);
      });
    }
  });

  window.applySiteLang = applyLang;
})();
