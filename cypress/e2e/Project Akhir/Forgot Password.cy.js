import ForgotPassword from "../Project Akhir/pages/Forgot Password Page Object.js"
import Data from "../Project Akhir/fixtures/Data.json"
    
    describe("testing Forgot Password Page", () => {

        beforeEach(() => {
            cy.clearCookies();
            cy.clearLocalStorage();
        })

        it('TC_001 - Gagal ganti password karena tidak isi username', () => {
            cy.intercept("GET", "**/core/i18n/messages").as("getMessages")

            ForgotPassword.visit()

            ForgotPassword.forgotpassword(Data.emptyData.username)

            cy.wait("@getMessages").its("response.statusCode").should("eq", 200)
            
            ForgotPassword.getErrorMessageRequired()
            .should("be.visible")
            .and("contain", "Required")
        });
        
        it('TC_002 - Berhasil ganti password dengan isi username benar', () => {
            cy.intercept("POST", "**/auth/requestResetPassword").as("ForgotPasswordRequest")

            ForgotPassword.visit()

            ForgotPassword.forgotpassword(Data.validData.username)

            cy.wait("@ForgotPasswordRequest").its("response.statusCode").should("eq", 302)

            cy.url().should('include', '/sendPasswordReset')
            cy.contains('Reset Password').should('be.visible')
        });

        it('TC_003 - Cancel reset password', () => {
            cy.intercept("GET", "**/auth/login").as("cancelRequest")

            ForgotPassword.visit()

            ForgotPassword.clickCancelButton()

            cy.wait("@cancelRequest").its("response.statusCode").should("eq", 200)

            cy.url().should('include', '/auth/login')
            cy.contains('Login').should('be.visible')
        });
})