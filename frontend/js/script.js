const urlInput = document.getElementById("urlInput");
const urlBtn = document.getElementById("lookupBtn");
const resultSpan = document.getElementById("result");
const erorrSpan = document.getElementById("error");
urlBtn.addEventListener("click", checkInput);
urlInput.addEventListener("keydown", logKey);

function checkInput() {
    if (urlInput.value.trim() === "") {
        resultSpan.classList.add("hidden");
        urlInput.style.borderColor = "var(--danger)";
        erorrSpan.classList.remove("hidden");
        erorrSpan.textContent = "URL darf nicht leer sein.";
    }
    else {
        erorrSpan.classList.add("hidden");
        lookupIp();
    }
}

function logKey(e) {
    if (e.key == "Enter") {
        checkInput();
    }
}

async function lookupIp() {

    try {
        const response = await fetch("http://127.0.0.1:8000/lookup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ url: urlInput.value })
        });

        const data = await response.json();

        if (data.detail) {
            resultSpan.classList.add("hidden");
            urlInput.style.borderColor = "var(--danger)";
            erorrSpan.classList.remove("hidden");
            erorrSpan.textContent = data.detail;
        }

        else {
            erorrSpan.classList.add("hidden");
            resultSpan.textContent = "IP-Adresse: " + data.ip;
            resultSpan.classList.remove("hidden");
            urlInput.style.borderColor = "var(--success)";
        }

    }

    catch (error) {

        resultSpan.classList.add("hidden");
        erorrSpan.classList.remove("hidden");
        erorrSpan.textContent = "API ist nicht erreichbar!";
    }


}