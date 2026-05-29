// Aguarda o carregamento do documento
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. SCROLL SUAVE PARA OS LINKS DO MENU
    const links = document.querySelectorAll('nav a');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 70, // Ajuste por causa do menu fixo
                behavior: 'smooth'
            });
        });
    });

    // 2. EFEITO DE APARECER AO ROLAR (REVEAL ON SCROLL)
    const cards = document.querySelectorAll('.card');
    
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });

    const calculaButton = document.getElementById('calcular-ndvi');
    const nirInput = document.getElementById('nir-valor');
    const redInput = document.getElementById('red-valor');
    const resultadoOutput = document.getElementById('resultado-ndvi');
    const scrollTecnologia = document.getElementById('scroll-tecnologia');
    const modal = document.getElementById('detail-modal');
    const modalClose = document.getElementById('modal-close');
    const modalText = document.getElementById('modal-text');
    const detailButtons = document.querySelectorAll('.detail-button');

    if (scrollTecnologia) {
        scrollTecnologia.addEventListener('click', () => {
            const targetSection = document.getElementById('tecnologia');
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    }

    detailButtons.forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.card');
            if (!card || !modal || !modalText) return;
            const detailText = card.dataset.detail || 'Mais informações sobre essa tecnologia em breve.';
            modalText.textContent = detailText;
            modal.classList.add('show');
            modal.setAttribute('aria-hidden', 'false');
        });
    });

    if (modalClose && modal) {
        modalClose.addEventListener('click', () => {
            modal.classList.remove('show');
            modal.setAttribute('aria-hidden', 'true');
        });
    }

    if (modal) {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.classList.remove('show');
                modal.setAttribute('aria-hidden', 'true');
            }
        });
    }

    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.dataset.tab;
            if (!targetId) return;

            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));

            button.classList.add('active');
            const targetPanel = document.getElementById(targetId);
            if (targetPanel) targetPanel.classList.add('active');
        });
    });

    if (calculaButton && nirInput && redInput && resultadoOutput) {
        calculaButton.addEventListener('click', () => {
            const nir = parseFloat(nirInput.value);
            const red = parseFloat(redInput.value);

            if (isNaN(nir) || isNaN(red) || nir < 0 || red < 0) {
                resultadoOutput.textContent = 'Por favor, informe valores válidos de NIR e RED.';
                return;
            }

            const ndvi = (nir - red) / (nir + red);
            const situacao = calcularSaudeSolo(nir, red);
            resultadoOutput.textContent = `NDVI: ${ndvi.toFixed(3)} — ${situacao}`;
        });
    }

    console.log("Sistema de Mapeamento Agro carregado com sucesso!");
});

// 3. FUNÇÃO PARA SIMULAR CÁLCULO DE SAÚDE DO SOLO (Pode ser usada num botão futuramente)
function calcularSaudeSolo(nir, red) {
    let ndvi = (nir - red) / (nir + red);
    if (ndvi > 0.6) return "Solo/Vegetação Muito Saudável";
    if (ndvi > 0.2) return "Solo com Vegetação Moderada";
    return "Solo Exposto ou Degradado";
}