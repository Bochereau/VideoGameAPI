// wishlist model
const Wishlist = require('../models/wishlistModel');

// request to find wishlist by user
exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find({ _userId: req.body.userData.userId }).sort('name');
    return res.status(201).json(wishlist);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({error: 'Something went wrong'});
  }
}

// request to add a new wish to DB by user
exports.addWish = async (req, res) => {
  try {
    const addWish = new Wishlist({
      name: req.body.name,
      hardware: req.body.hardware,
      editor: req.body.editor,
      developer: req.body.developer,
      release: req.body.release,
      _userId: req.body.userData.userId,
    });
    await addWish.save()
    .then(data => {
      return res.status(201).json({ message: "Le jeu "+addWish.name+" a bien été ajouté à la liste d'envie", data});
    })
  } catch (err) {
    return res.status(500).json({ message: "Une erreur s'est produite", err});
  }
}

// request to delete one wish by id
exports.deleteWish = async (req, res) => {
  try {
    const wish = await Wishlist.findById(req.params.id);
    await wish.remove();
    res.send({ data: true });
    console.log("wish deleted");
    return res.status(201).json({ message: "Le jeu "+wish.name+" a bien été retiré de la liste d'envie" })
  } catch (err) {
    return res.status(404).json({err: 'Wish is not found'})
  }
}
