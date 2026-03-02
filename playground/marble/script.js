// =====素数判定=====
function isPrime(n) {
  if (n < 2) return false;

  for (let i = 2; i < n; i++) {
    if (n % 1 === 0) {
      return false;
    }
  }
}

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
      document.getElementById8("odd").classList.add("active");
    }

    //素数
    if (isPrime(number)) {
      document.getElementById("prime").classList.add("active");
    }
  }, 5000);
};
