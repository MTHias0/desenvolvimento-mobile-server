const user = require('../models/user');

const createUser = async (req, res) => {
    const { name, email, address, password, telNumber } = req.body;

    try{
        const response = await user.create({
            name: name,
            email: email,
            address: address,
            password: password,
            telNumber: telNumber,
        });

        return res.status(201).json(response);
    } catch (err) {
        console.error(err);

        return res
        .status(500)
        .json({ message: "Não foi possível efetuar a criação do usuário..." });
    }
}

const updateUser = async (req, res) => {
  const { userId, username, email, password, address, telNumber } = req.body
  
  try {
    const updatedUser = await user.findOneAndUpdate(
      { _id: userId },
      { $set: { "name": username, "email": email, "password": password,
      "address": address, "telNumber": telNumber} },
      { new : true }
    );

    return res.status(200).json(updatedUser);
  } catch (err) {
    
    return res.status(500).json({ error: err.message });
  }
}

const addFavorite = async (req, res) => {
    const { userId, productId, name, description, image, price } = req.body;

  try {
    const isFavorite = await user.findOne({ _id: userId, 'favorites._id': productId });

    if(isFavorite) {
      return res.status(400).json({ message: 'produto já é favorito '});
    }

    const updatedUserFavorites = await user.findOneAndUpdate(
      { _id: userId },
      { $push: { favorites: { _id: productId, name: name, description: description, image: image, price: price } } },
      { new: true }
    );

    res.status(200).json(updatedUserFavorites);
  } catch (error) {

    return res.status(500).json({ error: error.message });
  }

}

const removeFavorite = async (req, res) => {
    const { userId, productId } = req.body;
  try {
    const updatedUserFavorites = await user.findOneAndUpdate(
      { _id: userId },
      { $pull: { favorites: { _id: productId }}},
      { new: true }
    );

    return res.status(200).json(updatedUserFavorites);
  } catch (error) {

    return res.status(500).json({ maessage: "Produto favorito não encotrado" });
  }
}

const getFavorites = async (req, res) => {
  const { userId } = req.query;
    try{
        const userFavorites = await user.findOne({ _id: userId });
        if(!userFavorites) {

            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        return res.status(302).json(userFavorites.favorites);
    } catch (err) {

        return res.status(204).json({ message: "Não foi encontrado nenhum produto favoritado" });
    }
}

const createOrder = async (req, res) => {
  const { userId, products } = req.body;
  try {

    const totalPrice = products.reduce((total, product) => {
      const productPrice = product.price
      const productQuantity = product.quantity;

      return total + productPrice * productQuantity;
    }, 0);

    await user.findOneAndUpdate(
      { _id: userId },
      { $push: { orders: { products: products, totalPrice: totalPrice }}},
      { new: true }
    );

    return res.status(201).json({message: 'pedido efetuado'})

  } catch (err) {
    
    return res.status(500).json({ message: "Erro ao efetuar o pedido"})
  }
}

const getOrders = async (req, res) => {
  const { userId } = req.body;
  try {
    const userOrders = await user.findOne({ _id: userId });

    const inProgressOrders = userOrders.orders.filter(order => order.status === "Em andamento");
    
    if (inProgressOrders.length === 0) {

      return res.status(204).json({ message: "Você não possui nenhum pedido" });
    };

    if (!userOrders) {

      return res.status(404).json({ message: 'Usuário não encontrado' });
    };

    return res.status(302).json(inProgressOrders);
  } catch (err)  {

    return res.status(204).json({ message: "Não foi encontrado nenhum pedido" });
  }
}

const clearOrder = async (req, res) => {
  const { userId } = req.body;

  try {
    const gettedUser = await user.findById(userId);

    if (!gettedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    gettedUser.orders.forEach((order) => {
      if (order.status === 'Em andamento') {
        order.status = 'Finalizado';
      }
    });

    await gettedUser.save();

    res.status(200).json({ message: 'Orders updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const getHistory = async (req, res) => {
  const { userId } = req.query;
  try {
    const userOrders = await user.findOne({ _id: userId })

    const resolvedOrders = userOrders.orders.filter(order => order.status === "Finalizado");
    
    if (resolvedOrders.length === 0) {

      return res.status(204).json({ message: "Você não possui nenhum pedido" });
    };

    if (!userOrders) {

      return res.status(404).json({ message: 'Usuário não encontrado' });
    };

    return res.status(302).json(resolvedOrders);
  } catch (err)  {

    return res.status(204).json({ message: "Não foi encontrado nenhum pedido" });
  }
}

module.exports = { createUser, updateUser, addFavorite, removeFavorite, getFavorites, createOrder, getOrders, getHistory, clearOrder };