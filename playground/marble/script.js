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

//slopeオブジェクト指向
const slopeA = { x1: 621, y1: 129, x2: 107, y2: 190 };
const slopeB = { x1: 1, y1: 232, x2: 621, y2: 338 };

// slopeを描く
function drawslope(slope) {
  ctx.beginPath();

  ctx.moveTo(slope.x1, slope.y1);
  ctx.lineTo(slope.x2, slope.y2);

  ctx.strokeStyle = "black";
  ctx.lineWidth = 8;

  ctx.stroke();
}

//slope呼び出し
function allDrawSlope() {
  drawslope(slopeA);
  drawslope(slopeB);
}
// 動き
function update() {
  ctx.clearRect(0, 0, 800, 600);
  allDrawSlope();
  drawball();

  if (running) {
    const acceleration = g * Math.sin(Math.abs(physicsA.angle));
    velocity += acceleration;
    velocity *= friction;

    x += velocity * physicsA.ux;
    y += velocity * physicsA.uy;
    requestAnimationFrame(update);
  }
}

// slopeAの物理演算
const physicsA = caluSlope(slopeA);

const radius = 25; // 円の半径
let x = slopeA.x1 + physicsA.nx * radius;
let y = slopeA.y1 + physicsA.ny * radius;
let running = false;
let volatile = 0;

//　物理演算
const g = 0.5; // 重力定数
const friction = 0.99; // 摩擦係数

// slopeのから物理演算
function caluSlope(slope) {
  const dx = slope.x2 - slope.x1;
  const dy = slope.y2 - slope.y1;
  const dist = Math.sqrt(dx * dx + dy * dy);
  return {
    angle: Math.atan2(dy, dx),
    ux: dx / dist,
    uy: dy / dist,

    // 法線ベクトル
    nx: -dy / dist,
    ny: dx / dist,
  };
}

// 速度
let velocity = 0;

// リセット
function reset() {
  running = false;
  x = slopeA.x1 + physicsA.nx * radius;
  y = slopeA.y1 + physicsA.ny * radius;
  velocity = 0;
  currentnumber = 0;
  ctx.clearRect(0, 0, 800, 600);
  allDrawSlope();
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
