const urlInput = document.getElementById("urlInput");
const urlBtn = document.getElementById("lookupBtn");
const resultSpan = document.getElementById("result");
const erorrSpan = document.getElementById("error");
urlBtn.addEventListener("click", checkInput);
urlInput.addEventListener("keydown", logKey);

let requestCount = 0;

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
    if (e.key == "Enter" && !urlBtn.disabled) {
        e.preventDefault();
        checkInput();
    }
}

async function lookupIp() {

    urlBtn.disabled = true;


    if (requestCount >= 3) {
        resultSpan.classList.add("hidden");
        erorrSpan.classList.remove("hidden");
        urlInput.style.borderColor = "var(--danger)";
        urlBtn.disabled = true;

        let seconds = 5;
        erorrSpan.textContent = `Bitte ${seconds} Sekunden warten!`;

        const interval = setInterval(() => {
            seconds--;
            erorrSpan.textContent = `Bitte ${seconds} Sekunden warten!`;
            if (seconds == 0) {
                clearInterval(interval);
                urlInput.style.borderColor = "";
                erorrSpan.classList.add("hidden");
                urlBtn.disabled = false;

            }
        }, 1000);

        return;
    }

    requestCount++;

    if (requestCount == 3) {
        setTimeout(() => {
            requestCount = 0;
        }, 5000);
    }

    Swal.fire({
        theme: 'dark',
        title: 'Loading...',
        text: 'Bitte warten...',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

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
            Swal.close();
            resultSpan.classList.add("hidden");
            urlInput.style.borderColor = "var(--danger)";
            erorrSpan.classList.remove("hidden");
            erorrSpan.textContent = data.detail;
        }

        else {
            Swal.close();
            erorrSpan.classList.add("hidden");
            resultSpan.textContent = "IP-Adresse: " + data.ip;
            resultSpan.classList.remove("hidden");
            urlInput.style.borderColor = "";
        }

    }

    catch (error) {
        Swal.close();
        resultSpan.classList.add("hidden");
        erorrSpan.classList.remove("hidden");
        urlInput.style.borderColor = "var(--danger)";
        erorrSpan.textContent = "API ist nicht erreichbar!";
    }

    urlBtn.disabled = false;

}