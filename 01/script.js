function f(elem) {
    var exchenge = elem.src.replace('small', 'big'); // меняем путь от маленькой картинки к большой
    var big = document.getElementById('big'); // выбираем элемент по  id
    big.src = exchenge; //присваиваем выбранному элементу путь до большой картинке
}

function testError() {
	document.querySelector('.container').immerHTML = alert('такой картинки нет!'); // выводим в блок модальное окно по вызову функции из атрибута onerror
	}

