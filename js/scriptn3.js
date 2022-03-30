let count = 6,
    begin = 0,
    mediaVideo = $(".media-video").get(0),
    //vTop = $('.media-video').offset()['top'],
    //vBottom = $('.media-video').offset()['top'] + $('.media-video').height(),
    videoStatus = true;

$("#preloader").fadeOut(500);

$(window).on("load", function () {
    $(".cost-text").animate(
        {
            opacity: 0.0,
        },
        500,
        function () {
            $(".cost-text").load("library?type=count");
            setTimeout(() => {
                $(".cost-text").animate(
                    {
                        opacity: 1,
                    },
                    500
                );
            }, 500);
        }
    );
    loader();
    $(".library-out").css("opacity", 1.0);

    //videoPause();

    /* $(window).scroll(function(){
        let scrollTop = $(window).scrollTop(),
            scrollBottom = $(window).scrollTop() + $(window).height();

        if (scrollBottom > vTop && scrollTop < vBottom) {
            if (videoStatus == false) {
                videoPlay();
                videoStatus = true;
            }
        } else {
            if (videoStatus == true) {
                videoPause();
                videoStatus = false;
            }
        }
    }) */
});

$('.download_link').on('click', function(){
    window.open('https://vrp.network/graphics');
});

$(".fa-play").click(function () {
    videoPlay();
});
$(".fa-pause").click(function () {
    videoPause();
});
function videoPlay() {
    mediaVideo.play();
    $('.fa-pause').removeClass("hidden");
    $('.fa-play').addClass("hidden");
}
function videoPause() {
    mediaVideo.pause();
    $('.fa-play').removeClass("hidden");
    $('.fa-pause').addClass("hidden");
}

let lang = "ru";
$(".languages-ru").click(function () {
    if (lang != "ru") {
    }
});
$(".languages-en").click(function () {
    if (lang != "en") {
    }
});

$(".library").on("mouseover", "video", function () {
    let source = $(this).children("source").attr("data-src");
    $(this).attr("src", source);

    $(this).css("opacity", 1.0);

    this.play();
    setTimeout(() => {
        this.play();
    }, 200);
});
$(".library").on("mouseleave", "video", function () {
    $(this).css("opacity", 0.0);
    setTimeout(() => {
        this.pause();
        this.currentTime = 0;
    }, 200);
});

/* var slow = document.querySelector(".scroll");
var elem = slow.firstElementChild;
var h = slow.scrollHeight * 2 - slow.clientHeight;
slow.insertAdjacentHTML(
  'afterbegin',
  "<div class='size-doubler' style='height:" + h + "px; float: right;'></div>"
);
slow.addEventListener('scroll', function () {
  elem.style.transform = 'translateY(' + slow.scrollTop / 1.5 + 'px)';
}) */

let lastHeight = 0;
$(".scroll").on("scroll", scrolling);
function scrolling() {
    var currentHeight = $(this).children(".library-out").height();
    if ($(this).scrollTop() >= currentHeight - $(this).height() - 250 && lastHeight != currentHeight) {
        $(this).unbind("scroll");
        loader();
        lastHeight = currentHeight;
    }
}
function loader() {
    $.ajax({
        type: "POST",
        url: "https://ntwredux.ru/generate.php",
        data: {
            type: "modsoffset",
            count: count,
            begin: begin * count,
        },
        success: onAjaxSuccess,
    });
    function onAjaxSuccess(data) {
        $(".library-out").append(data);
        setTimeout(() => {
            $(".library-out").css("opacity", 1.0);
        }, 500);
        $(".scroll").on("scroll", scrolling);
    }
    begin++;
}

$(function(){
        $("a[href^='mods#']").click(function(){
                var _href = $(this).attr("href").replace('mods', '');
                $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
                return false;
        });
});