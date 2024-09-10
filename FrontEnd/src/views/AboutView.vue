<template>
  <header>
        <h1>Acerca de Nosotros</h1>
        <div class="craft-icon"></div>
    </header>
    <div class="container">
        <div class="content">
            <section class="section">
                <h2>Quienes Somos</h2>
                <p>Somos una empresa dedicada a la venta de artesanías únicas y auténticas. Nuestro compromiso es preservar y promover las tradiciones artesanales, conectando a talentosos artesanos con amantes de lo hecho a mano. Cada pieza que ofrecemos cuenta una historia y lleva consigo el corazón y el alma de su creador.</p>
                <p>Fundada con la pasión por las artes tradicionales, nos esforzamos por ser un puente entre la rica herencia cultural y el mundo moderno. Trabajamos directamente con artesanos locales, asegurando que cada producto sea una obra maestra de calidad y autenticidad.</p>
                <p>Nuestra misión es no solo ofrecer productos excepcionales, sino también apoyar a las comunidades artesanales, preservar técnicas ancestrales y fomentar la apreciación por el trabajo hecho a mano. Creemos en el poder de la artesanía para enriquecer nuestras vidas y hogares con belleza y significado.</p>
            </section>
            
            <section class="section">
                <h2>Contacto</h2>
                <p>Nos encantaría saber de ti. Aquí tienes varias formas de contactarnos:</p>
                <div class="contact-info">
                    <div class="contact-item">
                        <i class="fas fa-phone"></i>
                        <a href="tel:+525551234567">+52 55 5123 4567</a>
                    </div>
                    <div class="contact-item">
                        <i class="fas fa-envelope"></i>
                        <a href="mailto:info@artesaniasunicas.com">info@artesaniasunicas.com</a>
                    </div>
                </div>
                <div class="social-media">
                    <a href="https://www.facebook.com/artesaniasunicas" target="_blank" rel="noopener noreferrer">
                        <i class="fab fa-facebook"></i>
                    </a>
                    <a href="https://www.instagram.com/artesaniasunicas" target="_blank" rel="noopener noreferrer">
                        <i class="fab fa-instagram"></i>
                    </a>
                </div>
            </section>
        </div>
    </div>
</template>
<style scoped>
:root {
  --background-color: #EFEBE9;
}

body {
  font-family: 'Roboto', sans-serif;
  background-color: #EFEBE9;
  color: #3E2723;
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
  background-color:  #8D6E63;
  color: #EFEBE9;
  text-align: center;
  padding: 2em 0;
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
  width: 100px;
  height: 100px;
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
  background-color: #FFAB91;
  color: #3E2723;
  padding: 12px 24px;
  text-decoration: none;
  border-radius: 30px;
  transition: all 0.3s ease;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.btn:hover {
  background-color:  #8D6E63;
  color: #EFEBE9;
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
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
  background-color: #FFAB91;
}

.contact-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.contact-item {
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: #D7CCC8;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.contact-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.contact-item i {
  font-size: 24px;
  margin-right: 15px;
  color:  #8D6E63;
}

.contact-item a {
  color: #3E2723;
  text-decoration: none;
  font-weight: bold;
}

.contact-item a:hover {
  color:  #8D6E63;
}

.social-media {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.social-media a {
  display: inline-block;
  margin: 0 15px;
  font-size: 24px;
  color:  #8D6E63;
  transition: all 0.3s ease;
}

.social-media a:hover {
  color: #FFAB91;
  transform: scale(1.2);
}
</style>