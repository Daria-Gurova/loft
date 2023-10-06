const hamburger = document.querySelector('#hamburger');
console.log(hamburger);
const overlay = document.querySelector('#overlay');
console.log(overlay);
const body = document.querySelector('body');
const link = document.querySelectorAll('.overlay .menu__link');
console.log(link);

function toggleMenu() {
    //evt.preventDefault();
    hamburger.classList.toggle('hamburger--active');
    overlay.classList.toggle('overlay--active');
    body.classList.toggle('body--active-menu');
};

link.forEach(function(element) {
    element.addEventListener('click', toggleMenu);
});

hamburger.addEventListener('click', (event) =>{event.preventDefault(), toggleMenu()});
