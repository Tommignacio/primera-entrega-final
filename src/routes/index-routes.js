const { Router } = require("express");
const router = Router();
const routerProducts = require("./products/route-products.js")

router.use("/api/productos", routerProducts)




module.exports = router;
