import Login from "../Project Akhir/pages/Login Page Object.js"
import Dashboard from "../Project Akhir/pages/Dashboard Page Object.js"
import Data from "../Project Akhir/fixtures/Data.json"
    
    describe("testing Dashboard Page", () => {
 
        beforeEach(() => {
            cy.clearCookies();
            cy.clearLocalStorage();

            cy.visit("/web/index.php/auth/login")
            Login.login(Data.validData.username, Data.validData.password)
            cy.url().should('include', '/dashboard')  

            Dashboard.clickNavbarButton()

            Dashboard.clickDirectoryMenu()

            cy.url().should('include', '/directory/viewDirectory')
            cy.contains('Directory').should('be.visible')
        })        

        it('TC_001 - Verifikasi form pencarian', () => {
            cy.get(Dashboard.employeeField).should('be.visible')

            cy.get(Dashboard.jobTitleDropdown).should('be.visible')

            cy.get(Dashboard.locationDropdown).should('be.visible')
        });

        it('TC_002 - Buka detail card', () => {
            cy.get(Dashboard.employeeField).should('be.visible')

            Dashboard.clickCardEmployee(1)
        });
        it('TC_003 - Cari employee dengan nama valid', () => {
            cy.intercept("GET", "**/web/index.php/api/v2/directory/employees*").as("getEmployees");

            Dashboard.fillEmployee('Ranga')

            Dashboard.selectSuggestion("Ranga");

            Dashboard.clicksearchButton()

            cy.wait('@getEmployees').its('response.statusCode').should('eq', 200)
            cy.get(Dashboard.cardEmployee).should('contain', 'Ranga')
        });

        it('TC_004 - Cari employee dengan nama invalid', () => {
            cy.intercept("GET", "**/web/index.php/api/v2/directory/employees*").as("getEmployees");

            Dashboard.fillEmployee('admin') 

            Dashboard.clicksearchButton()

            cy.wait('@getEmployees').its('response.statusCode').should('eq', 200)

            Dashboard.getErrorMessageInvalid()
            .should("be.visible")
            .should("contain.text", "Invalid")
        });

        it('TC_005 - Cari employee berdasarkan job title', () => {
            cy.intercept("GET", "**/web/index.php/api/v2/directory/employees*").as("getEmployees");

            Dashboard.selectJobTitle('Chief Financial Officer') 

            Dashboard.clicksearchButton()

            cy.wait('@getEmployees').its('response.statusCode').should('eq', 200)

            cy.get(Dashboard.cardEmployee).should('contain', 'Chief Financial Officer')
        });

        it('TC_006 - Cari employee berdasarkan location', () => {
            cy.intercept("GET", "**/web/index.php/api/v2/directory/employees*").as("getEmployees");

            Dashboard.selectLocation('Texas R&D') 

            Dashboard.clicksearchButton()

            cy.wait('@getEmployees').its('response.statusCode').should('eq', 200)

            cy.get(Dashboard.cardEmployee).should('contain', 'Texas R&D')
        });


        it('TC_007 - Cari employee dengan nama, job title, location valid', () => {
            cy.intercept("GET", "**/web/index.php/api/v2/directory/employees*").as("getEmployees");

            Dashboard.fillEmployee('Rebecca')

            Dashboard.selectSuggestion("Rebecca");

            Dashboard.selectJobTitle('QA Engineer')

            Dashboard.selectLocation('Texas R&D') 

            Dashboard.clicksearchButton()

            cy.wait('@getEmployees').its('response.statusCode').should('eq', 200)
            cy.get(Dashboard.cardEmployee).should('contain', 'Rebecca')
            cy.get(Dashboard.cardEmployee).should('contain', 'QA Engineer')
            cy.get(Dashboard.cardEmployee).should('contain', 'Texas R&D')
        });

        it('TC_008 - Reset search', () => {
            cy.intercept("GET", "**/web/index.php/api/v2/directory/employees*").as("getEmployees");

            Dashboard.selectJobTitle('Software Engineer') 

            Dashboard.clickresetButton()

            cy.get(Dashboard.cardEmployee).should('be.visible')
        });
})