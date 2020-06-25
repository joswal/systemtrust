const uuidv1 = require('uuid/v1');
const { Product } = require("../models/product");


module.exports = {
    addProduct : async (data)=>{
        let { name, categoryId, description, file, price, properties, images} = data;
        try {
            if(!name || !categoryId || !description || !price || !images || !properties)
            return({error: 401,message: "Missing parameters. Kindly fill all required inputs." });
            properties = properties.split(';');
            let productId = uuidv1();
            let product = new Product({ name, categoryId, description, file, price, images, properties, productId});
            product = await product.save();
            if (!product) return ({error: 401,message: "An error occurred while creating product."});
            return ({error: 200,message: "Success.", data:{productId}});
        } catch (error) {
            return({ error: 401,message: error.message});
        }
    },
    insertImage : async (productId, image)=>{
        try {
            let product = await Product.findOneAndUpdate({productId},{image});
            if(!product) return ({error: 401,message: "An error occurred while uploading image." });
            return ({error: 200,message: "Success." });
        } catch (error) {
            return({ error: 401,message: error.message });
        }
    },
    updateProduct : async (productId, data)=>{
        let { name, categoryId, description, type, price, properties} = data;
        try {
            if(!name || !categoryId || !description || !price || !endDate || !properties)
            return({error: 401,message: "Missing parameters. Kindly fill all required inputs." });
            let updatedOn = new Date.getTime();
            let product = await Product.findOneAndUpdate({productId}, { name, organizer, description, date, type, price, icon, category, updatedOn });
            if (!product) return ({error: 401,message: "An error occurred while updating product."});
            return ({error: 200,message: "Success."});
        } catch (error) {
            return({ error: 401,message: error.message});
        }
    },
    getProducts : async (categoryId)=>{
        let products;
        try {
            if(!categoryId){
                products = await Product.find();
            }else{
                products = await Product.find({categoryId});
            }
            return products;
        } catch (error) {
            return [];
        }
    },
    getProduct : async (productId)=>{
        try {
            let product = await Product.findOne({productId});
            return product;
        } catch (error) {
            return null;
        }
    }
    
};