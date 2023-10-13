// Здесь делаем для раскрытия меню при нажатии на бургер (и закрытия меню при нажатии на крестик)
const hamburger = document.querySelector('#hamburger');
const overlay = document.querySelector('#overlay');
const body = document.querySelector('body');
const link = document.querySelectorAll('.overlay .menu__link');

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
    const red = container.find(".team__red");
    
    container.addClass("active");
    contentBlock.height(reqHeight);
    red.css("transform","rotate(180deg)");
}

const closeItem = container => {
    const red = container.find(".team__red");
    const items = container.find(".team__content");
    const itemContainer = container.find(".team__item");
    itemContainer.removeClass("active");
    items.height(0);
    red.css("transform","rotate(360deg)");
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

const modal = document.querySelector(".modal"); // все модальное окно
const modalOpen = document.querySelector("#modal-open") // кнопка Заказать
const modalClose = modal.querySelector(".app-close-modal"); // кнопка Закрыть

const closeModalByEsc = event => {
    if (event.key === 'Escape') { 
        const modalActived = document.querySelector('.modal_active'); 
        closePopup(modalActived); 
   };
};


// функция, которая добавляет модификатор modal_active, чтобы открыть модальное окно
function openPopup(modalOpen) {
    modalOpen.classList.add('modal_active');
};

//функция, которая удаляет модификатор modal_active, чтобы закрыть модальное окно
function closePopup(modalClosed) {
    modalClosed.classList.remove('modal_active');
};

// Открытие модального онка при нажатии на Заказать
modalOpen.addEventListener('click', function() {
    openPopup(modal);
    document.addEventListener('keydown', closeModalByEsc); 
});

// Закрытие модального окна при нажатии на Закрыть

modalClose.addEventListener('click', function() {
    closePopup(modal);
    document.removeEventListener('keydown', closeModalByEsc);
  });
  
// Закрытие попап по нажатию Esc
  
document.addEventListener('click', function(event) { 
    if (event.target.classList.contains('modal')) { 
        closePopup(event.target); 
    } 
});
  
// Закрытие попап по клику на overlay
  
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        closePopup(event.target);
    }
});

// Валидация формы

const validateFields = (form, fieldsArray) => {
    fieldsArray.forEach(field => {
        field.removeClass('input-error');
        if (field.val().trim() === "") {
            field.addClass('input-error');
        }
    })

    const errorFields = form.find('.input-error');

    return errorFields.length === 0;
}

$('.form').submit(e => {
    e.preventDefault();

    const form = $(e.currentTarget);
    const name = form.find("[name = 'name']");
    const phone = form.find("[name = 'phone']");
    const comment = form.find("[name = 'comment']");
    const to = form.find("[name = 'to']");

    const isValid = validateFields(form, [name, phone, comment, to]);

    if (isValid) {
        $.ajax({
            url: "https://webdev-api.loftschool.com/sendmail",
            method: "post",
            data: {
                name: name.val(),
                phone: phone.val(),
                comment: comment.val(),
                to: to.val()
            }
        })
    }
});

// Здесь для карты

let myMap;

const init = () => {
    myMap = new ymaps.Map("map", {
        center: [37.385534, 55.584227],
        zoom: 11,
        controls: []
    });

    const coords = [
        [55.75, 37.50],
        [55.75, 37.71],
        [55.70, 37.70]
    ];
    
    const myCollection = new ymaps.GeoObjectCollection({}, {
        preset: 'islands#redIcon',
        draggable: false,
        iconLayout: 'default#image',
        iconImageHref: './pictures/map/marker.png',
        icon_imagesize: [35, 63],
        iconImageOffset: [-35, -63]
    });
    
    coords.forEach(coord => {
        myCollection.add(new ymaps.Placemark(coord));
    })
    
    myMap.geoObjects.add(myCollection);

    myMap.behaviors.disable('scrollZoom');  
}

ymaps.ready(init);