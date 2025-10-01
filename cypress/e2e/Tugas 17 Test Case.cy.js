import Login from "../pages/Tugas 17 Action.js"
import loginData from "../fixtures/Tugas 17 Tes Data.json"
    
    describe("testing Login Page", () => {

        beforeEach(() => {
            Login.visit()
        })

        it('TC_001 - Gagal login tanpa isi username & password', () => {
            Login.login(loginData.emptyData.username, loginData.emptyData.password)

            Login.getErrorMessageRequired().should('contain', 'Required')
        });
        it('TC_002 - Berhasil login dengan isi username & password benar', () => {
            Login.login(loginData.validData.username, loginData.validData.password)

            cy.url().should('include', '/dashboard')
        });
        it('TC_003 - Gagal login dengan isi username salah & password benar', () => {
            Login.login(loginData.invalidUsername.username, loginData.invalidUsername.password)

            Login.getErrorMessageInvalid().should('contain', 'Invalid credentials')
        });
        it('TC_004 - Gagal login dengan isi username benar & password salah', () => {
            Login.login(loginData.invalidPassword.username, loginData.invalidPassword.password)

            Login.getErrorMessageInvalid().should('contain', 'Invalid credentials')
        });
        it('TC_005 - Gagal login dengan hanya mengisi password benar', () => {
            Login.login(loginData.onlyPassword.username, loginData.onlyPassword.password)

            Login.getErrorMessageRequired().should('contain', 'Required')
        });
        it('TC_006 - Gagal login dengan hanya mengisi username benar', () => {
            Login.login(loginData.onlyUsername.username, loginData.onlyUsername.password)

            Login.getErrorMessageRequired().should('contain', 'Required')
        });
        it('TC_007 - Berhasil login dengan isi username & password benar (Case insensitive) ', () => {
            Login.login(loginData.insensitiveCase.username, loginData.insensitiveCase.password)

            cy.url().should('include', '/dashboard')
        });
    })