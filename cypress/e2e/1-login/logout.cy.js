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

        cy.intercept('POST', `${apiPath}/social/auth/register`, (req) => {
            req.reply({
                status: 200,
                body: {},
            });
        }).as('registerRequest');

        cy.intercept('POST', `${apiPath}/social/auth/login`, (req) => {
            req.reply({
                status: 200,
                body: {
                    accessToken: "this-is-a-token",
                    name: name
                },
            });
        }).as('loginRequest');

        const name = "A-name";
        const email = "user@noroff.no";
        const password = "aStr0ngPassword!";
        const avatarUrl = "http://picture.it/avatar";

        cy.get('[id="registerPassword"]').type(`${password}`)
        cy.get('[id="registerName"]').type(`${name}`)
        cy.get('[id="registerEmail"]').type(`${email}`)
        cy.get('[id="registerAvatar"]').type(`${avatarUrl}`)

        // cy.contains()

        cy.get('button[type="submit"]:contains("Create Profile")').click();
        cy.wait('@loginRequest')

        cy.get('button.btn.btn-outline-warning[data-auth="logout"][data-visible="loggedIn"]')
            .should('be.visible')
            .click()

        cy.wait(250)

        cy.get('button[type="submit"]:contains("Create Profile")').should('exist');
    })
})