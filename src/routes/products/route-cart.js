import { Router } from 'express'
const router = Router()
const cart = require('../../Api-class/cart')


router.post("/", async (req, res) => {
    try {
        const cartNew = await cart.createCart();
        return res.json(cartNew)
    } catch (err) {
        console.log(err)
    }

})

router.delete("/:id/productos", async (req, res) => {
    const { id } = req.params
    const cartDelete = await cart.deleteById(id)
    console.log(cartDelete)
    return res.json({ cartDelete })
})

//muestra lista de productos en un carrito
router.get("/:id/productos", async (req, res) => {
    try {
        const { id } = req.params
        const allProducts = await cart.showProducts(id)
        return res.json(allProducts)
    } catch (err) {
        console.log(err)
    }

})

//agrega producto por su id a un carrito
router.post("/:id/productos", async (req, res) => {
    const { id } = req.params
    const idProducts = req.body
    const cartAdd = await cart.addProducts(id, idProducts)

})

// router.get("/", async (req, res) => {
//     try {
//         const allCart = await cart.addProduct()
//         return res.json(allCart)
//     } catch (err) {
//         console.log(err)
//     }

// })

module.exports = router