class UserDTO {
	constructor(postItem, _id) {
		Object.assign(this, postItem);
		this.createdAt = postItem.createdAt || Date.now();
		this.updatedAt = Date.now();
		if (_id) {
			this._id = _id;
		}
	}
}

module.exports = UserDTO;
