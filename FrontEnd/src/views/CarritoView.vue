<template>
    <NavBar isActiveC="True" />
    <div class="cart-container">
        <h2 class="cart-title">Tu Carrito de Artesanías</h2>
        <div class="cart-item" v-for="item in carrito" :key="item.id">
            <img :src="`http://localhost:3000/uploads/${item?.tamano.Producto.nombre_imagen}`"
                :alt="`${item.tamano.Producto.nombre}`" class="product-image">
            <div class="item-details">
                <h3>{{ item.tamano.Producto.nombre }}</h3>
                <p>{{ item.tamano.Producto.descripcion }}</p>
                <p>Estado: En Proceso</p>
            </div>
            <div class="item-actions">
                <div class="quantity-control">

                    <span>cantidad:{{ item.cantidad_productos }}</span>

                </div>
                <p><strong>${{ item.tamano.precio }}.00 c/u</strong></p>
                <button class="remove-btn" @click="DeleteProductCarrito(item.tamano.pk_id_tamano)">Eliminar</button>
            </div>
        </div>

        <div class="cart-summary">
                <h3>Resumen de tu Pedido Artesanal</h3>
                <table class="cart-table">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Precio Unitario</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in carrito" :key="item.id">
                            <td>{{ item.tamano.Producto.nombre }}</td>
                            <td>{{ item.cantidad_productos }}</td>
                            <td>${{ item.tamano.precio }}</td>
                            <td>${{ item.cantidad_productos * item.tamano.precio }}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="3"><strong>Total:</strong></td>
                            <td><strong>${{ total }}.00</strong></td>
                        </tr>
                    </tfoot>
                </table>
                <button class="checkout-btn">Proceder al Pago</button>
            </div>

        </div>
    <footer>
        <p>© 2023 El Gremio - Conectando Tradición y Modernidad</p>
    </footer>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import axios from 'axios';
export default {
    data() {
        return {
            carrito: [],
            total: 0
        }
    },
    methods: {
        async getCarrito() {
            try {
                const idUsuarioCliente = parseInt(localStorage.getItem('id'));

                const response = await axios.put('http://localhost:3000/carritoCliente', {
                    idUsuarioCliente
                });
                this.carrito = response.data.data
                for (let index = 0; index < this.carrito.length; index++) {
                    const element = this.carrito[index];
                    this.total = this.total + (element.cantidad_productos * element.tamano.precio)
                }
            } catch (err) {
                console.error('Error al obtener los usuarios:', err);
            }
        },

        async DeleteProductCarrito(idTamaño) {
            try {
                const idCliente = parseInt(localStorage.getItem('id'));
                 await axios.put('http://localhost:3000/carrito/eliminar', {
                    idCliente, idTamaño
                });
                await this.getCarrito();
                this.total = 0
                if (this.carrito.length != 0) {
                    for (let index = 0; index < this.carrito.length; index++) {
                        const element = this.carrito[index];
                        this.total = this.total + (element.cantidad_productos * element.tamano.precio)
                    }
                } 

            } catch (err) {
                console.error('Error al obtener los usuarios:', err);
            }
        },
    },
    components: {
        NavBar
    },
    async mounted() {
        await this.getCarrito();
    }

}
</script>

<style scoped>
body {
    font-family: 'Montserrat', sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f5e6d3;
    color: #3c2415;
}

.cart-container {
    max-width: 1000px;
    margin: 3rem auto;
    background-color: #FFF8E7;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
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
    border: 2px solid #c69c6d;
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
    border-bottom: 1px solid #c69c6d;
    padding: 1.5rem 0;
    transition: all 0.3s ease;
}

.cart-item:hover {
    background-color: #F0E6D2;
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.cart-item img {
    width: 140px;
    height: 140px;
    object-fit: cover;
    margin-right: 2rem;
    border-radius: 10px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
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
    background-color: #c69c6d;
    border-radius: 20px;
    padding: 0.25rem;
}

.quantity-control button {
    background-color: #a0522d;
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
    background-color: #a0522d;
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

.cart-table {
  width: 100%;
  margin-top: 1.5rem;
  border-collapse: collapse;
  text-align: right;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
}

.cart-table th,
.cart-table td {
  padding: 1rem;
  text-align: left; /* Alinea los textos de los productos a la izquierda */
  font-size: 1rem;
}

.cart-table th {
  background-color: #a0522d; /* Fondo marrón oscuro para los encabezados */
  color: white; /* Texto blanco */
  text-transform: uppercase;
}

.cart-table tbody tr:nth-child(even) {
  background-color: #f9f9f9; /* Alterna el color de las filas */
}

.cart-table tbody tr:nth-child(odd) {
  background-color: #fefefe;
}

.cart-table tfoot td {
  font-weight: bold;
  background-color: #c69c6d; /* Fondo que combina con tu resumen */
  color: white;
  font-size: 1.1rem;
}

.cart-table td:last-child {
  font-weight: bold;
  color: #a0522d;
}


.checkout-btn {
    background-color: #a0522d;
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
    background: linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: all 0.6s;
}

.checkout-btn:hover::before {
    left: 100%;
}

.checkout-btn:hover {
    background-color: #8b4513;
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

/* Add media queries for responsive design */
@media (max-width: 768px) {
    .cart-item {
        flex-direction: column;
    }

    .item-actions {
        flex-direction: column;
    }
}
</style>