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
  "I send a POST request to signup with the payload",
  { timeout: 10000 },
  async function () {
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
  }
);

Then("the response status should be {int}", async function (int) {
  expect(this.response.status()).to.equal(int);
});

Then("the response text should have {string}", async function (string) {
  expect(this.responseText).to.include(string);
});
