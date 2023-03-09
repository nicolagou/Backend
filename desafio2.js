const fs = require("fs");

class ProductManager {
  static id = 0;

  constructor(filename) {
    (this.products = []),
      (this.path = "./files"),
      (this.filename = this.path + filename);
  }

  // Metodos

  addProduct = async (product) => {
    // creo el DIR
    await fs.promises.mkdir(this.path, { recursive: true });

    // Escribo el archivo
    
      if (
        product.title === "" ||
        product.description === "" ||
        product.price < 0 ||
        product.thumbnail === "" ||
        product.code === "" ||
        product.stock < 0
      ) {
        return console.error("Todos los campos son obligatorios");
      } else if (this.products.find((prod) => prod.code == product.code)) {
        return console.error("El producto con este codigo ya existe");
      } else{
            product.id = ++ProductManager.id;
    this.products.push(product);
      }
    


    await fs.promises.writeFile(this.filename, JSON.stringify(this.products));
    console.log(`Producto con id ${product.id} agregado correctamente`);
  };

  getProducts = async () => {
    // lectura de archivo y convertir a Objeto (ya que el objeto agregado es un string)
    let resultado = await fs.promises.readFile(this.filename);
    let parsedRes = await JSON.parse(resultado);
    console.log("Lectura de archivo");
    console.log(parsedRes);
    return parsedRes;
  };

  getProductById = async (id) => {
    let resultado = await fs.promises.readFile(this.filename);
    let parsedRes = await JSON.parse(resultado);

    for (const item of parsedRes) {
      if (item.id === id) {
        return console.log(item.title);
      } else return console.error("Id no encontrado");
    }
  };
}

// Pruebas

const producto1 = new ProductManager("/products.json");

// console.log("Agrego un producto");

  producto1.addProduct({
    title: "titulo1",
    description: "descripcion1",
    price: 1000,
    thumbnail: "sin imagen",
    code: "1234",
    stock: 2,
});

producto1.addProduct({
  title: "titulo2",
  description: "descripcion2",
  price: 200,
  thumbnail: "sin imagen",
  code: "1235",
  stock: 22,
});

// console.log("Lista con producto1");
// producto1.getProducts();

// console.log('Lista con campo vacio');
// console.log(producto1.addProduct({ title: '', description: 'descripcion1', price: 1000, thumbnail: 'sin imagen', code: '1234', stock: 2 }));

// console.log('Agrego un producto con codigo repetido');
// console.log(producto1.addProduct({ title: 'titulo1', description: 'descripcion1', price: 1000, thumbnail: 'sin imagen', code: '1234', stock: 2 }));

// console.log("Busco un producto por id y funciona");
// console.log(producto1.getProductById(1));

// console.log("Busco un producto por id y no funciona");
// console.log(producto1.getProductById(1235));

// console.log("Agrego otro producto");


// console.log('Lista con producto2 agregado');
// console.log(producto1.getProducts());
