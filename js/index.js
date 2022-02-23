let audioTag = document.querySelector('.audioTag')
let menuBar = document.querySelectorAll('.menuBar')
let prev = document.querySelector('.fa-backward')
let play = document.querySelector('.fa-play')
let next = document.querySelector('.fa-forward')
let music_duration = document.querySelector('.music_duration')
let music_time = document.querySelector('.music_time')
let sound_icon = document.querySelector('.sound_icon')

let musicPhoto = document.querySelector('.musicPhoto')
let artistName = document.querySelector('.artistName')
let musicNames = document.querySelector('.musicNames')
let volumes =document.querySelector('.volumes')

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
    `https://m.media-amazon.com/images/I/81lWGt6TTpS._SS500_.jpg`,
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


function updateProgress(e) {
    const {duration, currentTime} = e.srcElement
    // console.log('duration: ', duration);
    // console.log('currentTime ', currentTime);
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

        document.querySelector('.time').innerHTML = `${minut} : ${secund}`

    }
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX
    const duration = audioTag.duration

    audioTag.currentTime = (clickX / width) * duration
}


// let xmark = document.querySelector('.fa-volume-xmark')
// xmark.addEventListener('click', () => {
//     volumes.value = 0.5
//      audioTag.volume = volumes.value
// })

volumes.addEventListener('input', () => {
    audioTag.volume = volumes.value

    if(volumes.value <= 0.5) {
        sound_icon.classList.remove('fa-volume-high')
        sound_icon.classList.add('fa-volume-low')
    } else {
        sound_icon.classList.add('fa-volume-high')
        sound_icon.classList.remove('fa-volume-low')
    } 
})

if(volumes.value === 0) {
    sound_icon.classList.add('fa-volume-xmark')
} else {
    sound_icon.classList.remove('fa-volume-xmark')
}

sound_icon.addEventListener('click', () => {
    sound_icon.classList.toggle('fa-volume-xmark')
 
    if(sound_icon.classList.contains('fa-volume-xmark')) {
        volumes.value = 0
        audioTag.volume = volumes.value
    } else {
        volumes.value = 0.7
        audioTag.volume = volumes.value
    
    }
    
})

audioTag.addEventListener('timeupdate', updateProgress)

music_duration.addEventListener('click', setProgress)
audioTag.addEventListener('ended', nextSong)

for(let j = 0; j < musics.length; j++) {

    let box = document.createElement('div')
    box.classList.add('homeOfMusic')
    box.setAttribute('data-id', j+1 )
    let numberAndImg = document.createElement('div')
    box.appendChild(numberAndImg)
    numberAndImg.classList.add('numberAndImg')
    let number = document.createElement('h4')
    number.classList.add('number')
    number.innerText = j+1
    numberAndImg.appendChild(number)
    let img = document.createElement('img')
    img.setAttribute('src', music_photo[j])
    numberAndImg.appendChild(img)
    let textBlock  = document.createElement('div')
    textBlock.classList.add('textBlock')
    numberAndImg.appendChild(textBlock)
    let name = document.createElement('h3')
    name.innerText = music_name[j]
    textBlock.appendChild(name)
    let actor = document.createElement('p')
    actor.innerText = musics[j]
    textBlock.appendChild(actor)
    let control = document.createElement('div')
    control.classList.add('likeControl')
    let like = document.createElement('img')
    like.setAttribute('src', `https://wisperwindoxas.github.io/sneaker/img/heart-unliked.svg`)
    like.classList.add('like')
    control.appendChild(like)
    let sounds = document.createElement('div')
    sounds.classList.add('sounds')
    control.appendChild(sounds)
    box.appendChild(control)
    menuBar[1].appendChild(box)

  


}



let numLarge = document.querySelectorAll('.number')
numLarge[9].classList.add('large')

let box_homeOfMusic = document.querySelectorAll('.numberAndImg')
let soundAnim = document.querySelectorAll('.sounds')
let homeOfMusic = document.querySelectorAll('.homeOfMusic')

function cleanTree() {
    soundAnim.forEach(item => {
        item.classList.remove('soundBg')
    })
    soundAnim[songNum].classList.add('soundBg')
}
box_homeOfMusic.forEach((item, index) => {

    

    item.addEventListener('click', () => {
        // if(item.classList.contains('sounds')){
        //     item.classList.remove('sounds')
        //     item.classList.add('stopping')
        //     playMusic()
        //     soundAnim[index].setAttribute('src', 'none')

        // }else{
        //     item.classList.remove('stopping')
        //     item.classList.add('sounds')
        //     stopMusic()
        //     soundAnim[index].setAttribute('src', `https://m.media-amazon.com/images/G/01/digital/music/player/web/sixteen_frame_equalizer_accent.gif`)
           
        // }

       
       


        item.classList.add('stopping')
        audioTag.setAttribute('src', `./music/${musics[index]}.mp3`)
        songNum = index
        playMusic()
        artistName.innerText = musics[index]
        musicPhoto.setAttribute('src', music_photo[index])
        musicNames.innerText = music_name[index]
        
    
        // soundAnim.forEach(item => {
        //     item.setAttribute('src', `https://m.media-amazon.com/images/G/01/digital/music/player/web/sixteen_frame_equalizer_accent.gif`)
        // })
       

        homeOfMusic[index].addEventListener('click', function() {
            
            cleanTree()
           

            if(this.getAttribute('data-id') == songNum+1){
                
                soundAnim[songNum].classList.add('soundBg')
                playMusic()

            }
           
        })
       

    })
})


let unlike = document.querySelectorAll('.like')

unlike.forEach(item => {
    item.addEventListener('click', () => {
            item.classList.toggle("redPlus")
    
            if (item.classList.contains('redPlus')) {
                item.setAttribute('src', 'https://wisperwindoxas.github.io/sneaker/img/heart-liked.svg')
            }else {
                item.setAttribute('src', 'https://wisperwindoxas.github.io/sneaker/img/heart-unliked.svg')
            }
    })
})

let likeControl = document.querySelectorAll('.likeControl')

if(songNum.valueOf() === box_homeOfMusic.valueOf()) {
    let sounds = document.createElement('img')
    sounds.setAttribute('src', `https://maxst.icons8.com/vue-static/landings/animated-icons/icons/sound/sound.json`)
    box_homeOfMusic.appendChild(sounds)
    console.log(sounds);
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
    cleanTree()
    
    loadSong(musics[songNum])
    playMusic()

}

function prevSong() {
    
    songNum--
    if(songNum < 0) {
        songNum = musics.length - 1
    }
    cleanTree()
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
