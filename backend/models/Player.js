const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  contact: { type: String, required: true },
  id_document: { type: String, default: '' },
  status: { 
    type: String, 
    enum: ['active', 'pending', 'inactive'],
    default: 'pending' 
  },
  college_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'College' 
  },
  sport_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Sport' 
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Player', playerSchema);
