import DOM from '../../src/constants/dom.js';

const SERVER_URL = 'http://localhost:4173/';

describe('Test Todo Page', () => {
	const clickOnCreateTaskButton = () => {
		cy
			.get(`#${DOM.Button.CREATE_TASK}`)
			.should('exist')
			.should('contain.text', 'Create Task')
			.click();
	}

	const createTaskFromPopup = (todoTaskText) => {
		const popupTask = cy.get('[data-testId="task-popup"]').should('exist').should('be.visible');

		popupTask.should('exist')
		popupTask
			.find('[data-id="inpTitle"]')
			.should('have.value', '')
			.type(todoTaskText);

		cy.get('[data-id="btnConfirm"]')
			.should('exist')
			.should('contain.text', 'Create')
			.click();

		cy.get(`#${DOM.Popup.CREATE_TASK}`)
			.should('exist')
			.should('have.class', 'hidden');

		cy.get(`#${DOM.Popup.CREATE_TASK}`)
			.should('exist')
			.should('have.class', 'hidden')
			.find('.spinner')
			.should('exist');

	}
	const getColumnChildren = () => {
		return cy.get('[data-test-id="tasks-column"]').should('exist').children()
	}

	const checkNumberOfTaskInColumnMatch = (numberOfTasks) => {
		getColumnChildren().should('have.length', numberOfTasks + 1);
	}

	beforeEach(() => {
		cy.intercept('**TaskPopup**').as('getTaskPopup');
		cy.visit(SERVER_URL);
		cy.url().should('include', SERVER_URL);
	});

	it('user open main page and create task', () => {

		clickOnCreateTaskButton();

		cy.wait('@getTaskPopup');

	});

	it.only('user create two tasks and delete one', () => {
		const tasks = ['Welcome Task', 'Read books'];
		tasks.forEach((text, index) => {
			clickOnCreateTaskButton();
			if (index === 0) cy.wait('@getTaskPopup');
			createTaskFromPopup(text);
		});
		checkNumberOfTaskInColumnMatch(tasks.length);
		getColumnChildren()
			.first()
			.find('[data-btn="btnDelete"]')
			.should('exist')
			.click();

		const popupTask = cy.get('[data-testId="task-popup"]');
		popupTask
			.find('[data-id="btnConfirm"]')
			.should('exist')
			.should('contain.text', 'Delete')
			.click();

		tasks.pop();

		checkNumberOfTaskInColumnMatch(tasks.length);
		tasks.forEach((text) => {
			getColumnChildren().should('contain.text', text);
		})
	});
});
