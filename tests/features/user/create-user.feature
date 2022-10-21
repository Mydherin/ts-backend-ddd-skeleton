Feature: Create a new user
    In order to have users in the platform
    I want to create a new user

    Scenario: A valid user
    Given I send a PUT request to "/users" with body:
    """
    {
        "name": "Mydherin",
        "password": "P@ssw0rd",
        "email": "email@email.com"
    }
    """
    Then the response status code should be 201
    And the response should be empty
    
    Scenario: A duplicated user
    Given I send a PUT request to "/users" with body:
    """
    {
        "name": "Mydherin",
        "password": "P@ssw0rd",
        "email": "email@email.com"
    }
    """
    Then the response status code should be 409
    And the response should contain "Duplicated" 
    
    Scenario: No name
    Given I send a PUT request to "/users" with body:
    """
    {
        "password": "P@ssw0rd",
        "email": "email@email.com"
    }
    """
    Then the response status code should be 422
    And the response should contain "name"

    Scenario: No password
    Given I send a PUT request to "/users" with body:
    """
    {
        "name": "Mydherin",
        "email": "email@email.com"
    }
    """
    Then the response status code should be 422
    And the response should contain "password"
    
    Scenario: No email
    Given I send a PUT request to "/users" with body:
    """
    {
        "name": "Mydherin",
        "password": "P@ssw0rd"
    }
    """
    Then the response status code should be 422
    And the response should contain "email"
    
    Scenario: No string name
    Given I send a PUT request to "/users" with body:
    """
    {
        "name": 4,
        "password": "P@ssw0rd",
        "email": "email@email.com"
    }
    """
    Then the response status code should be 422
    And the response should contain "name"
    
    Scenario: No string password 
    Given I send a PUT request to "/users" with body:
    """
    {
        "name": "Mydherin",
        "password": 3,
        "email": "email@email.com"
    }
    """
    Then the response status code should be 422
    And the response should contain "password"
    
    Scenario: No string email
    Given I send a PUT request to "/users" with body:
    """
    {
        "name": "Mydherin",
        "password": "P@ssw0rd",
        "email": 3
    }
    """
    Then the response status code should be 422
    And the response should contain "email"
    
    Scenario: Invalid name
    Given I send a PUT request to "/users" with body:
    """
    {
        "name": "@Mydherin",
        "password": "P@ssw0rd",
        "email": "email@email.com"
    }
    """
    Then the response status code should be 422
    And the response should contain "name"
    
    Scenario: Invalid password
    Given I send a PUT request to "/users" with body:
    """
    {
        "name": "Mydherin",
        "password": "1234",
        "email": "email@email.com"
    }
    """
    Then the response status code should be 422
    And the response should contain "password"
    
    Scenario: Invalid email
    Given I send a PUT request to "/users" with body:
    """
    {
        "name": "Mydherin",
        "password": "P@ssw0rd",
        "email": "emailemail.com"
    }
    """
    Then the response status code should be 422
    And the response should contain "email"