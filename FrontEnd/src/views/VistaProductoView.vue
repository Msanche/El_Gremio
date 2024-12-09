<template>
    <NavBar />
    <body>
        <div class="main-content">
        <div class="product-images">
            <div class="main-image-container">
                <img class="main-image" :src="`http://localhost:3000/uploads/${Producto.producto?.nombre_imagen}`" :alt="`${Producto.producto?.nombre}`">
            </div>
        </div>
        <div class="product-details">
            <h2 class="product-title">{{Producto.producto?.nombre}}</h2>
            <p class="product-price" v-if="tamano.precio">${{ tamano.precio }}</p>
            <div class="product-options">
                <label>Tamaño:</label>
                <select v-model="tamano">
                    <option value="" selected disabled>Seleccione un tamaño</option>
                    <option v-for="item in Producto.tamanos" :key="item.id" :value="item">{{item.nombre_size}}</option>
                </select>
            </div>
            <div class="product-options">
                <label>Cantidad:</label>
                <input type="number" v-model="CantidadProductos" min="1" :max="Producto.producto?.stock">
                <span> {{Producto.producto?.stock}} disponibles</span>
            </div>
            <p class="subtotal">Subtotal: {{(CantidadProductos * tamano.precio) || 0}}</p>
            <div class="buttons-container">
                <button class="buy-button">COMPRAR AHORA</button>
                <button class="cart-button">AÑADIR AL CARRITO</button>
            </div>
        </div>
    </div>
    <div class="related-products">
        <h3>Quizás te pueda interesar</h3>
        <div class="carousel-container">
            <button class="carousel-button prev">❮</button>
            <button class="carousel-button next">❯</button>
            <div class="related-products-grid" >
                <div v-for="item in productosFiltered" :key="item.id" class="related-product" @click="DetallesProducto(item.id_producto)">
                        <img :src="`http://localhost:3000/uploads/${item.nombre_imagen}`" :alt="`${item?.nombre}`">
                    <p>{{item.nombre}}</p>
                </div>
                
            </div>
        </div>
    </div>
    <footer>
        <p>© 2023 El Gremio - Conectando Tradición y Modernidad</p>
    </footer>
    </body>
</template>

<script>

import NavBar from '@/components/NavBar.vue';
import axios from 'axios';
export default {
  data(){
    return{
        id_producto:0,
        Producto:[],
        CantidadProductos:0,
        tamano:'',
        productosFiltered:[]
    }
  },

  methods:{
    async DetallesProducto(id){ 
        this.id_producto = id
        await this.ProductoById(id);
        await this.ProductosFiltered(id);
        },

    async ProductosFiltered(idLocal){
        try {
            this.id_producto = idLocal?idLocal:this.$route.params.id_producto;
                 const response = await axios.get(`http://localhost:3000/productos`);
                 this.productosFiltered = response.data.filter(e=>e.id_producto != this.id_producto)
                 console.log("resultado",this.Producto)
             } catch (err) {
                 console.error('Error al obtener los productos:', err);
             }
       
    },
    
    async ProductoById(idLocal){
        try {

            this.id_producto = idLocal?idLocal:this.$route.params.id_producto;
                 const response = await axios.get(`http://localhost:3000/productos/${this.id_producto}`);
                 this.Producto = response.data
                 console.log(this.Producto)
             } catch (err) {
                 console.error('Error al obtener el producto:', err);
             }
    }
  },
  mounted(){
    this.ProductoById();
    this.ProductosFiltered();
  },
  components:{
    NavBar
  }
}
    
</script>

<style scoped>
    :root {
        --primary-color: #4a3428;    /* Dark brown */
        --secondary-color: #8b5e3c;  /* Medium brown */
        --accent-color: #d4a373;     /* Light brown */
        --background-color: #fdf6e3; /* Cream background */
        --text-color: #2c1810;       /* Very dark brown */
    }

    * {
        box-sizing: border-box;
        transition: all 0.3s ease;
    }

    body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        margin: 0;
        padding: 0;
        background-color: var(--background-color);
        color: var(--text-color);
        line-height: 1.6;
    }

    header {
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        color: white;
        text-align: center;
        padding: 1.5rem;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }

    header h1 {
        margin: 0;
        font-size: 2.5rem;
        letter-spacing: 2px;
    }

    .logo {
        width: 80px;
        height: 80px;
        filter: drop-shadow(0 2px 5px rgba(0,0,0,0.2));
    }

    .main-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        max-width: 1200px;
        margin: 2rem auto;
        background-color: white;
        border-radius: 15px;
        padding: 2rem;
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }

    .product-images {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1rem;
    }

    .main-image-container {
        width: 100%;
        max-width: 400px;
        margin: 0 auto;
    }

    .main-image {
        width: 100%;
        height: 400px;
        object-fit: cover;
        border-radius: 10px;
        box-shadow: 0 3px 10px rgba(0,0,0,0.1);
    }

    .product-details {
        padding: 0 1rem;
    }

    .product-title {
        font-size: 2rem;
        color: var(--primary-color);
        margin-bottom: 1rem;
    }

    .product-price {
        font-size: 1.8rem;
        color: var(--secondary-color);
        font-weight: bold;
        margin-bottom: 1.5rem;
    }

    .product-options {
        margin-bottom: 1.5rem;
    }

    .product-options select,
    .product-options input {
        padding: 0.5rem;
        border: 1px solid #ddd;
        border-radius: 5px;
        margin-left: 0.5rem;
    }

    .buttons-container {
        display: flex;
        gap: 1rem;
        margin: 1.5rem 0;
    }

    .buy-button, .cart-button {
        padding: 1rem 2rem;
        border: none;
        border-radius: 25px;
        font-weight: bold;
        cursor: pointer;
        transition: transform 0.2s ease;
    }

    .buy-button {
        background-color: var(--secondary-color);
        color: var(--background-color);
    }

    .cart-button {
        background-color: var(--background-color);
        color: var(--secondary-color);
        border: 2px solid var(--secondary-color);
    }

    .buy-button:hover, .cart-button:hover {
        transform: translateY(-3px);
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    }

    .related-products {
        max-width: 1200px;
        margin: 2rem auto;
        padding: 2rem;
        background-color: white;
        border-radius: 15px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }

    .related-products h3 {
        color: var(--primary-color);
        font-size: 1.5rem;
        margin-bottom: 1.5rem;
        text-align: center;
        position: relative;
        padding-bottom: 0.5rem;
    }

    .related-products h3::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 100px;
        height: 2px;
        background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
    }

    .carousel-container {
        position: relative;
        padding: 0 40px;
    }

    .carousel-button {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 40px;
        height: 40px;
        border: none;
        border-radius: 20px;
        background-color: var(--primary-color);
        color: white;
        cursor: pointer;
        font-size: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        z-index: 10;
    }

    .carousel-button:hover {
        background-color: var(--secondary-color);
        transform: translateY(-50%) scale(1.1);
    }

    .carousel-button.prev {
        left: 0;
    }

    .carousel-button.next {
        right: 0;
    }

    .related-products-grid {
        display: flex;
        gap: 1.5rem; /* Consistent spacing */
        padding: 1rem;
        margin: 0 -1rem;
        scroll-behavior: smooth;
        overflow-x: scroll;
        -ms-overflow-style: none;
        scrollbar-width: none;
        scroll-snap-type: x mandatory;
    }

    .related-product {
        min-width: 250px;
        width: 250px;  /* Fixed width */
        height: 350px; /* Fixed height */
        flex: 0 0 250px; /* Prevent flexbox from changing dimensions */
        text-align: center;
        padding: 1.5rem;
        background: white;
        border-radius: 15px;
        box-shadow: 0 3px 10px rgba(74, 52, 40, 0.15);
        margin: 0.5rem;
        transition: all 0.3s ease;
        scroll-snap-align: start;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .related-product svg {
        width: 100%;
        height: 220px; /* Fixed height for images */
        margin-bottom: 1rem;
        border-radius: 10px;
        background: var(--background-color);
        object-fit: contain; /* Ensure image maintains aspect ratio */
    }

    .related-product p {
        color: var(--primary-color);
        font-weight: 600;
        margin: 0;
        font-size: 1.1rem;
        line-height: 1.4;
        height: 2.8em; /* Fixed height for two lines of text */
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
    }

    footer {
        background-color: var(--primary-color);
        color: white;
        padding: 3rem 2rem;
        margin-top: 3rem;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
    }

    footer h4 {
        color: var(--secondary-color);
        margin-bottom: 1rem;
    }

    footer p {
        margin: 0.5rem 0;
        cursor: pointer;
    }

    footer p:hover {
        color: var(--secondary-color);
    }

    @media (max-width: 768px) {
        .main-content {
            grid-template-columns: 1fr;
        }
        
        nav {
            flex-wrap: wrap;
            justify-content: center;
            gap: 1rem;
        }
    }
</style>