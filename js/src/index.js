import { $ } from './base';

const modalContent = `
  <main class="modal__main">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla consectetur deleniti adipisci et beatae fugit officia? Tenetur corrupti aperiam ut nostrum voluptatem, eos excepturi, sapiente illo obcaecati molestias voluptatum ex.
  </main>
`;

const options = {
  title: "My modal",
  closable: true,
  content: modalContent,
  width: '400px',
  buttons: [
    {
      title: 'Ok',
      classList: 'modal__confirm button',
      handler() {
        console.log('Confirmed');
        myModal.close();
      }
    },
    {
      title: 'Cancel',
      classList: 'modal__cancel button',
      handler() {
        console.log('Canceled');
        myModal.close();
      }
    }
  ]
}

const myModal = $.modal(options);

window.modal = myModal;
