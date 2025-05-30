// onboarding.js
document.addEventListener('DOMContentLoaded', () => {
    const profileForm = document.querySelector('.profile-form');

    profileForm.addEventListener('submit', function(event) {
        // Mencegah form melakukan submit dan reload halaman
        event.preventDefault();

        // Cek nilai dari pilihan 'My baby is' yang dipilih
        const babyStatus = document.querySelector('input[name="baby_status"]:checked').value;

        console.log('User selected:', babyStatus);

        // Arahkan ke halaman yang sesuai berdasarkan pilihan
        if (babyStatus === 'here') {
            window.location.href = 'onboarding-here.html';
        } else {
            window.location.href = 'onboarding-ontheway.html';
        }
    });
});