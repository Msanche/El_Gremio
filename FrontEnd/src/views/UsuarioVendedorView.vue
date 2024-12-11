<template>
  <AgregarProducto @actualizar="ConsultaProducts()" />

  <NavBar isActiveP="True" />
  <div class="container">
    <h1 class="profile-title">Bienvenido {{ Username }}</h1>
    <h2>Galería de Artesanías</h2>
    <button class="add-product" id="addProductBtn" @click="AddProduct()">Agregar Nueva Creación</button>

    <div class="products product-card" id="productsContainer" v-for="item in productos" :key="item.fk_id_producto">
      <img :src="`http://localhost:3000/uploads/${item?.Producto.nombre_imagen}`" :alt="`${item.Producto.nombre}`" class="product-image">
      <div class="product-info">
        <h3>Nombre:{{ item?.Producto.nombre }}</h3>
        <h3>Tamaño:{{ item?.nombre_size }}</h3>
        <h3>Precio:{{ item?.precio }}</h3>
      </div>
    </div>

    <h2>Historial de Artesanías Vendidas</h2>

  </div>
</template>

<script>
import bootstrap from "bootstrap/dist/js/bootstrap.min.js";
import AgregarProducto from "@/components/AgregarProducto.vue";
import NavBar from '@/components/NavBar.vue';
import axios from "axios";
export default {
  data() {
    return {
      Username: '',
      productos:[]
    }
  },
  components: {
    NavBar,
    AgregarProducto
  },
  methods: {
    AddProduct() {
      const modalElement = document.getElementById("AddProduct");
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    },
    async ConsultaProducts() {
             try {
              const idVendedor = parseInt(localStorage.getItem('id'));

                 const response = await axios.get(`http://localhost:3000/productos/vendedor/${idVendedor}`,{
                  idVendedor
                 });
                 this.productos = response.data.data.productos
             } catch (err) {
                 console.error('Error al obtener los usuarios:', err);
             }

         },
  },
  mounted() {
    this.Username = localStorage.getItem('nombre');
    this.ConsultaProducts();
  }
}
</script>

<style scoped>

.product-card img {
    width: 100%;
    height: 250px;
    object-fit: cover;
    transition: all 0.3s ease;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  color: #8b4513;
  padding-bottom: 10px;
  margin-top: 0;
  font-weight: 600;
}

.description,
.reviews {
  background-color: white;
  border-radius: 15px;
  padding: 25px;
  margin-top: 30px;
  transition: transform 0.3s ease;
  position: relative;
}

.description:hover,
.reviews:hover {
  transform: translateY(-5px);
}

h2 {
  color: #8b4513;
  border-bottom: 2px solid #c69c6d;
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
}

.product:hover {
  transform: translateY(-10px);
  box-shadow: 0 6px 12px rgba(139, 69, 19, 0.15);
}

.product img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-bottom: 3px solid #c69c6d;
}

.product-info {
  padding: 20px;
}

.product-name {
  font-weight: 600;
  margin-bottom: 10px;
  color: #8b4513;
}

.product-price {
  color: #a0522d;
  font-weight: 600;
  font-size: 1.2em;
}

.add-product,
.edit-description {
  background-color: #a0522d;
  color: #c69c6d;
  border: none;
  padding: 12px 25px;
  font-size: 16px;
  margin: 30px 0;
  cursor: pointer;
  border-radius: 25px;
  transition: all 0.3s ease;
  font-weight: 600;
  display: inline-block;
}

.add-product:hover,
.edit-description:hover {
  background-color: #8b4513;
  transform: scale(1.05);
}

.close {
  color: #a0522d;
  float: right;
  font-size: 28px;
  font-weight: bold;
  transition: color 0.3s ease;
}

.close:hover,
.close:focus {
  color: #8b4513;
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
  border: 1px solid #c69c6d;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;
  background-color: white;
}

form input:focus,
form textarea:focus {
  border-color: #8b4513;
  outline: none;
}

form button {
  background-color: #8b4513;
  color: #c69c6d;
  border: none;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

form button:hover {
  background-color: #a0522d;
}

.edit-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 20px;
  color: #a0522d;
}

@media (max-width: 768px) {
  .products {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}
</style>