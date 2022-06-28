const dbconfig = require("../../config");
const knex = require("knex")(dbconfig.mariaDB);

(async () => {
	try {
		const tableExist = await knex.schema.hasTable("ecommerceProducts");
		if (!tableExist) {
			await knex.schema.createTable("ecommerceProducts", (table) => {
				table.increments("id"); // id => primary key
				table.string("title");
				table.integer("price");
				table.string("thumbnail");
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
