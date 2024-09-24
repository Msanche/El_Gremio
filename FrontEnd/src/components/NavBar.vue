<template>
    <header>
        <h1>El Gremio</h1>
        <p>Llevando la Tradición al Mundo Digital</p>
    </header>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid ">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse " id="navbarNav">
                <ul class="navbar-nav ">
                    <li class="nav-item">
                        <a class="nav-link" :class="{ disable: isActiveH, 'active-nav': isActiveH }" @click="Home()"
                            type="button" style="margin-right: 20px;">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" :class="{ disable: isActiveCtg, 'active-nav': isActiveCtg }" @click="Category()"
                            type="button" style="margin-right: 20px;">Categorías</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link " :class="{ disable: isActiveC, 'active-nav': isActiveC }" @click="Carrito()"
                            type="button" style="margin-right: 20px;">🛒 Carrito</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link "  :class="{ disable: isActiveA, 'active-nav': isActiveA }" @click="About()"
                        type="button" style="margin-right: 20px;">Conocenos 👥</a>
                    </li>
                    <li class="nav-item">
                        <input type="search" placeholder="Buscar productos artesanales..."
                            style="flex-grow: 1; max-width: 400px;">
                    </li>
                </ul>
            </div>


        </div>

    </nav>
</template>

<script>
import router from '@/router';
export default {
    data() {
        return {
            
        }
    },
    props:{
        isActiveCtg: Boolean,
        isActiveC: Boolean,
        isActiveA: Boolean,
        isActiveH: Boolean,
    },
    methods:{
        About(){
            router.push('/about')
        },
        Carrito(){
            router.push('/carrito')
        },
        Home(){
            router.push('/home')
        },
        Category(){
            router.push('/categorias')
        }

    }
}
</script>

<style scoped>
nav {
    background-color: #c69c6d;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

nav button,
nav input {
    background-color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-family: 'Montserrat', sans-serif;
    transition: all 0.3s ease;
}

nav .active-nav {
    border-radius: 10px;
    background-color: #a0522d;
    color: white;
    font-weight: bold;
    transform: scale(1.05);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

nav button:hover {
    background-color: #a0522d;
    color: white;
}

nav input {
    width: 250px;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

nav .active-nav {
    border-radius: 10px;
    background-color: #a0522d;
    color: white;
    font-weight: bold;
    transform: scale(1.05);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

header {
    background: linear-gradient(135deg, #c69c6d 0%, #8b4513 100%);
    color: #f0e0c8;
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
    opacity: 0.1;
    z-index: 0;
}

h1,
h2,
h3 {
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
</style>