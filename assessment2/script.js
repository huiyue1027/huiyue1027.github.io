/* Interactive Media Assignment 2 Final Code
 
 Design Rationale
 I decided to stick with the original minimalist layout and the white and grey theme because I wanted the website to stay clean and easy to navigate. I actually had to swap out my local mp4 file for a web link because GitHub kept blocking my push requests due to the file being way over their size limit. Using a web link fixed the upload error and makes the video load much smoother anyway.
 
 For my extra interactive features I wanted to mimic a professional platform like YouTube. I built a custom control bar where the volume slider is completely hidden until you hover over the speaker icon. This saves a lot of screen space. I also built a custom progress bar. Instead of just clicking I added mouse event listeners so you can hold down the click and drag the bar left or right to skip through the video accurately.
*/

const video = document.getElementById("main-video");
const playImg = document.getElementById("play-img");
const progressFill = document.getElementById("progress-fill");
const scrubContainer = document.getElementById("scrub-container");
const volSlider = document.getElementById("vol-slider");
const muteImg = document.getElementById("mute-img");

// Making the play and pause button work by checking if the video is playing and swapping the icons accordingly
function togglePlay() {
    if (video.paused) {
        video.play();
        playImg.src = "https://img.icons8.com/ios-glyphs/30/ffffff/pause--v1.png";
    } else {
        video.pause();
        playImg.src = "https://img.icons8.com/ios-glyphs/30/ffffff/play--v1.png";
    }
}

//  also added a listener here so  just click the video screen itself to pause or play
video.addEventListener("click", togglePlay);

// This updates the red progress bar as the video plays by calculating the percentage of the current time against the total video length
video.addEventListener("timeupdate", () => {
    const percentage = video.currentTime / video.duration * 100;
    progressFill.style.width = percentage + "%";
});

// This part was a bit tricky. I had to track when the mouse is pressed down and moved to make the drag to scrub feature work.
let isDragging = false;
scrubContainer.addEventListener("mousedown", e => { isDragging = true; updateScrub(e); });
window.addEventListener("mouseup", () => { isDragging = false; });
scrubContainer.addEventListener("mousemove", e => { if (isDragging) updateScrub(e); });
scrubContainer.addEventListener("click", updateScrub);

// This calculates exactly where the user clicked on the bar and jumps the video to that exact timestamp
function updateScrub(e) {
    const rect = scrubContainer.getBoundingClientRect();
    const pos = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const scrubTime = pos / rect.width * video.duration;
    video.currentTime = scrubTime;
}

// Linking the volume slider to the actual video volume
volSlider.addEventListener("input", e => {
    video.volume = e.target.value;
    updateMuteIcon();
});

// This handles the mute button and swaps the icon to a muted speaker
function toggleMute() {
    video.muted = !video.muted;
    updateMuteIcon();
}

// Added a quick check here to make sure the icon also turns into a muted speaker if the user drags the slider all the way to zero
function updateMuteIcon() {
    if (video.muted || video.volume == 0) {
        muteImg.src = "https://img.icons8.com/ios-glyphs/30/ffffff/mute--v1.png";
    } else {
        muteImg.src = "https://img.icons8.com/ios-glyphs/30/ffffff/high-volume--v1.png";
    }
}

// Asking the browser to make the entire player container go full screen when the button is clicked
function toggleFull() {
    const box = document.getElementById("player-box");
    if (!document.fullscreenElement) {
        box.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

// Just a simple toggle to add or remove the hidden class so the quality settings menu pops up
function toggleSettings() {
    document.getElementById("quality-menu").classList.toggle("hidden");
}

// Showing an alert so the user knows the quality button works then hiding the menu again
function changeQ(quality) {
    alert("Quality switched to " + quality);
    toggleSettings();
}