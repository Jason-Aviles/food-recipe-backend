const db = require("../database/dbConfig");

module.exports = {
  getPhoto,
  getPhotoById,
  addPhoto,
  updatePhoto,
  removePhoto,removeAllPhoto
};

async function getPhoto() {
  const Photo = await db(`menu_item`);
  return Photo;
}

async function getPhotoById(id) {
  const Photo = await db(`menu_item`)
    .where({ id: Number(id) })
    .first();
  return Photo;
}

async function addPhoto(photo) {
  return await db(`menu_item`)
    .insert(photo)
    .then(ids => ({ id: ids[0] }));
}

async function updatePhoto(id, comment) {
  return await db(`menu_item`)
    .where("id", Number(id))
    .update(comment);
}

async function removePhoto(id) {
  return await db(`menu_item`)
    .where("id", Number(id))
    .del();
}
   


async function removeAllPhoto(id) {
  return await db(`menu_item`)
    .del();
}
   