// kindergarten-features.js
(function(){
  const storageKey = 'kg_badges_v1';

  function readBadges(){
    try{ return JSON.parse(localStorage.getItem(storageKey)) || {stars:0,events:[]}; }catch(e){return {stars:0,events:[]}}
  }
  function writeBadges(b){ localStorage.setItem(storageKey, JSON.stringify(b)); }

  function renderBadges(){
    const el = document.getElementById('badgesArea');
    if(!el) return;
    const data = readBadges();
    el.innerHTML = '';
    const starBadge = document.createElement('div');
    starBadge.className = 'badge';
    starBadge.innerHTML = `<span class="star">⭐</span><strong>${data.stars} نجوم</strong>`;
    el.appendChild(starBadge);
    const timeline = document.createElement('div');
    timeline.style.marginLeft = '12px';
    timeline.style.color = 'var(--muted)';
    timeline.style.fontSize = '13px';
    timeline.innerText = data.events.slice(-5).reverse().join(' • ');
    el.appendChild(timeline);
  }

  function awardStar(reason){
    const data = readBadges();
    data.stars = (data.stars||0)+1;
    data.events = data.events||[];
    data.events.push(`${new Date().toLocaleDateString()} ${reason||'نشاط'}`);
    writeBadges(data);
    renderBadges();
  }

  function resetBadges(){ localStorage.removeItem(storageKey); renderBadges(); }

  // Drawing board
  function initCanvas(){
    const canvas = document.getElementById('drawCanvas');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    let drawing=false; let last=null;
    function pos(e){
      if(e.touches && e.touches[0]) e = e.touches[0];
      const r = canvas.getBoundingClientRect();
      return {x: (e.clientX - r.left) * (canvas.width / r.width), y: (e.clientY - r.top) * (canvas.height / r.height)};
    }
    function down(e){ drawing=true; last=pos(e); }
    function move(e){ if(!drawing) return; e.preventDefault(); const p=pos(e); ctx.strokeStyle='#000'; ctx.lineWidth=4; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(last.x,last.y); ctx.lineTo(p.x,p.y); ctx.stroke(); last=p; }
    function up(){ drawing=false; last=null; }
    canvas.addEventListener('pointerdown', down); canvas.addEventListener('pointermove', move); canvas.addEventListener('pointerup', up); canvas.addEventListener('pointercancel', up);
    // buttons
    const clear = document.getElementById('clearCanvas');
    const save = document.getElementById('saveCanvas');
    clear && clear.addEventListener('click', ()=>{ ctx.clearRect(0,0,canvas.width,canvas.height); });
    save && save.addEventListener('click', ()=>{
      const a = document.createElement('a'); a.href = canvas.toDataURL('image/png'); a.download = 'drawing.png'; a.click();
      awardStar('حفظ رسم');
    });
  }

  // TTS
  function speak(text){ if(!text) return; const s = new SpeechSynthesisUtterance(text); s.lang = document.documentElement.lang || 'ar-SA'; speechSynthesis.cancel(); speechSynthesis.speak(s); }
  function initTTS(){
    document.querySelectorAll('.tts-btn').forEach(b=> b.addEventListener('click', ()=> speak(b.dataset.tts)));
    const speakBtn = document.getElementById('speakBtn');
    const input = document.getElementById('ttsInput');
    speakBtn && speakBtn.addEventListener('click', ()=> speak(input.value || 'مرحبا'));
  }

  // Songs library (simple)
  function renderSongs(){
    const list = document.getElementById('songsList'); if(!list) return;
    const songs = JSON.parse(localStorage.getItem('kg_songs')||'[]');
    list.innerHTML = '';
    songs.forEach((s,i)=>{
      const div = document.createElement('div'); div.style.marginTop='8px';
      const audio = document.createElement('audio'); audio.controls = true; audio.src = s; audio.preload='none';
      div.appendChild(audio);
      const label = document.createElement('div'); label.style.color='var(--muted)'; label.style.fontSize='13px'; label.innerText = s;
      div.appendChild(label);
      list.appendChild(div);
    })
  }
  function initSongs(){
    renderSongs();
    const add = document.getElementById('addSong');
    add && add.addEventListener('click', ()=>{
      const url = (document.getElementById('songUrl')||{}).value||''; if(!url) return alert('أدخل رابطاً');
      const arr = JSON.parse(localStorage.getItem('kg_songs')||'[]'); arr.push(url); localStorage.setItem('kg_songs', JSON.stringify(arr)); renderSongs();
    });
  }

  // Simple image quiz (emoji based to avoid external assets)
  function initQuiz(){
    const quizArea = document.getElementById('quizArea'); if(!quizArea) return;
    const options = ['🍎','🍌','🍇','🍐']; // target apple
    shuffle(options);
    quizArea.innerHTML = '';
    options.forEach(opt=>{
      const btn = document.createElement('button'); btn.innerText = opt; btn.style.fontSize='32px';
      btn.addEventListener('click', ()=>{
        const msg = document.getElementById('quizMsg');
        if(opt==='🍎'){ msg.innerText='إجابة صحيحة! أحسنت 🎉'; awardStar('اختبار صورة صحيح'); } else { msg.innerText='حاول مرة أخرى ✨'; }
      });
      quizArea.appendChild(btn);
    });
  }

  function shuffle(arr){ for(let i=arr.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [arr[i],arr[j]]=[arr[j],arr[i]] } }

  // Parent report
  function initParentCorner(){
    const btn = document.getElementById('downloadReport'); if(!btn) return;
    btn.addEventListener('click', ()=>{
      const data = readBadges();
      const report = {generated: new Date().toISOString(), badges: data};
      const blob = new Blob([JSON.stringify(report,null,2)], {type:'application/json'});
      const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'kg_report.json'; a.click();
      document.getElementById('reportArea').innerText = 'تم تنزيل تقرير التقدم (JSON).';
    });
  }

  function initBadgesButtons(){
    const award = document.getElementById('awardStarBtn'); const reset = document.getElementById('resetBadges');
    award && award.addEventListener('click', ()=> awardStar('منح يدوي'));
    reset && reset.addEventListener('click', ()=>{ if(confirm('هل تريد إعادة تعيين النجوم؟')) resetBadges(); });
  }

  // Initialization
  function initAll(){ renderBadges(); initBadgesButtons(); initCanvas(); initTTS(); initSongs(); initQuiz(); initParentCorner(); }

  document.addEventListener('DOMContentLoaded', initAll);
  document.addEventListener('includeLoaded', initAll);

  // expose for debugging
  window.kgFeatures = {awardStar,readBadges,resetBadges};
})();
