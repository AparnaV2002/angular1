const express=require('express')
const router=express.Router();
const mongoose = require('mongoose')
const Product =require('../models/Product')
const db='mongodb://127.0.0.1:27017/demo'
mongoose.connect(db,{useNewUrlParser:true,useUnifiedTopology:true})
.then( () => {
    console.log("Connection open")
}).catch(err => {
    console.log("OOPS !! ERROR")
})
router.get('/',(req,res)=>{
    res.send("api works")
})
router.get('/products',(req,res)=>{
    Product.find({}) 
    .exec((err,products)=>{
        if(err) console.log(err.message)
        else{
            res.json(products)
        }
    })
})

router.post('/products',(req,res)=>{
    const product = new Product();
    product.name=req.body.name;
    product.price=req.body.price;
    product.rating=req.body.rating;
    product.image=req.body.image;
    product.save()
    res.redirect('http://localhost:4200/products')

})
router.post('/products/delete',async(req,res)=>{
    const {id} = req.body.image
    const product= await Product.findByIdAndDelete(id);

       res.redirect('http://localhost:4200/products')

    })


router.put('/products/:id',(req,res)=>{
    Product.findByIdAndUpdate(req.params.id,{$set:{name:req.body.name,price:req.price}},{
        new:true
    },(err,product)=>{
        if(err) console.log(err.message)
        else{
            res.json(product)
        }
    })
})
router.get('/products/:id',(req,res)=>{
    Product.findById(req.params.id)
    .exec((err,products)=>{
        if(err) console.log(err.message)
        else{
            res.json(products)
        }
    })
})

module.exports=router