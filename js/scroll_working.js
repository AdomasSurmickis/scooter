$(document).ready(function () {
    var divs = $('.section');
    for (let i = 1; i <= divs.length; i++) {
        SCREEN_SCROLL_TOP_CONSTANTS[i] = $('#sec' + i).offset().top.toFixed();
    }
    currentScreenTarget = {
        1: SCREEN_SCROLL_TOP_CONSTANTS[1], reached: true,
    }
});
var sections = $('.section');
var currentIndex = 1;
var lastScroll = 0;
var targetScroll = -1;
var call = {}
var IS_ANIMATING = false;
var WINDOW = $(window);
var currentScreenTarget = {};
var previousIndex = -1;
var SCREEN_SCROLL_TOP_CONSTANTS = {};
var lastScrollTime = Date.now();
var IS_SCROLLING_TO_LAST = false;

function sleep(ms) {
    return new Promise(
        resolve => setTimeout(resolve, ms)
    );
}

async function doScroll() {
    const sleepTime = 100;
    const stepSize = 300;
    IS_ANIMATING = true;
    var scrollTo = Number.parseInt(SCREEN_SCROLL_TOP_CONSTANTS[currentIndex]);
    let from = Number.parseInt(WINDOW.scrollTop().toFixed());
    if (from > scrollTo) {
        while (from > scrollTo) {
            await sleep(sleepTime);
            if (from - scrollTo < stepSize) {
                if (!IS_SCROLLING_TO_LAST) {
                    IS_SCROLLING_TO_LAST = true;
                    WINDOW.scrollTop(from - (from - scrollTo));
                }
            } else {
                WINDOW.scrollTop(from - stepSize);
                IS_SCROLLING_TO_LAST = false;
            }
            from = Number.parseInt(WINDOW.scrollTop().toFixed());
        }
    } else {
        while (scrollTo > from) {
            await sleep(sleepTime);
            if (scrollTo - from < stepSize) {
                if (!IS_SCROLLING_TO_LAST) {
                    IS_SCROLLING_TO_LAST = true;
                    WINDOW.scrollTop(from + (scrollTo - from));
                }
            } else {
                WINDOW.scrollTop(from + stepSize);
                IS_SCROLLING_TO_LAST = false;
            }
            from = Number.parseInt(WINDOW.scrollTop().toFixed());
        }

    }

    IS_ANIMATING = false;
    currentScreenTarget.reached = true;
    lastScroll = WINDOW.scrollTop().toFixed();
    lastScrollTime = Date.now();
    currentScreenTarget.animationFinishTime = Date.now();
}

$(document).ready(function () {
    window.addEventListener('scroll', scrollHandler);

    async function scrollHandler(event) {
        event.preventDefault();
        if (IS_ANIMATING) {
            return;
        }

        if (!IS_ANIMATING) {
            if (lastScrollTime + 100 > Date.now()) {
                lastScroll = WINDOW.scrollTop().toFixed();
                return;
            }
        }

        if (!IS_ANIMATING) {
            previousIndex = currentIndex;
            let isUp = WINDOW.scrollTop().toFixed() <= lastScroll;
            const currScrollTop = WINDOW.scrollTop().toFixed();
            if (currScrollTop - currentScreenTarget[currentIndex] < 50 || currentScreenTarget[currentIndex] - currScrollTop < 50) {
                currentIndex = currentIndex + (isUp ? -1 : 1);
                if (currentIndex < 1 || currentIndex > sections.length) {
                    currentIndex = previousIndex;
                    return;
                }
                currentScreenTarget = {
                    [currentIndex]: SCREEN_SCROLL_TOP_CONSTANTS[currentIndex],
                    reached: false,
                    direction: isUp
                };
                targetScroll = SCREEN_SCROLL_TOP_CONSTANTS[currentIndex]
                if (previousIndex !== currentIndex) {
                    await doScroll();
                }
            }
            setTagToActive(currentIndex, sections.length);
        }
    }
})

function setTagToActive(currentPage, pageCount) {
    $('#tag' + currentPage).addClass('active');
    for (var i = 1; i <= pageCount; i++) {
        if (i !== currentPage) {
            $('#tag' + i).removeClass('active');
        }
    }
}
