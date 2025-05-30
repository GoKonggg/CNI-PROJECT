// login.js
document.addEventListener('DOMContentLoaded', () => {
    const tabContainer = document.querySelector('.tab-container');
    const forms = {
        login: document.getElementById('login'),
        signup: document.getElementById('signup')
    };
    const tabButtons = {
        login: document.querySelector('.tab-button[data-form="login"]'),
        signup: document.querySelector('.tab-button[data-form="signup"]')
    };

    // Fungsi untuk beralih form
    function switchForm(formName) {
        // Sembunyikan semua form dan non-aktifkan semua tombol
        for (const key in forms) {
            forms[key].classList.remove('active');
            tabButtons[key].classList.remove('active');
        }

        // Tampilkan form yang dipilih dan aktifkan tombol yang sesuai
        forms[formName].classList.add('active');
        tabButtons[formName].classList.add('active');
    }

    // Tambahkan event listener ke container tombol
    tabContainer.addEventListener('click', (event) => {
        const clickedButton = event.target.closest('.tab-button');
        if (clickedButton) {
            const formToShow = clickedButton.dataset.form;
            switchForm(formToShow);
        }
    });

    // Atur form default saat halaman dimuat
    switchForm('login');
});