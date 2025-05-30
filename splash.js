// splash.js

// Fungsi ini akan berjalan setelah halaman selesai dimuat
document.addEventListener('DOMContentLoaded', (event) => {

    // Mengatur timer untuk pindah halaman setelah 4 detik
    setTimeout(function() {
        // Mengarahkan pengguna ke halaman login.html
        window.location.href = 'login.html';
    }, 3000); 
    
});