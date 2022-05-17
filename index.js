var $ = document.querySelector.bind(document)
var $$ = document.querySelectorAll.bind(document)


const list = $('.list-music-infor')
const itemmussic = $$('.music-item')
const curenChs = $('.current-music')
const itemNameMusic = $('.item-name-music')
const itemNameSinger = $('.item-name-singer')
const nameinfor = $('.name-music')
const singerinfor = $('.name-singer')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playBtn = $('.play')
const progress = $('.progress')
const next = $('.next')
const pre = $('.pre')
const circle = $('.cirle-img')
const playbtnl = $('.playbtnl')
const pasuebtnl = $('.pasuebtnl')
const cirleimglink = $('.cirle-img-link')

function start() {
    render()
}
const app = {
    currentIndex: 0,
    songs: [{
            name: 'Mùa đông chưa bao giờ tới',
            singer: 'Thái Vũ',
            path: './mp3/Mua-Dong-Chua-Bao-Gio-Toi-Uyen-Linh-Vu.mp3',
            image: './image/vu.jpg'
        },
        {
            name: 'Reality',
            singer: 'Lost Frequencies',
            path: './mp3/Reality-Lost-Frequencies-Janieck-Devy.mp3',
            image: './image/reality.jpg'
        },
        {
            name: 'Mùa đông chưa bao giờ tới',
            singer: 'Thái Vũ',
            path: './mp3/Mua-Dong-Chua-Bao-Gio-Toi-Uyen-Linh-Vu.mp3',
            image: './image/vu.jpg'
        },
        {
            name: 'Mùa đông chưa bao giờ tới',
            singer: 'Thái Vũ',
            path: './mp3/Mua-Dong-Chua-Bao-Gio-Toi-Uyen-Linh-Vu.mp3',
            image: './image/vu.jpg'
        },
        {
            name: 'Mùa đông chưa bao giờ tới',
            singer: 'Thái Vũ',
            path: './mp3/Mua-Dong-Chua-Bao-Gio-Toi-Uyen-Linh-Vu.mp3',
            image: './image/vu.jpg'
        },
        {
            name: 'Mùa đông chưa bao giờ tới',
            singer: 'Thái Vũ',
            path: './mp3/Mua-Dong-Chua-Bao-Gio-Toi-Uyen-Linh-Vu.mp3',
            image: './image/vu.jpg'
        },
        {
            name: 'Mùa đông chưa bao giờ tới',
            singer: 'Thái Vũ',
            path: './mp3/Mua-Dong-Chua-Bao-Gio-Toi-Uyen-Linh-Vu.mp3',
            image: './image/vu.jpg'
        },
        {
            name: 'Mùa đông chưa bao giờ tới',
            singer: 'Thái Vũ',
            path: './mp3/Mua-Dong-Chua-Bao-Gio-Toi-Uyen-Linh-Vu.mp3',
            image: './image/vu.jpg'
        },
        {
            name: 'Mùa đông chưa bao giờ tới',
            singer: 'Thái Vũ',
            path: './mp3/Mua-Dong-Chua-Bao-Gio-Toi-Uyen-Linh-Vu.mp3',
            image: './image/vu.jpg'
        }

    ],

    render: function() {
        htmls = this.songs.map(function(song, index) {
            console.log(index)

            return `
            <div class="music-item ${index == this.currentIndex ? 'active-item':''}" data-index=${index}>
                        <img class="item-music-img" src="${song.image}" alt="">
                        <div>
                            <h3 class="item-name-music">${song.name}</h3>
                            <p class="item-name-singer">${song.singer}</p>
                        </div>
                        <i class="item-song-icon fa-solid fa-play"></i>
                    </div>
            `
        })
        list.innerHTML = htmls.join('')


    },
    defineProperties: function() {
        Object.defineProperty(this, 'currensong', {
            get: function() {

                return this.songs[this.currentIndex]

            }
        })
    },
    loadCurrentsong: function() {
        nameinfor.textContent = this.currensong.name
        singerinfor.textContent = this.currensong.singer
        cdThumb.src = this.currensong.image
        audio.src = this.currensong.path
        cirleimglink.src = this.currensong.image
    },
    nextSong: function() {
        this.currentIndex++
            if (this.currentIndex >= this.songs.length) {
                this.currentIndex = 0
            }
        this.loadCurrentsong()
    },
    preSong: function() {
        this.currentIndex--
            if (this.currentIndex < 0) {
                this.currentIndex = this.songs.length - 1
            }
        this.loadCurrentsong()
    },
    handleEvents: function() {
        const _this = this
        const playBtn = $('.toggle')
        const pauseBtn = $('.pasue')
            // Xử li xoay CD xoay liên tục
        const cdthumbAnimate = cdThumb.animate([
            { transform: "rotate(360deg)" }
        ], {
            duration: 10000,
            iterations: Infinity
        });
        cdthumbAnimate.pause();
        const circleAnimate = circle.animate(
            [
                { transform: "rotate(360deg)" }
            ], {
                duration: 10000,
                iterations: Infinity
            });
        circleAnimate.pause();
        playBtn.onclick = function() {
            playBtn.style.display = "none"
            pauseBtn.style.display = "block"
            audio.play()
            circleAnimate.play()
            cdthumbAnimate.play()
        }

        pauseBtn.onclick = function() {
            playBtn.style.display = "block"
            pauseBtn.style.display = "none"
            audio.pause()
            circleAnimate.pause()

            cdthumbAnimate.pause()

        }
        console.log(playBtn)
        console.log(pauseBtn)
        audio.ontimeupdate = function() {
            if (audio.duration) {
                progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent
            }
        }

        progress.onchange = function(e) {
            const seekTime = Math.floor(audio.duration / 100 * e.target.value)
            audio.currentTime = seekTime
            console.log(seekTime)
        }
        next.onclick = function() {
            playBtn.style.display = "block"
            pauseBtn.style.display = "none"
            audio.pause()
            _this.nextSong()
        }
        pre.onclick = function() {
            playBtn.style.display = "block"
            pauseBtn.style.display = "none"
            audio.pause()
            _this.preSong()
        }
        playbtnl.onclick = function() {
            playbtnl.style.display = "none"
            pasuebtnl.style.display = "block"
            playBtn.style.display = "none"
            pauseBtn.style.display = "block"
            audio.play()
            circleAnimate.play()
            cdthumbAnimate.play()
        }
        pasuebtnl.onclick = function() {
            playBtn.style.display = "block"
            pauseBtn.style.display = "none"
            playbtnl.style.display = "block"
            pasuebtnl.style.display = "none"
            audio.pause()
            circleAnimate.pause()
            cdthumbAnimate.pause()

        }
        list.onclick = function(e, indexs) {
            const index = e.target.closest('.music-item')
            if (index) {
                _this.currentIndex = Number(index.dataset.index)
                _this.loadCurrentsong()
                _this.index = htmls.index
                index.classList.add('active-item')
                _this.render()
                playBtn.style.display = "block"
                pauseBtn.style.display = "none"
                playbtnl.style.display = "block"
                pasuebtnl.style.display = "none"
                audio.pause()
                circleAnimate.pause()
                cdthumbAnimate.pause()
            }
        }
    },

    start: function() {
        this.render()
        this.defineProperties()
        this.handleEvents()
        this.loadCurrentsong()
        this.nextSong()
        this.preSong()

    },
}

app.start()