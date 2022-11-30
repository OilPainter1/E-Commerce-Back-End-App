const router = require('express').Router();
const sequelize = require('sequelize');
const { Tag, Product, ProductTag } = require('../../models');


// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  res.json(await Tag.findAll())
  
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  res.json(await Tag.findByPk(req.params.id))
});

router.post('/', async (req, res) => {
  // create a new tag
  try{
    const newTag =await Tag.create({tag_name: req.body.tag_name})
    console.log("New tag created")
    res.json(newTag)
  }
  catch(err){
    res.status(400).send(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const updatedTagName = await Tag.update({tag_name: req.body.tag_name}, {
    where: {
      id: req.params.id
    }
  })
  res.json(updatedTagName)
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try{
  const deletedTag = await Tag.findAll({where:{
    id: req.params.id
    }})
  if (deletedTag.length === 0){
    throw new Error()
  }
  await Tag.destroy({where: {id: req.params.id}})
  console.log("Tag deleted")
  res.json(deletedTag)
  }
  catch(err){
    res.status(400).send("Tag not deleted")
  }
});

module.exports = router;
