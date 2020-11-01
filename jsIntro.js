let messages = [{
    id: '1',
    text: 'Привет!',
    createdAt: new Date('2020-10-12T23:00:00'),
    author: 'Александр Купченя',
    isPersonal: true,
    to: 'Дарья Шурова',
  },
  {
    id: '2',
    text: 'Как Дела?',
    createdAt: new Date('2020-10-12T23:01:00'),
    author: 'Александр Купченя',
    isPersonal: true,
    to: 'Дарья Шурова',
  },
  {
    id: '3',
    text: 'привет)',
    createdAt: new Date('2020-10-12T23:00:00'),
    author: 'Дарья Шурова',
    isPersonal: true,
    to: 'Купченя Александр',
  },
  {
    id: '4',
    text: 'пока не родила))',
    createdAt: new Date('2020-10-12T23:01:10'),
    author: 'Дарья Шурова',
    isPersonal: true,
    to: 'Александр Купченя',
  },
  {
    id: '5',
    text: 'Декан на лекции!',
    createdAt: new Date('2020-10-12T23:00:00'),
    author: 'Владислав Мацкевич',
    isPersonal: false,
    to: false,
  },
  {
    id: '6',
    text: 'Декан пришел, палундра( Бегом на пару',
    createdAt: new Date('2020-10-12T12:30:02'),
    author: 'Александр Купченя',
    isPersonal: true,
    to: 'Дарья Шурова',
  },
  {
    id: '7',
    text: '5 минут!',
    createdAt: new Date('2020-10-12T12:35:00'),
    author: 'Дарья Шурова',
    isPersonal: false,
    to: 'Александр Купченя',
  },
  {
    id: '8',
    text: 'А я за шавой!',
    createdAt: new Date('2020-10-12T13:00:00'),
    author: 'Антон Лях',
    isPersonal: false,
    to: false,
  },
  {
    id: '9',
    text: 'Приятного аппетита)',
    createdAt: new Date('2020-10-12T13:05:00'),
    author: 'Дарья Шурова',
    isPersonal: false,
    to: false,
  },
  {
    id: '10',
    text: 'Спасибо!',
    createdAt: new Date('2020-10-12T13:11:00'),
    author: 'Антон Лях',
    isPersonal: false,
    to: false,
  },
  {
    id: '11',
    text: 'Aliquam blandit enim ut nibh imperdiet, in dignissim tortor lobortis!',
    createdAt: new Date('2020-10-12T14:11:00'),
    author: 'Jonh Snow',
    isPersonal: true,
    to: 'Daenerys Targaryen',
  },
  {
    id: '12',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque rhoncus urna blandit est eleifend, non egestas magna dictum.',
    createdAt: new Date('2020-10-12T15:11:00'),
    author: 'Daenerys Targaryen',
    isPersonal: true,
    to: 'Jonh Snow',
  },
  {
    id: '13',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque rhoncus urna blandit est eleifend, non egestas magna dictum.',
    createdAt: new Date('2020-10-12T15:12:00'),
    author: 'Daenerys Targaryen',
    isPersonal: true,
    to: 'Jonh Snow',
  },
  {
    id: '14',
    text: 'Aliquam blandit enim ut nibh imperdiet, in dignissim tortor lobortis!',
    createdAt: new Date('2020-10-12T10:11:00'),
    author: 'Jonh Snow',
    isPersonal: true,
    to: 'Daenerys Targaryen',
  },
  {
    id: '15',
    text: 'Aliquam blandit enim ut nibh imperdiet, in dignissim tortor lobortis!',
    createdAt: new Date('2020-10-12T09:11:00'),
    author: 'Jonh Snow',
    isPersonal: false,
    to: false,
  },
  {
    id: '16',
    text: 'Aliquam blandit enim ut nibh imperdiet, in dignissim tortor lobortis!',
    createdAt: new Date('2020-10-12T08:11:00'),
    author: 'Jonh Snow',
    isPersonal: true,
    to: 'Daenerys Targaryen',
  },
  {
    id: '17',
    text: 'Aliquam blandit enim ut nibh imperdiet, in dignissim tortor lobortis!',
    createdAt: new Date('2020-10-12T19:11:00'),
    author: 'Jonh Snow',
    isPersonal: false,
    to: false,
  },
  {
    id: '18',
    text: 'Aliquam blandit enim ut nibh imperdiet, in dignissim tortor lobortis!',
    createdAt: new Date('2020-10-12T07:11:00'),
    author: 'Jonh Snow',
    isPersonal: true,
    to: 'Daenerys Targaryen',
  },
  {
    id: '20',
    text: 'Aliquam blandit enim ut nibh imperdiet, in dignissim tortor lobortis!',
    createdAt: new Date('2020-10-12T19:12:00'),
    author: 'Jonh Snow',
    isPersonal: false,
    to: false,
  },
  {
    id: '19',
    text: 'Aliquam blandit enim ut nibh imperdiet, in dignissim tortor lobortis!',
    createdAt: new Date('2020-10-12T19:11:00'),
    author: 'Jonh Snow',
    isPersonal: false,
    to: false,
  },

];



const myModule = (function () {
  // let messFiltered = messages.sort((a, b) => {
  //   return a.createdAt - b.createdAt;
  // });

  function validateMessage(msg) {
    let flag = true;
    if (msg.hasOwnProperty("id", "text", "createdAt", "author")) {
      if (typeof msg.id !== 'string') {
        flag = false;
        console.log('Invalid ID');
      }

      if (typeof msg.text !== 'string' && (msg.text.length == 0 || msg.text.length > 200)) {
        flag = false;
        console.log("text is Invalid");
      }
      if (msg.createdAt instanceof Date) {
        flag = false;
        console.log('Invalid date of created');
      }
      if (typeof msg.author !== "string" && msg.author.length === 0) {
        flag = false;
        console.log('Invalid name of author');
      }
    } else {
      flag = false;
      console.log('Object does not have all reguaired fields');
    }
    if (msg.hasOwnProperty('isPersonal', 'to')) {
      if (typeof msg.isPersonal !== 'boolean') {
        flag = false;
        console.log("Invalid isPersonal property!");
      }
      if (typeof msg.to !== 'string' && msg.to.length === 0) {
        flag = false;
        console.log("Invalid property of 'to' field");
      }
    }
    return flag;
  }

  function addMessage(msg) {
    if (validateMessage(msg)) {
      messages.push(msg);
      console.log(messages);
      console.log('message add succsesfull');
    } else {
      console.log("Message do not add. Message structure is invalid!");
      return false;
    }
  }

  function removeMessage(id) {
    for (let item of messages) {
      console.log(item);
      if (item.id === id) {
        messages.splice(messages.indexOf(item), 1);
        console.log(item);
      }
    }
    return messages;
  }

  function editMessage(id, msg) {
    for (let item of messages) {
      if (item.id === id) {
        for (let key in msg) {
          if (key === 'text') {
            item.text = msg[key];
          }
        }
        return item;
      }
    }
  }

  function getMessage(id) {
    for (let item of messages) {
      if (item.id === id) {
        console.log(item);
        return item;
      }
    }
  }


  function getMessages(filterConfig,skip = 0, top = 10 ) {
    let messagesFiltered = messages.slice();
    for (let key in filterConfig) {
      if (key === 'author') {
        messagesFiltered.filter((item) => {
          return item.author.toLowerCase().includes(filterConfig[key].toLowerCase());
        });
      }
      if (key === 'text') {
        messagesFiltered.filter((item) => {
          return item.author.toLowerCase().includes(filterConfig[key].toLowerCase());
        });
      }

      if (key === "dateFrom") {
        messagesFiltered.filter((item) => {
          return item.createdAt > filterConfig[key];
        });
      }
      if (key === "dateTo") {
        messagesFiltered.filter((item) => {
          return item.createdAt < filterConfig[key];
        });
      }
    }
    return messagesFiltered.slice(skip, skip + top).sort((a, b) => {
      return a.createdAt - b.createdAt;
    });
  }

  return {
    addMessage,
    removeMessage,
    editMessage,
    validateMessage,
    getMessage,
    getMessages,
  };

})();


// console.log(myModule.getMessages(0,10));done
// console.log(myModule.getMessages(10,10)); done
console.log(myModule.getMessages({author: 'snow'}, 0, 5, ));

// console.log(myModule.getMessage('3')); done
// console.log(myModule.removeMessage('3')); done
// console.log(myModule.validateMessage( 
//   {
//     id: '21',
//     text: 'Привет!',
//     // createdAt: new Date('2020-10-12T23:00:00'),
//     author: 'Александр Купченя',
//     isPersonal: true,
//     to: 'Дарья Шурова',
//   }
// )); error by the date
// console.log(myModule.addMessage(
//   {
//     id: '21',
//     text: 'Привет!',
//     createdAt: new Date('2020-10-12T23:00:00'),
//     author: 'Александр Купченя',
//     isPersonal: true,
//     to: 'Дарья Шурова',
//   }
// )); 
// console.log(myModule.editMessage('1', { text: 'hi' })); done