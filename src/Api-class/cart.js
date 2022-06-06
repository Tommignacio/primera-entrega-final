import container from "./container";
import product from "./products";



class Cart extends container {
    constructor() {
        super(`${__dirname}/dataBase/cart.json`)
    }

    async createCart() {
        try {
            // //verifica si existe el archivo o lo tiene que crear
            // await this.createFile(this.pathBD);
            //lee el archivo
            let res = await this.read();
            //crea nueva id
            const id = this.generateId(res);
            const oldObj = { id: 1 }
            const newObj = { ...oldObj, id: 2, nombre: "nuevo" }
            console.log([oldObj, newObj])
            const cart = {
                id: id,
                timeStamp: this.getNow(),
                productos: []
            };
            // console.log(res, "res")
            // console.log(cart, "cart")
            res.push(cart)
            // console.log(res, "resObj")
            this.write(JSON.stringify(res))
            return res
        } catch (error) {
            console.log(error)
        }
    }



}

const cart = new Cart()
module.exports = cart