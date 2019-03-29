/*jslint plusplus: true*/
/*eslint-env browser, plusplus*/
/*eslint no-unused-vars: ["error", { "vars": "local" }]*/

// Matches the dropdown content or its respective 'ink' image
function matchesDropdownOrInk(currentId, targetId) {
    "use strict";
    return (currentId.id === targetId) || (currentId.id === (targetId + "_ink"));
}

/* Hides all other dropdowns except for the matching
    element and its respective 'ink' image */
function hideDropdownsExceptFor(dropdownId) {
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
}

// Hide the lot!
function hideDropdowns() {
    "use strict";
    hideDropdownsExceptFor(null);
}

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
function showDropdown(dropdownId) {
    "use strict";
    document.getElementById(dropdownId).classList.toggle("show");
    document.getElementById(dropdownId + "_ink").classList.toggle("show");
    hideDropdownsExceptFor(dropdownId);
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (e) {
    "use strict";
    if (!e.target.matches('.menuItem')) {
        hideDropdowns();
    }
    if (!e.target.matches('.reference')) {
        clearReferenceBoxes();
    }
};

function checkParentsFor(root, className) {
    "use strict";
    if (root.classList.contains(className)) {
        return true;
    } else if (root.parentElement !== null) {
        return checkParentsFor(root.parentElement, className);
    }
    
    return false;
}

// Touchscreens
window.addEventListener("touchend", function (event) {
    "use strict";
    var isDropdown;
    isDropdown = checkParentsFor(event.target, 'dropdown-content');
    if (!isDropdown) {
        hideDropdowns();
    }
    clearReferenceBoxes();
}, false);

/*window.on('touchend', function (e) {
    "use strict";
    if (!e.target.matches('.menuItem')) {
        hideDropdowns();
    }
});*/

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
    return 3;
}

function getMaxCartoons() {
    "use strict";
    return 3;
}

function generateLatestPostLink() {
    "use strict";
    return '/Posts/' + getMaxPosts() + '/post.html';
}

function generateLatestCartoonLink() {
    "use strict";
    return '/Cartoons/' + getMaxCartoons() + '/post.html';
}

function generateFirstPostLink() {
    "use strict";
    return '/Posts/1/post.html';
}

function generateFirstCartoonLink() {
    "use strict";
    return '/Cartoons/1/post.html';
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

function generateRandomLink() {
    "use strict";
    if (getRandomInt(0, 1) === 0) {
        return generateRandomPostLink();
    } else {
        return generateRandomCartoonLink();
    }
}

function populateRandomPages() {
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
}

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