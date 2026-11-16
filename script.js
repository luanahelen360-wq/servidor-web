
function mostrarMensagem() {
    alert("Parabéns! Seu servidor web está funcionando!");
}

console.log("Meu site foi carregado com sucesso!");

// MEDIDOR ILUSTRATIVO DE INTERNET

function iniciarTeste() {

    const botao = document.getElementById("botaoTeste");
    const status = document.getElementById("statusTeste");
    const velocimetro = document.getElementById("velocimetro");

    const velocidade = document.getElementById("velocidade");
    const download = document.getElementById("download");
    const upload = document.getElementById("upload");
    const ping = document.getElementById("ping");

    if (
        !botao || !status || !velocimetro ||
        !velocidade || !download || !upload || !ping
    ) {
        return;
    }

    botao.disabled = true;
    botao.textContent = "Testando...";
    status.textContent = "Simulando teste de conexão...";

    velocidade.textContent = "0";
    download.textContent = "0 Mbps";
    upload.textContent = "0 Mbps";
    ping.textContent = "0 ms";

    velocimetro.style.setProperty("--angulo", "0deg");
    velocimetro.style.setProperty("--ponteiro", "-135deg");

    setTimeout(function() {

        const valorDownload = Math.floor(Math.random() * 400) + 100;
        const valorUpload = Math.floor(Math.random() * 100) + 20;
        const valorPing = Math.floor(Math.random() * 40) + 5;

        const angulo = (valorDownload / 500) * 270;

        velocidade.textContent = valorDownload;

        download.textContent = valorDownload + " Mbps";
        upload.textContent = valorUpload + " Mbps";
        ping.textContent = valorPing + " ms";

        velocimetro.style.setProperty(
            "--angulo",
            angulo + "deg"
        );

        velocimetro.style.setProperty(
            "--ponteiro",
            (-135 + angulo) + "deg"
        );

        status.textContent = "Demonstração concluída!";

        botao.disabled = false;
        botao.textContent = "Testar novamente";

    }, 1800);
}
