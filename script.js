let label = "waiting...";
let classifier;
let modelURL = 'https://teachablemachine.withgoogle.com/models/OF6i_qHBx/';

// Load the model
function preload() {
    classifier = ml5.soundClassifier(modelURL + 'model.json');
}

// Attach the event listener to the Start button
document.getElementById("start-button").addEventListener("click", startMachine);

// Function to start the machine
function startMachine() {
    // Remove the default canvas if it exists
    const defaultCanvas = document.getElementById('defaultCanvas0');
    if (defaultCanvas) {
        defaultCanvas.remove();
    }

    // Remove any other existing canvas inside the label-container
    const existingCanvas = document.querySelector('#label-container canvas');
    if (existingCanvas) {
        existingCanvas.remove();
    }

    // Create a new canvas and attach it to the container
    let canvas = createCanvas(640, 520);
    canvas.parent('label-container');

    // Start audio classification
    classifyAudio();
}

function classifyAudio() {
    classifier.classify(gotResults);
}

function draw() {
    // Only draw if a canvas is created
    if (!select('canvas')) return;

    background(0);

    // Display label as emoji
    let emoji = "🎧"; // Default emoji
    if (label === "Class 5") {
        emoji = "👏1️⃣";
    } else if (label === "Class 6") {
        emoji = "👏+∞";
    } else if (label === "Class 7") {
        emoji = "👏👏";
    } else if (label === "Class 8") {
        emoji = "👏👏👏";
    }

    textSize(256);
    textAlign(CENTER, CENTER);
    fill(255);
    text(emoji, width / 2, height / 2);
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
        return;
    }
    label = results[0].label;
}
