function _createModal(options) {
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
    width = '400px'
  } = options;

  modal.classList.add('modal');
  modal.insertAdjacentHTML('afterbegin', `
    <div class="modal__overlay">
      <div class="modal__window" style="width: ${width}">
        <div class="modal__content">
          <header class="modal__header">
            <h2 class="modal__title">${title}</h2>
            ${closable
              ? '<div class="modal__close">&times;</div>'
              : ''
            }
          </header>
          ${content}
        </div>
      </div>
    </div>
  `);

  document.body.appendChild(modal);
  return modal;
}

function closeModal(modal, isClosing, ANIMATION_TIME) {
  isClosing = true;

  modal.classList.remove('open');
  modal.classList.add('closing');

  setTimeout(() => {
    modal.classList.remove('closing');
    isClosing = false;
  }, ANIMATION_TIME);
}

function closeHandler(e, modal, isClosing, ANIMATION_TIME) {
  e.stopPropagation();

  if (!e.target) {
    console.error('Cannot detect event target after clicking on modal!')
    return;
  }

  const isOverlay = e.target.classList.contains('modal__overlay'); 
  const isCloseBtn = e.target.classList.contains('modal__close');
  
  if (isOverlay || isCloseBtn) {
    closeModal(modal, isClosing, ANIMATION_TIME);
  }
}

function _onOpen() {
  console.log('Modal is opened!');
}

function _onClose() {
  console.log('Modal is closed!');
}

function _beforeClose(isClosable) {
  return isClosable ? true : false;
}

export function modal(options) {
  const modal = _createModal(options);
  const ANIMATION_TIME = 200; //ms
  let isClosing = false;

  const handleClosing = (e) => {
    closeHandler(e, modal, isClosing, ANIMATION_TIME);
  }
  modal.addEventListener('click', handleClosing);

  return {
    open() {
      !isClosing && modal.classList.add('open');
      _onOpen();
    },
    close() {
      if (!_beforeClose(true)) {
        console.error('Modal cannot be closed!');
        return;
      }
      closeModal(modal, isClosing, ANIMATION_TIME);
      _onClose();
    },
    setContent(html) {
      const content = modal.querySelector('.modal__content');
      const header = modal.querySelector('.modal__header');

      content.innerHTML = html;
      content.insertAdjacentElement('afterbegin', header);
    },
    destroy() {
      modal.removeEventListener('click', closeHandler);
      modal.remove();
    },
  }
}

export default modal;