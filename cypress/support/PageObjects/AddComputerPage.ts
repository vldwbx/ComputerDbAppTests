
import moment = require("moment")
import Computer from "../Entities/Computer"
import MainGridPage from "./MainGridPage"

class AddComputerPage{

    mainGridPage = new MainGridPage()
    validDateFormat = "YYYY-MM-DD"

    pageUrl = "/computers/new"
    pageTitle = "Computers database"

    ELEMENTS: { [key: string]: string } = {
        computerNameInputField: "//input[@id='name']",
        introDateInputField: "//input[@id='introduced']",
        discontDateInputField: "//input[@id='discontinued']",
        companyNameDD: "//select[@id='company']",
        createComputerBtn: "//input[@type='submit']"
    }

    VALIDATION_MESSAGES = {
        required: "//span[@class='help-inline' and text()='Required']"
    }

    COMPANY_NAME_DD_OPTIONS: { [key: string]: string } = {
        "1": "Apple Inc.",
        "3": "RCA"
    }

    navigate() {
        cy.visit(this.pageUrl)
        this.verifyDefaultPage()           
    }

    verifyDefaultPage() {
        cy.title().should('eq', this.pageTitle)
        cy.url().should('include', this.pageUrl)
        for (let ele in this.ELEMENTS) {
            cy.verifyElementPresent(this.ELEMENTS[ele])
        }
    }

    addNewComputer(computer: Computer) {
        this.submitNewComputerForm(computer)
        this.mainGridPage.verifyDefaultPage()
        cy.xpath(this.mainGridPage.ELEMENTS.computerCreatedAlert)
            .should('contain', computer.name)
    }

    submitNewComputerForm(computer: Computer) {
        if (computer.name != "") cy.clearAndType(this.ELEMENTS.computerNameInputField, computer.name)    
        if (computer.intrDate != undefined) 
            cy.clearAndType(this.ELEMENTS.introDateInputField, moment(computer.intrDate).format(this.validDateFormat))
        if (computer.discDate != undefined) 
            cy.clearAndType(this.ELEMENTS.discontDateInputField, moment(computer.discDate).format(this.validDateFormat).toString())
        cy.xpath(this.ELEMENTS.companyNameDD).select(computer.company)
        cy.xpath(this.ELEMENTS.createComputerBtn).click()
    }

    verifyValidation(ele: string) {
        cy.verifyElementPresent(this.VALIDATION_MESSAGES.required)
        cy.xpath(ele).should('have.css', 'border-top-color', 'rgb(200, 120, 114)')
    }
    
}
export default AddComputerPage