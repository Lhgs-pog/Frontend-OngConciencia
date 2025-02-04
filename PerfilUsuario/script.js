document.addEventListener("DOMContentLoaded", async () => {

    /*
    * Função para pesquisa ongs com uma palavra chave
    */
    const btnPesquisarOng = document.getElementById('btn-pesquisa');
    btnPesquisarOng.addEventListener('click', () => {
        const keyword = document.getElementById('pesquisa').value;

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
        window.location.href = "../LoginCadastro/index.html";
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
        document.getElementById("foto-perfil").src = userData.foto || "https://bootdey.com/img/Content/avatar/avatar1.png";

    } catch (error) {
        console.error(error);
    }

    // Atualizar dados do usuário
    document.querySelector(".btn-primary").addEventListener("click", async () => {
        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const senha = document.getElementById("nova-senha").value;
        const fotoInput = document.querySelector("input[type='file']");

        // Criar objeto FormData para envio multipart
        const formData = new FormData();
        formData.append("id", userId);
        if (nome) formData.append("nome", nome);
        if (email) formData.append("email", email);
        if (senha) formData.append("senha", senha);
        //Verifica se o usuário selecionou uma foto
        if (fotoInput.files.length > 0) {
            formData.append("foto", fotoInput.files[0]); 
        }

        try {
            const response = await fetch(apiUrl, {
                method: "PUT",
                body: formData, // Enviando como FormData para suportar o arquivo
            });

            if (!response.ok) throw new Error("Erro ao atualizar os dados");

            alert("Dados atualizados com sucesso!");
            location.reload(); // Recarregar a página para atualizar os dados
        } catch (error) {
            console.error(error);
            alert("Falha ao atualizar os dados.");
        }
    });


    //URL do método de atualizar Foto
    const apiPhoto = `http://localhost:8080/user/foto`;

    // Atualizar foto do usuário
    document.querySelector("input[type='file']").addEventListener("change", async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("email", document.getElementById("email").value);
        formData.append("foto", file);

        try {
            const response = await fetch(apiPhoto, {
                method: "PUT",
                body: formData
            });

            if (!response.ok) throw new Error("Erro ao atualizar foto");
            alert("Foto atualizada com sucesso!");
            document.getElementById("foto-perfil").src = URL.createObjectURL(file);
        } catch (error) {
            console.error(error);
            alert("Falha ao atualizar a foto.");
        }
    });

    // Cancelar e voltar para Home
    document.querySelector(".btn-secondary").addEventListener("click", () => {
        window.location.href = "../Home/index.html";
    });
});
