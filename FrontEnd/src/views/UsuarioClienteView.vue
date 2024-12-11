<template>
        <NavBar isActiveP="True"/>

    <div id="userProfile" class="profile-container">
        <h2 class="profile-title">Bienvenido {{ Username }}</h2>
        <div class="profile-section">
            <h3>Mis Compras</h3>
            <ul class="purchase-list">
                
                <li>
                    <img src="https://elgremio.com/productos/madame-crochet.jpg" alt="Pedido Personalizado Madame Crochet">
                    <div v-if="carritoDetalles.length">
                        <div v-for="carrito in carritoDetalles" :key="carrito.id">
                            <h4>Producto: {{ carrito.tamano }}</h4>
                        </div>
                        <h4>Pedido Personalizado Madame Crochet #1</h4>
                        <p>Fecha: 20/06/2023</p>
                        <p>Estado: En proceso</p>
                    </div>
                </li>

            </ul>
        </div>
        
    </div>
</template>
<script>

import NavBar from '@/components/NavBar.vue';
import axios from "axios";

export default {
    data(){
        return{
            Username:'',
            carritoDetalles: [],
        }
    },
    methods:{
        async fetchCarritoDetalles() {
    try {
        const idUsuarioCliente = {
            pk_id_cliente: parseInt(localStorage.getItem('id'))
        };
        console.log('Lo que tenemos en el id: ', idUsuarioCliente);

        const response = await axios.post('http://localhost:3000/carritoCliente/historico', idUsuarioCliente);
        console.log('Lo que llega de respuesta', response);
        this.carritoDetalles = response.data.data
        console.log('Lo que nos lelga en carritoDetalles: ',this.carritoDetalles);
    } catch (error) {
        console.error('Error al obtener los carritos del historial:', error);
    }
}

    },
    mounted(){
        this.Username = localStorage.getItem('nombre');
        this.fetchCarritoDetalles();
    },
    components:{
        NavBar
    }
}
</script>

<style scoped>

body {
    font-family: 'Montserrat', sans-serif;
    margin: 0;
    padding: 0;
    background-color:  #f5e6d3;
    color:  #3c2415;
}

header {
    background-color:  #8b4513;
    color:  #f0e0c8;
    padding: 2rem;
    text-align: center;
    position: relative;
    overflow: hidden;
}

header::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('https://elgremio.com/images/texture.png') repeat;
    opacity: 0.1;
    z-index: 0;
}

h1, h2, h3 {
    font-family: 'Cormorant Garamond', serif;
}

header h1 {
    margin: 0;
    font-size: 3rem;
    position: relative;
    z-index: 1;
}

header p {
    font-style: italic;
    margin-top: 0.5rem;
    position: relative;
    z-index: 1;
}

nav {
    background-color:  #c69c6d;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

nav button, nav input {
    background-color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-family: 'Montserrat', sans-serif;
    transition: all 0.3s ease;
}

nav .active-nav {
    background-color:  #a0522d;
    color: white;
    font-weight: bold;
    transform: scale(1.05);
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

nav button:hover {
    background-color:  #a0522d;
    color: white;
}

nav input {
    width: 250px;
    box-shadow: inset 0 1px 3px rgba(0,0,0,0.1);
}

.breadcrumb {
    padding: 1rem 2rem;
    background-color:  #c69c6d;
    color:  #8b4513;
    font-size: 0.9rem;
}

.breadcrumb a {
    color:  #a0522d;
    text-decoration: none;
}

.breadcrumb a:hover {
    text-decoration: underline;
}

.logo {
    width: 80px;
    height: 80px;
    transition: transform 0.3s ease;
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
}

.logo:hover {
    transform: scale(1.1) rotate(5deg);
}

.cart-container {
    max-width: 1000px;
    margin: 3rem auto;
    background-color: #FFF8E7;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    padding: 2rem;
    position: relative;
}

.cart-container::before {
    content: '';
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    bottom: 10px;
    border: 2px solid  #c69c6d;
    border-radius: 12px;
    pointer-events: none;
}

.cart-title {
    text-align: center;
    color:  #8b4513;
    font-size: 2.5rem;
    margin-bottom: 2rem;
    position: relative;
}

.cart-title::after {
    content: '🛒';
    font-size: 1.5rem;
    position: absolute;
    margin-left: 10px;
}

.cart-item {
    display: flex;
    align-items: center;
    border-bottom: 1px solid  #c69c6d;
    padding: 1.5rem 0;
    transition: all 0.3s ease;
}

.cart-item:hover {
    background-color: #F0E6D2;
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.05);
}

.cart-item img {
    width: 140px;
    height: 140px;
    object-fit: cover;
    margin-right: 2rem;
    border-radius: 10px;
    box-shadow: 0 3px 10px rgba(0,0,0,0.1);
    transition: transform 0.3s ease;
}

.cart-item:hover img {
    transform: scale(1.05);
}

.item-details {
    flex-grow: 1;
}

.item-details h3 {
    margin: 0 0 0.5rem 0;
    color:  #8b4513;
    font-size: 1.4rem;
}

.item-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 40%;
}

.quantity-control {
    display: flex;
    align-items: center;
    background-color:  #c69c6d;
    border-radius: 20px;
    padding: 0.25rem;
}

.quantity-control button {
    background-color:  #a0522d;
    border: none;
    color: white;
    font-size: 1.2rem;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;
}

.quantity-control button:hover {
    background-color:  #8b4513;
    transform: scale(1.1);
}

.quantity-control span {
    margin: 0 1rem;
    font-weight: bold;
}

.remove-btn {
    background-color:  #a0522d;
    border: none;
    color: white;
    padding: 0.5rem 1rem;
    cursor: pointer;
    border-radius: 20px;
    transition: all 0.3s ease;
}

.remove-btn:hover {
    background-color:  #8b4513;
    transform: translateY(-2px);
}

.cart-summary {
    margin-top: 2rem;
    text-align: right;
    background-color:  #c69c6d;
    padding: 2rem;
    border-radius: 10px;
    position: relative;
    overflow: hidden;
}

.cart-summary::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('https://elgremio.com/images/pattern.png') repeat;
    opacity: 0.05;
    z-index: 0;
}

.cart-summary h3, .cart-summary p {
    position: relative;
    z-index: 1;
}

.checkout-btn {
    background-color:  #a0522d;
    border: none;
    color: white;
    padding: 1rem 2rem;
    font-size: 1.1rem;
    cursor: pointer;
    margin-top: 1rem;
    border-radius: 25px;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.checkout-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(120deg, transparent, rgba(255,255,255,0.3), transparent);
    transition: all 0.6s;
}

.checkout-btn:hover::before {
    left: 100%;
}

.checkout-btn:hover {
    background-color:  #8b4513;
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

.profile-container {
    max-width: 1000px;
    margin: 3rem auto;
    background-color: #FFF8E7;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    padding: 2rem;
    position: relative;
}

.profile-title {
    text-align: center;
    color:  #8b4513;
    font-size: 2.5rem;
    margin-bottom: 2rem;
}

.profile-info {
    text-align: center;
    margin-bottom: 2rem;
}

.profile-section {
    margin-bottom: 2rem;
}

.purchase-list, .comment-list {
    list-style-type: none;
    padding: 0;
}

.purchase-list li, .comment-list li {
    background-color: #F0E6D2;
    margin-bottom: 1rem;
    padding: 1rem;
    border-radius: 10px;
    display: flex;
    align-items: center;
}

.purchase-list img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    margin-right: 1rem;
    border-radius: 5px;
}

.comment-list li {
    flex-direction: column;
    align-items: flex-start;
}

.comment-list span {
    font-size: 0.8rem;
    color: #666;
}
</style>