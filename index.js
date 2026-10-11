/****************************************************
 * 1. REAL SONG POOLS BY GENRE
 ****************************************************/
const genrePools = {
    "Country": [
        { title: "Tennessee Whiskey", artist: "Chris Stapleton" },
        { title: "Before He Cheats", artist: "Carrie Underwood" },
        { title: "Friends in Low Places", artist: "Garth Brooks" },
        { title: "Need You Now", artist: "Lady A" },
        { title: "Cruise", artist: "Florida Georgia Line" },
        { title: "Die a Happy Man", artist: "Thomas Rhett" },
        { title: "Wagon Wheel", artist: "Darius Rucker" },
        { title: "Body Like a Back Road", artist: "Sam Hunt" }
    ],
    "Rock": [
        { title: "Smells Like Teen Spirit", artist: "Nirvana" },
        { title: "Boulevard of Broken Dreams", artist: "Green Day" },
        { title: "Hotel California", artist: "Eagles" },
        { title: "Seven Nation Army", artist: "The White Stripes" },
        { title: "Believer", artist: "Imagine Dragons" },
        { title: "Enter Sandman", artist: "Metallica" },
        { title: "Back in Black", artist: "AC/DC" },
        { title: "Sweet Child O' Mine", artist: "Guns N' Roses" }
    ],
    "R&B": [
        { title: "Butterflies", artist: "Brent Faiyaz" },
        { title: "We Belong Together", artist: "Mariah Carey" },
        { title: "Let's Stay Together", artist: "Al Green" },
        { title: "Blinding Lights", artist: "The Weeknd" },
        { title: "So Sick", artist: "Ne-Yo" },
        { title: "No Guidance", artist: "Chris Brown" },
        { title: "Adorn", artist: "Miguel" },
        { title: "Ordinary People", artist: "John Legend" }
    ],
    "Pop": [
        { title: "Levitating", artist: "Dua Lipa" },
        { title: "Toxic", artist: "Britney Spears" },
        { title: "Billie Jean", artist: "Michael Jackson" },
        { title: "Firework", artist: "Katy Perry" },
        { title: "As It Was", artist: "Harry Styles" },
        { title: "Shake It Off", artist: "Taylor Swift" },
        { title: "Blinding Lights", artist: "The Weeknd" },
        { title: "Uptown Funk", artist: "Mark Ronson ft. Bruno Mars" }
    ],
    "Soul": [
        { title: "Ain't No Sunshine", artist: "Bill Withers" },
        { title: "Redbone", artist: "Childish Gambino" },
        { title: "If I Ain't Got You", artist: "Alicia Keys" },
        { title: "Superstition", artist: "Stevie Wonder" },
        { title: "Put Your Records On", artist: "Corinne Bailey Rae" },
        { title: "What's Going On", artist: "Marvin Gaye" },
        { title: "Lovely Day", artist: "Bill Withers" },
        { title: "Let's Get It On", artist: "Marvin Gaye" }
    ],
    "Classical": [
        { title: "Clair de Lune", artist: "Debussy" },
        { title: "Canon in D", artist: "Pachelbel" },
        { title: "The Four Seasons: Spring", artist: "Vivaldi" },
        { title: "Gymnopedie No.1", artist: "Satie" },
        { title: "Spiegel im Spiegel", artist: "Arvo Pärt" },
        { title: "Moonlight Sonata", artist: "Beethoven" },
        { title: "Swan Lake", artist: "Tchaikovsky" },
        { title: "Nocturne in E-flat Major", artist: "Chopin" }
    ]
};

/****************************************************
 * 2. BUILD FULL 162-ENTRY DATABASE (REAL SONGS ONLY)
 ****************************************************/
const genres = ["Country", "Rock", "R&B", "Pop", "Soul", "Classical"];
const speeds = ["Slow", "Moderate", "Fast"];
const vibes = ["Peaceful", "Neutral", "Chaotic"];
const eras = ["Old School", "Mid School", "New School"];

const musicDB = [];

genres.forEach(genre => {
    speeds.forEach(speed => {
        vibes.forEach(vibe => {
            eras.forEach(era => {

                const pool = genrePools[genre];
                const index =
                    (speeds.indexOf(speed) * vibes.length * eras.length) +
                    (vibes.indexOf(vibe) * eras.length) +
                    eras.indexOf(era);

                const song = pool[index % pool.length];

                musicDB.push({
                    title: song.title,
                    artist: song.artist,
                    genre,
                    speed,
                    vibe,
                    era
                });
            });
        });
    });
});

/****************************************************
 * 3. YOUR PLAYLIST LINKS
 ****************************************************/
const playlistLinks = {
    "Country": "https://open.spotify.com/playlist/2n0Tkl7TtT0fRYUq2e7vA0?si=0I-kFiBAS8GfbeO2QQr56Q",
    "Soul": "https://open.spotify.com/playlist/2OvFEzux8fhWMVfPVuLQGD?si=qOop2BeDSG2yXKJT-WMgRQ",
    "Pop": "https://open.spotify.com/playlist/1Lta8UhtfnMtLJzLlkPuoH?si=NfKYQxGbSQilaQBMrauanQ",
    "R&B": "https://open.spotify.com/playlist/27uGrDQ2XNpjcWSXh0wWXL?si=tCWJuByZQvWe1epAKxhqhQ",
    "Rock": "https://open.spotify.com/playlist/2mUYhiDUO8vIpBouYn2YHR?si=_GuwlE4LTcqLnPa1SF0NVA",
    "Classical": "https://open.spotify.com/playlist/6bJcSlGoZYeOdIQlEj3Ozn?si=A6V_YWxfSqaiKVUb940IlQ"
};

/****************************************************
 * 4. SAVE / LOAD USER ANSWERS
 ****************************************************/
function saveAnswer(type, value) {
    let preferences = JSON.parse(localStorage.getItem("preferences")) || {};
    preferences[type] = value;
    localStorage.setItem("preferences", JSON.stringify(preferences));
}

function getPreferences() {
    return JSON.parse(localStorage.getItem("preferences")) || {};
}

/****************************************************
 * 5. GET RECOMMENDATIONS
 ****************************************************/
function getRecommendations(preferences) {
    return musicDB.filter(song =>
        song.genre === preferences.genre &&
        song.speed === preferences.speed &&
        song.vibe === preferences.vibe &&
        song.era === preferences.era
    );
}

/****************************************************
 * 6. DISPLAY RESULTS
 ****************************************************/
function displayResults() {
    const preferences = getPreferences();
    const songs = getRecommendations(preferences);
    const resultsDiv = document.getElementById("results");

    if (!songs.length) {
        resultsDiv.innerHTML = "<p class='result-artist'>No match found. Go back and answer all four questions.</p>";
        return;
    }

    const topSong = songs[0];

    const songItem = document.createElement("p");
    songItem.textContent = topSong.title;
    songItem.style.fontSize = "70px";
    songItem.style.fontWeight = "bold";
    resultsDiv.appendChild(songItem);

    const artistItem = document.createElement("p");
    artistItem.textContent = `Artist: ${topSong.artist}`;
    artistItem.style.fontSize = "50px";
    artistItem.style.marginBottom = "100px";
    resultsDiv.appendChild(artistItem);

    const link = document.createElement("a");
    link.className = "result-link";
    link.href = playlistLinks[preferences.genre];
    link.target = "_blank";
    link.textContent = "Open Your Playlist on Spotify";
    resultsDiv.appendChild(link);
}

/****************************************************
 * 7. BUTTON LOGIC
 ****************************************************/
document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".img-question-button");

    buttons.forEach(btn => {
        btn.addEventListener("click", (event) => {
            event.preventDefault();

            const value = btn.innerText.trim();
            const page = document.body.getAttribute("data-question");

            if (page) {
                saveAnswer(page, value);
            }

            const link = btn.getAttribute("href");
            if (link) {
                window.location.href = link;
            }
        });
    });
});
