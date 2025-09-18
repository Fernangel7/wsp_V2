const toRegister = document.getElementById('to-register')
const toLogin = document.getElementById('to-login')
const flipCard = document.querySelector('.flip-card__inner')
const forgotPassword = document.getElementById('forgot-password')
const loginBtn = document.getElementById('login_btn')
const signinBtn = document.getElementById('signin_btn')

const usernameLogin = document.querySelector('.login_username')
const passwordLogin = document.querySelector('.login_password')

toRegister.addEventListener('click', () => {
  flipCard.style.cssText = 'transform: rotateY(180deg); scale: 0.85; top: -7.5vh;'
})

toLogin.addEventListener('click', () => {
  flipCard.style.cssText = 'transform: rotateY(0deg); scale: 1;'
})

forgotPassword.addEventListener('click', () => {
  /* eslint-disable */
  alert('Redirigiendo a la página de recuperación de contraseña...')
  /* eslint-enable */
})

loginBtn.addEventListener('click', (e) => {
  e.preventDefault()
  /* eslint-disable */
  axios.post('/auth/signin', {
    username: usernameLogin.value,
    password: passwordLogin.value
  }).then(response => {
    const data = response.data
    if (data.status !== 'Success!') {
      console.log(data)
      swal.fire({
        title: data.status,
        text: data.message,
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
    } else location.reload()
    /* eslint-enable */
  })
})

signinBtn.addEventListener('click', (e) => {
  e.preventDefault()
})
