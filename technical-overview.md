




### Agent (WIP)

For more complex tasks that require artificial intelligence within the Kivy ecosystem, we use an agent created with `LangChain` compatible with either the Gemini API or a locally hosted llama model (with vision). The agent is used for tool calling and structured output.

### Computer Vision Tasks (WIP)

For different types of food and ingredient classification, segmentation and more, Kivy trains AI models useful for detecting allergens or the position of different ingredients on the table.

## Our Opinion on the Project Idea

We believe that the core idea behind the Kivy project—bringing together AI, nutrition science, and interactive technology—is both exciting and meaningful. From the very beginning, our goal was to create more than just a nutrition app. We wanted to design a complete ecosystem that helps people adopt healthier habits through intuitive, intelligent tools that fit naturally into their everyday lives.

What motivated us most was the potential to make nutrition guidance more accessible and engaging—whether through smart hardware in the kitchen or personalized AI recommendations on mobile. We see Kivy as a way to bridge the gap between science and daily practice in a way that’s actually useful for real people.

## Usefulness for the Target Audience

The demand for this product comes from those who want to monitor and analyze what they consume, as well as from nutritionists who need precise data about their patients, and also from chefs and people who enjoy cooking, discovering, and learning new recipes and culinary techniques.



### Database Schema Documentation

This document describes the database schema used in the application. It includes all tables, enums, their fields, types, constraints, and relationships.

The backend uses a PostgreSQL database.

#### Enums

##### `difficulty_enum`

- `easy`
- `medium`
- `hard`

##### `gender_enum`

- `male`
- `female`

##### `diet_enum`

- `no_diet`
- `vegetarian`
- `vegan`
- `pescatarian`

#### Table: `users`

| Column     | Type    | Constraints         | Description              |
| ---------- | ------- | ------------------- | ------------------------ |
| id         | INTEGER | PK, auto-generated  | User ID                  |
| email      | TEXT    | NOT NULL, UNIQUE    | User email               |
| first_name | TEXT    | NOT NULL            | First name               |
| last_name  | TEXT    | NOT NULL            | Last name                |
| password   | TEXT    | NOT NULL            | Hashed password          |
| picture    | TEXT    |                     | Profile picture URL      |
| username   | TEXT    | NOT NULL, UNIQUE    | Unique username          |
| followers  | INTEGER | NOT NULL, DEFAULT 0 | Number of followers      |
| follows    | INTEGER | NOT NULL, DEFAULT 0 | Number of followed users |

---

#### Table: `recipes`

| Column            | Type     | Constraints                | Description               |
| ----------------- | -------- | -------------------------- | ------------------------- |
| id                | INTEGER  | PK, auto-generated         | Recipe ID                 |
| source            | TEXT     |                            | Original source           |
| original_id       | TEXT     |                            | Original external ID      |
| name              | TEXT     | NOT NULL                   | Recipe name               |
| created_at        | DATE     | NOT NULL, DEFAULT NOW()    | Creation timestamp        |
| preparation_time  | INTEGER  | NOT NULL                   | Time to prepare           |
| cooking_time      | INTEGER  | NOT NULL                   | Time to cook              |
| tags              | TEXT[]   | NOT NULL                   | Array of tags             |
| steps_count       | INTEGER  | NOT NULL                   | Number of steps           |
| steps             | TEXT[]   | NOT NULL                   | Step-by-step instructions |
| description       | TEXT     | NOT NULL                   | Recipe description        |
| ingredients_count | INTEGER  | NOT NULL                   | Number of ingredients     |
| ingredients       | JSONB[]  | NOT NULL                   | List of ingredients       |
| calories          | REAL     |                            | Caloric value             |
| total_fat         | REAL     |                            | Total fat                 |
| sugar             | REAL     |                            | Sugar content             |
| sodium            | REAL     |                            | Sodium content            |
| protein           | REAL     |                            | Protein content           |
| saturated_fat     | REAL     |                            | Saturated fat             |
| carbohydrates     | REAL     |                            | Carbohydrates             |
| cholesterol       | REAL     |                            | Cholesterol               |
| fiber             | REAL     |                            | Fiber                     |
| likes             | INTEGER  | NOT NULL, DEFAULT 0        | Like count                |
| author_name       | TEXT     |                            | Name of author            |
| author_id         | INTEGER  | FK → users.id              | Author user ID            |
| images            | TEXT[]   | NOT NULL                   | Image URLs                |
| difficulty        | ENUM     | NOT NULL (difficulty_enum) | Difficulty level          |
| servings          | INTEGER  |                            | Number of servings        |
| serving_size      | INTEGER  |                            | Serving size              |
| searchable        | TSVECTOR | DEFAULT TRUE               | Full-text search vector   |

**Indexes**

- `searchable_idx` on `searchable`

#### Table: `recipe_likes`

| Column    | Type    | Constraints                            | Description           |
| --------- | ------- | -------------------------------------- | --------------------- |
| recipe_id | INTEGER | PK, FK → recipes.id, ON DELETE CASCADE | Liked recipe ID       |
| user_id   | INTEGER | PK, FK → users.id                      | User who liked recipe |

#### Table: `preferences`

| Column         | Type    | Constraints            | Description        |
| -------------- | ------- | ---------------------- | ------------------ |
| id             | INTEGER | PK, FK → users.id      | User ID            |
| activity_level | REAL    | NOT NULL               | Activity level     |
| weight         | REAL    | NOT NULL               | User weight        |
| height         | REAL    | NOT NULL               | User height        |
| gender         | ENUM    | NOT NULL (gender_enum) | Gender             |
| age            | INTEGER | NOT NULL               | User age           |
| allergens      | TEXT[]  | NOT NULL               | Known allergens    |
| diet           | ENUM    | NOT NULL (diet_enum)   | Dietary preference |

#### Table: `posts`

| Column             | Type    | Constraints                                 | Description               |
| ------------------ | ------- | ------------------------------------------- | ------------------------- |
| id                 | INTEGER | PK, auto-generated                          | Post ID                   |
| source             | TEXT    |                                             | Source of post            |
| author_id          | INTEGER | FK → users.id                               | Author user ID            |
| rating             | INTEGER | NOT NULL                                    | User rating               |
| recipe_id          | INTEGER | NOT NULL, FK → recipes.id ON DELETE CASCADE | Linked recipe ID          |
| content            | TEXT    | NOT NULL                                    | Text content              |
| author_name        | TEXT    |                                             | Name of post author       |
| original_id        | TEXT    |                                             | Original external post ID |
| original_recipe_id | TEXT    |                                             | External recipe ID        |
| created_at         | DATE    | NOT NULL, DEFAULT NOW()                     | Creation date             |
| likes_count        | INTEGER | DEFAULT 0                                   | Number of likes           |

#### Table: `post_likes`

| Column  | Type    | Constraints                          | Description         |
| ------- | ------- | ------------------------------------ | ------------------- |
| post_id | INTEGER | PK, FK → posts.id, ON DELETE CASCADE | Liked post ID       |
| user_id | INTEGER | PK, FK → users.id                    | User who liked post |

#### Table: `followers`

| Column      | Type    | Constraints       | Description      |
| ----------- | ------- | ----------------- | ---------------- |
| follower_id | INTEGER | PK, FK → users.id | Follower user ID |
| followed_id | INTEGER | PK, FK → users.id | Followed user ID |

#### Table: `featured_recipes`

| Column    | Type    | Constraints                                 | Description        |
| --------- | ------- | ------------------------------------------- | ------------------ |
| id        | INTEGER | PK, auto-generated                          | Record ID          |
| recipe_id | INTEGER | NOT NULL, FK → recipes.id ON DELETE CASCADE | Featured recipe ID |

#### Table: `dietary-plans`

| Column     | Type    | Constraints        | Description           |
| ---------- | ------- | ------------------ | --------------------- |
| id         | INTEGER | PK, auto-generated | Plan ID               |
| start_date | DATE    | NOT NULL           | Plan start date       |
| target     | REAL    | NOT NULL           | Target weight/calorie |

#### Table: `dietary_logs`

| Column     | Type      | Constraints                               | Description     |
| ---------- | --------- | ----------------------------------------- | --------------- |
| id         | INTEGER   | PK, auto-generated                        | Log ID          |
| calories   | REAL      | NOT NULL                                  | Calories logged |
| details    | JSONB     | NOT NULL                                  | Log detail JSON |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW()                   | Time of logging |
| user_id    | INTEGER   | NOT NULL, FK → users.id ON DELETE CASCADE | Linked user ID  |

#### Table: `chats`

| Column     | Type      | Constraints             | Description     |
| ---------- | --------- | ----------------------- | --------------- |
| id         | INTEGER   | PK, auto-generated      | Chat ID         |
| name       | TEXT      | NOT NULL                | Chat name/title |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Creation time   |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Last update     |
| user_id    | INTEGER   | NOT NULL, FK → users.id | Creator user ID |

#### Table: `chat_messages`

| Column     | Type      | Constraints                               | Description             |
| ---------- | --------- | ----------------------------------------- | ----------------------- |
| id         | INTEGER   | PK, auto-generated                        | Message ID              |
| role       | TEXT      | NOT NULL                                  | Role (user/system/etc.) |
| parts      | JSONB[]   | NOT NULL                                  | Message content parts   |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW()                   | Message timestamp       |
| chat_id    | INTEGER   | NOT NULL, FK → chats.id ON DELETE CASCADE | Linked chat ID          |
| user_id    | INTEGER   | NOT NULL, FK → users.id                   | Sender user ID          |

#### Relationships Summary

- `recipes.author_id` → `users.id`
- `recipe_likes.user_id` → `users.id`
- `recipe_likes.recipe_id` → `recipes.id`
- `preferences.id` → `users.id`
- `posts.author_id` → `users.id`
- `posts.recipe_id` → `recipes.id`
- `post_likes.user_id` → `users.id`
- `post_likes.post_id` → `posts.id`
- `followers.follower_id` → `users.id`
- `followers.followed_id` → `users.id`
- `featured_recipes.recipe_id` → `recipes.id`
- `dietary_logs.user_id` → `users.id`
- `chats.user_id` → `users.id`
- `chat_messages.chat_id` → `chats.id`
- `chat_messages.user_id` → `users.id`



{
  "openapi": "3.0.0",
  "paths": {
    "/account": {
      "get": {
        "description": "Retrieves the account information of the currently authenticated user",
        "operationId": "AccountController_findOwn",
        "parameters": [],
        "responses": {
          "200": {
            "description": "Account details retrieved successfully",
            "content": {
              "application/json": {
                "schema": {
                  "example": {
                    "id": "123e4567-e89b-12d3-a456-426614174000",
                    "email": "john.doe@example.com",
                    "username": "john_doe",
                    "firstName": "John",
                    "lastName": "Doe",
                    "createdAt": "2025-07-28T12:00:00Z"
                  }
                }
              }
            }
          }
        },
        "summary": "Get current user account details",
        "tags": [
          "Account"
        ]
      },
      "patch": {
        "description": "Updates the account information of the currently authenticated user",
        "operationId": "AccountController_update",
        "parameters": [],
        "requestBody": {
          "required": true,
          "description": "Account update payload",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateAccountDto"
              },
              "examples": {
                "example1": {
                  "summary": "Basic update",
                  "value": {
                    "email": "new.email@example.com",
                    "username": "new_username",
                    "firstName": "Jane",
                    "lastName": "Smith"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Account updated successfully",
            "content": {
              "application/json": {
                "schema": {
                  "example": {
                    "id": "123e4567-e89b-12d3-a456-426614174000",
                    "email": "new.email@example.com",
                    "username": "new_username",
                    "firstName": "Jane",
                    "lastName": "Smith",
                    "updatedAt": "2025-07-28T12:00:00Z"
                  }
                }
              }
            }
          },
          "400": {
            "description": "Invalid input data"
          }
        },
        "summary": "Update current user account details",
        "tags": [
          "Account"
        ]
      }
    },
    "/auth/login": {
      "post": {
        "description": "Authenticates user credentials and returns a JWT token upon successful login. The token should be included in subsequent requests as a Bearer token in the Authorization header.",
        "operationId": "AuthController_organizationLogin",
        "parameters": [],
        "responses": {
          "200": {
            "description": "Login successful",
            "content": {
              "application/json": {
                "schema": {
                  "example": {
                    "id": "123e4567-e89b-12d3-a456-426614174000",
                    "email": "user@example.com",
                    "username": "john_doe",
                    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  }
                }
              }
            }
          },
          "401": {
            "description": "Invalid credentials"
          }
        },
        "summary": "User Authentication",
        "tags": [
          "Authentication"
        ]
      }
    },
    "/auth/register": {
      "post": {
        "description": "Creates a new user account after validating email and username uniqueness. The password must meet strong password requirements, and the username must follow specific constraints.",
        "operationId": "AuthController_register",
        "parameters": [],
        "requestBody": {
          "required": true,
          "description": "User registration details",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/RegisterDto"
              },
              "examples": {
                "example1": {
                  "summary": "Standard Registration",
                  "value": {
                    "email": "john.doe@example.com",
                    "username": "john_doe",
                    "firstName": "John",
                    "lastName": "Doe",
                    "password": "StrongP@ssw0rd!"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Registration successful",
            "content": {
              "application/json": {
                "schema": {
                  "example": {
                    "id": "123e4567-e89b-12d3-a456-426614174000",
                    "email": "john.doe@example.com",
                    "username": "john_doe",
                    "firstName": "John",
                    "lastName": "Doe"
                  }
                }
              }
            }
          },
          "400": {
            "description": "Invalid input or duplicate email/username"
          }
        },
        "summary": "User Registration",
        "tags": [
          "Authentication"
        ]
      }
    },
    "/dietary-plan/target": {
      "get": {
        "description": "Retrieves the user's daily caloric target and current progress",
        "operationId": "DietaryPlanController_getTarget",
        "parameters": [],
        "responses": {
          "200": {
            "description": "Target information retrieved successfully",
            "content": {
              "application/json": {
                "schema": {
                  "example": {
                    "dailyTarget": 2000,
                    "currentIntake": 1500,
                    "remaining": 500
                  }
                }
              }
            }
          }
        },
        "summary": "Get caloric target",
        "tags": [
          "Dietary Plan"
        ]
      }
    },
    "/dietary-plan/log": {
      "get": {
        "description": "Retrieves all caloric intake logs for the current user",
        "operationId": "DietaryPlanController_getLogs",
        "parameters": [],
        "responses": {
          "200": {
            "description": "Calorie logs retrieved successfully",
            "content": {
              "application/json": {
                "schema": {
                  "example": [
                    {
                      "id": 1,
                      "calories": 500,
                      "description": "Lunch",
                      "timestamp": "2025-07-28T12:00:00Z"
                    }
                  ]
                }
              }
            }
          }
        },
        "summary": "Get calorie logs",
        "tags": [
          "Dietary Plan"
        ]
      },
      "post": {
        "description": "Records a new caloric intake entry",
        "operationId": "DietaryPlanController_logCalories",
        "parameters": [],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/LogCaloriesDto"
              },
              "examples": {
                "example1": {
                  "value": {
                    "calories": 500,
                    "description": "Lunch"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Calories logged successfully",
            "content": {
              "application/json": {
                "schema": {
                  "example": {
                    "id": 1,
                    "calories": 500,
                    "description": "Lunch",
                    "timestamp": "2025-07-28T12:00:00Z"
                  }
                }
              }
            }
          }
        },
        "summary": "Log calories",
        "tags": [
          "Dietary Plan"
        ]
      }
    },
    "/dietary-plan/log/recipe/{id}": {
      "post": {
        "description": "Records caloric intake from a specific recipe",
        "operationId": "DietaryPlanController_logRecipe",
        "parameters": [
          {
            "name": "id",
            "required": true,
            "in": "path",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "201": {
            "description": "Recipe calories logged successfully",
            "content": {
              "application/json": {
                "schema": {
                  "example": {
                    "id": 1,
                    "recipeId": 123,
                    "calories": 750,
                    "timestamp": "2025-07-28T12:00:00Z"
                  }
                }
              }
            }
          }
        },
        "summary": "Log recipe calories",
        "tags": [
          "Dietary Plan"
        ]
      }
    },
    "/dietary-plan": {
      "post": {
        "description": "Creates a new dietary plan with specified caloric targets and preferences",
        "operationId": "DietaryPlanController_create",
        "parameters": [],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CreateDietaryPlanDto"
              },
              "examples": {
                "example1": {
                  "value": {
                    "dailyTarget": 2000,
                    "preferences": [
                      "low-carb",
                      "high-protein"
                    ]
                  }
                }
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Dietary plan created successfully"
          }
        },
        "summary": "Create dietary plan",
        "tags": [
          "Dietary Plan"
        ]
      },
      "get": {
        "description": "Retrieves all dietary plans for the current user",
        "operationId": "DietaryPlanController_findAll",
        "parameters": [],
        "responses": {
          "200": {
            "description": "List of dietary plans retrieved successfully"
          }
        },
        "summary": "Get all dietary plans",
        "tags": [
          "Dietary Plan"
        ]
      }
    },
    "/dietary-plan/{id}": {
      "get": {
        "description": "Retrieves a specific dietary plan by ID",
        "operationId": "DietaryPlanController_findOne",
        "parameters": [
          {
            "name": "id",
            "required": true,
            "in": "path",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Dietary plan retrieved successfully"
          },
          "404": {
            "description": "Dietary plan not found"
          }
        },
        "summary": "Get specific dietary plan",
        "tags": [
          "Dietary Plan"
        ]
      },
      "patch": {
        "description": "Updates an existing dietary plan",
        "operationId": "DietaryPlanController_update",
        "parameters": [
          {
            "name": "id",
            "required": true,
            "in": "path",
            "schema": {
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateDietaryPlanDto"
              },
              "examples": {
                "example1": {
                  "value": {
                    "dailyTarget": 2200,
                    "preferences": [
                      "vegetarian"
                    ]
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Dietary plan updated successfully"
          },
          "404": {
            "description": "Dietary plan not found"
          }
        },
        "summary": "Update dietary plan",
        "tags": [
          "Dietary Plan"
        ]
      },
      "delete": {
        "description": "Removes a dietary plan by ID",
        "operationId": "DietaryPlanController_remove",
        "parameters": [
          {
            "name": "id",
            "required": true,
            "in": "path",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Dietary plan deleted successfully"
          },
          "404": {
            "description": "Dietary plan not found"
          }
        },
        "summary": "Delete dietary plan",
        "tags": [
          "Dietary Plan"
        ]
      }
    },
    "/recipe": {
      "post": {
        "description": "Creates a new recipe with the provided details including ingredients, instructions, and nutritional information",
        "operationId": "RecipeController_create",
        "parameters": [],
        "requestBody": {
          "required": true,
          "description": "Recipe creation payload",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CreateRecipeDto"
              },
              "examples": {
                "example1": {
                  "summary": "Basic Recipe",
                  "value": {
                    "title": "Chocolate Chip Cookies",
                    "description": "Classic homemade cookies",
                    "ingredients": [
                      "flour",
                      "sugar",
                      "chocolate chips"
                    ],
                    "instructions": [
                      "Mix ingredients",
                      "Bake at 350°F"
                    ],
                    "preparationTime": 30,
                    "servings": 12
                  }
                }
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Recipe created successfully"
          }
        },
        "summary": "Create a new recipe",
        "tags": [
          "Recipes"
        ]
      },
      "get": {
        "description": "Retrieves a list of all available recipes",
        "operationId": "RecipeController_findMany",
        "parameters": [],
        "responses": {
          "200": {
            "description": "List of recipes retrieved successfully"
          }
        },
        "summary": "Get all recipes",
        "tags": [
          "Recipes"
        ]
      }
    },
    "/recipe/search": {
      "post": {
        "description": "Search recipes using various criteria with cursor-based pagination",
        "operationId": "RecipeController_search",
        "parameters": [
          {
            "name": "cursor",
            "required": false,
            "in": "query",
            "description": "Pagination cursor",
            "schema": {
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SearchRecipeDto"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Search results retrieved successfully"
          }
        },
        "summary": "Search recipes",
        "tags": [
          "Recipes"
        ]
      }
    },
    "/recipe/recommend": {
      "get": {
        "description": "Retrieves personalized recipe recommendations based on user preferences and history",
        "operationId": "RecipeController_recommend",
        "parameters": [],
        "responses": {
          "200": {
            "description": "Recommended recipes retrieved successfully"
          }
        },
        "summary": "Get recommended recipes",
        "tags": [
          "Recipes"
        ]
      }
    },
    "/recipe/liked": {
      "get": {
        "description": "Retrieves all recipes liked by the current user with pagination",
        "operationId": "RecipeController_getLikedRecipes",
        "parameters": [
          {
            "name": "cursor",
            "required": false,
            "in": "query",
            "description": "Pagination cursor",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Liked recipes retrieved successfully"
          }
        },
        "summary": "Get liked recipes",
        "tags": [
          "Recipes"
        ]
      }
    },
    "/recipe/featured": {
      "get": {
        "description": "Retrieves a curated list of featured recipes",
        "operationId": "RecipeController_getFeaturedRecipes",
        "parameters": [],
        "responses": {
          "200": {
            "description": "Featured recipes retrieved successfully"
          }
        },
        "summary": "Get featured recipes",
        "tags": [
          "Recipes"
        ]
      }
    },
    "/recipe/{id}": {
      "get": {
        "description": "Retrieves detailed information about a specific recipe",
        "operationId": "RecipeController_findOne",
        "parameters": [
          {
            "name": "id",
            "required": true,
            "in": "path",
            "description": "Recipe ID",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Recipe retrieved successfully"
          },
          "404": {
            "description": "Recipe not found"
          }
        },
        "summary": "Get recipe by ID",
        "tags": [
          "Recipes"
        ]
      },
      "patch": {
        "description": "Updates an existing recipe with new information",
        "operationId": "RecipeController_update",
        "parameters": [
          {
            "name": "id",
            "required": true,
            "in": "path",
            "description": "Recipe ID",
            "schema": {
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateRecipeDto"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Recipe updated successfully"
          },
          "404": {
            "description": "Recipe not found"
          }
        },
        "summary": "Update recipe",
        "tags": [
          "Recipes"
        ]
      },
      "delete": {
        "description": "Removes a recipe from the system",
        "operationId": "RecipeController_remove",
        "parameters": [
          {
            "name": "id",
            "required": true,
            "in": "path",
            "description": "Recipe ID",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Recipe deleted successfully"
          },
          "404": {
            "description": "Recipe not found"
          }
        },
        "summary": "Delete recipe",
        "tags": [
          "Recipes"
        ]
      }
    },
    "/post": {
      "post": {
        "description": "Creates a new post with the provided content and associates it with a recipe",
        "operationId": "PostController_create",
        "parameters": [],
        "requestBody": {
          "required": true,
          "description": "Post creation payload",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CreatePostDto"
              },
              "examples": {
                "example1": {
                  "summary": "Basic post",
                  "value": {
                    "content": "This recipe was amazing! Will definitely make it again.",
                    "rating": 5,
                    "recipeId": 123
                  }
                }
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Post created successfully",
            "content": {
              "application/json": {
                "schema": {
                  "example": {
                    "id": 1,
                    "content": "This recipe was amazing! Will definitely make it again.",
                    "rating": 5,
                    "recipeId": 123,
                    "createdAt": "2025-07-28T12:00:00Z"
                  }
                }
              }
            }
          },
          "400": {
            "description": "Invalid input data"
          }
        },
        "summary": "Create a new post",
        "tags": [
          "Posts"
        ]
      },
      "get": {
        "description": "Retrieves a paginated list of posts using cursor-based pagination",
        "operationId": "PostController_findMany",
        "parameters": [],
        "responses": {
          "200": {
            "description": "Posts retrieved successfully",
            "content": {
              "application/json": {
                "schema": {
                  "example": {
                    "items": [
                      {
                        "id": 1,
                        "content": "This recipe was amazing!",
                        "rating": 5,
                        "recipeId": 123,
                        "createdAt": "2025-07-28T12:00:00Z"
                      }
                    ],
                    "nextCursor": "2"
                  }
                }
              }
            }
          }
        },
        "summary": "Get multiple posts",
        "tags": [
          "Posts"
        ]
      }
    },
    "/post/{id}": {
      "patch": {
        "description": "Updates an existing post with the provided content",
        "operationId": "PostController_update",
        "parameters": [
          {
            "name": "id",
            "required": true,
            "in": "path",
            "schema": {
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "description": "Post update payload",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdatePostDto"
              },
              "examples": {
                "example1": {
                  "summary": "Update post content",
                  "value": {
                    "content": "Updated: This recipe was good but needed more seasoning.",
                    "rating": 4
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Post updated successfully",
            "content": {
              "application/json": {
                "schema": {
                  "example": {
                    "id": 1,
                    "content": "Updated: This recipe was good but needed more seasoning.",
                    "rating": 4,
                    "updatedAt": "2025-07-28T12:00:00Z"
                  }
                }
              }
            }
          },
          "404": {
            "description": "Post not found"
          }
        },
        "summary": "Update a post",
        "tags": [
          "Posts"
        ]
      },
      "delete": {
        "description": "Removes a post by its ID",
        "operationId": "PostController_remove",
        "parameters": [
          {
            "name": "id",
            "required": true,
            "in": "path",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Post deleted successfully"
          },
          "404": {
            "description": "Post not found"
          }
        },
        "summary": "Delete a post",
        "tags": [
          "Posts"
        ]
      }
    },
    "/recipe/{id}/like": {
      "post": {
        "description": "Adds the current user to the list of users who liked the specified recipe",
        "operationId": "RecipeLikeController_like",
        "parameters": [
          {
            "name": "id",
            "required": true,
            "in": "path",
            "description": "Recipe ID",
            "schema": {
              "example": "123",
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Recipe liked successfully",
            "content": {
              "application/json": {
                "schema": {
                  "example": {
                    "recipeId": 123,
                    "liked": true,
                    "likesCount": 42
                  }
                }
              }
            }
          },
          "404": {
            "description": "Recipe not found"
          }
        },
        "summary": "Like a recipe",
        "tags": [
          "Recipe Likes"
        ]
      },
      "delete": {
        "description": "Removes the current user from the list of users who liked the specified recipe",
        "operationId": "RecipeLikeController_unlike",
        "parameters": [
          {
            "name": "id",
            "required": true,
            "in": "path",
            "description": "Recipe ID",
            "schema": {
              "example": "123",
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Recipe unliked successfully",
            "content": {
              "application/json": {
                "schema": {
                  "example": {
                    "recipeId": 123,
                    "liked": false,
                    "likesCount": 41
                  }
                }
              }
            }
          },
          "404": {
            "description": "Recipe not found"
          }
        },
        "summary": "Unlike a recipe",
        "tags": [
          "Recipe Likes"
        ]
      }
    },
    "/post/{id}/like": {
      "post": {
        "description": "Adds a like to the specified post for the currently authenticated user. If the user has already liked the post, the request will be ignored.",
        "operationId": "PostLikeController_like",
        "parameters": [
          {
            "name": "id",
            "required": true,
            "in": "path",
            "description": "The ID of the post to like",
            "schema": {
              "example": "123",
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Post liked successfully",
            "content": {
              "application/json": {
                "schema": {
                  "example": {
                    "success": true,
                    "message": "Post liked successfully",
                    "postId": "123",
                    "likesCount": 42
                  }
                }
              }
            }
          },
          "404": {
            "description": "Post not found"
          }
        },
        "summary": "Like a post",
        "tags": [
          "Post Likes"
        ]
      },
      "delete": {
        "description": "Removes the like from the specified post for the currently authenticated user. If the user has not liked the post, the request will be ignored.",
        "operationId": "PostLikeController_unlike",
        "parameters": [
          {
            "name": "id",
            "required": true,
            "in": "path",
            "description": "The ID of the post to unlike",
            "schema": {
              "example": "123",
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Post unliked successfully",
            "content": {
              "application/json": {
                "schema": {
                  "example": {
                    "success": true,
                    "message": "Post unliked successfully",
                    "postId": "123",
                    "likesCount": 41
                  }
                }
              }
            }
          },
          "404": {
            "description": "Post not found"
          }
        },
        "summary": "Unlike a post",
        "tags": [
          "Post Likes"
        ]
      }
    },
    "/preferences": {
      "get": {
        "description": "Retrieves the dietary restrictions, nutrition goals, and allergen information for the currently authenticated user",
        "operationId": "PreferencesController_findOne",
        "parameters": [],
        "responses": {
          "200": {
            "description": "User preferences retrieved successfully",
            "content": {
              "application/json": {
                "schema": {
                  "example": {
                    "id": "123e4567-e89b-12d3-a456-426614174000",
                    "dietary": {
                      "restrictions": [
                        "vegetarian"
                      ],
                      "allergens": [
                        "peanuts",
                        "shellfish"
                      ],
                      "intolerances": [
                        "lactose"
                      ]
                    },
                    "nutrition": {
                      "dailyCalories": 2000,
                      "macros": {
                        "protein": 30,
                        "carbs": 50,
                        "fats": 20
                      }
                    },
                    "measurements": {
                      "system": "metric",
                      "weight": "kg",
                      "height": "cm"
                    },
                    "updatedAt": "2025-07-28T12:00:00Z"
                  }
                }
              }
            }
          }
        },
        "summary": "Get user preferences",
        "tags": [
          "Preferences"
        ]
      },
      "patch": {
        "description": "Updates the dietary restrictions, nutrition goals, and allergen information for the currently authenticated user",
        "operationId": "PreferencesController_update",
        "parameters": [],
        "requestBody": {
          "required": true,
          "description": "User preferences update payload",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdatePreferenceDto"
              },
              "examples": {
                "example1": {
                  "summary": "Update dietary and nutrition preferences",
                  "value": {
                    "dietary": {
                      "restrictions": [
                        "vegan"
                      ],
                      "allergens": [
                        "tree-nuts",
                        "soy"
                      ],
                      "intolerances": [
                        "gluten"
                      ]
                    },
                    "nutrition": {
                      "dailyCalories": 1800,
                      "macros": {
                        "protein": 25,
                        "carbs": 55,
                        "fats": 20
                      }
                    },
                    "measurements": {
                      "system": "imperial",
                      "weight": "lb",
                      "height": "in"
                    }
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Preferences updated successfully",
            "content": {
              "application/json": {
                "schema": {
                  "example": {
                    "id": "123e4567-e89b-12d3-a456-426614174000",
                    "dietary": {
                      "restrictions": [
                        "vegan"
                      ],
                      "allergens": [
                        "tree-nuts",
                        "soy"
                      ],
                      "intolerances": [
                        "gluten"
                      ]
                    },
                    "nutrition": {
                      "dailyCalories": 1800,
                      "macros": {
                        "protein": 25,
                        "carbs": 55,
                        "fats": 20
                      }
                    },
                    "measurements": {
                      "system": "imperial",
                      "weight": "lb",
                      "height": "in"
                    },
                    "updatedAt": "2025-07-28T12:00:00Z"
                  }
                }
              }
            }
          },
          "400": {
            "description": "Invalid input data"
          }
        },
        "summary": "Update user preferences",
        "tags": [
          "Preferences"
        ]
      }
    },
    "/user/{id}": {
      "get": {
        "description": "Retrieves detailed user information based on the provided user ID. This endpoint returns user details including profile information and account status.",
        "operationId": "UserController_findOne",
        "parameters": [
          {
            "name": "id",
            "required": true,
            "in": "path",
            "description": "Unique identifier of the user",
            "schema": {
              "example": "123",
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "User found successfully",
            "content": {
              "application/json": {
                "schema": {
                  "example": {
                    "id": 123,
                    "username": "john_doe",
                    "firstName": "John",
                    "lastName": "Doe",
                    "email": "john.doe@example.com",
                    "createdAt": "2025-07-28T12:00:00Z"
                  }
                }
              }
            }
          },
          "404": {
            "description": "User not found"
          }
        },
        "summary": "Get user by ID",
        "tags": [
          "User"
        ]
      }
    },
    "/user/{id}/follow": {
      "post": {
        "description": "Creates a following relationship between the authenticated user and the target user",
        "operationId": "FollowController_follow",
        "parameters": [
          {
            "name": "id",
            "required": true,
            "in": "path",
            "description": "ID of the user to follow",
            "schema": {
              "example": "123e4567-e89b-12d3-a456-426614174000",
              "type": "string"
            }
          }
        ],
        "responses": {
          "201": {
            "description": "Successfully followed the user",
            "content": {
              "application/json": {
                "schema": {
                  "example": {
                    "followerId": "123e4567-e89b-12d3-a456-426614174000",
                    "followingId": "987fcdeb-a432-56gh-i789-012345678901",
                    "createdAt": "2025-07-28T12:00:00Z"
                  }
                }
              }
            }
          },
          "400": {
            "description": "Invalid user ID"
          },
          "404": {
            "description": "User not found"
          }
        },
        "summary": "Follow a user",
        "tags": [
          "User Following"
        ]
      },
      "delete": {
        "description": "Removes the following relationship between the authenticated user and the target user",
        "operationId": "FollowController_unfollow",
        "parameters": [
          {
            "name": "id",
            "required": true,
            "in": "path",
            "description": "ID of the user to unfollow",
            "schema": {
              "example": "123e4567-e89b-12d3-a456-426614174000",
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successfully unfollowed the user"
          },
          "400": {
            "description": "Invalid user ID"
          },
          "404": {
            "description": "User not found"
          }
        },
        "summary": "Unfollow a user",
        "tags": [
          "User Following"
        ]
      }
    },
    "/intelligence/scan-to-create": {
      "post": {
        "description": "Analyzes a food image and generates a complete recipe including ingredients, instructions, and nutritional information",
        "operationId": "IntelligenceController_scanToCreateRecipe",
        "parameters": [],
        "requestBody": {
          "required": true,
          "description": "Image data for recipe generation",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ScanToCreateDto"
              },
              "examples": {
                "example1": {
                  "summary": "Image scan request",
                  "value": {
                    "image": "base64_encoded_image_data",
                    "preferences": [
                      "vegetarian",
                      "low-carb"
                    ]
                  }
                }
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Recipe generated successfully",
            "content": {
              "application/json": {
                "schema": {
                  "example": {
                    "id": 123,
                    "name": "Grilled Vegetable Salad",
                    "ingredients": [
                      "zucchini",
                      "bell peppers",
                      "olive oil"
                    ],
                    "instructions": [
                      "Slice vegetables",
                      "Grill until tender"
                    ],
                    "nutritionalInfo": {
                      "calories": 250,
                      "protein": 5,
                      "carbs": 15
                    }
                  }
                }
              }
            }
          }
        },
        "summary": "Generate recipe from food image",
        "tags": [
          "Intelligence"
        ]
      }
    },
    "/intelligence/scan-to-log": {
      "post": {
        "description": "Analyzes a food image to estimate nutritional content and logs it as a meal",
        "operationId": "IntelligenceController_scanToLogMeal",
        "parameters": [],
        "requestBody": {
          "required": true,
          "description": "Image data for meal logging",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ScanToLogDto"
              },
              "examples": {
                "example1": {
                  "summary": "Meal scan request",
                  "value": {
                    "image": "base64_encoded_image_data",
                    "mealType": "lunch"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Meal logged successfully",
            "content": {
              "application/json": {
                "schema": {
                  "example": {
                    "id": 456,
                    "mealType": "lunch",
                    "calories": 650,
                    "nutrients": {
                      "protein": 25,
                      "carbs": 65,
                      "fat": 22
                    },
                    "timestamp": "2025-07-28T12:00:00Z"
                  }
                }
              }
            }
          }
        },
        "summary": "Log meal from food image",
        "tags": [
          "Intelligence"
        ]
      }
    },
    "/intelligence/modify-recipe/{id}": {
      "post": {
        "description": "Modifies an existing recipe based on dietary preferences, restrictions, or portion size",
        "operationId": "IntelligenceController_modifyRecipe",
        "parameters": [
          {
            "name": "id",
            "required": true,
            "in": "path",
            "schema": {
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "description": "Recipe modification parameters",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ModifyRecipeDto"
              },
              "examples": {
                "example1": {
                  "summary": "Recipe modification request",
                  "value": {
                    "modifications": [
                      "gluten-free",
                      "dairy-free"
                    ],
                    "servings": 4
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Recipe modified successfully",
            "content": {
              "application/json": {
                "schema": {
                  "example": {
                    "id": 789,
                    "originalId": 123,
                    "modifications": [
                      "gluten-free",
                      "dairy-free"
                    ],
                    "ingredients": [
                      "gluten-free flour",
                      "almond milk"
                    ],
                    "instructions": [
                      "Mix dry ingredients",
                      "Add wet ingredients"
                    ],
                    "nutritionalInfo": {
                      "calories": 300,
                      "protein": 8,
                      "carbs": 45
                    }
                  }
                }
              }
            }
          },
          "404": {
            "description": "Recipe not found"
          }
        },
        "summary": "Modify existing recipe",
        "tags": [
          "Intelligence"
        ]
      }
    },
    "/intelligence/chat": {
      "post": {
        "operationId": "ChatController_create",
        "parameters": [],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/MessageDto"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": ""
          }
        },
        "tags": [
          "Chat"
        ]
      },
      "get": {
        "operationId": "ChatController_findMany",
        "parameters": [],
        "responses": {
          "200": {
            "description": ""
          }
        },
        "tags": [
          "Chat"
        ]
      }
    },
    "/intelligence/chat/{id}": {
      "post": {
        "operationId": "ChatController_sendMessage",
        "parameters": [
          {
            "name": "id",
            "required": true,
            "in": "path",
            "schema": {
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/MessageDto"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": ""
          }
        },
        "tags": [
          "Chat"
        ]
      },
      "get": {
        "operationId": "ChatController_findOne",
        "parameters": [
          {
            "name": "id",
            "required": true,
            "in": "path",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": ""
          }
        },
        "tags": [
          "Chat"
        ]
      },
      "delete": {
        "operationId": "ChatController_remove",
        "parameters": [
          {
            "name": "id",
            "required": true,
            "in": "path",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": ""
          }
        },
        "tags": [
          "Chat"
        ]
      }
    },
    "/intelligence/chat/regenerate/{id}": {
      "patch": {
        "operationId": "ChatController_regenerateResponse",
        "parameters": [
          {
            "name": "id",
            "required": true,
            "in": "path",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": ""
          }
        },
        "tags": [
          "Chat"
        ]
      }
    },
    "/intelligence/chat/edit/{id}": {
      "patch": {
        "operationId": "ChatController_editMessage",
        "parameters": [
          {
            "name": "id",
            "required": true,
            "in": "path",
            "schema": {
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/MessageDto"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": ""
          }
        },
        "tags": [
          "Chat"
        ]
      }
    },
    "/intelligence/chat/rename/{id}": {
      "patch": {
        "operationId": "ChatController_renameChat",
        "parameters": [
          {
            "name": "id",
            "required": true,
            "in": "path",
            "schema": {
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/RenameChatDto"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": ""
          }
        },
        "tags": [
          "Chat"
        ]
      }
    }
  },
  "info": {
    "title": "NutriBack API",
    "description": "The API endpoints and descriptions of the NutriBack API",
    "version": "1.0",
    "contact": {}
  },
  "tags": [],
  "servers": [],
  "components": {
    "schemas": {
      "UpdateAccountDto": {
        "type": "object",
        "properties": {
          "email": {
            "type": "string",
            "description": "Email address of the user",
            "example": "user@example.com"
          },
          "username": {
            "type": "string",
            "description": "Unique username for the user, must follow specific constraints",
            "example": "john_doe",
            "minLength": 3,
            "maxLength": 40
          },
          "firstName": {
            "type": "string",
            "description": "First name of the user",
            "example": "John",
            "minLength": 1,
            "maxLength": 40
          },
          "lastName": {
            "type": "string",
            "description": "Last name of the user",
            "example": "Doe",
            "minLength": 1,
            "maxLength": 40
          }
        },
        "required": [
          "email",
          "username",
          "firstName",
          "lastName"
        ]
      },
      "RegisterDto": {
        "type": "object",
        "properties": {
          "email": {
            "type": "string",
            "description": "Email address of the user",
            "example": "user@example.com"
          },
          "username": {
            "type": "string",
            "description": "Unique username for the user, must follow specific constraints",
            "example": "john_doe",
            "minLength": 3,
            "maxLength": 40
          },
          "firstName": {
            "type": "string",
            "description": "First name of the user",
            "example": "John",
            "minLength": 1,
            "maxLength": 40
          },
          "lastName": {
            "type": "string",
            "description": "Last name of the user",
            "example": "Doe",
            "minLength": 1,
            "maxLength": 40
          },
          "password": {
            "type": "string",
            "description": "Password for the user account. Must meet strong password requirements.",
            "example": "StrongP@ssw0rd!",
            "minLength": 8,
            "maxLength": 40
          }
        },
        "required": [
          "email",
          "username",
          "firstName",
          "lastName",
          "password"
        ]
      },
      "LogCaloriesDto": {
        "type": "object",
        "properties": {}
      },
      "CreateDietaryPlanDto": {
        "type": "object",
        "properties": {}
      },
      "UpdateDietaryPlanDto": {
        "type": "object",
        "properties": {}
      },
      "IngredientDto": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "description": "Name of the ingredient",
            "example": "Flour"
          },
          "unit": {
            "type": "string",
            "description": "Unit of measurement",
            "example": "grams"
          },
          "quantity": {
            "type": "string",
            "description": "Quantity of the ingredient",
            "example": "500"
          }
        },
        "required": [
          "name",
          "unit",
          "quantity"
        ]
      },
      "CreateRecipeDto": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "description": "Name of the recipe",
            "example": "Chocolate Cake"
          },
          "tags": {
            "description": "Tags associated with the recipe",
            "example": [
              "dessert",
              "chocolate"
            ],
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "steps": {
            "description": "Steps to prepare the recipe",
            "example": [
              "Mix ingredients",
              "Bake at 180°C for 30 minutes"
            ],
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "description": {
            "type": "string",
            "description": "Description of the recipe",
            "example": "A rich and moist chocolate cake perfect for dessert.",
            "minLength": 3,
            "maxLength": 2000
          },
          "ingredients": {
            "description": "List of ingredients required for the recipe",
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/IngredientDto"
            }
          },
          "preparationTime": {
            "type": "number",
            "description": "Preparation time in minutes",
            "example": 20
          },
          "cookingTime": {
            "type": "number",
            "description": "Cooking time in minutes",
            "example": 30
          },
          "servings": {
            "type": "number",
            "description": "Number of servings",
            "example": 4
          },
          "calories": {
            "type": "number",
            "description": "Calories per serving",
            "example": 500
          },
          "totalFat": {
            "type": "number",
            "description": "Total fat content per serving in grams",
            "example": 20
          },
          "sugar": {
            "type": "number",
            "description": "Sugar content per serving in grams",
            "example": 10
          },
          "sodium": {
            "type": "number",
            "description": "Sodium content per serving in milligrams",
            "example": 150
          },
          "protein": {
            "type": "number",
            "description": "Protein content per serving in grams",
            "example": 5
          },
          "saturatedFat": {
            "type": "number",
            "description": "Saturated fat content per serving in grams",
            "example": 8
          },
          "carbohydrates": {
            "type": "number",
            "description": "Carbohydrates content per serving in grams",
            "example": 70
          },
          "fiber": {
            "type": "number",
            "description": "Fiber content per serving in grams",
            "example": 5
          },
          "cholesterol": {
            "type": "number",
            "description": "Cholesterol content per serving in milligrams",
            "example": 40
          },
          "difficulty": {
            "type": "string",
            "description": "Difficulty level of the recipe",
            "example": "medium",
            "enum": [
              "easy",
              "medium",
              "hard"
            ]
          }
        },
        "required": [
          "name",
          "tags",
          "steps",
          "description",
          "ingredients",
          "preparationTime",
          "cookingTime",
          "servings",
          "calories",
          "totalFat",
          "sugar",
          "sodium",
          "protein",
          "saturatedFat",
          "carbohydrates",
          "fiber",
          "cholesterol",
          "difficulty"
        ]
      },
      "SearchRecipeDto": {
        "type": "object",
        "properties": {
          "minCalories": {
            "type": "number",
            "description": "Minimum calories",
            "example": 100
          },
          "maxCalories": {
            "type": "number",
            "description": "Maximum calories",
            "example": 2000
          },
          "minTotalFat": {
            "type": "number",
            "description": "Minimum total fat",
            "example": 10
          },
          "maxTotalFat": {
            "type": "number",
            "description": "Maximum total fat",
            "example": 100
          },
          "minSugar": {
            "type": "number",
            "description": "Minimum sugar",
            "example": 5
          },
          "maxSugar": {
            "type": "number",
            "description": "Maximum sugar",
            "example": 50
          },
          "minSodium": {
            "type": "number",
            "description": "Minimum sodium",
            "example": 500
          },
          "maxSodium": {
            "type": "number",
            "description": "Maximum sodium",
            "example": 2000
          },
          "minProtein": {
            "type": "number",
            "description": "Minimum protein",
            "example": 20
          },
          "maxProtein": {
            "type": "number",
            "description": "Maximum protein",
            "example": 150
          },
          "minSaturatedFat": {
            "type": "number",
            "description": "Minimum saturated fat",
            "example": 2
          },
          "maxSaturatedFat": {
            "type": "number",
            "description": "Maximum saturated fat",
            "example": 20
          },
          "minCarbohydrates": {
            "type": "number",
            "description": "Minimum carbohydrates",
            "example": 50
          },
          "maxCarbohydrates": {
            "type": "number",
            "description": "Maximum carbohydrates",
            "example": 300
          },
          "minFiber": {
            "type": "number",
            "description": "Minimum fiber",
            "example": 5
          },
          "maxFiber": {
            "type": "number",
            "description": "Maximum fiber",
            "example": 50
          },
          "minCholesterol": {
            "type": "number",
            "description": "Minimum cholesterol",
            "example": 50
          },
          "maxCholesterol": {
            "type": "number",
            "description": "Maximum cholesterol",
            "example": 300
          },
          "minSteps": {
            "type": "number",
            "description": "Minimum number of steps",
            "example": 3
          },
          "maxSteps": {
            "type": "number",
            "description": "Maximum number of steps",
            "example": 10
          },
          "minPreparationTime": {
            "type": "number",
            "description": "Minimum preparation time in minutes",
            "example": 10
          },
          "maxPreparationTime": {
            "type": "number",
            "description": "Maximum preparation time in minutes",
            "example": 120
          },
          "minCookingTime": {
            "type": "number",
            "description": "Minimum cooking time in minutes",
            "example": 20
          },
          "maxCookingTime": {
            "type": "number",
            "description": "Maximum cooking time in minutes",
            "example": 180
          },
          "minDate": {
            "type": "string",
            "description": "Earliest date for the recipe",
            "example": "2025-01-01"
          },
          "maxDate": {
            "type": "string",
            "description": "Latest date for the recipe",
            "example": "2025-12-31"
          },
          "tags": {
            "description": "List of tags",
            "example": [
              "vegetarian",
              "gluten-free"
            ],
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "difficulty": {
            "description": "List of difficulties",
            "example": [
              "easy",
              "medium"
            ],
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "offset": {
            "type": "number",
            "description": "Pagination offset",
            "example": 0
          },
          "search": {
            "type": "string",
            "description": "Search term",
            "example": "chocolate cake"
          }
        }
      },
      "UpdateRecipeDto": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "description": "Name of the recipe",
            "example": "Chocolate Cake"
          },
          "tags": {
            "description": "Tags associated with the recipe",
            "example": [
              "dessert",
              "chocolate"
            ],
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "steps": {
            "description": "Steps to prepare the recipe",
            "example": [
              "Mix ingredients",
              "Bake at 180°C for 30 minutes"
            ],
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "description": {
            "type": "string",
            "description": "Description of the recipe",
            "example": "A rich and moist chocolate cake perfect for dessert.",
            "minLength": 3,
            "maxLength": 2000
          },
          "ingredients": {
            "description": "List of ingredients required for the recipe",
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/IngredientDto"
            }
          },
          "preparationTime": {
            "type": "number",
            "description": "Preparation time in minutes",
            "example": 20
          },
          "cookingTime": {
            "type": "number",
            "description": "Cooking time in minutes",
            "example": 30
          },
          "servings": {
            "type": "number",
            "description": "Number of servings",
            "example": 4
          },
          "calories": {
            "type": "number",
            "description": "Calories per serving",
            "example": 500
          },
          "totalFat": {
            "type": "number",
            "description": "Total fat content per serving in grams",
            "example": 20
          },
          "sugar": {
            "type": "number",
            "description": "Sugar content per serving in grams",
            "example": 10
          },
          "sodium": {
            "type": "number",
            "description": "Sodium content per serving in milligrams",
            "example": 150
          },
          "protein": {
            "type": "number",
            "description": "Protein content per serving in grams",
            "example": 5
          },
          "saturatedFat": {
            "type": "number",
            "description": "Saturated fat content per serving in grams",
            "example": 8
          },
          "carbohydrates": {
            "type": "number",
            "description": "Carbohydrates content per serving in grams",
            "example": 70
          },
          "fiber": {
            "type": "number",
            "description": "Fiber content per serving in grams",
            "example": 5
          },
          "cholesterol": {
            "type": "number",
            "description": "Cholesterol content per serving in milligrams",
            "example": 40
          },
          "difficulty": {
            "type": "string",
            "description": "Difficulty level of the recipe",
            "example": "medium",
            "enum": [
              "easy",
              "medium",
              "hard"
            ]
          }
        }
      },
      "CreatePostDto": {
        "type": "object",
        "properties": {
          "rating": {
            "type": "number",
            "description": "Rating given to the recipe, between 1 and 5",
            "example": 4,
            "minimum": 1,
            "maximum": 5
          },
          "recipeID": {
            "type": "number",
            "description": "ID of the recipe being rated",
            "example": 123
          },
          "content": {
            "type": "string",
            "description": "Content of the post / review",
            "example": "This recipe was amazing! I loved the flavors and the simplicity of preparation.",
            "minLength": 1,
            "maxLength": 2000
          }
        },
        "required": [
          "rating",
          "recipeID",
          "content"
        ]
      },
      "UpdatePostDto": {
        "type": "object",
        "properties": {
          "rating": {
            "type": "number",
            "description": "Rating given to the recipe, between 1 and 5",
            "example": 4,
            "minimum": 1,
            "maximum": 5
          },
          "content": {
            "type": "string",
            "description": "Content of the post / review",
            "example": "This recipe was amazing! I loved the flavors and the simplicity of preparation.",
            "minLength": 1,
            "maxLength": 2000
          }
        },
        "required": [
          "rating",
          "content"
        ]
      },
      "UpdatePreferenceDto": {
        "type": "object",
        "properties": {
          "activityLevel": {
            "type": "number",
            "description": "Activity level (numerical value)",
            "example": 3
          },
          "gender": {
            "type": "string",
            "description": "Gender of the user",
            "example": "male",
            "enum": [
              "male",
              "female"
            ]
          },
          "age": {
            "type": "number",
            "description": "Age of the user",
            "example": 25,
            "minimum": 0,
            "maximum": 140
          },
          "weight": {
            "type": "number",
            "description": "Weight of the user in kilograms",
            "example": 70
          },
          "height": {
            "type": "number",
            "description": "Height of the user in centimeters",
            "example": 175
          },
          "diet": {
            "type": "string",
            "description": "Dietary preference of the user",
            "example": "vegetarian",
            "enum": [
              "no_diet",
              "vegetarian",
              "vegan",
              "pescatarian"
            ]
          },
          "allergens": {
            "description": "List of allergens",
            "example": [
              "nuts",
              "gluten"
            ],
            "type": "array",
            "items": {
              "type": "string"
            }
          }
        },
        "required": [
          "gender",
          "age",
          "diet",
          "allergens"
        ]
      },
      "ScanToCreateDto": {
        "type": "object",
        "properties": {
          "image": {
            "type": "string",
            "description": "Base64 encoded string of the food image to be analyzed",
            "example": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QAiRXhpZgAATU0...",
            "format": "base64"
          }
        },
        "required": [
          "image"
        ]
      },
      "ScanToLogDto": {
        "type": "object",
        "properties": {
          "image": {
            "type": "string",
            "description": "Base64 encoded string of the food image to be analyzed",
            "example": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QAiRXhpZgAATU0...",
            "format": "base64"
          }
        },
        "required": [
          "image"
        ]
      },
      "ModifyRecipeDto": {
        "type": "object",
        "properties": {
          "message": {
            "type": "string",
            "description": "Message describing the desired recipe modifications",
            "example": "Make this recipe vegetarian and reduce the calories",
            "minLength": 1
          }
        },
        "required": [
          "message"
        ]
      },
      "MessageDto": {
        "type": "object",
        "properties": {}
      },
      "RenameChatDto": {
        "type": "object",
        "properties": {}
      }
    }
  }
}

import openApiJson from './openapi.json';
import { OpenAPIViewer } from '../../../../../../components/documentation/open-api-endpoints';

<OpenAPIViewer spec={openApiJson} />

### Getting Started

This guide will help you set up and run the project locally.

#### Prerequisites

Before starting, make sure you have the following installed:

- Bun
- PostgreSQL or another supported database
- Git

#### Clone the Repository

```bash
git clone https://github.com/Kivy-Infoeducatie/Kivy-Backend.git
cd your-repo-name
```

#### Install Dependencies

```bash
npm install
# or
yarn install
# or
bun install
```

#### Environment

Create a `.env` file and fill it with the proper information:

```env
JWT_SECRET="secret"

DB_URL="postgres://user:password@localhost:5432/databse"

GEMINI_API_KEY="API_KEY"
GEMINI_MODEL="gemini-1.5-flash-002"
```

#### Pushing Database Schema

When first creating a database or after modifying the existing schema, run the following command:

```bash
bun migrate
```

### Overview

The Backend service of Kivy is a common service that all other Kivy products (Kivy App, Kivy Hub and Kivy Dev) use. It handles accounts and authentification, database schema and CRUD access to all of the resources within Kivy such as posts, relations between accounts and many more. This part of the documentation covers implementation topics, such as security, testing and technologies, as well as database schema and API endpoints.

This Backend service interacts with another one wrote in FastAPI that facilitates access to the AI tools. They are separate, this Backend service doesn't interact with any Kivy made AI service, and the only AI access within it is to the Gemini API used for the chat in the mobile app.

#### Security

The backend system has been meticulously designed with security as a top priority, ensuring the protection of both user data and system integrity. All communication between the client and server is enforced strictly over HTTPS, using industry-standard TLS protocols. This guarantees the confidentiality and integrity of data in transit, preventing man-in-the-middle (MITM) attacks or eavesdropping. Any non-HTTPS request is automatically rejected or redirected to secure channels, ensuring no part of the system is exposed through unencrypted communication.

A critical component of backend security is the authentication and session management system. The API uses JSON Web Tokens (JWT) for stateless and scalable authentication. JWTs are signed and validated using a secure algorithm (RS256), and token expiration is configured to limit the lifespan of a session, reducing the risk of token hijacking. Additionally, rate limiting is implemented at the API gateway level to prevent brute-force attacks and abuse, especially on sensitive endpoints like login or password reset.

Password storage is handled with utmost care. All user passwords are hashed using the bcrypt algorithm, with 10 rounds of salting. Bcrypt is computationally expensive by design, making it significantly harder for attackers to perform brute-force attacks, even in case of a data breach. The system also includes checks for password strength at registration and password change points, further enhancing overall credential security.

The backend is protected against a broad range of SQL injection attacks through the use of parameterized queries and ORM-level query builders. No raw SQL is exposed directly to user input without strict sanitization and validation. This eliminates the possibility of attackers manipulating queries to access unauthorized data or execute unintended operations. In addition to SQL injection protection, the backend also includes safeguards against Cross-Site Scripting (XSS) and Cross-Site Request Forgery (CSRF). While XSS primarily affects the frontend, the backend ensures all returned data is encoded properly to prevent malicious scripts from executing in the browser. For CSRF, tokens and SameSite cookie policies are configured to ensure that only authorized and intentional requests are processed.

The backend server itself runs in a secure and isolated environment, with restricted SSH access, active monitoring, and regular software patching to minimize vulnerabilities. Logs and exceptions are handled using structured logging systems, and all errors return standardized and sanitized responses to avoid leaking stack traces or internal system details. Critical errors are reported to an internal alerting system, allowing developers to respond quickly and proactively.

Finally, the database follows industry best practices for access control and encryption. Only the application backend has credentials to access the production database, and these credentials are stored securely using environment variables and secrets management tools. Role-based access control (RBAC) ensures that users only have access to the data and operations necessary for their role, minimizing the surface area for privilege escalation or data exposure.

### Technologies

- NestJS - Main Framework
- Passport - For Authentication
- DrizzleORM - Library for interacting with the database
- PostgreSQL - Database used
- Class Transformer + Class Validator - Data Validation
- Redis + BullMQ - For Notifications
- JWT - Technology for authentication tokens used

NestJS was chosen for its modular and scalable structure. DrizzleORM provides a typesafe interface to the PostgreSQL database. Redis and BullMQ efficiently handle asynchronous tasks and Passport and JWT provide a modern and secure authentication system.

### Testing

To ensure the long-term stability, reliability, and quality of the backend services, a comprehensive testing strategy has been adopted. This includes a combination of automated and manual testing approaches that together verify both functional and non-functional requirements of the application.

At the backend level, built with NestJS, we rely on Jest as our primary testing framework. Jest provides a fast and reliable test runner, with support for mocking, snapshots, and detailed coverage reports. Using SuperTest, we conduct end-to-end (e2e) testing, which simulates full API interactions by launching the application in a test environment and executing HTTP requests against real routes. These tests verify that the system behaves correctly from the client’s perspective, ensuring the proper integration of modules, middleware, and external dependencies like the database or authentication layers.

To streamline test data generation and avoid hardcoding values, we use the Faker library. This allows us to generate realistic, randomized inputs for user data, posts, tokens, and other entities. By using Faker, we simulate real-world variability and improve the robustness of test coverage, especially in scenarios involving validation, edge cases, or malicious input attempts.

In addition to automated testing, each major backend feature has been manually validated using tools such as Postman. These manual verifications complement our automated tests by allowing exploratory testing and inspection of headers, cookies, token lifecycles, and API responses under different authentication states. All API endpoints are also documented and tested for compliance with response formats and status codes.

On the non-functional side, we conducted performance and stress tests in a controlled staging environment, simulating high traffic loads, database failures, and network latency. This revealed potential bottlenecks and allowed us to optimize response times, connection pooling, and retry logic. Furthermore, we tested backend portability by running services on various hardware configurations and containers to ensure the system behaves consistently across environments.

The testing process is automated and integrated into our CI/CD pipeline, enabling quick regression testing on each code commit or pull request. This automation significantly reduces the time required to validate features while maintaining high confidence in code quality.

All bugs and technical issues discovered during the testing phase are tracked and prioritized in Trello. Each bug report is documented with steps to reproduce, logs, screenshots, and related test cases, ensuring that fixes are traceable and verifiable. This workflow has allowed the team to maintain an organized, iterative, and quality-focused development process across all platforms.

To enforce code quality and reliability, we also configured commit hooks and merge hooks that automatically triggered tests and linting on every commit and pull request, ensuring that all changes met the required standards before being merged into the main branches.



### Kivy

#### I Overview

On 01.12.2024, the **Kivy** project was launched and began its actual activity.
**Kivy** is a smart product dedicated to the modern kitchen, combining an advanced nutritional application with an innovative physical device called **Kivy Hub**. It includes a projector and a camera that transforms any work surface into an interactive screen, controllable through gestures and voice commands.

The proposed solution centralizes essential functionalities, recipes, nutritional recommendations, AI assistant, timers, unit conversions, in an intuitive interface, to personalize the culinary experience. Thus, the application helps us control many nutritional aspects of our lives, such as what we should eat, how much water we should drink to find certain gaps.

**Kivy** is not just a digital assistant, but a smart cooking partner, adapted for both beginners and gastronomy enthusiasts, offering an interactive and efficient experience in the kitchen.

**Headquarters address:** Strada Calea București no. 75, Brașov.
**Form of organization:** Collective entrepreneur - team of students
**Main object of activity:** Manufacturing of computers and other electronic equipment

#### II Executive summary

We see the conception of this project, respectively, product, as an opportunity in fact that we have identified a niche for the offered product, **Kivy**. Although there are and can apply nutritional applications that monitor physical activity, micronutrient consumption, can perform many such activities, sometimes they are found separate and do not communicate effectively with each other, requiring a lot of manual work to transfer data from one application to another, between various existing solutions.

The demand for this product comes from both those who want to monitor and analyze what they consume and nutritionists who want to see various data about their patients with precision, as well as chefs and people who like to cook, discover and learn new recipes and culinary methods.

The competitive advantage of what we are launching as a business results from the fact that all the searches made by team members in identifying nutritional, culinary and AI solutions similar to what we offer that are completely integrated into a harmonious system had the same result: there are no complete solutions, but only imperfect individual pieces and for the existence of similar software environments, and on the other hand similar for the adaptation environment, they are not special we also run into the same integration problem. **Our business vision** is: **"To become known on the market, by offering a quality product as a young team attracted by challenges and innovations"**.

In the same context, we present the following objective:

- Supplying all units ordered within a maximum of 7 working days;
- Improving health through proper nutrition;
- The demand will be created following the presentation of the facilities resulting from the following product: **Kivy Hub**.
- Presentation of the opportunity to use **Kivy Hub** will be demonstrated at the High School Fair, the Researchers' Night and demonstrations at various activities such as: Hackathon / Conferences / Presentations requested in order to popularize the product and attract potential investors.

#### III Market Analysis

Open market for the use of a new product submitted to the attention of the **Kivy** team, an area, initially, people with an active lifestyle, who have a well-defined objective for nutrition and people passionate about gastronomy.

##### III.1 Product and services

###### Product

###### a) Hardware Component

Kivy Hub is the hardware component of the project. It displays an interface of a kitchen assistant and helper application that is controlled by hand gestures, like a phone. The robot helps in cooking both by preparing recipes and easy-to-use tutorials, and by offering numerous useful tools in the kitchen, such as a timer, measurements and virtual assistance. It is completely touchless, being controlled by voice and by palm movements.

###### b) Software Component

Kivy is the software component of our project and consists of a mobile application that helps users achieve their nutritional goals, whether they want to lose weight, gain weight or adopt a healthy lifestyle. The application promotes an active lifestyle by setting daily goals such as the number of steps, distance traveled and energy consumed, while also providing access to a social network dedicated to culinary recipes, where users can explore and share dishes from verified databases or their own creations. For an advanced experience, Kivy Plus offers access to an extensive set of premium AI-based functionalities, including an intelligent allergen exclusion system, automatic recipe modification tools based on user preferences and advanced algorithms that personalize the experience of each user, thus ensuring maximum safety and complete satisfaction.

###### Services

###### a) Hardware Component Revision

The hardware component revision service includes their diagnosis, verification and maintenance to ensure optimal functioning. The process may involve cleaning, testing, repairing or replacing defective components. Depending on the complexity of the intervention, these revisions may include additional costs, which will be communicated before the work is carried out.

###### b) Virtual Assistance

Kivy virtual assistance provides fast and efficient support for users, guiding them in using the platform and resolving technical issues.

###### c) Kivy Plus (Premium Subscription)

Kivy Plus is a premium subscription service that unlocks advanced functionalities within the Kivy application. It includes:

- Intelligent Allergen Exclusion System: Advanced tools that allow for precise allergen exclusion.

- Advanced Nutritional Analysis: Additional tools for a more detailed nutritional analysis of meals and the user's progress, providing more complex reports and statistics.
- Automatic modification of recipes according to user preferences.
- Weekly Premium Recipes: Exclusive access to a selection of premium recipes created by nutrition experts and professional chefs, updated weekly. These recipes are designed to be not only delicious, but also nutritionally optimized.
- Priority Access to Support: **Kivy** Plus users benefit from priority support from the **Kivy** team, ensuring the rapid resolution of any problems or questions.

d) Secondary Sources
Secondary sources include Kivy Dev (paid access to the API service), Kivy Marketplace (apps and recipes sold by the community from which we will take 30% of the profit).

##### III.2 Commercial activity

It will be carried out through the application for services, subscriptions and software products, and for the hardware product through a website created specifically for the sale of the product.
The product is presented on the site and the services we offer and the shopping cart are highlighted.

The services we refer to consist of:

- Hardware component review

Virtual assistance

The company's activities will be carried out at the headquarters of the National College of Informatics
"Gr. Moisil" with headquarters at Calea București no. 75, Brașov.

##### III.3 Production

The activity related to the actual production will initially be carried out at the college's headquarters, where the product will be assembled, after which, as the order for **Kivy Hub** increases, we are considering several spaces that we can call on without additional costs, for example: the parents' garage or the grandparents' barn. We will also focus on a space located in the city's commercial center, easily accessible to employees and customers. The price of such a space would be €350 per month. We have established partnerships for electronic components, the metal parts are produced by a company with which we have an agreement so that they can be made to order, in a short time without involving additional costs. Currently, the production and marketing areas are sufficient and optimal. We also emphasize the fact that the manufacture of the components used in the creation of our product, the transport and the use of the device can generate polluting emissions, which requires us to comply with the legislative norms in force and to carry out measurements that draw attention to the exceeding of the legal parameters admitted.

##### III.4 Organizational Structure

Cazacu Christian Matei:

- Hardware Engineer
- Software Engineer
- AI and Data Science Engineer

Simedrea Alexandru:

- Software Engineer
- UI / UX Designer

#### IV Business Presentation

The activity of the team participating in the competition focuses on the production, development and marketing of **Kivy** , a system designed to help users achieve their nutritional goals, whether they want to lose weight, gain weight or maintain a healthy lifestyle. The application integrates a social network of culinary recipes and uses advanced technologies for monitoring progress, including intelligent algorithms and compatibility with wearable devices.

##### IV.1 Technical and economic analyses

###### Materials used

**Kivy Hub** will be made up of an ergonomic structure, designed precisely for its applications, for the prototype version, it is created from a simple projector, attached by a rigid PLA plastic frame, a rigid and recyclable plastic to a wall. The robot runs wirelessly, a device where the processing components are located can be placed anywhere at a short distance, acting as a server. The orientation and positioning of the robot can be done manually, but the calibration is done automatically with high precision by means of a sensor installed on the front of the projector.

###### Infrastructure and Facilities

Our headquarters will include a main area where the assembly and testing of the product will take place. This area includes work tables and tools necessary for the activity. Being located within the school unit, the headquarters has all the necessary facilities to meet the needs of any kind of team members so that the activity can be carried out in the best conditions.

##### IV.2 Sources of financing

The parts were purchased with personal funds, ensuring that we can create a fully functional prototype. With the growth of the company, we believe that we will be able to finance ourselves, both through the profit obtained and by the fact that by purchasing larger quantities of parts, the selling price can be negotiated in the sense of decreasing it.

##### IV.3 Business size

We expect that in the next year we will be able to equip a considerable number of homes with the **Kivy Hub** product, as well as a medium-sized market coverage with the application. In an ideal case, we will achieve:

- In the first year, revenues of €22,500 (€150 / product unit)
- Profit: €5,000 (average total cost €100)
- Number of customers: 150 (for the hardware component) ~1,000 (for the software component)
- Geographic area (initially): Romania

##### IV.4 Expansion

###### Perspective strategy

We thought about expanding the activity at the national level by analyzing an overview of the global market for nutritional applications, conducted in the USA. According to the latest research, their global market looks promising in the next 5 years. As of 2022, the global nutritional apps market was estimated at USD 1.1 billion and is expected to reach an even higher amount by 2028, with a CAGR (Compound Annual Growth Rate) during the forecast years. This report covers a research period from 2018 to 2028 and presents an in-depth and comprehensive analysis of the global market. The 125-part “Nutrition Market” 2024 research report conducts a meticulous and comprehensive analysis of the industry segmentation, focusing on types, applications, and regions. This report analyzes current trends, identifies emerging opportunities and risks, and highlights the key factors influencing the growth of this type of market.

#### V Performance / Utility

**Kivy Hub** is a robot that will help food enthusiasts broaden their horizons and beginners who want to learn.
**Kivy** is an innovative nutrition application that contains a wide range of tools that improve the quality of life.

##### V.1 Economic parameters

**Hardware component**

- Unit cost: €150
- Unit sales price: €349.99
- Commercial markup: 133.33 %

**Kivy Plus**

- **Periodic cost**: €9.99/month or €99.99/year (approximately 17% discount, or the equivalent of two free months).
- **Revenue model**: Monthly or annual recurring subscription.

##### V.2 Product policy

We will market a main product, it will have a packaging with a smart aesthetic that matches our vision and the direction the company is heading, the same aesthetic
will be reflected in the application.

The software component will be the core piece of this business, it will be marketed on its own, but it will be the support for the hardware component.

##### V.3 Pricing Policy

The product price is €350, we will offer significant discounts on Black Friday and “cooking day” (November 8) to make the product price more affordable.

##### V.4 Distribution Policy

The physical product will be sold in electronics and home appliance stores such as Altex SRL, MediaGalaxy SRL, Emag SRL, etc.

##### V.5 Sales Methods

Kivy Hub will be sold through electronics retailers. Kivy will be available for installation from Google Play and the App store. All subscriptions and separate purchases will be made through the app.

##### V.6 Promotional Media

Our products will be promoted through social media, Google ads, and TV and Radio ads. Kivy will be promoted at food summits, cooking TV shows, High School Fairs, Researchers’ Night, and at requested presentations.

##### V.7 Management

The engineers on the team will be responsible for reviewing manufactured products to see if they meet our standards, managing the app and the responsibilities that come with it, and dealing with technical issues. The managers will be responsible for the legal side of the company, promoting the product, and growing the company financially.

#### VI Conclusions (SWOT Analysis)

##### STRENGTHS:

- New, innovative product;
- The location of the product is safe, does not require payment of utilities;
- The performers have solid knowledge in the field of robotics, programming;
- Easy-to-use, efficient product;
- Stable, secure market;
- Fixed capital elements that are easy to acquire from the perspective of price and supply;

##### WEAKNESSES:

- Lack of marketing experience;
- Unpredictability of the reaction of beneficiaries to a new product launched on the market;
- Kivy must be maintained through periodic updates - the time available to team members is limited and irreversible;
- Lack of funds to carry out an impactful advertising campaign;

##### OPPORTUNITIES:

- Technology is advancing - product performance can be improved;
- Demand, at a general level, is high - there is a kitchen in every home;
- Clear, unsegmented market;
- Loyalty of beneficiaries (customers);
- Lack of barriers to entry on the market;
- Efficient operations;
- Profit margin, increasing;
- Stable price structure, with decreasing trends over time;
- Relatively low risks;

##### THREATS:

- Unprecedented evolution of technology in the field of robotics, programming;
- Emergence of hardware-based competition;
- Irrelevance of the software component for objective reasons;
- Reduction of the productive activity of suppliers of some products;

import { FileDownload } from '../../../../../components/documentation/file-download';

### Business Plan Introduction

This business plan is structured into clear, detailed sections that guide the reader through the project’s development. It begins with a general overview and an executive summary, followed by a market analysis that includes product and service descriptions, commercial activity, production, and organizational structure. The document continues with a business presentation featuring technical and financial analyses, funding sources, business scale, and expansion strategies. It then outlines the performance metrics and economic parameters, followed by a comprehensive marketing strategy, including product, pricing, distribution, and promotion policies. The plan concludes with a SWOT analysis, summarizing strengths, weaknesses, opportunities, and threats.

#### Business Plan

The business plan can be downloaded here:

<FileDownload
  name='Kivy Business Plan.pdf'
  href='https://drive.google.com/uc?id=1CMnDr1-ifGBKkgL7UNTk0dJ9fOTWBur3'
  size='392 KB'
/>

You can also browse the business plan online right in the documentation section.

## Developer Planning and Roadmap

### Phase 0: Preparation & Kick-off

Duration: 2 weeks

Goals: align team, finalize scope, set up infrastructure

Tasks:

- Project Kick-off Workshop
- Review overall vision, scope, success criteria
- Confirm responsibilities (Web, Mobile, AI, Hardware, DevOps, QA)
- Architecture & Tech Stack Review
- Finalize versions of React/Next.js, Tauri, SwiftUI, Raspberry Pi OS, Pytorch, etc.
- Set up shared CI/CD pipelines, code repos, issue trackers
- Environment Provisioning
- Create base GitHub org, repositories & branch policies
- Configure Trello/Confluence boards per component
- Provision Raspberry Pi devices, test benches, Cloud dev servers

Deliverables: Project charter; repo skeletons; initial CI pipeline; hardware bench setup

---

### Phase 1: Data & Embedding Model

Duration: 6 weeks

Goals: build recipe dataset; train & validate autoencoder embeddings

Tasks:

1. Dataset Assembly (2 weeks)

- Ingest 500K recipes from Food.com & RecipeNLG
- Standardize schema: ingredients, steps, metadata, dietary labels
- Enrich ingredients with USDA & Open Food Facts nutritional data
- Validate and filter for quality (duplicates, missing fields)

2. Model Architecture & Training (3 weeks)

- Prototype autoencoder on sample subset
- Iterate architecture (embedding size, layer depth, regularization)
- Train full-scale model; monitor loss and reconstruction quality
- Unit tests for vector operations (addition, interpolation)

3. Evaluation & Application (1 week)

- Recipe classification, clustering, and generation demos
- Documentation of embedding interface & performance metrics

Deliverables: cleaned, versioned dataset; trained autoencoder weights; evaluation report; embedding API spec

---

### Phase 2: Smart-Kitchen Hardware Prototype

Duration: 8 weeks (overlaps Phase 1)

Goals: build Kivy Hub prototype; implement gesture mapping

Tasks:

1. Hardware Assembly & Mounting (1 week)

- Procure HY320 projector, camera, Raspberry Pi 5, mounts
- Assemble and cable devices; ensure stable mounting

2. Camera–Projector Calibration (2 weeks)

- Capture calibration images; compute homography transform
- Integrate MediaPipe for hand‐landmark detection

3. Local Processing Workflow (2 weeks)

- Install and optimize Python, MediaPipe, OpenCV on Pi
- Build homography + gesture‐to‐UI mapping module

4. UI Projection & Interaction Demo (3 weeks)

- Develop minimal Tauri web app showing buttons/sliders
- Integrate gesture events into UI components
- Iterative user tests to refine responsiveness & accuracy

Deliverables: fully functional Pi prototype; gesture‐UI library; calibration docs

---

### Phase 3: Web & Embedded Application

Duration: 6 weeks

Goals: develop production-ready Tauri app and Next.js documentation site

Tasks:

1. Core UI Components (2 weeks)

- Build React primitives: Tap, Swipe, Hold components
- Style with Tailwind; ensure responsive grid layout

2. Kitchen Tools Module (2 weeks)

- Implement timer, measurement overlay, cutting guide
- Hook tools into gesture components

3. AI Hub & Recipe Viewer (1 week)

- Connect embedding API for “smart suggestions”
- Integrate recipe viewer: paginated steps, ingredient highlights

4. Documentation Website (1 week)

- Next.js site with Nextra for all technical docs
- Internationalization via Lingui; formula support with KaTeX

Deliverables: Tauri binary; Next.js documentation site live; component library

---

### Phase 4: Mobile Nutrition App

Duration: 10 weeks (overlaps Web)

Goals: deliver iOS-grade SwiftUI app with AI recommendations & HealthKit sync

Tasks:

1. Home Dashboard & Widgets (2 weeks)

- Build customizable dashboard; widget drag-drop reorder
- Connect HealthKit for steps/calories read

2. Recipe & Social Feed (2 weeks)

- Feed UI; comment/save/share flows
- Generate shopping list from selected recipes

3. Goals Tracking Module (2 weeks)

- Calorie needs calculator (age, weight, height, activity)
- Trends charts for nutrition & activity

4. Advanced Search & Personalization (2 weeks)

- Keyword & filter search against recipe dataset
- Allergy/dietary preferences settings

5. Settings & Integrations (2 weeks)

- Manage HealthKit permissions, push notifications
- Profile, privacy, dietary preferences

Deliverables: TestFlight beta release; user feedback report; app store submission prep

---

### Phase 5: Kivy Dev API & Backend

Duration: 6 weeks

Goals: build token‐based API, secure backend, developer docs

Tasks:

1. API Design & Auth (1 week)

- Define endpoints: embeddings, recipe search, personalization
- JWT token flows, rate limiting via NestJS & Passport

2. Data Layer & Caching (2 weeks)

- DrizzleORM models for recipes, users, analytics
- Redis + BullMQ for asynchronous tasks (notifications, content generation)

3. Security & Hardening (1 week)

- Enforce HTTPS, JWT expiry, bcrypt-salted passwords
- Audit for SQL-injection, XSS, CSRF

4. Developer Portal & Docs (2 weeks)

- Next.js/API reference with code samples
- Interactive API key management UI

Deliverables: live API endpoints; Postman collection; developer portal

---

### Phase 6: Testing, QA & Performance

Duration: 6 weeks (ongoing overlap)

Goals: ensure stability, security, performance across all components

Tasks:

- Automated Test Suites
- Backend e2e tests (NestJS + Supertest)
- UI tests (Playwright for web & mobile prototypes)
- Performance Benchmarking
- Load test APIs; measure latency under 100 ms per call
- Memory-profiling on Raspberry Pi & SwiftUI app
- Security Audits
- Penetration testing of web endpoints
- Review mobile storage encryption & keychain

Deliverables: test coverage reports; performance dashboards; security audit summary

---

### Phase 7: Beta Launch & Feedback

Duration: 4 weeks

Goals: iterative refinement based on real user input

Tasks:

- Release web app and hardware demo to pilot users
- Distribute TestFlight invites & collect feedback via in-app surveys
- Triage bug reports, usability issues; schedule sprints for fixes

Deliverables: bug backlog; UX improvement plan; updated builds

---

### Phase 8: Commercial Launch & Monitoring

Duration: 4 weeks

Goals: public release, marketing, operational readiness

Tasks:

- Finalize packaging for Kivy Hub; coordinate manufacturing logistics
- App Store & web launch campaigns; press release
- Set up monitoring: Sentry for errors, Grafana dashboards for API usage

Deliverables: launched product; marketing collateral; monitoring alerts configured

---

### Phase 9: Maintenance & Roadmapping

Ongoing

- Support & Updates: monthly sprints for bugfixes and enhancements
- Feature Roadmap: plan Godot-based web re-implementation, Android support
- Community & Dev Evangelism: webinars, SDK expansions

---

#### Timeline Summary

| Phase                             | Weeks   | Calendar (approx.)          |
| --------------------------------- | ------- | --------------------------- |
| 0. Prep & Kick-off                | 2       | Dec 1 – Dec 14, 2024        |
| 1. Data & Embedding Model         | 6       | Dec 15, 2024 – Jan 26, 2025 |
| 2. Hardware Prototype             | 8       | Dec 15, 2024 – Feb 9, 2025  |
| 3. Web & Embedded App             | 6       | Jan 27, 2025 – Mar 9, 2025  |
| 4. Mobile App                     | 10      | Dec 15, 2024 – Feb 23, 2025 |
| 5. API & Backend                  | 6       | Mar 10 – Apr 20, 2025       |
| 6. Testing & QA                   | 6       | Feb 10 – Mar 23, 2025       |
| 7. Beta Launch & Feedback         | 4       | Apr 21 – May 18, 2025       |
| 8. Commercial Launch & Monitoring | 4       | Sep 19 – Oct 17, 2025       |
| 9. Maintenance & Roadmapping      | ongoing | from Oct 18, 2025 onward    |



### Creating Kivy Hub

To create the first prototype of Kivy Hub, we went to a hardware store and bought three planks of wood (4.5 x 4.5 x 300 cm) that we cut into multiple smaller pieces as follows:

- Two 70 cm pieces for the base
- Two 125 cm pieces for the wall
- Three 50 cm to bridge between the wall and base pieces

Apart from these, we also took a 50 x 25 x 1 cm piece of wood to place the projector on.

Apart from the wooden structure, we also bought two sets of sliding bolts that fix the projector in place when standing up, L-shaped supports and screws.

After ensembling the wooden structure, we applied varnish to the wooden planks we cut. After everything dried, we screwed in the projector, positioned the camera and we were done.

For instructions on how to set up and use the hardware, refer to the user manual.

import { FileDownload } from '../../../../../components/documentation/file-download';

### Homography

Homography is a mathematical transformation that maps points from one plane to another, and in the context of the Kivy hardware, it is used to calibrate the system by establishing a precise link between the real-world coordinates of the user’s hand (as seen by the camera) and the virtual screen coordinates projected onto the table. Because the camera and projector view the surface from different angles, raw input from the camera is geometrically distorted; homography corrects this distortion by applying a 3×3 matrix computed during a calibration step, allowing the system to accurately interpret gestures and positions in real time as if the hand were interacting directly with the UI.

#### Homography Paper

The math for homography can be downloaded here:

<FileDownload
  name='Kivy Homography.pdf'
  href='https://drive.google.com/uc?id=1URVLh7WksQTnqB8Qjd8mfzKv-bDp1FmR'
  size='149 KB'
/>

You can also browse the homography paper below.

#### Introduction

In interactive systems where a camera observes hand positions and a projector displays targets, it is often necessary to map coordinates from the **camera space** (where the user's finger is detected) to the **projector space** (where the interface is projected). This mapping can be achieved using a **homography matrix**, assuming both the projector plane and camera-captured hand landmarks lie approximately on the same physical plane (e.g., a table surface).

#### Homography Overview

A **homography** is a transformation that relates two planes in projective space. It is represented as a $3 \times 3$ matrix $H$ that maps homogeneous coordinates from one image (or plane) to another:

$$
\begin{bmatrix}
x' \\
y' \\
w'
\end{bmatrix}
=
H
\begin{bmatrix}
x \\
y \\
1
\end{bmatrix}
\Rightarrow
\left( \frac{x'}{w'}, \frac{y'}{w'} \right)
$$

where:

- $(x, y)$ are the input coordinates (e.g., from the camera).
- $(x', y')$ are the output coordinates (e.g., on the projector).
- $H$ is the homography matrix.

#### Homography Matrix Structure

The homography matrix has 8 degrees of freedom (up to scale) and is typically written as:

$$
H =
\begin{bmatrix}
h_{11} & h_{12} & h_{13} \\
h_{21} & h_{22} & h_{23} \\
h_{31} & h_{32} & h_{33}
\end{bmatrix}, \quad \text{with } h_{33} = 1
$$

#### Constructing the System of Equations

Given 4 pairs of corresponding points $(x_i, y_i) \leftrightarrow (x'_i, y'_i)$, we can derive the constraints needed to solve for $H$.

From the homography relation:

$$
\begin{aligned}
x'_i &= \frac{h_{11}x_i + h_{12}y_i + h_{13}}{h_{31}x_i + h_{32}y_i + h_{33}} \\
y'_i &= \frac{h_{21}x_i + h_{22}y_i + h_{23}}{h_{31}x_i + h_{32}y_i + h_{33}}
\end{aligned}
$$

Multiply both sides by the denominator to eliminate the fraction:

$$
\begin{aligned}
x_i'(h_{31}x_i + h_{32}y_i + h_{33}) &= h_{11}x_i + h_{12}y_i + h_{13} \\
y_i'(h_{31}x_i + h_{32}y_i + h_{33}) &= h_{21}x_i + h_{22}y_i + h_{23}
\end{aligned}
$$

Rearranging, we obtain two linear equations per point:

$$
\begin{aligned}
-h_{11}x_i - h_{12}y_i - h_{13} + h_{31}x_i x_i' + h_{32}y_i x_i' + h_{33}x_i' &= 0 \\
-h_{21}x_i - h_{22}y_i - h_{23} + h_{31}x_i y_i' + h_{32}y_i y_i' + h_{33}y_i' &= 0
\end{aligned}
$$

#### Matrix Formulation

Stacking the equations for all 4 point pairs yields a linear system $A\mathbf{h} = 0$, where $\mathbf{h}$ is a 9-element vector:

$$
\mathbf{h} =
\begin{bmatrix}
h_{11} & h_{12} & h_{13} & h_{21} & h_{22} & h_{23} & h_{31} & h_{32} & h_{33}
\end{bmatrix}^T
$$

Each point pair contributes two rows to matrix $A$:

$$
A_i =
\begin{bmatrix}
-x_i & -y_i & -1 & 0 & 0 & 0 & x_i x'_i & y_i x'_i & x'_i \\
0 & 0 & 0 & -x_i & -y_i & -1 & x_i y'_i & y_i y'_i & y'_i
\end{bmatrix}
$$

#### Solving the System

The system $A\mathbf{h} = 0$ is homogeneous. To find a nontrivial solution, we compute the **Singular Value Decomposition (SVD)** of $A$:

$$
A = U \Sigma V^T
$$

The solution $\mathbf{h}$ is the last column of $V$ (corresponding to the smallest singular value). Reshaping $\mathbf{h}$ into a $3 \times 3$ matrix gives the homography matrix $H$.

#### Application: Hand-to-Projector Mapping

In the calibration process:

1. The user touches 4 projected dots on a flat surface.
2. The camera captures the index fingertip positions $(x_i, y_i)$ in the image.
3. The system knows the corresponding projected points $(x'_i, y'_i)$.
4. A homography $H$ is computed to map camera points to projector points.
5. Later, any new finger position $(x, y)$ from the camera can be mapped to the projector using:

$$
\begin{bmatrix}
x' \\
y' \\
w'
\end{bmatrix}
=
H
\begin{bmatrix}
x \\
y \\
1
\end{bmatrix}
\Rightarrow
\left( \frac{x'}{w'}, \frac{y'}{w'} \right)
$$

#### Conclusion

The homography provides a mathematically sound and computationally efficient way to map points between the camera and projector planes. With just four well-chosen calibration points, we can enable precise interaction in spatial augmented reality systems using only a webcam and a projector.

### Software Architecture

Most of the internal systems of Kivy Hub software are already described in the developer documentation, specifically, the following topics: Core Components, Event System, Debugging, Web Usage, Built-In Widgets were already described in the developer documentation.

#### Short Summary on How Kivy Hub Works

Kivy uses a Next.js application running as a Tauri desktop app. Everything is contained in a single route and logic is separated by using react contexts. Each building block (called plugin) of Kivy Hub, from mouse interaction to the UI uses one of these context and can be easily added or removed just by changing the provider list. A multi-provider is used to recursively apply multiple providers from a list. These providers call hooks and optionally provide a `useKivyProvider` hook (where KivyProvider is replaced with the name of the plugin used) that allow you to access different items provided by the plugin. Examples of plugins: Menu (used for the Hub menu), Mouse (used to add mouse support by triggering events when the mouse does actions in the web), screens (used to manage screens), Timer (used to manage timers) etc. Each widget group should have its own plugin that manages internal state.

> [!NOTE]
>
> Since plugins can access each other, the order of packages is crucial. For example, plugins for screens and tools frequently use the cursor position. Due to how contexts and context providers in react work, the hand recognition plugin should be declared before the screen and tools. Plugins that use other plugins should be placed before them.

This system allows for modular adding and removal of components, widgets, screens, tools, functionalities and many more, making Kivy Hub very developer-friendly.

### Technologies

#### For the actual application

- NextJS - Web development framework
- Tailwind CSS - Application styling
- Nextra - Documentation generation framework
- Lingui - For internationalization
- Prettier - For code formatting
- Lucide React - For icons
- React Query - For state management and API cache
- Katex - For formula representation in documentation
- Zod - For data validation
- React Hook Form - For forms

#### For the AI

- FastAPI
- Ollama

In the future, we plan on switching to a Godot based frontend application bakend up by a python websockets server for hand tracking for better performance.

## History

The Kivy project was originally launched under the name NutriCheck by a team of six members. While each team member contributed to the project’s initial development and direction, the full implementation of both the software and hardware components (meaning the Kivy Hub, Kivy App, Kivy Dev, Kivy Research, Kivy Website and design) was carried out by Cazacu Christian-Matei and Simedrea Alexandru.

## Technical Overview Introduction

his section provides an in-depth, behind-the-scenes look at the Kivy project, aimed at reviewers, evaluators and technical judges, but also people that want to learn more about how Kivy was built and how it works internally. It includes detailed documentation about the system architecture, AI models, research foundations, design decisions, development history and the overall vision. Perfect for contests, research fairs and innovation showcases where comprehensive technical insight is required.

Judges also take a look at Kivy Research.



### Getting Started

The TestFlight build has since expired, and we have submitted the final version of the app for review. We are currently awaiting Apple’s approval to publish the app on the App Store, where it will be widely available to the public as part of the broader Kivy ecosystem. Find out more in the testing section.

### Performance

We have built a brand new way of fetching information in SwiftUI to improve performance, similar Tanstack Query on the web, called SwiftQuery. This simplifies the development of handling loading and error states, while also automatically caching the information based on query keys in a shared cache container, making navigating sections inside the app quicker.

When fetching images, we use the `swiftui-cached-async-image` package, which handles caching them automatically, persisting even between complete app restarts.

We also make saved recipes available instantly, by persisting some of their information, thus removing the initial loading time when freshly launching the app.

To monitor the Kivy App performance, we used the built-in Xcode monitoring tools. The results can be seen below.

CPU

Memory

Energy

### Technologies

- Swift - The language used for development
- SwiftUI - The framework for UI
- SwiftData - Persistent data storage in a SQLite database
- Alamofire - The library for network requests
- HealthKit - The system offered by Apple for retrieving data related to user activity
- swiftui-cached-async-image - The library that is used for caching and persisting images
- swiftui-toasts - The library for displaying toasts throughout the app
- VariableBlur - File provided with an MIT license for showing variable blurs
- KeychainSwift - File provided with an MIT license for managing the iOS Keychain in an easier way

Swift and SwiftUI were chosen for their native integration with the Apple ecosystem and for the ease of rapid development of modern interfaces. SwiftData offers efficient persistence in SQLite and HealthKit is indispensable for accessing user health data.

### Testing

Before preparing the final release version of our iOS nutrition app, we conducted a focused testing phase through TestFlight, Apple's official beta testing platform. Over the course of the testing window, 20 invited users from our target audience interacted with the application in real-world scenarios. These testers provided valuable feedback that helped us fine-tune the user interface, fix minor bugs, and validate the AI-powered nutrition and recipe recommendation features in everyday use.

The TestFlight build has since expired, and we have submitted the final version of the app for review. We are currently awaiting Apple’s approval to publish the app on the App Store, where it will be widely available to the public as part of the broader Kivy ecosystem.

#### User Testimonials

> "I loved how I could personalize my dashboard to fit my daily routine. The AI suggestions actually helped me eat healthier without even realizing I was improving my habits."
> — Alexa Irina-Maria, 17, Brașov

> "The app feels like it was made for people like me who don’t have time to plan meals. The daily recipe suggestions are not just healthy—they’re delicious and easy to follow."
> — Istratie Ștefan, 18, Brașov

> "As someone who tracks their food and workouts religiously, I was impressed by how well the app integrates with Apple Health. It’s like having a nutritionist in my pocket."
> — Telea Mihai-Laurențiu, 17, Mihai

To enforce code quality and reliability, we also configured commit hooks and merge hooks that automatically triggered tests and linting on every commit and pull request, ensuring that all changes met the required standards before being merged into the main branches.



### Getting Started with FastAPI

This guide will walk you through setting up and running the Kivy Dev API.

#### Prerequisites

Before starting, ensure you have the following installed:

- **Python 3.8+**
- **pip** (Python package installer)
- (Recommended) **Virtualenv** or **venv**

#### 1. Clone the Repository

```bash
git clone https://github.com/Kivy-Infoeducatie/Kivy-AI-API.git
cd Kivy-AI-API
```

#### 2. Create a Virtual Environment

Using venv

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

Using virtualenv

```bash
pip install virtualenv
virtualenv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

#### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

#### 4. Run the FastAPI Server

```bash
uvicorn app.main:app --reload
```

### Introduction

Kivy Dev is a separate branch of the Kivy Backend that handles API access, tokens, limits and mainly all AI interaction. It uses the same database as the main backend. The service is written in FastAPI.

The following API routes are available.

### Technologies

- FastAPI - Main Framework
- Uvicorn - For running the server
- PostgreSQL - Database used
- Scikit-learn, Numpy, RapidFuzz, Pandas, Spacy - Minimal processing for AI

NestJS was chosen for its modular and scalable structure. DrizzleORM provides a typesafe interface to the PostgreSQL database. Redis and BullMQ efficiently handle asynchronous tasks and Passport and JWT provide a modern and secure authentication system.

## Market Analysis

### Distinct Elements from Existing Applications

The digital health and smart kitchen markets are growing rapidly, yet many current solutions remain fragmented and focused on narrow functions. Kivy distinguishes itself by providing a fully integrated, cross-platform ecosystem that unifies dietary tracking, intelligent cooking assistance, community interaction, and hardware interaction.

Key differentiators include:

- Unified Ecosystem: Most applications are siloed—fitness apps track calories, recipe apps offer suggestions, and smart kitchen devices operate independently. Kivy is one of the few platforms that unites hardware (Kivy Hub), mobile applications, and AI models into a single coherent experience.
- Vector-Based Culinary Intelligence: While most recipe recommendation systems use simple heuristics or collaborative filtering, Kivy employs advanced autoencoder-based embeddings that understand recipe structure, meaning, and functionality—enabling smarter, context-aware recipe generation and classification.
- Hands-Free Hardware Integration: Unlike existing smart kitchen hardware that relies on buttons, voice, or touchscreens, Kivy enables gesture-based interaction via camera and projector. This not only makes the experience hygienic and safe but also opens up possibilities for a broader demographic, including people with limited mobility or visual impairments.
- Personalized Nutrition with Social Features: Existing apps either focus on diet or community, rarely both. Kivy seamlessly integrates AI-driven personalization with community sharing, allowing users to share, adapt, and remix recipes based on dietary goals and constraints.

### Innovative Ways to Solve Problems

Kivy reimagines how people interact with nutritional data, culinary content, and kitchen tools through several novel approaches:

- Gesture-Controlled Interfaces in the Kitchen: Traditional kitchen assistants require physical touch or vocal commands, both of which can be challenging while cooking. Kivy’s use of MediaPipe-powered hand tracking combined with projector-based homography mapping allows for precise, clean, and real-time control over kitchen interfaces.
- AI-Powered Adaptation Rather Than Just Suggestion: Instead of simply recommending recipes, the system constructs and adapts meals based on embedded user preferences, constraints, and nutrient targets. This means users receive tailored meal plans that adapt over time with their behavior and goals.
- Cross-Device Synchronization for Real-Time Insight: The integration of Apple HealthKit with mobile nutrition features provides a 360-degree view of user health, enabling more meaningful recommendations. The backend harmonizes user data across mobile, desktop, and embedded systems to ensure consistent performance and insights.
- High-Fidelity Dataset Construction: By merging multiple large-scale public datasets and enriching them with USDA and Open Food Facts nutritional data, Kivy solves the common problem of low-quality or inconsistent culinary datasets—building a standardized, reproducible, and diverse corpus suitable for both product features and academic research.

### Innovations Brought to the Solution Used

Kivy brings significant innovations not only through what it builds, but how it builds it. These include:

- Numerical Recipe Embeddings via Autoencoders: Instead of relying on keyword similarity or ingredient overlap, Kivy introduces a learned representation space for recipes. This makes it possible to cluster, compare, modify, and generate recipes with semantic and functional awareness—an approach largely absent in consumer-facing applications.
- Multiplatform, Resource-Efficient Architecture: By using Tauri for embedded apps and SwiftUI for mobile, the project demonstrates that cross-platform, AI-enabled applications don’t have to be bloated or inefficient. The Tauri app is lightweight, the iOS app is highly optimized, and all platforms share a modular frontend codebase, ensuring fast iteration and maintainability.
- Smart Personalization with Community Integration: Kivy goes beyond the “one-size-fits-all” model. Its AI adapts to user data, health records, and social interactions to evolve recommendations in a meaningful way. This dual engine of personalization (data-driven and socially inspired) marks a paradigm shift in how nutrition apps engage users.
- Embedded Documentation and Developer API (Kivy Dev): The ecosystem is also designed with extensibility in mind. Through a token-based paid API system, developers can build on top of the Kivy infrastructure using the same AI models and tools, creating an ecosystem multiplier effect that boosts innovation across domains—from healthcare to food delivery.

## Security

Security was a top priority throughout the development of all applications within the Kivy ecosystem. We implemented multiple layers of defense and followed best practices to ensure that both user data and system components remain secure and resilient to attacks.

### Input Validation and Protection Mechanisms

All user inputs were strictly validated on both client and server sides to prevent common vulnerabilities such as:

- Injection attacks (e.g., SQL injection, command injection)
- Sandbox escape attempts; On the backend, we used `chroot` environments to isolate application execution, ensuring strict sandboxing.
- Privilege escalation and remote code execution (RCE); For all production deployments, we used Vercel, which provides a secure, sandboxed environment that limits system-level access and prevents unauthorized code execution.

These validation and containment mechanisms formed the first layer of defense in our security model.

### Error and Exception Handling

To improve transparency and user experience without exposing internal logic, all error messages were handled gracefully. On the frontend, we used toast notifications to display descriptive yet secure messages to the user. Exceptions and internal errors were properly caught and logged without leaking sensitive information.

### Attack Detection and Blocking

Although active attack detection and blocking mechanisms (e.g., rate limiting, WAFs) were not necessary due to our deployment on Vercel, we benefited from the platform’s built-in security features. Vercel automatically mitigates many classes of attacks through its infrastructure-level protections, ensuring safety against known exploits.

# Kivy Documentation

Welcome to Kivy!

Kivy is a complex ecosystem made from a number of projects around cooking, nutrition and staying healthy.

The documentation is split into three parts, each for a type of users:

## Kivy for Users

This section is designed for everyday users who want to explore the Kivy platform to improve their cooking, nutrition and overall health. It includes guides on using the Kivy App, Kivy Hub hardware and software, generating personalized recipes, using features like the AI assistant and nutrition planner, navigating the site and much more. Whether you're a casual home cook or a health enthusiast, this is where you’ll learn how to get the most out of Kivy.

See the user manual for more details.

## Kivy for Developers

This section is for developers who want to build on top of the Kivy ecosystem. It covers API documentation, integration guides, Kivy Dev usage and API, as well as contributing to the Kivy embedded software. If you're looking to create your own apps, plugins or tools using Kivy's infrastructure or extend Kivy's existing products, start here.

See the developer documentation for more details.

## Kivy for Judges

This section provides an in-depth, behind-the-scenes look at the Kivy project, aimed at reviewers, evaluators and technical judges, but also people that want to learn more about how Kivy was built and how it works internally. It includes detailed documentation about the system architecture, AI models, research foundations, design decisions, development history and the overall vision. Perfect for contests, research fairs and innovation showcases where comprehensive technical insight is required.

See the technical overview for more details. Judges also take a look at the other three sections because a good part of the docs, such as how to use, how to run and much more can be found there. The technical overview contains only things that neither end users, researchers nor developers would need to know to use the Kivy ecosystem and its tools.

## Kivy Research

This section presents the scientific foundation behind the Kivy ecosystem. It includes the research paper that guided our development and the methodologies used. You'll find detailed descriptions of our architecture, dataset and more. This documentation is intended for judges, researchers and anyone interested in the theoretical and empirical work that supports Kivy's approach to nutrition.

See the research section for more details.


## Project Management

The development of the Kivy project was driven by a structured and collaborative approach to project management. Our core team consisted of:

- **Cazacu Christian-Matei** — Web Developer, Backend Developer, Hardware Engineer, AI & Data Scientist
- **Simedrea Alexandru** — Web Developer, Mobile Developer, UI/UX Designer, and Tester

To manage tasks, timelines, and collaboration efficiently, we used Trello as our primary project management platform. Trello enabled us to maintain visibility across all aspects of development and ensure that every component — from frontend design to backend architecture and AI integration — progressed in a synchronized manner.

Trello

## Stability and Security

The Kivy project was built with security and reliability as foundational principles, ensuring user trust and data protection across all platforms: iOS, web, and desktop.

### Application Security

- The iOS app, developed in SwiftUI, is tightly integrated with the Apple ecosystem, benefiting from its advanced security features:
- Sandbox isolation prevents unauthorized access to app data.
- Biometric authentication (Face ID / Touch ID) ensures secure user verification.
- Keychain integration enables encrypted storage of sensitive user credentials.

---

- All communication between the frontend and backend occurs over encrypted HTTPS connections.
- The backend API, built with NestJS, is protected by:
- JWT-based authentication with short-lived tokens.
- Rate limiting to mitigate abuse and denial-of-service attempts.
- CORS restrictions and access control mechanisms to prevent unauthorized access.

---

- The backend is hosted on a secure, access-restricted server that is actively monitored. Critical data is stored in a hardened database, following current security best practices:
- User passwords are hashed using bcrypt with 10 rounds of salting, making brute-force attacks computationally impractical.
- Protection against common web threats such as:
- SQL Injection
- Cross-Site Scripting (XSS)
- Cross-Site Request Forgery (CSRF)

---

- Both the frontend and backend handle errors and exceptions in a standardized manner, returning appropriate status codes and messages while avoiding information leaks.

### Testing and Stability

To ensure a stable and high-quality product, we adopted a comprehensive testing strategy covering both functional and non-functional aspects:

- End-to-end (E2E) testing was implemented on the backend to automatically verify critical flows and inter-component communication.
- Manual testing was performed on all major platforms (iOS, web, desktop, and backend) to validate real-world behavior and user interactions.
- API endpoints were rigorously tested using Postman collections to ensure robustness and consistency across various usage scenarios.

#### Non-functional Testing Highlights:

- Performance and scalability testing in isolated environments helped simulate high-traffic scenarios and critical service failures (e.g., network outages, database disconnections).
- Cross-platform compatibility was validated across multiple hardware configurations to ensure seamless operation in both high-end and resource-constrained environments.

#### Automation and Quality Assurance:

- A large portion of the testing process is automated through test scripts, enabling rapid validation of application stability after each code change.
- All bugs, test results, and QA feedback were tracked and managed within Trello, ensuring issues were documented, prioritized, and resolved efficiently.
- The structured QA pipeline ensured the development process remained predictable, repeatable, and quality-focused.

By integrating modern security practices with thorough testing and quality assurance workflows, we have built a resilient and secure application architecture — one that is ready for production use and scalable future development.

## Summary

As technology continues to shape the way we live, the kitchen is beginning to evolve from a purely manual space to one where intelligent assistance can bring real value. Here, we present four major contributions to the field.

First, we introduce a new, processed, structured and filtered dataset containing over 500,000 recipes from Food.com and RecipeNLG in a standardized, information-rich format enhanced with nutritional information for ingredients from the USDA Food Data Central and Open Food Facts. These include well-defined ingredient lists, step-by-step instructions, titles and metadata such as culinary specifics and dietary labels. This dataset provides a diverse, high-quality and reproducible foundation for future research in the field.

Second, we propose an innovative architecture based on autoencoders that “learns” numerical representations of culinary recipes. These embeddings capture both the meaning, structure and functionality of recipes. Our model is able to reconstruct complete recipes from these compact yet information-rich representations. We demonstrate their efficiency in several practical applications, such as vector operations, recipe classification and grouping and even recipe generation.

Third, we present a functional hardware component of a smart kitchen assistant that integrates a projector and a camera to transform any flat surface into an interactive workspace. The hardware component includes numerous useful kitchen tools, such as recipe viewers, cutting contours, measurements and more.

We also extend the functionality of the system with a fully integrated mobile application that combines nutritional monitoring with AI-assisted recipe personalization. The app allows users to track their health goals, receive dynamic meal recommendations tailored to their dietary preferences and interact on a social recipe sharing platform. By integrating health data, culinary personalization and community features, the mobile app connects the various components of the project, reinforcing Kivy’s goal of providing a complete, adaptive ecosystem for smart cooking and nutritional management.

### Hardware

The system hardware (also known as **Kivy Hub**) consists of a HY320 projector and a video camera mounted on a fixed, adaptable wall or kitchen cabinet mount. The projector displays the user interface on flat surfaces, such as countertops or tables, effectively transforming them into interactive workspaces. The camera captures user gestures, allowing interaction with the projection. Processing is performed by a Raspberry Pi 5, chosen for its small size and low power consumption. It connects to the projector and camera via wired or wireless connections and performs all calculations locally (gesture recognition, image processing and interface rendering), ensuring the system works without internet access. This makes the system ideal for kitchens, classrooms or other environments that require hands-free digital interaction, with the product having the potential to be developed in many other directions.

Interaction is enabled by hand tracking using MediaPipe, which accurately detects hand positions and movements in real time. To map these gestures onto the projected interface, the system applies a homography transformation. This ensures that the user’s movements correspond exactly to the displayed elements, allowing for intuitive and spatially aligned control.

Details about the mathematics behind the homography can be found in the homography section.

The software component of the system is a web application developed using Tauri, React, Tailwind CSS and Vite, designed to run locally on a Raspberry Pi (We want to move the project to Godot in the future). It serves as the main user interface, allowing interaction through hand gestures instead of physical touch, providing a completely hands-free experience.

Gesture recognition is performed by MediaPipe, which processes the video stream to identify hand positions. This ensures that the gestures align perfectly with the interactive elements displayed on the work surface.

To support gesture-based interaction, a set of custom primitive components was developed in React. These components can detect actions such as taps, swipes or holding a finger in a fixed position, forming the basis for more complex interactive widgets.

The app's core features include a kitchen timer, measuring tool, interactive cutting guides, an AI Hub for intelligent assistance and a recipe viewer adapted for hands-free operation. Together, these features create an intuitive and accessible interactive environment, effectively transforming any kitchen surface into a smart digital platform.

### Mobile Application

The Kivy ecosystem also comes with a mobile nutrition app that integrates artificial intelligence to help users adopt a healthier lifestyle. The app combines traditional nutritional tracking features with an AI-powered recipe recommendation system. It is fully integrated into the extensive Kivy ecosystem, which includes hardware components and AI models.

The app emphasizes accessibility and customization, being structured into five main sections:

#### 1. Customizable Dashboard (Home Tab)

The main interface functions as an interactive and modular dashboard. Users can add, remove and rearrange widgets of different sizes (small, medium, large) to adapt the display to their personal health goals. Key features include:

- visual progress indicators for daily metrics like calories, steps and distance
- a daily recipe suggestion for culinary inspiration
- personalized recommendations based on nutritional preferences
- an AI nutritional assistant capable of answering dietary questions and generating meal plans
- and a shopping list that consolidates ingredients in selected recipes.

#### 2. Recipes and Social Network (Recipes Tab)

This section transforms the app into a social culinary platform. Users can explore recipes shared by the community or taken from external sources. Each recipe is presented with clear details and interactive step-by-step guidance. Additional features include commenting and interacting with recipes, saving favorites for quick access, automatically generating shopping lists from ingredients and creating personalized recipes through an intuitive visual editor.

#### 3. Goals Tracking (Goals Tab)

Dedicated to tracking health progress, this section supports automatic synchronization with Apple HealthKit, as well as manual data entry. Users can monitor daily calorie intake, steps taken, distance traveled and trends over time in physical indicators. The app also calculates personalized daily calorie needs based on user data such as age, weight, height and activity level.

#### 4. Advanced Search (Search Screen)

The search function allows for quick and efficient search for recipes in the app’s database. Users can enter the name of a dish or keywords, filtering results by food preferences, ingredients or popularity to quickly find the desired options.

#### 5. Personalization and Settings (Settings Screen)

This section allows users to configure the entire app experience. Settings include defining food preferences, allergies and diets; updating personal data; managing permissions such as Apple HealthKit access and notifications; and adjusting interface elements and functionality to best meet individual needs

#### 6. Conclusion

By integrating these functionalities, Kivy provides an intelligent, user-centric platform for nutrition management and culinary exploration, supporting healthier habits through adaptive AI and community engagement.

### Website

To host documentation, software, hardware in a web environment without the need for a physical component, a presentation section and much more, we created a minimalist website.

More details about the website can be found in the website section.

### Research Paper and Vector Representations

The most important part of the Kivy project is the research paper. This explains how we developed an autoencoder neural network architecture (i.e. a network that tries to learn numerical representations of culinary recipes by transforming them into that vector and then trying to build the original recipe from that numerical representation).

In the paper, we detailed the identified problem, the purpose, objectives, construction and content of a dataset of 500.000 culinary recipes, the network architecture and the mathematics behind it and possible real-life uses of the architecture.

The research paper can be found in the research section.

### Kivy Dev

To allow anyone access to the various AI models and data within the Kivy ecosystem, we allow developers to interact with our services through a paid, token-based API called Kivy Dev.

More details about Kivy Dev can be found in the Kivy Dev section.

### Business Plan

The business plan can be found in the business section.

The document details the market analysis, product structure (hardware and software), business model, financing sources, expansion strategy, pricing, distribution and promotion policy, as well as economic parameters and SWOT analysis.

### Planning, Organizing and Implementing

#### 1. Application Stability

All three software components, the iOS app, the website built in Next.js and the desktop app built with Tauri, were developed with a focus on optimization. The iOS app uses lazy loading and local caching to reduce network and CPU usage and the web app is server-side rendered with Next.js to reduce the load on the user's device. The Tauri version takes advantage of the low resource consumption, providing an energy-efficient and fast alternative compared to Electron solutions, occupying significantly less RAM and CPU.

The project was rigorously tested to prevent memory leaks, both by auditing the code and by monitoring the application's behavior during prolonged use. The iOS app is highly efficient thanks to SwiftUI’s tight integration with the Apple ecosystem, which enables low resource consumption, natively optimized performance and seamless compatibility with system features such as smooth animations, hardware access and full accessibility support. The website is built with modern React and Next.js practices, which avoid unnecessary object retention. The Tauri app, using Rust at the core, benefits from strict memory management, which significantly reduces the risk of such issues.

During testing on various platforms, the app did not cause significant slowdowns or system overload. Interfaces are responsive, resource loading is done asynchronously and only when needed and background processes are limited to not overly consume CPU or battery. On mobile, the iOS app integrates seamlessly with the system’s battery saving policies. On desktop, the Tauri app starts quickly and has minimal impact on overall performance, thanks to compact binaries and efficient use of native resources.

#### 2. Application Security

The application was developed with a strong focus on security, covering all three main components. The iOS application, made in SwiftUI, is tightly integrated with the Apple ecosystem, automatically benefiting from the advanced levels of security offered by the platform, such as application isolation in sandbox, biometric authentication and Keychain for secure storage of sensitive data. Communication with the backend is carried out exclusively through encrypted HTTPS connections and the API is protected by robust authentication mechanisms (JWT token and rate limiting). The backend is hosted on a secure server, with restricted access and constantly monitored. The database follows modern security standards. User passwords are encrypted with the bcrypt algorithm, using 10 rounds of salting, which makes them practically impossible to crack using brute-force methods. In addition, protection measures have been implemented against common attacks, such as SQL injection, XSS and CSRF, thus ensuring the confidentiality, integrity and availability of user data. All errors and exceptions have corresponding messages and responses on both the frontend and backend according to each error according to current standards.

#### 3. Testing

To ensure the stability and quality of the application, we applied a comprehensive testing approach, covering both functional and non-functional testing. At the backend (NestJS) level, we implemented end-to-end (e2e) testing to automatically verify critical flows and the integrity of communication between components. In parallel, all major functionalities were also manually verified on each platform (iOS, web, desktop and backend with Postman) to detect any errors in the real behavior of the application.

Non-functional testing included evaluating performance and scalability in an isolated environment, where real conditions of intense use and failures of critical services (network outages, lack of database connection, etc.) were simulated. We also tested the portability of the application on different platforms and hardware configurations, ensuring that the application works fluently regardless of the environment.

The testing process is largely automated, through test scripts, which allows us to quickly validate the stability of the application with each change made to the code. For efficient task management and bug tracking, we used Trello, where each identified issue was documented and handled accordingly. Thus, the entire development process was organized, repeatable and quality-oriented.

#### 4. Application Maturity

The application is at an advanced stage of maturity, already aligned with the needs of the target audience and available for real use. The version is tested by users in TestFlight and the web version is online and fully functional. The backend is hosted and operational, successfully managing user traffic and data. The only component still in the prototype stage is the interactive hardware system, which is to be refined before the commercial launch.

#### 5. UI and UX

The application interface was designed with a focus on simplicity, clarity and accessibility, providing a pleasant and intuitive experience for users in the target audience. The modular design allows for easy customization of the dashboard and navigation is fluid, with coherent and easy-to-understand visual elements. The UX is optimized for frequent use, reducing the number of steps required for common actions and integrating clear visual feedback, which increases satisfaction and efficiency in use.

More details about UI/UX, as well as a Figma link with the design for the website, mobile app, embedded software and branding can be found in the UI/UX section.

#### 6. Versioning

For versioning, we used Git and the GitHub platform.

### Technologies used

#### iOS application

- Swift - The language used for development
- SwiftUI - The framework for UI
- SwiftData - Persistent data storage in a SQLite database
- Alamofire - The library for network requests
- HealthKit - The system offered by Apple for retrieving data related to user activity

Swift and SwiftUI were chosen for their native integration with the Apple ecosystem and for the ease of rapid development of modern interfaces. SwiftData offers efficient persistence in SQLite and HealthKit is indispensable for accessing user health data.

#### Website

- NextJS - Web development framework
- Tailwind CSS - Application styling
- Nextra - Documentation generation framework
- Lingui - For internationalization
- Prettier - For code formatting
- Lucide React - For icons
- React Query - For state management and API cache
- Katex - For formula representation in documentation
- Zod - For data validation
- React Hook Form - For forms

Next.js was chosen for its high performance and support for server-side rendering. Tailwind CSS offers fast and scalable styling and Nextra is ideal for generating clear documentation.

#### Embedded Software

- Tauri - Framework for running applications
- NextJS - Web development framework
- Tailwind CSS - Application styling
- Nextra - Framework for generating documentation
- Lingui - For internationalization
- Prettier - For code formatting
- Zod - For data validation
- React Hook Form - For forms
- React Query - For state management and API cache
- Lucide React - For icons

Tauri was selected for its low resource consumption and efficient integration with web applications. The web architecture (Next.js, Tailwind CSS, etc.) was maintained for consistency across platforms.

#### Backend

- NestJS - Main Framework
- Passport - For Authentication
- DrizzleORM - Library for interacting with the database
- PostgreSQL - Database used
- Class Transformer + Class Validator - Data Validation
- Redis + BullMQ - For Notifications
- JWT - Technology for authentication tokens used

NestJS was chosen for its modular and scalable structure. DrizzleORM provides a typesafe interface to the PostgreSQL database. Redis and BullMQ efficiently handle asynchronous tasks and Passport and JWT provide a modern and secure authentication system.

#### AI and Research

- Pytorch - Framework for developing neural networks
- Numpy - Tensor library specialized in AI
- Pandas - Working with datasets
- Scikit-Learn - Data processing and other minor tasks
- LaTeX - Writing the research paper

PyTorch is ideal for developing artificial intelligence models due to its flexibility. Numpy and Pandas are standards in data processing and Scikit-Learn completes the pipeline with classic machine learning functionalities.

#### Organization and Testing

- GitHub + Git - Versioning
- Trello - Project Management
- E2E Tests - Application Testing

Git and GitHub are standards in collaborative code versioning. Trello helps in efficient project planning and documentation. E2E tests ensure the stability and full functionality of the application in real-world conditions.

## System Requirements

### Mobile Application

To run the Kivy mobile app, users need a compatible Apple device with the following minimum system requirements:

- **Supported devices**: iPhone, iPad, Apple Vision Pro, or Mac (Apple Silicon or Intel-based)
- **Operating systems**:
- iOS 18.0 or later
- iPadOS 18.0 or later
- visionOS 2.0 or later
- macOS 15.0 or later (for Catalyst compatibility)
- **Connectivity**: An active internet connection is required for accessing online features such as syncing data, retrieving personalized recommendations, and performing AI-based operations.
- **Storage**: Minimum of 100 MB of free disk space.
- **Permissions**:
- **Camera access** (used for scanning ingredients, recognizing gestures, or using the visual meal tracker)
- **Health data access** (used to personalize nutrition and activity tracking via HealthKit)

> The app is optimized for Apple devices only and is distributed via the App Store or TestFlight during the development phase.

### Web Application

The Kivy web interface is lightweight and designed to run smoothly on any modern device with minimal system requirements. It is fully responsive and accessible from desktops, tablets, and smartphones.

- **CPU usage**: Very low, as the site primarily serves static assets (HTML, CSS, JavaScript)
- **RAM usage**: Typically under **150 MB** in modern browsers (Chrome, Firefox, Safari, Edge)
- **Compatibility**: Fully functional on any browser that supports ES6, CSS Grid/Flexbox, and modern DOM APIs
- **Performance**: The application is optimized for fast loading times, with minimal impact on device performance, even on older systems with limited resources

> Ideal for quick access to recipes, educational resources, and managing your Kivy Hub remotely.

### Hardware Component (Kivy Hub) – Software Interface

For running the software that controls the hardware component (Kivy Hub) via a browser-based or desktop interface, the following setup is recommended to ensure optimal performance:

- **CPU**: Quad-core or better (Intel i5 / Apple M1 / AMD Ryzen equivalent)
- **RAM**: Minimum **4 GB** (8 GB or more recommended for heavy usage)
- **GPU**: Integrated or dedicated GPU for local video processing and WebGL acceleration
- **Browser**: Latest version of **Google Chrome**, **Microsoft Edge**, or **Mozilla Firefox** with support for:
- **WebAssembly**
- **WebGL**
- **MediaStream API** (for webcam access)
- **Internet Connection**: Stable connection required for real-time communication with the backend APIs and AI services
- **Permissions**:
- **Webcam access**: Required for gesture recognition and live interaction
- **Microphone access** *(optional)*: For future voice control features

> The Kivy Hub web app processes real-time video input locally to minimize latency and maximize responsiveness, making a capable hardware setup essential for smooth interaction.

For all components of the Kivy system, we prioritize cross-device compatibility, low resource consumption, and accessibility — ensuring that users can interact with our ecosystem seamlessly across platforms.

### UI / UX

The application's interface was designed with a strong emphasis on simplicity, clarity, and accessibility, aiming to provide a pleasant and intuitive experience for users in our target audience. The modular design allows users to easily customize the dashboard based on their preferences and usage patterns, while the navigation remains fluid and responsive.

All visual elements follow a coherent and user-friendly design language, ensuring that functionality is easy to discover and understand. The user experience (UX) has been optimized for frequent use, minimizing the number of steps required to perform common actions. Clear visual feedback is provided for user interactions, enhancing both satisfaction and efficiency during use.

We focused on accessibility principles to ensure inclusivity and reduced cognitive load, especially for users who may interact with the platform regularly as part of their daily routine.

The complete UI/UX prototype and design system are available on Figma and can be explored in the UI/UX section.

This design serves as a visual foundation for the implementation of the front-end components across the web, mobile, and interactive hub platforms within the Kivy ecosystem.

In developing the application’s interface, we adhered closely to the Apple Human Interface Guidelines to ensure consistency, familiarity, and intuitive behavior on iOS devices. This helped us create a native-like experience that feels fluid and responsive, aligning with user expectations for mobile performance and design patterns. Typography, spacing, gesture responsiveness, and control components were carefully aligned with Apple’s best practices to maximize usability and aesthetic coherence.

The application fully supports both portrait and landscape orientations, providing users with a flexible and adaptive interface. Smooth transitions between screens have been implemented using subtle, natural animations that enhance navigation without distracting from the content. These animations help maintain context during interactions, ensuring a seamless and polished user experience across all supported platforms.

## Versioning

Throughout the development of the Kivy project, we used **Git** for version control and **GitHub** for collaboration, issue tracking, and repository hosting. All of our source code is organized under the Kivy-Infoeducatie GitHub organization, which ensures structured collaboration and transparency across all modules of the project.

Our repositories are organized by purpose, each serving a dedicated role in the ecosystem:

- Kivy-Hub: Contains the main **playground web app**, along with documentation and various utility sections related to Kivy.
- Kivy-Docs: Central repository for **project documentation**, including PDF guides and an overview of the organizational structure.
- Kivy-CV: Handles all **computer vision tasks**, such as gesture recognition and camera input processing.
- Kivy-Research: Repository dedicated to the **research and experimental components** of the Kivy platform.
- Kivy-Backend: Contains the **backend service**, APIs, and server logic that power the Kivy ecosystem.
- Kivy-Mobile: The **iOS mobile app** implementation of Kivy.
- Kivy-AI-API: Development repository for **AI services and APIs**, used internally by the Kivy ecosystem.

By using GitHub, we were able to track progress through issues and pull requests, collaborate effectively as a team, and maintain a clear history of changes throughout the project lifecycle. To enforce code quality and reliability, we also configured commit hooks and merge hooks that automatically triggered tests and linting on every commit and pull request, ensuring that all changes met the required standards before being merged into the main branches.



### Getting Started

This guide will walk you through the process of setting up the project locally for development and preparing it for production deployment.

---

#### 1. Prerequisites

Before you begin, make sure you have the following installed on your system:

- **Node.js** (v18 or higher recommended)
- **Bun** (optional, but preferred for speed)
- **Git**

---

#### 2. Clone the Repository

Start by cloning the project from GitHub:

```bash
git clone https://github.com/Kivy-Infoeducatie/Kivy-Hub.git
cd Kivy-Hub
```

#### 3. Install dependencies

```bash
bun install

# If you’re using npm or yarn, run npm install or yarn instead.
```

#### 4. Run the Development Server

```bash
bun dev
```

### Introduction

The Kivy website serves as the central platform for presenting the Kivy ecosystem of products and services, while also offering interactive tools and developer utilities. It includes a web usable version of Kivy Hub and a developer dashboard for the Kivy Dev API.

#### Interactive Playground

The Interactive Playground allows users to simulate the Kivy Hub experience directly in their browser, without needing specialized hardware. It provides a virtual environment where hand gesture input can be tested through the device camera. This is achieved through a combination of computer vision and simulated touch input. The playground also includes sample recipes. It is intended for demo purposes and user onboarding.

#### Documentation

This section provides general support resources for both end-users and developers. It includes setup guides for the Kivy Hub and App, troubleshooting tips, usage best practices, and answers to frequently asked questions.

### Technologies

- NextJS - Web development framework
- Tailwind CSS - Application styling
- Nextra - Documentation generation framework
- Lingui - For internationalization
- Prettier - For code formatting
- Lucide React - For icons
- React Query - For state management and API cache
- Katex - For formula representation in documentation
- Zod - For data validation
- React Hook Form - For forms

Next.js was chosen for its high performance and support for server-side rendering. Tailwind CSS offers fast and scalable styling and Nextra is ideal for generating clear documentation.
