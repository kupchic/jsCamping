Date.prototype.daysInMonth = function () {
  return 33 - new Date(this.getFullYear(), this.getMonth(), 33).getDate();
};

function createCalendar(elem, year, month) {

  let dateNow = new Date(year, month - 1);
  let firstDay = dateNow.getDay() ? dateNow.getDay() - 1 : 7;
  let daysInMonth = dateNow.daysInMonth();
  let table = `<table id="table"  cellpadding="0" border = "1" ><tr bgcolor="gray"><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr><tr>`;

  if (firstDay !== 7) {
    for (let i = 0; i < firstDay; i++) {
      table += '<td></td>';
    }
  }

  for (let i = firstDay; i <= daysInMonth + firstDay - 1; i++) {
    table += `<td>${i - firstDay +1 }</td>`;
    if (i % 7 === 6) {
      table += '</tr><tr>';
    }
  }
  if ((firstDay + daysInMonth) % 7 !== 0) {
    for (let i = 0; i < (7 - ((firstDay + daysInMonth) % 7)); i++) {
      table += '<td></td>';
    }
  }

  table += '</tr></table>';
  table = table.replace('<tr></tr>', "");
  let map = {
    1: 'Январь',
    2: 'Февраль',
    3: 'Март',
    4: 'Апрель',
    5: 'Май',
    6: 'Июнь',
    7: 'Июль',
    8: 'Август',
    9: 'Сентябрь',
    10: 'Октябрь',
    11: 'Ноябрь',
    12: 'Декабря',
  };

  const title = document.createElement('h2');
  const wrapper = document.createElement('div');

  wrapper.setAttribute('id', `${elem}`);
  title.textContent = `${map[month]} ${year}-го года`;
  document.body.appendChild(title);
  document.body.appendChild(wrapper);
  wrapper.innerHTML = table;
}
// createCalendar('d', 2020, 2);
// createCalendar('d', 2021, 11);
// createCalendar('wrp', 2021, 2);