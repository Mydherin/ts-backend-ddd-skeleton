Feature: Create a new user
    In order to have users in the platform
    I want to create a new user

    Scenario: A valid user
    Given I send a PUT request to "/users" with body:
    """
    {
        "id": "0766c602-d4d4-48b6-9d50-d3253123275e",
        "name": "Mydherin",
        "password": "P@ssw0rd",
        "email": "email@email.com"
    }
    """
    Then the response status code should be 201
    And the response should be empty
    
    Scenario: No id
    Given I send a PUT request to "/users" with body:
    """
    {
        "name": "Mydherin",
        "password": "P@ssw0rd",
        "email": "email@email.com"
    }
    """
    Then the response status code should be 422
    And the response should contain "id"
    
    Scenario: No name
    Given I send a PUT request to "/users" with body:
    """
    {
        "id": "0766c602-d4d4-48b6-9d50-d3253123275e",
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
        "id": "0766c602-d4d4-48b6-9d50-d3253123275e",
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
        "id": "0766c602-d4d4-48b6-9d50-d3253123275e",
        "name": "Mydherin",
        "password": "P@ssw0rd"
    }
    """
    Then the response status code should be 422
    And the response should contain "email"
    
    Scenario: No string id
    Given I send a PUT request to "/users" with body:
    """
    {
        "id": 3,
        "name": "Mydherin",
        "password": "P@ssw0rd",
        "email": "email@email.com"
    }
    """
    Then the response status code should be 422
    And the response should contain "id"
    
    Scenario: No string name
    Given I send a PUT request to "/users" with body:
    """
    {
        "id": "0766c602-d4d4-48b6-9d50-d3253123275e",
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
        "id": "0766c602-d4d4-48b6-9d50-d3253123275e",
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
        "id": "0766c602-d4d4-48b6-9d50-d3253123275e",
        "name": "Mydherin",
        "password": "P@ssw0rd",
        "email": 3
    }
    """
    Then the response status code should be 422
    And the response should contain "email"
    
    Scenario: Invalid id
    Given I send a PUT request to "/users" with body:
    """
    {
        "id": "07c602-d4d4-48b6-9d50-d3253123275e",
        "name": "Mydherin",
        "password": "P@ssw0rd",
        "email": "email@email.com"
    }
    """
    Then the response status code should be 422
    And the response should contain "id"
    
    Scenario: Invalid name
    Given I send a PUT request to "/users" with body:
    """
    {
        "id": "0766c602-d4d4-48b6-9d50-d3253123275e",
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
        "id": "0766c602-d4d4-48b6-9d50-d3253123275e",
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
        "id": "0766c602-d4d4-48b6-9d50-d3253123275e",
        "name": "Mydherin",
        "password": "P@ssw0rd",
        "email": "emailemail.com"
    }
    """
    Then the response status code should be 422
    And the response should contain "email"