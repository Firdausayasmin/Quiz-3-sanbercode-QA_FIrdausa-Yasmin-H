class Login{
    usernameField = 'input[name="username"]';
    passwordField = 'input[name="password"]';
    loginButton = 'button[type="submit"]';
    forgotPassword = '.orangehrm-login-forgot-header'
    errorMessageRequired = '.oxd-input-field-error-message';
    errorMessageInvalid = '.oxd-alert-content-text';

    visit(){
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    }

    fillUsername(username) {
        if (username) {
            cy.get(this.usernameField, {timeout: 10000}).should('be.visible').type(username);
        }
    }

    fillPassword(password) {
        if (password) {
            cy.get(this.passwordField, {timeout: 10000}).should('be.visible').type(password);
        }
    }

    clickForgotPassword(){
        cy.get(this.forgotPassword).click()
    }

    clickButton(){
        cy.get(this.loginButton).click()
    }

    getErrorMessageRequired(){
        return cy.get(this.errorMessageRequired)
    }

    getErrorMessageInvalid(){
        return cy.get(this.errorMessageInvalid)
    }
    
    login(username, password){
        this.fillUsername(username);
        this.fillPassword(password);
        this.clickButton();
    }
}
export default new Login()