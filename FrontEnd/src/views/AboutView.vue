<template>
 <NavBar isActiveA="True"/>
    <div class="container">
        <div class="content">
            <section class="section">
                <h2>Nuestra Historia</h2>
                <p>Desde nuestros inicios, "El Gremio" nació con el propósito de conectar a los artesanos con un mundo que valora la autenticidad y la creatividad. Inspirados por las historias, las manos y los corazones de quienes transforman materiales simples en obras únicas, creamos una plataforma que honra la herencia cultural y el talento artesanal. Nuestro recorrido está marcado por la pasión de empoderar a cada artesano para que sus productos trasciendan fronteras, llevando consigo una pieza de su esencia y tradición.</p>
            </section>
            
            <section class="section">
                <h2>Nuestra Misión</h2>
                <p>En "El Gremio", nuestra misión es construir un puente entre los artesanos y los amantes de la artesanía auténtica. Buscamos ofrecer un espacio donde el talento local pueda florecer, brindando herramientas digitales que permitan a los creadores compartir su arte y a los clientes descubrir productos únicos que cuenten una historia. Nos comprometemos a fomentar la sostenibilidad, la inclusión y el reconocimiento del trabajo artesanal como una expresión cultural invaluable.</p>
            </section>
            
            <section class="section">
                <h2>Nuestros Artesanos</h2>
                <p>Detrás de cada producto de "El Gremio" hay manos que moldean, tejen y crean con dedicación y maestría. Nuestros artesanos son guardianes de tradiciones que han sido transmitidas de generación en generación, innovadores que encuentran en cada pieza una forma de expresar su identidad. Trabajamos con creadores de todas partes, celebrando su diversidad y apoyando su esfuerzo por preservar técnicas ancestrales mientras se adaptan a las demandas del mundo moderno.</p>
            </section>
            

            <section class="section">
                <h2>Contáctanos</h2>
                <p>Tu interés en nuestras artesanías es el motor que impulsa nuestra pasión. Ya sea que tengas preguntas sobre nuestras piezas, desees hacer un pedido especial o simplemente quieras compartir tu amor por la artesanía, estaremos encantados de escucharte. Visítanos en nuestra tienda para sumergirte en el mundo de la artesanía o contáctanos en línea para comenzar tu viaje con nosotros.</p>
                <div class="contact-info">
                    <div class="contact-item">
                        <i class="fas fa-envelope"></i>
                        <a href="mailto:20460307@colima.tecnm.mx">20460307@colima.tecnm.mx</a>
                    </div>
                    <div class="contact-item">
                        <i class="fas fa-phone"></i>
                        <a href="tel:+52333123090046">+52 (33) 312 309 0046</a>
                    </div>
                    <div class="contact-item">
                        <i class="fab fa-facebook-f"></i>
                        <a href="https://www.facebook.com/miguel.minion" target="_blank">Facebook: @Miguel Ureña</a>
                    </div>
                </div>
            </section>
        </div>
    </div>
    <footer>
        <p>© 2024 El Gremio - Conectando Tradición y Modernidad</p>
    </footer>
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