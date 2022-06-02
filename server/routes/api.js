const express=require('express')
const router=express.Router();
const mongoose = require('mongoose')
const Product =require('../models/Product')
const db='mongodb://localhost:27017/MiniProject'
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

router.post('/insert',(req,res)=>{
    const product = new Product();
    product.name=req.body.fname;
    product.price=req.body.fprice;
    product.rating=req.body.frating;
    product.img=req.body.fimg
    product.save()
    res.redirect('/products')

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

router.delete('products/:id',(req,res)=>{
    Product.findByIdAndDelete(req.params.id,(err,product)=>{
        if (err) console.log(err.message)
        else{
            res.json(product)
        }
    })
})

module.exports=router