const check = {
    isPlayActive: false,
    isDescovery: true,
    isPlaylistHome: false,
    isFavorite: false,
    isPersonal: false,
    isShowLibSong: false,
}

// export { check }


// ***JQuery***
$(document).ready(function($) {
    $('.music-player__descovery').on('click', function() {
        check.isDescovery = true
        check.isPlaylistHome = false
        check.isFavorite= false
        check.isPersonal = false
        if(check.isShowLibSong) {
            check.isShowLibSong = false
        } 
        $('.option-tab').css('display', 'none')
    })
    $('.music-player__playlist').on('click', function() {
        check.isDescovery = false
        check.isPlaylistHome = true
        check.isFavorite= false
        check.isPersonal = false
        $('.option-tab').css('display', 'flex')
    })
    $('.music-player__favorite').on('click', function() {
        check.isDescovery = false
        check.isPlaylistHome = false
        check.isFavorite= true
        check.isPersonal = false
        $('.option-tab').css('display', 'flex')
    })
    $('.music-player__personal').on('click', function() {
        check.isDescovery = false
        check.isPlaylistHome = false
        check.isFavorite= false
        check.isPersonal = true
        if(check.isShowLibSong) {
            check.isShowLibSong = false
        } 
        $('.option-tab').css('display', 'none')
    })
    $('.per-library-song__btn').on('click', function() {
        check.isShowLibSong = true
        if(check.isPersonal) {
            $('.option-tab').css('display', 'flex')
        }
    })
    $('.option-tab__back').on('click', function() {
        if(check.isShowLibSong) {
            check.isShowLibSong = false
        } 
    })
    $('.option').on("click", function(e) {
        e.stopPropagation()
    })
    $(".player-control__label").on("click", function() {
        if(check.isPlayActive === false) {
            $('.home-music__nav').css('display', 'none')
            $('.home-music__player').css('display', 'none')
            $('.music-nav__search-input').css('display', 'none')
            if(check.isPlaylistHome || check.isFavorite || check.isShowLibSong) {
                $('.option-tab').slideUp()
            }
            $('.dashboard').css("display", "block")
            $('.cd').animate({
                width: "160px"
            })
            $('.header__title h4').animate({
                fontSize: "12px"
            })
            $('.header__title h2').animate({
                fontSize: "24px"
            })
            $('.header__back').animate({
                height: "48px"
            })
            $('.header__search').animate({
                height: "48px"
            })
            $('.header__search-icon').animate({
                fontSize: "24px"
            })
            $('.header__back-icon').animate({
                fontSize: "24px"
            })
            $('header').animate({
                padding:"10px"
            })
            $('.control').animate({
                padding: "18px 8px 8px"
            })
            $('.control .btn').animate({
                height: "52px",
                fontSize: "24px"
            })
            $('.btn-toggle-bgr').animate({
                height: "48px",
                fontSize: "24px"
            })
            $('.progress').css('display', 'inline-block')
            $('.progress').animate({
                height: "6px",
                margin: "10px 20px 0"
            })
            $('.progress-duration').css("display", "flex")
            $('.progress-duration').animate({
                padding: "2px 42px 8px",
            })
            $('.song:last-child').animate({
                marginBottom: '0'
            }, 'fast')
            check.isPlayActive = !check.isPlayActive;
        }
    })
    $('.header__back').on('click',function() {
        const headerHeigh = getComputedStyle(document.documentElement).getPropertyValue('--header-heigh')
        const footerWrapHeigh = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--footer-wrap-heigh'))
        const footerControlHeigh = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--footer-control-heigh'))
        const footerHeigh = footerWrapHeigh + footerControlHeigh
        if(check.isPlayActive === true) {
            if(check.isDescovery || check.isPersonal) {
                $('.home-music__nav').css('display', 'flex')
            } else {
                $('.home-music__nav').slideDown('fast')
            }
            $('.home-music__player').css('display', 'flex')
            $('.music-nav__search-input').css('display', 'inline-block')
            if(check.isPlaylistHome || check.isFavorite || check.isShowLibSong) {
                $('.option-tab').slideDown('fast')
                $('.option-tab').css('display', 'flex')
            }
            $('.header__title h4').animate({
                fontSize: "0"
            }, 200)
            $('.header__title h2').animate({
                fontSize: "0"
            }, 200)
            $('.header__back').animate({
                height: "0"
            }, 200)
            $('.header__search').animate({
                height: "0"
            }, 200)
            $('.header__search-icon').animate({
                fontSize: "0"
            }, 200)
            $('.header__back-icon').animate({
                fontSize: "0"
            }, 200)
            $('header').animate({
                padding:"0 10px"
            }, 200)
            $('.control').animate({
                padding: "0 8px"
            }, 200)
            $('.control .btn').animate({
                height: "0",
                fontSize: "0"
            }, 200)
            $('.btn-toggle-bgr').animate({
                height: "0",
                fontSize: "0"
            }, 200)
            $('.progress').animate({
                height: "0",
                margin: "0 20px",
                display: "none"
            }, 200)
            $('.progress-duration').css("display", "flex")
            $('.progress-duration').animate({
                padding: "0 42px",
            }, 200)
            $('.song:last-child').animate({
                marginBottom: `${footerHeigh}px`
            }, 'fast')
            $('.cd').animate({
                width: "0"
            }, 200)
            $('.dashboard').css("display", "none")
            check.isPlayActive = !check.isPlayActive
        }
    })
})