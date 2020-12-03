export function _createFooter(buttons = []) {
  if (buttons.length == 0) {
    return '';
  }

  const footer = document.createElement('footer');
  footer.classList.add('modal__footer');

  buttons.forEach(btn => {
    const button = document.createElement('button');
    const {
      title = 'Button', classList = '', handler = () => {}
    } = btn;

    button.setAttribute('class', classList);
    button.textContent = title;
    button.onclick = handler;

    footer.appendChild(button);
  });

  return footer;
}

export function _createModal(options) {
  const modal = document.createElement('div');
  const defaultContent = `
    <main class="modal__main">
      modal_content
    </main>
    <footer class="modal__footer">
      modal_footer
    </footer>`;

  const {
    title,
    closable = true,
    content = defaultContent,
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