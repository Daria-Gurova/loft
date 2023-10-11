// Здесь делаем для раскрытия меню при нажатии на бургер (и закрытия меню при нажатии на крестик)
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

hamburger.addEventListener('click', (event) => {event.preventDefault(), toggleMenu()});

// Здесь для секции reviews

const findBlockByAlias = alias => {
    return $(".reviews__item").filter((ndx, item) => {
        return $(item).attr("data-linked-with") === alias
    });
}

$(".interactive-avatar__link").click(e => {
    e.preventDefault();
    const $this = $(e.currentTarget);
    const target = $this.attr("data-open");
    const itemToShow = findBlockByAlias(target)
    const curItem = $this.closest(".interactive-avatar");

    itemToShow.addClass("active").siblings().removeClass("active");
    curItem.addClass("active").siblings().removeClass("active");  
});

// Здесь для секции team

const openItem = item => {
    const container = item.closest(".team__item");
    const contentBlock = container.find(".team__content");
    const textBlock = contentBlock.find(".team__content-block");
    const reqHeight = textBlock.height();
    
    container.addClass("active");
    contentBlock.height(reqHeight);
}

const closeItem = container => {
    const items = container.find(".team__content");
    const itemContainer = container.find(".team__item");
    itemContainer.removeClass("active");
    items.height(0);
}

$(".team__title").click(e => {
    e.preventDefault();
    const $this = $(e.currentTarget);
    const container = $this.closest(".team");
    const elemContainer = $this.closest(".team__item");

    if (elemContainer.hasClass("active")) {
        closeItem(container);
    } else {
        closeItem(container); 
        openItem($this);
    }
});

// Здесь для слайдера

const slider = $(".shop__list-container").bxSlider({
    pager: false,
    controls: false
});

$("#left").click(e => {
    e.preventDefault();
    slider.goToPrevSlide();
});

$("#right").click(e => {
    e.preventDefault();
    slider.goToNextSlide();
});

// Здесь для формы

$(".form").submit(e =>  {
    e.preventDefault();

    $.fancybox.open({
        src: "#modal",
        type: "inline"
    })
});