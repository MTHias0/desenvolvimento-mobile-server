const jwt = require('jsonwebtoken');
require('dotenv').config();

const user = require('./src/models/user');

const login = async (req, res) => {
    const { email, password } = req.body;
    const secret = process.env.SECRET_KEY;
  
    try {
      const loggedUser = await user.findOne({ email: email, password: password });
  
      if(loggedUser) {
        const token =  await jwt.sign({ userId: loggedUser._id, email: email, password: password}, secret);
        res.set('Access-Token', token);
        res.end();
      }
  
    } catch (err) {
      
      return res.status(500).json({ error: err.message });
    }
  }

const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization;
    const secret = process.env.SECRET_KEY;

    if(!token) {
        return res.status(401).json({ message: "Usuário não cadastrado."});
    }

    jwt.verify(token, secret, (err, user) => {
        if(err) {
          console.log(err)
          return res.status(403).json({ messsage: "Você não tem autorização para acessar essa página."})
        }
        req.user = user;
        next();
    })

}

module.exports = { authenticateToken, login }