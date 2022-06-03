const { Router } = require("express");
const router = Router();
const routerProducts = require("./products/route-products.js")
import routerCart from "./products/route-cart.js"

router.use("/api/productos", routerProducts)
router.use("/api/carrito", routerCart)



module.exports = router;
