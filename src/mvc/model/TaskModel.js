class TasksModel {
	#tasks = [];
	#updateCallBack = [];


	constructor() {

	}

	set tasks(value) {
		this.#tasks = value;
		this.#update();
	}

	#update() {
		this.#updateCallBack.forEach(c => c(this.#tasks));
	}

	addUpdateCallBack(updateCallback) {
		if (!updateCallback || !(updateCallback instanceof Function)) {
			throw new Error(`Wrong callback: ${updateCallback}`);

		}
		this.#updateCallBack.push(updateCallback);
	}

	addTask(taskVO) {
		console.log('> TasksModel -> addTask:', taskVO);
		this.#tasks.push(taskVO);
		this.#update();
	}
}

export default TasksModel;