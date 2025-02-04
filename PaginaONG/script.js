document.addEventListener('DOMContentLoaded', function(){

    //Recupera os elementos no html
    let imagem = document.getElementById('imagem-ong');
    let nome = document.getElementById('nome');
    let descricao = document.getElementById('descricao');
    let email = document.getElementById('email');
    let telefone = document.getElementById('telefone');
    let site = document.getElementById('site');
    
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

    /*
    * Pega o uuid passado pela página home
    */
    function pegarUUID(){
        const params = new URLSearchParams(window.location.search);
        return params.get("uuid");
    }

    /*
    * Função fetch para recuperar os dados da ong e colocalos no html
    */
    async function DadosOng() {
        const uuid = pegarUUID();
        const url = `http://localhost:8080/ong/${uuid}`;

        try{
            //Configuração e chamada do fetch
            let resposta = await fetch( url, {
                method: 'GET',
                headers: {
                    "Content-Type":"application/json",
                },
            });
    
            //Verifica se ocorreu algum erro e passa ele no console
            if(!resposta.ok){
                console.error(`Erro ao coletar os dados da Ong. Status da requisição: ${resposta.status}, Conteudo: ${resposta.body}`);
                throw new Error(`Erro ao coletar os dados da Ong. Status da requisição: ${resposta.status}, Conteudo: ${resposta.body}`);
            }
    
            //Converte a resposta json em uma variavel
            let dadosOng = await resposta.json();
    
            //Modifica os valores no html pelos os obtidos na ong
            imagem.src = dadosOng.link_img;
            nome.textContent = dadosOng.nome;
            descricao.textContent = dadosOng.descricao;
            email.textContent = dadosOng.email;
            telefone.textContent = dadosOng.telefone;
            site.href = dadosOng.link_site;
            
        }catch(error){
            console.error(`Não foi possível recuperar os dados da Ong. Error: ${error}`);
        }      
    }

    //Chama a função para pegar os dados da ong assim que a página carregar
    DadosOng();
})