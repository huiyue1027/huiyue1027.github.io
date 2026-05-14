/**
 * DESIGN RATIONALE (设计意图):
 * For this assignment, I chose the "Music Video" context. My primary goal was to balance 
 * a clean, usable interface with immersive visual effects that enhance the music's impact.
 * 我选择了“音乐录影带”作为主题。主要目标是在简洁好用的界面与沉浸式视觉效果之间取得平衡。
 * * EXTRA FEATURE (额外功能):
 * I implemented a "Neon Ambient Mode". When activated, the player glows with a dynamic 
 * shadow, mimicking the lighting effects of a live concert or club. This fits the MV 
 * context better than standard tutorials or art videos.
 * 我实现了一个“霓虹氛围模式”。激活后播放器会产生动态阴影，模仿音乐会或夜店的灯光效果，这比普通的教学视频更符合MV的主题。
 * * USABILITY & FEEDBACK (可用性与反馈):
 * I added visual feedback for the progress bar and icon changes for play/mute buttons to 
 * ensure the user always knows the player's status.
 * 我为进度条增加了视觉反馈，并为播放/静音按钮增加了图标切换，确保用户清楚播放器的状态。
 */

// 获取 HTML 元素 / Get elements
const video = document.getElementById("custom-video-player");
const playPauseImg = document.getElementById("play-pause-img");
const muteImg = document.getElementById("mute-img");
const progressBarFill = document.getElementById("progress-bar-fill");
const videoContainer = document.getElementById("video-container");

// 1. 播放与暂停切换 / Toggle Play & Pause
function togglePlayPause() {
  // If the video is paused or ended, play it. Otherwise, pause it.
  // 如果视频暂停或结束，则播放；否则暂停。
  if (video.paused || video.ended) {
    video.play();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/pause--v1.png";
  } else {
    video.pause();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/play--v1.png";
  }
}

// 2. 静音与取消静音 / Toggle Mute
function toggleMute() {
  if (video.muted) {
    video.muted = false;
    muteImg.src = "https://img.icons8.com/ios-glyphs/30/high-volume--v1.png";
  } else {
    video.muted = true;
    muteImg.src = "https://img.icons8.com/ios-glyphs/30/mute--v1.png";
  }
}

// 3. 进度条随视频更新 / Update Progress Bar as video plays
// 'timeupdate' fires whenever the video playback position changes.
video.addEventListener("timeupdate", () => {
  // Calculate percentage: current time / total duration * 100
  const percentage = (video.currentTime / video.duration) * 100;
  progressBarFill.style.width = percentage + "%";
});

// 4. EXTRA FEATURE: Neon Ambient Mode / 额外功能：霓虹氛围模式
function toggleNeonMode() {
  // We toggle a CSS class on the container to change the styling.
  // 通过切换 CSS 类来改变播放器的外观。
  videoContainer.classList.toggle("neon-active");
  
  // Console feedback for debugging
  console.log("Neon Ambient Mode toggled.");
}

// 5. 点击视频画面也可播放/暂停 / Click video to play/pause
video.addEventListener("click", togglePlayPause);