<template>
<NavBar />

<div class="container">
        <header>
            <div class="logo">
                <img src="/images/blackCat.jpg" alt="Madame Crochet logo">
                <h1>Madame Crochet</h1>
            </div>
            <div class="rating">★★★★★</div>
        </header>
        
        <form class="order-form" id="orderForm">
            <div class="image-upload" id="imageUpload">
                <input type="file" id="fileInput" accept="image/*">
                <div class="upload-icon">+</div>
                <div class="upload-text">Imagen de Referencia</div>
            </div>
            <div class="product-description">
                <h3>Descripción del Producto</h3>
                <textarea rows="4" cols="30" placeholder="Escriba sus especificaciones (max 2048 caracteres)"></textarea>
            </div>
            <div class="product-dimensions">
                <h3>Medidas Sugeridas</h3>
                <div class="dimension-radio">
                    <label :class="{'selected': selectedSize === 'Chico'}">
                        <input
                        type="radio"
                        v-model="selectedSize"
                        value="Chico"
                        name="size"
                        />
                        Chico
                    </label>
                    <label :class="{'selected': selectedSize === 'Mediano'}">
                        <input
                        type="radio"
                        v-model="selectedSize"
                        value="Mediano"
                        name="size"
                        />
                        Mediano
                    </label>
                    <label :class="{'selected': selectedSize === 'Grande'}">
                        <input
                        type="radio"
                        v-model="selectedSize"
                        value="Grande"
                        name="size"
                        />
                        Grande
                    </label>
                </div>
            </div>
            <div class="buttons">
                <button type="button" class="cancel-btn">Cancelar</button>
                <button type="submit" class="ok-btn">Enviar Petición</button>
            </div>
        </form>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
export default {
    data() {
        return {
        description: '',
        selectedSize: '', // Almacena la selección de 'Chico', 'Mediano' o 'Grande'
        uploadedImage: null,
        }
        
    }
    ,components:{
        NavBar
    }
}
</script>

<style scoped>

.dimension-radio {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
}

.dimension-radio label {
  position: relative;
  font-size: 16px;
  color: #4A3728;
  background-color: #FFF8EE;
  border: 2px solid #D2B48C;
  border-radius: 10px;
  padding: 10px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-align: center;
}

.dimension-radio input[type="radio"] {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.dimension-radio label.selected {
  background-color: #D2691E;
  color: #FFF8EE;
  border-color: #8B4513;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transform: scale(1.05);
}

.dimension-radio label:hover {
  border-color: #8B4513;
  background-color: #F5E6D3;
}

body, html {
        margin: 0;
        padding: 0;
        font-family: Arial, sans-serif;
        background-color: #F5E6D3;
        color: #4A3728;
    }
    .container {
        max-width: 800px;
        margin: 20px auto;
        padding: 20px;
        background-color: #FFF8EE;
        box-shadow: 0 0 10px rgba(74, 55, 40, 0.1);
        border-radius: 8px;
    }
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        padding-bottom: 10px;
        border-bottom: 2px solid #D2B48C;
    }
    .logo {
        display: flex;
        align-items: center;
    }
    .logo img {
        width: 50px;
        height: 50px;
        margin-right: 10px;
        border-radius: 50%;
    }
    .rating {
        color: #D2691E;
        font-size: 24px;
    }
    .contact-btn {
        background-color: #8B4513;
        color: #FFF8EE;
        border: none;
        padding: 10px 20px;
        cursor: pointer;
        border-radius: 4px;
    }
    .order-form {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
    }
    .product-description, .product-dimensions {
        background-color: #F5E6D3;
        padding: 15px;
        border-radius: 5px;
    }
    .product-description textarea {
        width: 100%;
        resize: vertical;
        border: 1px solid #D2B48C;
        background-color: #FFF8EE;
        color: #4A3728;
    }
    .dimension-inputs {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
    }
    .dimension-inputs input {
        width: 100%;
        padding: 5px;
        border: 1px solid #D2B48C;
        background-color: #FFF8EE;
        color: #4A3728;
    }
    .buttons {
        grid-column: 1 / 3;
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        margin-top: 20px;
    }
    .ok-btn, .cancel-btn {
        padding: 10px 20px;
        cursor: pointer;
        border: none;
        border-radius: 4px;
    }
    .ok-btn {
        background-color: #8B4513;
        color: #FFF8EE;
    }
    .cancel-btn {
        background-color: #D2691E;
        color: #FFF8EE;
    }
    footer {
        background-color: #8B4513;
        color: #FFF8EE;
        padding: 20px 0;
        margin-top: 20px;
    }
    .footer-content {
        display: flex;
        justify-content: space-around;
        max-width: 800px;
        margin: 0 auto;
    }
    .footer-column h3 {
        margin-bottom: 10px;
        color: #F5E6D3;
    }
    .footer-column ul {
        list-style-type: none;
        padding: 0;
    }
    .footer-column li {
        margin-bottom: 5px;
    }
    .image-upload {
        grid-column: 1 / 2;
        grid-row: 1 / 3;
        border: 2px dashed #D2B48C;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 300px;
        font-size: 48px;
        color: #D2B48C;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .image-upload input[type="file"] {
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: pointer;
    }
    .image-upload img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
    }
    .image-upload .upload-icon {
        font-size: 48px;
        margin-bottom: 10px;
    }
    .image-upload .upload-text {
        font-size: 16px;
        text-align: center;
        color: #8B4513;
    }
</style>