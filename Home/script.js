document.addEventListener('DOMContentLoaded', function(){

    //Url do endpoint da api
    const url = 'http://localhost:8080/ong';

    /*
    * Função para pesquisa ongs com uma palavra chave
    */
    const btnPesquisarOng = document.getElementById('btn-pesquisa');
    btnPesquisarOng.addEventListener('click', () => {
        const keyword = document.getElementById('input-pesquisa').value;

        if(keyword.trim() !== ""){
            window.location.href = `../PesquisaOng/index.html?keyword=${encodeURIComponent(keyword)}`;
        }
        console.error("A pesquisa não pode ser vazia");
    })

    /*
    * Função para pegar as ongs no banco de dados e inserir elas no html
    */
    async function pegarOngs() {

        try {
            //Configuração e chamada do endpoint
            let resposta = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type':'application/json',
                },
            });
    
            //Exibe o erro caso a resposta da api seja diferente de ok(200 a 299) e exibe o erro no console
            if(!resposta.ok){
                console.error(`Erro ao recuperar os dados das ongs. Status: ${resposta.status}, Conteúdo: ${resposta.body}`);
                throw new Error(`Erro ao recuperar os dados das ongs, Status: ${resposta.status}, Conteúdo: ${resposta.body}`);
            }
    
            //Converte a resposta json pra uma variável
            let ongs = await resposta.json();
    
            //Se a api retorna uma lista vazia, exibe uma mensagem
            if(!ongs || ongs.length === 0){
                const container = document.getElementById('area-de-conteudo');
                container.innerHTML = '<p class="avisos"> Nenhuma ong foi encontrada.</p>';
            }

            //Controle de estrelas
            let estrela = 0;
    
            //Loop para inserir cada uma das ongs dentro da area de conteudo
            ongs.forEach(ong => {
                const {id, nome, descricao, email, telefone, link_img, link_site} = ong;
    
                //Define o card como um link para a página da ong passando o uuid
                const ongLink = document.createElement('a');
                ongLink.classList.add('ong');
                ongLink.href = `../PaginaONG/index.html?uuid=${id}`;
    
                //Inserção da ong no html seguindo essa estrutura
                ongLink.innerHTML = `
                    <div class="card cards" style="width: 18rem;" >
                        <img src="${link_img}" class="card-img-top card-img" alt="...">
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
                
                //Insere essa ong na area de conteudo
                const areaOng = document.getElementById('area-de-conteudo');
                areaOng.appendChild(ongLink);
    
                //Aumenta o numero das estrelas
                estrela= estrela+5;
            });
        } catch (error) {
            console.error(`Erro ao recuperar e emitir as ongs. Error: ${error}`);
            const areaOngs = document.getElementById('area-de-conteudo');
            //Exibe uma mensagem caso não seja posível recuperar as ongs
            areaOngs.innerHTML = '<p class="avisos">Não foi possível recuperar as Ongs. Nós desculpamos pela inconveniência</p>';
        }
    };

    //Chama a função assim que o código carregar
    pegarOngs();
});