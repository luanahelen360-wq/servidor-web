

// SISTEMA DE CADASTRO E LOGIN

const chaveUsuarios = "usuariosServidorWeb";

// GERAR HASH DA SENHA
async function criptografarSenha(senha) {
    const dados = new TextEncoder().encode(senha);
    const hash = await crypto.subtle.digest("SHA-256", dados);

    return Array.from(new Uint8Array(hash))
        .map(byte => byte.toString(16).padStart(2, "0"))
        .join("");
}

// CADASTRO
const formCadastro = document.getElementById("formCadastro");

if (formCadastro) {
    formCadastro.addEventListener("submit", async function(event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim().toLowerCase();
        const senha = document.getElementById("senha").value;
        const mensagem = document.getElementById("mensagem");

        try {
            const usuarios = JSON.parse(
                localStorage.getItem(chaveUsuarios) || "[]"
            );

            // Verificar se o e-mail já existe
            const existente = usuarios.find(
                usuario => usuario.email === email
            );

            if (existente) {
                mensagem.textContent = "Este e-mail já está cadastrado!";
                return;
            }

            // Criar usuário
            const senhaHash = await criptografarSenha(senha);

            usuarios.push({
                nome: nome,
                email: email,
                senha: senhaHash
            });

            // Salvar cadastro
            localStorage.setItem(
                chaveUsuarios,
                JSON.stringify(usuarios)
            );

            mensagem.textContent = "Cadastro realizado com sucesso!";

            formCadastro.reset();

            // REDIRECIONAR PARA O LOGIN
            window.location.assign("./login.html");

        } catch (erro) {
            console.error(erro);
            mensagem.textContent = "Não foi possível realizar o cadastro.";
        }
    });
}

// LOGIN
const formLogin = document.getElementById("formLogin");

if (formLogin) {
    formLogin.addEventListener("submit", async function(event) {
        event.preventDefault();

        const email = document.getElementById("email").value.trim().toLowerCase();
        const senha = document.getElementById("senha").value;
        const mensagem = document.getElementById("mensagem");

        try {
            const usuarios = JSON.parse(
                localStorage.getItem(chaveUsuarios) || "[]"
            );

            const senhaHash = await criptografarSenha(senha);

            const usuario = usuarios.find(
                usuario =>
                    usuario.email === email &&
                    usuario.senha === senhaHash
            );

            if (usuario) {
                mensagem.textContent =
                    "Login realizado com sucesso! Bem-vindo, " + usuario.nome + "!";

                sessionStorage.setItem("usuarioLogado", usuario.nome);

            } else {
                mensagem.textContent = "E-mail ou senha incorretos.";
            }

        } catch (erro) {
            console.error(erro);
            mensagem.textContent = "Erro ao realizar login.";
        }
    });
}
