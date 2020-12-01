export class Message {
  constructor(options) {
    this._id = options.id;
    this._createdAt = options.createdAt;
    this._author = options.author;
    this.text = options.text;
    this.isPersonal = options.isPersonal || false;
    this.to = options.to || false;
  }

  get id() {
    return this._id;
  }

  get author() {
    return this._author;
  }

  get createdAt() {
    return this._createdAt;
  }
}

export class MessagesModel {
  constructor(msgs) {
    this._arr = msgs.map(item=> new Message(item));
    this._user = null;
  }

  get arr() {
    return this._arr;
  }

  set arr(array) {
    this._arr = array;
  }

  get user() {
    return this._user;
  }

  set user(value) {
    this._user = value;
  }

  static validate(msg) {
    const validateObj = {
      text: (item) => item.text && item.text.length <= 200 && item.text.length !== 0
    };
    if (msg.isPersonal) {
      if (typeof msg.isPersonal !== 'boolean' || (msg.isPersonal && !(msg.to && typeof msg.to === 'string' && msg.to.length > 0))) {
        return false;
      }
    }
    return Object.keys(validateObj).every((key) => validateObj[key](msg));
  }

  add(msg) {
    if (MessagesModel.validate(msg) && this._user) {
      msg.id = `${+new Date()}`;
      msg.createdAt = new Date();
      msg.author = this._user;
      let msgs = new Message(msg);
      this.arr.push(msgs);
      return true;
    }
    return false;
  }

  remove(id) {
    this.arr.splice(
      this.arr.findIndex(item => item.id === id), 1
    );
    return this.arr;
  }

  get(id) {
    return this.arr.find(item => {
      return item.id === id;
    });
  }

  edit(id, msg) {
    let editedItem = this.arr.find(item => {
      return item.id === id;
    });

    if (MessagesModel.validate(msg) && editedItem.author === this._user) {
      Object.keys(msg).forEach(key=>{
        editedItem[key] = msg[key];
        return editedItem;
      });
      return editedItem;
    }
    return false;
  }

  getPage(skip = 0, top = 10, filterConfig = {}) {
    let messagesFiltered = this.arr.slice().sort((a, b) => {
      return a.createdAt - b.createdAt;
    }).filter(item => {
      return (item.author === this._user || ((item.isPersonal === true && item.to === this._user) || item.isPersonal === false));
    });

    const filterObj = {
      author: (item, author) => author && item.author.toLowerCase().includes(author.toLowerCase()),
      text: (item, text) => text && item.text.toLowerCase().includes(text.toLowerCase()),
      dateFrom: (item, dateFrom) => dateFrom && item.createdAt > +dateFrom,
      dateTo: (item, dateTo) => dateTo && item.createdAt < dateTo
    };

    Object.keys(filterConfig).forEach((key) => {
      messagesFiltered = messagesFiltered.filter((item) => {
        return filterObj[key](item, filterConfig[key]);
      });
    });
    return messagesFiltered.slice(skip, skip + top);
  }

  addAll() {
    let invalidMsgs = [];
    this.arr = this.arr.filter(item=>{
      if (!MessagesModel.validate(item)) {
        invalidMsgs.push(item);
      }
      return MessagesModel.validate(item);
    });
    return invalidMsgs;
  }

  clear() {
    this.arr = [];
  }
}

let messages = [{
  id: '1',
  text: 'Привет!',
  createdAt: new Date('2020-10-12T23:00:00'),
  author: 'Aleksandr Kupchenya',
  isPersonal: true,
  to: 'Дарья Шурова'
},
{
  id: '2',
  text: 'Как Дела?',
  createdAt: new Date('2020-10-12T23:01:00'),
  author: 'Aleksandr Kupchenya',
  isPersonal: true,
  to: 'Дарья Шурова'
},
{
  id: '3',
  text: 'привет)',
  createdAt: new Date('2020-10-12T23:00:00'),
  author: 'Дарья Шурова',
  isPersonal: true,
  to: 'Aleksandr Kupchenya'
},
{
  id: '4',
  text: 'пока не родила))',
  createdAt: new Date('2020-10-12T23:01:10'),
  author: 'Дарья Шурова',
  isPersonal: true,
  to: 'Aleksandr Kupchenya'
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
  author: 'Aleksandr Kupchenya',
  isPersonal: true,
  to: 'Дарья Шурова'
},
{
  id: '7',
  text: '5 минут!',
  createdAt: new Date('2020-10-12T12:35:00'),
  author: 'Дарья Шурова',
  isPersonal: false,
  to: 'Aleksandr Kupchenya'
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
  text: 'Aliquam blandit enim ut nibh imperdiet, in dignissim tortor lobortis за шавой !',
  createdAt: new Date('2020-10-12T19:11:00'),
  author: 'Jonh Snow',
  isPersonal: false,
  to: false
},

{
  id: '100',
  text: '',
  createdAt: new Date('2020-10-12T19:11:00'),
  author: 'Jonh Snow',
  isPersonal: false,
  to: false
}

];

export let privateS = new MessagesModel(messages);

privateS.add({
  text: 'SW',
  isPersonal: true,
  to: 'Shurova'
});

// privateS.edit('3', {
//   text: 'd,fdf'
// });
// privateS.edit('1', {
//   text: 'd,fdf'
// });

// privateS.remove('19');
// console.log(privateS.addAll());

// console.log(privateS.get('2'));
// console.log('privateS.get("1") ', privateS.get('1'));
// console.log(privateS.getPage(0, 10, { author: 'AleksaNdr' }));
// privateS.clear();

// console.log(privateS._arr);

// module.exports = MessagesModel;
const logInWindow = document.querySelector('.login-window');
const signUpWindow = document.querySelector('.signup-window');

const loginFieldOfLogin = document.getElementById('login-input-of-login');
const passwordFieldOfLogin = document.getElementById('password-input-of-login');
const loginBtn = document.getElementById('login-btn');
console.log(loginBtn);
// console.log(loginFieldOfLogin, passwordFieldOfLogin, loginBtn);

const loginFildOfSignUp = document.getElementById('login-input-of-signup');
const passwordFieldOfSignUp = document.getElementById('password-of-signup');
const passwordConfirmOfSignUp = document.getElementById('password-confirm-of-signup');
const signUpBtn = document.getElementById('signup-btn');
const signOutBtns = document.querySelectorAll('.sign-out-btn');
const toSignUpWindow = document.getElementById('to-sign-up-window');
console.log(toSignUpWindow);
// console.log(loginFildOfSignUp, passwordFieldOfSignUp, passwordConfirmOfSignUp, signUpBtn);
const loginAuthorPanel = document.querySelector('.author-capabil');
const inputsCollection = document.querySelectorAll('input');
const toLoginWindowBtns = document.querySelectorAll('.to-login-window');
const toOnlineUsersBtns = document.querySelectorAll('.to-online-users');
const toMainWindowBtns = document.querySelectorAll('.to-main-window');
const toDirectBtns = document.querySelectorAll('.to-direct');
console.log(toDirectBtns);

const validator = RegExp('(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])^[a-zA-Z0-9]{8,}');

// if (!signUpWindow.className.includes('hide')) {
for (let i = 0; i < inputsCollection.length; i++) {
  inputsCollection[i].addEventListener('input', () => {
    if (inputsCollection[i].value === '') {
      inputsCollection[i].classList.add('unvalidate');
    } else inputsCollection[i].classList.remove('unvalidate');
  });
}

passwordFieldOfSignUp.addEventListener('input', () => {
  if (validator.test(passwordFieldOfSignUp.value)) {
    passwordFieldOfSignUp.classList.add('validate');
    passwordConfirmOfSignUp.removeAttribute('disabled');
  } else if (!validator.test(passwordFieldOfSignUp.value)) {
    passwordFieldOfSignUp.classList.remove('validate');
    passwordConfirmOfSignUp.setAttribute('disabled', '');
    passwordConfirmOfSignUp.value = '';
  }
});

passwordConfirmOfSignUp.addEventListener('input', () => {
  if (passwordConfirmOfSignUp.value === passwordFieldOfSignUp.value && validator.test(passwordConfirmOfSignUp.value)) {
    passwordConfirmOfSignUp.classList.remove('invalid-pass');
    passwordConfirmOfSignUp.setCustomValidity('');
  } else if (passwordConfirmOfSignUp.value !== passwordFieldOfSignUp.value) {
    passwordConfirmOfSignUp.classList.add('invalid-pass');
    passwordConfirmOfSignUp.setCustomValidity('Passwords do not match');
  }
});
// }

const linkToLogin = document.querySelector('.link-to-login-widow');

let loginUserPanelControl = (item)=>{
  let target = item.target;
  if (target.id === 'online-users') {
    window.showMessages();
  } else if (target.id === 'direct') {
    window.showActiveUsers();
  } else if (target.id === 'log-out') {
    linkToLogin.style.display = 'block';
    loginAuthorPanel.classList.add('hide');
    loginAuthorPanel.removeEventListener('click', ()=>{});
  }
};

window.showLoginWindow = ()=> {
  logInWindow.classList.remove('hide');
};

loginAuthorPanel.addEventListener('click', loginUserPanelControl);

let logInForm = document.getElementById('login-form');
let signUpForm = document.getElementById('sign-up-form');

logInForm.addEventListener('reset', ()=>{
  logInWindow.classList.add('hide');
});
signUpForm.addEventListener('reset', ()=>{
  signUpWindow.classList.add('hide');
});

signUpForm.addEventListener('reset', ()=>{
  logInWindow.classList.add('hide');
});

function showSignUp() {
  logInWindow.classList.add('hide');
  signUpWindow.classList.remove('hide');
  console.log('clcik');
  // signUpBtn.removeEventListener('click', showSignUp);
}

toSignUpWindow.addEventListener('click', showSignUp);

console.log(toSignUpWindow);

console.log(toMainWindowBtns);

for (let i = 0; i < toMainWindowBtns.length; i++) {
  toMainWindowBtns[i].addEventListener('click', ()=>{
    logInWindow.classList.add('hide');
  });
}

function validateform(event) {
  event.preventDefault();
  let okey = true;
  for (let i = 0; i < inputsCollection.length; i++) {
    inputsCollection[i].setAttribute('required', '');
    if (inputsCollection[i].value === '') {
      okey = false;
    }
  }
}

// function go() {
//   let gfd = this.value;
//   console.log(gfd);
// }

// logInForm.addEventListener('submit', go);

// class Logined {
//   constructor(containerId) {
//     this.curUserNameField = containerId;
//   }

//   display() {

//   }
// }

// class Controller {
//   constructor() {
//     this.onlineUsers =
//   }
// }
