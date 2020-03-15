const nameInput = document.querySelector('input[name="name"]');
const codeInput = document.querySelector('input[name="code"]');

nameInput.addEventListener("keypress", changeName);

// const studentName = document.getElementsByClassName("name");
// const studentCode = document.querySelectorAll(".code");

// studentName.forEach(el => el.addEventListener("change", nameInput))

function changeName(e) {
    var els = document.querySelectorAll(".name");
    [].forEach.call(els, function(el) {
        el.innerHTML = e.target.value;
    });

    // 2 
    // var els = document.querySelectorAll(".name");
    // els.forEach(el =>  el.innerHTML = e.target.value);
}

codeInput.onkeypress = function(e) {
    var els = document.querySelectorAll(".code");
    [].forEach.call(els, function(el) {
        el.innerHTML = e.target.value;
    });
}


