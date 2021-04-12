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
// Check if section in view
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
}

// highlights the selected section in navbar

function underline(element){
    const nav = document.getElementsByTagName('a');
    for(let item of nav){
        if(item.id === element.id){
            item.classList.add("underline");
        } else {
            item.classList.remove("underline");
        }
    }
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
        let newLi = document.createElement('li');
        let newLink = document.createElement('a');
        newLink.setAttribute('id', '#' + item.id);
        newLink.setAttribute('class', 'menu__link');
        newLink.textContent = item.dataset.nav;
        newLi.appendChild(newLink);
        const nav = document.querySelector('ul');
        nav.appendChild(newLi);
        // Creates event listener for on click
        newLi.addEventListener('click',function(event){
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
            let content = this.nextElementSibling;
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

// Scroll to anchor ID
function scroll(i){
    // uses helper function to find secton position
    var elmnt = document.getElementById(i);
    elmnt.scrollIntoView();
}

//

//function dynamicActive()

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

// Set sections as active in navbar
document.addEventListener("scroll", function(){
    list.forEach(function(element){
        if(isInViewport(element)){
            const nav = document.getElementsByTagName('a');
            for(let item of nav){
                if(item.id === '#' + element.id){
                    underline(item);
                }
            }
        }
    })
});
