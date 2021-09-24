declare namespace Cypress {
    interface Chainable<Subject> {
        clearAndType(ele: string, text: string): Cypress.Chainable<void>;
        verifyElementPresent(ele: string): Cypress.Chainable<void>;
        elementShouldNotExist(ele: string): Cypress.Chainable<void>;
    }
}

Cypress.Commands.add('clearAndType', 
    {prevSubject: false},
    (ele, text) => {
        cy.xpath(ele).click().clear().type(text)
            .should('have.value', text)
    }
)

Cypress.Commands.add('verifyElementPresent',
    {prevSubject: false},
    (ele) => {
        cy.xpath(ele).should('exist')
    }
)

Cypress.Commands.add('elementShouldNotExist',
    {prevSubject: false},
    (ele) => {
        cy.xpath(ele).should('not.exist')
    }
)
