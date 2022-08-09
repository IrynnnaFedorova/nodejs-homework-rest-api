
const express = require("express");
const { ctrlContacts } = require("../../controllers");
// const { ctrlWrapper } = require("../../helpers");
const { basedir } = global;
const validation = require("../../middlewares/validation");
const { auth } = require(`${basedir}/middlewares`);

const ctrl = require(`${basedir}/controllers/contacts`);

const { ctrlWrapper } = require(`${basedir}/helpers`);

const router = express.Router()
//const router = new express.Router();

// router.get("/", ctrlWrapper(ctrlContacts.getContacts));

// router.get("/:id", ctrlWrapper(ctrlContacts.getContactById));

// router.post(
//   "/",
//   validation.validateAddBody,
//   ctrlWrapper(ctrlContacts.addContact)
// );

// router.delete("/:id", ctrlWrapper(ctrlContacts.deleteContactById));

// router.put(
//   "/:id",
//   validation.validateAddBody,
//   ctrlWrapper(ctrlContacts.updateContactById)
// );

// router.patch(
//   "/:id/favorite",
//   validation.validateFavoriteBody,
//   ctrlWrapper(ctrlContacts.updateContactFavoriteById)
// );
// module.exports = router;
router.get('/', auth, ctrlWrapper(ctrl.getAllContacts));

router.get('/:contactId', auth, ctrlWrapper(ctrl.getContactById));

router.post('/', auth, ctrlWrapper(ctrl.addContact));

router.delete('/:contactId', auth, ctrlWrapper(ctrl.removeContact));

router.put('/:contactId', auth, ctrlWrapper(ctrl.updateContactById));

router.patch('/:contactId/favorite', auth, ctrlWrapper(ctrl.updateStatusContact));
module.exports = router;