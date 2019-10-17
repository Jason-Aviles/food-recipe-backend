const db = require("../database/dbConfig");

module.exports = {
find, findbyId, findDetail,findBydetail_id
};

function find() {
  return db('menu_item_review').select('id','restaurant_name','restaurant_type')
}


function findbyId(id) {
   return db('menu_item_review')//.innerJoin('menu_item','menu_item_review.menu_id','menu_item.id').select('menu_item.id','restaurant_name', 'restaurant_type','item_name','food_rating','photo_of_order')   .where('menu_item_review.menu_id',id)
 
}


function findDetail() {
 
 return db('menu_item').select('id','item_name','photo_of_order')
}

function findBydetail_id(id) {

return db('other').innerJoin('menu_item','other.menu_id', "menu_item.id").select( 'menu_item.id', 'comments', 'price','item_name','food_rating','wait_time', 
     'date_of_visit','photo_of_order')
.where('other.menu_id',id)

  // return db.raw(
  //   `select  menu_item.id, comments, price,item_name,food_rating,wait_time, 
  //   date_of_visit,photo_of_order

  //    from other
     
  //    join menu_item on  other.menu_id= menu_item.id 

  //     where  other.menu_id = ?`,id
    
  // )    
  
}
  







