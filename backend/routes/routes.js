const express = require('express');
const Model = require('../models/model');
const router = express.Router();
const multer = require('multer');
const storage = require('../firebaseConfig');
const upload = multer({ storage: multer.memoryStorage() });

//Post Method
router.post('/post', async (req, res) => {
    const data = new Model({
        name: req.body.name,
        age: req.body.age
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Get all Method
router.get('/getAll', async (req, res) => {
    try {
        const data = await Model.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})


//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
    try {
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Corrected upload route
router.post('/upload', upload.single('image'), async (req, res) => {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
  
    try {
      const { ref, uploadBytes, getDownloadURL } = require('firebase/storage'); // Ensure this is imported correctly
      const { storage } = require('../firebaseConfig'); // Make sure storage is properly initialized
  
      const file = req.file;
      const fileRef = ref(storage, `images/${Date.now()}-${file.originalname}`); // Create a reference to the storage location
  
      // Upload the file buffer
      await uploadBytes(fileRef, file.buffer);
  
      // Get the download URL of the uploaded image
      const url = await getDownloadURL(fileRef);
  
      // Save the URL somewhere (e.g., in the array or database)
      imageUrls.push(url); // Add the URL to the in-memory array or replace with database save
  
      res.status(200).json({ url });
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  

module.exports = router;