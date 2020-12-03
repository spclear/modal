import { _createModal, _createFooter } from "../common/render";

export function modal(options) {
  const modal = _createModal(options);
  const ANIMATION_TIME = 200; //ms
  let isClosing = false;

  const modalConfig = {
    open() {
      !isClosing && modal.classList.add('open');
      _onOpen();
    },
    close() {
      if (!_beforeClose(true)) {
        console.error('Modal cannot be closed!');
        return;
      }

      isClosing = true;
      modal.classList.remove('open');
      modal.classList.add('closing');

      // adding class "closing" for animation and removing it in ANIMATION_TIME ms
      setTimeout(() => {
        modal.classList.remove('closing');
        isClosing = false;
        _onClose();
      }, ANIMATION_TIME);
    },
    setContent(html) {
      const content = modal.querySelector('[data-content]');
      content.innerHTML = html;
    },
    setFooter(buttons) {
      const footer = modal.querySelector('.modal__footer');
      footer && footer.remove();

      if (buttons.length !== 0) {
        const main = modal.querySelector('.modal__main');
        main.insertAdjacentElement('afterend', _createFooter(buttons));
      }
    },
    destroy() {
      modal.removeEventListener('click', closingHandler);
      modal.remove();
    },
  }

  const closingHandler = (e) => {
    const isClosingTrigger = e.target.getAttribute('data-close');

    if (isClosingTrigger) {
      modalConfig.close();
    }
  }
  modal.addEventListener('click', closingHandler);

  return modalConfig;
}

// lifecycle hooks

function _onOpen() {
  console.log('Modal is opened!');
}

function _onClose() {
  console.log('Modal is closed!');
}

function _beforeClose(isClosable) {
  return isClosable ? true : false;
}

export default modal;