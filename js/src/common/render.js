function _renderButtons(buttons, nodeContainer) {
  buttons.forEach(btn => {
    const button = document.createElement('button');
    const {
      title = 'Button', classList = '', handler = () => {}
    } = btn;

    button.setAttribute('class', classList);
    button.textContent = title;
    button.onclick = handler;

    nodeContainer.appendChild(button);
  });
}

export function _createFooter(buttons = []) {
  if (buttons.length == 0) {
    return '';
  }

  const footer = document.createElement('footer');
  footer.classList.add('modal__footer');
  _renderButtons(buttons, footer);

  return footer;
}

export function _createModal(options) {
  const modal = document.createElement('div');

  const {
    title,
    closable = true,
    content = 'modal_content: not specified',
    width = '400px',
    buttons = [],
  } = options;

  modal.classList.add('modal');
  modal.insertAdjacentHTML('afterbegin', `
    <div class="modal__overlay" data-close="true">
      <div class="modal__window" style="width: ${width}">
        <div class="modal__content">
          <header class="modal__header">
            <h2 class="modal__title">${title}</h2>
            ${closable ? 
              `<div class="modal__close" data-close="true">
                &times;
              </div>`
              : ''
            }
          </header>
          <main class="modal__main" data-content>
            ${content}
          </main>
        </div>
      </div>
    </div>
  `);

  if (buttons.length !== 0) {
    const main = modal.querySelector('.modal__main');
    main.insertAdjacentElement('afterend', _createFooter(buttons));
  }

  document.body.appendChild(modal);
  return modal;
}

export function renderCards(itemsArray) {
  let result = '';

  itemsArray.forEach(item => {
    result += _createCard(item);
  })

  return result;
}

function _createCard(cardParams) {
  const { id, title, price, img } = cardParams;

  return `
    <div class="card" data-id="${id}">
      <h3 class="card__title">${title}</h3>
      <div class="card__content">
        <img class="card__image"
          src="${img}"
          alt="${title.toLowerCase()}">
      </div>
      <div class="options">
        <button class="card__button view" data-id="${id}" data-function="view-price">
          View price
        </button>
        <button class="card__button delete" data-id="${id}" data-function="delete">
          Delete
        </button>
      </div>
    </div>`;
}