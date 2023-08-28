const btn = document.querySelector("#btnsave");
const successMessage = document.getElementById("success-msg");

btn.addEventListener("click", function (e) {
    /* Nome do cachorro */
    const dogname = document.querySelector("#dogname");
    const name = dogname.value;

    /* Raça */
    const selectBreed = document.getElementById("selectbreed");
    const selectedBreedName = selectBreed.options[selectBreed.selectedIndex].textContent;

    /* Cor da Fonte */
    const fontColorSelect = document.getElementById("font-color-select");
    const selectedFontColor = fontColorSelect.value;

    /* Estilo Fonte */
    const fontSelect = document.getElementById("font-select");
    const selectedFont = fontSelect.value;

    const dataDogs = {
        name: name,
        breed: selectedBreedName,
        fontColor: selectedFontColor,
        fontStyle: selectedFont,
        dateTime: new Date().toLocaleString(),
    };

    localStorage.setItem("dataDogs", JSON.stringify(dataDogs));

    // Enviar solicitação para receive.php
    $.ajax({
        type: "POST",
        url: "receive.php",
        data: dataDogs,
        success: function (response) {
            console.log("Resposta do PHP:", response);

            if (response && response.image) {
                const dogImage = document.getElementById("dog-image");
                dogImage.src = response.image;
                dogImage.style.display = 'block';
            }

            const txtOverImage = document.getElementById("txt-over-image");
            txtOverImage.innerText = dataDogs.name;
            txtOverImage.style.fontFamily = dataDogs.fontStyle;
            txtOverImage.style.color = dataDogs.fontColor;
            txtOverImage.style.display = 'block';
        },
    });

    successMessage.style.display = "block";
});
