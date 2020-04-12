const addingLlists = document.querySelector(".myList");
addingLlists.style.height = document.body.scrollHeight + "px";

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
            el => el.addEventListener("click", function() {
                this.parentNode.parentNode.innerHTML = `<div style="display:none;"></div>`;
                setTimeout(() => {
                    localStorage.setItem('myListItems3', document.body.innerHTML);
                }, 100);
            }, false)
        )
    }
}

// FIX DIV
const fixDiv = function () {
    const spans = document.querySelectorAll('.draggableDiv span');

    spans.forEach(
        el => el.addEventListener("click", function() {
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

//  INPUT VALUES
const changeInputs = function () {
    "keyup change".split(" ").forEach(evt => {
        const newInputs = document.querySelectorAll(".newInput + input");
        const nameInputs = document.querySelectorAll(".areaName + input");
        const rangeInputs = document.querySelectorAll('.myList input[type="range"]');

        nameInputs.forEach(
            inputElement => inputElement.addEventListener(evt, function (e) {
                this.previousElementSibling.innerHTML = this.value;
                this.previousElementSibling.previousElementSibling.previousElementSibling.className = this.previousElementSibling.innerHTML + " newInput";
                //auto set date
                const date = new Date();
                if (this.value == "date") {
                    this.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}.`;
                }
            }, false)
        )

        newInputs.forEach(
            inputElement => inputElement.addEventListener(evt, function (e) {
                this.previousElementSibling.innerHTML = this.value;
                var sameElements = document.querySelectorAll("." + this.nextElementSibling.innerHTML);
                sameElements.forEach(textElement => {
                    textElement.innerHTML = e.target.value;
                });
            }, false)
        )

        rangeInputs.forEach(inp => inp.addEventListener("mousemove", function () {
            this.nextElementSibling.style.fontSize = this.value * 0.3 + "px";
        }));

    });
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
        
        localStorage.setItem('myListItems3', document.body.innerHTML);

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
    let fileName = file[file.length-1];
    localStorage.setItem("newImage1", bgImage); 
    output.style.backgroundImage = `url('./images/${fileName}')`;
    setTimeout(() => localStorage.setItem('myListItems3', document.body.innerHTML), 100)
};
    

// SAVE TO LOCAL STORAGE
function saveToLocalStorage() {
    const divs = document.querySelectorAll(".draggableDiv");

    divs.forEach(
        inputElement => inputElement.addEventListener("mouseup", function (e) {
            setTimeout(() => localStorage.setItem('myListItems3', document.body.innerHTML), 100)
        }, false)
    )
}

// GET LOCAL STORAGE
function getLocalStorage() {
    var saved = localStorage.getItem('myListItems3');
    if (saved) {
        document.body.innerHTML = localStorage.getItem('myListItems3');;
    }
}

getLocalStorage();

// CLEAR LOCAL STORAGE
const clearLs = document.querySelector("#deleteLs");
clearLs.onclick = function () {
    localStorage.clear();
    location.reload();
}

dragg();
changeInputs();
deleteSelf();
fixDiv();
saveToLocalStorage();


window.addEventListener("load", all);



// const drD = document.querySelectorAll(".myList");
// drD.forEach(
//     inputElement => inputElement.addEventListener("DOMNodeInserted", function (e) {
//         alert("a");
//     }, false)
// )

// if (window.styleMedia.type == "screen") {

// }