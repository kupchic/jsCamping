import { MessagesModel, Message, messages } from './jsDeepDrive.js';

let mesL = new MessagesModel(messages);
console.log(mesL);

let privatess = new Message({ text: 'f' });
console.log(privatess);

let userName = document.querySelector('.user-name');
console.log(userName);
