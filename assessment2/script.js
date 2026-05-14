/**
 * OART1013 - Assignment 2 Final Code
 * * DESIGN RATIONALE (设计意图):
 * I chose to maintain the original minimalist layout (white/grey theme with clear 
 * navigation tabs) to ensure high usability. I replaced the local video with an 
 * external URL to ensure smooth web delivery and prevent Git file limits.
 * 我保留了原始的极简布局（白灰主题和清晰导航），以确保高可用性。我将本地视频
 * 替换为外部URL，确保网页加载流畅并防止Git文件大小限制错误。
 * * EXTRA FEATURES (额外交互功能):
 * 1. YouTube-Style UI: The control bar appears on hover. The volume slider is 
 * hidden by default and expands smoothly when hovering over the speaker icon.
 * 2. Drag-to-Scrub: I implemented custom mouse event listeners on the progress 
 * bar, allowing users to accurately seek through the video by dragging.
 * 1. YouTube风格UI：控制栏悬停显示。音量滑块默认隐藏，悬停时平滑展开。
 * 2. 进度条拖拽：我在进度条上实现了自定义鼠标事件，允许用户拖动精准跳转。
 */

const video = document.getElementById("main-video");
const playImg = document.getElementById("play-img");
const progressFill = document.getElementById("progress-fill");
const scrubContainer = document.getElementById("scrub-container");
const volSlider = document.getElementById("vol-slider");
const muteImg = document.getElementById("mute-img");

// 1. 播放与暂停
function togglePlay() {
    if (video.paused) {
        video.play();
        playImg.src = "https://img.icons8.com/ios-glyphs/30/ffffff/pause--v1.png";
    } else {
        video.pause();
        playImg.src = "https://img.icons8.com/ios-glyphs/30/ffffff/play--v1.png";
    }
}

// 视频画面点击也可播放/暂停
video.addEventListener("click", togglePlay);

// 2. 进度条更新
video.addEventListener("timeupdate", () => {
    const percentage = (video.currentTime / video.duration) * 100;
    progressFill.style.width = percentage + "%";
});

// 3. 进度条拖拽跳转 (Scrubbing)
let isDragging = false;
scrubContainer.addEventListener("mousedown", (e) => { isDragging = true; updateScrub(e); });
window.addEventListener("mouseup", () => { isDragging = false; });
scrubContainer.addEventListener("mousemove", (e) => { if (isDragging) updateScrub(e); });
scrubContainer.addEventListener("click", updateScrub);

function updateScrub(e) {
    const rect = scrubContainer.getBoundingClientRect();
    const pos = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const scrubTime = (pos / rect.width) * video.duration;
    video.currentTime = scrubTime;
}

// 4. 音量调节
volSlider.addEventListener("input", (e) => {
    video.volume = e.target.value;
    updateMuteIcon();
});

function toggleMute() {
    video.muted = !video.muted;
    updateMuteIcon();
}

function updateMuteIcon() {
    if (video.muted || video.volume == 0) {
        muteImg.src = "https://img.icons8.com/ios-glyphs/30/ffffff/mute--v1.png";
    } else {
        muteImg.src = "https://img.icons8.com/ios-glyphs/30/ffffff/high-volume--v1.png";
    }
}

// 5. 全屏控制
function toggleFull() {
    const box = document.getElementById("player-box");
    if (!document.fullscreenElement) {
        box.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

// 6. 设置菜单弹窗
function toggleSettings() {
    document.getElementById("quality-menu").classList.toggle("hidden");
}

function changeQ(quality) {
    alert("Quality switched to: " + quality);
    toggleSettings();
}