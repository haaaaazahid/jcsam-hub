const mongoose = require('mongoose');

const sportSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, default: '' },
  rules: { type: String, default: '' },
  icon: { type: String, default: '' },
  banner_color: { type: String, default: '#0047b3' }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Sport', sportSchema);
