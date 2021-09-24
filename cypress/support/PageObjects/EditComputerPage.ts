
import moment = require("moment")
import Computer from "../Entities/Computer"
import MainGridPage from "./MainGridPage"
import AddComputerPage from "./AddComputerPage"

class EditComputerPage{

    mainGridPage = new MainGridPage()
    addComputerPage = new AddComputerPage()
    validDateFormat = "YYYY-MM-DD"

    ELEMENTS: { [key: string]: string } = {
        pageHeader: "//h1[text() = 'Edit computer']",
        computerNameInputField: "//input[@id='name']",
        introDateInputField: "//input[@id='introduced']",
        discontDateInputField: "//input[@id='discontinued']",
        companyNameDD: "//select[@id='company']",
        saveComputerBtn: "//input[@type='submit' and @value='Save this computer']",
        cancelBtn: "//a[text()='Cancel']",
        deleteComputerBtn: "//input[@type='submit' and @value='Delete this computer']",
    }

    VALIDATION_MESSAGES = {
        required: "//span[@class='help-inline' and text()='Required']"
    }

    verifyDefaultPage() {
        for (let ele in this.ELEMENTS) {
            cy.verifyElementPresent(this.ELEMENTS[ele])
        }
    }

    verifyComputerInformation(computer: Computer) {
        cy.xpath(this.ELEMENTS.computerNameInputField).should('have.value', computer.name)
        cy.xpath(this.ELEMENTS.introDateInputField).should('have.value', computer.intrDate)
        cy.xpath(this.ELEMENTS.discontDateInputField).should('have.value', computer.discDate)
        cy.xpath(this.ELEMENTS.companyNameDD).invoke('val').should('equal',
            Object.keys(this.addComputerPage.COMPANY_NAME_DD_OPTIONS).find(
                key => this.addComputerPage.COMPANY_NAME_DD_OPTIONS[key] === computer.company)??[0])
    }

    editComputer(computer: Computer) {
        this.submitEditComputerForm(computer)
        this.mainGridPage.verifyDefaultPage()
        cy.xpath(this.mainGridPage.ELEMENTS.computerUpdatedAlert)
            .should('contain', computer.name)
    }

    deleteComputer() {
        cy.xpath(this.ELEMENTS.deleteComputerBtn).click()
        this.mainGridPage.verifyDefaultPage()
        cy.verifyElementPresent(this.mainGridPage.ELEMENTS.computerDeletedAlert)
    }

    submitEditComputerForm(computer: Computer) {
        if (computer.name != "") cy.clearAndType(this.ELEMENTS.computerNameInputField, computer.name)    
        if (computer.intrDate != undefined) 
            cy.clearAndType(this.ELEMENTS.introDateInputField, moment(computer.intrDate).format(this.validDateFormat))
        if (computer.discDate != undefined) 
            cy.clearAndType(this.ELEMENTS.discontDateInputField, moment(computer.discDate).format(this.validDateFormat))
        cy.xpath(this.ELEMENTS.companyNameDD).select(computer.company)
        cy.xpath(this.ELEMENTS.saveComputerBtn).click()
    }

    verifyValidation(ele: string) {
        cy.verifyElementPresent(this.VALIDATION_MESSAGES.required)
        cy.xpath(ele).should('have.css', 'border-color', 'rgb(200, 120, 114)')
    }
    
}
export default EditComputerPage