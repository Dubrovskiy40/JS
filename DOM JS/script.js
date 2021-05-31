var unit; //пешка

function chessBoard() {
   var newTable = document.createElement('table'),
      str = ['', 'A', 'B', 'C', 'D', 'I', 'F', 'G', 'H', ''],
      blackFigure = ['8', '&#9814', '&#9816','&#9815',  '&#9813', '&#9812', '&#9815', '&#9816','&#9814', '8'],
      blackUnit = ['7', '&#9817', '&#9817', '&#9817', '&#9817', '&#9817', '&#9817', '&#9817', '&#9817', '7'],
      whiteUnit = ['2', '&#9823', '&#9823', '&#9823', '&#9823', '&#9823', '&#9823', '&#9823', '&#9823', '2'],
      whiteFigure = ['1', '&#9820', '&#9822', '&#9821', '&#9819', '&#9818', '&#9821', '&#9822', '&#9820', '1'];

   for (var i = 0, a = 9; i < 10; i++, a--) {
      //var newTr = newTable.insertRow(i); // тоже самое что и строка ниже
      var newTr = document.createElement('tr');
      for (var j = 0; j < 10; j++) {
         //var newTd = newTr.insertCell(j); // тоже самое что и строка ниже
         var newTd = document.createElement ('td');
         switch (i) {
            case 0:
               newTd.innerText = str[j];
               break;
            case 1:
               newTd.innerHTML = blackFigure[j];
               break;
            case 2:
               newTd.innerHTML = blackUnit[j];
               newTd.id = "id_" + i + "_" + j; //добавляем атрибут id равный этому значению
               newTd.onclick = function() {
                  unit = this;
                  this.style.border = "2px solid red";
               }//по клику на ячейку запускаем функцию
               break;
            case 7:
               newTd.innerHTML =  whiteUnit[j];
               break;
            case 8:
               newTd.innerHTML = whiteFigure[j];
               break;
            case 9:
               newTd.innerHTML = str[j];
               break;
            default:
               if (j == 0 || j == 9) {
                  newTd.innerHTML = a;
               } else {
                  newTd.onclick = function() {
                     var idField = unit.id.split("_")[2];
                     var y = this.className.split("_")[1];
                     if (y != idField) {
                        alert('ход недоступен');
                     } else {
                        document.getElementById(unit.id).style = ""; //обращаемся к элементу с фигурой по id 
                        this.innerHTML = unit.innerHTML; //помещаем в новую ячейку выбранную фигуру 
                        document.getElementById(unit.id).innerHTML = "";//очищаем текущее положение ячейки от фигуры
                     }
                  }
               }
               break;
         }
         newTr.appendChild(newTd);
      }
      newTable.appendChild(newTr);
   }
document.body.append(newTable);
}
chessBoard();