// controllers/reviewController.js
const Review = require('../models/review');

// Obtener todas las reviews
exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las reviews', error });
  }
};

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
  try {
    const { review, calificacion, fk_id_pagina, fk_id_cliente } = req.body;
    const newReview = await Review.create({ review, calificacion, fk_id_pagina, fk_id_cliente });
    res.status(201).json(newReview);
  } catch (error) {
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
