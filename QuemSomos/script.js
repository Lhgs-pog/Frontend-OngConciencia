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