
const GalleryClassName = 'gallery';//(9) Создаем переменную gallery(общий контейнер)
const GalleryDraggableClassName = 'gallery-draggable';//(96) Создаем переменную gallery-draggable(перетаскиваемый элемент)
const GalleryLineClassName = 'gallery-line';//(10) Создаем переменную gallery-line(контейнер для слайдов)
const GallerySlideClassName = 'gallery-slide';//(11) Создаем переменную gallery-slide(слайд)
const GalleryDotsClassName = 'gallery-dots';//(102) Создаем переменную gallery-dots(контейнер для точек)
const GalleryDotClassName = 'gallery-dot';//(103) Создаем переменную gallery-dot(точки)
const GalleryDotActiveClassName = 'gallery-dot-active';//(104) Создаем переменную gallery-dot-active(фстивная точка)
const GalleryNavClassName = 'gallery-nav';//(105) Создаем переменную gallery-nav(контейнер для стрелок)
const GalleryNavLeftClassName = 'gallery-nav-left';//(106) Создаем переменную gallery-nav-left(левая стрелка)
const GalleryNavRightClassName = 'gallery-nav-right';//(107) Создаем переменную gallery-nav-right(правая стрелка)

class Gallery {//(1) Создаём класс Gallery 
	constructor(element, options = {}) {//(2) Объявляем конструктор (передаём ему Gallery(element)) добавляем опции
		this.containerNode = element;//(3) Объявляем this.containerNode куда сохраняем елемент
		this.size = element.childElementCount;//(4) Задаем размер элементу(element) через количество дочерних элементов (childElementCount)
		this.currentSlide = 0;//(5) Первый слайд нулевой
		this.currentSlideWasChanged = false;//(82)текущийСлайдБылИзменен(currentSlideWasChanged) ложь
		this.settings = {//(91)Устанавливаем настройки(settings)
			margin: options.margin || 0//(92)Передаем в настройки margin из опцый(options) по умолчанию margin = 0
		}

        // Чтоб при вызове методов не слетали контексты (например если методы вызываются в событиях) 
        // переопределяем метод и добовляем bind(this). Тем самым методы всегда будут точно вызыватся с контекстом (this)
		this.manageHTML = this.manageHTML.bind(this);//(8)
		this.setParameters = this.setParameters.bind(this);//(27)
		this.setEvents = this.setEvents.bind(this);//(35)
		this.resizeGallery = this.resizeGallery.bind(this);//(39)
		this.startDrag = this.startDrag.bind(this);//(52)
		this.stopDrag = this.stopDrag.bind(this);//(53)
		this.dragging = this.dragging.bind(this);//(56)
		this.setStylePosition = this.setStylePosition.bind(this);//(65)
		this.clickDots = this.clickDots.bind(this);//(121)
		this.moveToLeft = this.moveToLeft.bind(this);//(122)
		this.moveToRight = this.moveToRight.bind(this);//(123)
		this.changeCurrentSlide = this.changeCurrentSlide.bind(this);//
		this.changeAcniveDotClass = this.changeAcniveDotClass.bind(this);//(153)
		


		this.manageHTML();//(6) Вызываем метод управлятьHTML
		this.setParameters();//(26) Объявляем новый метод (установитьПараметры) также передаем контекст this
		this.setEvents();//(34) Объявляем новый метод (установитьСобытия) также передаем контекст this

	}

	manageHTML() {//(7) Делаем все необходимые объвертки
		this.containerNode.classList.add(GalleryClassName);//(12) Добовляем в HTML GalleryClassName(class="gallery")
		//(13) Изменяем внутренний HTML елемента через innerHTML добовляем: GalleryLineClassName (обвертка для слайдов)
		//(101) Добовляем классы для стрелок и точек
		this.containerNode.innerHTML = `
	        <div class="${GalleryLineClassName}">
	            ${this.containerNode.innerHTML}
	        </div>
	        <div class="${GalleryNavClassName}">
	            <button class="${GalleryNavLeftClassName}">Left</button>
	            <button class="${GalleryNavRightClassName}">Right</button>
	        </div>
	        <div class="${GalleryDotsClassName}"></div>
		`;//
		this.lineNode = this.containerNode.querySelector(`.${GalleryLineClassName}`);//(14) Получаем линию в javaScript
		this.dotsNode = this.containerNode.querySelector(`.${GalleryDotsClassName}`);//(108)Определяем this.dotsNode (родитель в которо находятся все точки)

        //(15)Определяем slideNodes
		this.slideNodes = Array.from(this.lineNode.children).map((childNode) =>//(16)Делаем масив из всех дочерних элементов (слайдов)
			wrapElementByDiv({//(17)Вызываем функцию обернуть элемент в див(функция будет вызывать новую обвернутую ноду)
				element: childNode,//(18)Передаем елементу дочернии элементы
				className: GallerySlideClassName//(19)Передаем className переменную слайда
			})
		);

        //(109)Изменяем внутренний HTML елемента через innerHTML(что бы добавить точки gallery-dots)
		this.dotsNode.innerHTML = Array.from(Array(this.size).keys()).map((key) => (//(109)Создаем масив который сформирует столько точек сколько слайдов
			`<button class="${GalleryDotClassName} ${key === this.currentSlide ? 
			GalleryDotActiveClassName : '' }"></button>`//(110)Определяем кнопки которые будут отвечать за точки и добавляем активную
		)).join('');//(111)Получаем строку из кнопок методом присоединиться(join) по пустой строке

		this.dotsNodes = this.dotsNode.querySelectorAll(`.${GalleryDotClassName}`);//(112)Получаем в javaScript
		this.navLeft = this.containerNode.querySelector(`.${GalleryNavLeftClassName}`);//(113)Получаем в javaScript
		this.navRight = this.containerNode.querySelector(`.${GalleryNavRightClassName}`);//(114)Получаем в javaScript
	}

	setParameters(){//(28) установитьПараметры
		const coordsContainer = this.containerNode.getBoundingClientRect();//(29) Находим ширину контейнера галереи определяем его через метод получитьОграничивающийКлиентскийПрямоугольник 
		this.width = coordsContainer.width;//(30) Полученную ширину присваиваем ширине переменной coordsContainer
		this.maximumX = -(this.size -1) * (this.width + this.settings.margin);//(90)maximumX = количество слайдов - 1 * (на ширину) + margin
		this.x = -this.currentSlide * (this.width + this.settings.margin);//(66)Отдельное свойство клвсса X(которое будет задавать сдвиг линии) + margin

        this.resetStyleTransition();//(96)сбрасываемПереходСтиля
        //(31)Устанавливаем ширину контейнера со слайдами(lineNode) она равна количество элементов (this.size) * на ширину (this.width)
		this.lineNode.style.width = `${this.size * (this.width + this.settings.margin)}px`;//(31) Плюс добавляем внешний отступ (this.settings.margin) 
		this.setStylePosition();//(97)устанавливаемПозициюСтиля

		Array.from(this.slideNodes).forEach((slideNode) => {//(32) Для всех дочерних элементов slideNodes
			slideNode.style.width = `${this.width}px`;//(33) Задаем ширину каждому слайду
			slideNode.style.marginRight = `${this.settings.margin}px`;//(93)Устанавливаем отступ всем слайдам
		});
	}

	setEvents() {//(36) установитьСобытия
		this.debounceResizeGallery = debounce(this.resizeGallery);//(48)
		//(37) Определяем метод изменение размера (resize) на виндов
		window.addEventListener('resize', debounce(this.resizeGallery));//(41)опровергать(debounce)нужен чтоб реже пересчитывать resize
		this.lineNode.addEventListener('pointerdown', this.startDrag);//(50) Вызываем метод startDrag при нажатой кнопке мыши
		window.addEventListener('pointerup', this.stopDrag);//(51) Вызываем метод stopDrag при не нажатой кнопке мыши
		window.addEventListener('pointercancel', this.stopDrag);//(99)Добавляем событие указатель отмена(pointercancel) для удаления багов
        

        this.dotsNode.addEventListener('click', this.clickDots);//(115)Объявляем функцию клик для добавления событий
        this.navLeft.addEventListener('click', this.moveToLeft);//(116)Объявляем функцию клик для добавления событий
        this.navRight.addEventListener('click', this.moveToRight);//(117)Объявляем функцию клик для добавления событий

	}

	destroyEvents() {//(47) уничтожитьСобытие
		window.removeEventListener('resize', this.debounceResizeGallery);//(49)
		this.lineNode.removeEventListener('pointerdown', this.startDrag);//(94)Удаляем метод startDrag
		window.removeEventListener('pointerup', this.stopDrag);//(95)Удаляем метод stopDrag
		window.removeEventListener('pointercancel', this.stopDrag);//(100)Удаляем событие указатель отмена(pointercancel)

		this.dotsNode.removeEventListener('click', this.clickDots);//(118)Удаляем события клика
        this.navLeft.removeEventListener('click', this.moveToLeft);//(119)Удаляем события клика
        this.navRight.removeEventListener('click', this.moveToRight);//(120)Удаляем события клика
	}

	resizeGallery() {//(38) Изменить размер галереи
		this.setParameters();//(40) устанавливаемПараметры (пофакту пересчитываем ширину основного кантейнера и ширину внутренних слайдов) 
	}

	startDrag(evt) {//(54)
		this.currentSlideWasChanged = false;//(81)текущийСлайдБылИзменен(currentSlideWasChanged) ложь
		this.clickX = evt.pageX;//(59)Определяем координаты по оси X при клике
		this.startX = this.x;//(67)Сохраняем прошлую стартовую позицию на которой закончили

		this.resetStyleTransition();//(85)сбрасываемПереходСтиля

        //(55) Добавляем событие перемещение указателя (pointermove) в нее передаем событие this.dragging
		window.addEventListener('pointermove', this.dragging);//(55) в перетаскивание(this.dragging) будут производится все основные расчеты
		this.containerNode.classList.add(GalleryDraggableClassName);//(97)Когда галерея тянится добавляем ей класс (gallery-draggable) 
	}

	stopDrag() {//(57)
		window.removeEventListener('pointermove', this.dragging);//(58)Удаляем событие перемещение указателя (pointermove)
		this.containerNode.classList.remove(GalleryDraggableClassName);//(98)Когда галерея остановилась убираем класс (gallery-draggable) 
		this.changeCurrentSlide()//(131)
	}

	dragging(evt) {//
		this.dragX = evt.pageX;//(60) Определяем dragX
		const dragShift = this.dragX -this.clickX;//(61)Объявляем переменную перетаскиваемыйСдвиг(dragShift)
		//(88)this.setStylePosition(dragShift);
		const easing = dragShift / 5;//(88)Обьявляем переменную ослабление(easing) = перетаскиваемыйСдвиг(dragShift) / 5
		this.x = Math.max(Math.min(this.startX + dragShift, easing), this.maximumX + easing);//(89)Определяем первый и последний слайд и добовляем ослабление (+ easing)

		this.setStylePosition();//(62)устанавливаемПозициюСтиля

		// Chenge active slide
		if (//(68)Если
			dragShift > 10 &&//(69)перетаскиваемыйСдвиг(dragShift) больше 10 и 
			dragShift > 0 &&//(70)перетаскиваемыйСдвиг(dragShift) больше 0 и 
			!this.currentSlideWasChanged &&//(73)Не текущийСлайдБылИзменен(currentSlideWasChanged) нужен для того чтоб условие сработало один раз(по умолчанию folse ложный)
			this.currentSlide > 0//(71)текущийСлайд(currentSlide) больше 0
		) {
			this.currentSlideWasChanged = true;//(74)текущийСлайдБылИзменен(currentSlideWasChanged) правда
			this.currentSlide = this.currentSlide - 1;//(72)Отнимаем слайд
		}

		if (//(74)Если
			dragShift < -10 &&//(75)перетаскиваемыйСдвиг(dragShift) меньше -10 и 
			dragShift < 0 &&//(76)перетаскиваемыйСдвиг(dragShift) меньше 0 и
			!this.currentSlideWasChanged &&//(77)Не текущийСлайдБылИзменен(currentSlideWasChanged) нужен для того чтоб условие сработало один раз(по умолчанию folse ложный)
			this.currentSlide < this.size - 1//(78)текущийСлайд(currentSlide) меньше -1
		) {
			this.currentSlideWasChanged = true;//(79)текущийСлайдБылИзменен(currentSlideWasChanged) правда
			this.currentSlide = this.currentSlide + 1;//(80)Прибавляем слайд
		}

		//if (this.currentSlide <= 0) {/////////////////////////////////////
			//this.currentSlide = 3;//////////////////////////////////
		//}

		//if (this.currentSlide >= this.size - 1) {///////////////////////////////////
			//this.currentSlide = 1;////////////////////////////////////
		//}
	}

	clickDots(evt) {//(124)Метод нажмитеНаКнопки (событие evt) 
		//(139)Определяем в dotNode элемент по которому был произведен клик(evt.target)
		const dotNode = evt.target.closest('button');//(139)Объявляем метод (closest) для поиска ближайшего родителя по силектору(button)
		if (!dotNode) {//(140)Если в dotNode ничего нет(клик был не по кнопке)
			return;//(141)Возвращаем(ничего не делаем)
		}
        //Определяем порядковый номер точки по которой был клик
		let dotNumber;//(142)Объявляем переменную (dotNumber)
		for(let i = 0; i < this.dotsNodes.length; i++) {//(143)Цыкл для(for) по цыклу проходим от 0 до количества точек
			if(this.dotsNodes[i] === dotNode) {//(144)Если текущая точка === той по которой кликнули
				dotNumber = i;//(145)Сохраняем dotNumber = ключю
				break;//(146)Прерываем цыкл
			}
		}

		if (dotNumber === this.currentSlide) {//(147)Если полученный ключ === текущему слайду
			return;//(148)Возвращаем(ничего не делаем)
		}
        //(157)Выравниваем време перехода между слайдами вызванными точками
        const countSwipes = Math.abs(this.currentSlide - dotNumber);//(157)От текущего слайда(currentSlide) отнимаем номер точки(dotNumber)
		this.currentSlide = dotNumber;//(149)Иначе в текущий слайд сохраняем номер точки
		this.changeCurrentSlide(countSwipes);//(150)Вызываем функцию сменитьТекущийСлайд(changeCurrentSlide)
	}

	moveToLeft() {//(125)Метод двигатьсяВлево
		if (this.currentSlide <= 0) {//(135)Если текущийСлайд <= 0
			
			//return;//(136)Возвращаем(ничего не делаем)
			this.currentSlide = 3;//////////////////////////////
		}
		//if (this.currentSlide <= 1) {//Если текущийСлайд <= 1///////////////////////////////////
			//this.navLeft.style.display = `none`;//Убираем стрелку влево//////////////////////////
		//}
		
		this.currentSlide = this.currentSlide - 1;//(137)В противном случае уменьшаем текущий слайд на единицу
		this.changeCurrentSlide();//(138)Изменить текущий слайд
		this.navRight.style.display = `block`;//Добавляем стрелку вправо////////////////////////////////
        


	}

	moveToRight() {//(126)Метод двигатьсяВправо
		if (this.currentSlide >= this.size - 1) {//(127)Если текущий слайд >= ширина линии -1
            
			//return;//Возвращаем(ничего не делаем)
			this.currentSlide = -1;//////////////////////////////////////////////
		}
        
        //if (this.currentSlide >= this.size - 2) {//Если текущий слайд >= ширина линии -2//////////////////////
        	//this.navRight.style.display = `none`;//Убираем стрелку вправо////////////////////////
        //}
        


		this.currentSlide = this.currentSlide + 1;//(128)В противном случае увеличиваем текущий слайд на единицу
		this.changeCurrentSlide();//(129)Изменить текущий слайд
		this.navLeft.style.display = `block`;//Добавляем стрелку влево///////////////////////////
	}
    
    

	changeCurrentSlide(countSwipes) {//(130)Изменить текущий слайд
		this.x = -this.currentSlide * (this.width + this.settings.margin);//(132) x = текущийСлайд * (ширину + отступ)
		this.setStyleTransition(countSwipes);//(134)устанавливаемПереходСтиля
		this.setStylePosition();//(133)устанавливаемПозицыюСтиля
		this.changeAcniveDotClass();//(151)сменаКлассаАктивнойТочке
		//this.setStyleTransitionEnd();
	}


	changeAcniveDotClass() {//(152)Задаем метод сменаКлассаАктивнойТочке
		for(let i = 0; i < this.dotsNodes.length; i++) {//(154))Цыкл для(for) по цыклу проходим от 0 до количества точек
			this.dotsNodes[i].classList.remove(GalleryDotActiveClassName);//(155)Удаляем у всех точек класс GalleryDotActiveClassName(gallery-dot-active)
		}

		this.dotsNodes[this.currentSlide].classList.add(GalleryDotActiveClassName);//(156)Точке привязанной к текущему слайду добавляем класс GalleryDotActiveClassName(gallery-dot-active)
	}

	setStylePosition() {//(63)устанавливаемПозицыюСтиля
		this.lineNode.style.transform = `translate3d(${this.x}px, 0, 0)`;//(64)
	}

	setStyleTransition(countSwipes = 1) {//(83)устанавливаемПереходСтиля
	    this.lineNode.style.transition = `all 0.25s ease 0s`//`all ${0.25 * countSwipes} ease 0s`;//(84)
	}

	/*setStyleTransitionEnd() {//////////////////////////////////
		this.lineNode.transitionend = `all 0s ease 0s`;//////////////////////////////////////////
		console.log(1)////////////////////////////////////////
	}/////////////////////////////////*/

	resetStyleTransition() {//(86)сбрасываемПереходСтиля
		this.lineNode.style.transition = `all 0s ease 0s`;//(87)
	}



}

//Helpers Помошники
function wrapElementByDiv({element, className}) {//(20)Объявляем функцию передаем в нее element и className
	const wrapperNode = document.createElement('div');//(21)Создаем новый элемент 'див'
	wrapperNode.classList.add(className);//(22)Добавляем класс диву 
    
	element.parentNode.insertBefore(wrapperNode, element);//(23)Создаем обвертку используя свойство вставитьПеред
	wrapperNode.appendChild(element);//(24)Создаем обвертку используя свойство добавитьРебенка

	return wrapperNode;//(25)Возвращаем wrapperNode(slideNodes)
}

function debounce(func, time = 100) {//(42) Функция опровергать(debounce) передаем в нее функцию(func) и время(time) = 100мс
	let timer;//(43) Переменная timer
	return function (event) {//(44) Возвращаем функцию которой возвращаем event(прослушивательСобытий(EventListener))
		clearTimeout(timer);//(45) Отчищаем время ожидания(timer)
		timer = setTimeout(func, time, event);//(46)Устанавливаем время ожидания(setTimeout) 100мс
	}
}


new Gallery(document.getElementById('gallery'), {// создаем экземпляр Пallery, передаем обвертку gallery, вызываем через метод getElementById
    margin: 10// Отступ между слайдами
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////gallery2


const GalleryClassName2 = 'gallery2';//(9) Создаем переменную gallery(общий контейнер)
const GalleryDraggableClassName2 = 'gallery-draggable2';//(96) Создаем переменную gallery-draggable(перетаскиваемый элемент)
const GalleryLineClassName2 = 'gallery-line2';//(10) Создаем переменную gallery-line(контейнер для слайдов)
const GallerySlideClassName2 = 'gallery-slide2';//(11) Создаем переменную gallery-slide(слайд)
const GalleryDotsClassName2 = 'gallery-dots2';//(102) Создаем переменную gallery-dots(контейнер для точек)
const GalleryDotClassName2 = 'gallery-dot2';//(103) Создаем переменную gallery-dot(точки)
const GalleryDotActiveClassName2 = 'gallery-dot-active2';//(104) Создаем переменную gallery-dot-active(фстивная точка)
const GalleryNavClassName2 = 'gallery-nav2';//(105) Создаем переменную gallery-nav(контейнер для стрелок)
const GalleryNavLeftClassName2 = 'gallery-nav-left2';//(106) Создаем переменную gallery-nav-left(левая стрелка)
const GalleryNavRightClassName2 = 'gallery-nav-right2';//(107) Создаем переменную gallery-nav-right(правая стрелка)

class Gallery2 {//(1) Создаём класс Gallery 
	constructor(element, options = {}) {//(2) Объявляем конструктор (передаём ему Gallery(element)) добавляем опции
		this.containerNode = element;//(3) Объявляем this.containerNode куда сохраняем елемент
		this.size = element.childElementCount;//(4) Задаем размер элементу(element) через количество дочерних элементов (childElementCount)
		this.currentSlide = 0;//(5) Первый слайд нулевой
		this.currentSlideWasChanged = false;//(82)текущийСлайдБылИзменен(currentSlideWasChanged) ложь
		this.settings = {//(91)Устанавливаем настройки(settings)
			margin: options.margin || 0//(92)Передаем в настройки margin из опцый(options) по умолчанию margin = 0
		}

        // Чтоб при вызове методов не слетали контексты (например если методы вызываются в событиях) 
        // переопределяем метод и добовляем bind(this). Тем самым методы всегда будут точно вызыватся с контекстом (this)
		this.manageHTML = this.manageHTML.bind(this);//(8)
		this.setParameters = this.setParameters.bind(this);//(27)
		this.setEvents = this.setEvents.bind(this);//(35)
		this.resizeGallery = this.resizeGallery.bind(this);//(39)
		this.startDrag = this.startDrag.bind(this);//(52)
		this.stopDrag = this.stopDrag.bind(this);//(53)
		this.dragging = this.dragging.bind(this);//(56)
		this.setStylePosition = this.setStylePosition.bind(this);//(65)
		this.clickDots = this.clickDots.bind(this);//(121)
		this.moveToLeft = this.moveToLeft.bind(this);//(122)
		this.moveToRight = this.moveToRight.bind(this);//(123)
		this.changeCurrentSlide = this.changeCurrentSlide.bind(this);//
		this.changeAcniveDotClass = this.changeAcniveDotClass.bind(this);//(153)
		


		this.manageHTML();//(6) Вызываем метод управлятьHTML
		this.setParameters();//(26) Объявляем новый метод (установитьПараметры) также передаем контекст this
		this.setEvents();//(34) Объявляем новый метод (установитьСобытия) также передаем контекст this

	}

	manageHTML() {//(7) Делаем все необходимые объвертки
		this.containerNode.classList.add(GalleryClassName2);//(12) Добовляем в HTML GalleryClassName(class="gallery")
		//(13) Изменяем внутренний HTML елемента через innerHTML добовляем: GalleryLineClassName (обвертка для слайдов)
		//(101) Добовляем классы для стрелок и точек
		this.containerNode.innerHTML = `
	        <div class="${GalleryLineClassName2}">
	            ${this.containerNode.innerHTML}
	        </div>
	        <div class="${GalleryNavClassName2}">
	            <button class="${GalleryNavLeftClassName2}">Left</button>
	            <button class="${GalleryNavRightClassName2}">Right</button>
	        </div>
	        <div class="${GalleryDotsClassName2}"></div>
		`;//
		this.lineNode = this.containerNode.querySelector(`.${GalleryLineClassName2}`);//(14) Получаем линию в javaScript
		this.dotsNode = this.containerNode.querySelector(`.${GalleryDotsClassName2}`);//(108)Определяем this.dotsNode (родитель в которо находятся все точки)

        //(15)Определяем slideNodes
		this.slideNodes = Array.from(this.lineNode.children).map((childNode) =>//(16)Делаем масив из всех дочерних элементов (слайдов)
			wrapElementByDiv({//(17)Вызываем функцию обернуть элемент в див(функция будет вызывать новую обвернутую ноду)
				element: childNode,//(18)Передаем елементу дочернии элементы
				className: GallerySlideClassName2//(19)Передаем className переменную слайда
			})
		);

        //(109)Изменяем внутренний HTML елемента через innerHTML(что бы добавить точки gallery-dots)
		this.dotsNode.innerHTML = Array.from(Array(this.size).keys()).map((key) => (//(109)Создаем масив который сформирует столько точек сколько слайдов
			`<button class="${GalleryDotClassName2} ${key === this.currentSlide ? 
			GalleryDotActiveClassName2 : '' }"></button>`//(110)Определяем кнопки которые будут отвечать за точки и добавляем активную
		)).join('');//(111)Получаем строку из кнопок методом присоединиться(join) по пустой строке

		this.dotsNodes = this.dotsNode.querySelectorAll(`.${GalleryDotClassName2}`);//(112)Получаем в javaScript
		this.navLeft = this.containerNode.querySelector(`.${GalleryNavLeftClassName2}`);//(113)Получаем в javaScript
		this.navRight = this.containerNode.querySelector(`.${GalleryNavRightClassName2}`);//(114)Получаем в javaScript
	}

	setParameters(){//(28) установитьПараметры
		const coordsContainer = this.containerNode.getBoundingClientRect();//(29) Находим ширину контейнера галереи определяем его через метод получитьОграничивающийКлиентскийПрямоугольник 
		this.width = coordsContainer.width;//(30) Полученную ширину присваиваем ширине переменной coordsContainer
		this.maximumX = -(this.size -1) * (this.width + this.settings.margin);//(90)maximumX = количество слайдов - 1 * (на ширину) + margin
		this.x = -this.currentSlide * (this.width + this.settings.margin);//(66)Отдельное свойство клвсса X(которое будет задавать сдвиг линии) + margin

        this.resetStyleTransition();//(96)сбрасываемПереходСтиля
        //(31)Устанавливаем ширину контейнера со слайдами(lineNode) она равна количество элементов (this.size) * на ширину (this.width)
		this.lineNode.style.width = `${this.size * (this.width + this.settings.margin)}px`;//(31) Плюс добавляем внешний отступ (this.settings.margin) 
		this.setStylePosition();//(97)устанавливаемПозициюСтиля

		Array.from(this.slideNodes).forEach((slideNode) => {//(32) Для всех дочерних элементов slideNodes
			slideNode.style.width = `${this.width}px`;//(33) Задаем ширину каждому слайду
			slideNode.style.marginRight = `${this.settings.margin}px`;//(93)Устанавливаем отступ всем слайдам
		});
	}

	setEvents() {//(36) установитьСобытия
		this.debounceResizeGallery = debounce(this.resizeGallery);//(48)
		//(37) Определяем метод изменение размера (resize) на виндов
		window.addEventListener('resize', debounce(this.resizeGallery));//(41)опровергать(debounce)нужен чтоб реже пересчитывать resize
		this.lineNode.addEventListener('pointerdown', this.startDrag);//(50) Вызываем метод startDrag при нажатой кнопке мыши
		window.addEventListener('pointerup', this.stopDrag);//(51) Вызываем метод stopDrag при не нажатой кнопке мыши
		window.addEventListener('pointercancel', this.stopDrag);//(99)Добавляем событие указатель отмена(pointercancel) для удаления багов
        

        this.dotsNode.addEventListener('click', this.clickDots);//(115)Объявляем функцию клик для добавления событий
        this.navLeft.addEventListener('click', this.moveToLeft);//(116)Объявляем функцию клик для добавления событий
        this.navRight.addEventListener('click', this.moveToRight);//(117)Объявляем функцию клик для добавления событий

	}

	destroyEvents() {//(47) уничтожитьСобытие
		window.removeEventListener('resize', this.debounceResizeGallery);//(49)
		this.lineNode.removeEventListener('pointerdown', this.startDrag);//(94)Удаляем метод startDrag
		window.removeEventListener('pointerup', this.stopDrag);//(95)Удаляем метод stopDrag
		window.removeEventListener('pointercancel', this.stopDrag);//(100)Удаляем событие указатель отмена(pointercancel)

		this.dotsNode.removeEventListener('click', this.clickDots);//(118)Удаляем события клика
        this.navLeft.removeEventListener('click', this.moveToLeft);//(119)Удаляем события клика
        this.navRight.removeEventListener('click', this.moveToRight);//(120)Удаляем события клика
	}

	resizeGallery() {//(38) Изменить размер галереи
		this.setParameters();//(40) устанавливаемПараметры (пофакту пересчитываем ширину основного кантейнера и ширину внутренних слайдов) 
	}

	startDrag(evt) {//(54)
		this.currentSlideWasChanged = false;//(81)текущийСлайдБылИзменен(currentSlideWasChanged) ложь
		this.clickX = evt.pageX;//(59)Определяем координаты по оси X при клике
		this.startX = this.x;//(67)Сохраняем прошлую стартовую позицию на которой закончили

		this.resetStyleTransition();//(85)сбрасываемПереходСтиля

        //(55) Добавляем событие перемещение указателя (pointermove) в нее передаем событие this.dragging
		window.addEventListener('pointermove', this.dragging);//(55) в перетаскивание(this.dragging) будут производится все основные расчеты
		this.containerNode.classList.add(GalleryDraggableClassName2);//(97)Когда галерея тянится добавляем ей класс (gallery-draggable) 
	}

	stopDrag() {//(57)
		window.removeEventListener('pointermove', this.dragging);//(58)Удаляем событие перемещение указателя (pointermove)
		this.containerNode.classList.remove(GalleryDraggableClassName2);//(98)Когда галерея остановилась убираем класс (gallery-draggable) 
		this.changeCurrentSlide()//(131)
	}

	dragging(evt) {//
		this.dragX = evt.pageX;//(60) Определяем dragX
		const dragShift = this.dragX -this.clickX;//(61)Объявляем переменную перетаскиваемыйСдвиг(dragShift)
		//(88)this.setStylePosition(dragShift);
		const easing = dragShift / 5;//(88)Обьявляем переменную ослабление(easing) = перетаскиваемыйСдвиг(dragShift) / 5
		this.x = Math.max(Math.min(this.startX + dragShift, easing), this.maximumX + easing);//(89)Определяем первый и последний слайд и добовляем ослабление (+ easing)

		this.setStylePosition();//(62)устанавливаемПозициюСтиля

		// Chenge active slide
		if (//(68)Если
			dragShift > 10 &&//(69)перетаскиваемыйСдвиг(dragShift) больше 10 и 
			dragShift > 0 &&//(70)перетаскиваемыйСдвиг(dragShift) больше 0 и 
			!this.currentSlideWasChanged &&//(73)Не текущийСлайдБылИзменен(currentSlideWasChanged) нужен для того чтоб условие сработало один раз(по умолчанию folse ложный)
			this.currentSlide > 0//(71)текущийСлайд(currentSlide) больше 0
		) {
			this.currentSlideWasChanged = true;//(74)текущийСлайдБылИзменен(currentSlideWasChanged) правда
			this.currentSlide = this.currentSlide - 1;//(72)Отнимаем слайд
		}

		if (//(74)Если
			dragShift < -10 &&//(75)перетаскиваемыйСдвиг(dragShift) меньше -10 и 
			dragShift < 0 &&//(76)перетаскиваемыйСдвиг(dragShift) меньше 0 и
			!this.currentSlideWasChanged &&//(77)Не текущийСлайдБылИзменен(currentSlideWasChanged) нужен для того чтоб условие сработало один раз(по умолчанию folse ложный)
			this.currentSlide < this.size - 1//(78)текущийСлайд(currentSlide) меньше -1
		) {
			this.currentSlideWasChanged = true;//(79)текущийСлайдБылИзменен(currentSlideWasChanged) правда
			this.currentSlide = this.currentSlide + 1;//(80)Прибавляем слайд
		}

		//if (this.currentSlide <= 0) {/////////////////////////////////////
			//this.currentSlide = 3;//////////////////////////////////
		//}

		//if (this.currentSlide >= this.size - 1) {///////////////////////////////////
			//this.currentSlide = 1;////////////////////////////////////
		//}
	}

	clickDots(evt) {//(124)Метод нажмитеНаКнопки (событие evt) 
		//(139)Определяем в dotNode элемент по которому был произведен клик(evt.target)
		const dotNode = evt.target.closest('button');//(139)Объявляем метод (closest) для поиска ближайшего родителя по силектору(button)
		if (!dotNode) {//(140)Если в dotNode ничего нет(клик был не по кнопке)
			return;//(141)Возвращаем(ничего не делаем)
		}
        //Определяем порядковый номер точки по которой был клик
		let dotNumber;//(142)Объявляем переменную (dotNumber)
		for(let i = 0; i < this.dotsNodes.length; i++) {//(143)Цыкл для(for) по цыклу проходим от 0 до количества точек
			if(this.dotsNodes[i] === dotNode) {//(144)Если текущая точка === той по которой кликнули
				dotNumber = i;//(145)Сохраняем dotNumber = ключю
				break;//(146)Прерываем цыкл
			}
		}

		if (dotNumber === this.currentSlide) {//(147)Если полученный ключ === текущему слайду
			return;//(148)Возвращаем(ничего не делаем)
		}
        //(157)Выравниваем време перехода между слайдами вызванными точками
        const countSwipes = Math.abs(this.currentSlide - dotNumber);//(157)От текущего слайда(currentSlide) отнимаем номер точки(dotNumber)
		this.currentSlide = dotNumber;//(149)Иначе в текущий слайд сохраняем номер точки
		this.changeCurrentSlide(countSwipes);//(150)Вызываем функцию сменитьТекущийСлайд(changeCurrentSlide)
	}

	moveToLeft() {//(125)Метод двигатьсяВлево
		if (this.currentSlide <= 0) {//(135)Если текущийСлайд <= 0
			
			//return;//(136)Возвращаем(ничего не делаем)
			this.currentSlide = 3;//////////////////////////////
		}
		//if (this.currentSlide <= 1) {//Если текущийСлайд <= 1///////////////////////////////////
			//this.navLeft.style.display = `none`;//Убираем стрелку влево//////////////////////////
		//}
		
		this.currentSlide = this.currentSlide - 1;//(137)В противном случае уменьшаем текущий слайд на единицу
		this.changeCurrentSlide();//(138)Изменить текущий слайд
		this.navRight.style.display = `block`;//Добавляем стрелку вправо////////////////////////////////
        


	}

	moveToRight() {//(126)Метод двигатьсяВправо
		if (this.currentSlide >= this.size - 1) {//(127)Если текущий слайд >= ширина линии -1
            
			//return;//Возвращаем(ничего не делаем)
			this.currentSlide = -1;//////////////////////////////////////////////
		}
        
        //if (this.currentSlide >= this.size - 2) {//Если текущий слайд >= ширина линии -2//////////////////////
        	//this.navRight.style.display = `none`;//Убираем стрелку вправо////////////////////////
        //}
        


		this.currentSlide = this.currentSlide + 1;//(128)В противном случае увеличиваем текущий слайд на единицу
		this.changeCurrentSlide();//(129)Изменить текущий слайд
		this.navLeft.style.display = `block`;//Добавляем стрелку влево///////////////////////////
	}
    
    

	changeCurrentSlide(countSwipes) {//(130)Изменить текущий слайд
		this.x = -this.currentSlide * (this.width + this.settings.margin);//(132) x = текущийСлайд * (ширину + отступ)
		this.setStyleTransition(countSwipes);//(134)устанавливаемПереходСтиля
		this.setStylePosition();//(133)устанавливаемПозицыюСтиля
		this.changeAcniveDotClass();//(151)сменаКлассаАктивнойТочке
		//this.setStyleTransitionEnd();
	}


	changeAcniveDotClass() {//(152)Задаем метод сменаКлассаАктивнойТочке
		for(let i = 0; i < this.dotsNodes.length; i++) {//(154))Цыкл для(for) по цыклу проходим от 0 до количества точек
			this.dotsNodes[i].classList.remove(GalleryDotActiveClassName2);//(155)Удаляем у всех точек класс GalleryDotActiveClassName(gallery-dot-active)
		}

		this.dotsNodes[this.currentSlide].classList.add(GalleryDotActiveClassName2);//(156)Точке привязанной к текущему слайду добавляем класс GalleryDotActiveClassName(gallery-dot-active)
	}

	setStylePosition() {//(63)устанавливаемПозицыюСтиля
		this.lineNode.style.transform = `translate3d(${this.x}px, 0, 0)`;//(64)
	}

	setStyleTransition(countSwipes = 1) {//(83)устанавливаемПереходСтиля
	    this.lineNode.style.transition = `all 0.25s ease 0s`//`all ${0.25 * countSwipes} ease 0s`;//(84)
	}

	/*setStyleTransitionEnd() {//////////////////////////////////
		this.lineNode.transitionend = `all 0s ease 0s`;//////////////////////////////////////////
		console.log(1)////////////////////////////////////////
	}/////////////////////////////////*/

	resetStyleTransition() {//(86)сбрасываемПереходСтиля
		this.lineNode.style.transition = `all 0s ease 0s`;//(87)
	}



}

//Helpers Помошники
function wrapElementByDiv({element, className}) {//(20)Объявляем функцию передаем в нее element и className
	const wrapperNode = document.createElement('div');//(21)Создаем новый элемент 'див'
	wrapperNode.classList.add(className);//(22)Добавляем класс диву 
    
	element.parentNode.insertBefore(wrapperNode, element);//(23)Создаем обвертку используя свойство вставитьПеред
	wrapperNode.appendChild(element);//(24)Создаем обвертку используя свойство добавитьРебенка

	return wrapperNode;//(25)Возвращаем wrapperNode(slideNodes)
}

function debounce(func, time = 100) {//(42) Функция опровергать(debounce) передаем в нее функцию(func) и время(time) = 100мс
	let timer;//(43) Переменная timer
	return function (event) {//(44) Возвращаем функцию которой возвращаем event(прослушивательСобытий(EventListener))
		clearTimeout(timer);//(45) Отчищаем время ожидания(timer)
		timer = setTimeout(func, time, event);//(46)Устанавливаем время ожидания(setTimeout) 100мс
	}
}


new Gallery2(document.getElementById('gallery2'), {// создаем экземпляр Пallery, передаем обвертку gallery, вызываем через метод getElementById
    margin: 10// Отступ между слайдами
});