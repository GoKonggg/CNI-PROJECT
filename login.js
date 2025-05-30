// login.js (Final Cleaned Version)

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. ELEMENT SELECTIONS ---
    // Semua elemen yang kita butuhkan kita pilih di sini.
    const tabContainer = document.querySelector('.tab-container');
    const loginForm = document.getElementById('login');
    const signupForm = document.getElementById('signup');
    const tabButtons = {
        login: document.querySelector('.tab-button[data-form="login"]'),
        signup: document.querySelector('.tab-button[data-form="signup"]')
    };
    const forms = {
        login: loginForm,
        signup: signupForm
    };

    // --- 2. TAB SWITCHING LOGIC ---
    // Logika untuk beralih antara tab Login dan Sign Up.
    function switchForm(formName) {
        for (const key in forms) {
            forms[key].classList.remove('active');
            tabButtons[key].classList.remove('active');
        }
        forms[formName].classList.add('active');
        tabButtons[formName].classList.add('active');
    }

    tabContainer.addEventListener('click', (event) => {
        const clickedButton = event.target.closest('.tab-button');
        if (clickedButton) {
            const formToShow = clickedButton.dataset.form;
            switchForm(formToShow);
        }
    });

    // --- 3. FORM SUBMISSION LOGIC ---

    // Logika untuk form Sign Up
    signupForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Mencegah reload halaman
        console.log('Sign Up form submitted! Redirecting to onboarding...');
        window.location.href = 'onboarding.html'; // Arahkan ke halaman onboarding
    });

    // Logika untuk form Login
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Mencegah reload halaman
        console.log('Login successful! Redirecting to home...');
        window.location.href = 'home.html'; // Arahkan ke halaman utama
    });


    // --- 4. INITIAL STATE ---
    // Atur form 'Login' sebagai tampilan default saat halaman pertama kali dibuka.
    switchForm('login'); 
});