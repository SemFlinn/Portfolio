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
function ibg() {
        let ibg = document.querySelectorAll(".ibg");
        for (var i = 0; i < ibg.length; i++) {
        if(ibg[i].querySelector('img')) {
            ibg[i].style.backgroundImage = 'url('+ibg[i].querySelector('img').getAttribute('src')+')';
        }
    }
}

ibg();


//===============================================================================================================================
(function (root, factory) {
    if (typeof exports === "object") {
        module.exports = factory(root);
    } else if (typeof define === "function" && define.amd) {
        define([], factory);
    } else {
        root.LazyLoad = factory(root);
    }
}) (typeof global !== "undefined" ? global : this.window || this.global, function (root) {

    "use strict";

    if (typeof define === "function" && define.amd){
        root = window;
    }

    const defaults = {
        src: "data-src",
        srcset: "data-srcset",
        selector: ".lazyload",
        root: null,
        rootMargin: "0px",
        threshold: 0
    };

    /**
    * Merge two or more objects. Returns a new object.
    * @private
    * @param {Boolean}  deep     If true, do a deep (or recursive) merge [optional]
    * @param {Object}   objects  The objects to merge together
    * @returns {Object}          Merged values of defaults and options
    */
    const extend = function ()  {

        let extended = {};
        let deep = false;
        let i = 0;
        let length = arguments.length;

        /* Check if a deep merge */
        if (Object.prototype.toString.call(arguments[0]) === "[object Boolean]") {
            deep = arguments[0];
            i++;
        }

        /* Merge the object into the extended object */
        let merge = function (obj) {
            for (let prop in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                    /* If deep merge and property is an object, merge properties */
                    if (deep && Object.prototype.toString.call(obj[prop]) === "[object Object]") {
                        extended[prop] = extend(true, extended[prop], obj[prop]);
                    } else {
                        extended[prop] = obj[prop];
                    }
                }
            }
        };

        /* Loop through each object and conduct a merge */
        for (; i < length; i++) {
            let obj = arguments[i];
            merge(obj);
        }

        return extended;
    };

    function LazyLoad(images, options) {
        this.settings = extend(defaults, options || {});
        this.images = images || document.querySelectorAll(this.settings.selector);
        this.observer = null;
        this.init();
    }

    LazyLoad.prototype = {
        init: function() {

            /* Without observers load everything and bail out early. */
            if (!root.IntersectionObserver) {
                this.loadImages();
                return;
            }

            let self = this;
            let observerConfig = {
                root: this.settings.root,
                rootMargin: this.settings.rootMargin,
                threshold: [this.settings.threshold]
            };

            this.observer = new IntersectionObserver(function(entries) {
                Array.prototype.forEach.call(entries, function (entry) {
                    if (entry.isIntersecting) {
                        self.observer.unobserve(entry.target);
                        let src = entry.target.getAttribute(self.settings.src);
                        let srcset = entry.target.getAttribute(self.settings.srcset);
                        if ("img" === entry.target.tagName.toLowerCase()) {
                            if (src) {
                                entry.target.src = src;
                            }
                            if (srcset) {
                                entry.target.srcset = srcset;
                            }
                        } else {
                            entry.target.style.backgroundImage = "url(" + src + ")";
                        }
                    }
                });
            }, observerConfig);

            Array.prototype.forEach.call(this.images, function (image) {
                self.observer.observe(image);
            });
        },

        loadAndDestroy: function () {
            if (!this.settings) { return; }
            this.loadImages();
            this.destroy();
        },

        loadImages: function () {
            if (!this.settings) { return; }

            let self = this;
            Array.prototype.forEach.call(this.images, function (image) {
                let src = image.getAttribute(self.settings.src);
                let srcset = image.getAttribute(self.settings.srcset);
                if ("img" === image.tagName.toLowerCase()) {
                    if (src) {
                        image.src = src;
                    }
                    if (srcset) {
                        image.srcset = srcset;
                    }
                } else {
                    image.style.backgroundImage = "url('" + src + "')";
                }
            });
        },

        destroy: function () {
            if (!this.settings) { return; }
            this.observer.disconnect();
            this.settings = null;
        }
    };

    root.lazyload = function(images, options) {
        return new LazyLoad(images, options);
    };

    if (root.jQuery) {
        const $ = root.jQuery;
        $.fn.lazyload = function (options) {
            options = options || {};
            options.attribute = options.attribute || "data-src";
            new LazyLoad($.makeArray(this), options);
            return this;
        };
    }

    return LazyLoad;
});
//===============================================================================================================================

