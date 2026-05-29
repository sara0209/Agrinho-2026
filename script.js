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

    console.log("Sistema de Mapeamento Agro carregado com sucesso!");
});

// 3. FUNÇÃO PARA SIMULAR CÁLCULO DE SAÚDE DO SOLO (Pode ser usada num botão futuramente)
function calcularSaudeSolo(nir, red) {
    let ndvi = (nir - red) / (nir + red);
    if (ndvi > 0.6) return "Solo/Vegetação Muito Saudável";
    if (ndvi > 0.2) return "Solo com Vegetação Moderada";
    return "Solo Exposto ou Degradado";
}