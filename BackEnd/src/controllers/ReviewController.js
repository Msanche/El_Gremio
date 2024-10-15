// controllers/reviewController.js
const Review = require('../models/review');
const { sequelize } = require('../models/review'); // Asegúrate de importar la instancia de Sequelize

// Obtener todas las reviews
exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las reviews', error });
  }
};

exports.getReviewsByIdPage = async(req, res) =>{
  try{
    const { fk_id_pagina } = req.params;

    const reviews = await Review.findAll({where:{fk_id_pagina}});

    if(!reviews|| reviews.length === 0){
      return res.status(404).json({message: `Reviews con idPagina = ${fk_id_pagina} no encontrado`})
    }
    res.json(reviews);

  }catch(error){
    res.status(500).json({ message: 'Error al obtener las reviews por idPagina', error });
  }
}

// Obtener una review por ID
exports.getReviewById = async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review no encontrada' });
    }
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la review', error });
  }
};

// Crear una nueva review

exports.createReview = async (req, res) => {
  const t = await sequelize.transaction(); // Inicia la transacción
  try {
    const newReview = await Review.create(req.body, { transaction: t }); // Inserta dentro de la transacción
    await t.commit(); // Confirma la transacción si todo salió bien
    res.status(201).json(newReview);
  } catch (error) {
    await t.rollback(); // Revertir cambios en caso de error
    res.status(500).json({ message: 'Error al crear la review', error });
  }
};


// Actualizar una review
exports.updateReview = async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review no encontrada' });
    }
    const { review: updatedReview, calificacion } = req.body;
    await review.update({ review: updatedReview, calificacion });
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la review', error });
  }
};

// Eliminar una review
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review no encontrada' });
    }
    await review.destroy();
    res.json({ message: 'Review eliminada' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la review', error });
  }
};
