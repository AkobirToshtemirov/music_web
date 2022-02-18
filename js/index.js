let audioTag = document.querySelector('.audioTag')
let menuBar = document.querySelectorAll('.menuBar')
let prev = document.querySelector('.fa-backward')
let play = document.querySelector('.fa-play')
let next = document.querySelector('.fa-forward')
let music_duration = document.querySelector('.music_duration')
let music_time = document.querySelector('.music_time')

let musicPhoto = document.querySelector('.musicPhoto')
let artistName = document.querySelector('.artistName')
let musicNames = document.querySelector('.musicNames')
let range =document.querySelector('#range')

let musics = [ 'Adam', 'Billie Eilish & Khalid', 'Bruno Mars', 'Doston Ergashev', 'Ed Sheeran', `G'aybulla Tursunov`, 'Justin', `Justin Bieber`, `Ad Aka Dilovar`, `Julius Dreisig` ]

let music_name = [
    `Davay ne boley`,
    `Lovely`,
    `Grenade`, 
    ` Eyt do'stim`,
    `Shape of you`, 
    `Yaxshi ko'rardim`, 
    `Justin Lovely`,
    'Stay',
    `Davaye`,
    'Swalla'
]

let music_photo = [
    `https://is5-ssl.mzstatic.com/image/thumb/Music116/v4/f5/ca/e7/f5cae795-1d81-f47c-259a-ccab629e3692/cover.jpg/1200x1200bf-60.jpg`,
    `https://i.ytimg.com/vi/a_D7qMoK2MA/maxresdefault.jpg`, 
    `https://www.billboard.com/wp-content/uploads/stylus/107127-bruno_mars_617_409.jpg`,
    `https://i.ytimg.com/vi/F4qI99pTyes/hqdefault.jpg`, 
    `https://img.discogs.com/9gLVVyZ5Tmd2l8WvEScNC1LQyYk=/fit-in/600x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-9742077-1485647103-1247.jpeg.jpg`,
    `https://is5-ssl.mzstatic.com/image/thumb/Music124/v4/ff/54/ef/ff54ef6a-3197-b4e9-12bf-39d5a155b592/cover.jpg/400x400cc.jpg`,
    `https://img.youtube.com/vi/IjNTuBgOkz0/hqdefault.jpg  `,
    `https://cdn51.zvuk.com/pic?type=release&id=16317172&ext=jpg&size=200x200`,
    `https://i.ytimg.com/vi/md65GIQ9Cu8/maxresdefault.jpg`,
    `https://cdns-images.dzcdn.net/images/cover/0f70934b35efe1af954f2ab8ada803ff/500x500.jpg`
]

let songNum = 0;

loadSong(musics[songNum])

function loadSong(songs) {
    artistName.innerText = musics[songNum]
    audioTag.setAttribute('src', `./music/${songs}.mp3`)
    musicPhoto.setAttribute('src', music_photo[songNum])
    musicNames.innerText = music_name[songNum]
}

function playMusic() {
    play.classList.remove('fa-play')
    play.classList.add('fa-pause')
    audioTag.play()
}

function stopMusic() {
    play.classList.add('fa-play')
    play.classList.remove('fa-pause')
    audioTag.pause()
}

function nextSong() {
    songNum++
    if(songNum > musics.length - 1) {
        songNum = 0
    }

    loadSong(musics[songNum])
    playMusic()
}

function prevSong() {
    songNum--
    if(songNum < 0) {
        songNum = musics.length - 1
    }

    loadSong(musics[songNum])
    playMusic()
}

play.addEventListener('click', () => {
    if(play.classList.contains('fa-play')) {
        playMusic()
    }else {
        stopMusic()
    }
})

next.addEventListener('click', nextSong)
prev.addEventListener('click', prevSong)

function updateProgress(e) {
    const {duration, currentTime} = e.srcElement
    console.log('duration: ', duration);
    console.log('currentTime ', currentTime);
    const progressPercent = (currentTime / duration) * 100;
    music_time.style.width = `${progressPercent}%`
    audioTag.onloadeddata = function() {
        let secund = parseInt(audioTag.duration % 60)
        let minut = parseInt((audioTag.duration / 60) % 60)
        let inter = setInterval(() => {
            secund = secund - 1
        }, 1000) 

        if(duration === currentTime) {
            clearInterval(inter)
        }

        document.querySelector('music_duration span').innerHTML = `${minut} : ${secund}`
    }
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX
    const duration = audioTag.duration

    audioTag.currentTime = (clickX / width) * duration
}

range.addEventListener('input', () => {
    audio.volume = range.value
})

audioTag.addEventListener('timeupdate', updateProgress)

music_duration.addEventListener('click', setProgress)
audioTag.addEventListener('ended', nextSong)
