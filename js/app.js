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
const mainText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.";
const subText = "Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.";
// title section array
const titleSections = ["skils", "about", "testimonials", "contact"];
let ourSections = [];
// Used for hide and show navigator 
const navigator = document.getElementsByTagName('nav')[0];
// check scrolling variable
//let isScrolling = false;
let isScrolling = null;
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// Generate dumy data
for (i = 0; i < titleSections.length; i++) {

  const mySection = {
    id: titleSections[i],
    data: titleSections[i].toUpperCase(),
    mainText: mainText,
    subText: subText
  };

  ourSections.push(mySection);
}

/**
 * generateSection to page 
 * titlesections will hold number of section
 */
function generateSection() {

  //const startTime = performance.now();
  // hold the section element in variable sections
  const sections = document.getElementById("sections");
  // create div container to enhance the performance
  const mainContainer = document.createElement("div");

  for (ourSection of ourSections) {

    const section = document.createElement("section");
    const container = document.createElement("div");
    const mainTextSection = document.createElement("p");

    mainTextSection.textContent = ourSection.mainText;

    container.classList.add("landing__container");
    container.appendChild(mainTextSection);
    container.insertAdjacentHTML("afterbegin", `<h2>${ourSection.id}</h2>`);
    container.insertAdjacentHTML("beforeend", `<p>${ourSection.subText}</p>`);

    section.setAttribute("id", ourSection.id);
    section.setAttribute("data-nav", ourSection.data);
    if (titleSections[0] == ourSection.id) {
      section.classList.add("active-section");
      activeSection = section;
    }
    section.appendChild(container);
    mainContainer.appendChild(section);
  }

  sections.appendChild(mainContainer);
  // const endTime = performance.now();
  // console.log('This code took ' + (endTime - startTime) + ' milliseconds.');

}

// render the sections to the page
generateSection();

// render navigator page due to array of sections
buildTheNavMenu();

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// Add class 'active' to section when near top of viewport 
function isSectionInViewport() {

  // Get top of viewport value
  const topOfViewport = window.pageYOffset + 200;

  // console.log(isScrolling);
  document.querySelectorAll('[data-nav]').forEach((element) => {
    if (topOfViewport >= element.offsetTop &&
      topOfViewport < (element.offsetTop + element.offsetHeight)) {
      // When stop scroll on any section hide the navbar  
      // and show goto top button
      hideNavBar();
      const existBtn = document.getElementById('goto-top');
      if (!document.body.contains(existBtn)) {
        gotoTopBtn();
      } else {
        // To show button after goto top 
        // and scroll again
        existBtn.style.display = "block";
      }
      // Remove the active classes from active section and active link 
      removeActiveClasses();
      const link = document.getElementById(`${element.getAttribute('id')}-link`);
      element.classList.add("active-section");
      link.classList.add('active');
    }
  });
}

function showNavBar() {
  navigator.style.display = "block";
}

function hideNavBar() {
  navigator.style.display = "none";
}

function gotoTopBtn() {
  const btnContainer = document.createElement("div");
  btnContainer.setAttribute('id', 'goto-top');
  btnContainer.style.cssText = 'position:fixed; bottom:40px; right: 45px; text-align:center; z-index:100';

  const btn = document.createElement("button");
  btn.style.cssText = 'padding: 8px 16px; cursor: pointer; font-size: 1.1em; font-weight: bold;';
  btn.textContent = "TOP";

  btnContainer.appendChild(btn);
  btnContainer.addEventListener('click', function () {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    // When goto top page hide goto top button
    // and remove all active classes
    btnContainer.style.display = "none";
    removeActiveClasses();

  });
  const main = document.querySelector("main");
  // console.log('main: ' + main);
  main.insertAdjacentElement('afterend', btnContainer);

}

// Scroll to anchor ID using scrollTO event

/**
 * End Main Functions
 * Begin Events
 * 
*/
window.addEventListener('scroll', function () {
  if (isScrolling != null) {
    clearTimeout(isScrolling);
  }
  showNavBar();
  isScrolling = setTimeout(isSectionInViewport, 100);

});
/* The viewport is less than, or equal to, 600 pixels wide */
const widthScreen = window.matchMedia("(max-width: 600px)");
checkMobileView(widthScreen);
widthScreen.addEventListener('change', checkMobileView);


// build the navbar menu
function buildTheNavMenu() {
  // unlistedLink variables refer to ul element
  const unlistedLink = document.getElementById("navbar__list");

  const a = document.createElement("a");
  ourSections.forEach((ourSection) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.textContent = ourSection.data;
    a.classList.add("menu__link");
    a.setAttribute('id', `${ourSection.id}-link`);
    a.style.cursor = 'pointer';
    a.addEventListener('click', function (evt) {
      targetSection = document.getElementById(ourSection.id);
      evt.preventDefault();
      const element = evt.target;
      // reset active class from all item menu
      removeActiveClasses();
      // set activ class to selected item
      element.classList.add("active");
      // set activ class to target section
      targetSection.classList.add("active-section");
      targetSection.scrollIntoView({ behavior: "smooth" })
    });
    li.appendChild(a);
    unlistedLink.appendChild(li);
  });
}


// Scroll to section on link click

// Set sections as active

// Reset the active class from active section
function removeActiveClasses() {
  document.querySelectorAll('[data-nav]').forEach((el) => {
    if (el.classList.contains("active-section")) {
      const link = document.getElementById(`${el.getAttribute('id')}-link`);
      el.classList.remove("active-section");
      link.classList.remove('active');
    }
  });

}

// Setup mobile preview
function checkMobileView(matchMedia) {
  let mobileLink = document.getElementById('icon-menu');
  const unlistedLink = document.getElementById("navbar__list");
  const nodeLink = unlistedLink.childNodes;
  if (matchMedia.matches) {
    //console.log(mobileLink);
    navigator.style.cssText = 'text-align: right; margin: 13px 20px;';
    if (mobileLink == null) {
      // create mobile link
      mobileLink = document.createElement("a");
      mobileLink.style.cssText = 'cursor: pointer; display: inline-block;';
      mobileLink.setAttribute('id', 'icon-menu');

      const iconLink = document.createElement("i");
      iconLink.classList.add('fa', 'fa-bars');
      iconLink.style.cssText = 'color: #5d5c5c; font-size: 1.5em';
      mobileLink.appendChild(iconLink);

      unlistedLink.style.display = 'none';
      navigator.insertAdjacentElement('afterbegin', mobileLink);

    } else {
      // hide navbar menu
      // and show mobile link
      unlistedLink.style.display = 'none';
      mobileLink.style.display = 'block';

    }

    mobileLink.addEventListener('click', function () {
      
      if(unlistedLink.style.display === 'none'){ 
        unlistedLink.style.display = 'block';
        for(let i = 0; i< nodeLink.length; i++){
          nodeLink[i].style.display = 'block';
        }
        
      }else{
        unlistedLink.style.display = 'none';
      }
      
    });

  } else {
    // hide mobile link
    // and show navbar menu
    if (navigator.contains(mobileLink)) {
      mobileLink.style.display = 'none';
    }
    unlistedLink.style.display = 'block';
    for(let i = 0; i< nodeLink.length; i++){
      nodeLink[i].style.display = 'inline-block';
    }
    navigator.style.margin = '0px';
  }

}


