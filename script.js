console.log("let's start js");
let currentsong = new Audio();
let songs;
let currfolder;
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

async function getsongs(folder) {
    folder=folder.replace(/\\/g,"/");
    console.log(folder)
    currfolder = folder
    let a = await fetch(`http://127.0.0.1:3000/${folder}/`);
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;  // FIXED

    let as = div.getElementsByTagName("a");
    songs = [];

    for (let index = 0; index < as.length; index++) {
        const element = as[index];

        if (element.getAttribute("href")?.includes(".mp3")) {

            let cleanName = element.textContent.trim();
            songs.push(cleanName);
        }
    }


    let songul = document.querySelector(".songlist").getElementsByTagName("ul")[0]
    songul.innerHTML = ""
    for (const song of songs) {
        songul.innerHTML += `<li data-song="${song}">
 
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
    Array.from(document.querySelectorAll(".songlist li")).forEach((e) => {
        e.addEventListener("click", () => {
            let songName = e.dataset.song;
            playmusic(songName);
        });
    });

    return songs;


}
const playmusic = (track, pause = false) => {
    currentsong.src = `/${currfolder}/` + track;
    if (!pause) {
        currentsong.play();
        play.src = "pause.svg"
    }


    document.querySelector(".songinfo").innerHTML = track
    document.querySelector(".songtime").innerHTML = "00:00 /00:00"
}
async function displayAlbums() {
    let a = await fetch(`http://127.0.0.1:3000/songs/`);
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response
    console.log(div)
    let anchors = div.getElementsByTagName("a")
    let cardcontainer = document.querySelector(".cardcontainer")
    Array.from(anchors).forEach(async e => {
        console.log(decodeURIComponent(e.href))
        let decoded=decodeURIComponent(e.href).replace(/\\/g,"/")
         
        if (decoded.includes("/songs")) {
             let folder=decoded.split("/").slice(-2)[0]
            //get the metadata of the folder
            let a = await fetch(`http://127.0.0.1:3000/songs/${folder}/info.json`);
            let response = await a.json();
            cardcontainer.innerHTML = cardcontainer.innerHTML + `      <div data-folder="${folder}" class="card1">
                    <div  class="play">
                        <svg class="play-icon" xmlns="http://www.w3.org/2000/svg" width="80" height="80"
                            viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" fill="#1DB954" />
                            <polygon points="10 8 16 12 10 16" fill="black" />
                        </svg>
                    </div>
                    <img src="/songs/${folder}/cover.jpg" alt="">
                    <h2>${response.title}</h2>
                    <p>${response.description}</p>
                </div>`
        }
         Array.from(document.getElementsByClassName("card1")).forEach(e => {
        console.log(e)
        e.addEventListener("click", async item => {
            console.log(item, item.currentTarget.dataset)
            songs = await getsongs(`songs/${item.currentTarget.dataset.folder}`)
            playmusic(songs[0], true);

        })
    })



    })

}
 







async function main() {

    //to get the list of all songs
    await getsongs("songs/ncs");
    console.log(songs);
    playmusic(songs[0], true)
    //display all the albums on the page
    await displayAlbums()



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
        document.querySelector(".circle").style.left = (currentsong.currentTime / currentsong.duration) * 100 + "%";

    })

    //add an seek bar  anto event listener
    document.querySelector(".seekbar").addEventListener("click", (e) => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%"
        currentsong.currentTime = ((currentsong.duration) * percent) / 100
    })
    //add an event listener for hamburger
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".leftcontainer").style.left = "0"
    })
    //add am event listener for cross
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".leftcontainer").style.left = "-120%";
    })
    //add an event listener for prev 
    previous.addEventListener("click", () => {
        console.log("previous clicked")

        let index = songs.indexOf(
            decodeURIComponent(currentsong.src.split("/").slice(-1)[0])
        );

        if ((index - 1) >= 0) {
            playmusic(songs[index - 1]);
        }
    });
    //add an event listener for next 
    next.addEventListener("click", () => {
        console.log("next clicked");

        let index = songs.indexOf(
            decodeURIComponent(currentsong.src.split("/").slice(-1)[0])
        );

        if ((index + 1) < songs.length) {
            playmusic(songs[index + 1]);
        }
    });
    //add an event to the volume
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        console.log("setting volume to", e.target.value, "/100")
        currentsong.volume = parseInt(e.target.value) / 100
    })
    //load whenever the card is clicked
  

}

main()