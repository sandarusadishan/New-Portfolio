var typed = new Typed(".text", {
    strings: ["Fullstack Developer", "YouTuber,", "Web Developer","Mobile Application Developer"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});
window.onscroll = function() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        document.querySelector('.header').classList.add('scrolled');
    } else {
        document.querySelector('.header').classList.remove('scrolled');
    }
};
