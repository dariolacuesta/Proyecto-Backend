const dbconfig = require("./db/config");
const knex = require("knex")(dbconfig.sqlite);

(async () => {
	try {
		const tableExist = await knex.schema.hasTable("ecommerceChat");
		if (!tableExist) {
			await knex.schema.createTable("ecommerceChat", (table) => {
				table.increments("id"); // id => primary key
				table.string("autor");
				table.string("texto");
				table.string("fyh");
			});
			console.log("Table Created!");
		} else {
			console.log("Skipping creation,already exists...");
		}
	} catch (error) {
		console.log(error);
		throw error;
	} finally {
		knex.destroy();
	}
})();
