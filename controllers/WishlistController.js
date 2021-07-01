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
    console.log("new wish added");
    res.status(201).send({ message: "Le jeu "+name+" a bien été ajouté à la liste d'envie", data});
  })
  .catch(error => {
    res.json(error);
  })
}

// request to delete one wish by id
exports.deleteWish = async (req, res) => {
  try {
    const wish = await Wishlist.findById(req.params.id);
    await wish.remove();
    res.send({ data: true });
    console.log("wish deleted");
  } catch (err) {
    return res.status(404).json({err: 'Wish is not found'})
  }
}
