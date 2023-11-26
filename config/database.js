require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log('Conexão bem-sucedida com o MongoDB');
})
.catch((err) => {
    console.error('Erro ao conectar ao MongoDB:',
err);
});