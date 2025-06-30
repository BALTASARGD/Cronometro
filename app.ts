  import { JSDOM } from 'jsdom'; 

const { window } = new JSDOM(`<!DOCTYPE html><body><button id="button-start-pause"></button><button id="button-reset"></button></body>`);
const { document } = window;

// Wählen Sie die Buttons aus.
const buttonStartPause = document.querySelector("#button-start-pause") as HTMLElement | null;
const buttonReset = document.querySelector("#button-reset") as HTMLElement | null;
  
  // Variablen zur Speicherung der Sekunden, Minuten und Stunden.
  let [sekunden, minuten, stunden]: [number, number, number] = [0, 0, 0];
  
  // Variablen zur Verwaltung des Zeitintervalls und des Status der Stoppuhr.
  let zeitintervall: number;
  let stoppuhrStatus: "pausiert" | "läuft" = "pausiert"; // Zwei mögliche Zustände: 'pausiert' oder 'läuft'.
  
  // Aktualisieren der Stoppuhr.
  function aktualisiereStoppuhr(): void {
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
    const sekundenMitFormat = formatieren(sekunden);
    const minutenMitFormat = formatieren(minuten);
    const stundenMitFormat = formatieren(stunden);
  
    // Aktualisiere den Inhalt der Stoppuhr.
    const stoppuhr = document.getElementById("stoppuhr") as HTMLElement;
    stoppuhr.innerText = `${stundenMitFormat}:${minutenMitFormat}:${sekundenMitFormat}`;
  }
  
  // Füge eine führende Null hinzu, wenn nötig.
  function formatieren(zeitEinheit: number): string {
    return zeitEinheit < 10 ? "0" + zeitEinheit : zeitEinheit.toString();
  }
  
  if (buttonStartPause) {
    buttonStartPause.addEventListener("click", function () {
      if (stoppuhrStatus === "pausiert") {
        // Rufe die Funktion Stoppuhr alle 1000 Millisekunden auf.
        zeitintervall = window.setInterval(aktualisiereStoppuhr, 1000);
        // Wenn die Stoppuhr pausiert ist, wird das Symbol geändert zu "||" für Start.
        buttonStartPause.innerHTML = `<i class="bi bi-pause" id="button-start-pause"></i>`;
        buttonStartPause.classList.remove("starten");
        buttonStartPause.classList.add("pausieren");
        // Aktualisiere den Status der Stoppuhr.
        stoppuhrStatus = "läuft";
      } else {
        // Stoppe die Stoppuhr durch Entfernen des Zeitintervalls.
        window.clearInterval(zeitintervall);
        // Aktualisiere die Buttons und den Status der Stoppuhr.
        buttonStartPause.innerHTML = `<i class="bi bi-play-fill" id="button-start-pause"></i>`;
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
      const stoppuhr = document.getElementById("stoppuhr") as HTMLElement;
      stoppuhr.innerHTML = "00:00:00";
  
      // Buttons.
      if (buttonStartPause) {
        buttonStartPause.innerHTML = `<i class="bi bi-play-fill" id="start"></i>`;
        buttonStartPause.classList.remove("pausieren");
        buttonStartPause.classList.add("starten");
      }
  
      // Status.
      stoppuhrStatus = "pausiert";
    });
  }
