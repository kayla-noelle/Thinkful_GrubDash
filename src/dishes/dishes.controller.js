const path = require("path");

// Use the existing dishes data
const dishes = require(path.resolve("src/data/dishes-data"));
//Add order existing data
const orders = require("../data/orders-data");

// Use this function to assign ID's when necessary
const nextId = require("../utils/nextId");

// TODO: Implement the /dishes handlers needed to make the tests pass
//VALIDATORS
function dishExists(req,res,next) {
    const {dishId } = req.params
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

function checkDish(){}

//HANDLERS {create,read,list,update}
function list(req, res) {
    res.json({ data: dishes })
  }

//   function read(req, res, next) {
//     const dish = res.locals.dish 
//     const { dishId } = req.params
//     const foundDish = dishess.find((dish) => dish.id === Number(dishId))
    
//     const newUse = {
//       id: newUseId,
//       time: Date.now(),
//       urlId: Number(urlId),
//     }
//     console.log(newUse)
//     uses.push(newUse)
//     res.json({ data: foundUrl })
//   }

module.exports = {
    list
  };