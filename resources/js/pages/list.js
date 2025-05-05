const passwordsContainer = document.getElementById("passwords");
const typeIdToIcon = [
    "instagram",
    "github",
    "facebook",
    "youtube",
    "discord",
    "other"
]

let allPasswords = [];
window.addEventListener("load", () => {
    localStorage.clear()
})

const addPasswordButtonToBottom = () => {
    document.querySelector("section").innerHTML += `
        <div class="bg-transparent max-lg:w-full w-[50%] flex items-center justify-center ${allPasswords.length > 0 ? "" : "pt-4"}">
            <a href="./add.html" class="bg-[#2A5991] duration-150 text-center rounded-sm cursor-pointer py-1 w-full font-semibold">
                Add New Password
            </a>
        </div>
    `;
}

window.electron.fetchPasswords().then((passwords) => {
    allPasswords = passwords;

    if (passwords.length === 0) {
        const sectionElement = document.querySelector("section");
        sectionElement.innerHTML = `
            <h1 class="bg-transparent">
                PASSWORDS
            </h1>

             <p class="text-[#909090] font-semibold bg-transparent">
                You have not saved any data with out app yet.
            </p>
        `;

        addPasswordButtonToBottom();
        return;
    }

    for (const { username, type, id, password } of passwords) {
        localStorage.setItem(`${id}`, JSON.stringify({
            username, type, password
        }));

        passwordsContainer.innerHTML += `
            <a href="./manage.html?id=${id}" class="bg-[#202020] hover:bg-[#272727] transition-all duration-150 rounded-md p-6 flex items-center w-full lg:w-[50%]">
                <img src="../assets/icons/media/${typeIdToIcon[type]}.svg" alt="list" width="40" height="40" class="bg-transparent select-none" />

                <div class="bg-transparent flex flex-col pl-4 text-gray-300">
                    <h1 class="text-lg font-semibold tracking-wide bg-transparent">
                        ${username}
                    </h1>

                    <p class="text-sm text-[#909090] font-semibold bg-transparent">
                        Click to view details.
                    </p>
                </div>
            </a>`;
    }

    addPasswordButtonToBottom();
}).catch(() => {});