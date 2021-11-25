// xử lý nhạc
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const songName = $(".singer h3");
const singerName = $(".singer p");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const cd = $(".player-avatar");
const playBtn = $(".play");
const progress = $("#progress");
const progress1 = $("#progress1");
const timeSongs = $(".finish-music");
const nextBtn = $(".skip-next");
const preBtn = $(".skip-pre");
const randomBtn = $(".shuffle");
const repeatBtn = $(".repeat");
const app = {
  currentIndex: 0,
  isplaying: false,
  songs: [
    {
      name: "Có lẽ anh chưa từng",
      singer: "Karik, OnlyC",
      path: "./songs/CoLeAnhChuaTung-OnlyCKarik-6996622.mp3",
      image: "./image/clact.jpg",
      time: "04:55",
    },
    {
      name: "Giấc mơ chỉ là giấc mơ",
      singer: "Bùi Anh Tuấn",
      path: "./songs/GiacMoChiLaGiacMoLive-BuiAnhTuan-5189520_hq.mp3",
      image: "./image/gmclgm.jpg",
      time: "05:16",
    },
    {
      name: "Gía như cô ấy chưa từng xuất hiện",
      singer: "Trung Quân idol",
      path: "./songs/GiaNhuCoAyChuaTungXuatHien-TrungQuanIdol-6288164.mp3",
      image: "./image/gncactxh.jpg",
      time: "05:00",
    },
    {
      name: "Huyền Thoại",
      singer: "Phan Mạnh Quỳnh",
      path: "./songs/HuyenThoai-PhanManhQuynh-5841320.mp3",
      image: "./image/ht.jpg",
      time: "04:29",
    },
    {
      name: "Ngày chưa giông bão",
      singer: "Bùi Lan Hương",
      path: "./songs/NgayChuaGiongBaoNguoiBatTuOst-BuiLanHuong-5708274.mp3",
      image: "./image/ncgb.jpg",
      time: "03:40",
    },
    {
      name: "Nước cờ em chọn",
      singer: "Ưng Hoàng Phúc",
      path: "./songs/NuocCoEmChonOngTrumBuiVienOst-UngHoangPhuc-6301404.mp3",
      image: "./image/ncec.jpg",
      time: "03:50",
    },
    {
      name: "Sợ rằng em biết anh còn yêu em",
      singer: "Junn",
      path: "./songs/SoRangEmBietAnhConYeuEm-JuunDangDung-6217224.mp3",
      image: "./image/srebacye.jpg",
      time: "04:40",
    },
    {
      name: "Attention",
      singer: "Charlie Puth",
      path: "./songs/Attention - Charlie Puth.mp3",
      image: "./image/attention.jpg",
      time: "03:32",
    },
    {
      name: "Tháng mấy em nhớ anh",
      singer: "Hà Anh Tuấn",
      path: "./songs/ThangMayEmNhoAnh-HaAnhTuan-6995531.mp3",
      image: "./image/tmena.jpg",
      time: "05:10",
    },
    {
      name: "Xuân Thì",
      singer: "Hà Anh Tuấn",
      path: "./songs/XuanThi-HaAnhTuan-6803648 (1).mp3",
      image: "./image/xt.jpg",
      time: "05:46",
    },
  ],
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  render: function () {
    const htmls = this.songs.map(function (song, index) {
      return `
        <li class="song-menu-item">
          <div class="song-link">
            <div class="song-avatar">
              <img
                src="${song.image}"
                alt=""
              />
              <div class="avatar-animetion">
                <span class="material-icons-outlined">
                  play_circle_filled
                </span>
              </div>
              <div class="avatar-animetion1">
                <img src="./image/icon-playing.gif" alt="" />
              </div>
            </div>
          </div>
          <div class="song-info">
            <h3>${song.name}</h3>
            <p>${song.singer}</p>
          </div>
          <div class="song-time">${song.time}</div>
          <div class="song-more">
            <div class="heart">
              <span class="material-icons-outlined">
              favorite_border
              </span>
            </div>
            <div class="three-dom">
              <span class="material-icons-outlined">
              more_horiz
              </span>
            </div>
          </div>
        </li>
      `;
    });
    $(".song-menu").innerHTML = htmls.join("");
  },
  handleEvents: function () {
    //xử lý cd quay và dừng
    const cdThumanimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000,
      iterations: Infinity,
    });
    cdThumanimate.pause();
    //xử lí sự kiện ấn nút play nhạc
    playBtn.onclick = () => {
      if (this.isplaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };
    //khi điều chỉnh nút volume
    progress1.value = 100;
    progress1.oninput = () => {
      audio.volume = progress1.value / 100;
    };
    //khi bài hát dc play
    audio.onplay = () => {
      this.isplaying = true;
      playBtn.classList.add("active");
      cdThumanimate.play();
      console.log(this.currentIndex);
    };
    //khi song bị pause
    audio.onpause = () => {
      this.isplaying = false;
      playBtn.classList.remove("active");
      cdThumanimate.pause();
    };
    //khi song được next
    nextBtn.onclick = () => {
      if (randomBtn.classList.contains("remote-click")) {
        this.randomSong();
      } else {
        this.nextSong();
      }
      audio.play();
    };
    //khi song được pre
    preBtn.onclick = () => {
      if (randomBtn.classList.contains("remote-click")) {
        this.randomSong();
      } else {
        this.preSong();
      }
      audio.play();
    };
    //xử lý repeat
    repeatBtn.onclick = () => {
      if (repeatBtn.classList.contains("remote-click")) {
        repeatBtn.classList.remove("remote-click");
      } else {
        repeatBtn.classList.add("remote-click");
      }
      this.repeatSong();
    };
    //xử lý random
    randomBtn.onclick = () => {
      if (randomBtn.classList.contains("remote-click")) {
        randomBtn.classList.remove("remote-click");
      } else {
        randomBtn.classList.add("remote-click");
      }
    };
    //xử lý khi hết bài
    audio.onended = () => {
      if (repeatBtn.classList.contains("remote-click")) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };
    //khi bài hát play, nút audio di chuyển theo
    audio.ontimeupdate = () => {
      if (audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;
      }
    };
    progress.onchange = (e) => {
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
    };
  },
  loadCurrentSong: function () {
    timeSongs.textContent = this.currentSong.time;
    songName.textContent = this.currentSong.name;
    singerName.textContent = this.currentSong.singer;
    cdThumb.style.backgroundImage = `url("${this.currentSong.image}")`;
    audio.src = this.currentSong.path;
  },
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  preSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  randomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex);
    {
      this.currentIndex = newIndex;
      this.loadCurrentSong();
    }
  },
  start: function () {
    //định nghĩa thuộc tính
    this.defineProperties();
    //xử lý events
    this.handleEvents();
    // tải thông tin bài hát đầu tiên vào giao diện
    this.loadCurrentSong();
    //render playlist
    this.render();
  },
};
app.start();
// xử lý các sự kiện click hover animation
const liList = $$(".menu-item");
const tabsList = $$(".tabs-link");
const songItemList = $$(".song-menu-item");
const songAvatarList = $$(".song-link");
const songItemList1 = $$(".song-menu-item1");
const songAnimation = $$(".avatar-animetion");
const songAnimation1 = $$(".avatar-animetion1");
const contentList = $$(".content-item");
const heart = $$(".heart");
const play = $("#play");
const pause = $("#pause");
for (let i = 0; i < songAvatarList.length; i++) {
  //xử lý khi click vào avatar song
  songAvatarList[i].addEventListener("click", function () {
    const songLink = event.currentTarget;
    const songItem = songLink.parentElement;
    if (songItem.classList.contains("playing")) {
      songItem.classList.remove("playing");
      // songAnimation[i].style.display = "block";

      audio.pause();
    } else {
      songItem.classList.add("playing");
      // songAnimation[i].style.display = "none";
      app.currentIndex = i;
      app.loadCurrentSong();
      audio.play();
    }
  });
}
for (let i = 0; i < liList.length; i++) {
  liList[i].addEventListener("click", function () {
    // remove active class in any li element
    liList.forEach((item) => item.classList.remove("active"));
    liList[i].classList.add("active");
  });
}
for (let i = 0; i < tabsList.length; i++) {
  tabsList[i].addEventListener("click", function () {
    // remove active class in any li element
    tabsList.forEach((item) => item.classList.remove("active"));
    tabsList[i].classList.add("active");
  });
}
function openTabs(content) {
  for (let i = 0; i < contentList.length; i++) {
    contentList[i].style.display = "none";
  }
  document.getElementById(content).style.display = "block";
}
const scrollBody = document.querySelector(".mp3-header");
window.addEventListener("scroll", function () {
  if (window.scrollY != 0) {
    scrollBody.classList.add("bgr-header");
  } else {
    scrollBody.classList.remove("bgr-header");
  }
});
play.addEventListener("click", () => {
  for (let i = 0; i < songItemList.length; i++) {
    if (app.currentIndex === 0) {
      songItemList[0].classList.add("playing");
    } else if (app.currentIndex === 1) {
      songItemList[1].classList.add("playing");
    } else if (app.currentIndex === 2) {
      songItemList[2].classList.add("playing");
    } else if (app.currentIndex === 3) {
      songItemList[3].classList.add("playing");
    } else if (app.currentIndex === 4) {
      songItemList[4].classList.add("playing");
    } else if (app.currentIndex === 5) {
      songItemList[5].classList.add("playing");
    } else if (app.currentIndex === 6) {
      songItemList[6].classList.add("playing");
    } else if (app.currentIndex === 7) {
      songItemList[7].classList.add("playing");
    } else if (app.currentIndex === 8) {
      songItemList[8].classList.add("playing");
    } else if (app.currentIndex === 9) {
      songItemList[9].classList.add("playing");
    }
  }
});
pause.addEventListener("click", () => {
  for (let i = 0; i < songItemList.length; i++) {
    if (app.currentIndex === 0) {
      songItemList[0].classList.remove("playing");
    } else if (app.currentIndex === 1) {
      songItemList[1].classList.remove("playing");
    } else if (app.currentIndex === 2) {
      songItemList[2].classList.remove("playing");
    } else if (app.currentIndex === 3) {
      songItemList[3].classList.remove("playing");
    } else if (app.currentIndex === 4) {
      songItemList[4].classList.remove("playing");
    } else if (app.currentIndex === 5) {
      songItemList[5].classList.remove("playing");
    } else if (app.currentIndex === 6) {
      songItemList[6].classList.remove("playing");
    } else if (app.currentIndex === 7) {
      songItemList[7].classList.remove("playing");
    } else if (app.currentIndex === 8) {
      songItemList[8].classList.remove("playing");
    } else if (app.currentIndex === 9) {
      songItemList[9].classList.remove("playing");
    }
  }
});
nextBtn.addEventListener("click", () => {
  for (let i = 0; i < songItemList.length; i++) {
    if (app.currentIndex === 0) {
      songItemList[0].classList.add("playing");
      songItemList[1].classList.remove("playing");
      songItemList[2].classList.remove("playing");
      songItemList[3].classList.remove("playing");
      songItemList[4].classList.remove("playing");
      songItemList[5].classList.remove("playing");
      songItemList[6].classList.remove("playing");
      songItemList[7].classList.remove("playing");
      songItemList[8].classList.remove("playing");
      songItemList[9].classList.remove("playing");
    } else if (app.currentIndex === 1) {
      songItemList[1].classList.add("playing");
      songItemList[0].classList.remove("playing");
      songItemList[2].classList.remove("playing");
      songItemList[3].classList.remove("playing");
      songItemList[4].classList.remove("playing");
      songItemList[5].classList.remove("playing");
      songItemList[6].classList.remove("playing");
      songItemList[7].classList.remove("playing");
      songItemList[8].classList.remove("playing");
      songItemList[9].classList.remove("playing");
    } else if (app.currentIndex === 2) {
      songItemList[2].classList.add("playing");
      songItemList[0].classList.remove("playing");
      songItemList[1].classList.remove("playing");
      songItemList[3].classList.remove("playing");
      songItemList[4].classList.remove("playing");
      songItemList[5].classList.remove("playing");
      songItemList[6].classList.remove("playing");
      songItemList[7].classList.remove("playing");
      songItemList[8].classList.remove("playing");
      songItemList[9].classList.remove("playing");
    } else if (app.currentIndex === 3) {
      songItemList[3].classList.add("playing");
      songItemList[0].classList.remove("playing");
      songItemList[1].classList.remove("playing");
      songItemList[2].classList.remove("playing");
      songItemList[4].classList.remove("playing");
      songItemList[5].classList.remove("playing");
      songItemList[6].classList.remove("playing");
      songItemList[7].classList.remove("playing");
      songItemList[8].classList.remove("playing");
      songItemList[9].classList.remove("playing");
    } else if (app.currentIndex === 4) {
      songItemList[4].classList.add("playing");
      songItemList[0].classList.remove("playing");
      songItemList[1].classList.remove("playing");
      songItemList[2].classList.remove("playing");
      songItemList[3].classList.remove("playing");
      songItemList[5].classList.remove("playing");
      songItemList[6].classList.remove("playing");
      songItemList[7].classList.remove("playing");
      songItemList[8].classList.remove("playing");
      songItemList[9].classList.remove("playing");
    } else if (app.currentIndex === 5) {
      songItemList[5].classList.add("playing");
      songItemList[0].classList.remove("playing");
      songItemList[1].classList.remove("playing");
      songItemList[2].classList.remove("playing");
      songItemList[3].classList.remove("playing");
      songItemList[4].classList.remove("playing");
      songItemList[6].classList.remove("playing");
      songItemList[7].classList.remove("playing");
      songItemList[8].classList.remove("playing");
      songItemList[9].classList.remove("playing");
    } else if (app.currentIndex === 6) {
      songItemList[6].classList.add("playing");
      songItemList[0].classList.remove("playing");
      songItemList[1].classList.remove("playing");
      songItemList[2].classList.remove("playing");
      songItemList[3].classList.remove("playing");
      songItemList[4].classList.remove("playing");
      songItemList[5].classList.remove("playing");
      songItemList[7].classList.remove("playing");
      songItemList[8].classList.remove("playing");
      songItemList[9].classList.remove("playing");
    } else if (app.currentIndex === 7) {
      songItemList[7].classList.add("playing");
      songItemList[0].classList.remove("playing");
      songItemList[1].classList.remove("playing");
      songItemList[2].classList.remove("playing");
      songItemList[3].classList.remove("playing");
      songItemList[5].classList.remove("playing");
      songItemList[6].classList.remove("playing");
      songItemList[4].classList.remove("playing");
      songItemList[8].classList.remove("playing");
      songItemList[9].classList.remove("playing");
    } else if (app.currentIndex === 8) {
      songItemList[8].classList.add("playing");
      songItemList[0].classList.remove("playing");
      songItemList[1].classList.remove("playing");
      songItemList[2].classList.remove("playing");
      songItemList[3].classList.remove("playing");
      songItemList[5].classList.remove("playing");
      songItemList[6].classList.remove("playing");
      songItemList[7].classList.remove("playing");
      songItemList[4].classList.remove("playing");
      songItemList[9].classList.remove("playing");
    } else if (app.currentIndex === 9) {
      songItemList[9].classList.add("playing");
      songItemList[0].classList.remove("playing");
      songItemList[1].classList.remove("playing");
      songItemList[2].classList.remove("playing");
      songItemList[3].classList.remove("playing");
      songItemList[5].classList.remove("playing");
      songItemList[6].classList.remove("playing");
      songItemList[7].classList.remove("playing");
      songItemList[4].classList.remove("playing");
      songItemList[8].classList.remove("playing");
    }
  }
});
preBtn.addEventListener("click", () => {
  for (let i = 0; i < songItemList.length; i++) {
    if (app.currentIndex === 0) {
      songItemList[0].classList.add("playing");
      songItemList[1].classList.remove("playing");
      songItemList[2].classList.remove("playing");
      songItemList[3].classList.remove("playing");
      songItemList[4].classList.remove("playing");
      songItemList[5].classList.remove("playing");
      songItemList[6].classList.remove("playing");
      songItemList[7].classList.remove("playing");
      songItemList[8].classList.remove("playing");
      songItemList[9].classList.remove("playing");
    } else if (app.currentIndex === 1) {
      songItemList[1].classList.add("playing");
      songItemList[0].classList.remove("playing");
      songItemList[2].classList.remove("playing");
      songItemList[3].classList.remove("playing");
      songItemList[4].classList.remove("playing");
      songItemList[5].classList.remove("playing");
      songItemList[6].classList.remove("playing");
      songItemList[7].classList.remove("playing");
      songItemList[8].classList.remove("playing");
      songItemList[9].classList.remove("playing");
    } else if (app.currentIndex === 2) {
      songItemList[2].classList.add("playing");
      songItemList[0].classList.remove("playing");
      songItemList[1].classList.remove("playing");
      songItemList[3].classList.remove("playing");
      songItemList[4].classList.remove("playing");
      songItemList[5].classList.remove("playing");
      songItemList[6].classList.remove("playing");
      songItemList[7].classList.remove("playing");
      songItemList[8].classList.remove("playing");
      songItemList[9].classList.remove("playing");
    } else if (app.currentIndex === 3) {
      songItemList[3].classList.add("playing");
      songItemList[0].classList.remove("playing");
      songItemList[1].classList.remove("playing");
      songItemList[2].classList.remove("playing");
      songItemList[4].classList.remove("playing");
      songItemList[5].classList.remove("playing");
      songItemList[6].classList.remove("playing");
      songItemList[7].classList.remove("playing");
      songItemList[8].classList.remove("playing");
      songItemList[9].classList.remove("playing");
    } else if (app.currentIndex === 4) {
      songItemList[4].classList.add("playing");
      songItemList[0].classList.remove("playing");
      songItemList[1].classList.remove("playing");
      songItemList[2].classList.remove("playing");
      songItemList[3].classList.remove("playing");
      songItemList[5].classList.remove("playing");
      songItemList[6].classList.remove("playing");
      songItemList[7].classList.remove("playing");
      songItemList[8].classList.remove("playing");
      songItemList[9].classList.remove("playing");
    } else if (app.currentIndex === 5) {
      songItemList[5].classList.add("playing");
      songItemList[0].classList.remove("playing");
      songItemList[1].classList.remove("playing");
      songItemList[2].classList.remove("playing");
      songItemList[3].classList.remove("playing");
      songItemList[4].classList.remove("playing");
      songItemList[6].classList.remove("playing");
      songItemList[7].classList.remove("playing");
      songItemList[8].classList.remove("playing");
      songItemList[9].classList.remove("playing");
    } else if (app.currentIndex === 6) {
      songItemList[6].classList.add("playing");
      songItemList[0].classList.remove("playing");
      songItemList[1].classList.remove("playing");
      songItemList[2].classList.remove("playing");
      songItemList[3].classList.remove("playing");
      songItemList[4].classList.remove("playing");
      songItemList[5].classList.remove("playing");
      songItemList[7].classList.remove("playing");
      songItemList[8].classList.remove("playing");
      songItemList[9].classList.remove("playing");
    } else if (app.currentIndex === 7) {
      songItemList[7].classList.add("playing");
      songItemList[0].classList.remove("playing");
      songItemList[1].classList.remove("playing");
      songItemList[2].classList.remove("playing");
      songItemList[3].classList.remove("playing");
      songItemList[5].classList.remove("playing");
      songItemList[6].classList.remove("playing");
      songItemList[4].classList.remove("playing");
      songItemList[8].classList.remove("playing");
      songItemList[9].classList.remove("playing");
    } else if (app.currentIndex === 8) {
      songItemList[8].classList.add("playing");
      songItemList[0].classList.remove("playing");
      songItemList[1].classList.remove("playing");
      songItemList[2].classList.remove("playing");
      songItemList[3].classList.remove("playing");
      songItemList[5].classList.remove("playing");
      songItemList[6].classList.remove("playing");
      songItemList[7].classList.remove("playing");
      songItemList[4].classList.remove("playing");
      songItemList[9].classList.remove("playing");
    } else if (app.currentIndex === 9) {
      songItemList[9].classList.add("playing");
      songItemList[0].classList.remove("playing");
      songItemList[1].classList.remove("playing");
      songItemList[2].classList.remove("playing");
      songItemList[3].classList.remove("playing");
      songItemList[5].classList.remove("playing");
      songItemList[6].classList.remove("playing");
      songItemList[7].classList.remove("playing");
      songItemList[4].classList.remove("playing");
      songItemList[8].classList.remove("playing");
    }
  }
});
randomBtn.addEventListener("click", () => {
  for (let i = 0; i < songItemList.length; i++) {
    if (app.currentIndex === 0) {
      songItemList[0].classList.add("playing");
      songItemList[1].classList.remove("playing");
      songItemList[2].classList.remove("playing");
      songItemList[3].classList.remove("playing");
      songItemList[4].classList.remove("playing");
      songItemList[5].classList.remove("playing");
      songItemList[6].classList.remove("playing");
      songItemList[7].classList.remove("playing");
      songItemList[8].classList.remove("playing");
      songItemList[9].classList.remove("playing");
    } else if (app.currentIndex === 1) {
      songItemList[1].classList.add("playing");
      songItemList[0].classList.remove("playing");
      songItemList[2].classList.remove("playing");
      songItemList[3].classList.remove("playing");
      songItemList[4].classList.remove("playing");
      songItemList[5].classList.remove("playing");
      songItemList[6].classList.remove("playing");
      songItemList[7].classList.remove("playing");
      songItemList[8].classList.remove("playing");
      songItemList[9].classList.remove("playing");
    } else if (app.currentIndex === 2) {
      songItemList[2].classList.add("playing");
      songItemList[0].classList.remove("playing");
      songItemList[1].classList.remove("playing");
      songItemList[3].classList.remove("playing");
      songItemList[4].classList.remove("playing");
      songItemList[5].classList.remove("playing");
      songItemList[6].classList.remove("playing");
      songItemList[7].classList.remove("playing");
      songItemList[8].classList.remove("playing");
      songItemList[9].classList.remove("playing");
    } else if (app.currentIndex === 3) {
      songItemList[3].classList.add("playing");
      songItemList[0].classList.remove("playing");
      songItemList[1].classList.remove("playing");
      songItemList[2].classList.remove("playing");
      songItemList[4].classList.remove("playing");
      songItemList[5].classList.remove("playing");
      songItemList[6].classList.remove("playing");
      songItemList[7].classList.remove("playing");
      songItemList[8].classList.remove("playing");
      songItemList[9].classList.remove("playing");
    } else if (app.currentIndex === 4) {
      songItemList[4].classList.add("playing");
      songItemList[0].classList.remove("playing");
      songItemList[1].classList.remove("playing");
      songItemList[2].classList.remove("playing");
      songItemList[3].classList.remove("playing");
      songItemList[5].classList.remove("playing");
      songItemList[6].classList.remove("playing");
      songItemList[7].classList.remove("playing");
      songItemList[8].classList.remove("playing");
      songItemList[9].classList.remove("playing");
    } else if (app.currentIndex === 5) {
      songItemList[5].classList.add("playing");
      songItemList[0].classList.remove("playing");
      songItemList[1].classList.remove("playing");
      songItemList[2].classList.remove("playing");
      songItemList[3].classList.remove("playing");
      songItemList[4].classList.remove("playing");
      songItemList[6].classList.remove("playing");
      songItemList[7].classList.remove("playing");
      songItemList[8].classList.remove("playing");
      songItemList[9].classList.remove("playing");
    } else if (app.currentIndex === 6) {
      songItemList[6].classList.add("playing");
      songItemList[0].classList.remove("playing");
      songItemList[1].classList.remove("playing");
      songItemList[2].classList.remove("playing");
      songItemList[3].classList.remove("playing");
      songItemList[4].classList.remove("playing");
      songItemList[5].classList.remove("playing");
      songItemList[7].classList.remove("playing");
      songItemList[8].classList.remove("playing");
      songItemList[9].classList.remove("playing");
    } else if (app.currentIndex === 7) {
      songItemList[7].classList.add("playing");
      songItemList[0].classList.remove("playing");
      songItemList[1].classList.remove("playing");
      songItemList[2].classList.remove("playing");
      songItemList[3].classList.remove("playing");
      songItemList[5].classList.remove("playing");
      songItemList[6].classList.remove("playing");
      songItemList[4].classList.remove("playing");
      songItemList[8].classList.remove("playing");
      songItemList[9].classList.remove("playing");
    } else if (app.currentIndex === 8) {
      songItemList[8].classList.add("playing");
      songItemList[0].classList.remove("playing");
      songItemList[1].classList.remove("playing");
      songItemList[2].classList.remove("playing");
      songItemList[3].classList.remove("playing");
      songItemList[5].classList.remove("playing");
      songItemList[6].classList.remove("playing");
      songItemList[7].classList.remove("playing");
      songItemList[4].classList.remove("playing");
      songItemList[9].classList.remove("playing");
    } else if (app.currentIndex === 9) {
      songItemList[9].classList.add("playing");
      songItemList[0].classList.remove("playing");
      songItemList[1].classList.remove("playing");
      songItemList[2].classList.remove("playing");
      songItemList[3].classList.remove("playing");
      songItemList[5].classList.remove("playing");
      songItemList[6].classList.remove("playing");
      songItemList[7].classList.remove("playing");
      songItemList[4].classList.remove("playing");
      songItemList[8].classList.remove("playing");
    }
  }
});
repeatBtn.addEventListener("click", () => {
  for (let i = 0; i < songItemList.length; i++) {
    if (app.currentIndex === 0) {
      songItemList[0].classList.add("playing");
      songItemList[1].classList.remove("playing");
      songItemList[2].classList.remove("playing");
      songItemList[3].classList.remove("playing");
      songItemList[4].classList.remove("playing");
      songItemList[5].classList.remove("playing");
      songItemList[6].classList.remove("playing");
      songItemList[7].classList.remove("playing");
      songItemList[8].classList.remove("playing");
      songItemList[9].classList.remove("playing");
    } else if (app.currentIndex === 1) {
      songItemList[1].classList.add("playing");
      songItemList[0].classList.remove("playing");
      songItemList[2].classList.remove("playing");
      songItemList[3].classList.remove("playing");
      songItemList[4].classList.remove("playing");
      songItemList[5].classList.remove("playing");
      songItemList[6].classList.remove("playing");
      songItemList[7].classList.remove("playing");
      songItemList[8].classList.remove("playing");
      songItemList[9].classList.remove("playing");
    } else if (app.currentIndex === 2) {
      songItemList[2].classList.add("playing");
      songItemList[0].classList.remove("playing");
      songItemList[1].classList.remove("playing");
      songItemList[3].classList.remove("playing");
      songItemList[4].classList.remove("playing");
      songItemList[5].classList.remove("playing");
      songItemList[6].classList.remove("playing");
      songItemList[7].classList.remove("playing");
      songItemList[8].classList.remove("playing");
      songItemList[9].classList.remove("playing");
    } else if (app.currentIndex === 3) {
      songItemList[3].classList.add("playing");
      songItemList[0].classList.remove("playing");
      songItemList[1].classList.remove("playing");
      songItemList[2].classList.remove("playing");
      songItemList[4].classList.remove("playing");
      songItemList[5].classList.remove("playing");
      songItemList[6].classList.remove("playing");
      songItemList[7].classList.remove("playing");
      songItemList[8].classList.remove("playing");
      songItemList[9].classList.remove("playing");
    } else if (app.currentIndex === 4) {
      songItemList[4].classList.add("playing");
      songItemList[0].classList.remove("playing");
      songItemList[1].classList.remove("playing");
      songItemList[2].classList.remove("playing");
      songItemList[3].classList.remove("playing");
      songItemList[5].classList.remove("playing");
      songItemList[6].classList.remove("playing");
      songItemList[7].classList.remove("playing");
      songItemList[8].classList.remove("playing");
      songItemList[9].classList.remove("playing");
    } else if (app.currentIndex === 5) {
      songItemList[5].classList.add("playing");
      songItemList[0].classList.remove("playing");
      songItemList[1].classList.remove("playing");
      songItemList[2].classList.remove("playing");
      songItemList[3].classList.remove("playing");
      songItemList[4].classList.remove("playing");
      songItemList[6].classList.remove("playing");
      songItemList[7].classList.remove("playing");
      songItemList[8].classList.remove("playing");
      songItemList[9].classList.remove("playing");
    } else if (app.currentIndex === 6) {
      songItemList[6].classList.add("playing");
      songItemList[0].classList.remove("playing");
      songItemList[1].classList.remove("playing");
      songItemList[2].classList.remove("playing");
      songItemList[3].classList.remove("playing");
      songItemList[4].classList.remove("playing");
      songItemList[5].classList.remove("playing");
      songItemList[7].classList.remove("playing");
      songItemList[8].classList.remove("playing");
      songItemList[9].classList.remove("playing");
    } else if (app.currentIndex === 7) {
      songItemList[7].classList.add("playing");
      songItemList[0].classList.remove("playing");
      songItemList[1].classList.remove("playing");
      songItemList[2].classList.remove("playing");
      songItemList[3].classList.remove("playing");
      songItemList[5].classList.remove("playing");
      songItemList[6].classList.remove("playing");
      songItemList[4].classList.remove("playing");
      songItemList[8].classList.remove("playing");
      songItemList[9].classList.remove("playing");
    } else if (app.currentIndex === 8) {
      songItemList[8].classList.add("playing");
      songItemList[0].classList.remove("playing");
      songItemList[1].classList.remove("playing");
      songItemList[2].classList.remove("playing");
      songItemList[3].classList.remove("playing");
      songItemList[5].classList.remove("playing");
      songItemList[6].classList.remove("playing");
      songItemList[7].classList.remove("playing");
      songItemList[4].classList.remove("playing");
      songItemList[9].classList.remove("playing");
    } else if (app.currentIndex === 9) {
      songItemList[9].classList.add("playing");
      songItemList[0].classList.remove("playing");
      songItemList[1].classList.remove("playing");
      songItemList[2].classList.remove("playing");
      songItemList[3].classList.remove("playing");
      songItemList[5].classList.remove("playing");
      songItemList[6].classList.remove("playing");
      songItemList[7].classList.remove("playing");
      songItemList[4].classList.remove("playing");
      songItemList[8].classList.remove("playing");
    }
  }
});
for (let j = 0; j < heart.length; j++) {
  heart[j].addEventListener("click", () => {
    if (heart[j].classList.contains("remote-click")) {
      heart[j].classList.remove("remote-click");
    } else {
      heart[j].classList.add("remote-click");
    }
  });
}
