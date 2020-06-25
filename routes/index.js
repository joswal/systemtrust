const fs = require('fs');
const multer = require('multer');
const router = require("express").Router();
const productController = require('../controllers/productController');

let filename;
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads");
    },
    filename: function (req, file, cb) {
        filename = file.fieldname + '-' + Date.now() + '.png';
        cb(null, filename);
    }
})

const upload = multer({ storage: storage })


router.get("/products/:categoryId?", async (req, res) => {
    let { categoryId } = req.params;
    if (categoryId) {
        let products = await productController.getProducts(categoryId);
        res.send({
            status: 200,
            data: products
        });
    } else {
        let products = await productController.getProducts(null);
        res.send({
            status: 200,
            data: products
        });
    }
});

router.get("/product/:productId?", async (req, res) => {
    let { productId } = req.params;
    let product = await productController.getProduct(productId);
    res.send({
        status: 200,
        data: product
    });
});


router.post("/add-product", async (req, res) => {
    try {
        let product = await productController.addProduct(req.body);
        res.send(product);
    } catch (error) {
        res.send({ error: 401, message: 'An error occurred' });
    }
});

// router.post("/add-product-image/:productId", upload.any(), async (req, res) => {
//     try {
//         let productId = req.params.productId;
//         let img = req.files.length > 0 ? req.files[0].filename : null;
//         let encode_image = img.toString('base64');
//         fs.unlinkSync(__dirname + '/../uploads/' + filename);
//         let image = {
//             contentType: req.file.mimetype,
//             image: new Buffer.from(encode_image, 'base64')
//         };*
//         let insertImage = await productController.insertImage(productId, image);
//         res.send(insertImage);
//     } catch (error) {
//         res.send({ error: 401, message: error.message });
//     }
// });


module.exports = router;
