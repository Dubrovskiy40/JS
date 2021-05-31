//После игры необходимо спросить номер вопроса. 
//По номеру вопроса нужно вывести текст вопроса и текст выбранного ответа

var event, ok;
var historyAnswer = []; // массив, хранящий историю вопросов и ответов на них
//var answers = [];
switch (textQuestions(works.a00, works.a1, works.a2)) { // запускаем ф-ю и на вход передаем вопрос и ответы на него
    case 1: // Первое действие  - если в первом окне ввели 1 то открываем серию окон - окно 2
        switch (textQuestions(works.b00, works.b1, works.b2)) {
            case 1:
            case 2:
                textQuestions(works.d00, works.d1, works.d2);
                break;
            case -1: // Второе действие
                break;
            default:
                alert('Ошибка');
        }
        break;
    case 2: // Первое действие    Если в 1 окне ввели 2 то переходим к 3 окну
        switch (textQuestions(works.c00 + works.c1 + works.c2)) {
            case 1: // Второе действие
            case 2: // Второе действие
            textQuestions(works.d00 + works.d1 + works.d2);
                break;
            case -1: // Второе действие
                break;
            default:
                alert('Ошибка');
        }
        break;
    case -1: // Первое действие
        break;
    default:
        alert('Ошибка');
}
alert('Спасибо за игру');

//------------------------------------------
function isAnswer(q, event) { // проверяет на ввод корректного значения
    if (isNaN(event) || !isFinite(event)) {
        alert('Вы ввели недопустимый символ');
        return false;
    }
    else if (event < 1 || event > q) {
        alert('Ваше число выходит из допустимого диапозона');
        return false;
    }
	return true;
}

function textQuestions (question, firstAnswer, secondAnswer) { // вопрос, ответ1, ответ 2 
    var ok = false; // пока ok = true выполняем действие do
    do {
        event = +prompt(question + firstAnswer + secondAnswer + ' -1 Выход из игры') // вводим ответ на вопрос
        if (event == -1) { // выходим если ответ -1
            break;
        } else {
            ok = isAnswer(works.a0, event); // запускаем ф-ю с входными параметрами кол-во ответов и варианты ответа
        }
    } while (!ok);
    switch (event) {
        case 1: historyAnswer.push([question, firstAnswer]); // если пользователь ввел 1, то записываем в массив 2 элемента (вопрос и ответ на него)
            break;
        case 2: historyAnswer.push([question, secondAnswer]);
            break;
        case -1: historyAnswer.push([question, 'ответа не было, ты убежал']);
            break;    
    }
    return event;
}

do { // делаем проверку с бесконечным циклом пока не будет введено корректное значение
    var numberOfQuestion = +prompt('введите номер вопроса от 1 до 4');
} while (numberOfQuestion < 1 || numberOfQuestion > 4);

console.log(numberOfQuestion);
console.log(historyAnswer);
var nQ = 'в ходе № ' + numberOfQuestion + ' ' + historyAnswer[numberOfQuestion - 1][0] + 'Ваш ответ ' + historyAnswer[numberOfQuestion - 1][1];
alert(nQ);
