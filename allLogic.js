// Model
class Message {
  constructor(options) {
    this._id = options.id || options._id;
    this._createdAt = options.createdAt || options._createdAt;
    this._author = options.author || options._author;
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

class MessagesModel {
  constructor() {
    this._arr = JSON.parse(localStorage.messages, function (key, value) {
      if (key === '_createdAt') {
        return new Date(value);
      }
      return value;
    }).map(item=> new Message(item));
    this._user = localStorage.currentUser;
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
      this.save();
      return true;
    }
    return false;
  }

  save() {
    localStorage.setItem('messages', JSON.stringify(this.arr));
  }

  // restore(){

  // }

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
    return messagesFiltered.slice(skip - top);
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

// View
class UserList {
  constructor(users, activeUsers) {
    this.users = users;
    this.activeUsers = activeUsers;
  }
}

class HeaderView {
  constructor(id) {
    this.id = id;
  }

  display(params) {
    if (params !== 'null') {
      let userName = document.querySelectorAll(`.${this.id}`);
      let userAvatarFl = document.querySelectorAll(`.${this.id} + .user-avatar > .user-avatar_first-letter`);
      let userAvatarSl = document.querySelectorAll(`.${this.id} + .user-avatar > .user-avatar_second-letter`);
      userName.textContent = params;
      for (let i = 0; i < userName.length; i++) {
        userName[i].textContent = params;
      }
      for (let i = 0; i < userAvatarFl.length; i++) {
        userAvatarFl[i].textContent = params.split(' ')[0][0];
      }
      for (let i = 0; i < userAvatarSl.length; i++) {
        userAvatarSl[i].textContent = params.split(' ')[1][0];
      }
    }
  }
}

class ActiveUsersView {
  constructor(id) {
    this.id = id;
  }

  display(params) {
    const onlineUserTpl = document.getElementById('online-user-tpl');
    const title = document.querySelector('.list-block .block-title');
    const onlineCount = document.querySelector('.online-member-count');
    const userOnline = new DocumentFragment();
    title.textContent = 'Online';
    onlineCount.textContent = params.length;
    for (let i = 0; i < params.length; i++) {
      let children = onlineUserTpl.content.cloneNode(true);
      children.querySelector('.chat-with-who > h4').textContent = params[i];
      children.querySelector('.online-user-avatar > .user-avatar_first-letter').textContent = params[i].split(' ')[0][0];
      children.querySelector('.online-user-avatar > .user-avatar_second-letter').textContent = params[i].split(' ')[1][0];
      userOnline.appendChild(children);
    }
    document.querySelector(`.${this.id}`).innerHTML = '';
    document.querySelector(`.${this.id}`).appendChild(userOnline);
  }
}

class MessagesView {
  constructor(id) {
    this.id = id;
  }

  display(params) {
    const myMsgTpl = document.getElementById('my-chat-msg-tpl');
    const companionMsgTpl = document.getElementById('companion-chat-msg-tpl');
    const chatView = new DocumentFragment();
    const userName = localStorage.getItem('currentUser');
    for (let i = 0; i < params.length; i++) {
      if (params[i]._author === userName /* || (params[i]._author !== userName && localStorage.currentUser !== 'null') */) {
        let myMsgChildren = myMsgTpl.content.cloneNode(true);
        myMsgChildren.querySelector('.message').textContent = params[i].text;
        myMsgChildren.querySelector('.send-time').textContent = `${params[i].createdAt.getHours()}:${String(params[i].createdAt.getMinutes()).length === 2 ? params[i].createdAt.getMinutes() : '0' + params[i].createdAt.getMinutes()} ${params[i].createdAt.getHours() > 12 ? 'PM' : 'AM'}`;
        chatView.appendChild(myMsgChildren);
      } else if (params[i]._author !== userName) {
        let companionMsgChildren = companionMsgTpl.content.cloneNode(true);
        companionMsgChildren.querySelector('.companion-name').textContent = params[i]._author;
        companionMsgChildren.querySelector('.message').textContent = params[i].text;
        companionMsgChildren.querySelector('.send-time').textContent = `${params[i]._createdAt.getHours()}:${String(params[i].createdAt.getMinutes()).length === 2 ? params[i].createdAt.getMinutes() : '0' + params[i].createdAt.getMinutes()} ${params[i].createdAt.getHours() > 12 ? 'PM' : 'AM'}`;
        chatView.appendChild(companionMsgChildren);
      }
    }
    document.querySelector(`.${this.id}`).innerHTML = '';
    document.querySelector(`.${this.id}`).appendChild(chatView);
  }
}

class ChatMessagesView { // for me...
  constructor(id) {
    this.id = id;
  }

  display(params) {
    const msgTpl = document.getElementById('chat-user-tpl');
    const title = document.querySelector('.list-block .block-title');
    const onlineCount = document.querySelector('.online-member-count');
    const messageExample = new DocumentFragment();
    title.textContent = 'Direct';
    onlineCount.textContent = '';
    for (let i = 0; i < params.length; i++) {
      if (params[i].to === localStorage.getItem('currentUser')) {
        let children = msgTpl.content.cloneNode(true);
        children.querySelector('.chat-with-who > h4').textContent = params[i]._author;
        children.querySelector('.chat-with-who > .chat-msg-preview').textContent = params[i].text;
        children.querySelector('.user-avatar > .user-avatar_first-letter').textContent = params[i]._author.split(' ')[0][0];
        children.querySelector('.user-avatar > .user-avatar_second-letter').textContent = params[i]._author.split(' ')[1][0];
        children.querySelector('.count-of-personal-msg').style.display = 'none';
        messageExample.appendChild(children);
      }
    }
    document.querySelector(`.${this.id}`).innerHTML = '';
    document.querySelector(`.${this.id}`).appendChild(messageExample);
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

let allUsers = ['Dima Tu', 'Zhenya Zh.', 'Zhenya H.', 'Sasha Kupchenya', 'Pasha  Komar'];
let onlineUsers = ['Dima Tu', 'Zhenya Zh.', 'Daria Shurova'];

let localSave = {
  currentUser: null,
  messages: messages,
  onlineUsers: onlineUsers,
  allUsers: allUsers
};

function savetoLocalStorage() {
  Object.keys(localSave).forEach(item=>{
    if (!localStorage[item]) {
      localStorage.setItem(`${item}`, JSON.stringify(localSave[item]));
    }
  });
}
savetoLocalStorage();

class Controller {
  constructor() {
    this.model = new MessagesModel();
    this.headerView = new HeaderView('user-name');
    this.messagesView = new MessagesView('chat-field');
    this.userList = new UserList(allUsers, onlineUsers);
    this.activeUsers = new ActiveUsersView('chats-list');
    this.chatMessagesView = new ChatMessagesView('chats-list');
    this.count = 10;
  }

  setCurrentUser(user = localStorage.currentUser) {
    localStorage.setItem('currentUser', user);
    this.model.user = user;
    return this.headerView.display(user);
  }

  showActiveUsers() {
    return this.activeUsers.display(this.userList.activeUsers);
  }

  showMessages(skip = 0, top = this.count, filterConfig = {}) {
    return this.messagesView.display(this.model.getPage(skip, top, filterConfig));
  }

  addMessage(obj) {
    return this.model.add(obj);
    // /* return */this.messagesView.display(this.model.getPage());
  }

  removeMessage(id) {
    this.model.remove(id);
    return this.messagesView.display(this.model.getPage());
  }

  editMessage(id, msg) {
    this.model.edit(id, msg);
    return this.messagesView.display(this.model.getPage());
  }

  personalChatsView() {
    return this.chatMessagesView.display(JSON.parse(localStorage.messages));
  }

  logOut() {
    this.setCurrentUser(JSON.stringify(null));
    this.showActiveUsers();
    this.showMessages();
  }

  logIn(value) {
    this.setCurrentUser(value);
    this.showMessages();
    this.showActiveUsers();
  }

  loadMore() {
    this.count -= 10;
    this.showMessages();
  }
}

const controller = new Controller();
controller.showMessages();
controller.setCurrentUser();

const linkToLogin = document.querySelector('.link-to-login-widow');
const logInWindow = document.querySelector('.login-window');
const signUpWindow = document.querySelector('.signup-window');
const toSignUpWindow = document.getElementById('to-sign-up-window');
const loginFildOfSignUp = document.getElementById('login-input-of-signup');
const passwordFieldOfSignUp = document.getElementById('password-of-signup');
const passwordConfirmOfSignUp = document.getElementById('password-confirm-of-signup');
const loginAuthorPanel = document.querySelector('.author-capabil');
const loginFieldOfLogin = document.getElementById('login-input-of-login');
const passwordFieldOfLogin = document.getElementById('password-input-of-login');

const toLoginWindowBtns = document.querySelectorAll('.to-login-window');
const toMainWindowBtns = document.querySelectorAll('.to-main-window');

const logInForm = document.getElementById('login-form');
const signUpForm = document.getElementById('sign-up-form');

const validatorPass = RegExp('(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])^[a-zA-Z0-9]{8,}');
const validatorLogin = RegExp('^\\S+ \\S+$');
const signUpWrong = document.getElementById('sign-up-warning');
const logInWrong = document.getElementById('login-warning');

const sendMsgInput = document.getElementById('text-send-input');
const msgForm = document.getElementById('text-send-block');
const inputsCollection = document.querySelectorAll('input');
const loadMore = document.getElementById('load-msg-link');

function validateInputs() {
  inputsCollection.forEach(item=>{
    item.addEventListener('input', () => {
      if (item.value === '') {
        item.classList.add('unvalidate');
      } else item.classList.remove('unvalidate');
    });
  });
}

function setRequired() {
  inputsCollection.forEach(item=>{
    item.setAttribute('required', '');
  });
}

function loginWindowShow() {
  validateInputs();
  signUpWindow.classList.add('hide');
  logInWindow.classList.remove('hide');
}

function signupWindowShow() {
  validateInputs();
  logInWindow.classList.add('hide');
  signUpWindow.classList.remove('hide');
  passwordFieldOfSignUp.addEventListener('input', () => {
    if (validatorPass.test(passwordFieldOfSignUp.value)) {
      passwordFieldOfSignUp.classList.add('validate');
      passwordConfirmOfSignUp.removeAttribute('disabled');
    } else if (!validatorPass.test(passwordFieldOfSignUp.value)) {
      passwordFieldOfSignUp.classList.remove('validate');
      passwordConfirmOfSignUp.setAttribute('disabled', '');
      passwordConfirmOfSignUp.value = '';
    }
  });

  passwordConfirmOfSignUp.addEventListener('input', () => {
    if (passwordConfirmOfSignUp.value === passwordFieldOfSignUp.value && validatorPass.test(passwordConfirmOfSignUp.value)) {
      passwordConfirmOfSignUp.classList.remove('invalid-pass');
      passwordConfirmOfSignUp.setCustomValidity('');
    } else if (passwordConfirmOfSignUp.value !== passwordFieldOfSignUp.value) {
      passwordConfirmOfSignUp.classList.add('invalid-pass');
      passwordConfirmOfSignUp.setCustomValidity('Passwords do not match');
    }
  });
}

function toMainWindow() {
  signUpWindow.classList.add('hide');
  logInWindow.classList.add('hide');
}

function listenerAdd() {
  linkToLogin.addEventListener('click', loginWindowShow);
  toSignUpWindow.addEventListener('click', signupWindowShow);
  toLoginWindowBtns.forEach(item =>item.addEventListener('click', loginWindowShow));
  toMainWindowBtns.forEach(item =>item.addEventListener('click', toMainWindow));
}
function listenerRemove() {
  linkToLogin.removeEventListener('click', loginWindowShow);
  toSignUpWindow.removeEventListener('click', signupWindowShow);
  toLoginWindowBtns.forEach(item =>item.removeEventListener('click', loginWindowShow));
  toMainWindowBtns.forEach(item =>item.removeEventListener('click', toMainWindow));
}
function formsWarning(form) {
  form.style.color = '#ff2828';
  setTimeout(() =>{
    form.style.color = 'transparent';
  }, 3000);
}

function loginUserPanel(item) {
  let target = item.target;
  if (target.id === 'online-users') {
    controller.showActiveUsers();
  } else if (target.id === 'direct') {
    controller.personalChatsView();
  } else if (target.id === 'log-out') {
    controller.logOut();
    linkToLogin.style.display = 'block';
    loginAuthorPanel.classList.add('hide');
    linkToLogin.classList.remove('hide');
    listenerAdd();
  }
}

function login(value) {
  linkToLogin.classList.add('hide');
  loginAuthorPanel.classList.remove('hide');
  controller.logIn(value);
  listenerRemove();
  inputsCollection.forEach(item=>{
    item.value = '';
    item.removeAttribute('required');
  });
}
if (localStorage.currentUser !== 'null') {
  loginAuthorPanel.classList.remove('hide');
  linkToLogin.classList.add('hide');
} else {
  loginAuthorPanel.classList.add('hide');
  linkToLogin.classList.remove('hide');
}
listenerAdd();
controller.showActiveUsers();

signUpForm.addEventListener('submit', (event)=> {
  event.preventDefault();
  setRequired();
  if (localStorage.getItem(loginFildOfSignUp.value) === null && loginFildOfSignUp.value && validatorPass.test(passwordConfirmOfSignUp.value)) {
    localStorage.setItem(loginFildOfSignUp.value, passwordConfirmOfSignUp.value);
    signUpWindow.classList.add('hide');
    linkToLogin.classList.add('hide');
    loginAuthorPanel.classList.remove('hide');
    controller.logIn(loginFildOfSignUp.value);
    listenerRemove();
    inputsCollection.forEach(item=>{
      item.value = '';
      item.removeAttribute('required');
    });
  } else if (localStorage.getItem(loginFildOfSignUp.value) !== null && validatorLogin.test(loginFildOfSignUp.value)) {
    formsWarning(signUpWrong);
  }
});

logInForm.addEventListener('submit', (event)=>{
  event.preventDefault();
  setRequired();
  if (localStorage.getItem(loginFieldOfLogin.value) !== null && localStorage.getItem(loginFieldOfLogin.value) === passwordFieldOfLogin.value && validatorPass.test(passwordFieldOfLogin.value) && validatorLogin.test(loginFieldOfLogin.value)) {
    logInWindow.classList.add('hide');
    login(loginFieldOfLogin.value);
  } else if (localStorage.getItem(loginFieldOfLogin.value) === null || localStorage.getItem(loginFieldOfLogin.value) !== passwordFieldOfLogin.value) {
    formsWarning(logInWrong);
  }
});

loginAuthorPanel.addEventListener('click', loginUserPanel);
msgForm.addEventListener('submit', (event)=>{
  event.preventDefault();
  if (sendMsgInput.value && controller.model.user) {
    controller.addMessage({ text: sendMsgInput.value });
    controller.showMessages();
    sendMsgInput.value = '';
  }
});
loadMore.addEventListener('click', ()=>{
  controller.count += 10;
  controller.showMessages();
});

const filterByUser = document.getElementById('filter-by-user');
const filterByText = document.getElementById('filter-by-text');
const filterFromDate = document.getElementById('filter-date-from');
const filterToDate = document.getElementById('filter-date-to');

let filterForm = document.getElementById('filter-form');
let filterSubmit = document.querySelector('.filter-submit');

filterForm.addEventListener('submit', (event)=>{
  event.preventDefault();
  document.querySelector('.filter-variants').classList.remove('filter-variants_active');
  document.querySelector('.filter-btn').classList.remove('hide');
  filterSubmit.classList.add('hide');
  let typesFilter = {
    author: filterByUser,
    text: filterByText,
    dateFrom: filterFromDate,
    dateTo: filterToDate
  };
  let objforFilter = {};
  Object.keys(typesFilter).forEach(key=>{
    if (typesFilter[key].value) {
      objforFilter[key] = typesFilter[key].value;
    }
  });

  controller.showMessages(0, 10, objforFilter);
});
