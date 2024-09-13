<template>
  <header>
        <h1>Acerca de Nosotros</h1>
        <div class="craft-icon"></div>
    </header>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid ">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
      <div class="collapse navbar-collapse " id="navbarNav">
      <ul class="navbar-nav ">
       
        <li class="nav-item">
          <a class="nav-link" href="#" style="margin-right: 20px;">Categorías</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click="Carrito()" style="margin-right: 20px;">🛒 Carrito</a>
        </li>
        <li class="nav-item" style="margin-right: 20px;">
          <a class="nav-link disabled active-nav" aria-disabled="true" >Conocenos</a>
        </li>
        <li class="nav-item">
          <input type="search" placeholder="Buscar productos artesanales..." style="flex-grow: 1; max-width: 400px;">
        </li>
      </ul>
    </div>
   

  </div>

</nav>
    <div class="container">
        <div class="content">
            <section class="section">
                <h2>Nuestra Historia</h2>
                <p>Bienvenido al corazón de nuestra empresa artesanal. Fundada en 2015 con una pasión ardiente por las artes tradicionales, hemos crecido hasta convertirnos en un puente entre los talentosos artesanos locales y los amantes de lo auténtico y lo bello. Cada pieza que ofrecemos es un testimonio de nuestra dedicación a la excelencia y la originalidad.</p>
            </section>
            
            <section class="section">
                <h2>Nuestra Misión</h2>
                <p>En el núcleo de nuestra existencia está el compromiso inquebrantable de preservar y promover las técnicas artesanales que han sido transmitidas de generación en generación. Nos esforzamos por crear un mundo donde cada hogar pueda albergar un pedazo de historia, una obra de arte única que cuente una historia y evoque emociones. Nuestro objetivo es no solo vender productos, sino cultivar una apreciación por la artesanía y apoyar a las comunidades que mantienen vivas estas tradiciones.</p>
            </section>
            
            <section class="section">
                <h2>Nuestros Artesanos</h2>
                <p>Detrás de cada pieza hay manos expertas y corazones apasionados. Trabajamos con un grupo diverso de artesanos, cada uno un maestro en su oficio. Desde los ceramistas que dan forma a la arcilla con precisión meticulosa, hasta los tejedores que entrelazan historias en cada hilo, nuestros artesanos son el alma de nuestra empresa. Valoramos sus habilidades, respetamos sus tradiciones y nos esforzamos por ofrecerles una plataforma para compartir su arte con el mundo.</p>
            </section>
            

            <section class="section">
                <h2>Contáctanos</h2>
                <p>Tu interés en nuestras artesanías es el motor que impulsa nuestra pasión. Ya sea que tengas preguntas sobre nuestras piezas, desees hacer un pedido especial o simplemente quieras compartir tu amor por la artesanía, estaremos encantados de escucharte. Visítanos en nuestra tienda para sumergirte en el mundo de la artesanía o contáctanos en línea para comenzar tu viaje con nosotros.</p>
                <div class="contact-info">
                    <div class="contact-item">
                        <i class="fas fa-envelope"></i>
                        <a href="mailto:info@artesaniaunica.com">info@artesaniaunica.com</a>
                    </div>
                    <div class="contact-item">
                        <i class="fas fa-phone"></i>
                        <a href="tel:+523331234567">+52 (33) 1234-5678</a>
                    </div>
                    <div class="contact-item">
                        <i class="fab fa-facebook-f"></i>
                        <a href="https://www.facebook.com/artesaniaunica" target="_blank">Facebook: @artesaniaunica</a>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import router from '@/router';

export default {
  data(){
    return{
    
    }
  },
  methods:{
    Carrito(){
      router.push('/carrito')

    }
  }
}
</script>
<style scoped>
    
    body {
        font-family: 'Roboto', sans-serif;
        background-color: #EFEBE9;
        color:  #3E2723;
        line-height: 1.8;
        margin: 0;
        padding: 0;
    }
    
    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 40px 20px;
    }
    
    header {
      background: linear-gradient(135deg, #c69c6d 0%, #8b4513 100%);
      color: #EFEBE9;
        text-align: center;
        position: relative;
        overflow: hidden;
    }
    
    h1, h2 {
        font-family: 'Playfair Display', serif;
        margin: 0;
    }
    
    h1 {
        font-size: 3em;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }
    
    .content {
        background-color: #ffffff;
        border-radius: 15px;
        padding: 40px;
        margin-top: 40px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    }
    
    .craft-icon {
        width: 72px;
        height: 72px;
        margin: 20px auto;
        background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23EFEBE9"><path d="M12 3L1 9l11 6 9-4.91V17h2V9M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/></svg>') no-repeat center center;
        animation: float 6s ease-in-out infinite;
    }
    
    @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
        100% { transform: translateY(0px); }
    }
    
    .btn {
        display: inline-block;
        background-color:   #c69c6d;
        color:  #3E2723;
        padding: 12px 24px;
        text-decoration: none;
        border-radius: 30px;
        transition: all 0.3s ease;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 1px;
    }
    
    .btn:hover {
        background-color: #8D6E63;
        color: #EFEBE9;
        transform: translateY(-3px);
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    }
    
    .gallery {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
        margin-top: 40px;
    }
    
    .gallery-item {
        position: relative;
        overflow: hidden;
        border-radius: 15px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        transition: all 0.3s ease;
    }
    
    .gallery-item img {
        width: 100%;
        height: 300px;
        object-fit: cover;
        transition: transform 0.3s ease;
    }
    
    .gallery-item:hover img {
        transform: scale(1.1);
    }
    
    .gallery-item::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%);
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .gallery-item:hover::after {
        opacity: 1;
    }
    
    .gallery-item-caption {
        position: absolute;
        bottom: 20px;
        left: 20px;
        right: 20px;
        color: #fff;
        z-index: 1;
        opacity: 0;
        transition: opacity 0.3s ease, transform 0.3s ease;
        transform: translateY(20px);
    }
    
    .gallery-item:hover .gallery-item-caption {
        opacity: 1;
        transform: translateY(0);
    }
    
    .section {
        margin-bottom: 40px;
    }
    
    .section h2 {
        position: relative;
        display: inline-block;
        margin-bottom: 20px;
    }
    
    .section h2::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: -5px;
        width: 50px;
        height: 3px;
        background-color:  #FFAB91;
    }

    .contact-info {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        margin-top: 20px;
    }

    .contact-item {
        display: flex;
        align-items: center;
        margin: 10px;
        padding: 15px;
        background-color:  #D7CCC8;
        border-radius: 10px;
        transition: all 0.3s ease;
    }

    .contact-item:hover {
        transform: translateY(-5px);
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }

    .contact-item i {
        font-size: 24px;
        margin-right: 10px;
        color: #8D6E63;
    }

    .contact-item a {
        color:  #3E2723;
        text-decoration: none;
        font-weight: bold;
    }

    .contact-item a:hover {
        color: #8D6E63;
    }

    nav {
        min-width: 120px;
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
        border-radius: 10px;
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
    /* Add media queries for responsive design */
    @media (max-width: 768px) {
        h1 {
            font-size: 2em;
        }

        .content {
            padding: 20px;
        }

        .contact-info {
            flex-direction: column;
        }

        nav{            
          flex-direction: column;
        }

        .responsive{
          margin-bottom: 15px;
        }

        .contact-item {
            width: 100%;
            margin: 10px 0;
        }

        header {
            padding: 1em 0;
        }
    }

    @media (max-width: 480px) {
        h1 {
            font-size: 1.5em;
        }

        h2 {
            font-size: 1.2em;
        }

        .craft-icon {
            width: 80px;
            height: 80px;
        }

        .btn {
            padding: 10px 20px;
            font-size: 0.9em;
        }
    }
</style>