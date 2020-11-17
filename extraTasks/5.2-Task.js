let startUl = '<h2>{title}</h2> <ul id = "ul">';

function createList(title, list) {
  document.body.innerHTML = startUl;
  for (let item of list) {
    startUl += `<li>${item.value}`;
    let currentChild = item.children;
    if (currentChild) {
      item = currentChild;
      startUl += '<ul class = "childUl" >';
      createList(title, item);
    }
    startUl += '</li>';
  }
  startUl += '</ul>';

  startUl = startUl.replace('{title}', `${title}`);

  document.body.style.fontSize = '24px';
  document.body.innerHTML = startUl;
  let ourUl = document.getElementsByClassName('childUl');

  for (let node of ourUl) {
    node.style.fontSize = '0.9em';
  }
}

createList('список покупок', [{
    value: 'Пункт 1.',
    children: null,
  },
  {
    value: 'Пункт 2.',
    children: [{
        value: 'Подпункт 2.1.',
        children: null,
      },
      {
        value: 'Подпункт 2.2.',
        children: [{
            value: 'Подпункт 2.2.1.',
            children: null,
          },
          {
            value: 'Подпункт 2.2.2.',
            children: null
          }
        ],
      },
      {
        value: 'Подпункт 2.3.',
        children: null,
      }
    ]
  },
  {
    value: 'Пункт 3.',
    children: null,
  }
]);