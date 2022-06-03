// import getNow from "../../public/main";
import container from "./container"


class Products extends container {
    constructor() {
        super(`${__dirname}/dataBase/products.txt`)
    }

    async save(obj) {
        try {
            //verifica si existe el archivo o lo tiene que crear
            await this.createFile(this.pathBD);
            //lee el archivo
            let res = await this.read();
            //busca repetidos
            // if (res.length >= 1) {
            //     for (let el of res) {
            //         console.log(el["title"], obj["title"]);
            //         if (el["title"] === obj["title"]) throw "error, producto repetido";
            //     }
            // }
            //crea nueva id
            const id = this.generateId(res);
            console.log(id)
            const product = {
                ...obj,
                id: id,
            };
            res.push(product);
            this.write(JSON.stringify(res));
            return product;
        } catch (error) {
            return error;
        }
    }

    //devuelve el producto por su ID
    async getById(id) {
        try {
            let res = await this.read();
            for (let el of res) {
                if (id == el["id"]) {
                    return el;
                }
            }
            throw `producto con el id ${id} no encontrado`;
        } catch (error) {
            return error;
        }
    }


    //elimina objeto por su id
    async deleteById(id) {
        try {
            let products = await this.read();;
            //busca el indice del id del producto
            const idProduct = products.findIndex((prod) => prod.id === id);
            //elimina ese producto
            products.splice(idProduct, 1);
            return products;
        } catch (error) {
            console.log(error);
        }
    }

    //actualizar producto con uno nuevo
    async update(obj) {
        try {
            let products = await this.read();
            products.splice(obj.id - 1, 1, obj);
            products = JSON.stringify(products)
            await this.write(products)
            return obj;
        } catch (error) {
            return error;
        }
    }

    //elimina objeto por su id
    async deleteById(id) {
        try {
            let products = await this.read();
            //busca el indice del id del producto
            const idProduct = products.findIndex((prod) => prod.id === id);
            //elimina ese producto
            products.splice(idProduct, 1);
            let productsUpdated = JSON.stringify(products)
            await this.write(productsUpdated)
            return products;
        } catch (error) {
            console.log(error);
        }
    }
}

const product = new Products()
export default product
