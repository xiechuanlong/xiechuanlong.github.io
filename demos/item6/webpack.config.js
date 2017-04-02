module.exports={
   entry:"./app.js",
   output:{ 
      path:"./build",
      filename:"index.js"
   },
   module:{
      loaders:[
         {
            test:/\.jsx?$/,
            loader:"babel"
         }
      ]
   }
}