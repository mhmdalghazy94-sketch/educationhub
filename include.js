(function(){
  async function includeFragments(){
    const nodes = document.querySelectorAll('[data-include]');
    await Promise.all(Array.from(nodes).map(async node=>{
      const src = node.getAttribute('data-include');
      try{
        const res = await fetch(src);
        if(!res.ok) throw new Error(res.statusText);
        const text = await res.text();
        node.innerHTML = text;
      }catch(e){ console.warn('Include failed:', src, e); }
    }));
    document.dispatchEvent(new Event('includeLoaded'));
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', includeFragments); else includeFragments();
})();
