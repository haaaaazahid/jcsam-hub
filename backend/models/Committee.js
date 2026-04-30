const mongoose = require('mongoose');

const committeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, default: '' },
  designation: { type: String, default: '' },
  institution: { type: String, default: '' },
  image: { type: String, default: '' },
  display_order: { type: Number, default: 0 }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Committee', committeeSchema);
