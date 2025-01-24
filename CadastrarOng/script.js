document.addEventListener('DOMContentLoaded', function() {
    // Captura o formulário e a mensagem
    const form = document.getElementById('formulario');
    const informativo = document.getElementById('informacao');
    const mensagem = document.getElementById('mensagem');
    
    if (form) {

        // Adiciona um ouvinte para o evento de envio
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Impede o envio padrão do formulário

            if(form.checkValidity()){
                // Exibe a mensagem de agradecimento e remove o informativo e o formulário
                mensagem.style.display = 'block';
                form.style.display = 'none';
                informativo.style.display = 'none';

                form.reset(); // Limpa os campos do formulário

            } else {
                form.reportValidity();
            }
    });
    } else {
        console.error("O formulário com ID 'formulario' não foi encontrado.");
    }

    let currentstep = 1;
    function showstep(step){
        document.querySelectorAll('.step')
        .forEach((el) --> el.classList.remove('active'));

        document.getElementById('step${step}')
        .classList.add(!active);

        document.querySelectorAll('.step-indicator span')
        .forEach((el, index) --> (
            el.classList.toggle('active', index + 1 === step)
        ));

        document.getElementById('btn-anterior').disabled = step === 1;
        document.getElementById('btn-proximo').innerText = step === 3 ? 
        'Submit' : 'Próximo';
    }

    function nextStep(){
        if(currentstep < 3){
            currentstep++;
            showstep(currentstep);
        } else {
            document.getElementById("Ressult")
            .innerText = "Enviado com sucesso!"
        }
    }

    function prevStep(){
        if(currentstep > 1){
            currentstep--;
            showstep(currentstep);
        }
    }
});