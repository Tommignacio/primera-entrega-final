import fs from "fs"
export default class Container {
	constructor(pathBD) {
		this.pathBD = pathBD;
	}

	//crea archivo
	async createFile() {
		try {
			// verifico si el archivo ya existe. Si no existe, lo creo
			if (fs.existsSync(this.pathBD)) {
				//El archivo ya existe, entonces no hago nada;
				return false;
			} else {
				//El archivo no existe, entonces lo creo;
				await this.write("");
				return true;
			}
		} catch (err) {
			console.log("Error en la creación del archivo", err);
			return false;
		}
	}

	//lee el archivo
	async read() {
		try {
			let file = await fs.promises.readFile(this.pathBD, "utf-8");
			//si el archivo esta vacío
			if (file === "") {
				file = [];
				return file;
			}
			//si tiene objetos
			else {
				let fileObj = JSON.parse(file);
				return fileObj;
			}
		} catch (error) {
			console.log(error);
		}
	}

	//escibe el archivo
	async write(res) {
		try {
			await fs.promises.writeFile(this.pathBD, res);
		} catch (error) {
			console.log(error);
		}
	}

	//agrega y guarda un nuevo objeto
	// async save(obj) {
	// 	try {
	// 		//verifica si existe el archivo o lo tiene que crear
	// 		await this.createFile(this.name);
	// 		//lee el archivo
	// 		let res = await this.read();
	// 		//busca repetidos
	// 		console.log(res.length);
	// 		if (res.length >= 1) {
	// 			for (let el of res) {
	// 				console.log(el["title"], obj["title"]);
	// 				if (el["title"] === obj["title"]) throw "error, producto repetido";
	// 			}
	// 		}
	// 		const id = this.generateId();
	// 		const product = {
	// 			...obj,
	// 			id: id,
	// 		};
	// 		this.write(JSON.stringify(res));
	// 		products.push(product);
	// 		return product;
	// 		// //agrega el nuevo id
	// 		// obj["id"] = res.length + 1;
	// 		res.push(obj);
	// 		//escribe el nuevo objeto

	// 		// return `el id del nuevo objeto es ${obj["id"]}`;
	// 	} catch (error) {
	// 		return error;
	// 	}
	// }

	//agrega y guarda un nuevo objeto
	// async add(obj) {
	// 	try {
	// 		let products = this.data;
	// 		const id = this.generateId();
	// 		const product = {
	// 			...obj,
	// 			id: id,
	// 		};
	// 		products.push(product);
	// 		return product;
	// 	} catch (error) {
	// 		return error;
	// 	}
	// }



	// //devuelve el producto por su ID
	// async getById(id) {
	// 	try {
	// 		let res = await this.read();
	// 		for (let el of res) {
	// 			if (id === el["id"]) {
	// 				return el;
	// 			}
	// 		}
	// 		return null;
	// 	} catch (error) {
	// 		return error;
	// 	}
	// }

	//devuelve el producto por su ID
	// async getById(id) {
	// 	try {
	// 		let products = this.data;
	// 		for (let el of products) {
	// 			if (el["id"] === parseInt(id)) {
	// 				return el;
	// 			}
	// 		}
	// 		return false;
	// 	} catch (error) {
	// 		return error;
	// 	}
	// }

	//devuelve tosdos los objetos
	async getAll() {
		try {
			let all = await this.read();
			return all;
		} catch (error) {
			return error;
		}
	}


	// async getAll() {
	// 	try {
	// 		let products = this.data;
	// 		return products;
	// 	} catch (error) {
	// 		return error;
	// 	}
	// }





	//crear ID
	generateId() {
		try {
			//guarda todos los id
			const findId = this.data.map((item) => item.id);
			let newId;
			if (findId.length == 0) {
				newId = 1;
			}
			//busca el maximo iD que existe entre todo el array y le suma uno
			else {
				newId = Math.max.apply(null, findId) + 1;
			}
			return newId;
		} catch (error) {
			return error;
		}
	}

	//actualizar
	async update(obj) {
		try {
			let products = this.data;
			products.splice(obj.id - 1, 1, obj);
			return obj;
		} catch (error) {
			return error;
		}
	}

	//elimina objeto por su id
	async deleteById(id) {
		try {
			let products = this.data;
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
//instancio la clase
// const products = new Container();

// module.exports = products;
