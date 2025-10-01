class Login{
    usernameField = 'input[name="username"]';
    passwordField = 'input[name="password"]';
    loginButton = 'button[type="submit"]';
    errorMessageRequired = '.oxd-input-field-error-message';
    errorMessageInvalid = '.oxd-alert-content-text';

    visit(){
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    }

    fillUsername(username){
        if(username){
            cy.get(this.usernameField).type(username)
        }
    }

    fillPassword(password){
        if(password){ 
            cy.get(this.passwordField).type(password)
        }
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