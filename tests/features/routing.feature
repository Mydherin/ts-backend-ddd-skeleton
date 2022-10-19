Feature: Routing
  In order to check if the app support some special routing cases
  I want to check these routes

  Scenario: Not found 
    Given I send a GET request to "/noendpoint"
    Then the response status code should be 404