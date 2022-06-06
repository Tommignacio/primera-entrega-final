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

router.get("/", async (req, res) => {
    try {
        const allCart = await cart.getAll()
        return res.json(allCart)
    } catch (err) {
        console.log(err)
    }

})

module.exports = router