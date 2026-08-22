const clock=document.getElementById('clock');
function updateClock(){clock.textContent=new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit',second:'2-digit'});}
updateClock();setInterval(updateClock,1000);

document.querySelectorAll('.actions button').forEach(button=>{
  const original=button.textContent;
  button.addEventListener('click',async()=>{
    const prompt=button.dataset.prompt;
    try{
      await navigator.clipboard.writeText(prompt);
      button.textContent='COPIED ✓';
      setTimeout(()=>button.textContent=original,1200);
    }catch{
      window.prompt('Copy this prompt into JARVIS:',prompt);
    }
  });
});
