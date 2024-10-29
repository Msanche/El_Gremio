<template>

  <!-- Modales import-->
  <ModalRegistroCorrecto />
  <ResetPass/>
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
            <input type="email" name="email" placeholder="Correo electrónico" v-model="email" required>
            <input type="password" name="password" placeholder="Contraseña" v-model="password" required>
            <button type="submit">Iniciar Sesión</button>
          </form>
          <div v-if="loginError">
            <span>Correo o contraseña incorrectos</span>
          </div>
          <p class="toggle-form" id="showRegister" @click="Toggle_form">¿No tienes cuenta? Regístrate aquí</p>
          <p class="toggle-form" id="forgot_password" @click="ResetPass">Olvidé mi contraseña</p>

        </div>
      </transition>
      <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
        <div v-if="!login" class="register-form" key="register">
          <h2>Registrarse</h2>
          <form @submit.prevent="Registro" needs-validation>
            <div class="user-type-option" :class="{ active: selectedType === 'cliente' }" data-type="cliente"
              @click="selectType('cliente')">
              Cliente
            </div>
            <div class="user-type-option" :class="{ active: selectedType === 'vendedor' }" data-type="vendedor"
              @click="selectType('vendedor')">
              Vendedor
            </div>
            <input type="text" name="nombre" placeholder="Nombre" v-model="nombre" required>
            <input type="text" name="apellidos" placeholder="Apellidos" v-model="apellidos" required>
            <input type="email" name="email" placeholder="Correo electrónico" v-model="email" required>
            <input type="number" name="telefono" placeholder="Teléfono" v-model="tel" required>
            <div v-if="selectedType === 'vendedor'">
              <!-- Opciones para Vendedor -->
              <input type="text" name="nombre_marca" placeholder="Nombre de marca" v-model="nombre_marca" required>
              <div class="form-group">
                <label for="productImage">Logo de la marca:</label>
                <div class="file-input-wrapper">
                  <button class="btn-file-input" type="button" @click="selectFile">Seleccionar Imagen</button>
                  <input type="file" id="productImage" ref="productImage" accept="image/*" required
                    @change="handleFileChange" style="display: none" />
                </div>
                <span class="file-input-name">{{ fileName }}</span>
                <p class="help-text">Seleccione una imagen clara (formatos: JPG, PNG)</p>
              </div>

              <!-- Miniatura de la imagen -->
              <div v-if="imagePreview" class="image-preview">
                <img :src="imagePreview" alt="Vista previa de la imagen" />
              </div>
            </div>

            <div class="input-group">
              <input :type="mostrarContrasena ? 'text' : 'password'" name="password" placeholder="Contraseña"
                v-model="password" required>
              <!-- Ícono para mostrar/ocultar contraseña -->
              <i :class="mostrarContrasena ? 'fas fa-eye-slash' : 'fas fa-eye'" class="toggle-icon"
                @click="toggleMostrarContrasena"></i>

            </div>

            <div class="input-group">
              <input :type="mostrarContrasena ? 'text' : 'password'" name="confirm_password"
                placeholder="Repetir Contraseña" v-model="confirm_password" required>
              <!-- Ícono para mostrar/ocultar contraseña -->
              <i :class="mostrarContrasena ? 'fas fa-eye-slash' : 'fa-regular fa-eye'" class="toggle-icon"
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
import axios from "axios";
import router from "@/router";
import ResetPass from "@/components/ResetPass.vue";
export default {
  name: 'LoginView',
  data() {
    return {
      login: true,
      password: '',          // Variable para almacenar la contraseña
      mostrarContrasena: false, // Estado para controlar si se muestra u oculta la contraseña,
      nombre: '',
      apellidos: '',
      email: '',
      tel: '',
      nombre_marca: '',
      selectedType: 'cliente', // Valor inicial
      loginError: false,
      fileName: '',
      imagePreview: '', // Para la vista previa de la imagen
      selectedFile: null,

    }
  },
  components: {
    ModalRegistroCorrecto,
    ResetPass
  },
  methods: {
    PassForgoten() {
      console.log("entró")
      router.push('/ResetPassword')
    },
    selectType(type) {
      this.selectedType = type;
    },
    toggleMostrarContrasena() {
      // Alternar el estado de mostrarContrasena
      this.mostrarContrasena = !this.mostrarContrasena;
    },
    selectFile() {
      this.$refs.productImage.click();
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      this.selectedFile = event.target.files[0];
      this.fileName = file?.name || '';
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreview = e.target.result; // Establecer la imagen de vista previa
        };
        reader.readAsDataURL(file);
      } else {
        this.imagePreview = ''; // Reiniciar si no se selecciona archivo
      }
    },
    async Iniciar_sesion() {
      console.log("Iniciando sesión ");
      let login, respuesta
      try {
        login = {
          correo: this.email,
          contrasena: this.password
        }
        respuesta = await axios.post('http://localhost:3000/usuarios', {
          login
        });
        if (respuesta) {
          this.loginError = false
          let payload = "inicio de sesión"
          this.$store.commit('LoginRegistro', payload);
          this.ModalExito();

          const usuario = {
            token: respuesta.data.token,
            correo: this.email,
            nombre: respuesta.data.nombre,
            role: respuesta.data.role
          };
          localStorage.setItem('correo', (usuario.correo));
          localStorage.setItem('token', (usuario.token));
          localStorage.setItem('role', (usuario.role));
          localStorage.setItem('nombre', (usuario.nombre));


        }
      } catch (error) {
        this.loginError = true
        console.error("correo o contraseña incorrectos", login)
      }



    },
    async Registro() {
      let respuesta

      try {
        // Datos del usuario que quieres enviar en el body
        const usuario = {
          correo: this.email,
          nombre: this.nombre,
          apellido: this.apellidos,
          numeroCelular: this.tel,
          contrasena: this.password
        };
        if (this.selectedType == 'vendedor') {
          const formData = new FormData();
          formData.append('usuario', JSON.stringify(usuario));
          formData.append('nombre_marca', this.nombre_marca);
          formData.append('imagen', this.selectedFile); // `selectedFile` es el archivo de imagen seleccionado

          // Hacer la solicitud POST
          respuesta = await axios.post('http://localhost:3000/usuarios-vendedores', formData, {
            headers: {
              'Content-Type': 'multipart/form-data' // Aunque Axios lo establece automáticamente, es buena práctica
            }
          });

        } else {
          // Hacer la solicitud POST
          console.log(usuario)
          respuesta = await axios.post('http://localhost:3000/usuarios-clientes', usuario);

        }
        if (respuesta) {
          let payload = "Registro"
          this.$store.commit('LoginRegistro', payload);
          this.ModalExito();

        }



        // Manejo de la respuesta
        console.log('Usuario creado:', respuesta.data);
      } catch (error) {
        // Manejo de errores
        if (error.response) {
          console.error('Error en la respuesta:', error.response.data);
        } else if (error.request) {
          console.error('Error en la solicitud:', error.request);
        } else {
          console.error('Error:', error.message);
        }
      }



    },
    ModalExito() {

      const modalElement = document.getElementById("Registro/Login_Exitoso");
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    },

    ResetPass() {

      const modalElement = document.getElementById("ResetPass");
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
    },
    LogOut() {
      localStorage.clear();
    }
  },
  mounted() {
    this.LogOut();
  }

}


</script>

<style scoped>
.image-preview img {
  max-width: 100%;
  max-height: 200px;
  /* Limitar la altura de la vista previa */
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 20px;
}

.user-type-option {
  flex: 1;
  text-align: center;
  padding: 10px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  cursor: pointer;
  transition: background-color 0.3s;
}

.user-type-option.active {
  background-color: #c69c6d;
  color: white;
}

.user-type-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

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
  position: relative;
  /* Necesario para posicionar el ícono dentro del input */
  display: flex;
  align-items: center;
}

input {
  padding: 8px 35px 8px 8px;
  /* Espacio adicional para el ícono */
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 100%;
}

.toggle-icon {
  position: absolute;
  /* Posiciona el ícono dentro del input */
  right: 10px;
  /* Ajusta la posición del ícono a la derecha */
  cursor: pointer;
  color: #888;
}

.toggle-icon:hover {
  color: #555;
}
</style>
