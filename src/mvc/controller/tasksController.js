import TaskVO from "../model/vo/TaskVO.js";

class TasksController {
	#model;

	constructor(model) {
		this.#model = model;
	}

	async retrieveTasks() {
		this.#model.tasks = await fetch('http://localhost:3000/tasks')
			.then((response) => response.ok && response.json())
			.then((rawTasks) => {
				if (rawTasks && rawTasks instanceof Array) {
					console.log('json', rawTasks);
					return rawTasks.map((json) => TaskVO.fromJSON(json));
				} else {
					window.alert('Problem with data parsing, try refresh later');
					return [];
				}
			})
			.catch((e) => {
				window.alert('Server error:' + e.toString());
				return [];
			});
	}

	createTask(taskTitle, taskDate, taskTags) {
		console.log('> TasksController -> createTask');

		return fetch('http://localhost:3000/tasks', {

			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				title: taskTitle,
				date: taskDate,
				tags: taskTags,
			})

		}).then((response) => response.json())
			.then(data => {
				console.log('> TaskController -> createTask: data ', data);
				const taskVO = TaskVO.fromJSON(data);
				this.#model.addTask(taskVO);
			}).catch((e) => {
				console.error('> TaskController -> createTask: data ', e);
			});

		const taskId = `task_${Date.now()}`;
		const taskVO = new TaskVO(taskId, taskTitle, taskDate, taskTags);

		// renderTask(taskVO);
		// tasks.push(taskVO);
		//
		// saveTask();
	}
}

export default TasksController;