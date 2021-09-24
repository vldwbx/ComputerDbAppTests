import Computer from "../support/Entities/Computer";
import AddComputerPage from "../support/PageObjects/AddComputerPage"
import EditComputerPage from "../support/PageObjects/EditComputerPage";
import MainGridPage from "../support/PageObjects/MainGridPage";

var moment = require('moment');

const mainGridPage = new MainGridPage()
const addComputerPage = new AddComputerPage()
const editComputerPage = new EditComputerPage()

const TestData = {
    origComp: new Computer(  
        "Test Computer " + moment(),
        "2019-12-01",
        "2020-12-01",
        addComputerPage.COMPANY_NAME_DD_OPTIONS[1]),
    updComp: new Computer(
        "Updated " + moment() + 1,
        "2018-01-07",
        "2021-02-01",
        addComputerPage.COMPANY_NAME_DD_OPTIONS[3])
}
  
// This test verifies CRUD e2e workflow        
it ('CRUD. Valid', () => {

    //Verify computer doesn't exist
        //Given I navigate to Main Grid Page 
        mainGridPage.navigate()
        //When I search for computer information, I should get no results
        mainGridPage.filterForWithNoResults(TestData.origComp.name)
    //Create new computer
        //When I click the “Add a new computer” button
        cy.xpath(mainGridPage.ELEMENTS.default.addNewComputerBtn).click()
        //I should land on “Add a computer page”.
        addComputerPage.verifyDefaultPage()
        //And create a new computer with unique name
        addComputerPage.addNewComputer(TestData.origComp)
        //When I search for computer by name
        mainGridPage.filterFor(TestData.origComp.name)
        //Then I should see one result in the grid
        mainGridPage.thenShouldSeeOneResultInGrid(TestData.origComp)
        //Then I click computer name and verify details
        cy.xpath("(//tr)[2]/td[1]").click()
        editComputerPage.verifyDefaultPage()
        editComputerPage.verifyComputerInformation(TestData.origComp)
    //Update and verify computer information 
        editComputerPage.editComputer(TestData.updComp)
        //When I search for old computer information, I should get no results
        mainGridPage.filterForWithNoResults(TestData.origComp.name)
        //When I search for updated computer information, I should get 1 result
        mainGridPage.filterFor(TestData.updComp.name)
        mainGridPage.thenShouldSeeOneResultInGrid(TestData.updComp)
    //Delete computer entry
        //Then I click computer name and verify details
        cy.xpath("(//tr)[2]/td[1]/a").click()
        editComputerPage.verifyDefaultPage()
        editComputerPage.verifyComputerInformation(TestData.updComp)
        //And I delete the computer
        editComputerPage.deleteComputer()
        //And verify computer doesn't show in search results
        mainGridPage.filterForWithNoResults(TestData.updComp.name)
        mainGridPage.filterForWithNoResults(TestData.origComp.name)
        



})