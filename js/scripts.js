// localStorage.clear()
// localStorage.removeItem("myListItems3");

(function () {

    // PRINT WINDOW
    const printButton = document.querySelector('#printButton');
    printButton.onclick = function (e) {
        window.print();
    }

    // APPEND
    const appendInupt = function (e) {
        const node = document.createElement("DIV");
        const inp = document.createElement("TEXTAREA");
        const changeFont = document.createElement("INPUT");
        const areaName = document.createElement("INPUT");

        node.appendChild(inp);
        node.insertBefore(changeFont, node.firstChild);
        node.appendChild(areaName);

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


        const newInp = document.querySelectorAll('.myList input[type="range"]');
        newInp.forEach(inp => inp.addEventListener("mousemove", function () {
            this.nextElementSibling.style.fontSize = this.value * 0.3 + "px";
        }));

        $(function () {
            $(".newInput").parent().draggable();
        });


        //  INPUT VALUES
        "keyup change".split(" ").forEach(evt => {
            const newInputs = document.querySelectorAll(".newInput + input");
            const nameInputs = document.querySelectorAll(".areaName + input");

            nameInputs.forEach(
                inputElement => inputElement.addEventListener(evt, function (e) {
                    this.previousElementSibling.innerHTML = this.value;
                    this.previousElementSibling.previousElementSibling.previousElementSibling.className = this.previousElementSibling.innerHTML + " newInput";
                    //AUTO SET DATE
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

        });


        const divs = document.querySelectorAll(".draggableDiv");

        divs.forEach(
            inputElement => inputElement.addEventListener("mouseup", function (e) {
                localStorage.setItem('myListItems3', document.body.innerHTML);
            }, false)
        )

        divs.forEach(element => {
            element.addEventListener("mouseover", allowDel)
        });

        const deleteDiv1 = document.querySelectorAll('.myList button');

        function allowDel() {
            deleteDiv1.forEach(
                el => el.addEventListener("click", function (e) {
                    this.parentElement.style.display = "none";
                }, false)
            )
        }

    }

    const appendInupts = document.querySelectorAll('.addInputs');
    appendInupts.forEach(el => el.addEventListener("click", appendInupt)) = appendInupt;


    const divs = document.querySelectorAll(".draggableDiv");

    divs.forEach(
        inputElement => inputElement.addEventListener("mouseup", function (e) {
            localStorage.setItem('myListItems3', document.body.innerHTML);
        }, false)
    )

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

    const drD = document.querySelectorAll(".myList>div");
    drD.forEach(
        inputElement => inputElement.addEventListener("load", function (e) {
            alert("a");
        }, false)
    )

    // OPEN FILE
    const acceptInput = document.querySelectorAll('.fileInp');
    acceptInput.forEach(element => {
        element.addEventListener("change", loadFile)
    });

    function loadFile(event) {
        var output = event.target.parentNode;
        output.style.backgroundImage = "url(" + URL.createObjectURL(event.target.files[0]) + ")";
    };

    // LOCAL STORAGE
    var saved = localStorage.getItem('myListItems3');

    if (saved) {
        document.body.innerHTML = saved;
    }

    //  INPUT VALUES
    "keyup change".split(" ").forEach(evt => {
        const newInputs = document.querySelectorAll(".newInput + input");
        const nameInputs = document.querySelectorAll(".areaName + input");

        nameInputs.forEach(
            inputElement => inputElement.addEventListener(evt, function (e) {
                this.previousElementSibling.innerHTML = this.value;
                this.previousElementSibling.previousElementSibling.previousElementSibling.className = this.previousElementSibling.innerHTML + " newInput";
                //AUTO SET DATE
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

    });

    //DRAG ONLOAD
    $(function () {
        $(".newInput").parent().draggable();
    });

    window.addEventListener("load", all);

    // if (window.styleMedia.type == "screen") {

    // }

})()
