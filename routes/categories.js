var express = require('express');
var router = express.Router();
let categoryModel = require('../schemas/category')
let productModel = require('../schemas/product')


/* GET users listing. */
router.get('/', async function(req, res, next) {
  

  let categories = await categoryModel.find({});

  res.status(200).send({
    success:true,
    data:categories
  });
});
router.get('/:id', async function(req, res, next) {
  try {
    let id = req.params.id;
    let category = await categoryModel.findById(id);
    res.status(200).send({
      success:true,
      data:category
    });
  } catch (error) {
    res.status(404).send({
      success:false,
      message:"khong co id phu hop"
    });
  }
});

router.post('/', async function(req, res, next) {
  try {
    let newCategory = new categoryModel({
      name: req.body.name,
    })
    await newCategory.save();
    res.status(200).send({
      success:true,
      data:newCategory
    });
  } catch (error) {
    res.status(404).send({
      success:false,
      message:error.message
    });
  }
});
router.get('/slug/:category', async function (req, res, next) {
  try {
      let categorySlug = req.params.category;
      console.log("Category Slug:", categorySlug); // Log giá trị slug

      let category = await categoryModel.findOne({ slug: categorySlug });
      console.log("Category Found:", category); // Log kết quả tìm kiếm

      if (!category) {
          return res.status(404).send({ success: false, message: "Category not found" });
      }

      let products = await productModel.find({ category: category._id });
      res.status(200).send({ success: true, data: products });
  } catch (error) {
      res.status(500).send({ success: false, message: error.message });
  }
});

module.exports = router;
