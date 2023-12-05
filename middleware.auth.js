const jwt = require("jsonwebtoken");
require("dotenv").config();

const user = require("./src/models/user");

const login = async (req, res) => {
  console.log('here')
  const { email, telNumber, password } = req.body;
  const secret = process.env.SECRET_KEY;
  let data;

  try {
    if ((!email && !telNumber) || !password) {
      return res
        .status(400)
        .json({ message: "É necessário inserir login e senha" });
    }

    if (email && password) {
      data = {
        email: email,
        password: password,
      };
    } else if (telNumber && password) {
      data = {
        telNumber: telNumber,
        password: password,
      };
    }

    const loggedUser = await user.findOne(data);

    console.log(loggedUser)

    if (!loggedUser) {
      return res.status(204).json({ message: "Login ou senha incorretos" });
    }

    const token = await jwt.sign({ userId: loggedUser._id, data }, secret);
    res.set("Authorization", token);
    res.end();
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getCurrentUser = async (req, res) => {
  const token = req.headers.authorization;
  const secret = process.env.SECRET_KEY;
  let loggedUserData;
  console.log(token)

  if(!token) {
    return res.status(401).json({message: 'Usuário não autorizado' });
  }
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      console.log(err)
      return res.status(401).json({message: 'token error'});
    }

    const { data } = decoded;

    loggedUserData = data
  })

  const currentUser = await user.findOne(loggedUserData);

  return res.status(302).json(currentUser);
}

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token)
  const secret = process.env.SECRET_KEY;

  if (!token) {
    return res.status(401).json({ message: "Usuário não cadastrado." });
  }

  jwt.verify(token, secret, (err, user) => {
    if (err) {
      console.log(err);
      return res
        .status(403)
        .json({
          messsage: "Você não tem autorização para acessar essa página.",
        });
    }
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken, login, getCurrentUser };
