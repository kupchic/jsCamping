// 'use strict';

class Message {
  constructor(options) {
    this._id = options.id;
    this._author = options.author;
    this._createdAt = options.createdAt;
    this.text = options.text;

  }
  get id() {
    return this._id;
  }
  set id(values) {
    if (this._id !== values) {
      throw new Error("You can't change this field!");
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
  id: '19',
  text: 'Aliquam blandit enim ut nibh imperdiet, in dignissim tortor lobortis!',
  createdAt: new Date('2020-10-12T19:11:00'),
  author: 'Jonh Snow',
  isPersonal: false,
  to: false,
}, ];
class MessagesModel {

  static validate(msg) {
    let flag = true;
    if (msg.hasOwnProperty("text")) {
      if (typeof msg.text !== 'string' || (msg.text.length == 0 || msg.text.length > 200)) {
        flag = false;
      }
    } else {
      flag = false;
    }
    if (msg.hasOwnProperty('isPersonal')) {
      if (typeof msg.isPersonal !== 'boolean') {
        flag = false;
      }
      if (msg.isPersonal && !(msg.hasOwnProperty('to') && typeof msg.to === 'string' && msg.to.length > 0)) {
        flag = false;
      } else if (!msg.isPersonal) {
        msg.to = msg.isPersonal;
      }
    }
    return flag;
  }

  add(msg) {
    let author = "Александр Купченя";
    if (MessagesModel.validate(msg)) {
      msg.id = `${+ new Date()}`;
      msg.createdAt = new Date();
      msg.author = author;
      let msgs = new Message(msg);
      messages.push(msgs);
      return true;
    } else {
      console.log("Message do not add. Message structure is invalid!");
      return false;
    }
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
    // console.log(editedItem);
    if (MessagesModel.validate(msg)) {
      for (let key in msg) {
        editedItem[key] = msg[key];
      }
      return editedItem;
    } else {
      console.log('messages is invalid');
      return false;
    }
  }
  getPage(skip = 0, top = 10, filterConfig = {}) {
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

      if (key === "dateFrom") {
        messagesFiltered = messagesFiltered.filter((item) => {
          return item.createdAt > filterConfig[key];
        });
      }
      if (key === "dateTo") {
        messagesFiltered = messagesFiltered.filter((item) => {
          return item.createdAt < filterConfig[key];
        });
      }
    }
    return messagesFiltered.slice(skip, skip + top);
  }


}
let privateS = new MessagesModel();

// privateS.add({
//   text: 'Aliquam blandit enim ut nibh imperdiet, in dignissim tortor lobortis!',
// });
// privateS.edit('19', {
//   text: 'f',
// });
// privateS.remove('19');


console.log(messages);