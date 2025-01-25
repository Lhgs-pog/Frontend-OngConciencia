document.addEventListener('DOMContentLoaded', function () {
    // Variável que controla qual etapa está ativa
    let currentstep = 1;

    /**
     * Função que exibe a etapa atual do formulário.
     * Ela altera a visibilidade dos campos e atualiza os indicadores de etapa.
     */
    function showstep(step) {
        // Remove a classe 'active' de todas as etapas (todas ficam escondidas)
        document.querySelectorAll('.step').forEach(el => el.classList.remove('active'));

        // Adiciona a classe 'active' apenas na etapa atual
        document.getElementById(`step${step}`).classList.add('active');

        // Atualiza os indicadores de etapa (os números no topo)
        document.querySelectorAll('.step-indicator span').forEach((el, index) => {
            // Adiciona a classe 'active' ao indicador da etapa atual
            el.classList.toggle('active', index + 1 === step);
        });

        // Atualiza os botões de navegação
        document.getElementById('btn-anterior').disabled = step === 1; // Desativa o botão "Anterior" na primeira etapa
        document.getElementById('btn-proximo').innerText = step === 3 ? 'Submit' : 'Próximo'; // Muda o texto para "Submit" na última etapa
    }

    /**
     * Função que valida os campos obrigatórios da etapa atual.
     * Retorna `true` se todos os campos da etapa estiverem preenchidos corretamente.
     */
    function validateStep(step) {
        // Seleciona a etapa atual
        const stepElement = document.getElementById(`step${step}`);
        // Seleciona todos os campos de entrada (inputs) dessa etapa
        const inputs = stepElement.querySelectorAll('input');
        
        // Verifica se cada campo é válido
        for (const input of inputs) {
            if (!input.checkValidity()) { // Se o campo for inválido
                alert(`Preencha o campo: ${input.placeholder}`); // Mostra uma mensagem de alerta
                return false; // Retorna falso para bloquear o avanço
            }
        }
        return true; // Todos os campos estão válidos
    }

    /**
     * Função que avança para a próxima etapa.
     * Valida os campos antes de permitir a navegação.
     */
    function nextStep() {
        if (!validateStep(currentstep)) return; // Se a validação falhar, interrompe a execução

        if (currentstep < 3) {
            currentstep++; // Avança para a próxima etapa
            showstep(currentstep); // Mostra a nova etapa
        } else {
             // Exibe a mensagem de agradecimento
            const resultElement = document.getElementById("result");
            if (resultElement) {
                resultElement.innerText = "Enviado com sucesso!";
                resultElement.style.display = "block"; // Mostra o elemento
            }

            // Esconde o formulário após o envio
            document.getElementById("formulario").style.display = "none";
            //mostra a mensagem de agradecimento
            document.getElementById("mensagem").style.display = "block";
        }
    }

    /**
     * Função que volta para a etapa anterior.
     */
    function prevStep() {
        if (currentstep > 1) {
            currentstep--; // Volta para a etapa anterior
            showstep(currentstep); // Mostra a etapa anterior
        }
    }

    // Torna as funções acessíveis no escopo global (necessário para os botões)
    window.nextStep = nextStep;
    window.prevStep = prevStep;
});
