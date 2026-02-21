const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 8080;

const cookieParser = require('cookie-parser')
const {currentUserExist} = require('./middlewares/Mauth')

const ProductRouter = require('./router/Product')
const ColorRouter = require('./router/Color')
const CategoryRouter = require('./router/Category')
const SizeRouter = require('./router/Size')
const userRouter = require('./router/userrouter')
// Middleware
const cors = require("cors");
// app.use(cors());
app.use(cors({
  origin: "http://localhost:5173",
  credentials:true
}));
/* “Backend allows requests only from the Vite frontend.” */
app.use(express.json());
app.use(cookieParser())
// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/nikeClone')
  .then(() => {
    console.log('MongoDB connected successfully');

    // Start server only after DB connects
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error.message);
  });

// Routes
app.get('/', (req, res) => {
  res.send('Hi, I am back');
});

app.use('/products',currentUserExist,ProductRouter)
app.use('/colors',ColorRouter)
app.use('/categories',CategoryRouter)
app.use('/sizes',SizeRouter)
app.use('/user',userRouter)

// app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });

