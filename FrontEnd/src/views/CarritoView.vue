<template>
 <NavBar isActiveC="True"/>
    <div class="cart-container">
        <h2 class="cart-title">Tu Carrito de Artesanías</h2>
        <div class="cart-item">
            <img src="https://elgremio.com/productos/llavero-patricio.jpg" alt="Llavero Patricio artesanal">
            <div class="item-details">
                <h3>Llavero Patricio</h3>
                <p>Artesanía única hecha a mano</p>
                <p>Estado: En Proceso</p>
            </div>
            <div class="item-actions">
                <div class="quantity-control">
                    <button>-</button>
                    <span>2</span>
                    <button>+</button>
                </div>
                <p><strong>$150.00</strong></p>
                <button class="remove-btn">Eliminar</button>
            </div>
        </div>
        <div class="cart-item">
            <img src="https://elgremio.com/productos/madame-crochet.jpg" alt="Pedido Personalizado Madame Crochet">
            <div class="item-details">
                <h3>Pedido Personalizado Madame Crochet #1</h3>
                <p>Creación exclusiva a medida</p>
                <p>Estado: Pendiente</p>
            </div>
            <div class="item-actions">
                <div class="quantity-control">
                    <button>-</button>
                    <span>1</span>
                    <button>+</button>
                </div>
                <p><strong>Precio a determinar</strong></p>
                <button class="remove-btn">Eliminar</button>
            </div>
        </div>
        <div class="cart-summary">
            <h3>Resumen de tu Pedido Artesanal</h3>
            <p>Subtotal: $300.00</p>
            <p>Impuestos: $0</p>
            <p><strong>Total: $300.00</strong></p>
            <button class="checkout-btn">Proceder al Pago</button>
        </div>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
export default {
    data(){
        return{

        }
    },
    methods:{
       
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
        color: #8b4513;
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
        color: #8b4513;
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
        background-color: #8b4513;
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
        background-color: #8b4513;
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
        background-color: #8b4513;
        transform: translateY(-3px);
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    }
    /* Add media queries for responsive design */
    @media (max-width: 768px) {
        .cart-item {
            flex-direction: column;
        }
        .item-actions{
            flex-direction: column;
        }
    }

</style>