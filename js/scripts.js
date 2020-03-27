//DRAG ONLOAD
const dragg = function() {
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
            el => el.addEventListener("click", function (e) {
                this.parentElement.style.display = "none";
            }, false)
        )
    }
}

// SAVE TO LOCAL STORAGE
const saveToLocalStorage = function () {
    const divs = document.querySelectorAll(".draggableDiv");

    divs.forEach(
        inputElement => inputElement.addEventListener("mouseup", function (e) {
            localStorage.setItem('myListItems3', document.body.innerHTML);
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
        e.target.nextElementSibling.innerHTML += `
                <div class="draggableDiv" >
                    <input type="range"/>
                    <textarea class="newInput" readonly="true"></textarea>
                    <input placeholder="type text" type="text"/>
                    <div class="areaName"></div>
                    <input placeholder="input name" type="text"/>
                    <button style="height:20px; width:20px;">x</button>
                </div>
            `;

        const newInputsList = document.querySelector(".myList");
        localStorage.setItem('myListItems3', document.body.innerHTML);

        dragg();
        changeInputs();
        deleteSelf();
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
    var output = event.target.parentNode;
    output.style.backgroundImage = "url(" + URL.createObjectURL(event.target.files[0]) + ")";
};

// GET LOCAL STORAGE
var saved = localStorage.getItem('myListItems3');
if (saved) {
    document.body.innerHTML = saved;
}

// CLEAR LOCAL STORAGE
const clearLs = document.querySelector("#deleteLs");
clearLs.onclick = function () {
    localStorage.clear();
    location.reload();
}

window.addEventListener("load", all);

dragg();
changeInputs();
deleteSelf();
saveToLocalStorage();

const drD = document.querySelectorAll(".myList>div");
drD.forEach(
    inputElement => inputElement.addEventListener("load", function (e) {
        alert("a");
    }, false)
)

// if (window.styleMedia.type == "screen") {
// }