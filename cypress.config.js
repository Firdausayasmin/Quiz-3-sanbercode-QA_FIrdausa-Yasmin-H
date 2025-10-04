const { defineConfig } = require("cypress");

module.exports = {
  e2e: {
    pageLoadTimeout: 120000,
    defaultCommandTimeout: 10000,
    requestTimeout: 15000, 
    responseTimeout: 15000, 
    baseUrl: "https://opensource-demo.orangehrmlive.com"
  }
}

