const clock=document.getElementById("clock");
function updateClock(){clock.textContent=new Date().toLocaleTimeString("en-AU",{hour12:false});}
updateClock();setInterval(updateClock,1000);
document.getElementById("searchForm").addEventListener("submit",e=>{e.preventDefault();const input=document.getElementById("searchInput"),q=input.value.trim();if(!q)return;document.getElementById("terminalText").innerHTML="> QUERY RECEIVED<br>> SEARCHING GOOGLE: "+q.replace(/[<>]/g,"")+"<br>> OPENING RESULTS...";window.open("https://www.google.com/search?q="+encodeURIComponent(q),"_blank");input.select();});
