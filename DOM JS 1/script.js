/* var chessFigures = {
   'черная пешка': '&#9823',
   'белая пешка': '&#9817',
   'черный конь': '&#9822',
   'белый конь': '&#9816',
   'черный слон': '&#9821',
   'белый слон': '&#9815',
   'черная ладья': '&#9820',
   'белая ладья': '&#9814',
   'черный ферзь': '&#9819',
   'белый ферзь': '&#9813',
   'черный король': '&#9818',
   'белый король': '&#9812',
} */

var chessFiguresWhile = ['&#9814', '&#9815', '&#9816', '&#9813', '&#9812', '&#9816', '&#9815','&#9814', '&#9817', '&#9817', '&#9817', '&#9817', '&#9817', '&#9817', '&#9817', '&#9817'];
var chessFiguresBlack = ['&#9820', '&#9821', '&#9822', '&#9818', '&#9819', '&#9822', '&#9821', '&#9820', '&#9823', '&#9823', '&#9823', '&#9823', '&#9823', '&#9823', '&#9823', '&#9823'];
var numNav = [1, 2, 3, 4, 5, 6, 7, 8];
var strNav = ['A', 'B', 'C', 'D', 'I', 'F', 'G', 'H'];

function drawChess() {
   var chess = document.querySelector('.board'); //находим первый элемент с классом board
   var num = 0;
   for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8 ; j++) {
         if (num % 2 == 0) {
            chess.innerHTML += '<div class="square"></div>'; //добавляем ячейки чередуя с черными
         } else {
            chess.innerHTML += '<div class="square black"></div>';
         }
         num++;
      }
      num++;
   }
}
drawChess();

var testBlack = document.getElementsByClassName('square');
var lenBlack = Math.min(chessFiguresBlack.length, testBlack.length);
for (var i = 0; i < lenBlack; i++) {
   testBlack[i].innerHTML = chessFiguresBlack[i];
   testBlack[i].style.fontSize = '75px';
   testBlack[i].style.textAlign = 'center';
   testBlack[i].style.transform = 'rotate(180deg)';
   
} 

/* var testWhile = document.getElementsByClassName('square');
var lenWhile = Math.min(chessFiguresWhile.length, testWhile.length);
for (var i = 0; i < lenWhile; i++) {
   testWhile[i].innerHTML = chessFiguresWhile[i];
   testWhile[i].style.fontSize = '75px';
   testWhile[i].style.textAlign = 'center';
} */

var nav = document.querySelector('.board');

//nav.insertAdjacentHTML("beforebegin", numNav[]);