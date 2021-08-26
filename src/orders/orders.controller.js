const path = require("path");

// Use the existing order data
const orders = require(path.resolve("src/data/orders-data"));
const dishes = require('../data/dishes-data');
const ordersData = require("../data/orders-data");

// Use this function to assigh ID's when necessary
const nextId = require("../utils/nextId");

// TODO: Implement the /orders handlers needed to make the tests pass

function orderExists(req,res,next) {
    const {orderId } = req.params
    const foundOrder = orders.find((order)=> order.id === orderId)

    if(foundOrder){
        res.locals.order = foundOrder
        return next ()
    }
    next({
        status: 404,
        message:`Order with id ${orderId} does not exist`
    })
}

function validateOrderProps(req, res, next) {
    const {data:{deliverTo, mobileNumber, status, dishes},} = req.body
    if (!deliverTo || deliverTo == "")
    return next({ status: 400, message: `Order must include a deliverTo` });
  if (!mobileNumber || mobileNumber == "")
    return next({ status: 400, message: `Order must include a mobileNumber` });
  if (!dishes)
    return next({ status: 400, message: `Order must include a dish` });
  if (!Array.isArray(dishes) || dishes.length <= 0)
    return next({
      status: 400,
      message: `Order must include at least one dish`,
    });
  dishes.forEach((dish, index) => {
    if (
      !dish.quantity ||
      dish.quantity <= 0 ||
      typeof dish.quantity != "number"
    )
      return next({
        status: 400,
        message: `Dish ${index} must have a quantity that is an integer greater than 0`,
      });
  });
  res.locals.newOrder = {
    id: nextId(),
    deliverTo: deliverTo,
    mobileNumber: mobileNumber,
    status: status,
    dishes: dishes,
  };
  next();
}


// function validatePending(req,res,next){
//     const status = res.locals.order.status;
//     if(status === 'pending'){
//         next();
//     }
//     next({status:404, message: `An order cannot be deleted unless it is pending`,})
// }

//Handlers
function list(req,res,next){
    res.json({data:orders})
}

function read(req, res, next) {
    res.json({ data: orders})
  }

  function create(req, res, next) {
    const {
      data: { deliverTo, status, mobileNumber, dishes },
    } = req.body;
  
    const newOrder = {
      id: nextId(),
      deliverTo,
      status,
      mobileNumber,
      dishes,
    };
    orders.push(newOrder);
    res.status(201).json({ data: newOrder });
  }

//   function destroy(req, res, next) {
//     const foundOrder = res.locals.order;
//     const index = orders.findIndex((order) => order.id === foundOrder.id);
//     if (index > -1) {
//       orders.splice(index, 1);
//       res.sendStatus(204);
//     }
//   }
  
module.exports = {
    list,
    read:[orderExists,read],
    create:[validateOrderProps,create],
    //delete:[ordersExist,validatePending,destroy,list]
  };