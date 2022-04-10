const socket = io.connect();
// const { normalize, schema } = require("normalizr");
//------------------------------------------------------------------------------------

const formAgregarProducto = document.getElementById("formAgregarProducto");
formAgregarProducto.addEventListener("submit", (e) => {
	e.preventDefault();
	const producto = {
		title: formAgregarProducto[0].value,
		price: formAgregarProducto[1].value,
		thumbnail: formAgregarProducto[2].value,
	};
	socket.emit("update", producto);
	formAgregarProducto.reset();
});

socket.on("productos", (productos) => {
	makeHtmlTable(productos).then((html) => {
		document.getElementById("productos").innerHTML = html;
	});
});

function makeHtmlTable(productos) {
	return fetch("plantillas/tabla-productos.hbs")
		.then((respuesta) => respuesta.text())
		.then((plantilla) => {
			const template = Handlebars.compile(plantilla);
			const html = template({ productos });
			return html;
		});
}

//-------------------------------------------------------------------------------------
const inputUserEmail = document.getElementById("inputUserEmail");
const inputUsername = document.getElementById("inputUsername");
const inputUserLastName = document.getElementById("inputUserLastName");
const inputUserAge = document.getElementById("inputUserAge");
const inputUserAlias = document.getElementById("inputUserAlias");
const inputUserAvatar = document.getElementById("inputUserAvatar");
const inputMensaje = document.getElementById("inputMensaje");
const btnEnviar = document.getElementById("btnEnviar");

const formPublicarMensaje = document.getElementById("formPublicarMensaje");
formPublicarMensaje.addEventListener("submit", (e) => {
	e.preventDefault();

	const mensaje = {
		author: {
			id: inputUserEmail.value,
			nombre: inputUsername.value,
			apellido: inputUserLastName.value,
			edad: inputUserAge.value,
			alias: inputUserAlias.value,
			avatar: inputUserAvatar.value,
		},
		texto: inputMensaje.value,
	};
	socket.emit("nuevoMensaje", mensaje);
	formPublicarMensaje.reset();
	inputMensaje.focus();
});

socket.on("mensajes", (mensajes) => {
	// let arraymensajes = [...mensajes];
	// console.log(arraymensajes);
	const html = makeHtmlList(mensajes);
	document.getElementById("mensajes").innerHTML = html;
});

socket.on("html-compression", ({ normalized }) => {
	const compression = document.getElementById("compression");
	compression.textContent = `${normalized}%`;
});

// document.getElementById('compresion').innerHTML =

function makeHtmlList(mensajes) {
	return mensajes
		.map((mensaje) => {
			return `
            <div>
                <b style="color:blue;">${mensaje.author.nombre}</b>
                [<span style="color:brown;">${mensaje.fyh}</span>] :
                <i style="color:green;">${mensaje.texto}</i>
            </div>
        `;
		})
		.join(" ");
}

inputUsername.addEventListener("input", () => {
	const hayEmail = inputUsername.value.length;
	const hayTexto = inputMensaje.value.length;
	inputMensaje.disabled = !hayEmail;
	btnEnviar.disabled = !hayEmail || !hayTexto;
});

inputMensaje.addEventListener("input", () => {
	const hayTexto = inputMensaje.value.length;
	btnEnviar.disabled = !hayTexto;
});
