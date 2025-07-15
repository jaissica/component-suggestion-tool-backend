const mongoose = require("mongoose");

const componentMetaSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  description: String,
  usage: String,
  tags: [String],
  category: String,
  createdAt: { type: Date, default: Date.now },
});

componentMetaSchema.index({ name: "text", description: "text" });

module.exports = mongoose.model("ComponentMeta", componentMetaSchema);
