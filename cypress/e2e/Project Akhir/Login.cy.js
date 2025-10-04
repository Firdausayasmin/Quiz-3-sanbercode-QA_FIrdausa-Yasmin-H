import Login from "../Project Akhir/pages/Login Page Object.js"
import Data from "../Project Akhir/fixtures/Data.json"
    
    describe("testing Login Page", () => {

        beforeEach(() => {
            cy.clearCookies();
            cy.clearLocalStorage();
        })

        it('TC_001 - Gagal login tanpa isi username & password', () => {
            cy.intercept("GET", "**/core/i18n/messages").as("getMessages")

            Login.visit()

            Login.login(Data.emptyData.username, Data.emptyData.password)

            cy.wait("@getMessages").its("response.statusCode").should("eq", 200)
            
            Login.getErrorMessageRequired()
            .should("be.visible")
            .and("contain", "Required")
        });
        
        it('TC_002 - Berhasil login dengan isi username & password benar', () => {
            cy.intercept("POST", "**/auth/validate").as("loginRequest")

            Login.visit()

            Login.login(Data.validData.username, Data.validData.password)

            cy.wait("@loginRequest").its("response.statusCode").should("eq", 302)

            cy.url().should('include', '/dashboard')
            cy.contains('Dashboard').should('be.visible')
        });

        it('TC_003 - Gagal login dengan isi username salah & password benar', () => {
            cy.intercept("POST", "**/auth/validate").as("wrongUsername")

            Login.visit()

            Login.login(Data.invalidUsername.username, Data.invalidUsername.password)

            cy.wait("@wrongUsername").its("response.statusCode").should("eq", 302)

            Login.getErrorMessageInvalid()
            .should("be.visible")
            .should("contain", "Invalid credentials")
        });

        it('TC_004 - Gagal login dengan isi username benar & password salah', () => {
            cy.intercept("POST", "**/auth/validate").as("wrongPassword")

            Login.visit()

            Login.login(Data.invalidPassword.username, Data.invalidPassword.password)

            cy.wait("@wrongPassword").its("response.statusCode").should("eq", 302)

            Login.getErrorMessageInvalid()
            .should("be.visible")
            .should("contain", "Invalid credentials")
        });
        
        it('TC_005 - Gagal login dengan hanya mengisi password benar', () => {
            cy.intercept("GET", "**/auth/login").as("onlyPassword")

            Login.visit()
            
            Login.login(Data.onlyPassword.username, Data.onlyPassword.password)

            cy.wait("@onlyPassword").its("response.statusCode").should("eq", 200)

            Login.getErrorMessageRequired()
            .should("be.visible")
            .and("contain", "Required")
        });

        it('TC_006 - Gagal login dengan hanya mengisi username benar', () => {
            cy.intercept("GET", "**/auth/login").as("onlyUsername")

            Login.visit()
            
            Login.login(Data.onlyUsername.username, Data.onlyUsername.password)

            cy.wait("@onlyUsername").its("response.statusCode").should("eq", 200)

            Login.getErrorMessageRequired()
            .should("be.visible")
            .and("contain", "Required")
        });

        it('TC_007 - Berhasil login dengan isi username & password benar (Case insensitive)', () => {
            cy.intercept("POST", "**/auth/validate").as("loginCaseInsensitive")

            Login.visit()

            Login.login(Data.insensitiveCase.username, Data.insensitiveCase.password)

            cy.wait("@loginCaseInsensitive").its("response.statusCode").should("eq", 302)

            cy.url().should('include', '/dashboard')
            cy.contains('Dashboard').should('be.visible')
        });

        it('TC_008 - Ke halaman reset password', () => {
            cy.intercept("GET", "**/auth/requestPasswordResetCode").as("forgotPassword")

            Login.visit()

            Login.clickForgotPassword()

            cy.wait("@forgotPassword").its("response.statusCode").should("eq", 200)

            cy.url().should('include', '/auth/requestPasswordResetCode')
            cy.contains('Reset Password').should('be.visible')
        });
})