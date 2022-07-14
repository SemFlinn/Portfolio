// Скрол для хедера
//Находим хедер
const header = document.querySelector('.header');
//Находим контент
const page = document.querySelector('.page');
//Находим высоту хедера
const headerHeight = header.offsetHeight;
//Находим высоту контента
const contentHeight = page.offsetHeight;
//
let lastScrollTop = 0;


//Обрабатываем событие скролл
window.addEventListener('scroll', () => {
    //Создадим переменную скроллДистанс
    let scrollDistance = window.scrollY;

    //Если
    if (scrollDistance > lastScrollTop) {
        //Убираем у хедера класс 
        header.classList.remove('header__fixed');

        page.classList.remove('page__fixed');
        //Зазмер отступа контента равен нулю
        page.style.marginTop = null;
    //Иначе
    } else {
        //Добавляем хедеру класс
        header.classList.add('header__fixed');

        page.classList.add('page__fixed');
        //Зазмер отступа контента равен высоте хедера
        page.style.marginTop = '${headerHeight}px';
    }
    //
    lastScrollTop = scrollDistance
});