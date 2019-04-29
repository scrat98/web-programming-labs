window.onload = () => {
    const container = document.createElement("div");
    container.style.cssText = `
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;`;

    const canvas = document.createElement("canvas");
    canvas.innerText = "Canvas requires a browser that supports HTML5.";

    const nextQuoteBtn = document.createElement("button");
    nextQuoteBtn.style.cssText = `
        margin: 0.5rem;
    `;
    nextQuoteBtn.innerText = "Generate new poster";

    const newPosterFunctionWithContext = generateNewPoster.bind(null, canvas, nextQuoteBtn);
    nextQuoteBtn.onclick = () => newPosterFunctionWithContext();

    container.append(canvas, nextQuoteBtn);
    document.body.append(container);
    newPosterFunctionWithContext();
};

async function generateNewPoster(canvas, nextQuoteBtn) {
    try {
        console.log("Generating new poster");
        nextQuoteBtn.disabled = true;
        const img = await getRandomImage();
        const quote = await getRandomQuote();
        drawImageOnCanvas(canvas, img);
        drawQuoteOnCanvas(canvas, quote);
        nextQuoteBtn.disabled = false;
    } catch (e) {
        console.error(e);
        generateNewPoster(canvas, nextQuoteBtn);
    }
}

async function getRandomImage() {
    console.log("Getting random picture");
    return new Promise(resolve => {
        const randomWidth = getRandomInt(300, 800);
        const randomHeight = getRandomInt(200, 900);
        const pictureEndpoint = `https://source.unsplash.com/random/${randomWidth}x${randomHeight}`;
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = pictureEndpoint;
    });
}

async function getRandomQuote() {
    console.log("Getting random quote");
    const quoteEndpoint = 'https://api.whatdoestrumpthink.com/api/v1/quotes/random';
    return fetch(quoteEndpoint)
        .then(res => res.json())
        .then(json => json.message.toUpperCase());
}

function drawImageOnCanvas(canvas, img) {
    const ctx = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
}

function drawQuoteOnCanvas(canvas, quote) {
    const ctx = canvas.getContext('2d');
    const fontSize = 40;
    const lineWidth = 5;
    const maxWidth = canvas.width * 0.85;

    ctx.lineWidth = lineWidth;
    ctx.font = fontSize + 'px sans-serif';
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const lines = [];
    let currentLine = '';
    const words = quote.split(' ');

    words.forEach(word => {
        const testLine = currentLine + ' ' + word;
        const testWidth = ctx.measureText(testLine).width;

        if (testWidth > maxWidth) {
            lines.push(currentLine);
            currentLine = word + ' ';
        } else {
            currentLine = testLine;
        }
    });
    lines.push(currentLine);

    const lineHeight = fontSize + lineWidth;
    const lineStart = (canvas.height - lines.length * lineHeight) / 2;
    lines.forEach((line, ind) => {
        ctx.strokeText(line, canvas.width / 2, lineStart + ind * lineHeight);
        ctx.fillText(line, canvas.width / 2, lineStart + ind * lineHeight);
    });
}

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}