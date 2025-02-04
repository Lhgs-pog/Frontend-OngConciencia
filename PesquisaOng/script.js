document.addEventListener('DOMContentLoaded', function(){

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
    * Função para pegar a palavra passe na url 
    */
   function pegarKeyword(){
       const param = new URLSearchParams(window.location.search);
       return param.get("keyword");
    }
    
    /*
    * Função para pegar as ongs no banco de dados e inserir elas no html
    */
    async function pegarOngsPesquisada() {
        // Pega a palavra-chave (certifique-se de que a função pegarKeyword() está definida)
        const keyword = pegarKeyword();
        // URL do endpoint da API
        const url = `http://localhost:8080/ong/search?keyword=${encodeURIComponent(keyword)}`;
       
        try {
            // Configuração e chamada do endpoint
            let resposta = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            // Se a resposta da API não for OK (status 200 a 299), exibe o erro no console
            if (!resposta.ok) {
                const errorText = await resposta.text();
                console.error(`Erro ao recuperar os dados das ongs. Status: ${resposta.status}, Conteúdo: ${errorText}`);
                throw new Error(`Erro ao recuperar os dados das ongs, Status: ${resposta.status}, Conteúdo: ${errorText}`);
            }
    
            // Converte a resposta para JSON (supondo que a API retorna um array)
            let ongs = await resposta.json();
    
            // Se a resposta não for um array, tenta converter para array (ou exibe um erro)
            if (!Array.isArray(ongs)) {
                console.warn("A resposta não é um array, tentando converter...");
                ongs = [ongs];
            }
    
            // Se a API retorna uma lista vazia, exibe uma mensagem
            if (!ongs || ongs.length === 0) {
                const container = document.getElementById('area-de-conteudo');
                container.innerHTML = '<p class="avisos">Nenhuma ONG foi encontrada com esse nome.</p>';
                return;
            }
    
            // Controle de estrelas
            let estrela = 0;
            const areaOng = document.getElementById('area-de-conteudo');
            // Limpa a área de conteúdo (opcional, se desejar substituir o conteúdo atual)
            areaOng.innerHTML = '';
    
            // Loop para inserir cada ONG na área de conteúdo
            ongs.forEach(ong => {
                const { id, nome, descricao, email, telefone, link_img, link_site } = ong;
    
                // Cria o link que envolverá o card da ONG
                const ongLink = document.createElement('a');
                ongLink.classList.add('ong');
                ongLink.href = `../PaginaONG/index.html?uuid=${id}`;
    
                // Define o conteúdo do card
                ongLink.innerHTML = `
                    <div class="card cards" style="width: 18rem;">
                        <img src="${link_img}" class="card-img-top card-img" alt="Imagem da ONG">
                        <div class="card-body">
                            <h5 class="card-title">${nome}</h5>
                            <p class="card-text">${descricao}</p>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item" id="avaliacao">
                                <div class="rating">
                                    <input type="radio" id="star${estrela+1}"><label for="star${estrela+1}"></label>
                                    <input type="radio" id="star${estrela+2}"><label for="star${estrela+2}"></label>
                                    <input type="radio" id="star${estrela+3}"><label for="star${estrela+3}"></label>
                                    <input type="radio" id="star${estrela+4}"><label for="star${estrela+4}"></label>
                                    <input type="radio" id="star${estrela+5}"><label for="star${estrela+5}"></label>
                                </div>
                            </li>
                        </ul>
                        <div class="card-body">
                            <a href="${link_site}" class="card-link">Ir para a instituição</a>
                        </div>
                    </div>
                `;
    
                // Insere o card na área de conteúdo
                areaOng.appendChild(ongLink);
    
                // Atualiza o contador de estrelas
                estrela += 5;
            });
        } catch (error) {
            console.error(`Erro ao recuperar e emitir as ONGs. Error: ${error}`);
            const areaOngs = document.getElementById('area-de-conteudo');
            areaOngs.innerHTML = '<p class="avisos">Não foi possível recuperar as ONGs. Nós desculpamos pela inconveniência.</p>';
        }
    }
    

    //Chama a função assim que o código carregar
    pegarOngsPesquisada();
});