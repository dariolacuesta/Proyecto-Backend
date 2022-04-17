const express = require("express");
const router = express.Router();
const path = require("path");
const webAuth = require("../web/web.js");

router.get("/home", webAuth, (req, res) => {
	// res.sendFile(path.join(process.cwd(), '/views/home.html'))
	res.render(path.join(process.cwd(), "/views/pages/home.ejs"), {
		name: req.session.name,
	});
});

// productosWebRouter.get('/productos-vista-test', (req, res) => {
//     res.sendFile(path.join(process.cwd(), '/views/productos-vista-test.html'))
// })

module.exports = router;
