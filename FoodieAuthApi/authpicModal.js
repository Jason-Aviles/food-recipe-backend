const db = require("../database/dbConfig");

module.exports = {
  getPhoto,
  getPhotoById,
  addPhoto,
  updatePhoto,
  removePhoto,removeAllPhoto
};

 function getPhoto() {
  const Photo =  db(`menu_item`);
  return Photo;
}

 function getPhotoById(id) {
  const Photo =  db(`menu_item`)
    .where({ id: Number(id) })
    .first();
  return Photo;
}

 function addPhoto(photo) {
  return  db(`menu_item`)
    .insert(photo)
    .then(ids => ({ id: ids[0] }));
}

 function updatePhoto(id, comment) {
  return  db(`menu_item`)
    .where("id", Number(id))
    .update(comment);
}

 function removePhoto(id) {
  return  db(`menu_item`)
    .where("id", Number(id))
    .del();
}
   


 function removeAllPhoto(id) {
  return  db(`menu_item`)
    .del();
}
   