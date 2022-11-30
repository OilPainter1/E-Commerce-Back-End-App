const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/',async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  const allCategories = await Category.findAll({
    include: Product
  })

  res.json(allCategories)
});

router.get('/:id',async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const categoryById = await Category.findAll({
    where: {
      id: req.params.id,
    },
    include: Product
  })
  if (categoryById.length != 0){
    res.json(categoryById)
  }
  else {
    res.status(404).send(`Cannot find a category with id ${req.params.id}`)
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
  const newCategory = await Category.create({category_name: req.body.category_name})
  console.log("Category added")
  res.json(newCategory)
  }
  catch(err){
    res.status(400).send("Could not create new category")
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
  const updatedCategory = await Category.update({category_name: req.body.category_name}, {
    where: {
      id: req.params.id
    }
  })
  console.log("Category updated")
  res.json(await Category.findByPk(req.params.id))
}
catch(err){
  res.send("Category was not updated")
}
});

router.delete('/:id',async (req, res) => {
  // delete a category by its `id` value
  try {
    const deletedCategory = await Category.findAll({
      where: {
        id: req.params.id
      }
    })
    
    await Category.destroy({
      where: {
        id: req.params.id
      }
    })
    res.json(deletedCategory)
    console.log(`Category with id: ${req.params.id} deleted`)
  }
  catch (err){
    res.status(400).send(`Category with id: ${req.params.id} not deleted`)
  }
});

module.exports = router;
