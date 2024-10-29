<template>
  <!-- Modal -->
  <div class="modal fade" id="ResetPass" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">

        <div class="modal-body">
            <div class="recovery-window">
              <div class="window-header">
                <div class="window-title">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                  Recuperar Contraseña
                </div>

              </div>

              <div class="recovery-content">
                <div class="step-indicator">
                  <div class="step" :class="active1" data-step="1">
                    <div class="step-circle">1</div>
                    <div class="step-label">Email</div>
                  </div>
                  <div class="step" :class="active2" data-step="2">
                    <div class="step-circle">2</div>
                    <div class="step-label">Verificación</div>
                  </div>
                  <div class="step" :class="active3" data-step="3">
                    <div class="step-circle">3</div>
                    <div class="step-label">Nueva Contraseña</div>
                  </div>
                </div>

                <form id="recoveryForm">
                  <div v-if="step1" class="form-section">
                    <p class="info-text">Ingresa tu dirección de correo electrónico y te enviaremos un código de
                      verificación para restablecer tu contraseña.</p>
                    <div class="form-group">
                      <label for="email">Correo Electrónico</label>
                      <input type="email" id="email" name="email" required placeholder="ejemplo@correo.com"
                        autocomplete="email">
                    </div>
                  </div>

                  <div v-if="step2" class="form-section" style="display: none;">
                    <p class="info-text">Hemos enviado un código de verificación a tu correo electrónico. Por favor,
                      ingrésalo a continuación:</p>
                    <div class="verification-inputs">
                      <input type="text" maxlength="1" pattern="[0-9]" required>
                      <input type="text" maxlength="1" pattern="[0-9]" required>
                      <input type="text" maxlength="1" pattern="[0-9]" required>
                      <input type="text" maxlength="1" pattern="[0-9]" required>
                      <input type="text" maxlength="1" pattern="[0-9]" required>
                      <input type="text" maxlength="1" pattern="[0-9]" required>
                    </div>
                  </div>

                  <div v-if="step3" class="form-section" style="display: none;">
                    <p class="info-text">Ingresa tu nueva contraseña.</p>
                    <div class="form-group">
                      <label for="newPassword">Nueva Contraseña</label>
                      <input type="password" id="newPassword" name="newPassword" required placeholder="••••••••">
                    </div>
                    <div class="form-group">
                      <label for="confirmPassword">Confirmar Contraseña</label>
                      <input type="password" id="confirmPassword" name="confirmPassword" required
                        placeholder="••••••••">
                    </div>
                  </div>

                  <div id="success" class="form-section" style="display: none;">
                    <div class="success-message">
                      <svg class="success-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <h3>¡Contraseña Actualizada!</h3>
                      <p>Tu contraseña ha sido actualizada exitosamente.</p>
                    </div>
                  </div>

                  <div class="action-buttons">
                    <button type="button" class="btn btn-outline" id="backBtn" style="display: none;">Atrás</button>
                    <button type="button" class="btn btn-primary" id="nextBtn">Continuar</button>
                  </div>
                </form>
              </div>

              <div class="status-bar">
                Conexión segura
              </div>
            </div>

        </div>
      </div>
    </div>
  </div>


</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      message: '',
      step1: true,
      step2: false,
      step3: false,
      active1:'active',
      active2:'',
      active3:''
    };
  },
  methods: {
    async requestPasswordReset() {
      try {
        const response = await axios.post('http://localhost:3000/request-password-reset', { email: this.email });
        this.message = response.data.message;
      } catch (error) {
        this.message = 'Error al enviar solicitud';
      }
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.navbar {
  background: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-brand {
  color: #8B4513;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
}



.recovery-window {
  background: white;
  border-radius: 1rem;
  position: relative;
  animation: slideIn 0.5s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.window-header {
  background: #FDF5E6;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  border-radius: 1rem 1rem 0 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.window-title {
  color: #3E2723;
  font-size: 1.25rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.window-controls {
  display: flex;
  gap: 0.5rem;
}

.window-button {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  transition: transform 0.2s;
}

.window-button:hover {
  transform: scale(1.1);
}

.close {
  background: #A0522D;
}

.minimize {
  background: #DAA520;
}

.maximize {
  background: #8B4513;
}

.recovery-content {
  padding: 2rem;
}

.step-indicator {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  position: relative;
}

.step-indicator::before {
  content: '';
  position: absolute;
  top: 15px;
  left: 0;
  right: 0;
  height: 2px;
  background: #e5e7eb;
  z-index: 1;
}

.step {
  position: relative;
  z-index: 2;
  background: white;
  padding: 0 0.5rem;
}

.step-circle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: white;
  border: 2px solid #DEB887;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
  transition: all 0.3s;
}

.step.active .step-circle {
  background: #8B4513;
  border-color: #8B4513;
  color: white;
}

.step-label {
  font-size: 0.875rem;
  color: #3E2723;
  text-align: center;
}

.form-section {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  color: #3E2723;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.2s;
}

.form-group input:focus {
  outline: none;
  border-color: #8B4513;
  box-shadow: 0 0 0 3px rgba(139, 69, 19, 0.1);
}

.info-text {
  color: #3E2723;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
}

.verification-inputs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.verification-inputs input {
  width: 3rem;
  height: 3rem;
  text-align: center;
  font-size: 1.25rem;
  border: 2px solid #d1d5db;
  border-radius: 0.5rem;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background: #8B4513;
  color: white;
  border: none;
  flex: 1;
}

.btn-primary:hover {
  background: #D2691E;
}

.btn-outline {
  background: transparent;
  border: 1px solid #8B4513;
  color: #8B4513;
}

.btn-outline:hover {
  background: #FDF5E6;
}

.status-bar {
  background: #FDF5E6;
  padding: 0.75rem 1.5rem;
  border-top: 1px solid #e2e8f0;
  border-radius: 0 0 1rem 1rem;
  font-size: 0.875rem;
  color: #3E2723;
}

.success-message {
  text-align: center;
  padding: 2rem;
}

.success-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 1rem;
  color: #8B4513;
}
</style>