const clock=document.getElementById("clock");
function updateTime(){clock.textContent=new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",second:"2-digit"});}
updateTime();setInterval(updateTime,1000);

const quotes=[
["“One more game.”","It was, in fact, not one more game."],
["“I can fix this build.”","The build was not fixed."],
["“This will only take five minutes.”","It did not take five minutes."]
];
let q=0;
setInterval(()=>{
  q=(q+1)%quotes.length;
  document.getElementById("quote").textContent=quotes[q][0];
  document.getElementById("quoteSub").textContent=quotes[q][1];
},4500);
