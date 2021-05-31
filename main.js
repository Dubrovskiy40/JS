 // Глобальные переменные:                            
var FIELD_SIZE_X = 20;//строки
var FIELD_SIZE_Y = 20;//столбцы
var SNAKE_SPEED = 200; // Интервал между перемещениями змейки, скорость движения
var snake = []; // Сама змейка
var direction = 'y+'; // Направление движения змейки
var gameIsRunning = false; // Запущена ли игра
var snake_timer; // Таймер змейки
var food_timer; // Таймер для еды
var bomb_timer; // Таймер для бомб
var score = 0; // Результат

function init() {
    prepareGameField(); // Генерация поля (при помощи функции строим игровое поле)

    var wrap = document.getElementsByClassName('wrap')[0]; // получаем блок в котором будем размещать таблицу
    // Подгоняем размер контейнера под игровое поле
    
	/*
	if (16 * (FIELD_SIZE_X + 1) < 380) {
        wrap.style.width = '380px';
    }
    else {
        wrap.style.width = (16 * (FIELD_SIZE_X + 1)).toString() + 'px';
    }
    */
    wrap.style.width = '400px'; // задаем игровому блоку размер
    // События кнопок Старт и Новая игра
    document.getElementById('snake-start').addEventListener('click', startGame); // добавляем событие onclick, по клику на кнопку заппускается функция startGame
    document.getElementById('snake-renew').addEventListener('click', refreshGame);

// Отслеживание клавиш клавиатуры
    addEventListener('keydown', changeDirection); // при нажатии клавишь вызывается функция changeDirection в которой меняются направления движения змейки
}

/**
 * Функция генерации игрового поля
 */
function prepareGameField() {
    // Создаём таблицу
    var game_table = document.createElement('table');
    game_table.setAttribute('class', 'game-table');

    // Генерация ячеек игровой таблицы
    for (var i = 0; i < FIELD_SIZE_X; i++) {
        // Создание строки
        var row = document.createElement('tr');
        row.className = 'game-table-row row-' + i;

        for (var j = 0; j < FIELD_SIZE_Y; j++) {
            // Создание ячейки
            var cell = document.createElement('td');
            cell.className = 'game-table-cell cell-' + i + '-' + j;

            row.appendChild(cell); // Добавление ячейки
        }
        game_table.appendChild(row); // Добавление строки
    }

    document.getElementById('snake-field').appendChild(game_table); // Добавление таблицы
}

/**
 * Старт игры
 */
function startGame() {
    gameIsRunning = true; // для запуска игры меняем false на true
    respawn();//создали змейку вызовом функции respawn

    snake_timer = setInterval(move, SNAKE_SPEED);//каждые 200мс запускаем функцию move
    setTimeout(createFood, 5000);
    setTimeout(createBomb, 5000);
}

/**
 * Функция расположения змейки на игровом поле
 */
function respawn() {
    // Змейка - массив td
    // Стартовая длина змейки = 2

    // Respawn змейки из центра
    var start_coord_x = Math.floor(FIELD_SIZE_X / 2); // получаем начальные координаты хвоста змейки
    var start_coord_y = Math.floor(FIELD_SIZE_Y / 2);

    // Хвост змейки
    var snake_tail = document.getElementsByClassName('cell-' + start_coord_y + '-' + start_coord_x)[0];
    //snake_tail.setAttribute('class', snake_tail.getAttribute('class') + ' snake-unit');
    snake_tail.classList.add('snake_unit'); // добавляем к хвосту голосу. Более удобное написание чем строка выше

    // Голова змейки
    var snake_head = document.getElementsByClassName('cell-' + (start_coord_y - 1) + '-' + start_coord_x)[0]; // для создания головы змейки уменьшаем по y координату на 1
    snake_head.setAttribute('class', snake_head.getAttribute('class') + ' snake-unit');

    snake.push(snake_tail); // помещаем данные ячейки в массив змейка, для создания змейки
    snake.push(snake_head);
}

/**
 * Движение змейки
 */
function move() {
    //console.log('move',direction);
    // Сборка классов
    var snake_head_classes = snake[snake.length - 1].getAttribute('class').split(' '); //приводим строку с классами в массив по пробелу 

    // Сдвиг головы
    var new_unit;
    var snake_coords = snake_head_classes[1].split('-');//обращаемся к элементу под индексом 1(голова) и преобразуем строку в массив по дефису
    var coord_y = parseInt(snake_coords[1]); // получаем координаты строки
    var coord_x = parseInt(snake_coords[2]); //получаем координаты столбца

    // Определяем новую точку в зависимости от направления движения змейки
    if (direction == 'x-') {
        new_unit = document.getElementsByClassName('cell-' + (coord_y) + '-' + (coord_x - 1))[0];
    }
    else if (direction == 'x+') {
        new_unit = document.getElementsByClassName('cell-' + (coord_y) + '-' + (coord_x + 1))[0];
    }
    else if (direction == 'y+') {
        new_unit = document.getElementsByClassName('cell-' + (coord_y - 1) + '-' + (coord_x))[0];
    }
    else if (direction == 'y-') {
        new_unit = document.getElementsByClassName('cell-' + (coord_y + 1) + '-' + (coord_x))[0];
    }

    // Проверки
    // 1) new_unit не часть змейки
    // 2) Змейка не ушла за границу поля
    // 3) Змейка не попала на бомбу
    //console.log(new_unit);
    if (!isSnakeUnit(new_unit) && new_unit !== undefined) { // новую ячейку, куда передвинится змейка необходимо проверить. Если будет false - змейки там нет, если true - там есть змейка. Если false и новая ячейка не undefined (не вышла за пределы игрового поля), то
        // Добавление новой части змейки
        //new_unit.setAttribute('class', new_unit.getAttribute('class') + ' snake-unit'); // то делаем перестановку// для того чтоб проверить новую ячейку, передаем её в новую функцию
        new_unit.classList.add('snake-unit'); // то же что и строка выше. Создали новой ячейки голову змейки
        snake.push(new_unit); 

        // Проверяем, надо ли убрать хвост // чтоб он двигался за головой
        if (!haveFood(new_unit)) { // проверяем, является ли новая ячейка кормом. Если false - не корм, то удаляем хвост, если true - то хвост не удаляем
            // Находим хвост
            var removed = snake.splice(0, 1)[0]; // хвост находится под индексом 0, поэтому удаляем при помощи метода  splice элементы массива по индексом 0 и 1 элемент. Splice  всегда возвращает массив, указываем [0] - элемент который вернет splice
            var classes = removed.getAttribute('class').split(' '); // извлекаем из хвоста классы и приводим их в массив
            // удаляем хвост
            removed.setAttribute('class', classes[0] + ' ' + classes[1]); // обращаемся к ячейке с хвостом и удаляем класс отвечающий за наличие змейки в данной ячейки
            //removed.classList.remove('snake-unit'); // аналог двух строк выше
        }
        if (new_unit.classList.contains('bomb-unit')) { // проверка содержит ли новая ячейка класс bomb-unit
            var spanBomb = document.querySelector('span');
            spanBomb.innerHTML = 'Наша змейка разлетеласть на молекулы. Не кушай бомбы!';
            finishTheGame();
        } 
    }
    else {
        finishTheGame(); // если новая ячейка содержит часть змейки (условие true), т.е. змейка попала в себя, то игра завершается
    }
}

/**
 * Проверка на змейку
 * @param unit
 * @returns {boolean}
 */
function isSnakeUnit(unit) { // данная функция проверяет, является ли новая ячейка частью змейки
    var check = false;

    if (snake.includes(unit)) { // если новая ячейка вернет true т.е. содержит змейку. includes - возвращает true/false
        check = true;
    }
    return check;
}
/**
 * проверка на еду
 * @param unit
 * @returns {boolean}
 */
function haveFood(unit) {
    var check = false;

    var unit_classes = unit.getAttribute('class').split(' ');

    // Если еда
    if (unit_classes.includes('food-unit')) {
        check = true;
        createFood();
        score++;
        var spanFood = document.querySelector('span');
        spanFood.innerHTML = 'Наша змейка скушала: ' + score + ' корма';
        if (score == 3) {
            var spanDangerous = document.querySelector('.dangerous');
            spanDangerous.innerText = 'Ну ты и обжора, остановись!';
        }
        if (score == 6) {
            var spanDangerous = document.querySelector('.dangerous');
            spanDangerous.innerText = 'Еще немного и ты лопнешь!';
        }
        if (score == 9) {
            var spanDangerous = document.querySelector('.dangerous');
            spanDangerous.innerText = 'Всё, мои глаза не могут это видеть, я ухожу!';
        }
    }
    return check;
}

/**
 * Создание еды
 */
function createFood() {
    var foodCreated = false; // корм не создан

    while (!foodCreated) { //пока корм не создан, пытаемся его создать
        // рандом
        var food_x = Math.floor(Math.random() * FIELD_SIZE_X); // получаем рандомные координаты для создания корма
        var food_y = Math.floor(Math.random() * FIELD_SIZE_Y);

        var food_cell = document.getElementsByClassName('cell-' + food_y + '-' + food_x)[0]; // по рандомным координатам получаем ячейку
        var food_cell_classes = food_cell.getAttribute('class').split(' '); // все классы созданной ячейки приводим в массив разедляя пробелом

        // проверка на змейку
        if (!food_cell_classes.includes('snake-unit')) { // проверка что корм появится не на змейке. Если в ячейке нет класса snake-unit - значит это не змейка
            var classes = '';
            for (var i = 0; i < food_cell_classes.length; i++) {
                classes += food_cell_classes[i] + ' ';
            }
            food_cell.setAttribute('class', classes + 'food-unit');
            // food_cell.classList.add('food-unit'); // аналог написания строк условия if выше
            foodCreated = true;
        }
    }
}


/* function haveBomb(unit) {
    var check = false;

    var unit_classes = unit.getAttribute('class').split(' ');

    // Если бомба
    if (unit_classes.includes('bomb-unit')) {
        check = true;
        var spanBomb = document.querySelector('span');
        spanBomb.innerHTML = 'Наша змейка разлетеласть на молекулы. Не кушай бомбы!';
        finishTheGame();
    }
    return check;
} */

function createBomb() {
    var bombCreated = false;

    while (!bombCreated) { //пока бомбу не создали
        // рандом
        var bomb_x = Math.floor(Math.random() * FIELD_SIZE_X);
        var bomb_y = Math.floor(Math.random() * FIELD_SIZE_Y);

        var bomb_cell = document.getElementsByClassName('cell-' + bomb_y + '-' + bomb_x)[0];
        var bomb_cell_classes = bomb_cell.getAttribute('class').split(' ');

        // проверка на змейку
        if (!bomb_cell_classes.includes('snake-unit')) {
            bomb_cell.classList.add('bomb-unit');
            bombCreated = true;
        }
        // проверка на корм
        if (!bomb_cell_classes.includes('food-unit')) {
            bomb_cell.classList.add('bomb-unit');
            bombCreated = true;
        }
    }
}

/**
 * Изменение направления движения змейки
 * @param e - событие
 */
function changeDirection(e) { // e источник событий - объект event
    console.log(e);
	switch (e.keyCode) { // у каждой клавиши есть свой код. Через switch  проверяем какой код клавиши нажали
        case 37: // Клавиша влево
            if (direction != 'x+') { // змейка не может сразу сменить направление на противоположное, проверяем это условие
                direction = 'x-'
            }
            break;
        case 38: // Клавиша вверх
            if (direction != 'y-') {
                direction = 'y+'
            }
            break;
        case 39: // Клавиша вправо
            if (direction != 'x-') {
                direction = 'x+'
            }
            break;
        case 40: // Клавиша вниз
            if (direction != 'y+') {
                direction = 'y-'
            }
            break;
    }
}

/**
 * Функция завершения игры
 */
function finishTheGame() {
    gameIsRunning = false;
    clearInterval(snake_timer);
    alert('Вы проиграли! Ваш результат: ' + score.toString());
}

/**
 * Новая игра
 */
function refreshGame() {
    location.reload();
}

// Инициализация
window.onload = init; // после верстки запускаеться функция init