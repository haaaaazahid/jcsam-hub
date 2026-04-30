const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, default: '' },
  venue: { type: String, default: '' },
  status: { 
    type: String, 
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
    default: 'upcoming' 
  },
  team1: { type: String, default: '' },
  team2: { type: String, default: '' },
  sport_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Sport' 
  },
  result_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Result' 
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Schedule', scheduleSchema);
