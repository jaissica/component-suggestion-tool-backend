const ComponentMeta = require('../models/ComponentMeta');

exports.searchComponents = async (req, res) => {
  const q = req.query.q?.trim();
  if (!q) return res.status(400).json({ error: "Missing query param `q`" });

  try {
    let results = await ComponentMeta.find({ $text: { $search: q } });
    if (!results.length) {
      const words = q.toLowerCase().split(/\s+/);
      results = await ComponentMeta.find({
        tags: { $in: words },
      });
    }

    res.status(200).json(results);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
