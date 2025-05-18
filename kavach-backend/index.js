
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const whatsappRoutes = require('./routes/whatsapp');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/whatsapp', whatsappRoutes);

app.get('/', (req, res) => {
  res.send('kavach backend is running 🚀');
});

app.listen(port, () => {
  console.log(`✅ Server listening on port ${port}`);
});
