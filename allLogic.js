/* eslint-disable class-methods-use-this */
let chatApi = new ChatApiService();
const linkToLogin = document.querySelector('.link-to-login-widow');
const logInWindow = document.querySelector('.login-window');
const signUpWindow = document.querySelector('.signup-window');
const toSignUpWindow = document.getElementById('to-sign-up-window');
const passwordFieldOfSignUp = document.getElementById('password-of-signup');
const passwordConfirmOfSignUp = document.getElementById('password-confirm-of-signup');
const loginAuthorPanel = document.querySelector('.author-capabil');
const loginFieldOfLogin = document.getElementById('login-input-of-login');

const toLoginWindowBtns = document.querySelectorAll('.to-login-window');
const toMainWindowBtns = document.querySelectorAll('.to-main-window');

const logInForm = document.getElementById('login-form');
const signUpForm = document.getElementById('sign-up-form');

const validatorPass = RegExp('(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])^[a-zA-Z0-9]{8,}');

const sendMsgInput = document.getElementById('text-send-input');
const msgForm = document.getElementById('text-send-block');
const inputsCollection = document.querySelectorAll('input');
const loadMore = document.getElementById('load-msg-link');

const filterByUser = document.getElementById('filter-by-user');
const filterByText = document.getElementById('filter-by-text');
const filterFromDate = document.getElementById('filter-date-from');
const filterToDate = document.getElementById('filter-date-to');
const filterForm = document.getElementById('filter-form');
const filterSubmit = document.querySelector('.filter-submit');

const chatField = document.querySelector('.chat-field');
const editBtn = document.getElementById('edit-btn');
const toMainBtn = document.querySelector('.to-online-users');
const sendBtn = document.getElementById('submit-btn');
let meMsgId;

let localSave = {
  currentUser: null,
  curUserToken: null
};

function savetoLocalStorage() {
  Object.keys(localSave).forEach(item=>{
    if (!localStorage[item]) {
      localStorage.setItem(`${item}`, JSON.stringify(localSave[item]));
    }
  });
}
savetoLocalStorage();

function setRequired() {
  return inputsCollection.forEach(item=>{
    item.setAttribute('required', '');
  });
}
function removeRequired() {
  return inputsCollection.forEach(item=>{
    item.removeAttribute('required');
  });
}
function validateInputs() {
  return inputsCollection.forEach(item=>{
    item.addEventListener('input', () => {
      if (item.value === '') {
        item.classList.add('unvalidate');
      } else item.classList.remove('unvalidate');
    });
  });
}

function loginWindowShow() {
  signUpWindow.classList.add('hide');
  logInWindow.classList.remove('hide');
  validateInputs();
}

function toMainWindow() {
  signUpWindow.classList.add('hide');
  logInWindow.classList.add('hide');
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

class Controller {
  constructor() {
    this.headerView = new HeaderView('user-name');
    this.messagesView = new MessagesView('chat-field');
    this.activeUsers = new ActiveUsersView('chats-list');
    this.chatMessagesView = new ChatMessagesView('chats-list');
    this.chatWith = new ChatWith();
    this.params = { isPersonal: false };
    this.count = 10;
    this.memberCount = null;
    this.mainChatName = 'JS Camping';
    this.chatName = document.querySelector('.chat-description .chat-name h4');
    this.memberCountWrp = document.querySelector('.chat-member-count');
    this.timeOut = null;
    this.msgTimeOut = null;
    this.msgTo = {
      isPersonal: false,
      to: null
    };
  }

  showActiveUsers() {
    if (this.timeOut) {
      clearTimeout(this.timeOut);
    }
    chatApi.getUsers().then(data=> {
      this.activeUsers.display(data);
      this.memberCount = data.length;
    });
    this.timeOut = setTimeout(() => {
      this.showActiveUsers();
    }, 60000);
  }

  showMessages() {
    if (this.msgTimeOut) {
      clearTimeout(this.msgTimeOut);
    }
    chatApi.getMesseges(this.count, this.params).then(data=> { this.messagesView.display(data); });
    this.msgTimeOut = setTimeout(() => {
      this.showMessages();
    }, 60000);
  }

  registr() {
    signupWindowShow();
    signUpForm.addEventListener('submit', async (event)=>{
      event.preventDefault();
      setRequired();
      let signUpData = new FormData(signUpForm);
      const registerUrl = 'https://jslabdb.datamola.com/auth/register';

      try {
        const response = await fetch(registerUrl, {
          method: 'POST',
          body: signUpData
        });
        if (response.ok) {
          inputsCollection.forEach(item => {
            item.value = '';
          });
          signUpWindow.classList.add('hide');
          linkToLogin.click();
        } else formsWarning(document.getElementById('sign-up-warning'));
      } catch (error) {
        console.log(error);
      }
    });
  }

  login() {
    listenerAdd();
    logInWindow.classList.remove('hide');
    logInForm.addEventListener('submit', async (event) =>{
      event.preventDefault();
      setRequired();
      let loginData = new FormData(logInForm);
      const loginUrl = 'https://jslabdb.datamola.com/auth/login';
      try {
        const response = await fetch(loginUrl, {
          method: 'POST',
          body: loginData
        });
        if (response.ok) {
          logInWindow.classList.add('hide');
          loginAuthorPanel.classList.remove('hide');
          toMainBtn.click();
          this.classList.add('hide');
          loginAuthorPanel.addEventListener('click', loginUserPanel);
          sendMsgInput.setAttribute('placeholder', 'Type a message here...');
          listenerRemove();
          removeRequired();
          sendBtn.removeAttribute('disabled');
        } else formsWarning(document.getElementById('login-warning'));

        return response.json().then(token=> {
          localStorage.setItem('curUserToken', token.token);
          controller.setCurrentUser(loginFieldOfLogin.value);
          controller.showActiveUsers();
          controller.showMessages();
        });
      } catch (error) {
        console.log(error);
      }
    });
  }

  setCurrentUser(user = localStorage.currentUser) {
    if (user && user !== 'null') {
      localStorage.setItem('currentUser', user);
      return this.headerView.display(user);
    }
    return user;
  }

  personalChatsView() {
    return chatApi.getMesseges().then(data=> {
      this.chatMessagesView.display(data.filter(item => item.to === localStorage.getItem('currentUser')));
    });
  }

  loadMore() {
    this.count -= 10;
    this.showMessages();
  }

  chatWithWho(name) {
    return this.chatWith.display(name);
  }

  toMainChat() {
    this.chatName.textContent = this.mainChatName;
    chatApi.getUsers().then(data=>{
      this.memberCountWrp.textContent = data.length;
    });
    this.memberCountWrp.parentNode.classList.remove('hide');
    this.chatWith.firstLetterAvatar.textContent = this.mainChatName.split(' ')[0][0];
    this.chatWith.secondLetterAvatar.textContent = this.mainChatName.split(' ')[1][0];
  }
}

const controller = new Controller();

chatApi.getMesseges().then(()=>controller.showMessages());
chatApi.getUsers().then(data=>controller.showActiveUsers(data));

toSignUpWindow.addEventListener('click', controller.registr);
linkToLogin.addEventListener('click', controller.login);

loadMore.addEventListener('click', ()=>{
  controller.count += 10;
  controller.showMessages();
});

if (localStorage.currentUser === 'null') {
  loginAuthorPanel.classList.add('hide');
  linkToLogin.classList.remove('hide');
  controller.toMainChat();
} else {
  sendBtn.removeAttribute('disabled');
  sendMsgInput.setAttribute('placeholder', 'Type a message here...');
  loginAuthorPanel.classList.remove('hide');
  linkToLogin.classList.add('hide');
  controller.setCurrentUser();
  controller.toMainChat();
  loginAuthorPanel.addEventListener('click', loginUserPanel);
}

function loginUserPanel(item) {
  let target = item.target;
  if (target.id === 'online-users') {
    controller.showActiveUsers();
    controller.count = 10;
    controller.params = { isPersonal: false };
    controller.msgTo.isPersonal = false;
    controller.msgTo.to = null;
    controller.showMessages();
    controller.toMainChat();
  } else if (target.id === 'direct') {
    controller.personalChatsView();
  } else if (target.id === 'log-out') {
    sendBtn.setAttribute('disabled', '');
    sendMsgInput.setAttribute('plauceholder', 'Log In to send messages...');
    chatApi.logOut().then(()=>{
      controller.showMessages();
      controller.showActiveUsers();
      controller.toMainChat();
      localStorage.currentUser = null;
      localStorage.curUserToken = null;
    });
    linkToLogin.style.display = 'block';
    loginAuthorPanel.classList.add('hide');
    linkToLogin.classList.remove('hide');
  }
}

function personalChatOn(elem) {
  if (localStorage.getItem('currentUser') !== 'null') {
    let persona = elem.children[0].children[1].childNodes[1].textContent;
    controller.params.isPersonal = true;
    controller.params.personalToFrom = persona;
    controller.msgTo.to = persona;
    controller.msgTo.isPersonal = true;
    controller.chatWithWho(persona);
    controller.showMessages();
    return true;
  }
  return false;
}

msgForm.addEventListener('submit', async (event)=>{
  event.preventDefault();
  if (sendMsgInput.value && localStorage.getItem('curUserToken') && localStorage.getItem('currentUser') !== 'null') {
    controller.msgTo.text = sendMsgInput.value;
    chatApi.postMsg(controller.msgTo).then(()=>{
      controller.showMessages();
      sendMsgInput.value = '';
    });
  }
});

chatField.addEventListener('click', (event)=>{
  let target = event.target.closest('div');
  if (target.className === 'msg-sett-wrp') {
    meMsgId = target.parentNode.childNodes[3].children[0].getAttribute('id');
  }

  if (event.target.className === 'settings-modal-list__item edit-msg') {
    sendMsgInput.value = document.getElementById(`${meMsgId}`).textContent;
    sendMsgInput.focus();
    editBtn.classList.remove('hide');
    editBtn.addEventListener('click', ()=>{
      chatApi.editMsg(meMsgId, {
        text: sendMsgInput.value,
        isPersonal: false
      }).then(()=>{
        editBtn.classList.add('hide');
        sendMsgInput.value = '';
        controller.showMessages();
      });
    });
  } else if (event.target.className === 'settings-modal-list__item delete-msg') {
    chatApi.deleteMsg(meMsgId).then(()=>controller.showMessages());
  }
});

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
  Object.keys(typesFilter).forEach(key=>{
    if (typesFilter[key].value) {
      controller.params[key] = typesFilter[key].value;
      typesFilter[key].value = '';
    } else {
      delete controller.params[key];
    }
  });
  controller.count = 10;
  controller.showMessages();
});
