<template>
    <NavBar isActiveH="true" />
    <main>
        <div id="carouselExampleCaptions" class="carousel slide">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active"
                    aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
                    aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"
                    aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="/images/blackCat.jpg" class="d-block w-100" alt="..." style="height: 600px;">
                    <div class="carousel-caption d-none d-md-block blurred-text">
                        <h5>First slide label</h5>
                        <p>Some representative placeholder content for the first slide.</p>
                    </div>
                </div>
                <div class="carousel-item">
                    <img src="/images/cards.jpg" class="d-block w-100" alt="..." style="height: 600px;">
                    <div class="carousel-caption d-none d-md-block blurred-text">
                        <h5>Second slide label</h5>
                        <p>Some representative placeholder content for the second slide.</p>
                    </div>
                </div>
                <div class="carousel-item">
                    <img src="/images/frieren.jpg" class="d-block w-100" alt="..." style="height: 600px;">
                    <div class="carousel-caption d-none d-md-block blurred-text">
                        <h5>Third slide label</h5>
                        <p>Some representative placeholder content for the third slide.</p>
                    </div>
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"
                data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"
                data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>

        <h2 class="section-title">Artesanías Recientes</h2>
        <div class="product-grid">
        <div class="product-card" v-for="item in LastProduct" :key="item.id_producto">
            <img :src="`/images/${item.nombre_imagen}`" :alt="`${item.nombre_imagen}`" width="250"
                    height="250">
                <div class="product-info">
                    <h3>{{ item.nombre }}</h3>
                    <p>Artesano: {{item.usuario_vendedore.Usuario.nombre}}</p>
                </div>
        </div>
        </div>

        <h2 class="section-title">Artesanos</h2>
        <div class="product-grid">
            <div class="product-card">
                <img  alt="Joyería artesanal" width="250"
                    height="250">
                <div class="product-info">
                    <h3>Collar de Plata</h3>
                    <p>Artesana: Elena Gómez</p>
                </div>
            </div>
            <div class="product-card">
                <img  alt="Escultura de barro" width="250"
                    height="250">
                <div class="product-info">
                    <h3>Escultura de Barro</h3>
                    <p>Artesano: Pedro Ramírez</p>
                </div>
            </div>
            <div class="product-card">
                <img  alt="Tapiz tejido" width="250" height="250">
                <div class="product-info">
                    <h3>Tapiz Andino</h3>
                    <p>Artesana: Rosa Mamani</p>
                </div>
            </div>
        </div>

        <!-- <h2 class="section-title">Artesanos Visitados</h2>
        <div v-for="(vendedor, index) in Vendedores" :key="index" class="product-grid">
            <div class="product-card">
                <img src="../images/test.png" alt="Retrato de artesano" width="250"
                    height="250">
                <div class="product-info">
                    <h3>{{vendedor.nombre_marca}}</h3>
                </div>
            </div>

        </div>  -->
    </main>

    <footer>
        <p>© 2023 El Gremio - Conectando Tradición y Modernidad</p>
    </footer>
</template>
<script>
 import axios from 'axios';
import NavBar from '@/components/NavBar.vue';
export default {
    data() {
        return {
            Vendedores:[],
            LastProduct:[]
        }
    },
    methods: {
         async ConsultaLastProduct() {
             try {
                 const response = await axios.get('http://localhost:3000/LastProductos');
                 console.log(response.data)
                 this.LastProduct = response.data
             } catch (err) {
                 console.error('Error al obtener los usuarios:', err);
             }

         }
    },

    components: {
        NavBar
    },
    mounted() {
         this.ConsultaLastProduct();
    }
}
</script>

<style>

.carousel-caption{
    color: rgb(0, 0, 0) !important
}

.blurred-text {
  background: rgba(255, 255, 255, 0.4); /* Fondo semitransparente */
  backdrop-filter: blur(10px); /* Nivel de desenfoque */
  padding: 10px 20px;
  border-radius: 8px;
  color: grey; /* Color del texto */
  font-weight: bold;
}

:root {
    --primary-color: #8B4513;
    --secondary-color: #D2691E;
    --accent-color: #FFA07A;
    --background-color: #FFF5E6;
    --text-color: #333;
}

body {
    font-family: 'Poppins', sans-serif;
    margin: 0;
    padding: 0;
    background-color: var(--background-color);
    color: var(--text-color);
    line-height: 1.6;
}

header {
    background-color: var(--primary-color);
    color: white;
    text-align: center;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
    margin: 0;
    font-family: 'Playfair Display', serif;
    font-size: 3rem;
    letter-spacing: 2px;
}

header p {
    font-size: 1.2rem;
    margin-top: 0.5rem;
    font-weight: 300;
}

nav {
    background-color: var(--secondary-color);
    padding: 1rem;
    text-align: center;
    position: sticky;
    top: 0;
    z-index: 1000;
}

nav a {
    color: white;
    text-decoration: none;
    padding: 0.7rem 1.5rem;
    margin: 0 0.5rem;
    border-radius: 25px;
    transition: all 0.3s ease;
    font-weight: 600;
}

nav a:hover {
    background-color: var(--accent-color);
    color: var(--primary-color);
}

main {
    max-width: 1200px;
    margin: 2rem auto;
    padding: 0 2rem;
}

.section-title {
    color: var(--primary-color);
    border-bottom: 2px solid var(--secondary-color);
    padding-bottom: 0.5rem;
    margin-top: 3rem;
    margin-bottom: 2rem;
    font-family: 'Playfair Display', serif;
    font-size: 2.2rem;
}

.product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 2rem;
}

.product-card {
    background-color: white;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}

.product-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.product-card img {
    width: 100%;
    height: 250px;
    object-fit: cover;
    transition: all 0.3s ease;
}

.product-card:hover img {
    transform: scale(1.05);
}

.product-info {
    padding: 1.5rem;
}

.product-info h3 {
    margin: 0;
    font-size: 1.2rem;
    color: var(--primary-color);
}

.product-info p {
    margin: 0.5rem 0 0;
    color: #666;
    font-size: 0.9rem;
}

/* Estilos para el slider */
.slider-container {
    position: relative;
    width: 100%;
    height: 500px;
    overflow: hidden;
    margin-bottom: 3rem;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.slider {
    display: flex;
    transition: transform 0.5s ease-in-out;
    height: 100%;
}

.slide {
    min-width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    text-align: center;
    background-size: cover;
    background-position: center;
    position: relative;
}

.slide::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 100%);
}

.slide-content {
    position: relative;
    padding: 2rem;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
}

.slide-content h2 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    font-family: 'Playfair Display', serif;
}

.slide-content p {
    font-size: 1.2rem;
    margin-top: 0;
}

.slider-nav {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
}

.slider-nav-item {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.5);
    margin: 0 5px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.slider-nav-item.active {
    background-color: white;
    transform: scale(1.2);
}

footer {
    background-color: var(--primary-color);
    color: white;
    text-align: center;
    padding: 2rem;
    margin-top: 3rem;
}

footer p {
    margin: 0;
    font-size: 1rem;
}

@media (max-width: 768px) {
    h1 {
        font-size: 2.5rem;
    }

    nav a {
        padding: 0.5rem 1rem;
        margin: 0 0.2rem;
    }

    .slider-container {
        height: 400px;
    }

    .slide-content h2 {
        font-size: 2rem;
    }

    .slide-content p {
        font-size: 1rem;
    }
}
</style>