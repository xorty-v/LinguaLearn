const words = [
    ['lamp', 'лампа'],
    ['table', 'стол'],
    ['chair', 'стул']
];

let counter = 0;
let correct = 0;

showWords();
createWord();

function createWord() {
    const wrap = document.querySelector('div');

    wrap.innerHTML = `
            <i>${counter + 1}/${words.length}</i>
            <img src="./img/${words[counter][0]}.svg" alt="word">
            <b>${words[counter][1]}</b>`;

    wrap.className = '';
}

function checkWord(word) {
    const wrap = document.querySelector('div');

    if (word === words[counter][0]) {
        wrap.classList.add('correct');
        correct++;
    } else {
        wrap.classList.add('incorrect');
    }
}

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();

    const input = document.querySelector('input');
    const btn = document.querySelector('button');

    if (counter === words.length) {
        alert(`Кол-во правильных ответов: ${correct}`);
        counter = 0;
        correct = 0;
        return;
    }

    if (btn.classList.contains('check-btn')) {
        checkWord(input.value.toLowerCase().trim());
        btn.textContent = 'Далее';
        btn.classList.remove('check-btn');
        counter++;
    } else {
        btn.textContent = 'Проверить';
        btn.classList.add('check-btn');
        input.value = '';
        createWord();
    }
})


// Swiper

showWords();

function showWords() {
    for (let word of words) {
        document.querySelector('.swiper-wrapper').innerHTML += `
                <div class="swiper-slide">
                    <img src="img/${word[0]}.svg">
                    <b>${word[0]}</b>
                    <i>${word[1]}</i>
                </div>`;
    }
}

document.querySelector('.speech-btn').addEventListener('click', () => {
    const word = document.querySelector('.swiper-slide-active b').textContent;

    // let count = 0
    // const voices = window.speechSynthesis.getVoices();
    // voices.forEach(function (voice) {
    //     console.log(count);
    //     console.log(voice.lang);D
    //     console.log(voice.name);
    //     count++
    // });

    // 118 usa
    // 120 usa

    const speech = new SpeechSynthesisUtterance(word);
    const voices = window.speechSynthesis.getVoices();

    speech.voice = voices[120];
    speech.lang = 'en-US';
    window.speechSynthesis.speak(speech);
});

const swiper = new Swiper('.swiper', {
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});