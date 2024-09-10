<template>

  <!-- Modales import-->
  <ModalRegistroCorrecto />

  <header class="header">
    <img src="@/images/logo.jpg" alt="El Gremio Logo - A shield with wings and a central emblem" class="logo">
    <h1>El Gremio</h1>
    <p class="subtitle">Llevando la Tradición al Mundo Digital</p>
  </header>



  <div class="container">
    <div class="form-container" id="formContainer">
      <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
        <div v-if="login" class="login-form" key="login">
          <h2>Iniciar Sesión</h2>
          <form @submit.prevent="Iniciar_sesion" needs-validation>
            <input type="email" name="email" placeholder="Correo electrónico" required>
            <input type="password" name="password" placeholder="Contraseña" required>
            <button type="submit">Iniciar Sesión</button>
          </form>
          <p class="toggle-form" id="showRegister" @click="Toggle_form">¿No tienes cuenta? Regístrate aquí</p>
          <p class="toggle-form" id="forgot_password">Olvidé mi contraseña</p>

        </div>
      </transition>
      <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
        <div v-if="!login" class="register-form" key="register">
          <h2>Registrarse</h2>
          <form @submit.prevent="Registro" needs-validation>
            <input type="text" name="nombre" placeholder="Nombre" required>
            <input type="text" name="apellidos" placeholder="Apellidos" required>
            <input type="email" name="email" placeholder="Correo electrónico" required>
            <input type="number" name="telefono" placeholder="Teléfono" required>

            <div class="input-group">
              <input :type="mostrarContrasena ? 'text' : 'password'" name="password" placeholder="Contraseña"
                v-model="password" required>
              <!-- Ícono para mostrar/ocultar contraseña -->
              <!-- <i :class="mostrarContrasena ? 'fas fa-eye-slash' : 'fas fa-eye'" class="toggle-icon"
                @click="toggleMostrarContrasena"></i> -->
                <i class="fas fa-eye-slash" 
                @click="toggleMostrarContrasena"></i>
            </div>

            <div class="input-group">
              <input :type="mostrarContrasena ? 'text' : 'password'" name="confirm_password"
                placeholder="Repetir Contraseña" v-model="confirm_password" required>
              <input :type="mostrarContrasena ? 'text' : 'password'" name="password" placeholder="Contraseña"
                v-model="password" required>
              <!-- Ícono para mostrar/ocultar contraseña -->
              <i :class="mostrarContrasena ? 'fas fa-eye-slash' : 'fas fa-eye'" class="toggle-icon"
                @click="toggleMostrarContrasena"></i>
            </div>
            <button type="submit">Registrarse</button>
          </form>
          <p class="toggle-form" id="showLogin" @click="Toggle_form()">¿Ya tienes cuenta? Inicia sesión aquí</p>

        </div>
      </transition>
    </div>
  </div>

  <footer class="footer">
    <p> 2023 El Gremio. Todos los derechos reservador </p>
  </footer>
</template>

<script>
import bootstrap from "bootstrap/dist/js/bootstrap.min.js";
import ModalRegistroCorrecto from "@/components/ModalRegistroCorrecto.vue";

export default {
  name: 'LoginView',
  data() {
    return {
      login: true,
      contrasena: '',          // Variable para almacenar la contraseña
      mostrarContrasena: false // Estado para controlar si se muestra u oculta la contraseña
    }
  },
  components: {
    ModalRegistroCorrecto
  },
  methods: {
    toggleMostrarContrasena() {
      // Alternar el estado de mostrarContrasena
      this.mostrarContrasena = !this.mostrarContrasena;
    },
    Iniciar_sesion() {
      console.log("Iniciando sesión ");
    },
    Registro() {

      const modalElement = document.getElementById("RegistroExitoso");
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    },
    Toggle_form() {
      this.login = !this.login;
    },
    beforeEnter(el) {
      el.style.opacity = 0;
      el.style.transform = 'translateY(-10px)';
    },
    enter(el, done) {
      el.offsetHeight; // Forzar reflujo para reiniciar la transición
      el.style.transition = 'opacity 0.5s, transform 0.5s';
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
      done();
    },
    leave(el, done) {
      el.style.transition = 'opacity 0.5s, transform 0.5s';
      el.style.opacity = 0;
      el.style.transform = 'translateY(10px)';
      done();
    }
  }

}


</script>

<style scoped>
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f0f0f0;
  color: #333;
}

.header {
  background: linear-gradient(135deg, #c69c6d 0%, #8b4513 100%);
  color: white;
  text-align: center;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.logo {
  width: 120px;
  height: 120px;
  margin: 0 auto 20px;
  display: block;
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.5));
}

h1 {
  margin: 0;
  font-size: 2.5em;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.subtitle {
  font-style: italic;
  margin-top: 10px;
  font-size: 1.2em;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
}

.form-container {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 400px;
  position: relative;
  overflow: visible;
}

h2 {
  color: #8b4513;
  border-bottom: 2px solid #c69c6d;
  padding-bottom: 10px;
  margin-top: 0;
}

form {
  display: flex;
  flex-direction: column;
}

input,
button {
  margin: 10px 0;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
}

button {
  background-color: #8b4513;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #a0522d;
}

.footer {
  background-color: #333;
  color: white;
  text-align: center;
  padding: 20px;
  margin-top: 40px;
}

.nav {
  background-color: #f8f8f8;
  padding: 10px 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.nav ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
}

.nav li {
  margin: 0 15px;
}

.nav a {
  text-decoration: none;
  color: #8b4513;
  font-weight: bold;
  transition: color 0.3s;
}

.nav a:hover {
  color: #c69c6d;
}

.toggle-form {
  text-align: center;
  margin-top: 20px;
  color: #8b4513;
  cursor: pointer;
  transition: color 0.3s;
}

.toggle-form:hover {
  color: #c69c6d;
  text-decoration: underline;
}

.login-form {
  opacity: 1;
  max-height: 1000px;
}

.register-form {
  opacity: 1;
  max-height: 1000px;
}


.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active in <2.1.8 */
  {
  opacity: 0;
  transform: translateY(10px);
}

.input-group {
  position: relative; /* Necesario para posicionar el ícono dentro del input */
  display: flex;
  align-items: center;
}

input {
  padding: 8px 35px 8px 8px; /* Espacio adicional para el ícono */
  font-size: 14px;
  border: 1px solid  #ddd;
  border-radius: 5px;
  width: 100%;
}

.toggle-icon {
  position: absolute; /* Posiciona el ícono dentro del input */
  right: 10px; /* Ajusta la posición del ícono a la derecha */
  cursor: pointer;
  color: #888;
}

.toggle-icon:hover {
  color: #555;
}
</style>
