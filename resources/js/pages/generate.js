const incrementButton = document.getElementById("incrementButton");
const decrementButton = document.getElementById("decrementButton");
const passwordsAmountInput = document.getElementById("passwordsAmount");
const generatePasswords = document.getElementById("generatePasswords");
const generatedPasswords = document.getElementById("generatedPasswords");

const incrementLengthButton = document.getElementById("incrementLengthButton");
const decrementLengthButton = document.getElementById("decrementLengthButton");
const passwordsLengthInput = document.getElementById("passwordsLengthInput");

const allowedLowercaseLetters = document.getElementById("lowercaseLettersOption");
const allowedUppercaseLetters = document.getElementById("uppercaseLettersOption");
const allowedNumbers = document.getElementById("numbersOption");
const allowedSpecialCharacters = document.getElementById("specialCharactersOption");

const copyToClipboard = async (element) => {
    try {
        await window.navigator.clipboard.writeText(element);
    } catch {}
};

if (incrementButton) {
    incrementButton.addEventListener("click", () => {
        const currentAmount = +(passwordsAmountInput?.value || 0);
        if (currentAmount < 20) {
            passwordsAmountInput.value = currentAmount + 1;
        }
    })
}

if (decrementButton) {
    decrementButton.addEventListener("click", () => {
        const currentAmount = +(passwordsAmountInput?.value || 0);
        if (currentAmount > 1) {
            passwordsAmountInput.value = currentAmount - 1;
        }
    })
}

if (passwordsAmountInput) {
    passwordsAmountInput.addEventListener("change", () => {
        const currentAmount = +(passwordsAmountInput?.value || 0);
        passwordsAmountInput.value = Math.min(20, Math.max(currentAmount, 1));
    })
}

if (incrementLengthButton) {
    incrementLengthButton.addEventListener("click", () => {
        const currentAmount = +(passwordsLengthInput?.value || 0);
        if (currentAmount < 64) {
            passwordsLengthInput.value = currentAmount + 1;
        }
    })
}

if (decrementLengthButton) {
    decrementLengthButton.addEventListener("click", () => {
        const currentAmount = +(passwordsLengthInput?.value || 0);
        if (currentAmount > 8) {
            passwordsLengthInput.value = currentAmount - 1;
        }
    })
}

if (passwordsLengthInput) {
    passwordsLengthInput.addEventListener("change", () => {
        const currentAmount = +(passwordsLengthInput?.value || 0);
        passwordsLengthInput.value = Math.min(64, Math.max(currentAmount, 8));
    })
}

if (generatePasswords) {
    generatePasswords.addEventListener("click", () => {
        const currentAmount = +(passwordsAmountInput?.value || 0);

        generatedPasswords.innerHTML = "";
        generatedPasswords.classList.remove("list-disc");

        const randomCharacters = [];

        if (allowedNumbers?.checked || false) randomCharacters.push(..."0123456789".split(""));
        if (allowedLowercaseLetters?.checked || false) randomCharacters.push(..."abcdefghijklmnopqrstuvwxyz".split(""));
        if (allowedUppercaseLetters.checked || false) randomCharacters.push(..."abcdefghijklmnopqrstuvwxyz".toUpperCase().split(""));
        if (allowedSpecialCharacters?.checked || false) randomCharacters.push(..."!@#$%&^*".split(""));

        if (randomCharacters.length === 0) {
            generatedPasswords.innerHTML = `<p class="bg-transparent font-medium text-[#909090]">Invalid options of a password generation. Select at least one option to generate your password.</p>`;
            return;
        }

        generatedPasswords.innerHTML += `<p class="bg-transparent font-medium text-[#909090] pb-1">Click on a password to copy it.</p>`;

        for (let i = 0; i < currentAmount; i++) {
            let generatedPassword = "";

            for (let j = 0; j < passwordsLengthInput.value; j++)
                generatedPassword += randomCharacters[Math.floor(Math.random() * randomCharacters.length)];

            const liElement = document.createElement("li");
            liElement.textContent = `${generatedPassword.slice(0, 40)}${generatedPassword.length > 40 ? "..." : ""}`;
            liElement.onclick = () => {
                copyToClipboard(generatedPassword);
            };

            liElement.classList.add("bg-[#141414]", "border", "border-[#90909030]", "max-lg:w-full", "w-[50%]", "text-center", "text-[#909090]", "hover:text-[#424242]", "duration-150", "cursor-pointer", "font-semibold");

            generatedPasswords.classList.add("list-disc");
            generatedPasswords.appendChild(liElement);
        }
    })
}