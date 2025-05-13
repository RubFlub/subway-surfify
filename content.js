if (!document.getElementById('floating-video-container')) {
  const videoContainer = document.createElement('div');
  videoContainer.id = 'floating-video-container';

  const video = document.createElement('video');
  video.src = browser.runtime.getURL("assets/gameplay.mp4");
  video.controls = false;
  video.muted = true;
  video.autoplay = true;
  video.loop = true;

  videoContainer.appendChild(video);
  document.body.appendChild(videoContainer);

  video.play().catch(err => {
    console.warn("Autoplay failed:", err);
  });
}

function makeDraggable(element) {
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  element.style.cursor = 'move';
  element.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - element.getBoundingClientRect().left;
    offsetY = e.clientY - element.getBoundingClientRect().top;
    document.body.style.userSelect = 'none';
  });

  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      element.style.left = `${e.clientX - offsetX}px`;
      element.style.top = `${e.clientY - offsetY}px`;
    }
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
    document.body.style.userSelect = 'auto';
  });
}

makeDraggable(document.getElementById('floating-video-container'));
