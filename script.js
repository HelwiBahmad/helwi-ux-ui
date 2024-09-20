const cpfInput = document.getElementById('cpf');
cpfInput.addEventListener('input', () => {
    let cpf = cpfInput.value.replace(/\D/g, ''); 
    if (cpf.length > 11) cpf = cpf.slice(0, 11); 

    if (cpf.length > 9) {
        cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    } else if (cpf.length > 6) {
        cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})/, "$1.$2.$3");
    } else if (cpf.length > 3) {
        cpf = cpf.replace(/(\d{3})(\d{3})/, "$1.$2");
    }
    
    cpfInput.value = cpf;
    validarCPF(); 
});


function validarCPF() {
    const cpfInput = document.getElementById('cpf');
    const cpf = cpfInput.value.replace(/\D/g, ''); // Remove qualquer caractere que não seja número
    const cadastrarBtn = document.getElementById('cadastrarBtn');

    if (cpf.length === 11 && isValidCPF(cpf)) {
        cpfInput.style.borderColor = 'green';
        cadastrarBtn.disabled = false;
    } else {
        cpfInput.style.borderColor = 'red';
        cadastrarBtn.disabled = true;
    }
}



function isValidCPF(cpf) {
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;

    return true;
}

const telefoneInput = document.getElementById('telefone');
telefoneInput.addEventListener('input', () => {
    let telefone = telefoneInput.value.replace(/\D/g, ''); 
    if (telefone.length > 11) telefone = telefone.slice(0, 11); 


    if (telefone.length > 6) {
        telefone = telefone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    } else if (telefone.length > 2) {
        telefone = telefone.replace(/(\d{2})(\d{5})/, "($1) $2");
    } else if (telefone.length > 0) {
        telefone = telefone.replace(/(\d{2})/, "($1");
    }
    
    telefoneInput.value = telefone; 
});

function startCountdown(endDate) {
    const timerElement = document.getElementById('timer');

    function updateTimer() {
        const now = new Date().getTime();
        const distance = endDate - now;

        if (distance < 0) {
            clearInterval(interval);
            timerElement.innerHTML = "Período de cadastramento encerrado";
            document.getElementById('cadastroForm').style.display = 'none';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        timerElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    const interval = setInterval(updateTimer, 1000);
}

const endDate = new Date('2024-09-07T00:00:00').getTime();
startCountdown(endDate);


document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    window.location.href = 'sucesso.html';
});