const horizontalPositionEl = document.getElementById('horizontal-position');
const verticalPositionEl = document.getElementById('vertical-position');
const toastTypeEl = document.getElementById('type');
const toastMessageEl = document.getElementById('message');
const showToastButtonEl = document.getElementById('show-toast');
const durationEl = document.getElementById('duration');
const durationOpEl = document.getElementById('duration-output');

const leftTopContainer = document.getElementById('tc-left-top');
const leftBottomContainer = document.getElementById('tc-left-bottom');
const rightTopContainer = document.getElementById('tc-right-top');
const rightBottomContainer = document.getElementById('tc-right-bottom');
const toastTemplate = document.getElementById('toast-template');

toastMessageEl.addEventListener('input', handleShowToastButton);
showToastButtonEl.addEventListener('click', displayToast);
durationEl.addEventListener('input', () => {
  durationOpEl.textContent = durationEl.value;
});

function handleShowToastButton() {
  showToastButtonEl.disabled = toastMessageEl.value.length === 0;
}

function displayToast() {
  const message = toastMessageEl.value;
  const type = toastTypeEl.value;
  const horizontalPosition = horizontalPositionEl.value;
  const verticalPosition = verticalPositionEl.value;
  const duration = +durationEl.value * 1000;
  showToast(message, type, duration, horizontalPosition, verticalPosition);
}

function showToast(message, type, duration, horizontalPosition, verticalPosition) {
  const toast = createToast(message, type, duration, horizontalPosition);

  if (horizontalPosition === 'left') {
    if (verticalPosition === 'top') {
      leftTopContainer.prepend(toast);
    } else {
      leftBottomContainer.append(toast);
    }
  } else {
    if (verticalPosition === 'top') {
      rightTopContainer.prepend(toast);
    } else {
      rightBottomContainer.append(toast);
    }
  }
}

function createToast(message, type, duration, horizontalPosition) {
  const toast = toastTemplate.content.cloneNode(true);
  const toastEl = toast.querySelector('.toast');

  toast.querySelector('.toast-message').textContent = message;
  toastEl.classList.add('transition-all', 'duration-500', 'ease-in-out');
  toastEl.classList.add(type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500');

  toast.querySelector('.remove').addEventListener('click', () => removeToast(toastEl, horizontalPosition));

  // Auto remove after duration
  setTimeout(() => removeToast(toastEl, horizontalPosition), duration);

  return toast;
}

async function removeToast(toastEl, horizontalPosition) {
  toastEl.classList.add(horizontalPosition === 'left' ? 'animate__fadeOutLeft' : 'animate__fadeOutRight');
  await new Promise(resolve => setTimeout(resolve, 500)); // Match with animation duration
  toastEl.remove();
}
