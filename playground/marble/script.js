// =====素数判定=====
function isPrime(n) {
  if (n < 2) return false;

  for (let i = 2; i < n; i++) {
    if (n % 1 === 0) {
      return false;
    }
  }
}

// =====canvas=====
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.addEventListener("mousemove", (e) => {
  console.log(e.offsetX, e.offsetY);
});

// 円を描く
let x = 620;
let y = 100;

function drawball() {
  ctx.beginPath();
  ctx.arc(x, y, 25, 0, Math.PI * 2);
  ctx.fillStyle = "blue";
  ctx.fill();
}

function update() {
  ctx.clearRect(0, 0, 800, 600);

  drawslope();

  drawball();
  x -= vx;
  y += vy;
  requestAnimationFrame(update);
}
update();

// slopeを描く
ctx.beginPath();

ctx.moveTo(107, 190);
ctx.lineTo(621, 129);

ctx.strokeStyle = "black";
ctx.lineWidth = 8;

ctx.stroke();

// 転がる速度の計算

let angle = 30 * (Math.PI / 180); // 角度をラジアンに変換
let speed = 5; // 転がる速度

let vx = speed * Math.cos(angle); // x方向の速度
let vy = speed * Math.sin(angle); // y方向の速度

//　=====Start Button=====
document.getElementById("start").onclick = function () {
  const ball = document.getElementById("ball");

  // Randam
  const number = Math.floor(Math.random() * 100) + 1;

  // Marble
  ball.textContent = number;

  // Reset
  document.querySelectorAll(".hole").forEach((h) => {
    h.classList.remove("active");
  });

  // ５mintue
  setTimeout(() => {
    //　偶数
    if (number % 2 === 0) {
      document.getElementById("even").classList.add("active");
    }

    // 奇数
    if (number % 2 !== 0) {
      document.getElementById("odd").classList.add("active");
    }

    //素数
    if (isPrime(number)) {
      document.getElementById("prime").classList.add("active");
    }

    // 3の倍数
    if (number % 3 === 0) {
      document.getElementById("three").classList.add("active");
    }

    // 5の倍数
    if (number % 5 === 0) {
      document.getElementById("five").classList.add("active");
    }
    // 7の倍数
    if (number % 7 === 0) {
      document.getElementById("seven").classList.add("active");
    }

    // 平方根
    if (Number.isInteger(Math.sqrt(number))) {
      document.getElementById("square root").classList.add("active");
    }

    // フィボナッチ数
    let a = 1;
    let b = 1;
    let isFib = false;

    while (a <= number) {
      if (a === number) {
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
};
