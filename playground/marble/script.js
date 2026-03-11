// =====canvas=====
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.addEventListener("mousemove", (e) => {
  console.log(e.offsetX, e.offsetY);
});

let currentnumber = 0;

// =====関数=====

// =====素数判定=====
function isPrime(n) {
  if (n < 2) return false;

  for (let i = 2; i < n; i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
}
// 円を描く
function drawball() {
  ctx.beginPath();
  ctx.arc(x, y, 25, 0, Math.PI * 2);
  ctx.fillStyle = "blue";
  ctx.fill();

  // Marble
  ctx.fillStyle = "white";
  ctx.font = "30px Arial";

  if (running) {
    ctx.fillText(currentnumber, x - 10, y + 10);
  }
}

// slopeを描く
function drawslope() {
  ctx.beginPath();

  ctx.moveTo(107, 190);
  ctx.lineTo(621, 129);

  ctx.strokeStyle = "black";
  ctx.lineWidth = 8;

  ctx.stroke();
}

function update() {
  ctx.clearRect(0, 0, 800, 600);

  drawslope();
  drawball();

  if (running) {
    x -= vx;
    y += vy;
    requestAnimationFrame(update);
  }
}

// 転がる速度の計算
let angle = 30 * (Math.PI / 180); // 角度をラジアンに変換
let speed = 5; // 転がる速度

let vx = speed * Math.cos(angle); // x方向の速度
let vy = speed * Math.sin(angle); // y方向の速度

// リセット
function reset() {
  running = false;
  x = 620;
  y = 100;
  currentnumber = 0;
  ctx.clearRect(0, 0, 800, 600);
  drawslope();
  drawball();
}

// =====イベント=====
// 起動時
window.onload = function () {
  reset();
};

//　=====Start Button=====
document.getElementById("start").onclick = function () {
  {
    if (running) return;
  }

  document.querySelectorAll(".hole").forEach((h) => {
    h.classList.remove("active");
  });
  // ランダムな数を生成
  currentnumber = Math.floor(Math.random() * 100) + 1;

  running = true;
  update();

  // ５mintue
  setTimeout(() => {
    //　偶数
    if (currentnumber % 2 === 0) {
      document.getElementById("even").classList.add("active");
    }

    // 奇数
    if (currentnumber % 2 !== 0) {
      document.getElementById("odd").classList.add("active");
    }

    //素数
    if (isPrime(currentnumber)) {
      document.getElementById("prime").classList.add("active");
    }

    // 3の倍数
    if (currentnumber % 3 === 0) {
      document.getElementById("three").classList.add("active");
    }

    // 5の倍数
    if (currentnumber % 5 === 0) {
      document.getElementById("five").classList.add("active");
    }
    // 7の倍数
    if (currentnumber % 7 === 0) {
      document.getElementById("seven").classList.add("active");
    }

    // 平方根
    if (Number.isInteger(Math.sqrt(currentnumber))) {
      document.getElementById("square root").classList.add("active");
    }

    // フィボナッチ数
    let a = 1;
    let b = 1;
    let isFib = false;

    while (a <= currentnumber) {
      if (a === currentnumber) {
        isFib = true;
      }

      console.log(a);
      let next = a + b;
      a = b;
      b = next;
    }
    if (isFib) {
      document.getElementById("fibonacci").classList.add("active");
    }
  }, 3000);
  // 5秒後に停止
  setTimeout(() => {
    reset();
  }, 5000);
};
