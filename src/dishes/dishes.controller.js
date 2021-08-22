const path = require("path");

// Use the existing dishes data
const dishes = require(path.resolve("src/data/dishes-data"));
//Add order existing data
const orders = require("../data/orders-data");

// Use this function to assign ID's when necessary
const nextId = require("../utils/nextId");

// TODO: Implement the /dishes handlers needed to make the tests pass
function dishExists(req,res,next) {
    const {disId } = req.params
    const foundDish = dishes.find((dish)=> dish.id === dishId)

    if(foundDish){
        res.locals.dish = foundDish
        return next ()
    }
    next({
        status: 404,
        message:`Dish does not exist ${dishId}`
    })
}
