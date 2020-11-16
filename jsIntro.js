const myModule = (function () {
  let messages = [{
    id: '1',
    text: 'Привет!',
    createdAt: new Date('2020-10-12T23:00:00'),
    author: 'Александр Купченя',
    isPersonal: true,
    to: 'Дарья Шурова'
  },
  {
    id: '2',
    text: 'Как Дела?',
    createdAt: new Date('2020-10-12T23:01:00'),
    author: 'Александр Купченя',
    isPersonal: true,
    to: 'Дарья Шурова'
  },
  {
    id: '3',
    text: 'привет)',
    createdAt: new Date('2020-10-12T23:00:00'),
    author: 'Дарья Шурова',
    isPersonal: true,
    to: 'Купченя Александр'
  },
  {
    id: '4',
    text: 'пока не родила))',
    createdAt: new Date('2020-10-12T23:01:10'),
    author: 'Дарья Шурова',
    isPersonal: true,
    to: 'Александр Купченя'
  },
  {
    id: '5',
    text: 'Декан на лекции!',
    createdAt: new Date('2020-10-12T23:00:00'),
    author: 'Владислав Мацкевич',
    isPersonal: false,
    to: false
  },
  {
    id: '6',
    text: 'Декан пришел, палундра( Бегом на пару',
    createdAt: new Date('2020-10-12T12:30:02'),
    author: 'Александр Купченя',
    isPersonal: true,
    to: 'Дарья Шурова'
  },
  {
    id: '7',
    text: '5 минут!',
    createdAt: new Date('2020-10-12T12:35:00'),
    author: 'Дарья Шурова',
    isPersonal: false,
    to: 'Александр Купченя'
  },
  {
    id: '8',
    text: 'А я за шавой!',
    createdAt: new Date('2020-10-12T13:00:00'),
    author: 'Антон Лях',
    isPersonal: false,
    to: false
  },
  {
    id: '9',
    text: 'Приятного аппетита)',
    createdAt: new Date('2020-10-12T13:05:00'),
    author: 'Дарья Шурова',
    isPersonal: false,
    to: false
  },
  {
    id: '10',
    text: 'Спасибо!',
    createdAt: new Date('2020-10-12T13:11:00'),
    author: 'Антон Лях',
    isPersonal: false,
    to: false
  },
  {
    id: '11',
    text: 'Aliquam blandit enim ut nibh imperdiet, in dignissim tortor lobortis!',
    createdAt: new Date('2020-10-12T14:11:00'),
    author: 'Jonh Snow',
    isPersonal: true,
    to: 'Daenerys Targaryen'
  },
  {
    id: '12',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque rhoncus urna blandit est eleifend, non egestas magna dictum.',
    createdAt: new Date('2020-10-12T15:11:00'),
    author: 'Daenerys Targaryen',
    isPersonal: true,
    to: 'Jonh Snow'
  },
  {
    id: '13',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque rhoncus urna blandit est eleifend, non egestas magna dictum.',
    createdAt: new Date('2020-10-12T15:12:00'),
    author: 'Daenerys Targaryen',
    isPersonal: true,
    to: 'Jonh Snow'
  },
  {
    id: '14',
    text: 'Aliquam blandit enim ut nibh imperdiet, in dignissim tortor lobortis!',
    createdAt: new Date('2020-10-12T10:11:00'),
    author: 'Jonh Snow',
    isPersonal: true,
    to: 'Daenerys Targaryen'
  },
  {
    id: '15',
    text: 'Aliquam blandit enim ut nibh imperdiet, in dignissim tortor lobortis! Yohoo',
    createdAt: new Date('2020-10-12T09:11:00'),
    author: 'Jonh Snow',
    isPersonal: false,
    to: false
  },
  {
    id: '16',
    text: 'Aliquam blandit enim ut nibh imperdiet, in dignissim tortor lobortis!',
    createdAt: new Date('2020-10-12T08:11:00'),
    author: 'Jonh Snow',
    isPersonal: true,
    to: 'Daenerys Targaryen'
  },
  {
    id: '17',
    text: 'Aliquam blandit enim ut nibh imperdiet, in dignissim tortor lobortis!',
    createdAt: new Date('2020-10-12T19:11:00'),
    author: 'Jonh Snow',
    isPersonal: false,
    to: false
  },
  {
    id: '18',
    text: 'Aliquam blandit enim ut nibh imperdiet, in dignissim tortor lobortis!',
    createdAt: new Date('2020-10-12T07:11:00'),
    author: 'Jonh Snow',
    isPersonal: true,
    to: 'Daenerys Targaryen'
  },
  {
    id: '20',
    text: 'Aliquam blandit enim ut nibh imperdiet, in dignissim tortor lobortis!',
    createdAt: new Date('2020-10-12T19:12:00'),
    author: 'Jonh Snow',
    isPersonal: false,
    to: false
  },
  {
    id: '19',
    text: 'Aliquam blandit enim ut nibh imperdiet, in dignissim tortor lobortis!',
    createdAt: new Date('2020-10-12T19:11:00'),
    author: 'Jonh Snow',
    isPersonal: false,
    to: false
  }

  ];

  const my = 'Александр Купченя';

  function validateMessage(msg) {
    let flag = true;
    if (msg.hasOwnProperty('text')) {
      if (typeof msg.text !== 'string' || (msg.text.length == 0 || msg.text.length > 200)) {
        flag = false;
        console.log('text is Invalid');
      }
    } else {
      flag = false;
      console.log('Object does not have all reguaired fields');
    }
    if (msg.hasOwnProperty('isPersonal')) {
      if (typeof msg.isPersonal !== 'boolean') {
        flag = false;
        console.log('Invalid isPersonal property!');
      }
      if (msg.isPersonal && !(msg.hasOwnProperty('to') && typeof msg.to === 'string' && msg.to.length > 0)) {
        flag = false;
      } else if (!msg.isPersonal) {
        msg.to = msg.isPersonal;
      }
    }
    return flag;
  }

  function addMessage(msg) {
    if (validateMessage(msg)) {
      msg.id = `${+new Date()}`;
      msg.createdAt = new Date();
      msg.author = my;
      messages.push(msg);
      console.log('message add succsesfull');
      return true;
    }
    console.log('Message do not add. Message structure is invalid!');
    return false;
  }

  function removeMessage(id) {
    messages.splice(
      messages.findIndex(item => item.id === id), 1
    );
    return messages;
  }

  function editMessage(id, msg) {
    let editedItem = messages.find(item => {
      return item.id === id;
    });
    if (validateMessage(msg)) {
      for (let key in msg) {
        editedItem[key] = msg[key];
      }
      return editedItem;
    } return false;
  }

  function getMessage(id) {
    return messages.find(item => {
      return item.id === id;
    }); // .text??
  }

  function getMessages(skip = 0, top = 10, filterConfig = {}) {
    let messagesFiltered = messages.slice().sort((a, b) => {
      return a.createdAt - b.createdAt;
    });
    for (let key in filterConfig) {
      if (key === 'author') {
        messagesFiltered = messagesFiltered.filter((item) => {
          return item.author.toLowerCase().includes(filterConfig[key].toLowerCase());
        });
      }
      if (key === 'text') {
        messagesFiltered = messagesFiltered.filter((item) => {
          return item.text.toLowerCase().includes(filterConfig[key].toLowerCase());
        });
      }

      if (key === 'dateFrom') {
        messagesFiltered = messagesFiltered.filter((item) => {
          return item.createdAt > filterConfig[key];
        });
      }
      if (key === 'dateTo') {
        messagesFiltered = messagesFiltered.filter((item) => {
          return item.createdAt < filterConfig[key];
        });
      }
    }
    return messagesFiltered.slice(skip, skip + top);
  }

  return {
    addMessage,
    removeMessage,
    editMessage,
    validateMessage,
    getMessage,
    getMessages
  };
}());

// console.log(myModule.getMessages(0,10)); //done
// console.log(myModule.getMessages(10,10)); //done
// console.log(myModule.getMessages({
//   author: 'snow',
//   dateTo: new Date('2020-10-12T15:11:00'),
// }, 0, 10, )); //done
// console.log(myModule.getMessages({
//   author: 'snow',
//   dateTo: new Date('2020-10-12T15:11:00'),
//   text: 'yohoo'
// }, 0, 10, )); //done

// console.log(myModule.getMessage('5')); //done
// console.log(myModule.removeMessage('3')); //done
// console.log(myModule.validateMessage({
//   text: 'f',
//   isPersonal: true,
//   to: '3',
// })); //done
console.log(myModule.addMessage(
  {
    text: 'Работает!',
    isPersonal: true,
    to: 'Дарья Шурова'
  }
)); // done
// console.log(myModule.addMessage(
//   {
//     text: 'hy',
//     isPersonal: true,
//     to: 'Дарья Шурова',
//   }
// )); //done
console.log(myModule.editMessage('20', {
  text: '',
  isPersonal: true,
  to: 'my'
})); // done
// console.log(myModule.editMessage('20', {
//   text: 'e',
//   isPersonal: true,
// })); //done
// myModule.addMessage({
// text:'may be are you ready'
// });//done

// myModule.getMessages(0,10,{
//   author:'купченя'
// });//done

function add(a, b) {
  if (b) return a + b;
  return (b2) => {
    return a + b2;
  };
}

function sub(a, b) {
  if (b) return a - b;
  return (b2) => {
    return b2 - a;
  };
}

function mul(a, b) {
  if (b) return a * b;
  return (b2) => {
    return a * b2;
  };
}

function div(a, b) {
  if (b) return a / b;
  return (b2) => {
    return a / b2;
  };
}

let a = add(1, 2); // 3
console.log(a);

let b = mul(a, 10); // 30
console.log(b);

let sub1 = sub(1); // sub1 отнимает от любого числа единицу
let c = sub1(b); // 29
console.log(c);

let d = mul(sub(a, 2))(c); // 58

console.log(d);

// function pipe(...args){
//   return (f)=>{
//     return div(());
//   }
// }

// let d = add(2);
// console.log(d(add(1, 2)));
// console.log('d',d);
// let a = add(1, 2);
// let b = mul(a, 10);
// let sub1 = sub(1);

// let c = sub1(b);
// console.log(a);
// console.log(b);
// console.log(c);
