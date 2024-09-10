<template>
    <div class="modal fade" id="Registro/Login_Exitoso" tabindex="-1" aria-labelledby="RegistroExitosoLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">

                <div class="modal-body d-flex justify-content-center">
                    <div id="successModal">
                        <div class="d-flex justify-content-end">
                            <button type="button" class="btn-close d-flex justify-content-end" @click="closeModal"
                                aria-label="Close"></button>
                        </div>
                        <div class="d-flex justify-content-center">
                            <svg class="modal-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="11" stroke="#8b4513" stroke-width="2" />
                                <path d="M7 13l3 3 7-7" stroke="#8b4513" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                        </div>
                        <div class="modal-body d-flex justify-content-center">
                            <h2 class="modal-title">¡{{ Actividad }} Exitoso!</h2>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    </div>

</template>

<script>
import bootstrap from "bootstrap/dist/js/bootstrap.min.js";

export default {
    data() {
        return {
            Actividad:null
        }
    },
    methods: {
        closeModal() {
            const modalElement = document.getElementById("RegistroExitoso");
            const modal = bootstrap.Modal.getInstance(modalElement);
            modal.hide();
        }
    },
    computed:{
        
    },
    watch:{

    }
}
</script>

<style scoped>
body {
    font-family: Arial, sans-serif;

    height: 100vh;
    margin: 0;
}

.modal {
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-icon {
    width: 64px;
    height: 64px;
    margin-bottom: 20px;
}

.modal-title {
    font-size: 24px;
    color: #8b4513;
    margin-bottom: 10px;
}

.modal-message {
    font-size: 16px;
    color: #5e2c04;
    margin-bottom: 20px;
}

.modal-button {
    background-color: #8b4513;
    border: none;
    color: #fff9f0;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s ease;
}

.modal-button:hover {
    background-color: #a0522d;
}
</style>