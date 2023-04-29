class TaskVO {
	static fromJSON(json) {
		return new TaskVO(json.id, json.title, json.description, json.date, json.tags);
	}

	constructor(id, title, description, date, tags) {
		this.id = id;
		this.title = title;
		this.description = description || '';
		this.date = date;
		this.tags = tags;
	}
}

export default TaskVO;