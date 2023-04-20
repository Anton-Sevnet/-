import DOM from '../../src/constants/dom.js';

const SERVER_URL = 'http://localhost:4173/';

describe('Test Todo Page', () => {
	beforeEach(() => {
		cy.intercept('**TaskPopup**').as('getTaskPopup');
	});

	it.only('user open main page and create task', () => {
		cy.visit(SERVER_URL);

		cy.url().should('include', SERVER_URL);

		cy.get(`#${DOM.Popup.CREATE_TASK}`)
			.should('exist')
			.should('have.class', 'hidden');


		cy.get(`#${DOM.Popup.CREATE_TASK}`)
			.should('exist')
			.should('have.class', 'hidden')
			.find('.spinner')
			.should('exist');

		cy.get(`#${DOM.Button.CREATE_TASK}`)
			.should('exist')
			.should('contain.text', 'Create Task')
			.click();

		cy.wait('@getTaskPopup');

		const popupTask = cy.get('[data-testId="task-popup"]').should('exist').should('be.visible');

		const todoTaskText = 'Welcome Task';

		popupTask.should('exist')
		popupTask
			.find('[data-id="inpTitle"]')
			.should('have.value', '')
			.type(todoTaskText);

		cy.get('[data-id="btnConfirm"]')
			.should('exist')
			.should('contain.text', 'Create')
			.click();

		cy.get('[data-test-id="tasks-column"]')
			.should('exist')
			.children()
			.should('have.length', 2)
			.first()
			.find('[data-id=\'templateTaskTitle\']')
			.should('contain.text', todoTaskText);

	});
});
