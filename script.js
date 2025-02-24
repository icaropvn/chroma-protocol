const abrirDialog = document.querySelector('#comoFunciona')
const dialog = document.querySelector('#dialogLegenda')
const fecharDialog = document.querySelector('#fecharDialog')

abrirDialog.addEventListener('click', () => {
    dialog.showModal()
})

fecharDialog.addEventListener('click', () => {
    dialog.close()
})

const colorSoundMapping = {
    'blue': 'sons/blue.wav',
    'red': 'sons/red.wav',
    'orange': 'sons/orange.wav',
    'yellow': 'sons/yellow.wav',
    'violet': 'sons/violet.wav',
    'green': 'sons/green.wav',
    'gray': 'sons/gray.wav'
};

const mapping = {
    'A': ['blue', 'blue'],
    'B': ['red', 'red'],
    'C': ['red', 'orange'],
    'D': ['red', 'yellow'],
    'E': ['blue', 'violet'],
    'F': ['red', 'green'],
    'G': ['red', 'blue'],
    'H': ['red', 'violet'],
    'I': ['blue', 'red'],
    'J': ['orange', 'red'],
    'K': ['orange', 'orange'],
    'L': ['orange', 'yellow'],
    'M': ['orange', 'green'],
    'N': ['orange', 'blue'],
    'O': ['blue', 'orange'],
    'P': ['orange', 'violet'],
    'Q': ['yellow', 'red'],
    'R': ['yellow', 'orange'],
    'S': ['yellow', 'yellow'],
    'T': ['yellow', 'green'],
    'U': ['blue', 'yellow'],
    'V': ['yellow', 'blue'],
    'W': ['yellow', 'violet'],
    'X': ['green', 'red'],
    'Y': ['green', 'orange'],
    'Z': ['green', 'yellow'],
    '?': ['gray'],
    '0': ['blue', 'green'],
    '1': ['violet', 'red'],
    '2': ['violet', 'orange'],
    '3': ['violet', 'yellow'],
    '4': ['violet', 'green'],
    '5': ['violet', 'blue'],
    '6': ['violet', 'violet'],
    '7': ['green', 'green'],
    '8': ['green', 'blue'],
    '9': ['green', 'violet']
};

function traduzirFrase(frase) {
    let cores = [];
    frase = String(frase).toUpperCase();

    for (let i = 0; i < frase.length; i++) {
        let char = frase[i];
        
        if (char === ' ') {
            cores.push('white', 'white');
            continue;
        } else if (char === '.') {
            cores.push('white', 'white', 'white');
            continue;
        } else if (char === '?') {
            cores.push('gray');
            cores.push('white', 'white', 'white');
            continue;
        } else if (mapping[char]) {
            let par = mapping[char];
            cores.push(par[0], par[1]);

            if (i < frase.length - 1) {
                let next = frase[i + 1];

                if (next === ' ')
                    cores.push('white', 'white');
                else
                    cores.push('white');
            }
        }
    }
    return cores;
}

function playSoundForColor(color) {
    if (colorSoundMapping[color]) {
        const audio = new Audio(colorSoundMapping[color]);
        audio.volume = 0.5;
        audio.play();
    }
}

function transmitirCores(cores, index = 0) {
    const output = document.querySelector('#canvaOutput');

    const selectedSpeed = document.querySelector('input[name="velocidade"]:checked');
    const multiplier = selectedSpeed ? parseFloat(selectedSpeed.value) : 1;
    const baseInterval = 1000;

    const delay = baseInterval / multiplier;

    if (index < cores.length) {
        window.timeoutID = setTimeout(() => transmitirCores(cores, index + 1), delay);
        output.style.backgroundColor = `var(--${cores[index]})`;
        playSoundForColor(cores[index]);
    } else {
        clearTimeout(window.timeoutID);
        output.style.backgroundColor = "#222222";
    }
}

document.querySelector('#botaoTraduzir').addEventListener('click', () => {
    const frase = document.querySelector('#inputTraducao').value;
    const cores = traduzirFrase(frase);
    transmitirCores(cores);
});