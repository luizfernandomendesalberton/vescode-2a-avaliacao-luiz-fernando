function toggleSidenav() {
    if(sidenav) {
        sidenav.classList.toggle(' active ');
}
}
// Verifica se o botão de menu e o sidenav existem no DOM
const menuToggle = document.getElementById('menu-toggle');
const sidenav = document.getElementById('sidenav');

// Apenas adiciona o listener se os elementos forem encontrados
if (menuToggle && sidenav) {
    // Listener para clique
    menuToggle.addEventListener('click', function() {
        toggleSidenav();
    });

    // Listener para pressionar a tecla "Enter" (acessibilidade)
    menuToggle.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault(); // Evita que o navegador execute ações padrão ao pressionar "Enter"
            toggleSidenav();
        }
    });
}