/*jslint plusplus: true*/
/*eslint-env browser, plusplus*/
/*eslint no-unused-vars: ["error", { "vars": "local" }]*/

// Matches the dropdown content or its respective 'ink' image
/*function matchesDropdownOrInk(currentId, targetId) {
    "use strict";
    return (currentId.id === targetId) || (currentId.id === (targetId + "_ink"));
}*/

/* Hides all other dropdowns except for the matching
    element and its respective 'ink' image */
/*function hideDropdownsExceptFor(dropdownId) {
    "use strict";
    var d, shownElements, currentElement;
    shownElements = document.getElementsByClassName("show");
    for (d = 0; d < shownElements.length; d++) {
        currentElement = shownElements[d];
        if (!matchesDropdownOrInk(currentElement, dropdownId)) {
            currentElement.classList.remove('show');
            d--;
        }
    }
}*/

function clearReferenceBoxes() {
    "use strict";
    var d, allReferenceBoxes, currentReferenceBox;
    allReferenceBoxes = document.getElementsByClassName("referenceBox");
    for (d = 0; d < allReferenceBoxes.length; d++) {
        currentReferenceBox = allReferenceBoxes[d];
        currentReferenceBox.parentElement.removeChild(currentReferenceBox);
        d--;
    }
}

/* When the user clicks on the button, 
    toggle between hiding and showing the dropdown content */
/*function showDropdown(dropdownId) {
    "use strict";
    document.getElementById(dropdownId).classList.toggle("show");
    document.getElementById(dropdownId + "_ink").classList.toggle("show");
    hideDropdownsExceptFor(dropdownId);
}*/

/*window.on('touchend', function (e) {
    "use strict";
    if (!e.target.matches('.menuItem')) {
        hideDropdowns();
    }
});*/

function getSiblingByClass(clickedElement, className) {
    "use strict";
    var dropdownElements;
    dropdownElements = clickedElement.parentNode.getElementsByClassName(className);
    return dropdownElements[0];
}

function hideAllDropdownsExcept(dropdownElement, inkElement) {
    "use strict";
    var d, shownElements, currentElement;
    shownElements = document.getElementsByClassName("show");
    for (d = 0; d < shownElements.length; d++) {
        currentElement = shownElements[d];
        if (dropdownElement === null || (currentElement !== dropdownElement && currentElement !== inkElement)) {
            currentElement.classList.remove('show');
            d--;
        }
    }
}

function toggleDropDownAndHideRest(dropdownElement) {
    "use strict";
    var associatedInk;
    associatedInk = getSiblingByClass(dropdownElement, 'ink');
    hideAllDropdownsExcept(dropdownElement, associatedInk);
    dropdownElement.classList.toggle("show");
    associatedInk.classList.toggle("show");
}

function toggleSubMenu(event) {
    "use strict";
    var dropdownElement;
    event.preventDefault();
    //event.stopPropagation();
    dropdownElement = getSiblingByClass(event.target, 'dropdown-content');
    toggleDropDownAndHideRest(dropdownElement);
}

function setup() {
    "use strict";
    var d, menus, currentMenu;
    menus = document.getElementsByClassName("menuItem");
    for (d = 0; d < menus.length; d++) {
        currentMenu = menus[d];
        if (currentMenu.parentNode.classList.contains('hover_menu')) {
            currentMenu.addEventListener("touchend", toggleSubMenu);
        }
    }
}

// Hide the lot!
function hideDropdowns() {
    "use strict";
    hideAllDropdownsExcept(null);
}

function checkParentsFor(root, className) {
    "use strict";
    if (root.classList.contains(className)) {
        return true;
    } else if (root.parentElement !== null) {
        return checkParentsFor(root.parentElement, className);
    }
    
    return false;
}

// === Close dropdown/references if the user clicks outside of it

// For PC
window.onclick = function (e) {
    "use strict";
    /*if (!e.target.matches('.menuItem')) {
        hideDropdowns();
    }*/
    if (!e.target.matches('.reference')) {
        clearReferenceBoxes();
    }
};

// For Touchscreens
window.addEventListener("touchend", function (event) {
    "use strict";
    var isDropdown;
    isDropdown = checkParentsFor(event.target, 'dropdown-content') || checkParentsFor(event.target, 'menuItem');
    if (!isDropdown) {
        hideDropdowns();
    }
    clearReferenceBoxes();
}, false);



/*function dropdownIsShowing(dropdownElement) {
    "use strict";
    var displaySetting;
    displaySetting = window.getComputedStyle(dropdownElement).getPropertyValue('display');
    
    return displaySetting === 'block';
}

function followLinkOrExpandIfDropdownNotShowing(clickedElement, link) {
    "use strict";
    alert("Running onClick!");
    var dropdownElement;
    dropdownElement = getDropdownSibling(clickedElement);
    if (dropdownIsShowing(dropdownElement)) {
        window.location.href = link;
    } else {
        dropdownElement.classList.toggle("show");
    }
}*/

//=====================================================

function showAllLinks() {
    "use strict";
    var i, allPostLabels;
    allPostLabels = document.getElementsByClassName("postLabel");
    for (i = 0; i < allPostLabels.length; i++) {
        allPostLabels[i].classList.remove('hiddenLabel');
    }
}

function filterLinks(classToShow) {
    "use strict";
    var i, allPostLabels, currentPostLabel;
    allPostLabels = document.getElementsByClassName("postLabel");
    for (i = 0; i < allPostLabels.length; i++) {
        currentPostLabel = allPostLabels[i];
        if (!currentPostLabel.classList.contains(classToShow)) {
            currentPostLabel.classList.add('hiddenLabel');
        } else {
            currentPostLabel.classList.remove('hiddenLabel');
        }
    }
}

//=====================================================

function getMaxPosts() {
    "use strict";
    return 8;
}

function getMaxCartoons() {
    "use strict";
    return 43;
}

function getMaxTunes() {
    "use strict";
    return 22;
}

function generateLatestPostLink() {
    "use strict";
    return '/Posts/' + getMaxPosts() + '/post.html';
}

function generateLatestCartoonLink() {
    "use strict";
    return '/Cartoons/' + getMaxCartoons() + '/post.html';
}

function generateLatestTuneLink() {
    "use strict";
    return '/tunes/' + getMaxTunes() + '/post.html';
}

function generateFirstPostLink() {
    "use strict";
    return '/Posts/1/post.html';
}

function generateFirstCartoonLink() {
    "use strict";
    return '/Cartoons/1/post.html';
}

function generateFirstTuneLink() {
    "use strict";
    return '/tunes/1/post.html';
}

function getRandomInt(min, max) {
    "use strict";
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomPostLink() {
    "use strict";
    return '/Posts/' + getRandomInt(1, getMaxPosts()) + '/post.html';
}

function generateRandomCartoonLink() {
    "use strict";
    return '/Cartoons/' + getRandomInt(1, getMaxCartoons()) + '/post.html';
}

function generateRandomTuneLink() {
    "use strict";
    return '/tunes/' + getRandomInt(1, getMaxTunes()) + '/post.html';
}

function generateRandomLink() {
    "use strict";
    if (getRandomInt(0, 1) === 0) {
        return generateRandomPostLink();
    } else {
        return generateRandomCartoonLink();
    }
}

/*function populateRandomPages() {
    "use strict";
    var i, allRandomLinks, currentRandomLink;
    allRandomLinks = document.getElementsByClassName("randomPage");
    for (i = 0; i < allRandomLinks.length; i++) {
        currentRandomLink = allRandomLinks[i];
        currentRandomLink.setAttribute('href', generateRandomLink());
    }
    
    allRandomLinks = document.getElementsByClassName("randomPost");
    for (i = 0; i < allRandomLinks.length; i++) {
        currentRandomLink = allRandomLinks[i];
        currentRandomLink.setAttribute('href', generateRandomPostLink());
    }
    
    allRandomLinks = document.getElementsByClassName("randomCartoon");
    for (i = 0; i < allRandomLinks.length; i++) {
        currentRandomLink = allRandomLinks[i];
        currentRandomLink.setAttribute('href', generateRandomCartoonLink());
    }
}*/

//=====================================================

function calculateXCoord(clickedElement) {
    "use strict";
    var elementCoords, xPos;
    elementCoords = clickedElement.getBoundingClientRect();
    xPos = elementCoords.left;
    if (window.innerWidth < (xPos + 200)) {
        xPos = window.innerWidth - 240;
    }
    return xPos + "px";
}

function createReference(clickedElement, referencedElementId) {
    "use strict";
    var textBox, text;
    textBox = document.createElement("DIV");
    text = document.getElementById(referencedElementId).innerHTML;
    textBox.appendChild(document.createTextNode(text));
    textBox.className += "referenceBox";
    
    textBox.style.left = calculateXCoord(clickedElement);
    
    clickedElement.parentNode.insertBefore(textBox, clickedElement.nextSibling);
    
}