import { $ } from '../base';

export const confirm = function (options) {
  const { title, itemName } = options;
  return new Promise(resolve => {
    const confirmModal = $.modal({
      title,
      closable: false,
      content: `<p>You want to delete: <span style="font-weight: 600">${itemName}</span></p>`,
      width: '400px',
      onClose() {
        confirmModal.destroy();
      },
      buttons: [{
        title: 'Delete',
        classList: 'modal__confirm button',
        handler() {
          resolve();
          confirmModal.close();
        }
      },
      {
        title: 'Cancel',
        classList: 'modal__cancel button',
        handler() {
          confirmModal.close();
        }
      }
      ],
    });

    setTimeout(() => {
      confirmModal.open();
    }, 100);
  })
};

export default confirm;