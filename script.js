console.log("let's start js");
let currentsong = new Audio();
function formatTime(seconds) {
    seconds = Math.floor(seconds); // remove decimals

    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;

    // Add leading zero if needed
    if (remainingSeconds < 10) {
        remainingSeconds = "0" + remainingSeconds;
    }

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    return minutes + ":" + remainingSeconds;
}

async function getsongs() {
    let a = await fetch("http://127.0.0.1:3000/songs/");
    let response = await a.text();
    console.log(response)

    let div = document.createElement("div");
    div.innerHTML = response;  // FIXED

    let as = div.getElementsByTagName("a");
    let songs = [];

    for (let index = 0; index < as.length; index++) {
        const element = as[index];

        if (element.getAttribute("href")?.includes(".mp3")) {

            let cleanName = element.textContent.trim();
            songs.push(cleanName);
        }
    }

    return songs;
}
const playmusic = (track, pause = false) => {
    currentsong.src = "/songs/" + track + ".mp3"
    if (!pause) {
        currentsong.play();
        play.src="pause.svg"
    }

   
    document.querySelector(".songinfo").innerHTML = track
    document.querySelector(".songtime").innerHTML = "00:00 /00:00"
}

async function main() {

    //to get the list of all songs
    let songs = await getsongs();
    console.log(songs);
    playmusic(songs[0], true)
    let songul = document.querySelector(".songlist").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songul.innerHTML += `<li>
 
                   <img class="music" src="music.svg" alt="">
                        <div class="info">
                            <div>${song.replaceAll("%20", " ").replace(".mp3", " ")}</div>
                            <div>Nikunj</div>
                        </div> 
                        <div class="playnow">
                            <span>play now</span>
                            <img class="play-icon2" src="play.svg" alt="">
                        </div>  
        </li>`;
    }
    //attach an event listener to each song
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach((e) => {
        e.addEventListener("click", element => {
            console.log(e.querySelector(".info").firstElementChild.innerHTML)
            playmusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
        })

    })
    //attach an event listener to play,next and previous
    play.addEventListener("click", () => {
        if (currentsong.paused) {
            currentsong.play();
            play.src = "pause.svg"
        }

        else {
            currentsong.pause()
            play.src = "play.svg"


        }


    })
    //listen for timeupdate event
    currentsong.addEventListener("timeupdate", (a) => {
        console.log(currentsong.currentTime, currentsong.duration);
        document.querySelector(".songtime").innerHTML = `${formatTime(currentsong.currentTime)}/${formatTime(currentsong.duration)}`
    })
    document.querySelector(".circle").style.left=(currentsong.currentTime/currentsong.duration)*100+"%";

    //add an seek bar  anto event listener
    document.querySelector(".seekbar").addEventListener("click",(e)=>{
       let percent=(e.offsetX/e.target.getBoundingClientRect().width)*100;
       document.querySelector(".circle").style.left=percent+"%"
        currentsong.currentTime=((currentsong.duration)*percent)/100
    })
    //add an event listener for hamburger
    document.querySelector(".hamburger").addEventListener("click",()=>{
        document.querySelector(".leftcontainer").style.left="0"
    })
    //add am event listener for cross
    document.querySelector(".close").addEventListener("click",()=>{
        document.querySelector(".leftcontainer").style.left="-120%";
    })
    //add an event listener for prev 
    previous.addEventListener("click",()=>{
        console.log("previous clicked")
    })
    //add an event listener for next 
    next.addEventListener("click",()=>{
        console.log("next clicked")
    })



}

main()