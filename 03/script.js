/* var carausel = 1;

showSlides(carausel); // оставляем одну картинку на странице

function func(n) {
    showSlides(carausel += n);
}

function currentSlide(n) {
    showSlides(carausel = n);
}

function showSlides(n) {
    var slides = document.getElementsByClassName("wrapImg");
    var dots = document.getElementsByClassName('dot');

    if (n > slides.length) {
        carausel = 1;
    }
    if (n < 1) {
        carausel = slides.length;
    }
    for (var i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (var i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace('active', '');
    }
    slides[carausel - 1].style.display = 'block';
    dots[carausel - 1].className += 'active'; 
} */

var array = ["1.jpg", "2.jpg", "3.jpg"]; //создаем массив картинок
var arrayInd = 0;
var img = document.getElementById("showImg"); // обращаемся к картинке на странице

function f() {
    if (arrayInd == array.length-1) {
        arrayInd = 0;
    } else {
        arrayInd++;
    }
    img.src = "images/" + array[arrayInd];
}

function b() {
    if (arrayInd == 0) {
    arrayInd = array.length-1;
    } else {
        arrayInd--;
    }
    img.src = "images/" + array[arrayInd];
}