document.querySelectorAll('body').forEach(e => {
  e.addEventListener('click', e => {
    const target = e.target

    switch (target.id) {
      case '#to-register': {
        document.querySelector('.flip-card__inner').style.transform = 'rotateY(180deg)'
        break
      }
      case '#to-login': {
        document.querySelector('.flip-card__inner').style.transform = 'rotateY(0deg)'
        break
      }
      case '#login_btn': {
        axios.post('/signin', {
          username: document.querySelector('.login_username').value,
          password: document.querySelector('.login_password').value
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
        break
      }
    }
  })
})
