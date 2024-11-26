<template>
    <!-- Modal -->
    <div class="modal fade" id="AddProduct" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1>Detalles del Producto</h1>
                    <button type="button" class="btn-close" aria-label="Close" @click="CloseModal()"></button>
                </div>
                <div class="modal-body">
                    <div class="container">
                        <form class="product-form" @submit.prevent="CreateProduct()">

                            <div class="form-group">
                                <label for="productImage">Imagen del Producto:</label>
                                <div class=" image-placeholder" v-if="!imagePreview">
                                    <button class="btn-file-input" type="button" @click="selectFile"
                                        style="color:#8B4513; background-color: #D2B48C;">Seleccionar
                                        Imagen</button>
                                    <input type="file" id="productImage" ref="productImage" accept="image/*" required
                                        @change="handleFileChange" style="display: none" />
                                </div>
                                <span class="file-input-name">{{ fileName }}</span>
                                <p class="help-text">Seleccione una imagen clara (formatos: JPG, PNG)</p>

                                <div v-if="imagePreview" class="image-preview">
                                    <img style="cursor: pointer;" :src="imagePreview" alt="Vista previa de la imagen"
                                        @click="imagePreview = false" />
                                </div>
                            </div>

                            <!-- Miniatura de la imagen -->

                            <div>
                                <div class="form-group">
                                    <label for="product-name">Nombre del Producto</label>
                                    <input v-model="ProductoName" type="text" id="product-name" name="product-name">
                                </div>
                                <div class="form-group">
                                    <label for="product-category">Categoría</label>
                                    <select id="product-category" name="product-category" class="category-select">
                                        <option value="">Selecciona una categoría</option>
                                        <option v-for="(item, index) in category" :key="index" :value="item">
                                            {{ item.categoria }}
                                        </option>
                                    </select>

                                </div>
                                <div class="form-group">
                                    <label for="product-description">Descripción del Producto</label>
                                    <textarea id="product-description" name="product-description" rows="4"
                                        v-model="description" @input="updateCharacterCount"></textarea>
                                    <div class="character-count">{{ characterCount }} / 255 caracteres</div>
                                </div>
                                <div class="form-group">
                                    <label>Medidas Sugeridas</label>
                                    <div class="dimensions">
                                        <label class="dimension-option">
                                            <input type="radio" name="medidas" value="Chico" v-model="selectedSize" />
                                            <span>{{ Chico }}</span>
                                        </label>
                                        <label class="dimension-option">
                                            <input type="radio" name="medidas" value="Mediano" v-model="selectedSize" />
                                            <span>{{ Mediano }}</span>
                                        </label>
                                        <label class="dimension-option">
                                            <input type="radio" name="medidas" value="Grande" v-model="selectedSize" />
                                            <span>{{ Grande }}</span>
                                        </label>
                                    </div>
                                </div>

                            </div>
                            <div class="buttons">
                                <button type="button" class="btn-secondary" @click="CloseModal()">Cancelar</button>
                                <button type="submit" class="btn-primary">OK</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="modal-footer">

                </div>
            </div>
        </div>
    </div>

</template>

<script>
import bootstrap from "bootstrap/dist/js/bootstrap.min.js";
import axios from "axios";
export default {
    data() {
        return {
            ProductoName: '',
            selectedFile: '',
            fileName: '',
            imagePreview: '',
            Chico: 'Chico',
            Mediano: 'Mediano',
            Grande: 'Grande',
            category: [],
            description: '',
            characterCount: 0,
            selectedSize: ''
        }
    },
    methods: {

        updateCharacterCount() {
            this.characterCount = this.description.length;
        },
        CloseModal() {
            const modalElement = document.getElementById("AddProduct");
            const modal = bootstrap.Modal.getInstance(modalElement);
            modal.hide();
        },
        selectFile() {
            this.$refs.productImage.click();
        },
        handleFileChange(event) {
            const file = event.target.files[0];
            this.selectedFile = event.target.files[0];
            this.fileName = file?.name || '';
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.imagePreview = e.target.result; // Establecer la imagen de vista previa
                };
                reader.readAsDataURL(file);
            } else {
                this.imagePreview = ''; // Reiniciar si no se selecciona archivo
            }
        },
        async GetCategorys() {
            try {
                const response = await axios.get(`http://localhost:3000/categorias`);
                console.log(response.data)
                this.category = response.data
            } catch (err) {
                console.error('Error al obtener los usuarios:', err);
            }
        },
       async  CreateProduct(){
            try {
        // Datos del usuario que quieres enviar en el body
         const  usuario = {
          productoNombre: this.ProductoName,
          nombre: this.nombre,
          apellido: this.apellidos,
          numeroCelular: this.tel,
          contrasena: this.password
        };
        

        let respuesta

        if (this.selectedType == 'vendedor') {
          const formData = new FormData();
          formData.append('usuario', JSON.stringify(usuario));
          formData.append('nombre_marca', this.nombre_marca);
          formData.append('imagen', this.selectedFile); // `selectedFile` es el archivo de imagen seleccionado
          
          // Hacer la solicitud POST
          respuesta = await axios.post('http://localhost:3000/usuarios-vendedores', formData, {
            headers: {
              'Content-Type': 'multipart/form-data' // Aunque Axios lo establece automáticamente, es buena práctica
            }
          });

        } else {
          // Hacer la solicitud POST
          console.log(usuario)
          respuesta = await axios.post('http://localhost:3000/usuarios-clientes', usuario);

        }
        if (respuesta) {
          let payload = "Registro"
          this.$store.commit('LoginRegistro', payload);
          this.ModalExito();

        }



        // Manejo de la respuesta
        console.log('Usuario creado:', respuesta.data);
      } catch (error) {
        // Manejo de errores
        if (error.response) {
          console.error('Error en la respuesta:', error.response.data);
        } else if (error.request) {
          console.error('Error en la solicitud:', error.request);
        } else {
          console.error('Error:', error.message);
        }
      }
        },
    },
    mounted() {
        this.GetCategorys();
    }
}
</script>

<style scoped>
.image-preview img {
    max-width: 100%;
    max-height: 200px;
    /* Limitar la altura de la vista previa */
    border: 1px solid #ddd;
    border-radius: 8px;
    margin-bottom: 20px;
}

h1 {
    color: #8B4513;
    text-align: center;
    margin-bottom: 30px;
}

.product-form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
}

.image-placeholder {
    background-color: #D2B48C;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 48px;
    color: #8B4513;
    border-radius: 5px;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #6B4423;
}

input[type="text"],
textarea,
select {
    width: 100%;
    padding: 8px;
    border: 1px solid #D2B48C;
    border-radius: 4px;
    background-color: #FFF9F0;
}

.dimensions {
    display: flex;
    /* Permite que los botones se muevan a una nueva línea si es necesario */
    justify-content: space-between;
    gap: 10px;
    flex-wrap: wrap;
}

.dimension-option {
    display: flex;
    align-items: center;
    background-color: #D2B48C;
    /* Fondo del botón */
    color: #4A3728;
    /* Color del texto */
    border-radius: 5px;
    padding: 10px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
    border: 2px solid transparent;
    /* Bordes transparentes por defecto */
    flex: 1 1 30%;
    /* Permite que cada botón ocupe al menos el 30% del ancho disponible, pero pueda reducirse si es necesario */
    max-width: 100px;
    /* Establece un ancho máximo para evitar que se estiren demasiado */
}

.dimension-option:hover {
    background-color: #C19A6B;
    /* Color de fondo en hover */
}

/* Estilo para la entrada del radio */
.dimension-option input[type="radio"] {
    display: none;
    /* Oculta el botón de radio real */
}

/* Estilo cuando el radio está seleccionado */
.dimension-option input[type="radio"]:checked+span {
    background-color: #8B4513;
    /* Color de fondo cuando está seleccionado */
    color: #FFF9F0;
    /* Color del texto cuando está seleccionado */

}

.dimension-option span {
    display: block;
    /* Para asegurar que el texto ocupe el espacio completo */
}


.buttons {
    grid-column: 1 / -1;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
}

button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.btn-primary {
    background-color: #8B4513;
    color: #FFF9F0;
}

.btn-secondary {
    background-color: #D2B48C;
    color: #4A3728;
}

.btn-primary:hover {
    background-color: #6B4423;
}

.btn-secondary:hover {
    background-color: #C19A6B;
}

textarea {
    resize: vertical;
    min-height: 100px;
}

.character-count {
    font-size: 0.8em;
    color: #6B4423;
    text-align: right;
    margin-top: 5px;
}

.category-select {
    appearance: none;
    background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%238B4513%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');
    background-repeat: no-repeat;
    background-position: right 0.7em top 50%;
    background-size: 0.65em auto;
}
</style>