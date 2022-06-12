'use strict';
/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Homework/tree/main/2-Browsers/Week1#exercise-2-about-me

1. Using JavaScript, replace each of the spans (`nickname`, fav-food`, 
   `hometown`) with your own information.
2. In JavaScript, iterate through each `<li>` and change the class to 
   `list-item`.
3. Look in the css file!
------------------------------------------------------------------------------*/

// TODO add your JavaScript code here.
//replace spans with string
const spans = document.querySelectorAll('ul li span');
console.log(spans);
const aboutMe = ['Mones Hamd', 'Pizza', 'Syria'];
spans.forEach((span, index) => {
  console.log(span);
  span.replaceWith(aboutMe[index]);
});
// give li classname
const liEl = document.querySelectorAll('ul li');
liEl.forEach((li) => (li.className = 'list-item'));
console.log(liEl);
