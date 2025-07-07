const modalDeletePassword = document.getElementById("modalDeletePassword");
const modalDeletePasswordButton = document.getElementById("deletePasswordModal");
const closeModalButton = document.getElementById("closeModal");
const cancelModalButton = document.getElementById("cancelButton");
const deleteAllPasswordsButton = document.getElementById("deleteAllPasswords");

function hideModal() {
    if (modalDeletePassword) {
        modalDeletePassword.classList.add("modal-hidden");
        modalDeletePassword.classList.remove("modal-visible");
    }
}

function showModal() {
    if (modalDeletePassword) {
        modalDeletePassword.classList.remove("modal-hidden");
        modalDeletePassword.classList.add("modal-visible");
    }
}

if (deleteAllPasswordsButton) {
    deleteAllPasswordsButton.addEventListener("click", () => {
        showModal();
    })
}

if (closeModalButton) {
    closeModalButton.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        hideModal();
    });
}

if (cancelModalButton) {
    cancelModalButton.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        hideModal();
    });
}

if (modalDeletePasswordButton) {
    modalDeletePasswordButton.addEventListener("click", () => {
        window.electron.deleteAllPasswords();
        window.location.href = "../views/list.html";
    })
}