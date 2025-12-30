import mongoose from 'mongoose'

const PasteSchema = new mongoose.Schema({
  content: { type: String, required: true },
  expiresAt: { type: Date, default: null },
  maxViews: { type: Number, default: null },
  viewCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.models.Paste ||
  mongoose.model('Paste', PasteSchema)
