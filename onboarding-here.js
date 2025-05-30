// onboarding-here.js
document.addEventListener('DOMContentLoaded', () => {
    const profileForm = document.querySelector('.profile-form');

    if (profileForm) { // Pastikan form ada di halaman ini
        profileForm.addEventListener('submit', function(event) {
            // Mencegah form melakukan submit dan reload halaman
            event.preventDefault();

            console.log('Onboarding (here) complete! Redirecting to home...');

            // Arahkan pengguna ke halaman home.html
            window.location.href = 'home.html';
        });
    }
});