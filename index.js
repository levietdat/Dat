var $ = document.querySelector.bind(document)
var $$ = document.querySelectorAll.bind(document)


const list = $('.list-music-infor')
const name = $('.name')
const currentDay = $('.days')
const itemmussic = $('.music-item')
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
            name: '3107-3',
            singer: 'DuongG, W/n',
            path: './mp3/3107-3 - W_n_ Nau_ Duongg_ Titie.mp3',
            image: './image/3107-3.jpg'
        },
        {
            name: 'Ánh chiều tàn',
            singer: 'D Empty, Poll',
            path: './mp3/Anh Chieu Tan - D Empty_ Poll.mp3',
            image: './image/anhchieutan.jpg'
        },
        {
            name: 'Bước qua mùa cô đơn',
            singer: 'Thái Vũ',
            path: './mp3/Buoc Qua Mua Co Don - Vu.mp3',
            image: './image/buocquamuacodon.jpg'
        },
        {
            name: 'Cám ơn và xin lỗi',
            singer: 'Chillies',
            path: './mp3/Cam On Va Xin Loi Thua Me Con Di OST_ -.mp3',
            image: './image/camonvaxinloi.jpg'
        },
        {
            name: 'Họ yêu ai mất rồi',
            singer: 'Doãn Hiếu',
            path: './mp3/Ho Yeu Ai Mat Roi - Doan Hieu_ B_.mp3',
            image: './image/hoyeuaimatroi.jpg'
        },
        {
            name: 'Lạ lùng',
            singer: 'Thái Vũ',
            path: './mp3/La Lung - Vu.mp3',
            image: './image/lalung.jpg'
        },
        {
            name: 'Phút ban đầu',
            singer: 'Thái Vũ',
            path: './mp3/Phut Ban Dau - Vu.mp3',
            image: './image/phutbandau.jpg'
        }

    ],

    render: function() {
        htmls = this.songs.map(function(song, index) {
            return `
            <div class="music-item " data-index=${index}>
                        <img class="item-music-img" src="${song.image}" alt="">
                        <div>
                            <h3 class="item-name-music">${song.name}</h3>
                            <p class="item-name-singer">${song.singer}</p>
                        </div>
                        <i  style="display: none" class="item-song-icon fa-solid fa-play"></i>
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
        name.textContent = this.currensong.singer
    },
    loadNextSong: function() {

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
            circle.classList.add('shadow')
            playBtn.style.display = "none"
            pauseBtn.style.display = "block"
            playbtnl.style.display = "none"
            pasuebtnl.style.display = "block"
            audio.play()
            circleAnimate.play()
            cdthumbAnimate.play()

        }

        pauseBtn.onclick = function() {
            circle.classList.remove('shadow')
            playbtnl.style.display = "block"
            pasuebtnl.style.display = "none"
            playBtn.style.display = "block"
            pauseBtn.style.display = "none"
            audio.pause()
            circleAnimate.pause()

            cdthumbAnimate.pause()

        }

        audio.ontimeupdate = function() {
            if (audio.duration) {
                progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent
                if (progressPercent >= 100) {
                    _this.currentIndex++
                        setTimeout(_this.loadCurrentsong(), 10000)
                    audio.play()
                }
            }
        }

        progress.onchange = function(e) {
            const seekTime = Math.floor(audio.duration / 100 * e.target.value)
            audio.currentTime = seekTime
        }
        next.onclick = function() {
            playBtn.style.display = "block"
            pauseBtn.style.display = "none"
            audio.pause()
            _this.nextSong()
            progress.value = 0
            circleAnimate.pause();
            circle.classList.remove('shadow')
        }
        pre.onclick = function() {
            playBtn.style.display = "block"
            pauseBtn.style.display = "none"
            audio.pause()
            _this.preSong()
            progress.value = 0
            circleAnimate.pause();
            circle.classList.remove('shadow')

        }
        playbtnl.onclick = function() {
            circle.classList.add('shadow')
            playbtnl.style.display = "none"
            pasuebtnl.style.display = "block"
            playBtn.style.display = "none"
            pauseBtn.style.display = "block"
            audio.play()
            circleAnimate.play()
            cdthumbAnimate.play()
        }
        pasuebtnl.onclick = function() {
            circle.classList.remove('shadow')
            playBtn.style.display = "block"
            pauseBtn.style.display = "none"
            playbtnl.style.display = "block"
            pasuebtnl.style.display = "none"
            playbtnl.style.display = "block"
            pasuebtnl.style.display = "none"
            audio.pause()
            circleAnimate.pause()
            cdthumbAnimate.pause()

        }
        list.onclick = function(e) {
            const index = e.target.closest('.music-item')
            index.style.border = "4px #cb5d5c solid"
            circle.classList.remove('shadow')
            if (index) {
                _this.currentIndex = Number(index.dataset.index)
                _this.loadCurrentsong()
                _this.index = htmls.index
                _this.render()
                playBtn.style.display = "block"
                pauseBtn.style.display = "none"
                playbtnl.style.display = "block"
                pasuebtnl.style.display = "none"
                audio.pause()
                circleAnimate.pause()
                cdthumbAnimate.pause()
                console.log(index)
                progress.value = 0
                circleAnimate.pause();
            }
        }

    },
    loadCurrentday: function() {
        const day = new Date()
        this.currentDay = day.getDay()
        if (this.currentDay === 0) {
            this.currentDay = 'Sunday'
            currentDay.textContent = this.currentDay
        } else if (this.currentDay === 1) {
            this.currentDay = 'Monday'
            currentDay.textContent = this.currentDay
        } else if (this.currentDay === 2) {
            this.currentDay = 'Tuesday'
            currentDay.textContent = this.currentDay
        } else if (this.currentDay === 3) {
            this.currentDay = 'Wednesday'
            currentDay.textContent = this.currentDay
        } else if (this.currentDay === 4) {
            this.currentDay = 'Thursday'
            currentDay.textContent = this.currentDay
        } else if (this.currentDay === 5) {
            this.currentDay = 'Friday'
            currentDay.textContent = this.currentDay
        } else if (this.currentDay === 6) {
            this.currentDay = 'Saturday'
            currentDay.textContent = this.currentDay
        }
    },

    start: function() {
        this.loadCurrentday()
        this.render()
        this.defineProperties()
        this.handleEvents()
        this.loadCurrentsong()
        this.loadNextSong()
        this.nextSong()
        this.preSong()

    },
}

app.start()