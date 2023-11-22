import {apiPath} from "../../../src/js/api";

describe("The social media app", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it("can login a user and access their profile", () => {
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

    cy.get('h4.mb-0.profile-name')
        .should('exist')
        .should('have.text', 'GuriLalla');

  })

  it("cannot submit the login-form with invalid credentials", () => {
    const email = "notAValidEmailAddress";
    const password = "guessMe";

    cy.wait(500)


    cy.get('div.modal-footer button.btn.btn-outline-success[data-bs-target="#loginModal"][data-auth="login"]').click();

    cy.get('[id="loginEmail"]').type(`${email}`, {force: true});
    cy.wait(200);
    cy.get('[id="loginPassword"]').type(`${password}`,{force: true});
    cy.wait(200);
    cy.get('.modal-footer button[type="submit"].btn-success:contains("Login")').click();

    cy.contains(`Please include an '@' in the email address. '${email}' is missing an '@'`).should('be.visible');;
  })

})