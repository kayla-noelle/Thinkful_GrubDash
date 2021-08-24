const router = require("express").Router();
const controller = require("./dishes.controller")
const methodNotAllowed = require("../errors/methodNotAllowed")



// TODO: Implement the /dishes routes needed to make the tests pass

router.use('./:dishId/dishes', controller.dishExists)
router.route("/")
  .get(controller.list)
  .post(controller.create)
  .all(methodNotAllowed)


module.exports = router;
