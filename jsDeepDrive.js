// (function () {
//   'use strict';
// }());
'use strict';
class Message {
  constructor(options) {
    this._id = options.id;
    this._author = options.author;
    this._createdAt = options.createdAt;
    this.text = options.text;
    this.isPersonal = options.isPersonal || false;
    this.to = options.to || false;
  }

  get id() {
    return this._id;
  }
  set id(values) {
    if (this._id !== values) {
      throw new Error("You  can't change this field!");
    } else
      this._id = values;
  }
  get author() {
    return this._author;
  }
  set author(values) {
    if (this._author !== values) {
      throw new Error("You can't change this field!");
    } else
      this._author = values;
  }
  get createdAt() {
    return this._createdAt;
  }
  set createdAt(values) {
    if (this._createdAt !== values) {
      throw new Error("You can't change this field!");
    } else
      this._author = values;
  }
}


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
    text: 'Aliquam blandit enim ut nibh imperdiet, in dignissim tortor lobortis! Yohoo',
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
    text: 'Aliquam blandit enim ut nibh imperdiet, in dignissim tortor lobortis за шавой !',
    createdAt: new Date('2020-10-12T19:11:00'),
    author: 'Jonh Snow',
    isPersonal: false,
    to: false,
  },

];

var dr = 0;

class MessagesModel {

  _user = 'Александр Купченя' || "Unsigned user";

  static validate(msg) {
    var validateObj = {
      text: (item) => item.text && item.text.length <= 200 && item.text.length !== 0,
    };

    if (msg.hasOwnProperty('isPersonal')) {
      if (typeof msg.isPersonal !== 'boolean' || (msg.isPersonal && !(msg.hasOwnProperty('to') && typeof msg.to === 'string' && msg.to.length > 0))) {
        return false;
      }
      if (!msg.isPersonal) {
        msg.to = msg.isPersonal;
      }
    }
    return Object.keys(validateObj).every((key) => validateObj[key](msg));
  }

  add(msg) {
    const author = "Александр Купченя";
    if (MessagesModel.validate(msg)) {
      msg.id = `${+ new Date()}`;
      msg.createdAt = new Date();
      msg.author = author;
      let msgs = new Message(msg);
      messages.push(msgs);
      return true;
    } else return false;
  }

  remove(id) {
    messages.splice(
      messages.findIndex(item => item.id === id), 1);
    return messages;
  }

  get(id) {
    return messages.find(item => {
      return item.id === id;
    });
  }

  edit(id, msg) {
    let editedItem = messages.find(item => {
      return item.id === id;
    });

    if (MessagesModel.validate(msg)) {
      for (let key in msg) {
        editedItem[key] = msg[key];
      }
      return editedItem;
    } else return false;
  }

  getPage(skip = 0, top = 10, filterConfig = {}) {
    let messagesFiltered = messages.slice().sort((a, b) => {
      return a.createdAt - b.createdAt;
    });

    const filterObj = {
      author: (item, author) => author && item.author.toLowerCase().includes(author.toLowerCase()),
      text: (item, text) => text && item.text.toLowerCase().includes(text.toLowerCase()),
      dateFrom: (item, dateFrom) => dateFrom && item.createdAt > +dateFrom,
      dateTo: (item, dateTo) => dateTo && item.createdAt < dateTo,
    };
    Object.keys(filterConfig).forEach((key) => {
      messagesFiltered = messagesFiltered.filter((item) => {
        return filterObj[key](item, filterConfig[key]);
      });
    });
    return messagesFiltered.slice(skip, skip + top);
  }
}


let privateS = new MessagesModel();
// privateS.add({
//   text: 'de',
//   isPersonal: false,
// });
// privateS.edit('1', {
//   text: 'd,fdf',
// });
// privateS.remove('19');
// privateS.get('2');
// console.log('privateS.get("1") ', privateS.get('1'));
// console.log(privateS.getPage(0, 10, {
//   dateFrom: new Date('2020-10-12T19:12:00'),
// }));
console.log(privateS._user);

console.log(e);