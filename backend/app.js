const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;
const cors=require("cors");
const corsOptions ={
   origin:'https://react-app-server-eiuz5vmkl-areeb610.vercel.app/tasks', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

 // Use this after the variable declaration

// Connect to MongoDB
mongoose.connect('mongodb+srv://areebbutt610:iI2w9A8WJrfu8lvp@tasklistcluster.ynul9xc.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(express.json());
app.use(cors(corsOptions))

// Routes
const taskRoutes = require('./src/routes/taskRoutes');
app.use('/tasks', taskRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
