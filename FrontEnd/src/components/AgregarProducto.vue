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
                                        @change="handleFileChange($event)" style="display: none" />
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
                                    <select id="product-category" name="product-category" class="category-select"
                                        v-model="categoriaSelected">
                                        <option value="">Selecciona una categoría</option>
                                        <option v-for="(item, index) in category" :key="index" :value="item">
                                            {{ item.categoria }}
                                        </option>
                                    </select>

                                </div>
                                <div class="form-group">
                                    <label for="product-price">Stock del producto</label>
                                    <input class="price" v-model="stockProduct" type="number" id="product-price"
                                        name="Precio">

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
                                            <input type="checkbox" value="Chico" v-model="selectedSizes" />
                                            <span>{{ Chico }}</span>
                                        </label>

                                        <label class="dimension-option">
                                            <input type="checkbox" value="Mediano" v-model="selectedSizes" />
                                            <span>{{ Mediano }}</span>
                                        </label>
                                        <label class="dimension-option">
                                            <input type="checkbox" value="Grande" v-model="selectedSizes" />
                                            <span>{{ Grande }}</span>
                                        </label>
                                    </div>
                                    <div class="dimensions" v-if="selectedSizes.includes('Chico')">
                                        <label for="product-price">Precio del tamaño Chico</label>
                                        <input class="price" v-model="PriceProductChico" type="number"
                                            id="product-price" name="Precio">
                                    </div>
                                    <div class="dimensions" v-if="selectedSizes.includes('Mediano')">
                                        <label for="product-price">Precio del tamaño Mediano</label>
                                        <input class="price" v-model="PriceProductMediano" type="number"
                                            id="product-price" name="Precio">
                                    </div>
                                    <div class="dimensions" v-if="selectedSizes.includes('Grande')">
                                        <label for="product-price">Precio del tamaño Grande</label>
                                        <input class="price" v-model="PriceProductGrande" type="number"
                                            id="product-price" name="Precio">
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
            selectedSizes: [],
            categoriaSelected: [],
            stockProduct: 0,
            PriceProductChico: 0,
            PriceProductMediano: 0,
            PriceProductGrande: 0
        }
    },
    computed: {
        characterCount() {
            return this.description.length; // Cuenta de caracteres actual
        },
    },
    methods: {

        clearForm() {
            this.ProductoName = ''
            this.selectedFile = ''
            this.description = ''
            this.selectedSizes = []
            this.categoriaSelected = []
            this.stockProduct = 0
            this.PriceProductChico = 0
            this.PriceProductMediano = 0
            this.PriceProductGrande = 0
        },

        updateCharacterCount() {
            console.log(this.description.length)
            if (this.description.length > 255) {
                this.description = this.description.slice(0, 255);
            }
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
        async CreateProduct() {
         
                const nombreVendedor = localStorage.getItem("nombre");

                // Datos del usuario que quieres enviar en el body
                // Construcción del objeto producto
                const producto = {
                    nombre: this.ProductoName,
                    stock: this.stockProduct,
                    descripcion: this.description,
                    fk_id_vendedor: nombreVendedor,
                    fk_id_categorias: this.categoriaSelected.id_categoria,
                };

                // Construcción del objeto tamanos
                const tamanos = [
                    this.PriceProductChico && { nombre_size: "Chico", precio: this.PriceProductChico },
                    this.PriceProductMediano && { nombre_size: "Mediano", precio: this.PriceProductMediano },
                    this.PriceProductGrande && { nombre_size: "Grande", precio: this.PriceProductGrande },
                ].filter(Boolean); // Filtrar precios válidos

                // Crear instancia de FormData
                const formData = new FormData();
                formData.append('nombre_imagen', this.selectedFile); // Archivo seleccionado
                formData.append('producto', JSON.stringify(producto)); // Convertir el objeto a JSON
                formData.append('tamanos', JSON.stringify(tamanos));  // Convertir el array a JSON

                // Hacer la solicitud POST
                try {
                    const respuesta = await axios.post('http://localhost:3000/productos', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data', // Axios lo maneja automáticamente, pero no está de más incluirlo
                        },
                    });

                    console.log('Respuesta del servidor:', respuesta.data);
                    let payload = "Registro"
                    this.$store.commit('LoginRegistro', payload);
                    this.ModalExito();
                } catch (error) {
                    console.error('Error en la solicitud:', error.response?.data || error.message);
                }

           
        },
    },
    mounted() {
        this.GetCategorys();
    }
}
</script>

<style scoped>
.price {
    width: 100%;
    padding: 8px;
    border: 1px solid #D2B48C;
    border-radius: 4px;
    background-color: #FFF9F0;
}

.modal {
    --bs-modal-width: 1000px !important
}

@media (max-width: 768px) {
    .modal {
        --bs-modal-width: 500px !important
    }
}

.container {
    display: block;

}

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
    justify-content: space-between;
    gap: 15px;
    flex-wrap: wrap;
    padding: 10px;
    background-color: #F5F5DC;
    /* Fondo suave para el contenedor */
    border-radius: 10px;
    border: 1px solid #C19A6B;
    /* Añade un borde ligero */
}

.dimension-option {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #D2B48C;
    /* Fondo base del botón */
    color: #4A3728;
    /* Color del texto */
    border-radius: 8px;
    padding: 12px 15px;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 2px solid transparent;
    /* Bordes transparentes por defecto */
    flex: 1 1 30%;
    /* Diseño flexible para adaptarse al ancho */
    max-width: 120px;
    /* Control del ancho máximo */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    /* Sombra ligera para elevar los botones */
    text-align: center;
}

.dimension-option input[type="checkbox"] {
    display: none;
    /* Ocultar el checkbox predeterminado */
}

.dimension-option span {
    font-size: 14px;
    font-weight: bold;
    text-transform: capitalize;
}

/* Estilo para hover */
.dimension-option:hover {
    background-color: #C19A6B;
    /* Fondo más oscuro al pasar el mouse */
    color: #FFFFFF;
    /* Texto blanco para contraste */
    border-color: #8B4513;
    /* Borde destacado en hover */
}

/* Estilo para cuando el checkbox está seleccionado */
.dimension-option input[type="checkbox"]:checked+span {
    background-color: #8B4513;
    color: #FFFFFF;
    padding: 10px 12px;
    border-radius: 8px;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
    /* Efecto de "presionado" */
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