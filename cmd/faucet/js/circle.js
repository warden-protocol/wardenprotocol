function updateCircle() {
  const tokenCircle = document.querySelector(".token-circle");
  const progressCircle = document.getElementById("progressCircle");
  const tokenInfo = document.getElementById("tokenInfo");

  if (!tokenCircle || !progressCircle || !tokenInfo) {
    console.error("Required elements not found");
    return;
  }

  const totalSupply = parseFloat(tokenCircle.dataset.totalSupply);
  const tokensAvailable = parseFloat(tokenInfo.dataset.tokensAvailable);

  if (
    !Number.isNaN(totalSupply) &&
    !Number.isNaN(tokensAvailable) &&
    totalSupply > 0
  ) {
    const percentage = (tokensAvailable / totalSupply) * 100;
    const circumference = 2 * Math.PI * 45; // 45 is the radius of the circle
    const dashArray = circumference;
    const dashOffset = circumference * (1 - percentage / 100);

    progressCircle.setAttribute("stroke-dasharray", dashArray);
    progressCircle.setAttribute("stroke-dashoffset", dashOffset);
  }
}

document.addEventListener("htmx:afterSwap", function (event) {
  if (event.detail.target.matches('[hx-get="/update-tokens"]')) {
    updateCircle();
  }
});

// Initial update when the page loads
document.addEventListener("DOMContentLoaded", updateCircle);
