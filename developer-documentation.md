




### Autoencoder Blocks

For the actual model, we used a series of encoder and decoder blocks for different parts of the recipe. The code for them can be found in the Kivy-Research repository. For more information about how the blocks work, check out our research section.

### Dataset

To make the autoencoder model, we first need a clean and organized recipe dataset. For this task, we used the recipe parser code in Kivy-Research. You can find a brief description of the processing we did in the code below.

#### Project Goal

The code processes and merges two raw recipe datasets into a clean, unified dataset, enriched with parsed metadata and ingredients, and formatted for further analysis or model training (e.g., for recipe recommendation or nutrition prediction). USDA FoodData Central nutritional information was also integrated (outside of the shown code).

#### 1. Initial Cleaning of Recipes Dataset

- Loaded `recipes.csv` and dropped unnecessary columns:
- `AuthorId`, `TotalTime`, `AggregatedRating`, `ReviewCount`, `RecipeYield`
- Parsed ISO 8601 duration fields (`CookTime`, `PrepTime`) into total minutes using the `extract_minutes` function.
- Converted R-style list strings (e.g., `c("A", "B")`) into Python lists for:
- `Keywords`
- `RecipeInstructions`
- `Images`
- Normalized image links and instruction steps to structured lists.

#### 2. Parsing & Cleaning Ingredients Dataset

- Loaded `recipes_ingredients.csv` and selected relevant columns:
- `id`, `ingredients_raw`, `ingredients`, `serving_size`
- Sorted by `id` and removed duplicate entries.
- Used `parse_ingredient_string` to convert unstructured ingredient strings into dictionaries with:
- `quantity`, `unit`, `unitQuantity`, `unitUnit`, `name`, `description`
- Parsed the full ingredient list into structured lists of ingredient objects.

#### 3. Merging Datasets

- Merged the recipes and ingredients datasets on `RecipeId` / `id`.
- Filtered out rows that didn’t match the `1 (XXX g)` serving size format.
- Extracted numeric grams from the `serving_size` string.
- Renamed columns to use standardized names for downstream processing. Examples:
- `Name` → `name`
- `FatContent` → `total_fat`
- `RecipeInstructions` → `steps`
- `RecipeServings` → `servings`

#### 4. Final Serialization

- Converted complex fields (`ingredients`, `images`, `steps`, `tags`) to JSON strings.
- Saved the cleaned dataset as `output/parsed_recipes.csv`.

#### Final Output

A structured and normalized recipe dataset with:
- Minutes-based cooking/preparation time
- Parsed ingredients and steps
- Cleaned and structured tags, images
- Consistent naming
- Serving sizes in grams

The dataset is now suitable for analysis, machine learning, or application development.

### Getting Started

This guide will help you set up and run the Kivy-Research project locally. It assumes you're using Python ≥ 3.8 and have basic familiarity with Python and virtual environments.

#### Requirements

- Python 3.8+
- pip
- Git (to clone the repository)
- (Optional) Virtual environment tool: `venv`, `virtualenv`, or `conda`

#### Installation

##### 1. Clone the Repository

```bash
git clone https://github.com/Kivy-Infoeducatie/Kivy-Research.git
cd Kivy-Research
```

##### 2. Create a Virtual Environment

**Using venv:**
```bash
python -m venv venv
source venv/bin/activate      # On Windows: venv\Scripts\activate
```

**Using conda:**

```bash
conda create -n torch-env python=3.10
conda activate torch-env
```

##### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

> Make sure PyTorch is installed correctly based on your system and whether you use GPU or CPU. You can install it manually from https://pytorch.org/get-started/locally if needed.


## Developer Documentation Introduction

This section is for developers who want to build on top of the Kivy ecosystem. It covers API documentation, integration guides, Kivy Dev usage and API, as well as contributing to the Kivy embedded software. If you're looking to create your own apps, plugins or tools using Kivy's infrastructure or extend Kivy's existing products, start here.



{
  "openapi": "3.1.0",
  "info": {
    "title": "Recipe API",
    "description": "This API handles user authentication, API token management, and recipe-related operations. It supports advanced recipe search functionality using embedding similarity, as well as AI-generated recipe creation. Ideal for use in cooking apps, meal planners, and culinary recommendation engines.\n\n## Features\n- Register/login/logout endpoints for user authentication\n- API token lifecycle (create, list, delete)\n- Weighted search by recipe name, ingredients, and steps\n- Fine-grained similarity search using tokenized fields with weight multipliers\n- AI-powered recipe generation from prompt input\n\n## Usage Examples\nTo search for a recipe:\n```json\n{\n  \"name\": \"Tomato Soup\",\n  \"ingredients\": [\"tomato\", \"basil\"],\n  \"steps\": [\"Boil water\", \"Add tomatoes\"],\n  \"nameWeight\": 0.5,\n  \"ingredientsWeight\": 0.3,\n  \"stepsWeight\": 0.2\n}\n```\n\nTo generate a recipe:\n`POST /recipes/generate?prompt=Create a gluten-free dessert using coconut flour`",
    "version": "1.0.0"
  },
  "paths": {
    "/auth/login": {
      "post": {
        "tags": [
          "Auth"
        ],
        "summary": "Login",
        "description": "Authenticate a user using email and password.",
        "operationId": "login_auth_login_post",
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {}
              }
            }
          }
        }
      }
    },
    "/auth/register": {
      "post": {
        "tags": [
          "Auth"
        ],
        "summary": "Register",
        "description": "Register a new user account.",
        "operationId": "register_auth_register_post",
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {}
              }
            }
          }
        }
      }
    },
    "/auth/logout": {
      "post": {
        "tags": [
          "Auth"
        ],
        "summary": "Logout",
        "description": "Logout the current authenticated user.",
        "operationId": "logout_auth_logout_post",
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {}
              }
            }
          }
        }
      }
    },
    "/tokens/": {
      "get": {
        "tags": [
          "Tokens"
        ],
        "summary": "Find All Tokens",
        "description": "Retrieve all API tokens for the current user.",
        "operationId": "find_all_tokens_tokens__get",
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {}
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "Tokens"
        ],
        "summary": "Create Token",
        "description": "Generate a new API token for authenticated access.",
        "operationId": "create_token_tokens__post",
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {}
              }
            }
          }
        }
      }
    },
    "/tokens/{token_id}": {
      "delete": {
        "tags": [
          "Tokens"
        ],
        "summary": "Delete Token",
        "description": "Delete a specific API token by ID.",
        "operationId": "delete_token_tokens__token_id__delete",
        "parameters": [
          {
            "name": "token_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "title": "Token Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {}
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/recipes/search/by-name": {
      "get": {
        "summary": "Search Recipe By Name",
        "description": "Search recipes by exact or partial name match.",
        "operationId": "search_recipe_by_name_recipes_search_by_name_get",
        "parameters": [
          {
            "name": "name",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "default": "Pizza",
              "title": "Name"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {}
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/recipes/search": {
      "post": {
        "summary": "Search Recipes",
        "description": "Search for the most similar recipe based on various weighted fields.",
        "operationId": "search_recipes_recipes_search_post",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/RecipeSearchParams"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {}
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/recipes/similar": {
      "post": {
        "summary": "Similar Recipes",
        "description": "Find recipes based on detailed weighted similarity input.",
        "operationId": "similar_recipes_recipes_similar_post",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SimilaritySearchParams"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {}
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "HTTPValidationError": {
        "properties": {
          "detail": {
            "items": {
              "$ref": "#/components/schemas/ValidationError"
            },
            "type": "array",
            "title": "Detail"
          }
        },
        "type": "object",
        "title": "HTTPValidationError"
      },
      "RecipeSearchParams": {
        "properties": {
          "name": {
            "type": "string",
            "title": "Name",
            "description": "Title of the recipe.",
            "example": "Spaghetti"
          },
          "ingredients": {
            "items": {
              "type": "string"
            },
            "type": "array",
            "title": "Ingredients",
            "description": "List of ingredients.",
            "example": [
              "tomato",
              "basil",
              "garlic"
            ]
          },
          "steps": {
            "items": {
              "type": "string"
            },
            "type": "array",
            "title": "Steps",
            "description": "Preparation steps.",
            "example": [
              "Boil water",
              "Add pasta"
            ]
          },
          "nameWeight": {
            "type": "number",
            "title": "Nameweight",
            "description": "Weight of name similarity.",
            "example": 0.5
          },
          "ingredientsWeight": {
            "type": "number",
            "title": "Ingredientsweight",
            "description": "Weight of ingredient similarity.",
            "example": 0.3
          },
          "stepsWeight": {
            "type": "number",
            "title": "Stepsweight",
            "description": "Weight of steps similarity.",
            "example": 0.2
          }
        },
        "type": "object",
        "required": [
          "name",
          "ingredients",
          "steps",
          "nameWeight",
          "ingredientsWeight",
          "stepsWeight"
        ],
        "title": "RecipeSearchParams"
      },
      "SimilaritySearchParams": {
        "properties": {
          "names": {
            "items": {
              "$ref": "#/components/schemas/TextWeight"
            },
            "type": "array",
            "title": "Names",
            "description": "Weighted titles to match."
          },
          "ingredients": {
            "items": {
              "$ref": "#/components/schemas/TextWeight"
            },
            "type": "array",
            "title": "Ingredients",
            "description": "Weighted ingredients to match."
          },
          "steps": {
            "items": {
              "$ref": "#/components/schemas/TextWeight"
            },
            "type": "array",
            "title": "Steps",
            "description": "Weighted preparation steps to match."
          },
          "nameWeight": {
            "type": "number",
            "title": "Nameweight",
            "description": "Overall importance of name similarity.",
            "example": 0.4
          },
          "ingredientsWeight": {
            "type": "number",
            "title": "Ingredientsweight",
            "description": "Overall importance of ingredients similarity.",
            "example": 0.4
          },
          "stepsWeight": {
            "type": "number",
            "title": "Stepsweight",
            "description": "Overall importance of steps similarity.",
            "example": 0.2
          }
        },
        "type": "object",
        "required": [
          "names",
          "ingredients",
          "steps",
          "nameWeight",
          "ingredientsWeight",
          "stepsWeight"
        ],
        "title": "SimilaritySearchParams"
      },
      "TextWeight": {
        "properties": {
          "value": {
            "type": "string",
            "title": "Value",
            "description": "The text value to consider.",
            "example": "chicken"
          },
          "weight": {
            "type": "number",
            "title": "Weight",
            "description": "Weight assigned to this value.",
            "example": 0.7
          }
        },
        "type": "object",
        "required": [
          "value",
          "weight"
        ],
        "title": "TextWeight"
      },
      "ValidationError": {
        "properties": {
          "loc": {
            "items": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "integer"
                }
              ]
            },
            "type": "array",
            "title": "Location"
          },
          "msg": {
            "type": "string",
            "title": "Message"
          },
          "type": {
            "type": "string",
            "title": "Error Type"
          }
        },
        "type": "object",
        "required": [
          "loc",
          "msg",
          "type"
        ],
        "title": "ValidationError"
      }
    }
  }
}

import { OpenAPIViewer } from '../../../../../components/documentation/open-api-endpoints';
import openApiJson from './openapi.json';

### API Documentation

<OpenAPIViewer spec={openApiJson} />

### Overview

The Kivy Dev API is RESTful, follows OpenAPI 3.1 specifications, and is designed to integrate seamlessly with frontend clients, mobile apps, and kitchen devices like **Kivy Hub**.

#### Key Features

##### Authentication & Authorization

- Register new users
- Login and receive authentication tokens
- Logout securely to end a session
- API Tokens for secure client access, ideal for frontend or hardware integrations

##### Intelligent Recipe Tools

- Search by name: Find exact or partial matches
- Weighted search: Find recipes based on similarity of title, ingredients, and steps using custom weight parameters
- Advanced similarity: Provide lists of terms with per-term weights for refined results
- AI Recipe Generation: Use GPT-based AI to generate full recipes based on prompt input

#### Authentication

All recipe and token endpoints require Bearer token authentication in the `Authorization` header:

```
Authorization: Bearer <your_api_token>
```

Tokens can be obtained by logging in or creating API tokens via the `/tokens` endpoint.

#### Request & Response Format

- Request Body: JSON
- Response Body: JSON
- Errors: HTTP status codes with a `detail` field

Example error response:

```json
{
  "detail": "Unauthorized"
}
```

#### Available Endpoints

| Category | Path                           | Method | Description                                  |
| -------- | ------------------------------ | ------ | -------------------------------------------- |
| Auth     | `/auth/register`               | POST   | Create a new user                            |
| Auth     | `/auth/login`                  | POST   | Login with email and password                |
| Auth     | `/auth/logout`                 | POST   | Logout the current user                      |
| Tokens   | `/tokens/`                     | GET    | List all API tokens                          |
| Tokens   | `/tokens/`                     | POST   | Create a new API token                       |
| Tokens   | `/tokens/{token_id}`           | DELETE | Delete a specific API token                  |
| Recipes  | `/recipes/search/by-name`      | GET    | Find recipes by name                         |
| Recipes  | `/recipes/search`              | POST   | Search recipes with weighted field matching  |
| Recipes  | `/recipes/similar`             | POST   | Search recipes using per-term weight vectors |
| Recipes  | `/recipes/generate?prompt=...` | POST   | Generate a recipe based on AI prompt input   |













#### Cursor

A small circle that sits at the tip of the index finger colored based on the type of touch that hand does.

cursor widget

#### Hand Tracking Video

Kivy Hub provides a built-in development component for debugging hand tracking and video function. It displays the status of the model, the tracking state, the camera running state and the video input from the camera along with drawn hand landmarks.

#### Hub

To learn more about how to use the hub, check the hub widget section in the user manual.

You can customize the functionality and menu of the Hub Widget by using the `useMenu` hook. Specifically, you can control the items of the menu by using the setMenu function provided by useMenu. You can keep adding different menus in code recursively obtaining any menu configuration.

#### Target

The target widget is a basic movable component used as a control point in different scenarios. By default, it can be found inside the measure and cut tools.





#### Movable

A superset of the Selectable component that can be moved when selected, usually with a secondary touch.

##### Import

```ts
import { Movable } from 'kivy-hub/core';
```

##### Props

`Movable` already inherits all props from the `Selectable` component and adds the following:

| Prop        | Type                                | Default        | Description                                                          |
| ----------- | ----------------------------------- | -------------- | -------------------------------------------------------------------- |
| initialPos  | `{ x: number, y: number }`            | `{ x: 0, y: 0 }` | The initial screen position of the movable component.                |
| positionRef | `RefObject<{ x: number, y: number }>` | —              | An optional external reference to track and manipulate the position. |

##### Usage

```tsx
<Movable initialPos={{ x: 100, y: 150 }}>
  <div className='h-32 w-32 bg-blue-500'>Drag Me!</div>
</Movable>
```

You can also pass a positionRef to monitor or control the position externally:

```tsx
const posRef = useRef<Point>({ x: 50, y: 50 });

<Movable positionRef={posRef}>
  <SomeWidget />
</Movable>;
```

#### Screen

A screen represents a set of widgets grouped with a saved state. There can only be one screen mounted at a time. Each screen has an unique screen ID (string) and it can be mounted by that ID. The following screens are built-in Kivy Hub:

| ID              | Component            |
| --------------- | -------------------- |
| `main`          | `HomeScreen`         |
| `measure`       | `MeasureScreen`      |
| `calibration`   | `CalibrationScreen`  |
| `circle-cut`    | `CircleCutScreen`    |
| `rectangle-cut` | `RectangleCutScreen` |

You may add more screens in the `screen-context.tsx` file.

There generally aren't any base components for screens however, it is preferred you use a `<div>` or similar element that spans the entire screen. A screen component should recieve an `active` boolean prop that dictates if it is visible or not. Here is an example:

```tsx
import { cn } from '@/lib/utils';

export function NewScreen({ active }: { active: boolean }) {
  return (
    <div className={cn(!active && 'hidden')}>
      {your code here}
    </div>
  );
}
```

> [!CAUTION]
>
> If a screen holds persistent data, you should consider hiding it using styling (like in the given example). If you'd like the screen to reset every time you open it, you can hide it directly through ts, like here:

```tsx
import { cn } from '@/lib/utils';

export function NewScreen({ active }: { active: boolean }) {
  if (!active) {
    return null;
  }

  return (
    <div>
      {your code here}
    </div>
  );
}
```

#### Selectable

A versatile wrapper that catches types of touches. It listens to Kivy touch events and triggers corresponding callbacks. While being hovered, a selectable will have a white inner shadow, then when the component has been successfully touched it will have an inner shadow corresponding to the type of touch, blue for primary, green for secondary and yellow for tertiary.

##### Import

```ts
import { Selectable } from 'kivy-hub/core';
```

##### Props

| Prop               | Type                           | Default | Description                                                        |
| ------------------ | ------------------------------ | ------- | ------------------------------------------------------------------ |
| enabled            | `boolean`                        | true    | Whether the component accepts interaction events.                  |
| children           | `ReactNode`                      | —       | The child components to render inside the selectable container.    |
| ref                | `RefObject<HTMLDivElement>`      | —       | Optional ref to the root div element.                              |
| onPrimaryPress     | `(e: TouchEvent) => void`        | —       | Callback for primary-touch-down after delay.                       |
| onSecondaryPress   | `(e: TouchEvent) => void`        | —       | Callback for secondary-touch-down after delay.                     |
| onTertiaryPress    | `(e: TouchEvent) => void`        | —       | Callback for tertiary-touch-down after delay.                      |
| onPrimaryRelease   | `(e: TouchEvent) => void`        | —       | Callback for primary-touch-up if it matched the previous press.    |
| onSecondaryRelease | `(e: TouchEvent) => void`        | —       | Callback for secondary-touch-up if it matched the previous press.  |
| onTertiaryRelease  | `(e: TouchEvent) => void`        | —       | Callback for tertiary-touch-up if it matched the previous press.   |
| delay              | `number`                         | 500     | Delay in ms before a press event triggers.                         |
| forceSelect        | `boolean`                        | —       | (Unused in current code, reserved for future extension.)           |
| stopPropagation    | `boolean`                        | false   | Whether to stop propagation of custom events.                      |
| showFeedback       | `boolean`                        | true    | Whether to show visual feedback (colored glow) during interaction. |
| ...props           | `HTMLAttributes<HTMLDivElement>` | —       | Any other valid div props (e.g., className, id, etc).              |

##### Usage

```tsx
<Selectable
  onPrimaryPress={(e) => console.log('Primary pressed!', e)}
  onPrimaryRelease={(e) => console.log('Primary released!', e)}
  delay={300}
>
  <div className="w-32 h-32 bg-gray-300">Touch Me</div>
</Selectable>
```

### Getting Started

Welcome! This guide will help you set up and run the project locally on your machine.

#### Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (v18 or later recommended)
- **npm**, **yarn** or **bun**
- (Optional) **Git** if cloning from a repository

#### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/Kivy-Infoeducatie/Kivy-Hub.git
cd Kivy-Hub
```

2. **Install dependencies**

```bash
# Using npm
npm install

# using yarn
yarn install

# Using bun
bun install
```

3. **Run development server**

```bash
# Using npm
npm run dev

# using yarn
yarn dev

# Using bun
bun dev
```



#### Event System

An important part of the Kivy Hub flow is how events are handled. Events are usually processed in three steps:

1. The user triggers a global pose or a touch either through the hand recognition system or by using the mouse and keyboard in the web environment.

2. Through an event propagation function, all elements at the point where the event was triggered are gathered and sorted by z-index. For an element to be taken into consideration, it must have a `data-can-interact` prop in HTML containing a 3-bit mask (eg. 011), each digit allowing for a type of touch. For example, if an element has the mask 101, then it can get triggered by primary and tertiary touches. After the elements are sorted, the first one is taken and, through the JS event system, an event is triggered for that element. These events have props and types (enter and exit).

3. The event is locally handled by the component.

##### Event types

| Event name             | Description                                                                                                         |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------- |
| "primary-touch-down"   | Triggered when a primary touch enters the area of the widget (this doesn't mean a primary touch gets triggered)     |
| "primary-touch-up"     | Triggered when a primary touch exits the area of the widget                                                         |
| "secondary-touch-down" | Triggered when a secondary touch enters the area of the widget (this doesn't mean a secondary touch gets triggered) |
| "secondary-touch-up"   | Triggered when a secondary touch exits the area of the widget                                                       |
| "tertiary-touch-down"  | Triggered when a tertiary touch enters the area of the widget (this doesn't mean a tertiary touch gets triggered)   |
| "tertiatry-touch-up"   | Triggered when a tertiary touch exits the area of the widget                                                        |
| "no-touch"             | Internally used as the state value if the widget isn't touched by any touch type                                    |

##### Event body

The event contains a details prop with the following properties:

| Name      | Optional | Description                                                    |
| --------- | -------- | -------------------------------------------------------------- |
| clientX   | no       | The X coordinate where the event was dispatched                |
| clientY   | no       | The Y coordinate where the event was dispatched                |
| type      | no       | Either "hand" or "mouse", based on how the event was triggered |
| handIndex | yes      | Only for type = "hand"                                         |

##### Global Event Registry

Apart from the default event handling inside Kivy, you may also manually register and remove functions from certain events that are globally managed separately from the rest.

Currently, the only event available in the event registry is 'touch-move', which is triggered whenever the cursor or mouse moves.

To get access to the event registry, check the input section in the interaction documentation.

###### Mounting an Event

```ts
function myFunction(e) {
  console.log("event-name triggered: ", e);
}

eventRegistry.on("event-name", myFunction);
```

###### Dismounting an Event

```ts
eventRegistry.off("event-name", myFunction);
```

###### Best Practice

To ensure that all events are mounted and dismounted correctly, the best way to set up events in the event registry inside react components is by using an `useEffect` hook like so:

```ts
useEffect(() => {
  function myFunction(e) {
    console.log("event-name triggered: ", e);
  }

  eventRegistry.on("event-name", myFunction);

  return () => {
    eventRegistry.off("event-name", myFunction);
  };
}, []);
```

Use this snippet inside your react components.

#### Mouse Interaction

For demo / testing / development purposes, Kivy Hub also allows triggering touches through the mouse.

To trigger a primary touch, press left click. To trigger a secondary touch, press right click. To trigger a tertiary touch, press ctrl / cmd + left click.

#### Input Context

To have access to the different data provided by the user within code, Kivy Hub provides a general hook called `useHandTracking`. It provides multiple functions and sub hooks for almost all use cases.

##### Importing

```ts
import { useHandTracking } from 'kivy-hub/core';
```

##### Accessing the MediaPipe Hand tracking Model

You can access the MediaPipe model through the `handTracker` property:

```ts
const { handTracker } = useHandTracking();
```

##### Getting the MediaPipe Model Status

You can access the MediaPipe model through the `modelStatus` property:

```ts
const { modelStatus } = useHandTracking();
```

##### Toggling Tracking and Hand Input

The `toggleTracking` function provides an easy way to completely turn on / off the tracking performed by MediaPipe, completely disabling all input through hands:

```ts
const { toggleTracking } = useHandTracking();

toggleTracking();
```

##### Accessing Raw MediaPipe Data

You can access raw MediaPipe data (the list of hands and landmarks) as a list of numbers directly through a `RefObject` called `rawLandMarksRef`:

```ts
const { rawLandmarksRef } = useHandTracking();
```

The raw landmarks are in three dimensions and have the following type:

```ts
import { RefObject } from 'react';
interface NormalizedLandmark {
  x: number;
  y: number;
  z: number;
  visibility?: number;
}

type RawLandmarks = NormalizedLandmark[][];

type RawLandmarksRef = RefObject<RawLandmarks>;
```

##### Accessing Parsed Hand Data

The parsed landmarks can be accessed as a `RefObject` called landmarksRef which is a list ofHandLandMarks:

```ts
const { landmarksRef } = useHandTracking();
```

```ts
type LandmarkPoint = {
  x: number;
  y: number;
};

interface HandLandmarks {
  wrist: LandmarkPoint;
  thumb: {
    cmc: LandmarkPoint;
    mcp: LandmarkPoint;
    ip: LandmarkPoint;
    tip: LandmarkPoint;
  };
  index: {
    mcp: LandmarkPoint;
    pip: LandmarkPoint;
    dip: LandmarkPoint;
    tip: LandmarkPoint;
  };
  middle: {
    mcp: LandmarkPoint;
    pip: LandmarkPoint;
    dip: LandmarkPoint;
    tip: LandmarkPoint;
  };
  ring: {
    mcp: LandmarkPoint;
    pip: LandmarkPoint;
    dip: LandmarkPoint;
    tip: LandmarkPoint;
  };
  pinky: {
    mcp: LandmarkPoint;
    pip: LandmarkPoint;
    dip: LandmarkPoint;
    tip: LandmarkPoint;
  };
}
```

##### Getting Current Hand Event Touch Type

The touch type for all available hands can be accessed through the `handEventsRef` property which is a `RefObject`. It represents a list of HandEvent elements:

```ts
enum HandEvent {
  NO_TOUCH = -1,
  PRIMARY_TOUCH,
  SECONDARY_TOUCH,
  TERTIARY_TOUCH
}
```

```ts
const { handEventsRef } = useHandTracking();
```

##### Getting Video Input

To get video input from the camera, you can use the `videoRef` prop:

```ts
const { videoRef } = useHandTracking();
```

##### Accessing the Event Registry

You can access the event registry through the `eventRegistryRef`.

```ts
const { eventRegistryRef } = useHandTracking();
```

##### Getting the Mouse Position for the Web Interface

Usually, to access the mouse position in a web environment you have to register a window event with mousemove and keep track of the mouse position yourself. Kivy provides a reference to the mouse position that can be accessed through the `mousePositionRef` prop:

```ts
const { mousePositionRef } = useHandTracking();
```

##### Check If Tracking Is Running

You can check if the tracking process is running through the `isTracking` prop:

```ts
const { isTracking } = useHandTracking();
```

##### Check If the Camera Is On

You can check if the camera is running through the `webcamRunning` prop:

```ts
const { webcamRunning } = useHandTracking();
```

### Introduction to Kivy Hub Development

Kivy Hub is one of the main parts of the Kivy ecosystem. It is specifically built to make it as easy as possible to extend with new components and functionality, not only by us, the developer team, but also the community.

This part of the documentation describes how the core of Kivy Hub works. The main parts of Kivy Hub are:

1. The interaction system

2. Core components (used to build widgets)

3. Built-in components



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
