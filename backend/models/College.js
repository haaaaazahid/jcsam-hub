const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, default: '' },
  contact_person: { type: String, default: '' },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  logo: { type: String, default: '' },
  status: { 
    type: String, 
    enum: ['active', 'pending', 'inactive'],
    default: 'pending' 
  },
  registration_date: { type: Date, default: Date.now }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('College', collegeSchema);
