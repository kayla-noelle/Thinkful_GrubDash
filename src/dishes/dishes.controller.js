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

function validateDishProperties(req,res,next){
    const { data:{name, description, price, image_url},} = req.body;
    for(const prop of req.body){
        if(!prop in )
    }
}
//   function validateProperties(obj, arrProp){
//     for(const prop of arrProp){
//       //if(!(prop in obj)){
//       //if(!obj[prop]){
//       if(!obj.hasOwnProperty(prop)){
//         return false
//       }
//     }
//     return true
//   }


//HANDLERS {create,read,list,update}
function list(req, res) {
    res.json({ data: dishes })
  }

  function create (req, res){
      const {data:{ name, description, price, image_url },} = req.body;
      const newDish ={
          id: nextId (),
          name,
          description,
          price,
          image_url,
      }
      dishes.push(newDish);
      res.status(201).json({data:newDish});
  }

   function read(req, res, next) {
    res.json({ data: dishes})
  }

module.exports = {
    list,
    read:[dishExists,read],
    create:[create],
    update:[update]
  };

  