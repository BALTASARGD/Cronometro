 // Wählen Sie die Buttons aus.          
var buttonStartPause = document.querySelector("#button-start-pause");
var buttonReset = document.querySelector("#button-reset");
// Variablen zur Speicherung der Sekunden, Minuten und Stunden.
var _a = [0, 0, 0], sekunden = _a[0], minuten = _a[1], stunden = _a[2];
// Variablen zur Verwaltung des Zeitintervalls und des Status der Stoppuhr.
var zeitintervall;
var stoppuhrStatus = "pausiert"; // Zwei mögliche Zustände: 'pausiert' oder 'läuft'.
// Aktualisieren der Stoppuhr.
function aktualisiereStoppuhr() {
    sekunden++;
    if (sekunden / 60 === 1) {
        sekunden = 0;
        minuten++;
        if (minuten / 60 === 1) {
            minuten = 0;
            stunden++;
        }
    }
    // Füge führende Nullen hinzu, wenn erforderlich.
    var sekundenMitFormat = formatieren(sekunden);
    var minutenMitFormat = formatieren(minuten);
    var stundenMitFormat = formatieren(stunden);
    // Aktualisiere den Inhalt der Stoppuhr.
    var stoppuhr = document.getElementById("stoppuhr");
    stoppuhr.innerText = "".concat(stundenMitFormat, ":").concat(minutenMitFormat, ":").concat(sekundenMitFormat);
}
// Füge eine führende Null hinzu, wenn nötig.
function formatieren(zeitEinheit) {
    return zeitEinheit < 10 ? "0" + zeitEinheit : zeitEinheit.toString();
}
if (buttonStartPause) {
    buttonStartPause.addEventListener("click", function () {
        if (stoppuhrStatus === "pausiert") {
            // Rufe die Funktion Stoppuhr alle 1000 Millisekunden auf.
            zeitintervall = window.setInterval(aktualisiereStoppuhr, 1000);
            // Wenn die Stoppuhr pausiert ist, wird das Symbol geändert zu "||" für Start.
            buttonStartPause.innerHTML = "<i class=\"bi bi-pause\" id=\"button-start-pause\"></i>";
            buttonStartPause.classList.remove("starten");
            buttonStartPause.classList.add("pausieren");
            // Aktualisiere den Status der Stoppuhr.
            stoppuhrStatus = "läuft";
        }
        else {
            // Stoppe die Stoppuhr durch Entfernen des Zeitintervalls.
            window.clearInterval(zeitintervall);
            // Aktualisiere die Buttons und den Status der Stoppuhr.
            buttonStartPause.innerHTML = "<i class=\"bi bi-play-fill\" id=\"button-start-pause\"></i>";
            buttonStartPause.classList.remove("pausieren");
            buttonStartPause.classList.add("starten");
            stoppuhrStatus = "pausiert";
        }
    });
}
if (buttonReset) {
    // Setze die Stoppuhr zurück, indem das Zeitintervall gelöscht wird,
    // die Sekunden, Minuten und Stunden zurückgesetzt werden und
    // der Status der Stoppuhr und der Buttons aktualisiert werden.
    buttonReset.addEventListener("click", function () {
        // Entferne das Zeitintervall.
        window.clearInterval(zeitintervall);
        // Setze Sekunden, Minuten und Stunden zurück.
        sekunden = 0;
        minuten = 0;
        stunden = 0;
        var stoppuhr = document.getElementById("stoppuhr");
        stoppuhr.innerHTML = "00:00:00";
        // Buttons.
        if (buttonStartPause) {
            buttonStartPause.innerHTML = "<i class=\"bi bi-play-fill\" id=\"start\"></i>";
            buttonStartPause.classList.remove("pausieren");
            buttonStartPause.classList.add("starten");
        }
        // Status.
        stoppuhrStatus = "pausiert";
    });
}
