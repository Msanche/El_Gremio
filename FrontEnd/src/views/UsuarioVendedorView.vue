<template>
  <NavBar isActiveP="True" />
  <div class="container">
    <h2 class="profile-title">Bienvenido {{ Username }}</h2>

    <div class="description" id="descriptionSection">
      <h2>Descripción</h2>
            <i class="fas fa-edit edit-icon" id="editDescriptionBtn" title="Editar descripción"></i>

      <p id="descriptionText">En Madame Crochet, cada puntada cuenta una historia. Somos expertos en crochet en Colima,
        dedicados a crear piezas personalizadas que capturan la esencia de tus deseos. Nuestras creaciones viajan por
        toda la república mexicana, llevando alegría y calidez a cada hogar.</p>
      <p><i class="fas fa-map-marker-alt"></i> Villa de Álvarez, Colima - El corazón de nuestra inspiración</p>
      <i class="fas fa-edit edit-icon" id="editDescriptionBtn" title="Editar descripción"></i>
    </div>

    <div class="reviews">
      <h2>Lo Que Dicen Nuestros Clientes</h2>
      <div class="review">
        <p><strong>Antonio01</strong> <span class="stars">★★★★★</span></p>
        <p>"Geniales trabajos y una atención al cliente excepcional. Madame Crochet hace que cada evento sea especial
          con sus creaciones únicas. ¡Totalmente recomendado!"</p>
      </div>
    </div>

    <h2>Galería de Artesanías</h2>
    <button class="add-product" id="addProductBtn">Agregar Nueva Creación</button>
    <div class="products" id="productsContainer">
      <!-- Products will be dynamically added here -->
    </div>
  </div>

  <div id="addProductModal" class="modal">
    <div class="modal-content">
      <span class="close">×</span>
      <h2>Agregar Nueva Creación</h2>
      <form id="addProductForm">
        <input type="text" id="productName" placeholder="Nombre de tu creación" required="">
        <input type="number" id="productPrice" placeholder="Precio (en pesos)" required="">
        <input type="url" id="productImage" placeholder="URL de la imagen" required="">
        <textarea id="productDescription" placeholder="Describe tu maravillosa creación" required=""></textarea>
        <button type="submit">Añadir a la Galería</button>
      </form>
    </div>
  </div>

  <div id="editDescriptionModal" class="modal">
    <div class="modal-content">
      <span class="close">×</span>
      <h2>Editar Descripción</h2>
      <form id="editDescriptionForm">
        <textarea id="newDescription" rows="6" required=""></textarea>
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  </div>


</template>

<script>

import NavBar from '@/components/NavBar.vue';
export default {
  data() {
    return {
      Username:''
    }
  },
  components: {
    NavBar
  },
  mounted(){
    this.Username = localStorage.getItem('nombre');

  }
}
</script>

<style scoped>
:root {
  --primary-color: #8b4513;
  --secondary-color: #a0522d;
  --accent-color: #c69c6d;
  --background-color: #FFF8E7;
  --text-color: #4A3728;
  --box-shadow: 0 4px 6px rgba(139, 69, 19, 0.1);
}

body {
  font-family: 'Raleway', sans-serif;
  margin: 0;
  padding: 0;
  background-color: var(--background-color);
  color: var(--text-color);
  line-height: 1.6;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

header {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: var(--accent-color);
  text-align: center;
  padding: 40px 0;
  box-shadow: var(--box-shadow);
}

h1 {
  margin: 0;
  font-family: 'Pacifico', cursive;
  font-size: 3.5em;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.description,
.reviews {
  background-color: white;
  border-radius: 15px;
  padding: 25px;
  margin-top: 30px;
  box-shadow: var(--box-shadow);
  transition: transform 0.3s ease;
  position: relative;
}

.description:hover,
.reviews:hover {
  transform: translateY(-5px);
}

h2 {
  color: var(--primary-color);
  border-bottom: 2px solid var(--accent-color);
  padding-bottom: 10px;
  margin-top: 0;
  font-weight: 600;
}

.review {
  background-color: #FFF8E7;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
}

.stars {
  color: #FFD700;
}

.products {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
  margin-top: 30px;
}

.product {
  background-color: white;
  border-radius: 15px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: var(--box-shadow);
}

.product:hover {
  transform: translateY(-10px);
  box-shadow: 0 6px 12px rgba(139, 69, 19, 0.15);
}

.product img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-bottom: 3px solid var(--accent-color);
}

.product-info {
  padding: 20px;
}

.product-name {
  font-weight: 600;
  margin-bottom: 10px;
  color: var(--primary-color);
}

.product-price {
  color: var(--secondary-color);
  font-weight: 600;
  font-size: 1.2em;
}

.add-product,
.edit-description {
  background-color: var(--secondary-color);
  color: var(--accent-color);
  border: none;
  padding: 12px 25px;
  font-size: 16px;
  margin: 30px 0;
  cursor: pointer;
  border-radius: 25px;
  transition: all 0.3s ease;
  box-shadow: var(--box-shadow);
  font-weight: 600;
  display: inline-block;
}

.add-product:hover,
.edit-description:hover {
  background-color: var(--primary-color);
  transform: scale(1.05);
}

.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(139, 69, 19, 0.6);
  backdrop-filter: blur(5px);
}

.modal-content {
  background-color: #FFF8E7;
  margin: 10% auto;
  padding: 30px;
  border: 1px solid var(--accent-color);
  width: 90%;
  max-width: 500px;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(139, 69, 19, 0.3);
}

.close {
  color: var(--secondary-color);
  float: right;
  font-size: 28px;
  font-weight: bold;
  transition: color 0.3s ease;
}

.close:hover,
.close:focus {
  color: var(--primary-color);
  text-decoration: none;
  cursor: pointer;
}

form {
  display: flex;
  flex-direction: column;
}

form input,
form textarea {
  margin-bottom: 15px;
  padding: 12px;
  border: 1px solid var(--accent-color);
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;
  background-color: white;
}

form input:focus,
form textarea:focus {
  border-color: var(--primary-color);
  outline: none;
}

form button {
  background-color: var(--primary-color);
  color: var(--accent-color);
  border: none;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

form button:hover {
  background-color: var(--secondary-color);
}

.edit-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 20px;
  color: var(--secondary-color);
}

@media (max-width: 768px) {
  .products {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}
</style>