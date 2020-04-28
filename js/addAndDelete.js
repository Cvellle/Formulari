const addNewProj = document.querySelector("#addNewProj");
const nameDiv = document.querySelector(".nameDiv");
const projects = document.querySelector("#projects");
const savedProj = document.querySelectorAll("#projects button");
const openSaved = document.querySelectorAll(".openSaved");
const addProjName = document.querySelector(".addProjName");
const selcetSaved = document.querySelector("select");

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

    setTimeout(() => {
        localStorage.setItem(current, changeableDiv.innerHTML);
        localStorage.setItem("constantHeader", constantHeader.innerHTML);
    }, 100);
}

openProjList.onclick = function () {
    projects.classList.toggle("activeDrop");
}



