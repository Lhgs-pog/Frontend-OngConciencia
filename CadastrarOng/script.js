 // Captura o formulário e a mensagem
 const form = document.getElementById('formulario');
 const informativo = document.getElementById('informacao')
 const mensagem = document.getElementById('mensagem');

 // Adiciona um ouvinte para o evento de envio
 form.addEventListener('submit', function(event) {
     event.preventDefault(); // Impede o envio padrão do formulário
     
     // Exibe a mensagem de agradecimento e remove o informativo e o formulário
     mensagem.style.display = 'block';
     form.style.display= 'none';
     informativo.style.display= 'none';

     // Opcional: limpa os campos do formulário
     form.reset();
 });