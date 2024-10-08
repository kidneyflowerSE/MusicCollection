const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path: 'assets/LaoTamKhoTu.mp3',
        displayName: 'Lao Tâm Khổ Tứ',
        cover: 'assets/LMAO6265.jpg',
        artist: 'Thanh Hưng',
    },
    {
        path: 'assets/Một Triệu Khả Năng.mp3',
    
        displayName: '一百万个可能 ',
        cover: 'assets/gen.jpeg',
        artist: '克丽丝叮',
    },
    {
        path: 'assets/Kyuccondau.mp3',
        displayName: 'Ký Ức Còn Đâu',
        cover: 'assets/4.jpg',
        artist: 'Hồ Quang Hiếu ft Minh Vương',
    },
    {
        path: 'assets/Kyuccondau.mp3',
        displayName: 'Ký Ức Còn Đâu',
        cover: 'assets/5.jpg',
        artist: 'Hồ Quang Hiếu ft Minh Vương',
    },
    {
        path: 'assets/Hoa nở sau chia tay.mp3',
        displayName: '離別開出花',
        cover: 'assets/IMG_7523@2x2.jpg',
        artist: '就是南方凱',
    },
    {
        path: 'assets/Star và Sea.mp3',
        displayName: '星辰大海',
        cover: 'assets/IMG_7551.JPG',
        artist: '黄霄云',
    },
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    // Change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    // Change pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const progressImage = progress.querySelector('img');
    const progressBarWidth = playerProgress.clientWidth;
    const imagePosition = (progressPercent / 100) * progressBarWidth;

    progressImage.style.left = `${imagePosition}px`; 


    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}


function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

document.addEventListener('keydown', function (e) {
    if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
    } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        changeMusic(-1); 
    } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        changeMusic(1); 
    }
});

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);