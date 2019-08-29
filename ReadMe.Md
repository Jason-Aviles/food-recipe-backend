


user ={
id,
username,
password
}

menu_item_review{
id,
restaurant_name,
restaurant_title,
user_id,
menu_id
}

menu_item{
id,menu_item_name,
photo_of_order,
review_id,
food_rating
}

other{
id,
comments,
price,
wait_time, 
date_of visit,
menu_id
}



server.put("/user/:id", (req, res) => {
  const { id } = req.params;
  const UserInfo = req.body;
  DB.update(id, UserInfo)
    .then(updated => {
      if (id) {
        res.status(200).json(updated);
      }else(res.status(400).json({errorMessage: "Please provide name and bio for the user."}))
    })
    .catch(err => {
      res.status(500).json({ error: "The user information could not be modified." });
    });
});
