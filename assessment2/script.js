/**
 * OART1013 - Assignment 2 Final Implementation
 * --------------------------------------------------------------------------
 * DESIGN RATIONALE (设计意图):
 * To solve the file size issue during Git upload, I reverted the media source to an 
 * external URL. I maintained the original minimalist layout and navigation tabs 
 * to preserve the website's core identity while enhancing its interactivity.
 * 为了解决 Git 上传时文件过大的问题，我将媒体源改回了外部 URL。我保留了原始的
 * 极简布局和导航标签，在维持网站核心视觉特征的同时增强了交互性。
 *
 * EXTRA FEATURES (额外功能):
 * 1. YT-STYLE VOLUME: The volume slider is hidden and slides out on hover, saving 
 * space and mimicking modern professional players.
 * 2. DRAG-TO-SCRUB: I implemented a mouse-event based scrubbing logic that allows 
 * users to click or drag across the progress bar to navigate the video.
 * 3. FULLSCREEN & SETTINGS: Added Fullscreen API support and a quality mock menu.
 * 1. YouTube式音量条：音量条默认隐藏，悬停时滑出，既节省空间又模仿了专业播放器。
 * 2. 进度拖拽：我实现了基于鼠标事件的跳转逻辑，允许用户点击或拖动进度条。
 * --------------------------------------------------------------------------
 */

const video = document.getElementById("main-video");
const fill = document.getElementById("progress-fill");
const scrubContainer = document.getElementById("scrub-container");
const volSlider = document.getElementById("volume-slider");

// 1. 播放/暂停控制
function togglePlay() {
    const icon = document.getElementById("play-icon");
    if (video.paused) {
        video.play();
        icon.src = "https://img.icons8.com/ios-glyphs/30/ffffff/pause--v1.png";
    } else {
        video.pause();
        icon.src = "https://img.icons8.com/ios-glyphs/30/ffffff/play--v1.png";
    }
}

// 2. 进度条自动跟随视频播放
video.addEventListener("timeupdate", () => {
    const percent = (video.currentTime / video.duration) * 100;
    fill.style.width = percent + "%";
});

// 3. 核心功能：点击并拖拽跳转进度 (Scrubbing)
let isDragging = false;
scrubContainer.addEventListener("mousedown", (e) => { isDragging = true; updateProgress(e); });
window.addEventListener("mouseup", () => { isDragging = false; });
scrubContainer.addEventListener("mousemove", (e) => { if (isDragging) updateProgress(e); });
scrubContainer.addEventListener("click", updateProgress); // 支持直接点击跳转

function updateProgress(e) {
    const rect = scrubContainer.getBoundingClientRect();
    const offsetX = e.clientX - rect.left; // 计算相对于容器的X坐标
    const scrubTime = (offsetX / scrubContainer.offsetWidth) * video.duration;
    video.currentTime = Math.min(Math.max(0, scrubTime), video.duration);
}

// 4. 音量调节逻辑
volSlider.addEventListener("input", (e) => {
    video.volume = e.target.value;
});

function toggleMute() {
    video.muted = !video.muted;
    document.getElementById("mute-icon").src = video.muted ? 
        "https://img.icons8.com/ios-glyphs/30/ffffff/mute--v1.png" : 
        "https://img.icons8.com/ios-glyphs/30/ffffff/high-volume--v1.png";
}

// 5. 全屏切换 (Fullscreen API)
function toggleFull() {
    const playerBox = document.getElementById("player-outer-box");
    if (!document.fullscreenElement) {
        playerBox.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

// 6. 分辨率菜单显示/隐藏
function toggleSettings() {
    document.getElementById("settings-panel").classList.toggle("hidden");
}

function setQuality(q) {
    alert("System: Switching to " + q + " quality...");
    toggleSettings();
}