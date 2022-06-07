import container from "./container";
import product from "./products";
import fs from "fs"


class Cart extends container {
    constructor() {
        super(`${__dirname}/dataBase/cart.json`)
    }

    async createCart() {
        try {
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
                productos: ""
            };
            res.push(cart)
            this.write(JSON.stringify(res))
            return res
        } catch (error) {
            console.log(error)
        }
    }

    // mostrar todos los productos de un carrito
    async showProducts(id) {
        try {
            //lee el carrito
            const cartObj = await this.read();
            //muestro los productos del carrito
            return (cartObj[id - 1]) === undefined ? `no existe el id ${id}` : cartObj[id - 1].productos
        } catch (error) {
            console.log(error)
        }
    }


    //agregar todos los  productos a un carrito
    async addProducts(id, idProducts) {
        try {

            //verifica que el archivo exista
            await this.createFile()
            //lee los productos
            const products = await fs.promises.readFile(product.pathBD, "utf-8");
            //si el archivo esta vacío
            if (products === "") {
                return `No hay productos en la base de datos`;
            }
            //parseo a objeto 
            const prodObj = JSON.parse(products)
            const arrayProducts = []
            for (let id of idProducts) {
                for (let product of prodObj) {
                    if (id == product.id) {
                        arrayProducts.push(product)
                        // console.log(arrayProducts)
                    }
                }
            }

            //lee el carrito
            const cartObj = await this.read();
            //guardo la clave productos del carrito
            let keyProducts = cartObj[id - 1].productos
            //si la clave productos no tiene productos:
            if (keyProducts === "") {
                //agrego al carrito los productos
                cartObj[id - 1].productos = arrayProducts
                //reescribe el carrito
                this.write(JSON.stringify(cartObj))
                return cartObj
            }
            //si la clave productos tiene productos:
            //uno array de productos anterior con el nuevo        
            let updateArrayProducts = [...keyProducts, ...arrayProducts]
            //actualizo clave productos con el nuevo array de productos
            cartObj[id - 1].productos = updateArrayProducts
            //reescribe el carrito
            this.write(JSON.stringify(cartObj))
            return cartObj
        } catch (error) {
            console.log(error)
        }
    }


    // //agregar todos los  productos a un carrito
    // async addProduct(id) {
    //     try {
    //         console.log(product.pathBD)
    //         //verifica que el archivo exista
    //         await this.createFile()
    //         //lee los productos
    //         const products = await fs.promises.readFile(product.pathBD, "utf-8");
    //         //si el archivo esta vacío
    //         if (products === "") {
    //             return `No hay productos en la base de datos`;
    //         }
    //         //parseo a objeto 
    //         const prodObj = JSON.parse(products)
    //         //lee el carrito
    //         const cartObj = await this.read();
    //         //agrego al carrito los productos
    //         cartObj[id].productos = prodObj
    //         //reescribe la base de datos
    //         this.write(JSON.stringify(cartObj))
    //         console.log(cartObj)
    //         return cartObj
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }


}

const cart = new Cart()
module.exports = cart