describe('Fitur Login OrangeHM', () => {

    const baseUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'

    beforeEach(() => {
        cy.visit(baseUrl)
    })
    it ('TC_001 - Gagal login tanpa isi username & password', () =>{
        cy.get('input[name="username"]').clear()
        cy.get('input[name="password"]').clear()

        cy.get('button[type="submit"]').click()

        cy.get('input[name="username"]').should('have.class', 'oxd-input--error')
        cy.get('.oxd-input-field-error-message').should('contain', 'Required')

        cy.get('input[name="password"]').should('have.class', 'oxd-input--error')
        cy.get('.oxd-input-field-error-message').should('contain', 'Required')
    })

    it ('TC_002 - Berhasil login dengan isi username & password benar', () =>{
        cy.get('input[name="username"]').type('Admin')
        cy.get('input[name="password"]').type('admin123')

        cy.get('button[type="submit"]').click()
        
        cy.url().should('include', '/dashboard')
        cy.contains('Dashboard').should('be.visible')
    })

    it ('TC_003 - Gagal login dengan isi username salah & password benar', () =>{
        cy.get('input[name="username"]').type('iniadmin')
        cy.get('input[name="password"]').type('admin123')

        cy.get('button[type="submit"]').click()
        
        cy.get('.oxd-text.oxd-text--p.oxd-alert-content-text').should('contain', 'Invalid credentials')
    })

    it ('TC_004 - Gagal login dengan isi username benar & password salah', () =>{
        cy.get('input[name="username"]').type('Admin')
        cy.get('input[name="password"]').type('admin1234')

        cy.get('button[type="submit"]').click()
        
        cy.get('.oxd-text.oxd-text--p.oxd-alert-content-text').should('contain', 'Invalid credentials')
    })

    it ('TC_005 - Gagal login dengan hanya mengisi password benar', () =>{
        cy.get('input[name="username"]').clear()
        cy.get('input[name="password"]').type('admin123')

        cy.get('button[type="submit"]').click()
        
        cy.get('input[name="username"]').should('have.class', 'oxd-input--error')
  
        cy.get('.oxd-input-field-error-message').should('contain', 'Required')
    })

    it ('TC_006 - Gagal login dengan hanya mengisi username benar', () =>{
        cy.get('input[name="username"]').type('Admin')
        cy.get('input[name="password"]').clear()

        cy.get('button[type="submit"]').click()
        
        cy.get('input[name="password"]').should('have.class', 'oxd-input--error')
  
        cy.get('.oxd-input-field-error-message').should('contain', 'Required')
    })

    it ('TC_007 - Berhasil login dengan isi username & password benar (Case insensitive) ', () =>{
        cy.get('input[name="username"]').type('ADMIN')
        cy.get('input[name="password"]').type('admin123')

        cy.get('button[type="submit"]').click()
        
        cy.url().should('include', '/dashboard')
        cy.contains('Dashboard').should('be.visible')
    })
})