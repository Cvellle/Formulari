
function all() {

    // INPUT VALUES
    "keyup change".split(" ").forEach(evt => {
        const headerInputs = document.querySelectorAll("header>input");
        headerInputs.forEach(
            inputElement => inputElement.addEventListener(evt, function (e) {
                var sameElements = document.querySelectorAll("." + this.name);
                sameElements.forEach(textElement => textElement.innerHTML = e.target.value);
            }, false)
        )
    });

    // AUTO SET DATE
    const datumIzdavanja = document.querySelector(".datum-izdavanja");
    const date = new Date();
    datumIzdavanja.innerHTML = `${date.getDate()}. ${date.getMonth() + 1}. ${date.getFullYear()}`;

    // PRINT WINDOW
    const printButton = document.querySelector('button');
    printButton.onclick = function() {
        window.print();
    }

}

window.addEventListener("load", all);








// const nameInput = document.querySelector('input[name="broj-zapisnika"]');
// const zahtevBroj = document.querySelector('input[name="zahtev-broj"]');
// const datumZahteva = document.querySelector('input[name="datum-zahteva"]');
// const datumPosete = document.querySelector('input[name="datum-posete"]');
// const revizioniBroj = document.querySelector('input[name="revizioni-broj"]');
// const printButton = document.querySelector('button');

// printButton.onclick = function() {
//     window.print();
// }

// // "keyup change".split(" ")
// //     .map(name => nameInput.addEventListener(name, changeName, false));

// nameInput.addEventListener("keyup", changeName);
// function changeName(e) {
//     var els = document.querySelectorAll(".broj-zapisnika");
//     [].forEach.call(els, function(el) {
//         el.innerHTML = e.target.value;
//     });

//     // 2 
//     // var els = document.querySelectorAll(".name");
//     // els.forEach(el =>  el.innerHTML = e.target.value);
// }

// ['keyup', 'change'].forEach( evt => {
//     const headerInputs = document.querySelectorAll("header>input");
//     headerInputs.forEach(
//         el => el.addEventListener(evt, function (e){
//             var els = document.querySelectorAll("." + this.name);
//             els.forEach(el =>  el.innerHTML = e.target.value);
//     }, false)

//     )
//     });






