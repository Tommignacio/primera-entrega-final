import container from "./container";


class Cartit extends container {
    constructor() {
        super(`${__dirname}/dataBase/cart.json`)
    }

    async createCart() {
        try {
            //verifica si existe el archivo o lo tiene que crear
            await this.createFile(this.pathBD);
            //lee el archivo
            let res = await this.read();
            console.log(res)
            //crea nueva id
            const id = this.generateId(res);
            const cart = {
                ...res,
                id: id,
                timeStamp: this.getNow(),
                productos: []
            };
            res.push(cart)
            this.write(JSON.stringify(res))
            return cart
        } catch (error) {
            console.log(error)
        }
    }


}

const cartse = new Cartit()
module.exports = cartse