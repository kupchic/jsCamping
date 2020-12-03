import { MessagesModel, Message, messages } from './jsDeepDrive.js';

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
    title.appendChild(onlineCount);
    for (let i = 0; i < params.length; i++) {
      let children = onlineUserTpl.content.cloneNode(true);
      children.querySelector('.chat-with-who > h4').textContent = params[i];
      children.querySelector('.online-user-avatar > .user-avatar_first-letter').textContent = params[i].split(' ')[0][0];
      children.querySelector('.online-user-avatar > .user-avatar_second-letter').textContent = params[i].split(' ')[1][0];
      userOnline.appendChild(children);
    }
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
    // const chatWindow = document.querySelector('.chat-field');
    const chatView = new DocumentFragment();
    const userName = document.querySelector('.user-name').textContent;
    for (let i = 0; i < params.length; i++) {
      if (params[i].author === userName) {
        let myMsgChildren = myMsgTpl.content.cloneNode(true);
        myMsgChildren.querySelector('.message').textContent = params[i].text;
        myMsgChildren.querySelector('.send-time').textContent = `${params[i].createdAt.getHours()}:${String(params[i].createdAt.getMinutes()).length === 2 ? params[i].createdAt.getMinutes() : '0' + params[i].createdAt.getMinutes()} ${params[i].createdAt.getHours() > 12 ? 'PM' : 'AM'}`;
        chatView.appendChild(myMsgChildren);
      } else {
        let companionMsgChildren = companionMsgTpl.content.cloneNode(true);
        companionMsgChildren.querySelector('.companion-name').textContent = params[i].author;
        companionMsgChildren.querySelector('.message').textContent = params[i].text;
        companionMsgChildren.querySelector('.send-time').textContent = `${params[i].createdAt.getHours()}:${String(params[i].createdAt.getMinutes()).length === 2 ? params[i].createdAt.getMinutes() : '0' + params[i].createdAt.getMinutes()} ${params[i].createdAt.getHours() > 12 ? 'PM' : 'AM'}`;
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
    const messageExample = new DocumentFragment();
    title.textContent = 'Direct';
    for (let i = 0; i < params.length; i++) {
      let children = msgTpl.content.cloneNode(true);
      children.querySelector('.chat-with-who > h4').textContent = params[i].author;
      children.querySelector('.chat-with-who > .chat-msg-preview').textContent = params[i].text;
      children.querySelector('.user-avatar > .user-avatar_first-letter').textContent = params[i].author.split(' ')[0][0];
      children.querySelector('.user-avatar > .user-avatar_second-letter').textContent = params[i].author.split(' ')[1][0];
      children.querySelector('.count-of-personal-msg').style.display = 'none'; // if msg is writed
      messageExample.appendChild(children);
    }
    document.querySelector(`.${this.id}`).innerHTML = '';
    document.querySelector(`.${this.id}`).appendChild(messageExample);
  }
}
const msgExemple = new MessagesModel(messages);
const userList = new UserList(['Dima Tu', 'Zhenya Zh.', 'Zhenya H.', 'Sasha Kupchenya', 'Pasha  Komar'], ['Dima Tu', 'Zhenya Zh.', 'Daria Shurova']);
const activeUsers = new ActiveUsersView('chats-list');
const headerView = new HeaderView('user-name');
const messagesView = new MessagesView('chat-field');
const chatMessagesView = new ChatMessagesView('chats-list');
const signUpWrong = document.getElementById('sign-up-warning');
window.setCurrentUser = (user)=> {
  msgExemple.user = user;
  return headerView.display(user);
};
window.showActiveUsers = ()=> {
  return activeUsers.display(userList.activeUsers);
};
window.showMessages = (skip = 0, top = 10, filterConfig = {})=> {
  return messagesView.display(msgExemple.getPage(skip, top, filterConfig));
};
window.addMessage = (obj)=> {
  msgExemple.add(obj);
  return messagesView.display(msgExemple.getPage());
};
window.removeMessage = (id)=> {
  msgExemple.remove(id);
  return messagesView.display(msgExemple.getPage());
};
window.editMessage = (id, msg)=> {
  msgExemple.edit(id, msg);
  return messagesView.display(msgExemple.getPage());
};

// class Controller {
//   constructor() {
//     this.model = new MessagesModel(messages);
//     this.headerView = new HeaderView();
//   }
// }

// chatMessagesView.display(messages); // for me...
// setCurrentUser('Jonh Snow');
// setCurrentUser('Aleksandr Kupchenya');
// // showActiveUsers();
// editMessage('6', { text: '10 мин!' });
// removeMessage('1'); // удалит сообщ привет
// addMessage({ text: 'Dobroe ytro' });
// addMessage({ text: 'Dobryi vezher' });
// showMessages(0, 10);
// showMessages(10,10);
// showMessages(0,10,{author:'Aleks'});
// showMessages(0,10,{author:'Лях'});
