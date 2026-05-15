const urlInput = document.getElementById("urlInput");
const urlBtn = document.getElementById("lookupBtn");
const resultDiv = document.getElementById("result");
const resultIp = resultDiv.querySelector(".result-ip");
const erorrSpan = document.getElementById("error");
urlBtn.addEventListener("click", checkInput);
urlInput.addEventListener("keydown", logKey);

let requestCount = 0;

function checkInput() {
    if (urlInput.value.trim() === "") {
        resultDiv.classList.add("hidden");
        urlInput.style.borderColor = "var(--danger)";
        erorrSpan.classList.remove("hidden");
        erorrSpan.textContent = t('error.empty');
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
        resultDiv.classList.add("hidden");
        erorrSpan.classList.remove("hidden");
        urlInput.style.borderColor = "var(--danger)";
        urlBtn.disabled = true;

        let seconds = 5;
        erorrSpan.textContent = t('error.rate-limit', { n: seconds });

        const interval = setInterval(() => {
            seconds--;
            erorrSpan.textContent = t('error.rate-limit', { n: seconds });
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
        title: t('loading.title'),
        text: t('loading.text'),
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
            body: JSON.stringify({ url: urlInput.value, lang: currentLang })
        });

        const data = await response.json();

        if (data.detail) {
            Swal.close();
            resultDiv.classList.add("hidden");
            urlInput.style.borderColor = "var(--danger)";
            erorrSpan.classList.remove("hidden");
            erorrSpan.textContent = data.detail;
        }

        else {
            Swal.close();
            erorrSpan.classList.add("hidden");
            resultIp.textContent = data.ip;
            resultDiv.classList.remove("hidden");
            urlInput.style.borderColor = "";
        }

    }

    catch (error) {
        Swal.close();
        resultDiv.classList.add("hidden");
        erorrSpan.classList.remove("hidden");
        urlInput.style.borderColor = "var(--danger)";
        erorrSpan.textContent = t('error.api');
    }

    urlBtn.disabled = false;

}
