const { Given, When, Then, setDefaultTimeout } = require("@cucumber/cucumber");
const fs = require("node:fs");
const path = require("node:path");
const { request } = require("@playwright/test");
const { expect } = require("chai");
const config = require("../../resources/config.json");
const dataStore = require("../../resources/data.json");
const common = require("../StepLibrary/commonFunctions.js");

Given(
  "I prepare a registration payload",
  { timeout: 10000 },
  async function () {
    let payload = dataStore.signUpPayload;
    this.payload = payload;
    this.payload.username = common.uniqueUsername(payload.username);
    this.payload.email = common.uniqueEmail(payload.email);
    this.payload.password = payload.password;
  }
);

When(
  "I send a POST request to {string} with the payload",
  { timeout: 10000 },
  async function (action) {
    if (action === "signup") {
      this.apiContext = await request.newContext({
        baseURL: config.baseUrl,
      });
      let endpoint = config.endpoints.signup;
      this.response = await this.apiContext.post(endpoint, {
        data: this.payload,
        headers: {
          "Content-Type": "application/json",
        },
      });
      this.responseText = await this.response.text();
      console.log(await this.response.text());
    } else if (action === "login") {
      this.apiContext = await request.newContext({
        baseURL: config.baseUrl,
      });
      let endpoint = config.endpoints.login;
      this.response = await this.apiContext.post(endpoint, {
        data: dataStore.loginPayload,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  }
);

Then("the response status should be {int}", async function (statusCode) {
  expect(this.response.status()).to.equal(statusCode);
});

Then("the response body should have {string}", async function (element) {
  if (element === "token") {
    const body = await this.response.json();
    expect(body).to.have.property(element);
  } else {
    expect(this.responseText).to.include(element);
  }
});
