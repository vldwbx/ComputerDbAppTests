import Computer from "../support/Entities/Computer"
import AddComputerPage from "../support/PageObjects/AddComputerPage"

const addComputerPage = new AddComputerPage()
const validCompName = "Test Computer 1"
const validDate = "2020-12-12"



const Data: { [key: string]: any } = {
    name: {
        Empty: "",
        Space: "   ", 
    },  
    intrDate: {
        twoDigYear: "20-12-12",
        dots: "2020.12.12",
        forwardSlash: "2020/12/12",
        monthDateYear: "12-12-2020",
        monthDateYearSlash: "12/12/2020",
        letters: "Dec. 12 2020"
    },
    discDate: {
        twoDigYear: "20-12-12",
        dots: "2020.12.12",
        forwardSlash: "2020/12/12",
        monthDateYear: "12-12-2020",
        monthDateYearSlash: "12/12/2020",
        letters: "Dec. 12 2020"
    }
    
}

describe('Create. Invalid Scenarios', () => {

    beforeEach(() => {
        addComputerPage.navigate()
    })

    // This tests verify computer is not created for every listed scenario,
    // and an error message is given

    describe('Computer Names', () => {
        
        for (const computer in Data.name) {
            it (computer, () => {
            //When I enter new computer information and submit the form
                addComputerPage.submitNewComputerForm(new Computer(
                    Data.name[computer],
                    validDate,
                    validDate,
                    addComputerPage.COMPANY_NAME_DD_OPTIONS[1]))
            // I should get a validation message
            addComputerPage.verifyValidation(addComputerPage.ELEMENTS.computerNameInputField)
            })
        }
    })

    describe('Introduced Date', () => {
        for (const intrDate in Data.intrDate) {
            it (intrDate, () => {
            //When I enter new computer information and submit the form
                addComputerPage.submitNewComputerForm(new Computer(
                    validCompName,
                    intrDate,
                    validDate,
                    addComputerPage.COMPANY_NAME_DD_OPTIONS[1]))
            // I should get a validation message
            addComputerPage.verifyValidation(addComputerPage.ELEMENTS.introDateInputField)
            })
        }
    })

    describe('Discontinued Date', () => {
        for (const discDate in Data.discDate) {
            it (discDate, () => {
                //When I enter new computer information and submit the form
                addComputerPage.submitNewComputerForm(new Computer(
                    validCompName,
                    validDate,
                    discDate,
                    addComputerPage.COMPANY_NAME_DD_OPTIONS[1]))
                // I should get a validation message
                addComputerPage.verifyValidation(addComputerPage.ELEMENTS.discontDateInputField)
            })
        }
    })
})
