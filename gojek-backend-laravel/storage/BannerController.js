let bannerService = require('../Service/BannerService');


  const addBanner = async (req, res, next) => {
    var data = []
    try {
     data = await bannerService.addbanner(req.body)
    } catch (e) {
      data.error = 'true'
      data.msg = 'somthing went wrong'
    }
    res.send(data)
  }


  const addCategory = async(req,res,next)=>{
    var data = []
    try {
     data = await bannerService.addcategory(req.body)
    } catch (e) {
      data.error = 'true'
      data.msg = 'somthing went wrong'
    }
    res.send(data)
  
  }

  const addFlavour = async(req,res,next)=>{
    var data = []
    try {
     data = await bannerService.addflavour(req.body)
    } catch (e) {
      data.error = 'true'
      data.msg = 'somthing went wrong'
    }
    res.send(data)
  }



  const addProduct = async(req,res,next)=>{
    var data = []
    try {
     data = await bannerService.addproduct(req.body)
    } catch (e) {
      data.error = 'true'
      data.msg = 'somthing went wrong'
    }
    res.send(data)

  }



  const addProductImage = async(req,res,next)=>{
    var data = []
    try {
     data = await bannerService.addproductimages(req.body)
    } catch (e) {
      data.error = 'true'
      data.msg = 'somthing went wrong'
    }
    res.send(data)

  }



  module.exports ={
    addBanner,
    addCategory,
    addFlavour,
    addProduct,
    addProductImage
  }