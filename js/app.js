/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Define Global Variables
 *
*/

// Selects all sections
const list = document.querySelectorAll('section');

// Selects to top button
const mybutton = document.getElementById("myBtn");

// Selects all collapsible divs
const coll = document.getElementsByClassName("collapsible");

/**
 * End Global Variables
 * Start Helper Functions
 *
*/

// Grab section coordiate
function y__coordinate(obj) {
    const clicked = obj.getBoundingClientRect();
    return clicked.y;
}

// When the user scrolls down 20px from the top of the document, show the button
function scrollFunction() {
  if (document.body.scrollTop > 800 || document.documentElement.scrollTop > 800) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav
function buildNav(){
    // loops over sections
    list.forEach(function(item){
        // creates new list item containing link
        var newLi = document.createElement('li');
        var newLink = document.createElement('a');
        newLink.setAttribute('href', '#'+item.id);
        newLink.setAttribute('class', 'menu__link');
        newLink.textContent = item.dataset.nav;
        newLi.appendChild(newLink);
        const nav = document.querySelector('ul');
        nav.appendChild(newLi);
        // Creates event listener for on click
        newLi.addEventListener('click',function(){
            // applies scroll function
            scroll(item.id);
        });
    })
}

// Collapse sections
function collapse() {
    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });
    }
}

// Add class 'active' to section when near top of viewport
function activeSection(){
    list.forEach(function(item, index){
        const sect = item.getBoundingClientRect();
        if(sect.top < 400){
            item.classList.add("your-active-class");
        } else {
            item.classList.remove("your-active-class");
        }
    })
}

// Scroll to anchor ID using scrollTO event
function scroll(i){
    // uses helper function to find secton position
    window.scrollTo(0, y__coordinate(document.getElementById(i)));
}

/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu
window.addEventListener("load", buildNav);

// collapsible
window.addEventListener("load", collapse);

// Add to top button
window.onscroll = function() {scrollFunction()};

// Set sections as active
document.addEventListener("scroll", activeSection);
