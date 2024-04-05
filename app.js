/**
 * 1. Render songs
 * 2. Sroll top
 * 3. Play / pause / seek
 * 4. CD rotate
 * 5. Next / prev
 * 6. Random
 * 7. Next / Repeat when ended
 * 8. Active song
 * 9. Scroll active song intro view
 * 10. Play song when click
 */
/** Other problems
 * 1. Fix audio range -> OK
 * 2. Change both the repeat and the random are clicked -> OK
 * 3. Add light/dark mode
 * 4. Add volume -> OK
 * 5. Add search song
 * 6. Add menu
 * 7. Add options song
 */

// import { check } from "./jquery.js"

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const textColorLight = getComputedStyle(document.documentElement).getPropertyValue('--text-color-light')
const textGrayColor = getComputedStyle(document.documentElement).getPropertyValue('--text-gray-color')

const PLAYER_STORAGE_KEY = 'TTD_PLAYER'

const appPlayer = $('.app')
const headerBack = $('.header__back')


const playList =  $('.playlist')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const cdOutter = $('.player-control__img-wrap')
const audio = $('#audio')
const cd = $('.cd')
const playBtn = $('.btn-toggle-play')
const playBtnOut = $('.player-control__play')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const nextBtnOut = $('.player-control__next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const volumeBtn = $('.btn-volume')
const volumeWrap = $('.process-volume-wrap')
const progressVolume = $('#progress-volume')
const volumeHigh = $('.volume-high')
const volumeLow = $('.volume-low')
const volumeXmark = $('.volume-xmark')
const repeatBtn_1 = $('.btn-repeat-1')
const sunMoonBtn = $('.btn-sun-moon')
const sunBtn = $('.btn-sun')
const moonBtn = $('.btn-moon')
const totalMinutes = $('#total-minutes')
const totalSeconds = $('#total-seconds')
const currentMinutes = $('#current-minutes')
const currentSeconds = $('#current-seconds')

const dashboard = $('.dashboard')
const nameSong = $('.header__title h2')
const togglePlay = $('.btn-toggle-bgr')

// Search section
const headerSearch = $('.header__search')
const headerSearchIcon = $('.header__search-icon')
const searchWrap = $('.search-wrap')
const searchWrapContainer = $('.search-wrap__container')
const searchBarInput = $('.search-bar__input')
const searchHistory = $('.search-history')
const searchResult = $('.search-result')
// Search Nav 
const navSearchInput = $('.music-nav__search-input')
const navSearchHistory = $('.music-nav__search-history')
const navSearchResult = $('.music-nav__search-result')

const optionInPlaylist = $('.home-item__option-update')

const favoriteHeart = $('.player-control__favorite')
const playerControlLabel = $('.player-control__label')

const controlImg = $('.player-control__img')
const controlTitle = $('.player-control__title h4')
const controlSinger = $('.player-control__title p')
const plHomeList = $('.pl-home__list')
const muPlayerDes = $('.music-player__descovery')
const muPlayerPl = $('.music-player__playlist')
const muPlayerFav = $('.music-player__favorite')
const muPlayerPer = $('.music-player__personal')

const descoveryTab = $('.descovery-tab')
const playlistHome = $('.playlist-home')
const personalTab = $('.personal-tab')
const optionTab = $('.option-tab')
const optionTabBack = $('.option-tab__back')
const optionTabAction = $('.option-tab__action')
const optionTabPlus = $('.option-tab__action-plus')
const opTabBackIcon = $('.option-tab__back-icon')
const opTabTitle = $('.option-tab__title')
const opTabPara = $('.option-tab__para')
const headerPlaylist = $('.header__playlist')

const descoveryNews = $('.descovery__news')
const slideShowContainer = $('.slideshow-container')
const newsSubSlide = $('.des-news__sub-slide')
const newsBtnLeft = $('.des-news__btn-left')
const newsBtnRight = $('.des-news__btn-right')

const perLibSongBtn = $('.per-library-song__btn')

const credatePlWrap = $('.credate-pl-wrap')
const updatePlName = $('.update-playlist__title')
const addSongTo = $('.credate-pl__add-song-title')
const createNewPl = $('.credate-pl__new-pl-title')
const inputFormPl = $('.input-form__content')
const inputFormLabel = $('.input-form__label')
const inputFormInfoPl = $('.input-form__info-pl')
const playlistToAdd = $('.credate-pl__add-song-list')
const showFormCreatePl = $('.credate-pl__create-title ')
const warningTitle = $('.warning-status__title')
const countCharacters = $('.count-characters')
const countCharactersValue = $('.count-characters-value')
const credatePlBtn = $('.credate-playlist__btn')

const app = {
    currentMode: '',
    runOneTime: false,
    isPlayActive: false,
    currentIndex: 0,
    currentLibIndex: 0,
    currentPlaylist: '',
    currentPlaylistActiving: '',
    isFavoriteActiving: false,
    isPlaylistActiving: false,
    isLibraryActiving: true,
    isInLibSong: false,
    isShowLibSong: false,
    isSongPlaying: false,
    updatePlaylists: false,
    favoriteTag: 'favorite',
    randomCount: 0,
    isRandom: false,
    isRepeat: false,
    isVolume: false,
    currentVolume: 100,
    currentProgressVol: 100,
    isProcessMouseDown: false,
    isSunMoonMode: true,
    canClickMode: true,
    isDescovery: true,
    isPlHome: false,
    isPlInner: false,
    isFavorite: false,
    isPersonal: false,
    slideIndex: 0,
    isShowRunning: true,
    slideshowInterval: 0,
    isOptionPlaylist: false,
    isOptionSong: false,
    cachePlName: '',
    isInputEmpty: true,
    optionSelectedPlValue: '',
    isRenamePl: false,
    isCreatePl: false,
    isAddSongToPl: false,
    currentSongIdLibAction: '',
    currentSongIndexAction: 0,
    flagAction1Time: true,
    isInFocusPlayerTab: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    playedIndexSong: [],
    songLibrary: {
        0: {
            title: "Shape of You",
            singer: "Ed Sheeran",
            image: "./asset/img/songImg/shape_of_you.jfif",
            path: "./asset/path_music/shape_of_you.mp3",
            favorite: false
        },
        1: {
            title: "Blinding Lights",
            singer: "The Weeknd",
            image: "./asset/img/songImg/blinding_lights.jfif",
            path: "./asset/path_music/blinding_lights.mp3",
            favorite: true
        },
        2: {
            title: "Someone Like You",
            singer: "Adele",
            image: "./asset/img/songImg/someone_like_you.jfif",
            path: "./asset/path_music/someone_like_you.mp3",
            favorite: true
        },
        3: {
            title: "Uptown Funk",
            singer: "Mark Ronson ft. Bruno Mars",
            image: "./asset/img/songImg/uptown_funk.png",
            path: "./asset/path_music/uptown_funk.mp3",
            favorite: false
        },
        4: {
            title: "Old Town Road",
            singer: "Lil Nas X ft. Billy Ray Cyrus",
            image: "./asset/img/songImg/old_town_road.jfif",
            path: "./asset/path_music/old_town_road.mp3",
            favorite: false
        },
        5: {
            title: "Rolling in the Deep",
            singer: "Adele",
            image: "./asset/img/songImg/rolling_in_the_deep.jfif",
            path: "./asset/path_music/rolling_in_the_deep.mp3",
            favorite: true
        },
        6: {
            title: "Sorry",
            singer: "Justin Bieber",
            image: "./asset/img/songImg/sorry.jfif",
            path: "./asset/path_music/sorry.mp3",
            favorite: false
        },
        7: {
            title: "Can't Stop the Feeling!",
            singer: "Justin Timberlake",
            image: "./asset/img/songImg/cant_stop_the_feeling.jfif",
            path: "./asset/path_music/cant_stop_the_feeling.mp3",
            favorite: false
        },
        8: {
            title: "Roar",
            singer: "Katy Perry",
            image: "./asset/img/songImg/roar.jfif",
            path: "./asset/path_music/roar.mp3",
            favorite: true
        },
        9: {
          title: "Love Yourself",
          singer: "Justin Bieber",
          image: "./asset/img/songImg/love_yourself.jfif",
          path: "./asset/path_music/love_yourself.mp3",
          favorite: true
        },
        10: {
            title: "Chúng ta của tương lai",
            singer: "Sơn Tùng M-TP",
            image: "./asset/img/songImg/chung_ta_cua_tuong_lai.jfif",
            path: "./asset/path_music/chung_ta_cua_tuong_lai.mp3",
            favorite: false
          },
        11: {
            title: "Chúng ta của hiện tại",
            singer: "Sơn Tùng M-TP",
            image: "./asset/img/songImg/chung_ta_cua_hien_tai.jfif",
            path: "./asset/path_music/chung_ta_cua_hien_tai.mp3",
            favorite: true
        },
        12: {
            title: "Making My Way",
            singer: "Sơn Tùng M-TP",
            image: "./asset/img/songImg/making_my_way.jfif",
            path: "./asset/path_music/making_my_way.mp3",
            favorite: false
        },
        13: {
            title: "Lạc trôi",
            singer: "Sơn Tùng M-TP",
            image: "./asset/img/songImg/lac_troi.jfif",
            path: "./asset/path_music/lac_troi.mp3",
            favorite: false
        },
        14: {
            title: "Sky decade",
            singer: "Sơn Tùng M-TP",
            image: "./asset/img/songImg/sky_decade.jfif",
            path: "./asset/path_music/sky_decade.mp3",
            favorite: true
        },
        15: {
            title: "Muộn rồi mà sao còn",
            singer: "Sơn Tùng M-TP",
            image: "./asset/img/songImg/muon_roi_ma_sao_con.jfif",
            path: "./asset/path_music/muon_roi_ma_sao_con.mp3",
            favorite: false
        },
        16: {
            title: "Nơi này có anh",
            singer: "Sơn Tùng M-TP",
            image: "./asset/img/songImg/noi_nay_co_anh.jfif",
            path: "./asset/path_music/noi_nay_co_anh.mp3",
            favorite: false
        },
        17: {
            title: "Có chắc yêu là đây!",
            singer: "Sơn Tùng M-TP",
            image: "./asset/img/songImg/co_chac_yeu_la_day.jfif",
            path: "./asset/path_music/co_chac_yeu_la_day.mp3",
            favorite: false
        },
        18: {
            title: "Hãy trao cho anh",
            singer: "Sơn Tùng M-TP",
            image: "./asset/img/songImg/hay_trao_cho_anh.jfif",
            path: "./asset/path_music/hay_trao_cho_anh.mp3",
            favorite: false
        },
        19: {
            title: "Chạy ngay điiii",
            singer: "Sơn Tùng M-TP",
            image: "./asset/img/songImg/chay_ngay_di.jfif",
            path: "./asset/path_music/chay_ngay_di.mp3",
            favorite: true
        },
    },
    playlists1: {
        "Doing my best": [0, 1, 4, 9, 6],
        "On rules": [4, 9, 2, 7, 8],
        "True color": [2, 5, 7, 9],
        "Sơn Tùng M-TP": [18, 12, 16, 11, 10, 17, 13, 15, 19, 14],
    },
    playlists2: {

    },
    favoriteList: [2, 5, 9, 1, 11, 14, 19, 8],
    newsShow: {
        1: './asset/img/imagefornews/img1.jpg',
        2: './asset/img/imagefornews/img2.jpg',
        3: './asset/img/imagefornews/img3.jpg',
        4: './asset/img/imagefornews/img4.jpg',
    },
    setConfig: function(key, value) {
        this.config[key] = value
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
    },
    renderLibrarySong: function() {
        const songLibEntries = Object.entries(this.songLibrary)
        const htmls = songLibEntries.map(([key, value], index) => {
            return `
            <div class="song ${this.currentMode} ${index === this.currentLibIndex ? 'active' : ''}" data-index="${index}" data-info="${key}">
                <div class="thumb"
                    style="background-image: url(${value.image})">
                </div>
                <div class="body">
                    <h3 class="title">${value.title}</h3>
                    <p class="author">${value.singer}</p>
                </div>
                <div class="song-favorite ${value.favorite === true ? 'favorite' : ''}" title="Thêm vào yêu thích">
                    <i class="favorite__icon-regular active fa-regular fa-heart"></i>
                    <i class="favorite__icon-solid fa-solid fa-heart"></i>
                </div>
                <div class="option" title="Thêm vào playlist">
                    <i class="option__music-icon fa-solid fa-music">
                        <i class="option__music-plus-icon fa-solid fa-plus"></i>
                    </i>
                </div>
            </div>
            `
        })
        playList.innerHTML = htmls.join('');
    },
    playlistsToggle: function(playlistNeedChange, newPlaylistName) {
        if(this.updatePlaylists) {
            for(var key in this.playlists1) {
                if(this.playlists1.hasOwnProperty(key)) {
                    if(key === playlistNeedChange) {
                        this.playlists2[newPlaylistName] = this.playlists1[key]
                    } else {
                        this.playlists2[key] = this.playlists1[key]
                    }
                    delete this.playlists1[key]
                }
            }
        } else {
            for(var key in this.playlists2) {
                if(this.playlists2.hasOwnProperty(key)) {
                    if(key === playlistNeedChange) {
                        this.playlists1[newPlaylistName] = this.playlists2[key]
                    } else {
                        this.playlists1[key] = this.playlists2[key]
                    }
                    delete this.playlists2[key]
                }
            } 
        }
    },
    getPlaylistNames: function() {
        if(!this.updatePlaylists) {
            return Object.keys(this.playlists1);
        } else {
            return Object.keys(this.playlists2);
        }
    },
    playlistsRender: function() {
        const playlists = this.getPlaylistNames()
        var playlistReplace;
        if(!this.updatePlaylists) {
            playlistReplace = this.playlists1
        } else {
            playlistReplace = this.playlists2
        }
        const htmls = playlists.map(playlistName => {
            const firstSongInPlaylist = playlistReplace[playlistName][0] 
            return `
                <li class="pl-home__item ${this.currentMode}" data-index="${playlistName}">
                    <div class="pl-home__item-img"
                        style="background-image: url(${playlistReplace[playlistName].length != 0 ? this.songLibrary[firstSongInPlaylist].image : './asset/img/forReplace/replacePic.png'})">
                    </div>
                    <div class="pl-home__item-label">
                        <span class="pl-home__item-title">${playlistName}</span>
                        <span class="pl-home__item-count">${playlistReplace[playlistName].length} bài hát</span>
                    </div>
                    <div class="pl-home__item-option">
                        <i class="fa-solid fa-ellipsis"></i>
                        <div class="home-item__option-wrap" data-index="${playlistName}">
                            <span class="home-item__option-delete">Xóa playlist</span>
                            <span class="home-item__option-update">Sửa tên playlist</span>
                        </div>
                    </div>
                </li>
            `
        })
        plHomeList.innerHTML = htmls.join('')
    },
    renderSongsInPlaylist: function(playlistName) {
        var playlistReplace;
        if(!this.updatePlaylists) {
            playlistReplace = this.playlists1
        } else {
            playlistReplace = this.playlists2
        }
        const playlist = playlistReplace[playlistName]
        if(!playlist) {
            console.log("Playlist not found");
            return [];
        }
        const htmls = playlist.map((songId, index) => {
            return `
                <div class="song ${this.currentMode} ${this.currentPlaylist === this.currentPlaylistActiving && this.isPlaylistActiving && index === this.currentIndex ? 'active' : ''}" data-index="${index}" data-info="${songId}">
                    <div class="thumb"
                        style="background-image: url(${this.songLibrary[songId].image})">
                    </div>
                    <div class="body">
                        <h3 class="title">${this.songLibrary[songId].title}</h3>
                        <p class="author">${this.songLibrary[songId].singer}</p>
                    </div>
                    <div class="song-favorite ${this.songLibrary[songId].favorite === true ? 'favorite' : ''}" title="Thêm vào yêu thích">
                        <i class="favorite__icon-regular active fa-regular fa-heart"></i>
                        <i class="favorite__icon-solid fa-solid fa-heart"></i>
                    </div>
                    <div class="option">
                        <i class="home-item__icon-option fa-solid fa-ellipsis"></i>
                        <div class="song__option-wrap" data-index="${songId}">
                            <span class="song__option-delete">Xóa khỏi playlist</span>
                            <span class="song__option-update">Thêm vào playlist</span>
                        </div>
                    </div>
                </div>
            `
        })
        playList.innerHTML = htmls.join('');
    }, 
    renderSongsInFavorite: function() {
        const htmls = this.favoriteList.map((songId, index) => {
            return `
                <div class="song ${this.currentMode} ${this.isFavoriteActiving && index === this.currentIndex ? 'active' : ''}" data-index="${index}" data-info="${songId}">
                    <div class="thumb"
                        style="background-image: url(${this.songLibrary[songId].image})">
                    </div>
                    <div class="body">
                        <h3 class="title">${this.songLibrary[songId].title}</h3>
                        <p class="author">${this.songLibrary[songId].singer}</p>
                    </div>
                    <div class="option">
                        <i class="home-item__icon-option fa-solid fa-ellipsis"></i>
                        <div class="song__option-wrap" data-index="${songId}">
                            <span class="song__option-update">Thêm vào playlist</span>
                            <span class="song__option-delete">Xóa khỏi yêu thích</span>
                        </div>
                    </div>
                </div>
            `
        })
        playList.innerHTML = htmls.join('');
    },
    renderSlideShow: function() {
        const newsShow = Object.entries(this.newsShow)
        const htmls = newsShow.map(([key, value]) => {
            return `
                <div class="slide fade">
                    <img src="${value}" style="width:100%">
                </div>
            `
        })
        const htmlSub = newsShow.map( () => {
            return `
                <i class="des-news__sub-icon fa-brands fa-first-order-alt"></i>
            `
        })
        newsSubSlide.innerHTML = htmlSub.join('')
        slideShowContainer.innerHTML = htmls.join('')
    },
    renderListPlToSongAdd: function() {
        const listPlaylist = this.getPlaylistNames()
        const htmls = listPlaylist.map((playlistName, index) => {
            return `
                <div class="credate-pl__add-song-item" role="checkbox" aria-checked="false" data-info="${playlistName}">
                    <span class="credate-pl__add-song-check">
                        <i class="credate-pl__add-song-icon-check fa-solid fa-check"></i>
                    </span>
                    <span class="credate-pl__add-song-pl">${playlistName}</span>
                </div>
            `
        })
        playlistToAdd.innerHTML = htmls.join('')
    },
    defineProperties: function() {
        Object.defineProperty(this, 'currentLibSong', {
            get: function() {
                return this.songLibrary[this.currentLibIndex]
            }
        })
    },
    loadCurrentLibSong: function() {
        heading.innerText = this.currentLibSong.title
        cdThumb.style.backgroundImage =`url(${this.currentLibSong.image})`
        controlTitle.innerText = this.currentLibSong.title
        controlSinger.innerText = this.currentLibSong.singer
        controlImg.style.backgroundImage = `url(${this.currentLibSong.image})`
        if(this.currentLibSong[this.favoriteTag]) {
            favoriteHeart.classList.add('favorite')
        } else {
            favoriteHeart.classList.remove('favorite')
        }
        audio.src = this.currentLibSong.path
    },
    handleEvents: function() {
        const _this = this

        // Xử lý CD quay dừng
        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 25000,
            iterations: Infinity
        })
        cdThumbAnimate.pause()
        // xử lý CD outter-home quay dừng
        const cdOutAnimate = cdOutter.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 15000,
            iterations: Infinity
        })
        cdOutAnimate.pause()

        // Xử lý khi click play
        playBtn.onclick = function() {
            if(_this.isSongPlaying) {
                audio.pause()
            } else {
                audio.play()
            }
        }
        playBtnOut.onclick = function() {
            if(_this.isSongPlaying) {
                audio.pause()
            } else {
                audio.play()
            }
        }
        // khi bài hát được play
        audio.onplay = function() {
            _this.isSongPlaying = true

            appPlayer.classList.add('playing')
            cdThumbAnimate.play()
            cdOutAnimate.play()
        }
        // khi bài hát được pause
        audio.onpause = function() {
            _this.isSongPlaying = false

            appPlayer.classList.remove('playing')
            cdThumbAnimate.pause()
            cdOutAnimate.pause()
        }
        // Xử lý update progress input và audio currentTime và total Time
        audio.ontimeupdate = function() {
            const totalMinutes = parseInt(audio.duration / 60)
            const totalSeconds = parseInt(audio.duration -  totalMinutes * 60)
            const currMinutes = parseInt(audio.currentTime / 60)
            const currSeconds = parseInt(audio.currentTime -  currMinutes * 60)
            if(audio.duration && !_this.isProcessMouseDown) {
                const progressPercent = Math.round(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent
                _this.updateTotalDuraSong(totalMinutes, totalSeconds)
                _this.updateCurrDuraSong(currMinutes, currSeconds)
            }
        }
        // Xử lý next song khi audio ended
        audio.onended = function() {
            if(_this.isRepeat) {
                _this.nextSong()
                audio.play()
            } else if(_this.randomCount === 1 && _this.isRandom) {
                _this.playRandomSong()
                audio.play()
            } else if(_this.randomCount === 2 && _this.isRandom) {
                audio.play()
            } else {
                audio.pause()
            }
        }
        // Xử lý khi tua, không giật back input
        progress.oninput = function(e) {
            _this.isProcessMouseDown = true
            const seekTime = e.target.value * audio.duration/100
            const currMinutes = parseInt(seekTime / 60)
            const currSeconds = parseInt(seekTime -  currMinutes * 60)
            _this.updateCurrDuraSong(currMinutes, currSeconds)
        }

        // Xử lý khi tua bài hát
        progress.onchange = function(e) {
            _this.isProcessMouseDown = false
            const seekTime = e.target.value * audio.duration/100
            audio.currentTime = seekTime
        }
        
        // Xử lý nhấn next bài hát tiếp theo bên trong playlist
        nextBtn.onclick = function() {
            if(_this.randomCount === 1 && _this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.nextSong()
            }
            if(_this.isInFocusPlayerTab) _this.scrollToActiveSong()
            audio.play()
        }
        // Xư lý next btn ở ngoài home
        nextBtnOut.onclick = function() {
            _this.nextSong()
            audio.play()
        }

        // Khi nhấn Prev
        prevBtn.onclick = function() {
            if(_this.randomCount === 1 && _this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.prevSong()
            }
            if(_this.isInFocusPlayerTab) _this.scrollToActiveSong()
            audio.play()
        }
        // Xử lý bật tắt Random
        randomBtn.onclick = function(e) {
            _this.isRandom = true
            _this.randomCount++
            randomBtn.classList.add('active')

            if(_this.isRepeat) {
                _this.isRepeat = false
                repeatBtn.classList.remove('active')
                _this.setConfig('isRepeat', _this.isRepeat)
            }
            if(_this.randomCount === 2) {
                repeatBtn_1.classList.add('active')
            } else if(_this.randomCount === 3) {
                _this.randomCount = 0;
                _this.isRandom = false;
                randomBtn.classList.remove('active')
                repeatBtn_1.classList.remove('active')
            }
            _this.setConfig('randomCount', _this.randomCount)
            _this.setConfig('isRandom', _this.isRandom)
        }
        // Xử lý repeat Song
        repeatBtn.onclick = function() {
            _this.isRepeat = !_this.isRepeat
            repeatBtn.classList.toggle('active', _this.isRepeat)
            if(_this.isRandom === true) {
                _this.isRandom = false
                randomBtn.classList.remove('active')
                _this.randomCount === 1 ? _this.randomCount = 0 : _this.randomCount = 1
                _this.setConfig('randomCount', _this.randomCount)
                _this.setConfig('isRandom', _this.isRandom)
            }
            _this.setConfig('isRepeat', _this.isRepeat)
        }
        // Lắng nghe hành vi click vào play list
        playList.onclick = function(e) {
            // Nhạc phát ở playlist-home
            const songNodeNoActive = e.target.closest('.song:not(.active)')
            const songNodeAll = e.target.closest('.song')
            if(songNodeNoActive && !e.target.closest('.option') && !e.target.closest('.song-favorite')) {
                _this.currentLibIndex = parseInt(songNodeNoActive.dataset.info)
                _this.currentIndex = parseInt(songNodeNoActive.dataset.index)
                if(_this.isOptionSong) {
                    const itemsOptionWrap = $$('.song__option-wrap')
                    itemsOptionWrap.forEach(item => {
                        item.classList.remove('active')
                    })
                    _this.isOptionSong = false
                }
                if(_this.isPlHome && _this.isPlInner && !_this.isInLibSong) {
                    _this.isPlaylistActiving = true
                    _this.isFavoriteActiving = false
                    _this.isLibraryActiving = false

                    _this.playedIndexSong = []
                    _this.currentPlaylistActiving = _this.currentPlaylist
                    _this.renderSongsInPlaylist(_this.currentPlaylist)
                } else if(_this.isFavorite && !_this.isInLibSong) {
                    _this.isFavoriteActiving = true
                    _this.isPlaylistActiving = false
                    _this.isLibraryActiving = false

                    _this.playedIndexSong = []
                    _this.renderSongsInFavorite()
                } else if(_this.isInLibSong) {
                    _this.isLibraryActiving = true
                    _this.isFavoriteActiving = false
                    _this.isPlaylistActiving = false

                    _this.playedIndexSong = []
                    _this.renderLibrarySong()
                }
                _this.loadCurrentLibSong()
                audio.play()
            } else if(e.target.closest('.option') && !_this.isInLibSong) {
                _this.isOptionSong = true
                const songUpdate = e.target.closest('.song__option-update')
                const songDelete = e.target.closest('.song__option-delete')
                const itemsOptionWrap = $$('.song__option-wrap')
                itemsOptionWrap.forEach(item => {
                    if(item.dataset.index === songNodeAll.dataset.info) {
                        item.classList.add('active')
                        if(songUpdate) {    //Thêm Song này vào 1 hoặc nhiều playlist // code liên quan search: THIS IS ADD SONG
                            _this.isAddSongToPl = true
                            _this.currentSongIdLibAction = item.dataset.index  
                            _this.currentSongIndexAction = songNodeAll.dataset.index
                            item.classList.remove('active')
                            credatePlWrap.classList.add('active')
                            addSongTo.classList.add('active')
                            playlistToAdd.classList.add('active')
                            showFormCreatePl.classList.add('active')
                            _this.renderListPlToSongAdd()
                            // show song này có trong những playlists nào
                            const inputCheckboxItems = $$('.credate-pl__add-song-item')
                            inputCheckboxItems.forEach(inputCheckboxItem => {
                                if(!_this.updatePlaylists) {
                                    if(_this.playlists1[inputCheckboxItem.dataset.info].includes(parseInt(_this.currentSongIdLibAction))) {
                                        inputCheckboxItem.setAttribute('aria-checked', 'true')
                                        inputCheckboxItem.classList.add('checked')
                                    } 
                                } else {
                                    if(_this.playlists2[inputCheckboxItem.dataset.info].includes(parseInt(_this.currentSongIdLibAction))) {
                                        inputCheckboxItem.setAttribute('aria-checked', 'true')
                                        inputCheckboxItem.classList.add('checked')
                                    }
                                }
                            })
                        } else if(songDelete) {        // SONG OUT PL/FAV
                            item.classList.remove('active')
                            if(_this.isInFocusPlayerTab) {  //Delete song out playlist in focus player
                                if(_this.isPlaylistActiving) {
                                    if(!_this.updatePlaylists) {
                                        const indexSongIdInPl1 = _this.playlists1[_this.currentPlaylistActiving].indexOf(parseInt(item.dataset.index))
                                        if(indexSongIdInPl1 !== -1) {
                                            _this.playlists1[_this.currentPlaylistActiving].splice(indexSongIdInPl1, 1)
                                        }
                                    } else {
                                        const indexSongIdInPl2 = _this.playlists1[_this.currentPlaylistActiving].indexOf(parseInt(item.dataset.index))
                                        if(indexSongIdInPl2 !== -1) {
                                            _this.playlists2[_this.currentPlaylistActiving].splice(indexSongIdInPl2, 1)
                                        }
                                    }
                                    if(parseInt(item.dataset.index) === parseInt(_this.currentLibIndex)) {
                                        _this.isPlaylistActiving = false
                                        _this.isLibraryActiving = true
                                    } else if(parseInt(songNodeAll.dataset.index) < parseInt(_this.currentIndex)) {
                                        _this.currentIndex -= 1
                                    }
                                    _this.playlistsRender()
                                    _this.renderSongsInPlaylist(_this.currentPlaylistActiving)
                                } else if(_this.isFavoriteActiving) {   //Delete song out favorite in focus player
                                    const indexSongIdInFav = _this.favoriteList.indexOf(parseInt(item.dataset.index))
                                    if(indexSongIdInFav !== -1) {
                                        _this.favoriteList.splice(indexSongIdInFav, 1)
                                    }
                                    if(parseInt(item.dataset.index) === parseInt(_this.currentLibIndex)) {
                                        _this.isFavoriteActiving = false
                                        _this.isLibraryActiving = true
                                        favoriteHeart.classList.remove('favorite')
                                    } else if(parseInt(songNodeAll.dataset.index) < parseInt(_this.currentIndex)) {
                                        _this.currentIndex -= 1
                                    }
                                    _this.songLibrary[parseInt(songNodeAll.dataset.info)][_this.favoriteTag] = false
                                    _this.renderSongsInFavorite()
                                }
                            } else {
                                if(_this.isPlHome && _this.isPlInner) {     //Delete song out playlist
                                    if(!_this.updatePlaylists) {
                                        const indexSongIdInPl1 = _this.playlists1[_this.currentPlaylist].indexOf(parseInt(item.dataset.index))
                                        if(indexSongIdInPl1 !== -1) {
                                            _this.playlists1[_this.currentPlaylist].splice(indexSongIdInPl1, 1)
                                        }
                                    } else {
                                        const indexSongIdInPl2 = _this.playlists1[_this.currentPlaylist].indexOf(parseInt(item.dataset.index))
                                        if(indexSongIdInPl2 !== -1) {
                                            _this.playlists2[_this.currentPlaylist].splice(indexSongIdInPl2, 1)
                                        }
                                    }
                                    if(_this.isPlaylistActiving && _this.currentPlaylist === _this.currentPlaylistActiving && parseInt(item.dataset.index) === parseInt(_this.currentLibIndex)) {
                                        _this.isPlaylistActiving = false
                                        _this.isLibraryActiving = true
                                    } else if(_this.currentPlaylist === _this.currentPlaylistActiving && parseInt(songNodeAll.dataset.index) < parseInt(_this.currentIndex)) {
                                        _this.currentIndex -= 1
                                    }
                                    _this.playlistsRender()
                                    _this.renderSongsInPlaylist(_this.currentPlaylist)
                                } else if(_this.isFavorite) {       //Delete song out favorite
                                    const indexSongIdInFav = _this.favoriteList.indexOf(parseInt(item.dataset.index))
                                    if(indexSongIdInFav !== -1) {
                                        _this.favoriteList.splice(indexSongIdInFav, 1)
                                    }
                                    if(parseInt(item.dataset.index) === parseInt(_this.currentLibIndex)) {
                                        _this.isFavoriteActiving = false
                                        _this.isLibraryActiving = true
                                        favoriteHeart.classList.remove('favorite')
                                    } else if(parseInt(songNodeAll.dataset.index) < parseInt(_this.currentIndex)) {
                                        _this.currentIndex -= 1
                                    }
                                    _this.songLibrary[parseInt(songNodeAll.dataset.info)][_this.favoriteTag] = false
                                    _this.renderSongsInFavorite()
                                }
                            }
                        }
                    } else {
                        item.classList.remove('active')
                    }
                })
            } else if(e.target.closest('.song-favorite')) {
                if(_this.isInFocusPlayerTab) {
                    if(_this.songLibrary[songNodeAll.dataset.info][_this.favoriteTag]) {
                        _this.songLibrary[songNodeAll.dataset.info][_this.favoriteTag] = false
                        e.target.closest('.song-favorite').classList.remove('favorite')
                        const indexSongIdInPl = _this.favoriteList.indexOf(parseInt(songNodeAll.dataset.info))
                        if(indexSongIdInPl !== -1) {
                            _this.favoriteList.splice(indexSongIdInPl, 1)
                        }
                        if(parseInt(songNodeAll.dataset.info) === parseInt(_this.currentLibIndex)) {
                            favoriteHeart.classList.remove('favorite')
                        }
                    } else {
                        _this.songLibrary[songNodeAll.dataset.info][_this.favoriteTag] = true
                        if(parseInt(songNodeAll.dataset.info) === _this.currentLibIndex) favoriteHeart.classList.add('favorite')
                        e.target.closest('.song-favorite').classList.add('favorite')
                        _this.favoriteList.push(parseInt(songNodeAll.dataset.info))
                    }
                } else {
                    if(_this.isPlInner || _this.isInLibSong) {
                        if(_this.songLibrary[songNodeAll.dataset.info][_this.favoriteTag]) {
                            console.log('in remove')
                            _this.songLibrary[songNodeAll.dataset.info][_this.favoriteTag] = false
                            e.target.closest('.song-favorite').classList.remove('favorite')
                            const indexSongIdInPl = _this.favoriteList.indexOf(parseInt(songNodeAll.dataset.info))
                            if(indexSongIdInPl !== -1) {
                                _this.favoriteList.splice(indexSongIdInPl, 1)
                            }
                            if(parseInt(songNodeAll.dataset.info) === parseInt(_this.currentLibIndex)) {
                                favoriteHeart.classList.remove('favorite')
                                if(_this.isFavoriteActiving) {
                                    _this.isFavoriteActiving = false
                                    _this.isLibraryActiving = true
                                }
                            } else if(parseInt(songNodeAll.dataset.index) < parseInt(_this.currentIndex)) {
                                _this.currentIndex -= 1
                            }
                        } else {
                            console.log('in add')
                            _this.songLibrary[songNodeAll.dataset.info][_this.favoriteTag] = true
                            if(parseInt(songNodeAll.dataset.info) === _this.currentLibIndex) favoriteHeart.classList.add('favorite')
                            e.target.closest('.song-favorite').classList.add('favorite')
                            _this.favoriteList.push(parseInt(songNodeAll.dataset.info))
                        }
                    }
                }
                
            }else if(e.target.closest('.option') && _this.isInLibSong) {    //Add song to PL at Lib
                _this.isAddSongToPl = true
                _this.currentSongIdLibAction = songNodeAll.dataset.index
                _this.currentSongIndexAction = songNodeAll.dataset.index
                credatePlWrap.classList.add('active')
                addSongTo.classList.add('active')
                playlistToAdd.classList.add('active')
                showFormCreatePl.classList.add('active')
                _this.renderListPlToSongAdd()
                // show song này có trong những playlists nào
                const inputCheckboxItems = $$('.credate-pl__add-song-item')
                inputCheckboxItems.forEach(inputCheckboxItem => {
                    if(!_this.updatePlaylists) {
                        if(_this.playlists1[inputCheckboxItem.dataset.info].includes(parseInt(_this.currentSongIdLibAction))) {
                            inputCheckboxItem.setAttribute('aria-checked', 'true')
                            inputCheckboxItem.classList.add('checked')
                        } 
                    } else {
                        if(_this.playlists2[inputCheckboxItem.dataset.info].includes(parseInt(_this.currentSongIdLibAction))) {
                            inputCheckboxItem.setAttribute('aria-checked', 'true')
                            inputCheckboxItem.classList.add('checked')
                        }
                    }
                })
            } else {
                if(_this.isOptionSong) {
                    const itemsOptionWrap = $$('.song__option-wrap')
                    itemsOptionWrap.forEach(item => {
                        item.classList.remove('active')
                    })
                    _this.isOptionSong = false
                }
            }

        }

        // Xử lý ấn vào SHOW Library song ở tab personal
        perLibSongBtn.onclick = function() {
            _this.isInLibSong = true
            _this.isShowLibSong = true
            opTabTitle.innerText = 'Library Song'
            opTabBackIcon.style.display = 'inline-block'
            playList.classList.add('transition')
            _this.renderLibrarySong()
            personalTab.classList.remove('active')
        }
        // Xử lý ẩn color-active khi ấn header_back 
        headerBack.onclick = function() {   //OK
            _this.isInFocusPlayerTab = false
            if(_this.isDescovery) {
                descoveryTab.classList.add('active')
                playList.classList.remove('transition')
                if(_this.isInLibSong) {
                    _this.isInLibSong = false
                }
            } else if(_this.isPlHome) {
                if(_this.isPlInner) {
                    opTabBackIcon.style.display = 'inline-block'
                    opTabTitle.innerText = 'Playlist'
                    opTabPara.style.display = 'block'
                    if(_this.currentPlaylist === _this.currentPlaylistActiving) {
                        opTabPara.innerText = _this.currentPlaylistActiving
                        _this.renderSongsInPlaylist(_this.currentPlaylistActiving)
                    } else {
                        opTabPara.innerText = _this.currentPlaylist
                        _this.renderSongsInPlaylist(_this.currentPlaylist)
                        const songAllNode = $$('.song')
                        songAllNode.forEach(songNode => {
                            if(songNode.classList.contains('active')) {
                                songNode.classList.remove('active')
                            }
                        })
                    }
                } else if(!_this.isPlInner) {
                    playList.classList.remove('transition')
                    playlistHome.classList.add('active')
                }
                if(_this.isInLibSong) {
                    _this.isInLibSong = false
                }
            } else if(_this.isFavorite) {
                _this.renderSongsInFavorite()
                if(_this.isInLibSong) {
                    _this.isInLibSong = false
                }
            } else if(_this.isPersonal) {
                if(_this.isShowLibSong) {
                    _this.renderLibrarySong()
                    opTabBackIcon.style.display = 'inline-block'
                } else {
                    _this.isInLibSong = false
                    personalTab.classList.add('active')
                    playList.classList.remove('transition')
                }
            }
        }
        // Xử lý sự nổi bọt khi clip vào progress volume
        volumeWrap.onclick = function(e) {
            e.stopPropagation()
        }
        // Xử lý onlick Volume
        volumeBtn.onclick = function() {
            _this.isVolume = !_this.isVolume
            if( _this.isVolume === true) {
                _this.currentVolume = audio.volume
                _this.currentProgressVol = progressVolume.value
                if(progressVolume.value >= 0.5) {
                    volumeHigh.classList.remove('active')
                } else if(progressVolume.value > 0 && progressVolume.value < 0.5) {
                    volumeLow.classList.remove('active')
                }
                volumeXmark.classList.add('active')
                audio.volume = 0
                progressVolume.value = 0
            } else {
                volumeXmark.classList.remove('active')
                audio.volume = _this.currentVolume
                progressVolume.value = _this.currentProgressVol
                if(progressVolume.value >= 0.5) {
                    volumeHigh.classList.add('active')

                } else if(progressVolume.value > 0 && progressVolume.value < 0.5) {
                    volumeLow.classList.add('active')
                }
            }
        }
        // Xử lý âm lượng audio
        progressVolume.oninput = function(e) {
            audio.volume = e.target.value
            if(Number(e.target.value) >= 0.5) {
                volumeHigh.classList.add('active')
                volumeLow.classList.remove('active')
                volumeXmark.classList.remove('active')
            } else if(Number(e.target.value) < 0.5 && Number(e.target.value) > 0) {
                volumeLow.classList.add('active')
                volumeHigh.classList.remove('active')
                volumeXmark.classList.remove('active')
            } else {
                volumeXmark.classList.add('active')
                volumeLow.classList.remove('active')
                volumeHigh.classList.remove('active')
            }
        }
        // Xử lý dark/light mode
        sunMoonBtn.onclick = function() {
            if(_this.canClickMode) {
                _this.isSunMoonMode = !_this.isSunMoonMode
                _this.canClickMode = false
                setTimeout(function() {
                    _this.canClickMode = true
                }, 500)
            }
            const bodyNode = $('body')
            const allSongs = $$('.song')
            const allBtns = $$('.btn')
            const progressDura = $('.progress-duration')
            const headerTitleH2 = $('.header__title h2')
            const headerSearch = $('.header__search')
            const headerBack = $('.header__back')
            const musicPlayerWrap = $('.music-player__wrap')
            const muPlayerControl = $('.music-player__control')
            const plControlTitleH4 = $('.player-control__title h4')
            const playerControlBtn = $('.player-control__control')
            const desWrap = $('.descovery__wrap')
            const desNews = $('.descovery__news')
            const slideShowImg = $$('.slideshow-container img')
            const desTitle = $('.descovery__title')
            const desPara = $('.descovery__para-click')
            const plHomeItem = $$('.pl-home__item')
            const plHomeItemTitle = $$('.pl-home__item-title')
            const perWrap = $('.personal__wrap')
            const perAboutMeTitle = $('.per-about-me__title')
            const perAboutMeSocials = $('.per-about-me__socials')
            const perLibSongTitle = $('.per-library-song__title')
            const perAuthBy = $('.personal__auth-by')
            const perAuthPro = $('.personal__auth-product')
            const desOpTitle = $('.descovery__option-title')
            const desOpList = $('.descovery__option-list')

            function darkMode() {
                bodyNode.classList.add('dark-mode')
                appPlayer.classList.add('dark-mode')
                playList.classList.add('dark-mode')
                dashboard.classList.add('dark-mode')
                nameSong.classList.add('dark-mode')
                togglePlay.classList.add('dark-mode')
                playList.classList.add('dark-mode')

                progressDura.classList.add('dark-mode')
                headerTitleH2.classList.add('dark-mode')
                headerSearch.classList.add('dark-mode')
                headerBack.classList.add('dark-mode')
                musicPlayerWrap.classList.add('dark-mode')
                muPlayerDes.classList.add('dark-mode')
                muPlayerPl.classList.add('dark-mode')
                muPlayerFav.classList.add('dark-mode')
                muPlayerPer.classList.add('dark-mode')
                muPlayerControl.classList.add('dark-mode')
                plControlTitleH4.classList.add('dark-mode')
                playerControlBtn.classList.add('dark-mode')
                desWrap.classList.add('dark-mode')
                desNews.classList.add('dark-mode')
                slideShowImg.forEach(item => {
                    return item.classList.add('dark-mode')
                })
                desTitle.classList.add('dark-mode')
                desPara.classList.add('dark-mode')
                playlistHome.classList.add('dark-mode')
                optionTab.classList.add('dark-mode')
                optionTabBack.classList.add('dark-mode')
                optionTabAction.classList.add('dark-mode')
                plHomeItem.forEach(item => {
                    item.classList.add('dark-mode')
                })
                plHomeItemTitle.forEach(item => {
                    item.classList.add('dark-mode')
                });
                perWrap.classList.add('dark-mode')
                perAboutMeTitle.classList.add('dark-mode')
                perAboutMeSocials.classList.add('dark-mode')
                perLibSongTitle.classList.add('dark-mode')
                perLibSongBtn.classList.add('dark-mode')
                perAuthBy.classList.add('dark-mode')
                perAuthPro.classList.add('dark-mode')
                desOpTitle.classList.add('dark-mode')
                desOpList.classList.add('dark-mode')
                allSongs.forEach(song => {
                    return song.classList.add('dark-mode')
                });
                allBtns.forEach(btn => {
                    return btn.classList.add('dark-mode')
                });
            }
            function lightMode() {
                bodyNode.classList.remove('dark-mode')
                appPlayer.classList.remove('dark-mode')
                playList.classList.remove('dark-mode')
                dashboard.classList.remove('dark-mode')
                nameSong.classList.remove('dark-mode')
                togglePlay.classList.remove('dark-mode')
                playList.classList.remove('dark-mode')

                progressDura.classList.remove('dark-mode')
                headerTitleH2.classList.remove('dark-mode')
                headerSearch.classList.remove('dark-mode')
                headerBack.classList.remove('dark-mode')
                musicPlayerWrap.classList.remove('dark-mode')
                muPlayerDes.classList.remove('dark-mode')
                muPlayerPl.classList.remove('dark-mode')
                muPlayerFav.classList.remove('dark-mode')
                muPlayerPer.classList.remove('dark-mode')
                muPlayerControl.classList.remove('dark-mode')
                plControlTitleH4.classList.remove('dark-mode')
                playerControlBtn.classList.remove('dark-mode')
                desWrap.classList.remove('dark-mode')
                desNews.classList.remove('dark-mode')
                slideShowImg.forEach(item => {
                    return item.classList.remove('dark-mode')
                })
                desTitle.classList.remove('dark-mode')
                desPara.classList.remove('dark-mode')
                playlistHome.classList.remove('dark-mode')
                optionTab.classList.remove('dark-mode')
                optionTabBack.classList.remove('dark-mode')
                optionTabAction.classList.remove('dark-mode')
                plHomeItem.forEach(item => {
                    item.classList.remove('dark-mode')
                })
                plHomeItemTitle.forEach(item => {
                    item.classList.remove('dark-mode')
                });
                perWrap.classList.remove('dark-mode')
                perAboutMeTitle.classList.remove('dark-mode')
                perAboutMeSocials.classList.remove('dark-mode')
                perLibSongTitle.classList.remove('dark-mode')
                perLibSongBtn.classList.remove('dark-mode')
                perAuthBy.classList.remove('dark-mode')
                perAuthPro.classList.remove('dark-mode')
                desOpTitle.classList.remove('dark-mode')
                desOpList.classList.remove('dark-mode')

                allSongs.forEach(song => {
                    return song.classList.remove('dark-mode')
                });
                allBtns.forEach(btn => {
                    return btn.classList.remove('dark-mode')
                });
            }
            if(!_this.isSunMoonMode) {
                _this.currentMode = 'dark-mode'
                darkMode()
                sunBtn.classList.remove('active')
                moonBtn.classList.add('active')

                sunBtn.classList.add('transition-back')
                moonBtn.classList.add('transition-to-ward')

                setTimeout(function() {
                    sunBtn.classList.remove('transition-back')
                    moonBtn.classList.remove('transition-to-ward')
                }, 500)
            } else {
                _this.currentMode = ''
                lightMode()

                moonBtn.classList.remove('active')
                sunBtn.classList.add('active')

                sunBtn.classList.add('transition-to-ward')
                moonBtn.classList.add('transition-back')

                setTimeout(function() {
                    sunBtn.classList.remove('transition-to-ward')
                    moonBtn.classList.remove('transition-back')
                }, 500)
            }
        }
        // ****Xử lý search song - SEARCH SECTION
        headerSearch.onclick = function() {
            headerSearchIcon.classList.remove('active')
            searchWrap.classList.add('active')
        }

        searchWrap.onclick = function() {
            headerSearchIcon.classList.add('active')
            searchWrap.classList.remove('active')
            if(searchBarInput.value !== "") {
                searchBarInput.value = ""
                searchResult.classList.remove('active')
            } else {
                searchHistory.classList.remove('active')
            }
        }

        searchWrapContainer.onclick = function(e) {
            e.stopPropagation()
        }

        // Xử lý hiện search-history khi focus input search
        searchBarInput.onfocus = function() {
            if(searchBarInput.value === "") {
                searchHistory.classList.add('active')
            }
        }
        searchBarInput.oninput = function() {
            if(searchBarInput.value === "") {
                searchHistory.classList.add('active')
                searchResult.classList.remove('active')
            } else {
                searchHistory.classList.remove('active')
                searchResult.classList.add('active')
            }
        }
        searchBarInput.onselect = function() {
            searchHistory.classList.remove('active')
        }
        // Xử lý hiện search-history khi focus input search tại tab descovery
        navSearchInput.onfocus = function() {
            if(navSearchInput.value === '') {
                navSearchHistory.classList.add('active')
            }
        }
        navSearchInput.oninput = function() {
            if(navSearchInput.value === "") {
                navSearchHistory.classList.add('active')
                navSearchResult.classList.remove('active')
            } else {
                navSearchHistory.classList.remove('active')
                navSearchResult.classList.add('active')
            }
        }
        navSearchInput.onselect = function() {
            navSearchHistory.classList.remove('active')
        }
        appPlayer.onclick = function(e) {
            const navSearchInputNode = e.target.closest('.music-nav__search-input')
            const navSearchHistoryNode = e.target.closest('.music-nav__search-history-label')
            const navSearchResultNode = e.target.closest('.music-nav__search-result')
            if(!navSearchInputNode && !navSearchHistoryNode && !navSearchResultNode) {
                navSearchHistory.classList.remove('active')
                navSearchResult.classList.remove('active')
            }
        }
        // Xử lý click trái phải show slide
        newsBtnLeft.onclick = function() {
            _this.showSlideWithBtn(-1)
        }
        newsBtnRight.onclick = function() {
            _this.showSlideWithBtn(1)
        }
        descoveryNews.onmouseenter = function() {
            _this.isShowRunning = false
            _this.stopSlideshow()
        }
        descoveryNews.onmouseleave = function() {
            _this.startSlideshow()
            setTimeout(function() {
                _this.isShowRunning = true
            })
        }
        //************ RENAME PLAYLISTS ************* 
        // Tìm kiếm từ khóa: RENAME PLAYLIST IS HERE để show code liên quan
        // Xử lý đếm kí tự khi nhập ở ô input update tên playlist
        inputFormPl.oninput = function() {
            countCharactersValue.innerText = this.value.length
            if(this.value.trim() === '') {
                _this.toggleColorWarn(true)
                if(_this.isCreatePl || _this.isAddSongToPl) {
                    warningTitle.innerText = 'Bắt buộc'
                }
            } else {
                _this.toggleColorWarn(false)
            }
        }
        // Xử lý thông tin input sau khi click BTN CREDATE PLAYLIST
        credatePlBtn.onclick = function() {
            if(inputFormPl.value.trim() === '') {
                _this.toggleColorWarn(true)
                inputFormPl.focus()
            } else {
                if(_this.isRenamePl) {  //Thực hiện sửa tên PL
                    if(inputFormPl.value.trim() !== _this.optionSelectedPlValue) { //nếu tên không trùng thì update
                        const playlistNames = _this.getPlaylistNames()
                        const isHasOwnPlaylist = playlistNames.includes(inputFormPl.value.trim())
                        if(!isHasOwnPlaylist) {     //Nếu k trùng tên PL khác
                            _this.updatePlaylists = !_this.updatePlaylists
                            // Có được tên update vào object playlist mới
                            _this.playlistsToggle(_this.optionSelectedPlValue, inputFormPl.value)
                            // Render lại playlist
                            _this.playlistsRender()
                            credatePlWrap.classList.remove('active')
                            updatePlName.classList.remove('active')
                            inputFormInfoPl.classList.remove('active')
                            credatePlBtn.innerText = ''
                            _this.isRenamePl = !_this.isRenamePl
                        } else {    //Trùng tên PL khác, warn
                            warningTitle.innerText = 'Trùng tên!'
                            _this.toggleColorWarn(true)
                            inputFormPl.focus()
                        }
                    }
                     else {     //Trùng tên ẩn
                        credatePlWrap.classList.remove('active')
                        updatePlName.classList.remove('active')
                        inputFormInfoPl.classList.remove('active')
                        credatePlBtn.innerText = ''
                        _this.isRenamePl = !_this.isRenamePl
                    }
                } else if(_this.isCreatePl) {   //Thực hiện tạo PL mới
                    const playlistNames = _this.getPlaylistNames()
                    const isHasOwnPlaylist = playlistNames.includes(inputFormPl.value.trim())
                    if(!isHasOwnPlaylist) {
                        credatePlWrap.classList.remove('active')
                        createNewPl.classList.remove('active')
                        inputFormInfoPl.classList.remove('active')
                        credatePlBtn.innerText = ''
                        if(!_this.updatePlaylists) {
                            _this.playlists1[`${inputFormPl.value.trim()}`] = []
                        } else {
                            _this.playlists2[`${inputFormPl.value.trim()}`] = []
                        }
                        inputFormPl.value = ''
                        _this.playlistsRender()
                        _this.isCreatePl = !_this.isCreatePl
                    } else {
                        warningTitle.innerText = 'Trùng tên!'
                        _this.toggleColorWarn(true)
                        inputFormPl.focus()
                    }
                } else if(_this.isAddSongToPl) {    //Thực hiện tạo PL mới tại tab thêm song vào PL //CREATE PL AT THE SONG ADD TO PL
                    const playlistNames = _this.getPlaylistNames()
                    const isHasOwnPlaylist = playlistNames.includes(inputFormPl.value.trim())
                    if(!isHasOwnPlaylist) {
                        credatePlWrap.classList.remove('active')
                        addSongTo.classList.remove('active')
                        playlistToAdd.classList.remove('active')
                        inputFormInfoPl.classList.remove('active')
                        credatePlBtn.innerText = ''
                        if(!_this.updatePlaylists) {
                            _this.playlists1[`${inputFormPl.value.trim()}`] = [parseInt(_this.currentSongIdLibAction)]
                        } else {
                            _this.playlists2[`${inputFormPl.value.trim()}`] = [parseInt(_this.currentSongIdLibAction)]
                        }
                        inputFormPl.value = ''
                        _this.playlistsRender()
                        _this.isAddSongToPl = !_this.isAddSongToPl
                    } else {
                        warningTitle.innerText = 'Trùng tên!'
                        _this.toggleColorWarn(true)
                        inputFormPl.focus()
                    }
                }
            }
        }
        //************ END RENAME PLAYLISTS ************* 
        // *************** CREATE PL AT THE SONG ADD TO PL *****************
        // code liên quan: CREATE PL AT THE SONG ADD TO PL
        showFormCreatePl.onclick = function() {
            showFormCreatePl.classList.remove('active')
            inputFormInfoPl.classList.add('active')
            credatePlBtn.innerText = 'Tạo'
            inputFormPl.value = ''
            countCharactersValue.innerText = '0'
        }
        
        //************ DELETE PLAYLIST ************* 
            // Tìm kiếm từ khóa: DELETE PLAYLIST IS HERE để show code liên quan
        //************ END DELETE PLAYLIST ************* 
        //************ CREATE NEW PLAYLIST in playlist Home tab ************* 
        optionTabAction.onclick = function() {
            if(_this.isPlHome && !_this.isPlInner) {
                _this.isCreatePl = true
                credatePlWrap.classList.add('active')
                createNewPl.classList.add('active')
                inputFormInfoPl.classList.add('active')
                credatePlBtn.innerText = 'Tạo'
                inputFormPl.focus()
                inputFormPl.value = ''
                countCharactersValue.innerText = '0'
            }
        }
        //************ END CREATE NEW PLAYLIST ************* 


        // ************ ADD SONG TO PLAYLIST ************
        // code liên quan search: THIS IS ADD SONG
        playlistToAdd.onclick = function(e) {       //Error
            const listPlToAddSongNode = e.target.closest('.credate-pl__add-song-item')
            if(listPlToAddSongNode) {
                const ariaCheckedValue = listPlToAddSongNode.getAttribute('aria-checked') === 'true' ? 'false' : 'true'
                listPlToAddSongNode.setAttribute('aria-checked', ariaCheckedValue)
                const toggleChecked = ariaCheckedValue === 'false' ? false : true
                if(toggleChecked) {
                    listPlToAddSongNode.classList.add('checked')
                    if(!_this.updatePlaylists) {
                        _this.playlists1[listPlToAddSongNode.dataset.info].push(parseInt(_this.currentSongIdLibAction))
                    } else {
                        _this.playlists2[listPlToAddSongNode.dataset.info].push(parseInt(_this.currentSongIdLibAction))
                    }
                    if(!_this.isFavorite && !_this.isFavoriteActiving && !this.isLibraryActiving && !_this.isShowLibSong && !_this.isInLibSong) {
                        console.log('in')
                        console.log(_this.isShowLibSong)
                        if(_this.currentPlaylist === listPlToAddSongNode.dataset.info) {
                            _this.renderSongsInPlaylist(listPlToAddSongNode.dataset.info)
                        }
                    }
                    _this.playlistsRender()
                } else {
                    listPlToAddSongNode.classList.remove('checked')
                    if(!_this.updatePlaylists) {
                        const indexSongIdInPl = _this.playlists1[listPlToAddSongNode.dataset.info].indexOf(parseInt(_this.currentSongIdLibAction))
                        if(indexSongIdInPl !== -1) {
                            _this.playlists1[listPlToAddSongNode.dataset.info].splice(indexSongIdInPl, 1)
                        }
                    } else {
                        const indexSongIdInPl = _this.playlists2[listPlToAddSongNode.dataset.info].indexOf(parseInt(_this.currentSongIdLibAction))
                        if(indexSongIdInPl !== -1) {
                            _this.playlists2[listPlToAddSongNode.dataset.info].splice(indexSongIdInPl, 1)
                        }
                    }
                    if(_this.isInFocusPlayerTab) {
                        if(parseInt(_this.currentSongIndexAction) === parseInt(_this.currentIndex)) {
                            _this.isPlaylistActiving = false
                            _this.isLibraryActiving = true
                        } else if(parseInt(_this.currentSongIndexAction) < parseInt(_this.currentIndex) && _this.flagAction1Time){
                            _this.currentSongIndexAction -= 1
                            _this.flagAction1Time = false
                            _this.currentIndex -= 1
                        }
                        if(!_this.isFavorite && !_this.isFavoriteActiving && !this.isLibraryActiving && !_this.isShowLibSong && !_this.isInLibSong) {
                            _this.renderSongsInPlaylist(listPlToAddSongNode.dataset.info)
                        }
                    } else {
                        if(_this.isPlInner && _this.currentPlaylist === listPlToAddSongNode.dataset.info) {
                            console.log(_this.currentIndex)
                            console.log(_this.currentLibIndex)
                            if(parseInt(_this.currentSongIndexAction) === parseInt(_this.currentIndex)) {
                                _this.isPlaylistActiving = false
                                _this.isLibraryActiving = true
                            } else if(parseInt(_this.currentSongIndexAction) < parseInt(_this.currentIndex) && _this.flagAction1Time){
                                _this.currentSongIndexAction -= 1
                                _this.flagAction1Time = false
                                _this.currentIndex -= 1
                            }
                           if(_this.currentPlaylist === listPlToAddSongNode.dataset.info) {
                            _this.renderSongsInPlaylist(listPlToAddSongNode.dataset.info)
                           }
                        }
                    }
                    _this.playlistsRender()
                }
            }
        }
        // ************* DELETE SONG OUT PLAYLIST OR FAVORITE **************
        // code liên quan search: SONG OUT PL/FAV

        // Click ra ngoài hoặc click vào CLOSE tắt TAB UPDATE hoặc ADD SONG TO PLAYLISTS
        credatePlWrap.onclick = function(e) {
            const closeNode = e.target.closest('.credate-pl__close-icon')
            const credatePlWrapNode = e.target.closest('.credate-pl-wrap')
            const credatePlContainerNode = e.target.closest('.credate-pl-container')
            if(closeNode || credatePlWrapNode && !credatePlContainerNode) {
                credatePlWrap.classList.remove('active')
                updatePlName.classList.remove('active')
                addSongTo.classList.remove('active')
                createNewPl.classList.remove('active')
                inputFormInfoPl.classList.remove('active')
                playlistToAdd.classList.remove('active')
                showFormCreatePl.classList.remove('active')
                credatePlBtn.innerText = ''
                inputFormLabel.style.color = `${textColorLight}`
                countCharacters.style.color = `${textGrayColor}`
                warningTitle.innerText = 'Bắt buộc'
                warningTitle.style.display = 'none'
                inputFormPl.style.borderBottomColor = 'rgba(0, 0, 0, 0.2)'
                if(_this.isRenamePl) _this.isRenamePl = !_this.isRenamePl;
                else if(_this.isCreatePl) _this.isCreatePl = !_this.isCreatePl;
                else if(_this.isAddSongToPl) _this.isAddSongToPl = !_this.isAddSongToPl
                _this.flagAction1Time = true
            }
        }
        // Xử lý click hoặc unclick vào favoriteHeart tại subcontrolTab
        favoriteHeart.onclick = function() {    
            if(_this.songLibrary[_this.currentLibIndex][_this.favoriteTag]) {
                _this.songLibrary[_this.currentLibIndex][_this.favoriteTag] = false
                favoriteHeart.classList.remove('favorite')
                const indexSongIdInFav = _this.favoriteList.indexOf(parseInt(_this.currentLibIndex))
                if(indexSongIdInFav !== -1) {
                    _this.favoriteList.splice(indexSongIdInFav, 1)
                }
                if(_this.isFavorite) {
                    if(_this.isFavoriteActiving) {
                        _this.isFavoriteActiving = false
                        _this.isLibraryActiving = true
                    }
                    _this.renderSongsInFavorite()
                } else if(_this.isPlHome && _this.isPlInner) {
                    _this.renderSongsInPlaylist(_this.currentPlaylist)
                } else if(_this.isInLibSong) {
                    _this.renderLibrarySong()
                }
            } else {
                _this.songLibrary[_this.currentLibIndex][_this.favoriteTag] = true
                favoriteHeart.classList.add('favorite')
                _this.favoriteList.push(parseInt(_this.currentLibIndex))
                if(_this.isFavorite) {
                    _this.renderSongsInFavorite()
                } else if(_this.isPlHome && _this.isPlInner) {
                    _this.renderSongsInPlaylist(_this.currentPlaylist)
                } else if(_this.isInLibSong) {
                    _this.renderLibrarySong()
                }
            }
        }

        // XỬ LÝ NAVBAR ĐIỀU HƯỚNG
        // Start NAVBAR
        // Xử lý click vào tab danh sách phát 
        muPlayerDes.onclick = function() {
            _this.isDescovery = true
            muPlayerDes.classList.add('active')
            descoveryTab.classList.add('active')
            if(_this.isOptionPlaylist) {
                const itemsOptionWrap = $$('.home-item__option-wrap')
                itemsOptionWrap.forEach(item => {
                    item.classList.remove('active')
                })
                _this.isOptionPlaylist = false
            } else if(_this.isOptionSong) {
                const itemsOptionWrap = $$('.song__option-wrap')
                itemsOptionWrap.forEach(item => {
                    item.classList.remove('active')
                })
                _this.isOptionSong = false
            }
            if(_this.isPlHome) {
                _this.isPlHome = false
                muPlayerPl.classList.remove('active')
                if(_this.isPlInner) {
                    _this.isPlInner = false
                    playList.classList.remove('transition')
                    opTabBackIcon.style.display = 'none'
                    opTabPara.style.display = 'none'
                } else {
                    optionTabPlus.style.display = 'none'
                    playlistHome.classList.remove('active')
                }
            } else if( _this.isFavorite) {
                _this.isFavorite = false
                muPlayerFav.classList.remove('active')
                playList.classList.remove('transition')
            } else if(_this.isPersonal) {
                _this.isPersonal = false
                muPlayerPer.classList.remove('active')
                if(_this.isInLibSong) {
                    _this.isInLibSong = false
                    _this.isShowLibSong = false
                    opTabBackIcon.style.display = 'none'
                    playList.classList.remove('transition')
                } else {
                    personalTab.classList.remove('active')
                }
            }
        }
        muPlayerPl.onclick = function() {
            _this.isPlHome = true
            opTabTitle.innerText = 'Your Playlists'
            muPlayerPl.classList.add('active')
            playlistHome.classList.add('active')
            optionTabPlus.style.display = 'inline-block'
            if(_this.isOptionPlaylist) {
                const itemsOptionWrap = $$('.home-item__option-wrap')
                itemsOptionWrap.forEach(item => {
                    item.classList.remove('active')
                })
                _this.isOptionPlaylist = false
            } else if(_this.isOptionSong) {
                const itemsOptionWrap = $$('.song__option-wrap')
                itemsOptionWrap.forEach(item => {
                    item.classList.remove('active')
                })
                _this.isOptionSong = false
            }
            if(_this.isPlInner) {
                _this.isPlInner = false
                playList.classList.remove('transition')
                opTabBackIcon.style.display = 'none'
                opTabPara.style.display = 'none'
            } else if(_this.isDescovery) {
                _this.isDescovery = false
                muPlayerDes.classList.remove('active')
                descoveryTab.classList.remove('active')
            } else if( _this.isFavorite) {
                _this.isFavorite = false
                muPlayerFav.classList.remove('active')
                playList.classList.remove('transition')
            } else if(_this.isPersonal) {
                _this.isPersonal = false
                muPlayerPer.classList.remove('active')
                if(_this.isInLibSong) {
                    _this.isInLibSong = false
                    _this.isShowLibSong = false
                    opTabBackIcon.style.display = 'none'
                    playList.classList.remove('transition')
                } else {
                    personalTab.classList.remove('active')
                }
            } 
        }
        muPlayerFav.onclick = function() {
            _this.isFavorite = true
            opTabTitle.innerText = 'Your Favorite Songs'
            muPlayerFav.classList.add('active')
            playList.classList.add('transition')
            _this.renderSongsInFavorite()
            if(_this.isOptionPlaylist) {
                const itemsOptionWrap = $$('.home-item__option-wrap')
                itemsOptionWrap.forEach(item => {
                    item.classList.remove('active')
                })
                _this.isOptionPlaylist = false
            } else if(_this.isOptionSong) {
                const itemsOptionWrap = $$('.song__option-wrap')
                itemsOptionWrap.forEach(item => {
                    item.classList.remove('active')
                })
                _this.isOptionSong = false
            }
            
            if(_this.isDescovery) {
                _this.isDescovery = false
                muPlayerDes.classList.remove('active')
                descoveryTab.classList.remove('active')
            } else if( _this.isPlHome) {
                _this.isPlHome = false
                muPlayerPl.classList.remove('active')
                if(_this.isPlInner) {
                    _this.isPlInner = false
                    opTabBackIcon.style.display = 'none'
                    opTabPara.style.display = 'none'
                } else {
                    optionTabPlus.style.display = 'none'
                    playlistHome.classList.remove('active')
                }
            } else if(_this.isPersonal) {
                _this.isPersonal = false
                muPlayerPer.classList.remove('active')
                if(_this.isInLibSong) {
                    _this.isInLibSong = false
                    _this.isShowLibSong = false
                    opTabBackIcon.style.display = 'none'
                } else {
                    personalTab.classList.remove('active')
                }
            }
        }
        muPlayerPer.onclick = function() {
            _this.isPersonal = true
            muPlayerPer.classList.add('active')
            personalTab.classList.add('active')
            if(_this.isOptionPlaylist) {
                const itemsOptionWrap = $$('.home-item__option-wrap')
                itemsOptionWrap.forEach(item => {
                    item.classList.remove('active')
                })
                _this.isOptionPlaylist = false
            } else if(_this.isOptionSong) {
                const itemsOptionWrap = $$('.song__option-wrap')
                itemsOptionWrap.forEach(item => {
                    item.classList.remove('active')
                })
                _this.isOptionSong = false
            }
            if(_this.isInLibSong) {
                _this.isInLibSong = false
                _this.isShowLibSong = false
                opTabBackIcon.style.display = 'none'
                playList.classList.remove('transition')
            } else if(_this.isDescovery) {
                _this.isDescovery = false
                muPlayerDes.classList.remove('active')
                descoveryTab.classList.remove('active')
            } else if( _this.isPlHome) {
                _this.isPlHome = false
                muPlayerPl.classList.remove('active')
                if(_this.isPlInner) {
                    _this.isPlInner = false
                    playList.classList.remove('transition')
                    opTabBackIcon.style.display = 'none'
                    opTabPara.style.display = 'none'
                } else {
                    optionTabPlus.style.display = 'none'
                    playlistHome.classList.remove('active')
                }
            } else if(_this.isFavorite) {
                _this.isFavorite = false
                muPlayerFav.classList.remove('active')
                playList.classList.remove('transition')
            } 
        }
        // End NAVBAR
        // Xử lý click vào playlist bất kỳ
        playlistHome.onclick = function(e) {
            const playlistNode = e.target.closest('.pl-home__item')
            if(playlistNode && !e.target.closest('.pl-home__item-option')) {
                _this.isPlInner = true;
                _this.currentPlaylist = playlistNode.dataset.index
                _this.renderSongsInPlaylist(playlistNode.dataset.index)
                playList.classList.add('transition')
                if(_this.isOptionPlaylist) {
                    const itemsOptionWrap = $$('.home-item__option-wrap')
                    itemsOptionWrap.forEach(item => {
                        item.classList.remove('active')
                    })
                    _this.isOptionPlaylist = false
                }
                playlistHome.classList.remove('active')
                optionTabPlus.style.display = 'none'
                opTabBackIcon.style.display = 'inline-block'
                opTabTitle.innerText = 'Playlist'
                opTabPara.style.display = 'block'
                opTabPara.innerText = playlistNode.dataset.index
            } else if(e.target.closest('.pl-home__item-option')) {
                _this.isOptionPlaylist = true
                const playlistUpdate = e.target.closest('.home-item__option-update')
                const playlistDelete = e.target.closest('.home-item__option-delete')
                const itemsOptionWrap = $$('.home-item__option-wrap')
                itemsOptionWrap.forEach(item => {
                    if(item.dataset.index === playlistNode.dataset.index) {
                        _this.cachePlName = item.dataset.index
                        item.classList.add('active')
                        if(playlistUpdate) {    //Update This Playlist Name RENAME PLAYLIST IS HERE
                            _this.isRenamePl = true
                            item.classList.remove('active')
                            credatePlWrap.classList.add('active')
                            updatePlName.classList.add('active')
                            inputFormInfoPl.classList.add('active')
                            credatePlBtn.innerText = 'Cập nhật'
                            // THỰC HIỆN GET PLAYLISTNAME CẦN ĐỔI 
                            // Cập nhật tên này lên thẻ input và show số kí tự
                            inputFormPl.value = playlistNode.dataset.index
                            _this.optionSelectedPlValue = playlistNode.dataset.index
                            countCharactersValue.innerText = playlistNode.dataset.index.length
                            inputFormPl.focus()
                        } else if(playlistDelete) {     //Delete this Playlist: DELETE PLAYLIST IS HERE
                            item.classList.remove('active')
                            if(!_this.updatePlaylists) {
                                delete _this.playlists1[playlistNode.dataset.index]
                            } else {
                                delete _this.playlists2[playlistNode.dataset.index]
                            }
                            if(_this.cachePlName === _this.currentPlaylistActiving && _this.isPlaylistActiving) {
                                _this.isPlaylistActiving = false
                                _this.isLibraryActiving = true
                            }
                            _this.playlistsRender()
                        }
                    } else {    
                        item.classList.remove('active')
                    }
                })
            } else {
                if(_this.isOptionPlaylist) {
                    const itemsOptionWrap = $$('.home-item__option-wrap')
                    itemsOptionWrap.forEach(item => {
                        item.classList.remove('active')
                    })
                    _this.isOptionPlaylist = false
                }
            }
        }
        // Xử lý back lại playlist home khi ở trong playlist inner
        optionTabBack.onclick = function() {
            if(_this.isPlHome && _this.isPlInner) {
                _this.isPlInner = false
                opTabTitle.innerText = 'Your Playlists'
                playlistHome.classList.add('active')
                optionTabPlus.style.display = 'inline-block'
                playList.classList.remove('transition')
                opTabBackIcon.style.display = 'none'
                opTabPara.style.display = 'none'
            } else if(_this.isPersonal && _this.isShowLibSong) {
                _this.isShowLibSong = false
                _this.isInLibSong = false
                personalTab.classList.add('active')
                optionTab.style.display = 'none'
                opTabBackIcon.style.display = 'none'
                playList.classList.remove('transition')
            }
        }
        // Xử lý ấn vào control phát nhạc outter - ở home, hiện control inner playlist
        playerControlLabel.onclick = function() {
            _this.isInFocusPlayerTab = true
            if(_this.isOptionPlaylist) {
                const itemsOptionWrap = $$('.home-item__option-wrap')
                itemsOptionWrap.forEach(item => {
                    item.classList.remove('active')
                })
                _this.isOptionPlaylist = false
            } else if(_this.isOptionSong) {
                const itemsOptionWrap = $$('.song__option-wrap')
                itemsOptionWrap.forEach(item => {
                    item.classList.remove('active')
                })
                _this.isOptionSong = false
            }
            if(_this.isPlaylistActiving) {
                _this.currentPlaylist = _this.currentPlaylistActiving
            }
            if(_this.isDescovery) {
                playList.classList.add('transition')
                descoveryTab.classList.remove('active')
                if(_this.isPlaylistActiving) {
                    headerPlaylist.innerText = _this.currentPlaylistActiving
                    _this.renderSongsInPlaylist(_this.currentPlaylistActiving)
                } else if(_this.isFavoriteActiving) {
                    headerPlaylist.innerText = 'Favorite Songs'
                    _this.renderSongsInFavorite()
                } else if(_this.isLibraryActiving) {
                    _this.isInLibSong = true
                    headerPlaylist.innerText = 'Library Songs'
                    _this.renderLibrarySong()
                }
            } else if(_this.isPlHome) {
                if(_this.isPlInner) {
                    if(_this.isPlaylistActiving) {
                        if(_this.currentPlaylist !== _this.currentPlaylistActiving) {
                            _this.renderSongsInPlaylist(_this.currentPlaylistActiving)
                        }
                        headerPlaylist.innerText = _this.currentPlaylistActiving
                    } else if(_this.isFavoriteActiving) {
                        headerPlaylist.innerText = 'Favorite Songs'
                        _this.renderSongsInFavorite()
                    } else if(_this.isLibraryActiving) {
                        _this.isInLibSong = true
                        headerPlaylist.innerText = 'Library Songs'
                        _this.renderLibrarySong()
                    }
                } else {
                    playList.classList.add('transition')
                    playlistHome.classList.remove('active')
                    if(_this.isPlaylistActiving) {
                        headerPlaylist.innerText = _this.currentPlaylistActiving
                        _this.renderSongsInPlaylist(_this.currentPlaylistActiving)
                    } else if(_this.isFavoriteActiving) {
                        headerPlaylist.innerText = 'Favorite Songs'
                        _this.renderSongsInFavorite()
                    } else if(_this.isLibraryActiving) {
                        _this.isInLibSong = true
                        headerPlaylist.innerText = 'Library Songs'
                        _this.renderLibrarySong()
                    }
                }
            } else if(_this.isFavorite) {
                if(_this.isPlaylistActiving) {
                    headerPlaylist.innerText = _this.currentPlaylistActiving
                    _this.renderSongsInPlaylist(_this.currentPlaylistActiving)
                } else if(_this.isLibraryActiving) {
                    _this.isInLibSong = true
                    headerPlaylist.innerText = 'Library Songs'
                    _this.renderLibrarySong()
                } else {
                    headerPlaylist.innerText = 'Favorite Songs'
                }
            } else if(_this.isPersonal) {
                if(!_this.isShowLibSong) {
                    playList.classList.add('transition')
                    personalTab.classList.remove('active')
                }
                if(_this.isPlaylistActiving) {
                    headerPlaylist.innerText = _this.currentPlaylistActiving
                    _this.renderSongsInPlaylist(_this.currentPlaylistActiving)
                } else if(_this.isFavoriteActiving) {
                    headerPlaylist.innerText = 'Favorite Songs'
                    _this.renderSongsInFavorite()
                } else if(_this.isLibraryActiving) {
                    _this.isInLibSong = true
                    headerPlaylist.innerText = 'Library Songs'
                    if(!_this.isShowLibSong) {
                        _this.renderLibrarySong()
                    }
                }
            }
        }   
    },
    // function
    scrollToActiveSong: function() {
        setTimeout( () => {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            })
        }, 250)
    },
    loadConfig: function() {
        this.randomCount = this.config.randomCount
        this.isRandom = this.config.isRandom
        this.isRepeat = this.config.isRepeat

        // Object.assign(this, this.config) 
        //Hợp nhất giá trị của this.config sang cho this. Tuy nhiên, nếu tương lai this.config có nhiều key k mong muốn mà hợp nhất thì bất tiện
    },
    getSongIdInLib: function() {
        const songAllNode = $$('.song')
        Array.from(songAllNode).map(songNode => {
            if(parseInt(songNode.dataset.index) === parseInt(this.currentIndex)) {
                this.currentLibIndex = parseInt(songNode.dataset.info)
            }
        })
    },
    nextSong: function() {
        this.currentIndex++
        if(this.isPlaylistActiving) {
            if(!this.updatePlaylists) {
                if(this.currentIndex >= this.playlists1[this.currentPlaylistActiving].length) this.currentIndex = 0
            } else {
                if(this.currentIndex >= this.playlists2[this.currentPlaylistActiving].length) this.currentIndex = 0
            }
            this.getSongIdInLib()
            this.renderSongsInPlaylist(this.currentPlaylistActiving)
        } else if(this.isFavoriteActiving) {
            if(this.currentIndex >= this.favoriteList.length) this.currentIndex = 0
            this.getSongIdInLib()
            this.renderSongsInFavorite()
        } else if(this.isLibraryActiving) {
            if(this.currentIndex >= Object.keys(this.songLibrary).length) this.currentIndex = 0
            this.getSongIdInLib()
            this.renderLibrarySong()
        }
        this.loadCurrentLibSong()
    },
    prevSong: function() {
        this.currentIndex--
        if(this.isPlaylistActiving) {
            if(!this.updatePlaylists) {
                if(this.currentIndex < 0) this.currentIndex = this.playlists1[this.currentPlaylistActiving].length - 1
            } else {
                if(this.currentIndex < 0) this.currentIndex = this.playlists2[this.currentPlaylistActiving].length - 1
            }
            this.getSongIdInLib()
            this.renderSongsInPlaylist(this.currentPlaylistActiving)
        } else if(this.isFavoriteActiving) {
            if(this.currentIndex < 0) this.currentIndex = this.favoriteList.length - 1
            this.getSongIdInLib()
            this.renderSongsInFavorite()
        } else if(this.isLibraryActiving) {
            if(this.currentIndex < 0) this.currentIndex = Object.keys(this.songLibrary).length - 1
            this.getSongIdInLib()
            this.renderLibrarySong()
        }
        this.loadCurrentLibSong()
    },
    playRandomSong: function() {
        this.playedIndexSong.push(parseInt(this.currentIndex))
        if(this.isPlaylistActiving) {
            if(!this.updatePlaylists) {
                if(this.playedIndexSong.length === this.playlists1[this.currentPlaylistActiving].length) {
                    this.playedIndexSong = [];
                }
            } else {
                if(this.playedIndexSong.length === this.playlists2[this.currentPlaylistActiving].length) {
                    this.playedIndexSong = [];
                }
            }
        } else if(this.isFavoriteActiving) {
            if(this.playedIndexSong.length === this.favoriteList.length) {
                this.playedIndexSong = [];
            }
        } else if(this.isLibraryActiving) {
            if(this.playedIndexSong.length === Object.keys(this.songLibrary).length) {
                this.playedIndexSong = [];
            }
        }
        let newIndex;
        do {
            var lengthPlActiving;
            if(this.isPlaylistActiving) {
                if(!this.updatePlaylists) {
                    lengthPlActiving =  this.playlists1[this.currentPlaylistActiving].length
                } else {
                    lengthPlActiving =  this.playlists2[this.currentPlaylistActiving].length
                }
            } else if(this.isFavoriteActiving) {
                lengthPlActiving = this.favoriteList.length
            } else if(this.isLibraryActiving) {
                lengthPlActiving = Object.keys(this.songLibrary).length
            }
            newIndex = Math.floor(Math.random() * lengthPlActiving)
        } while(this.playedIndexSong.includes(newIndex))
        this.currentIndex = newIndex
        if(this.isPlaylistActiving) {
            this.getSongIdInLib()
            this.renderSongsInPlaylist(this.currentPlaylistActiving)
        } else if(this.isFavoriteActiving) {
            this.getSongIdInLib()
            this.renderSongsInFavorite()
        } else if(this.isLibraryActiving) {
            this.getSongIdInLib()
            this.renderLibrarySong()
        }
        this.loadCurrentLibSong()
    },
    updateTotalDuraSong: function(minutes, seconds) {
        minutes = minutes < 10 ? "0" + minutes : minutes
        seconds = seconds < 10 ? "0" + seconds : seconds
        totalMinutes.innerText = `${minutes}`
        totalSeconds.innerText = `${seconds}`
    },
    updateCurrDuraSong: function(minutes, seconds) {
        minutes = minutes < 10 ? "0" + minutes : minutes
        seconds = seconds < 10 ? "0" + seconds : seconds
        currentMinutes.innerText = `${minutes}`
        currentSeconds.innerText = `${seconds}`
    },
    showSlides: function() {
        if(!this.isShowRunning) return;
        const slides = $$('.slide');
        const subSlide = $$('.des-news__sub-icon')
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
            subSlide[i].classList.remove('active')
        }
        this.slideIndex++;
        if (this.slideIndex > slides.length) {this.slideIndex = 1}
        slides[this.slideIndex - 1].style.display = "block"; 
        subSlide[this.slideIndex - 1].classList.add('active')
    },
    startSlideshow: function() {
        this.showSlides()
        this.slideshowInterval = setInterval(this.showSlides.bind(this), 5000)
    },
    stopSlideshow: function() {
        clearInterval(this.slideshowInterval)
    },
    showSlidesWithIndex: function(n) {
        const slides = $$('.slide');
        const subSlide = $$('.des-news__sub-icon');
        if (n > slides.length) {this.slideIndex = 1}    
        if (n < 1) {this.slideIndex = slides.length}
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
            subSlide[i].classList.remove('active')
        }
        slides[this.slideIndex-1].style.display = "block";  
        subSlide[this.slideIndex - 1].classList.add('active')
    },
    showSlideWithBtn: function(n) {
        this.showSlidesWithIndex(this.slideIndex += n)
    },
    toggleColorWarn: function(boolean) {
        if(boolean) {
            inputFormLabel.style.color = 'red'
            inputFormPl.style.borderBottomColor = 'red'
            warningTitle.style.display = 'block'
            countCharacters.style.color = 'red'
        } else {
            inputFormLabel.style.color = `${textColorLight}`
            inputFormPl.style.borderBottomColor = 'rgba(0, 0, 0, 0.2)'
            warningTitle.style.display = 'none'
            countCharacters.style.color = `${textGrayColor}`
        }
    },
    start: function() {
        // Đặt cấu hình từ config vào ứng dụng
        this.loadConfig()
        // Định nghĩa các thuộc tính cho OBJ
        this.defineProperties()

        // Lắng nghe / xử lý các sự kiện (DOM Events)
        this.handleEvents()

        // Tải bài hát đầu tiên lên UI khi chạy ứng dụng
        this.loadCurrentLibSong()
        
        // Render Library Song khi chạy lần đầu
        if(!this.runOneTime) {
            this.renderLibrarySong()
            this.runOneTime = true
        }
        // render slideshow tại tab khám phá
        this.renderSlideShow()

        // Render songs trong playlist
        // this.renderLibrarySong()
        this.startSlideshow()

        // Render playlists 
        this.playlistsRender()

        // Hiển thị trạng thái ban đầu của btn repeat và random
        repeatBtn_1.classList.toggle('active', this.isRandom && this.randomCount === 2)
        randomBtn.classList.toggle('active', this.isRandom)
        repeatBtn.classList.toggle('active', this.isRepeat)
    }
} 

app.start()

