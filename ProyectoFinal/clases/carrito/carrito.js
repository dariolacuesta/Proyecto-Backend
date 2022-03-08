class Carritos {
  constructor(timeStamp, producto) {
    this.timeStamp = Date.now();
    this.producto = [];
  }
}

module.exports = Carritos;

//    El carrito de compras tendrá la siguiente estructura: id, timestamp(carrito), producto: { id, timestamp(producto), nombre, descripcion, código, foto (url), precio, stock }
