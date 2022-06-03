import { Router } from 'express'
const router = Router()
const cartse = require('../../Api-class/cart')


router.post("/", async (req, res) => {
    try {
        const cartNew = await cartse.createCart();
        console.log(cartNew)
        return res.json({ cartNew })
    } catch (err) {
        console.log(err)
    }

})

module.exports = router