package main

import (
	"html/template"
)

var homepage = template.Must(template.New("homepage").Parse(`<!DOCTYPE html>
<html>
<head>
<title>Faucet - Warden Protocol</title>
<script src="https://www.google.com/recaptcha/api.js?render={{ .C.RecaptchaSiteKey }}"></script>
<script>
grecaptcha.ready(function() {
    grecaptcha.execute('{{ .C.RecaptchaSiteKey }}', {action: 'submit'}).then(function(token) {
        document.getElementById('recaptchaResponse').value = token;
    });
});
</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300..500&display=swap" rel="stylesheet">
<style>
body {
    color: white;
    height: 100dvh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #0A0A0A;
    font-family: "Inter", sans-serif;
	text-align: center;
}

form {
    margin-top: 4rem;
}

button {
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    border: none;
    text-decoration: none;
    font-weight: 400;
    padding: 1rem 1.375rem;
    box-sizing: border-box;
    font-size: 0.875rem;
    gap: 0.625rem;
    cursor: pointer;
    width: 100%;
    line-height: 1rem;
    max-height: 3.75rem;
    background: #D196CA;
    transition: 0.2s ease-in-out;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1rem;
    color: #0A0A0A;
}

button:hover {
    background: #FFAEEE;
}

input {
    border: 0.03125rem solid #F5F5F5;
    color: #F5F5F5;
    font-size: 0.875rem;
    font-weight: 300;
    padding: 0.375rem 0.5625rem;
    height: 2.625rem;
    box-sizing: border-box;
    background: transparent;
    outline: none;
    width: 100%;
    min-width: 500px;
}

h1 {
    font-weight: 400;
    font-size: 2.875rem;
    color: #F5F5F5;
    margin: 0 0 1rem 0;
}
</style>
<script defer data-domain="faucet.buenavista.wardenprotocol.org" src="https://plausible.io/js/script.js"></script>
</head>
<body>
    <div>
        <h1>Warden Protocol Faucet</h1>
        <span>Insert your warden address and click the button to receive some test WARD.</span>
    </div>
    <form action="/submit" method="post">
		<input type="hidden" id="recaptchaResponse" name="g-recaptcha-response">
        <input type="text" name="address" value="{{ .Address }}" placeholder="Warden Protocol address" />
        <button type="submit">Get WARD</button>
    </form>
</body>
</html>`,
))

var successpage = template.Must(template.New("successpage").Parse(`<!DOCTYPE html>
<html>
<head>
<title>Faucet - Warden Protocol</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300..500&display=swap" rel="stylesheet">
<style>
body {
    color: white;
    height: 100dvh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #0A0A0A;
    font-family: "Inter", sans-serif;
	text-align: center;
}

h1 {
    font-weight: 400;
    font-size: 2.875rem;
    color: #F5F5F5;
    margin: 0 0 1rem 0;
}
</style>
<script defer data-domain="faucet.buenavista.wardenprotocol.org" src="https://plausible.io/js/script.js"></script>
<script>window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }</script>
<script>document.addEventListener('DOMContentLoaded', function () { plausible('success', { props: { path: document.location.pathname } }); });</script>
</head>
<body>
    <div>
        <h1>Warden Protocol Faucet</h1>
        <span>Success! You'll receive your WARDs shortly.</span>
    </div>
</body>
</html>`,
))

var errorpage = template.Must(template.New("errorpage").Parse(`<!DOCTYPE html>
<html>
<head>
<title>Faucet - Warden Protocol</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300..500&display=swap" rel="stylesheet">
<style>
body {
    color: white;
    height: 100dvh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #0A0A0A;
    font-family: "Inter", sans-serif;
	text-align: center;
}

h1 {
    font-weight: 400;
    font-size: 2.875rem;
    color: #F5F5F5;
    margin: 0 0 1rem 0;
}
</style>
<script defer data-domain="faucet.buenavista.wardenprotocol.org" src="https://plausible.io/js/script.js"></script>
<script>window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }</script>
<script>document.addEventListener('DOMContentLoaded', function () { plausible('error', { props: { path: document.location.pathname } }); });</script>
</head>
<body>
    <div>
        <h1>Warden Protocol Faucet</h1>
		<span>{{ . }}</span>
    </div>
</body>
</html>`,
))
