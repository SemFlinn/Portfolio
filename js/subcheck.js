
//Находим верхнеее число
let dataCheck = document.querySelector('[data-check]');

//RED

let subcheckRed = document.querySelector('.subcheck__red');	
let red = document.querySelector('[data-red]');


// Окно.добавитьПрослушивательСобытий('клик', function(мероприятие) {
window.addEventListener('click', function(event) {
	// Если(мероприятие.цель.имеетАтрибут('data-red'))
	if (event.target.hasAttribute('data-red')) {   
		localStorage.setItem('counterR', parseInt(dataCheck.innerText) + 1);//////////////////////
		localStorage.setItem('counterR2', parseInt(subcheckRed.innerText) + parseInt(red.innerText));///////////////////////////////////
		//dataCheck.внутреннийTекст = разобратьЦелое(dataCheck.внутреннийTекст) + 1;	
		dataCheck.innerText = parseInt(dataCheck.innerText) + 1;//parseInt преобразует текст в число из "1" в 1	
		subcheckRed.innerText = parseInt(subcheckRed.innerText) + parseInt(red.innerText);
		
	} 

});

let counterR = localStorage.getItem('counterR');///////////////////////
dataCheck.innerText = counterR ++;//////////////////

let counterR2 = localStorage.getItem('counterR2');///////////////////////
subcheckRed.innerText = counterR2 ++;////////////////// 


let subcheckGreen = document.querySelector('.subcheck__green');	
let green = document.querySelector('[data-green]');


// Окно.добавитьПрослушивательСобытий('клик', function(мероприятие) {
window.addEventListener('click', function(event) {
	// Если(мероприятие.цель.имеетАтрибут('data-green'))
	if (event.target.hasAttribute('data-green')) {   
		localStorage.setItem('counterG', parseInt(dataCheck.innerText) + 1);//////////////////////
		localStorage.setItem('counterG2', parseInt(subcheckGreen.innerText) + parseInt(green.innerText));///////////////////////////////////
		//dataCheck.внутреннийTекст = разобратьЦелое(dataCheck.внутреннийTекст) + 1;	
		dataCheck.innerText = parseInt(dataCheck.innerText) + 1;//parseInt преобразует текст в число из "1" в 1	
		subcheckGreen.innerText = parseInt(subcheckGreen.innerText) + parseInt(green.innerText);
		
	} 

});

let counterG = localStorage.getItem('counterG');///////////////////////
dataCheck.innerText = counter ++;//////////////////

let counterG2 = localStorage.getItem('counterG2');///////////////////////
subcheckGreen.innerText = counterG2 ++;////////////////// 





// При клике добовляем убираем у всех [data-red] кликабельность
document.querySelectorAll('[data-red]').forEach(el => {
	 el.onclick = function() {	
        this.style.pointerEvents = 'none';
	 };
});



let i4One01 = document.querySelector('.i4__one01');	
let i4One11 = document.querySelector('.i4__one11');
if (i4One01) {
        i4One01.addEventListener("click", function(e) {
        localStorage.setItem('none01', i4One01.style.display = 'none');
        i4One01.style.display = 'none'	
        localStorage.setItem('none11', i4One11.style.display = 'none');
        i4One11.style.display = 'none'        
    });
}
let none11 = localStorage.getItem('none11');
i4One11.style.display = none11;
let none01 = localStorage.getItem('none01');
i4One01.style.display = none01;



let i4One02 = document.querySelector('.i4__one02');	
let i4One12 = document.querySelector('.i4__one12');
if (i4One02){
    i4One02.addEventListener("click", function(e) {
    	localStorage.setItem('none12', i4One12.style.display = 'none');
        i4One12.style.display = 'none' 
        localStorage.setItem('none02', i4One02.style.display = 'none');
        i4One02.style.display = 'none'       
    });
}
let none12 = localStorage.getItem('none12');
i4One12.style.display = none12;
let none02 = localStorage.getItem('none02');
i4One02.style.display = none02;


let i4One03 = document.querySelector('.i4__one03');	
let i4One13 = document.querySelector('.i4__one13');
if (i4One03){
    i4One03.addEventListener("click", function(e) {
    	localStorage.setItem('none13', i4One13.style.display = 'none');
        i4One13.style.display = 'none' 
        localStorage.setItem('none03', i4One03.style.display = 'none');
        i4One03.style.display = 'none'       
    });
}
let none13 = localStorage.getItem('none13');
i4One13.style.display = none13;
let none03 = localStorage.getItem('none03');
i4One03.style.display = none03;


let i4One04 = document.querySelector('.i4__one04');	
let i4One14 = document.querySelector('.i4__one14');
if (i4One04){
    i4One04.addEventListener("click", function(e) {
    	localStorage.setItem('none14', i4One14.style.display = 'none');
        i4One14.style.display = 'none' 
        localStorage.setItem('none04', i4One04.style.display = 'none');
        i4One04.style.display = 'none'       
    });
}
let none14 = localStorage.getItem('none14');
i4One14.style.display = none14;
let none04 = localStorage.getItem('none04');
i4One04.style.display = none04;


let i4One05 = document.querySelector('.i4__one05');	
let i4One15 = document.querySelector('.i4__one15');
if (i4One05){
    i4One05.addEventListener("click", function(e) {
    	localStorage.setItem('none15', i4One15.style.display = 'none');
        i4One15.style.display = 'none'
        localStorage.setItem('none05', i4One05.style.display = 'none');
        i4One05.style.display = 'none'       
    });
}
let none15 = localStorage.getItem('none15');
i4One15.style.display = none15; 
let none05 = localStorage.getItem('none05');
i4One05.style.display = none05;



//GREEN


/*let subcheckGreen = document.querySelector('.subcheck__green');	
let green = document.querySelector('[data-green]');


// Окно.добавитьПрослушивательСобытий('клик', function(мероприятие) {
window.addEventListener('click', function(event) {
	// Если(мероприятие.цель.имеетАтрибут('data-green'))
	if (event.target.hasAttribute('data-green')) {   
		localStorage.setItem('counterG', parseInt(dataCheck.innerText) + 1);//////////////////////
		localStorage.setItem('counterG2', parseInt(subcheckGreen.innerText) + parseInt(green.innerText));///////////////////////////////////
		//dataCheck.внутреннийTекст = разобратьЦелое(dataCheck.внутреннийTекст) + 1;	
		dataCheck.innerText = parseInt(dataCheck.innerText) + 1;//parseInt преобразует текст в число из "1" в 1	
		subcheckGreen.innerText = parseInt(subcheckGreen.innerText) + parseInt(green.innerText);
		
	} 

});

let counterG = localStorage.getItem('counterG');///////////////////////
dataCheck.innerText = counter ++;//////////////////

let counterG2 = localStorage.getItem('counterG2');///////////////////////
subcheckGreen.innerText = counterG2 ++;////////////////// 

*/


// При клике добовляем убираем у всех [data-red] кликабельность
/*document.querySelectorAll('[data-red]').forEach(el => {
	 el.onclick = function() {	
        this.style.pointerEvents = 'none';
	 };
});



let i4One01 = document.querySelector('.i4__one01');	
let i4One11 = document.querySelector('.i4__one11');
if (i4One01) {
        i4One01.addEventListener("click", function(e) {
        localStorage.setItem('none01', i4One01.style.display = 'none');
        i4One01.style.display = 'none'	
        localStorage.setItem('none11', i4One11.style.display = 'none');
        i4One11.style.display = 'none'        
    });
}
let none11 = localStorage.getItem('none11');
i4One11.style.display = none11;
let none01 = localStorage.getItem('none01');
i4One01.style.display = none01;



let i4One02 = document.querySelector('.i4__one02');	
let i4One12 = document.querySelector('.i4__one12');
if (i4One02){
    i4One02.addEventListener("click", function(e) {
    	localStorage.setItem('none12', i4One12.style.display = 'none');
        i4One12.style.display = 'none' 
        localStorage.setItem('none02', i4One02.style.display = 'none');
        i4One02.style.display = 'none'       
    });
}
let none12 = localStorage.getItem('none12');
i4One12.style.display = none12;
let none02 = localStorage.getItem('none02');
i4One02.style.display = none02;


let i4One03 = document.querySelector('.i4__one03');	
let i4One13 = document.querySelector('.i4__one13');
if (i4One03){
    i4One03.addEventListener("click", function(e) {
    	localStorage.setItem('none13', i4One13.style.display = 'none');
        i4One13.style.display = 'none' 
        localStorage.setItem('none03', i4One03.style.display = 'none');
        i4One03.style.display = 'none'       
    });
}
let none13 = localStorage.getItem('none13');
i4One13.style.display = none13;
let none03 = localStorage.getItem('none03');
i4One03.style.display = none03;


let i4One04 = document.querySelector('.i4__one04');	
let i4One14 = document.querySelector('.i4__one14');
if (i4One04){
    i4One04.addEventListener("click", function(e) {
    	localStorage.setItem('none14', i4One14.style.display = 'none');
        i4One14.style.display = 'none' 
        localStorage.setItem('none04', i4One04.style.display = 'none');
        i4One04.style.display = 'none'       
    });
}
let none14 = localStorage.getItem('none14');
i4One14.style.display = none14;
let none04 = localStorage.getItem('none04');
i4One04.style.display = none04;


let i4One05 = document.querySelector('.i4__one05');	
let i4One15 = document.querySelector('.i4__one15');
if (i4One05){
    i4One05.addEventListener("click", function(e) {
    	localStorage.setItem('none15', i4One15.style.display = 'none');
        i4One15.style.display = 'none'
        localStorage.setItem('none05', i4One05.style.display = 'none');
        i4One05.style.display = 'none'       
    });
}
let none15 = localStorage.getItem('none15');
i4One15.style.display = none15; 
let none05 = localStorage.getItem('none05');
i4One05.style.display = none05;


*/
