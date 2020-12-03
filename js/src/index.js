import { $ } from './base';

const modalContent = `
  <main class="modal__main">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla consectetur deleniti adipisci et beatae fugit officia? Tenetur corrupti aperiam ut nostrum voluptatem, eos excepturi, sapiente illo obcaecati molestias voluptatum ex.
  </main>
  <footer class="modal__footer">
    <button class="modal__confirm button">
      Confirm
    </button>
    <button class="modal__cancel button">
      Cancel
    </button>
  </footer>
`;

const options = {
  title: "My modal",
  closable: true,
  content: modalContent,
  width: '400px',
}

const myModal = $.modal(options);

window.modal = myModal;
