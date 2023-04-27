class TasksModel {
	#tasks = [];
	#updateCallBack = [];


	constructor() {

	}

	set tasks(value) {
		this.#tasks = value;
		this.#updateCallBack.forEach(c => c(this.#tasks));
	}

	addUpdateCallBack(updateCallback) {
		if (!updateCallback || !(updateCallback instanceof Function)) {
			throw new Error(`Wrong callback: ${updateCallback}`);

		}
		this.#updateCallBack.push(updateCallback);
	}
}

export default TasksModel;