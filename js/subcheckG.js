
document.querySelectorAll('[data-green]').forEach(el => {
     el.onclick = function() {  
        this.style.pointerEvents = 'none';
     };
});



let i5One01 = document.querySelector('.i5__one01'); 
let i5One11 = document.querySelector('.i5__one11');
if (i5One01) {
        i5One01.addEventListener("click", function(e) {
        localStorage.setItem('noneG01', i5One01.style.display = 'none');
        i5One01.style.display = 'none'  
        localStorage.setItem('noneG11', i5One11.style.display = 'none');
        i5One11.style.display = 'none'        
    });
}
let noneG11 = localStorage.getItem('noneG11');
i5One11.style.display = noneG11;
let noneG01 = localStorage.getItem('noneG01');
i5One01.style.display = noneG01;




let i5One02 = document.querySelector('.i5__one02'); 
let i5One12 = document.querySelector('.i5__one12');
if (i5One02){
    i5One02.addEventListener("click", function(e) {
        localStorage.setItem('noneG12', i5One12.style.display = 'none');
        i5One12.style.display = 'none' 
        localStorage.setItem('noneG02', i5One02.style.display = 'none');
        i5One02.style.display = 'none'       
    });
}
let noneG12 = localStorage.getItem('noneG12');
i5One12.style.display = noneG12;
let noneG02 = localStorage.getItem('noneG02');
i5One02.style.display = noneG02;




let i5One03 = document.querySelector('.i5__one03'); 
let i5One13 = document.querySelector('.i5__one13');
if (i5One03){
    i5One03.addEventListener("click", function(e) {
        localStorage.setItem('noneG13', i5One13.style.display = 'none');
        i5One13.style.display = 'none' 
        localStorage.setItem('noneG03', i5One03.style.display = 'none');
        i5One03.style.display = 'none'       
    });
}
let noneG13 = localStorage.getItem('noneG13');
i5One13.style.display = noneG13;
let noneG03 = localStorage.getItem('noneG03');
i5One03.style.display = noneG03;




let i5One04 = document.querySelector('.i5__one04'); 
let i5One14 = document.querySelector('.i5__one14');
if (i5One04){
    i5One04.addEventListener("click", function(e) {
        localStorage.setItem('noneG14', i5One14.style.display = 'none');
        i5One14.style.display = 'none' 
        localStorage.setItem('noneG04', i5One04.style.display = 'none');
        i5One04.style.display = 'none'       
    });
}
let noneG14 = localStorage.getItem('noneG14');
i5One14.style.display = noneG14;
let noneG04 = localStorage.getItem('noneG04');
i5One04.style.display = noneG04;






let i5One05 = document.querySelector('.i5__one05'); 
let i5One15 = document.querySelector('.i5__one15');
if (i5One05){
    i5One05.addEventListener("click", function(e) {
        localStorage.setItem('noneG15', i5One15.style.display = 'none');
        i5One15.style.display = 'none'
        localStorage.setItem('noneG05', i5One05.style.display = 'none');
        i5One05.style.display = 'none'       
    });
}
let noneG15 = localStorage.getItem('noneG15');
i5One15.style.display = noneG15; 
let noneG05 = localStorage.getItem('noneG05');
i5One05.style.display = noneG05;
