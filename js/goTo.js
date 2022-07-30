function handleNavClicked(number) {
    console.log(number);

    currentIndex = number;
    doScroll();
}


function goTop() {
    window.removeEventListener('scroll', scrollHandler);
    WINDOW.scrollTop(0);
    setTimeout(() => {
        window.addEventListener('scroll', scrollHandler);
    }, 1000)
    currentIndex = 1;
    currentScreenTarget.reached = true;

    currentScreenTarget = {
        [currentIndex]: SCREEN_SCROLL_TOP_CONSTANTS[currentIndex],
        reached: true,
    };

    setTagToActive(currentIndex, sections.length);

}
