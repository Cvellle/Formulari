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
    // output.style.backgroundImage = `url('./images/${fileName}')`; 
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


// Jquery

jQuery(document).ready(function ($) {

    $(".fileuploader-btn").on("click", function () {
        $(".fileuploader").click();
    });

    $(".fileuploader").change(function (event) {
        var reader = new FileReader();
        reader.onload = function (file) {
            var fileContent = file.target.result;

            $("#pages").append(`
            <section class="newDiv" style="background:url('${fileContent}')">
                <button class="removePage">x</button>
            </section>
        `);

            addRemoveEvent();
            addingLlists.style.height = changeableDiv.clientHeight + "px";
        };

        reader.readAsDataURL(this.files[0]);
        event.target.value = "";

        setTimeout(() => {
            localStorage.setItem(current, changeableDiv.innerHTML);
            localStorage.setItem("constantHeader", constantHeader.innerHTML);
        }, 100);
    });
});


const addNewProj = document.querySelector("#addNewProj");
const nameDiv = document.querySelector(".nameDiv");
const projects = document.querySelector("#projects");
const savedProj = document.querySelectorAll("#projects button");
const openSaved = document.querySelectorAll(".openSaved");
const addProjName = document.querySelector(".addProjName");
const selcetSaved = document.querySelector("select");

// if (savedProj.length == 0 || !location.href.includes("#")) {
if (savedProj.length == 0 ) {
    // nameDiv.classList.add("dflex");
    nameDiv.classList.add("dflex");
    nameDiv.classList.remove("dnone"); 
}

addNewProj.addEventListener("click", addNewProjFun);
startFirst.addEventListener("click", addNewProjFun);
openSaved.forEach(el => el.addEventListener("click", openSavedProject));

const urlString = window.location.href;
const currUrl = urlString.substring(0, urlString.indexOf("#"));

function openSavedProject(event) {  
    setTimeout(() => {
        projects.classList.toggle("activeDrop");
        if (event.target.classList.contains("openSaved--start")) {
            nameDiv.classList.add("dnone");
            nameDiv.classList.remove("dflex");
            location.replace(`${urlString}#${this.previousElementSibling.value}`);
        } else {
            window.open(`${currUrl}#${event.target.previousElementSibling.innerHTML}`);
        }  
    }, 100);
}

function addNewProjFun() {
    if (this.previousElementSibling.value.length > 0) {
        projects.innerHTML += `
        <li>
            <p>${this.previousElementSibling.value}</p>
            <button class="openSaved" onclick="openSavedProject(event)">
                open
            </button>
            <span onclick="deleteProject(event)">
                x
            </span>
        </li>
        `;

        selcetSaved.innerHTML += `
        <option>
           ${this.previousElementSibling.value}</p>
        </option>
        `;
        
        setTimeout(() => {
            localStorage.setItem(current, changeableDiv.innerHTML);
            localStorage.setItem("constantHeader", constantHeader.innerHTML);
        }, 100);
       
        current = location.href;
        nameDiv.classList.add("dnone");
        nameDiv.classList.remove("dflex");
        projects.classList.remove("activeDrop");
    }

    if (this.classList.contains("startFirst")) {
        setTimeout(() => {
            location.replace(`#${this.previousElementSibling.value}`);
        }, 100);
        // window.close('', '_parent', '')
    } else {
        setTimeout(() => {
            window.open(`#${this.previousElementSibling.value}`);
        }, 100);
    }
}

function deleteProject(event) {
    event.target.parentNode.remove();
    if (urlString.includes("#")) {
        localStorage.removeItem(`${currUrl}#${event.target.previousElementSibling.previousElementSibling.innerHTML}`); 
    } else {
        localStorage.removeItem(`${urlString}`);    
    }
}

openProjList.onclick = function () {
    projects.classList.toggle("activeDrop");
}






// const drD = document.querySelectorAll(".myList");
// drD.forEach(
//     inputElement => inputElement.addEventListener("DOMNodeInserted", function (e) {
//         alert("a");
//     }, false)
// )

// if (window.styleMedia.type == "screen") {

// }