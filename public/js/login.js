import axios from 'axios'
import Swal from 'sweetalert2'

const toRegister = document.getElementById('to-register')
const toLogin = document.getElementById('to-login')
const flipCard = document.querySelector('.flip-card__inner')
const forgotPassword = document.getElementById('forgot-password')
const loginBtn = document.getElementById('login_btn')
// const signinBtn = document.getElementById('signin_btn')

const usernameLogin = document.querySelector('.login_username').value
const passwordLogin = document.querySelector('.login_password').value

toRegister.addEventListener('click', () => {
  flipCard.style.transform = 'rotateY(180deg)'
})

toLogin.addEventListener('click', () => {
  flipCard.style.transform = 'rotateY(0deg)'
})

forgotPassword.addEventListener('click', () => {
})

loginBtn.addEventListener('click', (e) => {
  e.preventDefault()
  axios.post('/signin', {
    username: usernameLogin,
    password: passwordLogin
  }).then(response => {
    if (response.data === 'Success') {
      window.location.href = '/dashboard'
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Usuario o contraseña incorrecta',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#0d6efd',
        background: '#1a1a1a',
        color: '#d1d1d1',
        timer: 3000,
        timerProgressBar: true,
        showClass: { popup: 'animate__animated animate__fadeInDown' },
        hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        position: 'top-end',
        toast: true,
        showConfirmButton: false,
        width: '300px',
        padding: '1rem'
      })
    }
  })
})
