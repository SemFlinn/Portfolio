"use strict";
//Код определяет на каком устройстве открыт сайт

const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iOS/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows());  
    }
};
//==================================================================================================================================
//==================================================================================================================================
//Вешаем актив при клике по блоку со стрелкой
const menuLinkArrow0 = document.querySelector('.menu__link_arrow0');
const menuSubList0 = document.querySelector('.menu__sub-list0');
const menuArrow0 = document.querySelector('.menu__arrow0');
if (menuLinkArrow0){
    menuLinkArrow0.addEventListener("click", function(e) {
        //document.body.classList.toggle('_lock');
        menuLinkArrow0.classList.toggle('_active');
        menuSubList0.classList.toggle('_active');
        menuArrow0.classList.toggle('_active');
    });
}

// скрываем элемент т к клик был за его пределами 
document.addEventListener( 'click', (e) => {
    const withinBoundaries = e.composedPath().includes(menuLinkArrow0);
 
    if ( ! withinBoundaries ) {
        menuLinkArrow0.classList.remove('_active');
        menuSubList0.classList.remove('_active');
        menuArrow0.classList.remove('_active'); 
    }
})

//Вешаем актив при клике по блоку со стрелкой
const menuLinkArrow1 = document.querySelector('.menu__link_arrow1');
const menuSubList1 = document.querySelector('.menu__sub-list1');
const menuArrow1 = document.querySelector('.menu__arrow1');
if (menuLinkArrow1){
    menuLinkArrow1.addEventListener("click", function(e) {
        //document.body.classList.toggle('_lock');
        menuLinkArrow1.classList.toggle('_active');
        menuSubList1.classList.toggle('_active');
        menuArrow1.classList.toggle('_active');
    });
}

// скрываем элемент т к клик был за его пределами 
document.addEventListener( 'click', (e) => {
    const withinBoundaries = e.composedPath().includes(menuLinkArrow1);
 
    if ( ! withinBoundaries ) {

        menuLinkArrow1.classList.remove('_active');
        menuSubList1.classList.remove('_active');
        menuArrow1.classList.remove('_active'); 
    }
})

//Вешаем актив при клике по блоку со стрелкой
const menuLinkCheck = document.querySelector('.menu__link_check');
const menuLinkSubcheck = document.querySelector('.menu__link_subcheck');
const menuArrow2 = document.querySelector('.menu__arrow2');
const head = document.querySelector('.header');
if (menuLinkCheck){
    menuLinkCheck.addEventListener("click", function(e) {
        //document.body.classList.toggle('_lock');
        menuLinkCheck.classList.toggle('_active');
        menuLinkSubcheck.classList.toggle('_active');
        menuArrow2.classList.toggle('_active');
        header.classList.toggle('_bef');
    });
}

// скрываем элемент т к клик был за его пределами 
document.addEventListener( 'click', (e) => {
    const withinBoundaries = e.composedPath().includes(menuLinkCheck);
 
    if ( ! withinBoundaries ) {

        menuLinkCheck.classList.remove('_active');
        menuLinkSubcheck.classList.remove('_active');
        menuArrow2.classList.remove('_active'); 
        header.classList.remove('_bef');
    }
})


//===========================================================================================================================================
/*if (isMobile.any()) {// Если мобильное разрешение 
    //document.body.classList.add('_touch');//body вешаем класс ('_touch')
    //Родителю стрелки при клике вешаем active
    let menuArrows = document.querySelectorAll('.menu__link');
    if (menuArrows.length > 0){
        for (let index = 0; index < menuArrows.length; index++) {
            const menuArrow = menuArrows[index];
            menuArrow.addEventListener("click", function(e){
                menuArrow.parentElement.classList.toggle('_active');
            });
        }
    }

}  else {//Иначе
    document.body.classList.add('_pc');//body вешаем класс ('_pc')  
} */
//==============================================================================================================================================
//Бургер
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
if (iconMenu){
    iconMenu.addEventListener("click", function(e) {
        document.body.classList.toggle('_lock');
        iconMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
    });
}
//=================================================================================================================================================
// Класс для перевода url картинки в backgraund картинки
window.onload = function ibg() {
        let ibg = document.querySelectorAll(".ibg");
        for (var i = 0; i < ibg.length; i++) {
        if(ibg[i].querySelector('img')) {
            ibg[i].style.backgroundImage = 'url('+ibg[i].querySelector('img').getAttribute('src')+')';
        }
    }
}

ibg();


//===============================================================================================================================
//document.cookie//РАЗОБРАТЬ ЭТУ ТЕМУ
//===============================================================================================================================
const img = document.querySelector('img');
window.onload = img;
