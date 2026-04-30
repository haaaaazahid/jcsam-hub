const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  score: { type: String, default: '' },
  winner: { type: String, default: '' },
  summary: { type: String, default: '' },
  schedule_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Schedule' 
  },
  sport_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Sport' 
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Result', resultSchema);
