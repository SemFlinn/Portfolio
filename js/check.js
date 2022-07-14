
window.addEventListener('click', function(event){
	let counter;
	let counterWrapper;
    // Проверяем клик строго по кнопкам плюс или минус
	if (event.target.dataset.action === 'plus' || event.target.dataset.action === 'minus') {
		// counterWrapper присваиваем = цель.мироприятия.ближайший('.счетчик-обертка')
		counterWrapper = event.target.closest('.counter-wrapper');//closest-метод ('.counter-wrapper')-силектор
	    // counter присваиваем = Находящиеся в counterWrapper ('[data-counter]')
		counter = counterWrapper.querySelector('[data-counter]');
	}
    // Если (цель.мероприятия.датаатрибут.действие === 'плюс')
	if (event.target.dataset.action === 'plus') {        
        // Обращаемся к counter его свойству innerText (Содержание дива)
		// В counter.innerText записываем этот же counter.innerText но уже увеличенный на единицу(первый плюс)
		// и сразу возвращаем переведя в число(второй плюс) 
		counter.innerText = ++counter.innerText;
	}
	// Если (цель.мироприятия.датаатрибут.действие === 'минус')
	if (event.target.dataset.action === 'minus') {
        // УСЛОВИЕ if(если) parseInt(Разобрать целое) превратит текст счетчика в число которое должно быть > 1
		if (parseInt(counter.innerText) > 1) {  
	    	// Обращаемся к counter его свойству innerText (Содержание дива)
			// В counter.innerText записываем этот же counter.innerText но уже уменьшаем на единицу(первый минус)
			// и сразу возвращаем переведя в число(второй минус) 
	    	counter.innerText = --counter.innerText;
	      // Если у кнопки минус есть родитель ('.cart-wrapper') значит это минус в товаре корзины
	    } else if (event.target.closest('.cart-wrapper') && parseInt(counter.innerText) === 1) {
	    	console.log('IN CART!!!!');
	        // Удаляем товар из корзины методом remuve()
	        event.target.closest('.cart-item').remove();
	        // Отображение статуса корзины Пустая / Полная
	        toggleCartStatus();
	        // Пересчет общей стоимости товаров в корзине
		    //calcCartPrice();
		    // Пересчет общей стоимости товаров в корзине и доставка
		    calcCartPriceAndDelivery();
	    }
	}
	// Проверяем клик на + или - внутри корзины
	// (цель.мироприятия.имеетAтрибут('действие-данных') И цель.мироприятия.ближайший('.обертка-тележки'))
	if (event.target.hasAttribute('data-action') && event.target.closest('.cart-wrapper')) {
		// Пересчет общей стоимости товаров в корзине
		//calcCartPrice();
		// Пересчет общей стоимости товаров в корзине и доставка
		calcCartPriceAndDelivery();
	}
});
//////////////////////////////////////////////Счетчик (добавление в корзину и суммирование одинаковых позицый)
const cartWrapper = document.querySelector('.cart-wrapper');
// Отслеживаем клик на странице
window.addEventListener('click', function(event) {
	// Проверяем что клик был по кнопке "Добавить в корзину" 
	// Если (мероприятие.цель.имеетАтрибут('данные-корзины'))
	if (event.target.hasAttribute('data-cart')) {// hasAttribute(МЕТОД)
		//Находим карточку стоваром, внутри которой был совершен клик и присваиваем const card
		// константа открытка = мероприятие.цель.ближайший('.открытка');
		const card = event.target.closest('.card');
		// Собираем данные с этого товара и записываем в единый объект productInfo
		const productInfo = {
			id: card.dataset.id,// Вернет значение data-id
			imgSrc: card.querySelector('.product-img').getAttribute('src'),//getAttribute(МЕТОД возвращает значение атрибута)
			title: card.querySelector('.item-title').innerText,// Присваеваем значение внутреннего текста(innerText)
			itemsInBox: card.querySelector('[data-items-in-box]').innerText,
			weight: card.querySelector('.price__weight').innerText,
			price: card.querySelector('.price__currency').innerText,
			counter: card.querySelector('[data-counter]').innerText
		};		
        // Проверяем есть ли уже такой товар в корзине
        const itemInCart = cartWrapper.querySelector(`[data-id="${productInfo.id}"]`);
        //console.log(itemInCart);
        // Если товар есть в корзине
        if (itemInCart) {
        	// Константе присваиваем значение счетчика в корзине
        	const counterElement = itemInCart.querySelector('[data-counter]');
        	// Обращаемся к внутренниму тексту в счетчеке = переводим его в число + переводим в число значение счетчика данных card
        	counterElement.innerText = parseInt(counterElement.innerText) + parseInt(productInfo.counter);
        } else {// Иначе 
	        // Если товара нет в корзине
	        // Пишем HTML подстовляем значения из productInfo присваиваем const cartItemHTML
			const cartItemHTML = `<div class="cart-item" data-id="${productInfo.id}">
				                     <div class="cart-item__top">

				                       <div class="cart-item__img">
				                         <img src="${productInfo.imgSrc}" alt="${productInfo.title}">
				                       </div>

				                       <div class="cart-item__desc">
				                         <div class="cart-item__title">${productInfo.title}</div>
				                         <div class="cart-item__weight">${productInfo.itemsInBox} / ${productInfo.weight}</div>

				                         <!-- cart-item__details -->
				                         <div class="cart-item__details">
				                           <div class="items items--small counter-wrapper">
				                             <div class="items__control" data-action="minus">-</div>
				                             <div class="items__current" data-counter>${productInfo.counter}</div>
				                             <div class="items__control" data-action="plus">+</div>
				                           </div>
				                           <div class="price">
				                             <div class="price__currency">${productInfo.price}</div>
				                           </div>
				                         </div>
				                         <!-- cart-item__details -->

				                       </div>

				                     </div>
				                   </div>`;
	        //МЕТОД (вставитьСмежныйHTML) insertAdjacentHTML позволяет вставлять HTML в HTML
			cartWrapper.insertAdjacentHTML('beforeend', cartItemHTML);// Первый аргумент(куда именно добавить) Второй аргумент (сама разметка)
		}
        // Сбрасываем счетчик добавленного товара на '1'
		card.querySelector('[data-counter]').innerText = '1';

		// Отображение статуса корзины Пустая / Полная
		toggleCartStatus();

        // Пересчет общей стоимости товаров в корзине
		//calcCartPrice();
		// Пересчет общей стоимости товаров в корзине и доставка
		calcCartPriceAndDelivery();
    }
});
/////////////////////////////////////////////////////5 Функция которая следит за содержимым корзины(есть в корзине заказы или нет)
function toggleCartStatus() {
    
    const cartWrapper = document.querySelector('.cart-wrapper');    
    const cartEmptyBadge = document.querySelector('[data-cart-empty]');
    const orderForm = document.querySelector('#order-form');
    // Если у открыткиОбортки.дочек.длинна(количество) > 0 
    if (cartWrapper.children.length > 0) {
    	console.log('FULL');
    	cartEmptyBadge.classList.add('none');
    	orderForm.classList.remove('none');
    } else {
    	console.log('EMPTY');
    	cartEmptyBadge.classList.remove('none');
    	orderForm.classList.add('none');
    }
};
////////////////////////////////////////////////////////7 Подсчет стоимости товара в корзине и доставка
function calcCartPriceAndDelivery() {
	const cartWrapper = document.querySelector('.cart-wrapper'); //Находим cart-wrapper
	const cartItems = document.querySelectorAll('.cart-item'); //Находим все cart-item
	const totalPriceEl = document.querySelector('.total-price'); //Находим total-price
	const deliveryCost = document.querySelector('.delivery-cost');//Находим delivery-cost
	const dataCartDelivery = document.querySelector('[data-cart-delivery]');//Находим delivery-cost
	let PriceTotal = 0;//ЦенаВсего 	
    // Каждый элемент в колекции cartItems определяем как (item)
	cartItems.forEach(function (item) { // ОткрыткаВещь.дляКаждой(действие(вещь))
		// СуммаЭл = Внутри item находим ('[счетчик-данных]')
		const amountEl = item.querySelector('[data-counter]');
		// ЦенаЭл = Внутри item находим ('[цена__валюта]')
		const priceEl = item.querySelector('.price__currency');
		// текущаяЦена = Парсим текст amountEl *  Парсим текст priceEl
		const currentPrice = parseInt(amountEl.innerText) * parseInt(priceEl.innerText);//текущаяЦена = разобратьЦелое(СуммаЭл.внутреннийТекст) * разобратьЦелое(ЦенаЭл.внутреннийТекст); 
		PriceTotal += currentPrice;//ЦенаВсего равен его текущее значение плюс текущаяЦена     
	});
	// Отображаем цену на странице
	totalPriceEl.innerText = PriceTotal;
	// Доставка
    if (PriceTotal > 0) {
    	dataCartDelivery.classList.remove('none');
    } else {
    	dataCartDelivery.classList.add('none');
    }
	if (PriceTotal >= 600) {
		deliveryCost.classList.add('free');
		deliveryCost.innerText = 'бесплатно';
	} else {
		deliveryCost.classList.remove('free');
		deliveryCost.innerText = '250 ₽';
	}
}