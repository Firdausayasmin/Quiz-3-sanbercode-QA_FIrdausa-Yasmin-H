describe('Fitur Login OrangeHM', () => {

    const baseUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'

    it ('TC_001 - Gagal login tanpa isi username & password', () =>{
        cy.intercept("GET", "**/core/i18n/messages").as("getMessages")

        cy.visit(baseUrl)
        cy.wait("@getMessages").then((intercept) => {
            expect(intercept.response.statusCode).to.equal(200)
        })

        cy.get('input[name="username"]').clear()
        cy.get('input[name="password"]').clear()

        cy.get('button[type="submit"]').click()

        cy.get('input[name="username"]').should('have.class', 'oxd-input--error')
        cy.get('.oxd-input-field-error-message').should('contain', 'Required')

        cy.get('input[name="password"]').should('have.class', 'oxd-input--error')
        cy.get('.oxd-input-field-error-message').should('contain', 'Required')
    })

    it ('TC_002 - Berhasil login dengan isi username & password benar', () =>{
        cy.intercept("POST", "**/auth/validate").as("loginRequest")

        cy.visit(baseUrl)

        cy.get('input[name="username"]').type('Admin')
        cy.get('input[name="password"]').type('admin123')

        cy.get('button[type="submit"]').click()

        cy.wait("@loginRequest").then((intercept) => {
            expect(intercept.response.statusCode).to.equal(302)
        })
        
        cy.url().should('include', '/dashboard')
        cy.contains('Dashboard').should('be.visible')
    })

    it ('TC_003 - Gagal login dengan isi username salah & password benar', () =>{
        cy.intercept("POST", "**/auth/validate").as("wrongUsername")

        cy.visit(baseUrl)

        cy.get('input[name="username"]').type('iniadmin')
        cy.get('input[name="password"]').type('admin123')

        cy.get('button[type="submit"]').click()

        cy.wait("@wrongUsername").then((intercept) => {
            expect(intercept.request.url).to.include('/auth/validate')
            expect(intercept.response.statusCode).to.equal(302)
        })
        
        cy.get('.oxd-text.oxd-text--p.oxd-alert-content-text').should('contain', 'Invalid credentials')
    })

    it ('TC_004 - Gagal login dengan isi username benar & password salah', () =>{
        cy.intercept("POST", "**/auth/validate").as("wrongPassword")

        cy.visit(baseUrl)

        cy.get('input[name="username"]').type('Admin')
        cy.get('input[name="password"]').type('admin1234')

        cy.get('button[type="submit"]').click()

        cy.wait("@wrongPassword").then((intercept) => {
            expect(intercept.response.headers.location).to.include('/auth/login')
            expect(intercept.response.statusCode).to.equal(302)
        })
        
        cy.get('.oxd-text.oxd-text--p.oxd-alert-content-text').should('contain', 'Invalid credentials')
    })

    it ('TC_005 - Gagal login dengan hanya mengisi password benar', () =>{
        cy.intercept("GET", "**/auth/login").as("onlyPassword")

        cy.visit(baseUrl)
        
        cy.get('input[name="username"]').clear()
        cy.get('input[name="password"]').type('admin123')

        cy.get('button[type="submit"]').click()

        cy.wait("@onlyPassword").then((intercept) => {
            expect(intercept.response.statusCode).to.equal(200)
        })
        
        cy.get('input[name="username"]').should('have.class', 'oxd-input--error')
  
        cy.get('.oxd-input-field-error-message').should('contain', 'Required')
    })

    it ('TC_006 - Gagal login dengan hanya mengisi username benar', () =>{
        cy.intercept("GET", "**/auth/login").as("onlyUsername")

        cy.visit(baseUrl)
        cy.wait("@onlyUsername").then((intercept) => {
            expect(intercept.response.headers['content-type']).to.include('text/html')
            expect(intercept.response.statusCode).to.equal(200)
        })

        cy.get('input[name="username"]').type('Admin')
        cy.get('input[name="password"]').clear()

        cy.get('button[type="submit"]').click()
        
        cy.get('input[name="password"]').should('have.class', 'oxd-input--error')
  
        cy.get('.oxd-input-field-error-message').should('contain', 'Required')
    })

    it ('TC_007 - Berhasil login dengan isi username & password benar (Case insensitive) ', () =>{
        cy.intercept("POST", "**/auth/validate").as("loginCaseInsensitive")

        cy.visit(baseUrl)

        cy.get('input[name="username"]').type('ADMIN')
        cy.get('input[name="password"]').type('admin123')

        cy.get('button[type="submit"]').click()

        cy.wait("@loginCaseInsensitive").then((intercept) => {
            expect(intercept.response.headers.location).to.include('/dashboard')
            expect(intercept.response.statusCode).to.equal(302)
        })
        
        cy.url().should('include', '/dashboard')
        cy.contains('Dashboard').should('be.visible')
    })
})