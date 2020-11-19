const filterBtn = document.querySelector('.filter-btn');
const filterInputsList = document.querySelectorAll('input[name="filter"]');
const chatNameBlock = document.querySelector('.chat-description');
const chat = document.querySelector('.chat-field');
const chatScroll = document.querySelector('.chat-field').scrollHeight;
const loadMoreMsgLink = document.getElementById('load-msg-link');
const sideMenuWrapper = document.querySelector('.mobile-menu-wrp');
const sideMenu = document.querySelector('.mobile-menu');

filterBtn.addEventListener('click', () => {
  document.querySelector('.filter-variants').classList.toggle('filter-variants_active');
  filterBtn.classList.toggle('filter-btn_checked');
  document.querySelector('.chat-filter-wrp').classList.toggle('show');
  for (let i = 0; i < filterInputsList.length; i++) {
    filterInputsList[i].checked = false;
    if (document.body.clientWidth < 570) {
      document.querySelector('.chat-description').classList.toggle('hide');
    }
  }
});

chat.scrollTop = (chatScroll);
chat.addEventListener('scroll', () => {
  if (chat.scrollTop > 30) {
    loadMoreMsgLink.style.display = 'none';
  } else loadMoreMsgLink.style.display = 'inline';
});

window.addEventListener('click', () => {
  let target = event.target;
  if (target.className === 'menu-button') {
    sideMenuWrapper.style.display = 'block';
    sideMenuWrapper.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    setTimeout(function () {
      sideMenu.style.transform = 'translateX(300px)';
    }, 10);
  } else if (target.className === 'mobile-menu-wrp') {
    sideMenu.style.transform = 'translateX(0px)';
    sideMenuWrapper.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    setTimeout(function () {
      sideMenuWrapper.style.display = 'none';
    }, 500);
  }
});
