const socket = io();

const formAgregarProducto = document.getElementById("formAgregarProducto");
formAgregarProducto.addEventListener("submit", (e) => {
  e.preventDefault();

  document.getElementById("producto").value;
  const producto = {
    producto: formAgregarProducto[0].value,
    precio: formAgregarProducto[1].value,
    imagen: formAgregarProducto[2].value,
  };

  socket.emit("update", producto);
  formAgregarProducto.reset();
});

socket.on("productos", manejarEventoProductos);

async function manejarEventoProductos(productos) {
  const recursoRemoto = await fetch("plantillas/productos.hbs");

  const textoPlantilla = await recursoRemoto.text();

  const functionTemplate = Handlebars.compile(textoPlantilla);

  const html = functionTemplate({ productos });

  document.getElementById("productos").innerHTML = html;
}

function render(data) {
  const html = data
    .map((elem, index) => {
      return `<div>
            <strong style='color:blue'>${elem.author}</strong>:
            <em style='color:brown'>${elem.date}<em>
            <em style='color:green'>${elem.text}</em> </div>`;
    })
    .join(" ");
  document.getElementById("messages").innerHTML = html;
}
function addMessage(e) {
  let date = new Date();
  const mensaje = {
    date: date,
    author: document.getElementById("username").value,
    text: document.getElementById("texto").value,
  };
  socket.emit("new-message", mensaje);
  return false;
}

socket.on("messages", function (data) {
  render(data);
});
