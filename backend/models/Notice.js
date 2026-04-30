const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, default: '' },
  date: { type: Date, default: Date.now },
  priority: { 
    type: String, 
    enum: ['low', 'medium', 'high'],
    default: 'low' 
  },
  image: { type: String, default: '' },
  pdf_url: { type: String, default: '' },
  sport_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Sport' 
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Notice', noticeSchema);
