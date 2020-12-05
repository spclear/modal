import { $ } from './base';
import goods from './common/fakeGoodsInfo';
import { renderCards } from './common/render';

document.addEventListener('DOMContentLoaded', () => {
  // render goods cards
  const goodsContainer = document.querySelector('.container');
  let fruits = [...goods];

  goodsContainer.innerHTML = renderCards(fruits);

  // modal configuration
  const priceModal = $.modal({
    title: "Goods Info",
    closable: true,
    content: '',
    width: '400px',
    buttons: [
      {
        title: 'Close',
        classList: 'modal__confirm button',
        handler() {
          priceModal.close();
        }
      },
    ]
  });

  goodsContainer.addEventListener('click', (e) => {
    const itemId = +e.target.getAttribute('data-id');
    const func = e.target.getAttribute('data-function');

    if (!func) return;
    const item = fruits.find(item => item.id === itemId);

    switch (func) {
      case "view-price": {
        viewPrice(item.title, item.price);
        break;
      }
      case "delete": {
        $.confirm({
          title: 'Are you sure?',
          itemName: item.title,
        }).then(() => {
          fruits = fruits.filter(fruit => fruit.id !== itemId);
          goodsContainer.innerHTML = renderCards(fruits);
        });
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

