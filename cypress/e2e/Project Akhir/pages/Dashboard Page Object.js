class Dashboard{    
    navBar = '.oxd-main-menu-button';
    directoryMenu = 'a[href="/web/index.php/directory/viewDirectory"]';
    employeeField = 'input[placeholder="Type for hints..."]';
    suggestionDropdown = '.oxd-autocomplete-dropdown';
    jobTitleDropdown = '.oxd-form-row .oxd-grid-item:nth-child(2) .oxd-select-text-input';
    locationDropdown = '.oxd-form-row .oxd-grid-item:nth-child(3) .oxd-select-text-input';
    dropdownOption = '.oxd-select-dropdown .oxd-select-option';
    errorMessageInvalid = '.oxd-input-field-error-message';
    resetButton = 'button[type="reset"]';
    searchButton = 'button[type="submit"]';
    cardEmployee = '.orangehrm-directory-card'

    visit(){
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/directory/viewDirectory")
    }

    clickNavbarButton(){
        cy.get(this.navBar, { timeout: 10000 }).should('be.visible').click()
    }

    clickDirectoryMenu(){
        cy.get(this.directoryMenu, { timeout: 10000 }).should('be.visible').click()
    }

    fillEmployee(name){
        if(name){
            cy.get(this.employeeField).type(name)
        }
    }

    selectSuggestion(name) {
        cy.get(this.suggestionDropdown).contains(name).click();
    }

    getErrorMessageInvalid(){
        return cy.get(this.errorMessageInvalid);
    }

    selectJobTitle(optionText) {
        cy.get(this.jobTitleDropdown).click()
        cy.get(this.dropdownOption).contains(optionText).click()
    }

    selectLocation(optionText) {
        cy.get(this.locationDropdown).click()
        cy.get(this.dropdownOption).contains(optionText).click()
    }

    clickresetButton(){
        cy.get(this.resetButton).click()
    }

    clicksearchButton(){
        cy.get(this.searchButton).click()
    }

    clickCardEmployee(index = 0) {
        cy.get(this.cardEmployee).eq(index).click();
    }

    directory(name){
        this.fillEmployee(name);
        this.clicksearchButton();
    }
}
export default new Dashboard()