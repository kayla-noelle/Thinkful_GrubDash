const router = require("express").Router();
const controller = require("./dishes.controller")
const methodNotAllowed = require("../errors/methodNotAllowed")



// TODO: Implement the /dishes routes needed to make the tests pass

router.route("/:dishId")
//   .get(controller.read)
//   .delete(controller.delete)
  .all(methodNotAllowed)

router.route("/")
  .get(controller.list)
  .all(methodNotAllowed)


module.exports = router;
