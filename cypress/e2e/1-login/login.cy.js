import {apiPath} from "../../../src/js/api";

describe("The social media app", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it("can login a user and access their profile", () => {
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

    cy.get('[id="registerPassword"]').type(`${password}`);
    cy.get('[id="registerName"]').type(`${name}`);
    cy.get('[id="registerEmail"]').type(`${email}`);
    cy.get('[id="registerAvatar"]').type(`${avatarUrl}`);

    cy.get('button[type="submit"]:contains("Create Profile")').click();
    cy.wait('@loginRequest')

    cy.get('div.btn.btn-success.ps-4:contains("A-name")').should('be.visible')
  })

  it("cannot submit the login-form with invalid credentials", () => {
    const email = "notAValidEmailAddress";
    const password = "guessMe";

    cy.wait(500)


    cy.get('div.modal-footer button.btn.btn-outline-success[data-bs-target="#loginModal"][data-auth="login"]').click();

    cy.get('[id="loginEmail"]').type(`${email}`);
    cy.wait(50)
    cy.get('[id="loginPassword"]').type(`${password}{enter}`);

    cy.contains(`Please include an '@' in the email address. '${email}' is missing an '@'`).should('be.visible');;
  })

})