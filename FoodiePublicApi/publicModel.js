const db = require("../database/dbConfig");

module.exports = {
 findDetail
};




function findDetail() {
 
 return db('fulltable').innerJoin("menu_item","fulltable.menu_id","menu_item.id")
}
