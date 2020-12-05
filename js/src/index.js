import { $ } from './base';
import goods from './common/fakeGoodsInfo';
import { renderCards } from './common/render';

document.addEventListener('DOMContentLoaded', () => {
  // render goods cards
  const goodsContainer = document.querySelector('.container');
  goodsContainer.innerHTML = renderCards(goods);

  // modal configuration
  const priceModal = $.modal({
    title: "Goods Info",
    closable: true,
    content: '',
    width: '400px',
    buttons: [
      {
        title: 'OK',
        classList: 'modal__confirm button',
        handler() {
          priceModal.close();
        }
      },
    ]
  });

  const confirmModal = $.modal({
    title: "Delete this item?",
    closable: false,
    content: '<p>Are you sure you want to delete this item?</p>',
    width: '400px',
    buttons: [{
        title: 'Confirm',
        classList: 'modal__confirm button',
        handler() {
          console.log('Confirmed');
          confirmModal.close();
        }
      },
      {
        title: 'Cancel',
        classList: 'modal__cancel button',
        handler() {
          console.log('Canceled');
          confirmModal.close();
        }
      }
    ],
  });

  goodsContainer.addEventListener('click', (e) => {
    const itemId = e.target.getAttribute('data-id');
    const func = e.target.getAttribute('data-function');

    if (!func) return;
  
    const item = goods.find(item => item.id == itemId);

    switch (func) {
      case "view-price": {
        viewPrice(item.title, item.price);
        break;
      }
      case "delete": {
        confirmModal.open();
        break;
      }
    }
  });

  function viewPrice(title, price) {
    priceModal.setContent(`
          <p>Item title: <span style="font-weight: 600">${title}</span></p>
          <p>Price of one kilogram: <span style="font-weight: 600">${price}UAH</span></p>
        `);
    priceModal.open();
  }
})

