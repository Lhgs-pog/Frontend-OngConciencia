document.addEventListener("DOMContentLoaded", async () => {

    /*
    * Função para pesquisa ongs com uma palavra chave
    */
    const btnPesquisarOng = document.getElementById('btn-pesquisa');
    btnPesquisarOng.addEventListener('click', () => {
        const keyword = document.getElementById('input-pesquisa').value;

        if(keyword.trim() !== ""){
            window.location.href = `../PesquisaOng/index.html?keyword=${encodeURIComponent(keyword)}`;
        }
        console.error("A pesquisa não pode ser vaziaa");
    })

    // Capturar o parâmetro 'id'
    const getQueryParam = (param) => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    };

    // Parâmetro ID presente em userId
    const userId = getQueryParam('id');
    console.log("ID Capturado: ", userId);

    // Verifica se o usuário está logado(parâmetro id enviado), se não envia para a página de Login
    if (!userId) {
        alert("Nenhum usuário logado!");
        //Temporraiamente desativado
        //window.location.href = "../LoginCadastro/index.html";
        return;
    }

    //URL dos métodos PUT E GET
    const apiUrl = `http://localhost:8080/user/${userId}`;

    // Carregar os dados do usuário
    try {

        // Requisição do GET
        const response = await fetch(apiUrl, { method: "GET" });
        //Erro se não encontrar o usuário
        if (!response.ok) throw new Error("Erro ao buscar dados do usuário");
        //Dados do usuário
        const userData = await response.json();


        //Preenche os campos do HTML com os dados do usuário
        document.getElementById("nome").value = userData.nome || "";
        document.getElementById("email").value = userData.email || "";
        document.getElementById("foto-perfil").src = userData.foto || "imagens/user_icon.png";

    } catch (error) {
        console.error(error);
    }

    // Atualizar dados do usuário
    document.querySelector(".btn-primary").addEventListener("click", async () => {
        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const senha = document.getElementById("nova-senha").value;
        const fotoInput = document.querySelector("input[type='file']");

        const userData = {
            nome: nome,
            email: email,
            senha: senha,
            roles: "user"
        };

        const foto = fotoInput.files[0];

        // Criar objeto FormData para envio multipart
        const formData = new FormData();
         // Para enviar o JSON, encapsule-o em um Blob com o tipo "application/json"
        formData.append('data', new Blob([JSON.stringify(userData)], { type: 'application/json' }));
        if (foto) {
            formData.append('foto', foto);
        } else {
            fotoData.append("foto", src="imagens/user_icon.png");
        }

        try {
            const response = await fetch(apiUrl, {
                method: "PUT",
                body: formData, // Enviando como FormData para suportar o arquivo
            });

            if (!response.ok){
                console.error(`Erro ao efetuar a requisição. Status: ${response.status}. Conteudo: ${response.body}`);
                throw new Error("Erro ao atualizar os dados");
            }

            alert("Dados atualizados com sucesso!");
            location.reload(); // Recarregar a página para atualizar os dados
        } catch (error) {
            console.error(error);
            alert("Falha ao atualizar os dados.");
        }
    });

    // Cancelar e voltar para Home
    document.querySelector(".btn-secondary").addEventListener("click", () => {
        window.location.href = "../Home/index.html";
    });
});
