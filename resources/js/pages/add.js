const addPasswordButton = document.getElementById("addPassword");

const errorsContainer = document.getElementById("errors");
const usernameError = document.getElementById("usernameError");
const passwordError = document.getElementById("passwordError");
const closeErrors = document.getElementById("closeErrors");

if (addPasswordButton) {
    addPasswordButton.addEventListener("click", () => {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const selectedType = document.querySelector('input[name="type"]:checked').value;

        if (!password || !username) {
            usernameError.classList[!username ? "remove" : "add"]("hidden");
            passwordError.classList[!password ? "remove" : "add"]("hidden");
            errorsContainer.classList.remove("hidden");
            return;
        }

        window.electron.addPassword({
            username, password, type: selectedType
        });

        window.location.href = "../views/list.html";
    });
}

if (closeErrors) {
    closeErrors.addEventListener("click", () => {
        errorsContainer.classList.add("hidden");
    });
}