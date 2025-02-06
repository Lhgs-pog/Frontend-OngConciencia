async function obterDadosUsuario(email) {
    try {
        const response = await fetch(`http://localhost:8080/user/email/${encodeURIComponent(email)}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) throw new Error("Erro ao buscar os dados do usuário.");
        return await response.json();
    } catch (error) {
        console.error(error);
        sessionStorage.clear();
        return null;
    }
}

function atualizarUI(usuario) {
    const authMenu = document.getElementById("auth-menu");
    const userMenu = document.getElementById("user-menu");
    const profilePic = document.getElementById("profile-pic");
    const profileUser = document.getElementById("profile-user");

    if (!authMenu || !userMenu || !profileUser) return;

    if (!usuario) {
        authMenu.style.display = "block";
        userMenu.style.display = "none";
        return;
    }

    authMenu.style.display = "none";
    userMenu.style.display = "block";
    profileUser.href = `../PerfilUsuario/index.html?id=${usuario.id}`;
    if (usuario.foto) profilePic.src = usuario.foto;
}

async function verificarAutenticacao() {
    //Token e Email do usuário
    const token = sessionStorage.getItem("token");
    const email = sessionStorage.getItem("email");

    //Verifica o token
    if (!token) {
        //Usuário não existe!
        atualizarUI(null);
        return;
    }

    //Uusário existe, o email é enviado para requisição da API
    const usuario = await obterDadosUsuario(email);
    //Usuário existe!
    atualizarUI(usuario);
}

// Executa a verificação quando a página carrega
document.addEventListener("DOMContentLoaded", verificarAutenticacao);

// Função para o Logout
document.addEventListener("DOMContentLoaded", function () {
    const logoutButton = document.getElementById("logout");

    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            sessionStorage.clear();
            window.location.href = "../Home/index.html";
        });
    }
});