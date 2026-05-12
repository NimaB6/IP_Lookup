    const urlInput = document.getElementById("urlInput");
    const urlBtn = document.getElementById("lookupBtn");
    urlBtn.addEventListener("click" , checkInput);
    urlInput.addEventListener("keydown" , logKey);

function checkInput()
{
    const resultSpan = document.getElementById("result");
    const erorrSpan = document.getElementById("error");
    if (urlInput.value.trim() === "") {
        resultSpan.classList.add("hidden");
        urlInput.style.borderColor = "var(--danger)";
        erorrSpan.classList.remove("hidden");
        erorrSpan.textContent = "URL darf nicht leer sein.";
    }
    else {
        erorrSpan.classList.add("hidden");
        urlInput.style.borderColor = "var(--accent)";
        resultSpan.classList.remove("hidden");
        resultSpan.textContent = "Zum Beispiel: 8.8.8.8";
    }
}

function logKey(e)
{
    if (e.key == "Enter") {
       checkInput();
    }
}
