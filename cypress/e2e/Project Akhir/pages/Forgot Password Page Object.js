class ForgotPassword{
    usernameField = 'input[name="username"]';
    resetButton = 'button[type="submit"]';
    cancelButton = '.orangehrm-forgot-password-button--cancel';
    errorMessageRequired = '.oxd-input-field-error-message';

    visit(){
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode")
    }

    fillUsername(username){
        if(username){
            cy.get(this.usernameField).type(username)
        }
    }

    clickResetButton(){
        cy.get(this.resetButton).click()
    }

    clickCancelButton(){
        cy.get(this.cancelButton).click()
    }

    getErrorMessageRequired(){
        return cy.get(this.errorMessageRequired)
    }

    forgotpassword(username){
        this.fillUsername(username);
        this.clickResetButton();
    }
}
export default new ForgotPassword()