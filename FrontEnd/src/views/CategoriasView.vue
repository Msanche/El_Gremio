<template>
    <NavBar/>
    <h2>Explora Nuestras Artesanías</h2>
        <div class="category-grid">
            <div class="category-card">
                <img src="../images/crochet.jpg" alt="Tejidos artesanales coloridos" width="250" height="200">
                <h3>Crochet</h3>
                <div class="category-overlay">
                    <span>Ver Crochet</span>
                </div>
            </div>
        </div>
        <footer>
        <p>© 2023 El Gremio - Conectando Tradición y Modernidad</p>
    </footer>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
export default {
    data(){
        return{

        }
    },
    components:{
        NavBar
    }
}
</script>

<style scoped>
 :root {
        --primary-color: #b08d57;
        --secondary-color: #5c4a3d;
        --accent-color: #e9d8c4;
        --text-color: #333;
        --background-color: #f9f5f0;
    }
    body {
        font-family: 'Roboto', sans-serif;
        margin: 0;
        padding: 0;
        background-color: var(--background-color);
        color: var(--text-color);
    }
    header {
        background-color: var(--primary-color);
        color: white;
        text-align: center;
        padding: 2em;
        position: relative;
        overflow: hidden;
    }
    header::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url('https://example.com/texture.png') repeat;
        opacity: 0.1;
        z-index: 1;
    }
    header h1 {
        font-family: 'Playfair Display', serif;
        font-size: 3em;
        margin: 0;
        position: relative;
        z-index: 2;
    }
    header p {
        font-size: 1.2em;
        margin-top: 0.5em;
        position: relative;
        z-index: 2;
    }
    nav {
        background-color: var(--secondary-color);
        padding: 1em;
        display: flex;
        justify-content: center;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    nav a {
        color: white;
        text-decoration: none;
        padding: 0.5em 1em;
        margin: 0 0.5em;
        border-radius: 4px;
        transition: background-color 0.3s ease;
    }
    nav a:hover {
        background-color: var(--accent-color);
        color: var(--secondary-color);
    }
    main {
        max-width: 1200px;
        margin: 2em auto;
        padding: 0 2em;
    }
    h2 {
        font-family: 'Playfair Display', serif;
        color: var(--secondary-color);
        text-align: center;
        font-size: 2.5em;
        margin-bottom: 1em;
    }
    .category-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2em;
    }
    .category-card {
        background-color: white;
        border-radius: 12px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        text-align: center;
        transition: all 0.3s ease;
        overflow: hidden;
        position: relative;
        cursor: pointer;
    }
    .category-card:hover {
        transform: translateY(-10px);
        box-shadow: 0 6px 20px rgba(0,0,0,0.15);
    }
    .category-card img {
        width: 100%;
        height: 200px;
        object-fit: cover;
        transition: transform 0.3s ease;
    }
    .category-card:hover img {
        transform: scale(1.1);
    }
    .category-card h3 {
        margin: 1em 0;
        color: var(--secondary-color);
        font-size: 1.2em;
    }
    .category-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(92, 74, 61, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    .category-card:hover .category-overlay {
        opacity: 1;
    }
    .category-overlay span {
        color: white;
        font-size: 1.2em;
        padding: 0.5em 1em;
        border: 2px solid white;
        border-radius: 4px;
    }
</style>