const addingLlists = document.querySelector(".myList");
const constantHeader = document.querySelector(".constantDiv");
const changeableDiv = document.querySelector(".changeableDiv");
const projItem = document.querySelector(".projects > *");
const startFirst = document.querySelector(".startFirst");
let savedLocalSorages = ["myListItems1"];
let projNames = [];
current = location.href;

let saved2 = localStorage.getItem("constantHeader");
if (saved2) {
    constantHeader.innerHTML = localStorage.getItem("constantHeader");
}

addingLlists.style.height = changeableDiv.clientHeight + "px";
//DRAG ONLOAD
const dragg = function () {
    $(".newInput").parent().draggable();
}

// DELETE DIV
const deleteSelf = function () {
    const divs = document.querySelectorAll(".draggableDiv");
    divs.forEach(element => {
        element.addEventListener("mouseover", allowDel)
    });
    const deleteDiv = document.querySelectorAll('.myList button');

    function allowDel() {
        deleteDiv.forEach(
            el => el.addEventListener("click", function () {
                this.parentNode.parentNode.innerHTML = `<div style="display:none;"></div>`;
                setTimeout(() => {
                    localStorage.setItem(current, changeableDiv.innerHTML);
                    localStorage.setItem("constantHeader", constantHeader.innerHTML);
                }, 100);
            }, false)
        )
    }
}

// FIX DIV
const fixDiv = function () {
    const spans = document.querySelectorAll('.draggableDiv span');

    spans.forEach(
        el => el.addEventListener("click", function () {
            const sectionOffsetLeft = document.querySelector("#pages > section").getBoundingClientRect().left;
            const sectionOffsetTop = document.querySelector(".myList").getBoundingClientRect().top;

            const draggableDivLeft = this.parentNode.style.left;
            const draggableDivTop = this.parentNode.style.top;

            this.parentNode.style.left = (Number(draggableDivLeft.slice(0, draggableDivLeft.length - 2)) + Number(sectionOffsetLeft)) + "px";
            this.parentNode.style.top = (Number(draggableDivTop.slice(0, draggableDivTop.length - 2)) + Number(sectionOffsetTop)) + "px";

            this.parentNode.style.position = "fixed";
            this.parentNode.classList.add("fixed");
        }, false)
    )
}

function all() {
    // PRINT WINDOW
    const printButton = document.querySelector('#printButton');
    printButton.onclick = function (e) {
        window.print();
    }

    // APPEND NEW ELEMENT
    const appendInupt = function (e) {
        const newInputsList = document.querySelector(".myList")
        newInputsList.innerHTML += `
        <div>
            <div class="draggableDiv" style="margin-top: ${Number(window.pageYOffset) + 100 + "px"}">
                <input type="range"/>
                <textarea class="newInput" readonly="true"></textarea>
                <input placeholder="type text" type="text"/>
                <div class="areaName"></div>
                <input placeholder="input name" type="text"/>
                <button style="height:20px; width:20px;">x</button>
                <span>Fix</span>
            </div>
        </div>
        `;

        localStorage.setItem(current, changeableDiv.innerHTML);

        dragg();
        changeInputs();
        deleteSelf();
        fixDiv();
        saveToLocalStorage();
    }

    const appendInupts = document.querySelectorAll('.addInputs');
    appendInupts.forEach(el => el.addEventListener("click", appendInupt)) = appendInupt;
}

// OPEN FILE
const acceptInput = document.querySelectorAll('.fileInp');
acceptInput.forEach(element => {
    element.addEventListener("change", loadFile)
});

function loadFile(event) {
    let bgImage = URL.createObjectURL(event.target.files[0]);
    let output = event.target.parentNode;
    let file = event.target.value.split("\\");
    let fileName = file[file.length - 1];
    localStorage.setItem("newImage1", bgImage);
    output.style.backgroundImage = `url('${bgImage}')`;
    setTimeout(() => localStorage.setItem(current, changeableDiv.innerHTML), 100);
};

// SAVE TO LOCAL STORAGE
function saveToLocalStorage() {
    const divs = document.querySelectorAll(".draggableDiv");

    divs.forEach(
        inputElement => inputElement.addEventListener("mouseup", function (e) {
            setTimeout(() => {
                localStorage.setItem(current, changeableDiv.innerHTML);
                localStorage.setItem("constantHeader", constantHeader.innerHTML);
            }, 100);
        }, false)
    )
}

// GET LOCAL STORAGE
function getLocalStorage() {
    let saved = localStorage.getItem(current);
    let saved2 = localStorage.getItem("constantHeader");
    if (saved) {
        changeableDiv.innerHTML = localStorage.getItem(current);
    }
    if (saved2) {
        constantHeader.innerHTML = localStorage.getItem("constantHeader");
    }
}

getLocalStorage();

// CLEAR LOCAL STORAGE
const clearLs = document.querySelector("#deleteLs");
clearLs.onclick = function () {
    if (localStorage.getItem(current) != null) {
        localStorage.removeItem(current);
    }
    localStorage.clear();
    location.reload();
}

function addRemoveEvent() {
    const removeDivBtn = document.querySelectorAll(".removePage");
    removeDivBtn.forEach(el => el.addEventListener("click", removePrentPage))

    function removePrentPage() {
        this.parentElement.remove();
        setTimeout(() => {
            localStorage.setItem(current, changeableDiv.innerHTML);
            localStorage.setItem("constantHeader", constantHeader.innerHTML);
        }, 100);
    }
}

dragg();
changeInputs();
deleteSelf();
fixDiv();
saveToLocalStorage();
addRemoveEvent();

window.addEventListener("load", all);


