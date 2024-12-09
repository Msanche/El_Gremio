<template>
<NavBar/>
<div class="product-grid">
    <div 
      v-for="(product, index) in productos" 
      :key="index" 
      class="product-card"
    >
    <div class="product-card" @click="DetallesProducto(product.id_producto)">
      <img :src="`http://localhost:3000/uploads/${product.nombre_imagen}`" :alt="`${product.nombre}`" class="product-image">
      <div class="product-info">
        <div class="product-name">{{ product.nombre }}</div>
        <div class="rating">★★★★★</div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import axios from 'axios';
export default {
    data(){
        return{
            productos:[]
        }
    },
    components:{
        NavBar
    },
    methods:{
      async DetallesProducto(id){ 
            this.$router.push({ name: 'producto_vista', params: { id_producto: id } });
        },
        async GetProducts(){
            try {
                const response = await axios.get(`http://localhost:3000/productos/Category/${1}`);
                console.log(response.data)
                this.productos = response.data
            } catch (err) {
                console.error('Error al obtener los usuarios:', err);
            }       
           }
    },
    mounted(){
        this.GetProducts();
    }
}
</script>

<style scoped>
  body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
    margin: 0;
    padding: 20px;
  }
  .product-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 20px;
  }
  .product-card {
    margin-top: 15px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    overflow: hidden;
    width: 200px;
    transition: transform 0.3s ease;
  }
  .product-card:hover {
    transform: translateY(-5px);
  }
  .product-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  .product-info {
    padding: 10px;
  }
  .product-name {
    font-weight: bold;
    margin-bottom: 5px;
  }
  .product-price {
    color: #e91e63;
    font-weight: bold;
  }
  .rating {
    color: #ffc107;
  }
  .brand-logo {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin: 20px auto;
    display: block;
  }
</style>