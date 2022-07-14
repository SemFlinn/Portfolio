document.querySelectorAll('[data-yellow]').forEach(el => {
     el.onclick = function() {  
        this.style.pointerEvents = 'none';
     };
});



let i6One01 = document.querySelector('.i6__one01'); 
let i6One11 = document.querySelector('.i6__one11');
if (i6One01) {
        i6One01.addEventListener("click", function(e) {
        localStorage.setItem('noneY01', i6One01.style.display = 'none');
        i6One01.style.display = 'none'  
        localStorage.setItem('noneY11', i6One11.style.display = 'none');
        i6One11.style.display = 'none'        
    });
}
let noneY11 = localStorage.getItem('noneY11');
i6One11.style.display = noneY11;
let noneY01 = localStorage.getItem('noneY01');
i6One01.style.display = noneY01;




let i6One02 = document.querySelector('.i6__one02'); 
let i6One12 = document.querySelector('.i6__one12');
if (i6One02){
    i6One02.addEventListener("click", function(e) {
        localStorage.setItem('noneY12', i6One12.style.display = 'none');
        i6One12.style.display = 'none' 
        localStorage.setItem('noneY02', i6One02.style.display = 'none');
        i6One02.style.display = 'none'       
    });
}
let noneY12 = localStorage.getItem('noneY12');
i6One12.style.display = noneY12;
let noneY02 = localStorage.getItem('noneY02');
i6One02.style.display = noneY02;




let i6One03 = document.querySelector('.i6__one03'); 
let i6One13 = document.querySelector('.i6__one13');
if (i6One03){
    i6One03.addEventListener("click", function(e) {
        localStorage.setItem('noneY13', i6One13.style.display = 'none');
        i6One13.style.display = 'none' 
        localStorage.setItem('noneY03', i6One03.style.display = 'none');
        i6One03.style.display = 'none'       
    });
}
let noneY13 = localStorage.getItem('noneY13');
i6One13.style.display = noneY13;
let noneY03 = localStorage.getItem('noneY03');
i6One03.style.display = noneY03;




let i6One04 = document.querySelector('.i6__one04'); 
let i6One14 = document.querySelector('.i6__one14');
if (i6One04){
    i6One04.addEventListener("click", function(e) {
        localStorage.setItem('noneY14', i6One14.style.display = 'none');
        i6One14.style.display = 'none' 
        localStorage.setItem('noneY04', i6One04.style.display = 'none');
        i6One04.style.display = 'none'       
    });
}
let noneY14 = localStorage.getItem('noneY14');
i6One14.style.display = noneY14;
let noneY04 = localStorage.getItem('noneY04');
i6One04.style.display = noneY04;






let i6One05 = document.querySelector('.i6__one05'); 
let i6One15 = document.querySelector('.i6__one15');
if (i6One05){
    i6One05.addEventListener("click", function(e) {
        localStorage.setItem('noneY15', i6One15.style.display = 'none');
        i6One15.style.display = 'none'
        localStorage.setItem('noneY05', i6One05.style.display = 'none');
        i6One05.style.display = 'none'       
    });
}
let noneY15 = localStorage.getItem('noneY15');
i6One15.style.display = noneY15; 
let noneY05 = localStorage.getItem('noneY05');
i6One05.style.display = noneY05;
