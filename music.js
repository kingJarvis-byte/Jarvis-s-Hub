const tracks=[
 {title:"31 Sins (let em' in)",file:"music/31-sins-let-em-in.mp3"},
 {title:"A New Spark",file:"music/a-new-spark.mp3"},
 {title:"A New Spark — Rave Version",file:"music/a-new-spark-rave.mp3"},
 {title:"Canteen Money Laundering",file:"music/canteen-money-laundering.mp3"},
 {title:"Fit Check (ESHAY STYLE)",file:"music/fit-check-eshay-style.mp3"}
];

const audio=document.getElementById("audio");
const list=document.getElementById("tracks");
const play=document.getElementById("play");
const prev=document.getElementById("prev");
const next=document.getElementById("next");
const progress=document.getElementById("progress");
const volume=document.getElementById("volume");
const nowTitle=document.getElementById("nowTitle");
const currentTime=document.getElementById("currentTime");
const duration=document.getElementById("duration");
const state=document.getElementById("playState");
let current=0;

function fmt(seconds){
 if(!Number.isFinite(seconds))return"0:00";
 const m=Math.floor(seconds/60),s=Math.floor(seconds%60).toString().padStart(2,"0");
 return `${m}:${s}`;
}

function render(){
 list.innerHTML="";
 tracks.forEach((track,i)=>{
  const row=document.createElement("div");
  row.className="track"+(i===current?" active":"");
  row.innerHTML=`<div class="track-number">${String(i+1).padStart(2,"0")}</div><div><div class="track-title"></div><div class="track-sub">MINIMAL THREAT</div></div><button title="Play track">${i===current&&!audio.paused?"❚❚":"▶"}</button>`;
  row.querySelector(".track-title").textContent=track.title;
  row.querySelector("button").onclick=()=>loadTrack(i,true);
  list.appendChild(row);
 });
}

function loadTrack(i,autoplay=false){
 current=(i+tracks.length)%tracks.length;
 audio.src=tracks[current].file;
 nowTitle.textContent=tracks[current].title;
 state.textContent=autoplay?"PLAYING":"READY";
 audio.load();
 render();
 if(autoplay)audio.play().catch(()=>{state.textContent="READY";});
 updateTimes();
}

play.onclick=()=>{
 if(!audio.src)loadTrack(0);
 if(audio.paused){audio.play();state.textContent="PLAYING"}else{audio.pause();state.textContent="PAUSED"}
 render();
};

prev.onclick=()=>loadTrack(current-1,true);
next.onclick=()=>loadTrack(current+1,true);

audio.addEventListener("play",()=>{state.textContent="PLAYING";play.textContent="❚❚";render()});
audio.addEventListener("pause",()=>{state.textContent="PAUSED";play.textContent="▶";render()});
audio.addEventListener("ended",()=>loadTrack(current+1,true));
audio.addEventListener("loadedmetadata",updateTimes);
audio.addEventListener("timeupdate",()=>{
 currentTime.textContent=fmt(audio.currentTime);
 duration.textContent=fmt(audio.duration);
 progress.value=audio.duration?(audio.currentTime/audio.duration)*100:0;
});

progress.oninput=()=>{
 if(audio.duration)audio.currentTime=(progress.value/100)*audio.duration;
};
volume.oninput=()=>audio.volume=Number(volume.value);
audio.volume=.85;

function updateTimes(){
 currentTime.textContent=fmt(audio.currentTime);
 duration.textContent=fmt(audio.duration);
 progress.value=0;
}
loadTrack(0,false);
