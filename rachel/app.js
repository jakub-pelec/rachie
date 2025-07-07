const steps = [
    { text: "Hello Rachie! 🙋‍♂️", image: "./assets/4.jfif" },
    { text: "Hope this little surprise makes you smile 💜", image: "./assets/3.jfif" },
    { text: "I made this just for you, because you're worth the effort 💻", image: "./assets/5.jfif" },
    { text: "We are far apart...", image: "./assets/22.webp" },
    { text: "But I'm here for you, always 💜", image: "./assets/7.jfif" },
    { text: "Even tho we don't know each other for long, I'm glad to have you here", image: "./assets/6.jfif" },
    { text: "You make my days better just by being yourself 🌷", image: "./assets/8.jfif" },
    { text: "Looking forward to all the memories we'll create ✨", image: "./assets/9.jfif" },
    { text: "Until we meet… keep this page as a little reminder of me 💌", image: "./assets/10.jfif" }

];

let currentStep = 0;

const corners = [
    'sticker-top-left',
    'sticker-top-right',
    'sticker-bottom-left',
    'sticker-bottom-right'
];

function getRandomCorner() {
    return corners[Math.floor(Math.random() * corners.length)];
}

function typeText(element, text, callback) {
    element.innerHTML = '';
    const words = text.split(' ');
    let wordSpans = [];
    words.forEach((word, wIdx) => {
        const span = document.createElement('span');
        span.className = 'type-word';
        span.textContent = '';
        element.appendChild(span);
        wordSpans.push(span);
        if (wIdx < words.length - 1) {
            element.appendChild(document.createTextNode(' '));
        }
    });
    let w = 0, l = 0;
    function type() {
        if (w < words.length) {
            const word = words[w];
            if (l <= word.length) {
                wordSpans[w].textContent = word.slice(0, l);
                l++;
                setTimeout(type, 38);
            } else {
                w++;
                l = 0;
                setTimeout(type, 38);
            }
        } else if (callback) {
            callback();
        }
    }
    type();
}

function showStickerModal(imageSrc) {
    // Remove any existing modal
    const oldModal = document.getElementById('sticker-modal');
    if (oldModal) oldModal.remove();

    const modal = document.createElement('div');
    modal.id = 'sticker-modal';
    modal.innerHTML = `
    <div class='sticker-modal-backdrop'></div>
    <div class='sticker-modal-content'>
      <img src='${imageSrc}' alt='sticker' class='sticker-modal-img' />
      <button class='sticker-modal-close'>&times;</button>
    </div>
  `;
    document.body.appendChild(modal);

    // Close on backdrop or button
    modal.querySelector('.sticker-modal-backdrop').onclick = () => modal.remove();
    modal.querySelector('.sticker-modal-close').onclick = () => modal.remove();
}

function renderStep() {
    const root = document.getElementById('steps-root');
    if (currentStep == 0) {
        root.innerHTML = `<div class='step-box'><div style='margin-bottom: 20px;'>That's all for now! 💖</div><div><img src='./assets/11.jfif' style="width: 100%; height: 100%; object-fit: contain;" />
        <img src='./assets/12.jfif' style="width: 100%; height: 100%; object-fit: contain;" />
        <img src='./assets/13.jfif' style="width: 100%; height: 100%; object-fit: contain;" />
        <img src='./assets/14.jfif' style="width: 100%; height: 100%; object-fit: contain;" />
        <img src='./assets/15.jfif' style="width: 100%; height: 100%; object-fit: contain;" />
        <img src='./assets/16.jfif' style="width: 100%; height: 100%; object-fit: contain;" /></div></div>`;
        return;
    }
    const step = steps[currentStep];
    const cornerClass = getRandomCorner();
    root.innerHTML = `
    <div class='step-box'>
      <img src='${step.image}' alt='sticker' class='sticker ${cornerClass}' />
      <div class='step-text'></div>
      <button class='step-btn' disabled>Next</button>
    </div>
  `;
    const textDiv = document.querySelector('.step-text');
    const nextBtn = document.querySelector('.step-btn');
    typeText(textDiv, step.text, () => {
        nextBtn.disabled = false;
    });
    nextBtn.onclick = () => {
        currentStep++;
        renderStep();
    };
    // Add sticker click handler
    document.querySelector('.sticker').onclick = (e) => {
        e.stopPropagation();
        showStickerModal(step.image);
    };
}

document.addEventListener('DOMContentLoaded', renderStep); 