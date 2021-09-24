import Computer from "../support/Entities/Computer";
import AddComputerPage from "../support/PageObjects/AddComputerPage"
import EditComputerPage from "../support/PageObjects/EditComputerPage";
import MainGridPage from "../support/PageObjects/MainGridPage";

var moment = require('moment');

const validCompName = "Test Computer 1"
const validDate = "2020-12-12"

const mainGridPage = new MainGridPage()
const editComputerPage = new EditComputerPage()
const addComputerPage = new AddComputerPage()

const TestData: { [key: string]: string } = {
    Valid: "Test Computer " + moment(), 
    SpecialChars: "<>?!@%~+_@#$%^&*(((((())-" + moment(), 
    MaxLength:new Array(250).join('t')  + moment(),
    NonEnglishChars: "Компьютер "  + moment(),
}


    
describe('Create tests', () => {
    
    beforeEach(() => {
        addComputerPage.navigate()
    })

    describe('Happy Path', () => {

        // This tests verify computer is created for every listed scenario

        describe('Computer Names', () => {           
            for (const computer in TestData) {
                it (computer, () => {
                    addComputerPage.addNewComputer(new Computer(
                        TestData[computer],
                        validDate,
                        validDate,
                        addComputerPage.COMPANY_NAME_DD_OPTIONS[1]))
                    mainGridPage.filterFor(TestData[computer])
                    mainGridPage.thenShouldSeeResultsInGrid(TestData[computer], 1)
                })
            }
        })
        
        it ('Computer. Same Computer', () => {
            const compName = "Dup Computer Name " + moment()
            //Given I create a computer
            addComputerPage.addNewComputer(new Computer(
                compName,
                validDate,
                validDate,
                addComputerPage.COMPANY_NAME_DD_OPTIONS[1]))
            //When I create a computer with same parameters
            addComputerPage.navigate()
            addComputerPage.addNewComputer(new Computer(
                compName,
                validDate,
                validDate,
                addComputerPage.COMPANY_NAME_DD_OPTIONS[1]))
            //And I search for computer by name
            mainGridPage.filterFor(compName)
            //Then I should see two results in the grid
            mainGridPage.thenShouldSeeResultsInGrid(compName, 2)
        })
    
        describe('For Every Company', () => {
            for (const company in addComputerPage.COMPANY_NAME_DD_OPTIONS) {
                it (company, () => {
                    addComputerPage.addNewComputer(new Computer(
                        validCompName,
                        validDate, 
                        validDate, 
                        addComputerPage.COMPANY_NAME_DD_OPTIONS[company]))
                })
            }
        })

    })
    
    afterEach(() => {
        //Delete test data
        //This would nomally be done before or after test run with api or database script
        cy.get('body').then((body) => {
            var eles = body.find('tr')
            if (eles.length == 2) {
                cy.xpath("(//tr)[2]/td[1]/a").click()
                //And I delete the computer
                editComputerPage.deleteComputer()
            }
        })
    })

})