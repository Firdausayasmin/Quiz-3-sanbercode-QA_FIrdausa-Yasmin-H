describe("API Testing", () => {

    it('T001 - Get API Testing', () => {
        cy.request('GET', 'https://reqres.in/')
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.not.be.null
        })
    });

    it('T002 - Get List User', () => {
        cy.request({
            method: 'GET',
            url: 'https://reqres.in/api/users?page=2',
            headers: {
                'x-api-key': 'reqres-free-v1'
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.not.be.null
        })
    });


    it('T003 - Get Single User', () => {
        cy.request({
            method: 'GET',
            url: 'https://reqres.in/api/users/2',
            headers: {
                'x-api-key': 'reqres-free-v1'
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.not.be.null
        })
    });

    it('T004 - Get Single User Not Found', () => {
        cy.request({
            method: 'GET',
            url: 'https://reqres.in/api/users/23',
            headers: {
                'x-api-key': 'reqres-free-v1'
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(404)
            expect(response.body).to.not.be.null
        })
    });

    it('T005 - Create Single User', () => {
        cy.request({
            method: 'POST',
            url: 'https://reqres.in/api/users',
            headers: {
                'x-api-key': 'reqres-free-v1'
            },
            body: {
                'name': "John",
                'job': "Engineer",
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body).to.have.property('name', 'John')
            expect(response.body).to.have.property('job', 'Engineer')
            expect(response.body).to.have.property('id')
            expect(response.body).to.have.property('createdAt')
        })
    });

    it('T006 - Update Single User', () => {
        cy.request({
            method: 'PUT',
            url: 'https://reqres.in/api/users/2',
            headers: {
                'x-api-key': 'reqres-free-v1'
            },
            body:{
                "name": "Maria",
                "job": "Front End Developer"
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('name', 'Maria')
            expect(response.body).to.have.property('job', 'Front End Developer')
        })
    });

    it('T007 - Update Single User', () => {
        cy.request({
            method: 'PATCH',
            url: 'https://reqres.in/api/users/2',
            headers: {
                'x-api-key': 'reqres-free-v1'
            },
            body:{
                "job": "Back End Developer"
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('job', 'Back End Developer')
        })
    });

    it('T008 - Delete Single User', () => {
        cy.request({
            method: 'DELETE',
            url: 'https://reqres.in/api/users/2',
            headers: {
                'x-api-key': 'reqres-free-v1'
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(204)
            expect(response.body).to.not.be.null
        })
    });

    it('T009 - Register User (Successful)', () => {
        cy.request({
            method: 'POST',
            url: 'https://reqres.in/api/register',
            headers: {
                'x-api-key': 'reqres-free-v1'
            },
            body:{
                "email": "eve.holt@reqres.in",
                "password": "pistol"
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('id')
            expect(response.body).to.have.property('token')
        })
    });

    it('T010 - Register User (Unsuccessful)', () => {
        cy.request({
            method: 'POST',
            url: 'https://reqres.in/api/register',
            headers: {
                'x-api-key': 'reqres-free-v1'
            },
            body:{
                "password": "pistol"
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400)
        })
    });

    it('T011 - Login User (Successful)', () => {
        cy.request({
            method: 'POST',
            url: 'https://reqres.in/api/login',
            headers: {
                'x-api-key': 'reqres-free-v1'
            },
            body:{
                "email": "eve.holt@reqres.in",
                "password": "pistol"
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('token')
        })
    });

    it('T012 - Login User (Unsuccessful)', () => {
        cy.request({
            method: 'POST',
            url: 'https://reqres.in/api/login',
            headers: {
                'x-api-key': 'reqres-free-v1'
            },
            body:{
                "password": "pistol"
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400)
        })
    });

    it('T013 - Get Delay', () => {
        cy.request({
            method: 'GET',
            url: 'https://reqres.in/api/users?delay=3',
            headers: {
                'x-api-key': 'reqres-free-v1'
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.not.be.null
        })
    });
})