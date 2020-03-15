const nameInput = document.querySelector('input[name="broj-zapisnika"]');
const zahtevBroj = document.querySelector('input[name="zahtev-broj"]');
const datumZahteva = document.querySelector('input[name="datum-zahteva"]');
const datumPosete = document.querySelector('input[name="datum-posete"]');
const revizioniBroj = document.querySelector('input[name="revizioni-broj"]');

nameInput.addEventListener("keyup", changeName);
function changeName(e) {
    var els = document.querySelectorAll(".broj-zapisnika");
    [].forEach.call(els, function(el) {
        el.innerHTML = e.target.value;
    });

    // 2 
    // var els = document.querySelectorAll(".name");
    // els.forEach(el =>  el.innerHTML = e.target.value);
}

zahtevBroj.onkeyup = function(e) {
    var els = document.querySelectorAll(".zahtev-broj");
    [].forEach.call(els, function(el) {
        el.innerHTML = e.target.value;
    });
}

datumZahteva.onkeyup = function(e) {
    var els = document.querySelectorAll(".datum-zahteva");
    [].forEach.call(els, function(el) {
        el.innerHTML = e.target.value;
    });
}

datumPosete.onkeyup = function(e) {
    var els = document.querySelectorAll(".datum-posete");
    [].forEach.call(els, function(el) {
        el.innerHTML = e.target.value;
    });
}

revizioniBroj.onkeyup = function(e) {
    var el = document.querySelector(".revizioni-broj");
     el.innerHTML = e.target.value;
}

document.querySelector(".datum-izdavanja").innerHTML = `${new Date().getDate()}. ${new Date().getMonth() + 1}. ${new Date().getFullYear()}`;

