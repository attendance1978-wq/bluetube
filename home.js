AIzaSyCtfeSzobeGXdSiO50Jj3f7aNEAxz4SvWI
const API_KEY = "AIzaSyCtfeSzobeGXdSiO50Jj3f7aNEAxz4SvWI";

function searchVideos() {
  let q = document.getElementById("search").value;

  fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${q}&key=${API_KEY}&maxResults=20`)
  .then(res => res.json())
  .then(data => {
    document.getElementById("videos").innerHTML = "";

    data.items.forEach(item => {
      let videoId = item.id.videoId;
      let title = item.snippet.title;
      let thumb = item.snippet.thumbnails.medium.url;

      let div = document.createElement("div");
      div.className = "card";

      div.innerHTML = `
        <img src="${thumb}">
        <p>${title}</p>
      `;

      div.onclick = () => {
        window.location.href = `watch.html?video=${videoId}`;
      };

      document.getElementById("videos").appendChild(div);
    });
  });
}

/* LOAD TRENDING */
window.onload = () => {
  fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=PH&key=${API_KEY}&maxResults=20`)
  .then(res => res.json())
  .then(data => {
    data.items.forEach(item => {
      let videoId = item.id;
      let title = item.snippet.title;
      let thumb = item.snippet.thumbnails.medium.url;

      let div = document.createElement("div");
      div.className = "card";

      div.innerHTML = `
        <img src="${thumb}">
        <p>${title}</p>
      `;

      div.onclick = () => {
        window.location.href = `watch.html?video=${videoId}`;
      };

      document.getElementById("videos").appendChild(div);
    });
  });
};
