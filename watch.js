AIzaSyCtfeSzobeGXdSiO50Jj3f7aNEAxz4SvWI
const API_KEY = "AIzaSyCtfeSzobeGXdSiO50Jj3f7aNEAxz4SvWI";

function getVideoId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("video");
}

/* LOAD VIDEO */
function loadVideo() {
  let id = getVideoId();

  document.getElementById("videoPlayer").src =
    `https://www.youtube.com/embed/${id}`;

  loadRelated();
}

/* RELATED VIDEOS */
function loadRelated() {
  fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&relatedToVideoId=${getVideoId()}&key=${API_KEY}&maxResults=10`)
  .then(res => res.json())
  .then(data => {
    data.items.forEach(item => {
      let id = item.id.videoId;
      let title = item.snippet.title;

      let div = document.createElement("div");
      div.className = "related";

      div.innerHTML = `<p>${title}</p>`;

      div.onclick = () => {
        window.location.href = `watch.html?video=${id}`;
      };

      document.getElementById("related").appendChild(div);
    });
  });
}

/* HOME BUTTON */
function goHome() {
  window.location.href = "home.html";
}

loadVideo();
