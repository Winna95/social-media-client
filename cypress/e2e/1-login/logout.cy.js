import {apiPath} from "../../../src/js/api";
describe("The social media app", () => {
    beforeEach(() => {
        cy.visit("/")
    })
    it("can logout with the logout button", () => {
        Cypress.on('uncaught:exception', (err, runnable) => {
            // This prevents the test from failing on uncaught exceptions
            return false;
        });

        cy.wait(500)
        cy.get('.modal-footer button[data-auth="login"]').click();

        cy.intercept('POST', `${apiPath}/social/auth/login`).as('loginRequest');


        const email = "gurilalla@noroff.no";
        const password = "Gurilalla123.";


        cy.get('[id="loginPassword"]').type(`${password}`, {force: true});
        cy.wait(200)
        cy.get('[id="loginEmail"]').type(`${email}`, {force: true});
        cy.wait(200)
        cy.get('.modal-footer button[type="submit"].btn-success:contains("Login")').click();

        cy.wait('@loginRequest')

        cy.get('button.btn.btn-outline-warning[data-auth="logout"][data-visible="loggedIn"]')
            .should('be.visible')
            .click()

        cy.wait(250)

        cy.get('button[type="submit"]:contains("Create Profile")').should('exist');
    })
})