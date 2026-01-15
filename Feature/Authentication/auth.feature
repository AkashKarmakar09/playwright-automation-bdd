Feature: User Registration and Authentication APIs
  As a tester
  I want to validate registration, login and token behavior
  So that the authentication flow is reliable and secure
  
  @registration
  Scenario: Successful User Registration
    Given I prepare a registration payload
    When I send a POST request to "signup" with the payload
    Then the response status should be 200
    And the response body should have "User registered successfully!"

  @login
  Scenario: Successful User Login
   Given I send a POST request to "login" with the payload
   Then  the response status should be 200
   And the response body should have "token"
