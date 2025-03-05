// Recupera tutti gli audio e i controlli play/pause
const audioPlayers = document.querySelectorAll('.audio-player');

audioPlayers.forEach(player => {
    const audio = player.querySelector('.audio-file');
    const playPauseButton = player.querySelector('.play-pause');
    const currentTimeElement = player.querySelector('.current-time');
    const durationElement = player.querySelector('.duration');
    const seekBar = player.querySelector('.seek-bar');

    // Imposta la durata del brano quando l'audio è pronto
    audio.addEventListener('loadedmetadata', () => {
        durationElement.textContent = formatTime(audio.duration);
        seekBar.max = audio.duration;
    });

    // Funzione per formattare i tempi in minuti:secondi
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secondsLeft = Math.floor(seconds % 60);
        return `${minutes}:${secondsLeft < 10 ? '0' + secondsLeft : secondsLeft}`;
    }

    // Funzione per aggiornare la posizione della barra di ricerca e il tempo corrente
    function updateCurrentTime() {
        currentTimeElement.textContent = formatTime(audio.currentTime);
        seekBar.value = audio.currentTime;
    }

    // Aggiorna il tempo corrente durante la riproduzione
    audio.addEventListener('timeupdate', updateCurrentTime);

    // Gestisce la riproduzione e la pausa
    playPauseButton.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            audio.pause();
            playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
        }
    });

    // Aggiorna la posizione del brano quando si sposta la barra di ricerca
    seekBar.addEventListener('input', () => {
        audio.currentTime = seekBar.value;
    });
});
