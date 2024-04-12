// routes/documents.js
const express = require('express');
const router = express.Router();
const Document = require('../models/Document');
const verifyToken = require('../middlewares/verifyToken');

router.post('/', verifyToken, async (req, res) => {
  const { name, content } = req.body;

  // Create new document
  const newDocument = new Document({ name, content, user: req.user._id });
  await newDocument.save();

  res.status(201).json({ message: 'Document created successfully' });
});

router.get('/', verifyToken, async (req, res) => {
    const documents = await Document.find({ user: req.user._id });
    res.json(documents);
  });


router.put('/:id', verifyToken, async (req, res) => {
    const { name, content } = req.body;
  
    // Check if document exists and belongs to the user
    const document = await Document.findOne({ _id: req.params.id, user: req.user._id });
    if (!document) return res.status(404).json({ message: 'Document not found' });
  
    // Update document
    document.name = name;
    document.content = content;
    document.createdAt = Date.now();
    await document.save();
  
    res.json({ message: 'Document updated successfully' });
  });

  router.delete('/:id', verifyToken, async (req, res) => {
    // Check if document exists and belongs to the user
    const document = await Document.findOne({ _id: req.params.id, user: req.user._id });
    if (!document) return res.status(404).json({ message: 'Document not found' });
  
    // Delete document
    await Document.deleteOne({ _id: req.params.id });
  
    res.json({ message: 'Document deleted successfully' });
  });

module.exports = router;