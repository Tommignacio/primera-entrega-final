import Container from "./container";


class Products extends Container {
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
            console.log(res.length);
            if (res.length >= 1) {
                for (let el of res) {
                    console.log(el["title"], obj["title"]);
                    if (el["title"] === obj["title"]) throw "error, producto repetido";
                }
            }
            const id = this.generateId();
            const product = {
                ...obj,
                id: id,
            };
            this.write(JSON.stringify(res));
            res.push(product);
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
                if (id === el["id"]) {
                    return el;
                }
            }
            return null;
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


}
const product = Products()
export default product