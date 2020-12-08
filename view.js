class HeaderView {
  constructor(id) {
    this.id = id;
  }

  display(params) {
    if (params && params !== 'null') {
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
    let arrOnline = params.filter(item => item.isActive && item.name !== localStorage.getItem('currentUser'));
    onlineCount.textContent = arrOnline.length;
    for (let i = 0; i < arrOnline.length; i++) {
      let children = onlineUserTpl.content.cloneNode(true);
      if (arrOnline[i].name) {
        children.querySelector('.chat-with-who > h4').textContent = arrOnline[i].name;
        children.querySelector('.online-user-avatar > .user-avatar_first-letter').textContent = arrOnline[i].name.split(' ').length >= 1 ? arrOnline[i].name.split(' ')[0][0] : '';
        children.querySelector('.online-user-avatar > .user-avatar_second-letter').textContent = arrOnline[i].name.split(' ').length > 1 ? arrOnline[i].name.split(' ')[1][0] : '';
        userOnline.appendChild(children);
      }
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
      if (params[i].author === userName) {
        let myMsgChildren = myMsgTpl.content.cloneNode(true);
        myMsgChildren.querySelector('.message').textContent = params[i].text;
        myMsgChildren.querySelector('.message').setAttribute('id', `${params[i].id}`);
        myMsgChildren.querySelector('.send-time').textContent = `${new Date(params[i].createdAt).getHours()}:${String(new Date(params[i].createdAt).getMinutes()).length === 2 ? new Date(params[i].createdAt).getMinutes() : '0' + new Date(params[i].createdAt).getMinutes()} ${new Date(params[i].createdAt).getHours() > 12 ? 'PM' : 'AM'}`;
        chatView.appendChild(myMsgChildren);
      } else if (params[i].author !== userName) {
        let companionMsgChildren = companionMsgTpl.content.cloneNode(true);
        companionMsgChildren.querySelector('.companion-name').textContent = params[i].author;
        companionMsgChildren.querySelector('.message').textContent = params[i].text;
        companionMsgChildren.querySelector('.send-time').textContent = `${ new Date(params[i].createdAt).getHours()}:${String(new Date(params[i].createdAt).getMinutes()).length === 2 ? new Date(params[i].createdAt).getMinutes() : '0' + new Date(params[i].createdAt).getMinutes()} ${new Date(params[i].createdAt).getHours() > 12 ? 'PM' : 'AM'}`;
        chatView.appendChild(companionMsgChildren);
      }
    }
    document.querySelector(`.${this.id}`).innerHTML = '';
    document.querySelector(`.${this.id}`).appendChild(chatView);
  }
}

class ChatMessagesView {
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
        children.querySelector('.chat-with-who > h4').textContent = params[i].author;
        children.querySelector('.chat-with-who > .chat-msg-preview').textContent = params[i].text;
        children.querySelector('.user-avatar > .user-avatar_first-letter').textContent = params[i].author.split(' ')[0][0];
        children.querySelector('.user-avatar > .user-avatar_second-letter').textContent = params[i].author.split(' ').length > 1 ? `${params[i].author.split(' ')[1][0]}` : '';
        children.querySelector('.count-of-personal-msg').style.display = 'none';
        messageExample.appendChild(children);
      }
    }
    document.querySelector(`.${this.id}`).innerHTML = '';
    document.querySelector(`.${this.id}`).appendChild(messageExample);
  }
}

class ChatWith {
  constructor() {
    this.chatPerson = document.querySelector('.chat-description .chat-name h4');
    this.firstLetterAvatar = document.querySelector('.chat-description .user-avatar .user-avatar_first-letter');
    this.secondLetterAvatar = document.querySelector('.chat-description .user-avatar .user-avatar_second-letter');
    this.members = document.querySelector('.chat-description .chat-name h5');
  }

  display(name) {
    this.chatPerson.innerHTML = name.split(' ').length > 1 ? `${name.split(' ')[0]}<br>${name.split(' ')[1]}` : `${name.split(' ')[0]} `;
    if (name.split(' ').length > 1) {
      this.firstLetterAvatar.textContent = name.split(' ')[0][0];
      this.secondLetterAvatar.textContent = name.split(' ')[1][0];
    } else {
      this.firstLetterAvatar.textContent = name.split(' ')[0][0];
      this.secondLetterAvatar.textContent = '';
    }

    this.members.classList.add('hide');
  }
}
