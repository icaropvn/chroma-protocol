const demoSoundMapping = {
    'identVermelho': 'sons/red.wav',
    'identLaranja': 'sons/orange.wav',
    'identAmarelo': 'sons/yellow.wav',
    'identVerde': 'sons/green.wav',
    'identAzul': 'sons/blue.wav',
    'identVioleta': 'sons/violet.wav',
    'identCinza': 'sons/gray.wav'
};

document.querySelectorAll('.identCor').forEach(element => {
    element.addEventListener('click', () => {
        let soundUrl = null;
        for (let key in demoSoundMapping) {
            if (element.classList.contains(key)) {
                soundUrl = demoSoundMapping[key];
                break;
            }
        }

        if (soundUrl) {
            const audio = new Audio(soundUrl);
            audio.volume = 0.5;
            audio.play();
        }
    });
});

function playSoundsSequentially(urls, index = 0) {
    if (index >= urls.length) return;

    const audio = new Audio(urls[index]);
    audio.volume = 0.5;
    audio.play();
    audio.onended = () => playSoundsSequentially(urls, index + 1);
}

document.querySelectorAll('li').forEach(li => {
    li.addEventListener('click', () => {
        const corElements = li.querySelectorAll('.cor');
        let soundUrls = [];

        corElements.forEach(el => {
            for (let key in demoSoundMapping) {
                if (el.classList.contains(key)) {
                    soundUrls.push(demoSoundMapping[key]);
                    break;
                }
            }
            });

            if (soundUrls.length > 0)
                playSoundsSequentially(soundUrls);
    });
});