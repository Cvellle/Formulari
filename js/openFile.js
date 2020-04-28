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