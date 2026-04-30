const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  url: { type: String, required: true },
  caption: { type: String, default: '' },
  date: { type: Date, default: Date.now },
  sport_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Sport' 
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Gallery', gallerySchema);
