/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Homework/tree/main/2-Browsers/Week1#exercise-4-whats-the-time

1. Inside the `index.js`, complete the `addCurrentTime` to add the current time 
  to the webpage. Make sure it's written in the HH:MM:SS notation (hour, minute,
  second). Use `setInterval()` to make sure the time stays current.
2. Have the function execute when it's loading in the browser.
------------------------------------------------------------------------------*/
const div = document.createElement('div');
const span = document.createElement('span');
function addCurrentTime() {
  span.textContent = new Date().toLocaleTimeString();
}
div.appendChild(span);
document.body.appendChild(div);
window.addEventListener('load', () => {
  setInterval(addCurrentTime, 1000);
});
