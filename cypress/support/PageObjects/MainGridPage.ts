import moment = require("moment")
import Computer from "../Entities/Computer"

class MainGridPage{

    pageUrl = "/computers"
    pageTitle = "Computers database"
    dateFormat = "DD MMM YYYY"

    ELEMENTS: { [key: string]: any } = {
        default: {
            addNewComputerBtn: "//a[@id='add']",
            filterBox: "//input[@id='searchbox']",
            filterSubmitBtn: "//input[@id='searchsubmit']"
        },   
        computerCreatedAlert: "//*[@class='alert-message warning' and contains(., 'has been created')]",
        computerUpdatedAlert: "//*[@class='alert-message warning' and contains(., 'has been updated')]",
        computerDeletedAlert: "//*[@class='alert-message warning' and contains(., 'Computer has been deleted')]",
        noResultsFound: "//em[text() = 'Nothing to display']"
    }

    navigate() {
        cy.visit(this.pageUrl)
        this.verifyDefaultPage()           
    }

    verifyDefaultPage() {
        cy.title().should('eq', this.pageTitle)
        cy.url().should('include', this.pageUrl)
        for (let ele in this.ELEMENTS.default) {
            cy.verifyElementPresent(this.ELEMENTS.default[ele])
        }
    }

    filterForWithNoResults(text: string) {
        this.filterFor(text)
        cy.elementShouldNotExist("//tr")
        cy.verifyElementPresent(this.ELEMENTS.noResultsFound)
    }

    filterFor(text: string) {
        cy.clearAndType(this.ELEMENTS.default.filterBox, text)
        cy.xpath(this.ELEMENTS.default.filterSubmitBtn).click()
    }

    thenShouldSeeResultsInGrid(text: string, num: number) {
        cy.xpath("//tr").should('have.length', num + 1)
        for (let i = 2; i <= num + 1; i++) {
            cy.xpath(`(//tr)[${i}]/td[1]`) //xpath row index starts at 2; column with comp. name is 1
                .should('have.text', text)
        }
    }

    thenShouldSeeOneResultInGrid(computer: Computer) {
        cy.xpath("//tr").should('have.length', 2) //1 for headers
        cy.xpath("(//tr)[2]/td[1]").should('have.text', computer.name)
        cy.xpath("(//tr)[2]/td[2]").invoke('text').then((text) => {
            expect(text.replace(/\n+/g, "").trim()).to.eq(moment(computer.intrDate).format(this.dateFormat))
        })
        cy.xpath("(//tr)[2]/td[3]").invoke('text').then((text) => {
            expect(text.replace(/\n+/g, "").trim()).to.eq(moment(computer.discDate).format(this.dateFormat))
        })
        cy.xpath("(//tr)[2]/td[4]").invoke('text').then((text) => {
            expect(text.replace(/\n+/g, "").trim()).to.eq(computer.company)
        })
    }

}
export default MainGridPage