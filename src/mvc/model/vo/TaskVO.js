class TaskVO {
	static fromJSON(json) {
		return new TaskVO(json.id, json.title, json.date, json.tags);
	}

	constructor(id, title, date, tags) {
		this.id = id;
		this.title = title;
		this.date = date;
		this.tags = tags;
	}
}

export default TaskVO;