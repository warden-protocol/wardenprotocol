let pollingInterval;

function startPolling() {
  pollingInterval = setInterval(() => {
    fetch("/check-tx")
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("tx-status").innerHTML = html;
        if (html.includes('id="tx-result"')) {
          clearInterval(pollingInterval);
        }
      });
  }, 2000);
}

function returnToHome() {
  clearInterval(pollingInterval);
  window.location.href = "/";
}
