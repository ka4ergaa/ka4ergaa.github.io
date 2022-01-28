let switchMode = document.getElementById("switchMode");

switchMode.onclick = function() {
    let theme = document.getElementById("theme");

    if (theme.getAttribute("href") == "dark-mode.css") {
        theme.href = "light-mode.css";
    } else {
        theme.href = "dark-mode.css";
    }
}