import {apiPath} from "../../../src/js/api";

describe("The social media app", () => {
  beforeEach(() => {
    cy.visit("/")
  })
  it("can login a user and access their profile", () => {
    cy.intercept('POST', `${apiPath}/social/auth/register`, (req) => {
      req.reply({
        status: 200,
        body: { ok: true,
          json: () => Promise.resolve({})
        },
      });
    });

    cy.intercept('POST', `${apiPath}/social/auth/login`, (req) => {
      req.reply({
        status: 200,
        body: {
          ok: true,
          json: () => {
            return Promise.resolve({
              accessToken: "this-is-a-token",
              name: name
            })
          }
        },
      });
    });

    const name = "A-name";
    const email = "user@noroff.no";
    const password = "aStr0ngPassword!";
    const avatarUrl = "http://picture.it/avatar";

    cy.get('[id="registerPassword"]').type(`${password}`)
    cy.get('[id="registerName"]').type(`${name}`)
    cy.get('[id="registerEmail"]').type(`${email}`)
    cy.get('[id="registerAvatar"]').type(`${avatarUrl}`)



    cy.get('button[type="submit"]:contains("Create Profile")').click();

  })
})