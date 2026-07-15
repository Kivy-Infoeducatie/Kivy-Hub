


## User Manual Introduction

This section is designed for everyday users who want to explore the Kivy platform to improve their cooking, nutrition and overall health. It includes guides on using the Kivy App, Kivy Hub hardware and software, generating personalized recipes, using features like the AI assistant and nutrition planner, navigating the site and much more. Whether you’re a casual home cook or a health enthusiast, this is where you’ll learn how to get the most out of Kivy.



### Introduction

The Kivy App is a mobile nutrition platform that combines traditional health tracking features with artificial intelligence to support a healthier lifestyle. Integrated into the broader Kivy ecosystem—which includes AI models and hardware like the Kivy Hub—the app offers a personalized, modular experience focused on nutrition, fitness, and daily wellness.

With features like an interactive dashboard, AI-powered recipe recommendations, goal tracking, and a social recipe network, the Kivy App is designed to be both intelligent and user-centric. This documentation provides an overview of its structure, functionality, and customization options for developers and contributors.



#### AI Tab

The AI tab allows the user to interact with the AI tools provided by the Kivy ecosystem through the mobile app. It contains a chat where you can write prompts such as `Generate a pancakes recipe`.

cook-ai

chat

#### Calorie Intake

Calories can be managed within the Kivy App by accessing the Calorie Intake and Calorie Logging sections.

##### Calorie Intake

Through the Calorie Intake section, we can see metrics about the calories consumed today, such as: consumed, active energy burned, net calories and remaining. We can also set a goal for calories and see today's logs (each calorie intake logged by the user). We can also see a 30-day history for calorie intake.

calorie-intake

calorie-intake-2

##### Log Calories

As mentioned, we can log calorie intake using either the precision wheel which allows custom values or use one of the predefined buttons.

log-calories

#### Goals Tab

The goals tab shows current targets for steps, distance, water consumption, calories and more. Here you can also edit, add and delete goals.

goals

#### Home Tab

The main interface functions as an interactive and modular dashboard. Users can add, remove and rearrange widgets of different sizes (small, medium, large) to adapt the display to their personal health goals. Key features include:

home

- visual progress indicators for daily metrics like calories, steps and distance
- a daily recipe suggestion for culinary inspiration
- personalized recommendations based on nutritional preferences
- an AI nutritional assistant capable of answering dietary questions and generating meal plans
- and a shopping list that consolidates ingredients in selected recipes.

##### Widgets

All widgets are available in three sizes, small medium and large. Two small widgets may be placed on the same row. To add a new widget, press on the edit widgets button.

widgets

You can re-arrange the widgets by using the edit widgets sheet. Consecutive small widgets will automatically go on the same row.

To add a new widget, press on the corresponding button in the bottom part of the edit widgets view.

###### Goals

The goals widget allows you to view your calories, steps, distance, water consumption and other metrics.

goals-sm

goals-md

goals-lg

###### Featured Recipe

The featured recipe widget allows you to view the currently set featured recipes inside Kivy. Featured recipe are the same globally for all users.

feat-sm

feat-md

feat-lg

###### Suggested Recipes

Suggested recipes widget are another recipe viewer component that recommend based on your previous interaction and set preferences within the Kivy ecosystem.

sug-sm

sug-md

sug-lg

###### Ask AI

The ask AI widget provides one or more suggested questions to ask Cook AI, the AI model within the Kivy App.

ai-sm

ai-md

ai-lg

###### Shopping List

The shopping list shows you items currently in your shopping list and allows you to cross them off.

shop-sm

shop-md

shop-lg

#### Login / Register

The login / register section allows the user to authenticate inside the Kivy App.

#### Login

login

To log in inside the app, the user must fill out the email and password fields and then press the login button. If the password is incorrect or the user isn't found, a proper error will be displayed.

register

To register, the user must fill out the username, email first name, last name and password then hit register. If a user with this email already exists, a proper message will be displayed.

#### Recipe Tab

The recipe tab allows the user to browse for new recipes they want to try out.

recipes

It also displays featured recipes and recommended recipes.

featured

#### Recipe

When you open a recipe, multiple characteristics are shown about it. The properties of a recipe are grouped in four categories: Header, AI, comments and Steps.

The header shows general information, such as cooking time, difficulty, calories etc. You can also bookmark the recipe here to save it.

recipe-head

The AI allows talking about the current recipe, editing it and other such actions.

The comments section shows comments other people have posted.

recipe-ai

The steps section shows the actions you have to take to complete the recipe.

recipe-steps

#### Search Tab

The search tab allows the user to find recipes inside the Kivy recipe database.

The search menu also shows recent searches.

search-keyboard

After searching, you can see the results.

search-result

To find better recipes for your use case, you can also filter recipes.

search-filter

#### Settings

The settings menu allows you to change account settings (email, user, name etc.) and nutrition preferences (allergens, preferences, height etc.)

account

edit-preferences

edit-profile

#### Water Intake

Consumed water can be managed within the Kivy App by accessing the Water Intake and Water Logging sections.

##### Water Intake

Through the Water Intake section, we can see metrics about the water consumed today. We can see a 30-day history as well as water logged in the past few days

water-intake

##### Log Water

As mentioned, we can log water consumed using either the precision wheel which allows custom values or use one of the predefined buttons.

log-water



### Getting Started

This section provides a comprehensive guide to the initial setup of the Kivy Hub hardware. It covers all necessary steps to correctly install and configure the projector, camera, and processing unit to ensure optimal performance. Clear and detailed instructions will help you prepare the system for reliable, hands-free interaction with the projected interface. Proper setup is essential to maximize the accuracy and responsiveness of the device in your workspace. Please follow the guidelines carefully to facilitate a smooth installation process and immediate use.

#### Kivy Hub structure

Kivy Hub is made out of two separate parts. One is called the **hub**. It is a plastic rectangular container that can be plugged in a power socket, that's where the brain of Kivy Hub is. The second part is called the **support**. It is a big L-shaped support structure that holds the projector and camera in place. It can also be folded for easier transport.

For future reference, we'll also define the different parts of the **support**.

1. The base - The bottom part of Kivy Hub, the one it sits on.

2. The wall - The lateral side of Kivy Hub, the thing the projector and camera sit on.

3. The bolts - Two metal sliding bolts that sit at the bottom side of the wall on the left and on the right. They are used to make sure the wall doesn't fall over.

4. The projector

5. The camera

#### Setting Up

As long as you follow the steps, setting up Kivy Hub is easy

##### 1. Plug in the hub

Go to a power outlet and plug the hub in. If it was set up correctly, it should emit green and red colors through its internal LED and after at most one minute it should start a green flickering light.

##### 2. Open the support

Put the support on the ground and get a hold of the wall. Drag the wall upwards until it is perpendicular to the ground. When you're done, take the bolts and push them down until they go through both holes (the bolts should ho all the way) and then lock them by dragging them to the left or to the right.

> [!WARNING]
>
> Make sure whenever you move the wall, the bolts are raised up, under tension. Otherwise, the bolts, the wall, the holes of the bolts or the base might get damaged.

##### 3. Power up the projector

Press the power button located on the top of the projector. The projection should start, and you should see a menu. Kivy can be used either wireless or through HDMI. While both versions work, we recommend using cable connection for a smoother experience. Connect the projector and the camera through your preferred way. For more information, please consult the projector manual.

##### 4. Setting up the projection (optional)

Make sure that the placement of the projection isn't in a very bright room, and preferably at most 70 cm from the projection surface. If the surface is further away, you can adjust the focus using the wheel on the lens. You may also change the scale of the projection in the projector settings. If needed, you may also adjust the projection angle either manually or by using the settings. Please make sure that the camera is also correctly positioned.

##### 5. Calibration

Once you have successfully opened Kivy Hub, open the calibration menu and run the algorithm. When it is done, test that there is a dot following the tip of your finger.

##### All done!

You may now start using Kivy Hub. Please refer to the rest of the documentation on how to use the device. For a good understanding of how the device works, we recommend going through each section in the same order as the documentation. You can start with learning how to interact with Kivy Hub here.

### Interaction

Interaction with Kivy Hub is done only through hand recognition. While you may use multiple hands, we recommend using only one hand for interaction. Currently, there are two ways of giving input to Kivy Hub through your hands.

#### Touches

You may have noticed that there is a colored dot following your hand around everywhere while you're moving around the work area. That circle is called a **cursor**, it can have three colors, each representing a different type of touch used to interact with **widgets** as follows:

1. Primary touch - blue (activates the primary action of a widget)

2. Secondary touch - green (usually reserved for moving widgets but can do different things)

3. Tertiary touch - yellow (usually activates a secondary action or opens a menu on a widget)

The different types of touches are used to interact with the different widgets and tools within Kivy Hub. While there are a few guidelines, we recommend the primary touch is a main interaction, secondary touch moves the widget and tertiary touch is either disabled or activates some kind of menu or second action.

A touch usually works in the following way: you first place your hand in the position corresponding to the touch you want to trigger. After the desired touch is triggered, move the cursor over the widget and hold it for a set amount of time (by default half a second) and after that the widget will trigger the specified action.

> [!NOTE]
>
> When starting a touch action, don't have the cursor over the widget you want to interact with at first; otherwise the touch might be canceled. This was done to avoid accidental touches when the camera things you have briefly changed your hand position, even by accident.

Kivy uses a system that tracks your hands using the camera and looks at where your hand is and how your fingers are positioned. Based on how you move them, you can trigger different kinds of touches. A primary touch is the default. It occurs when you point your index finger upwards and no other finger. A secondary touch is triggered when you get your thumb and index finger close together. It has the biggest priority, so it will override other touches. A tertiary touch occurs when you hold out your index and middle finger.

Using these hand positions, you can trigger all three types of touches and interact with most of the Kivy Hub application.

If you're interested in interacting with the web version of kivy, check out mouse interaction in the developer documentation.

#### Global poses

While the touch system covers 99% of the interaction you'll be doing, there might be times when you either can't interact directly because the hardware is not calibrated, or it is simply more convenient to do something without touches. For these cases, we use global poses.

A global pose is a kind of predefined hand placement that you have to hold out for a set amount of time to trigger a global action, such as triggering the calibration menu or shutting down Kivy Hub.

By default, the following global poses are defined:

1. Calibration menu - hold your thumb forwards and have the rest of your fist closed.

2. Shut down - make a rock sign perpendicular with the further side of the projection from you.

### Introduction to Kivy Hub

Imagine turning your kitchen counter or a classroom table into a smart, interactive workspace—no touchscreens, no buttons, just your hands and a clean surface.

The Kivy Hub is a powerful tool that projects an interactive interface directly onto any flat surface. You can browse recipes, set timers, cut virtual grids and much more—all with simple hand gestures in mid-air. It’s like having a digital assistant at your fingertips, without needing to touch a single thing.

Whether you’re cooking a meal, teaching a class or working on a creative project, the Kivy Hub adapts to your environment. It brings a new level of convenience and cleanliness to digital interaction—especially in places where touch isn’t practical.

This user manual will help you get the most out of your experience with the Kivy Hub. It’s structured to walk you through everything from setting up and using the hardware, to interacting with the projected screen, moving and controlling digital tools, and using the built-in widgets.

To learn how to set up Kivy Hub and start using it, head to the Getting Started section.



#### Calibration Tool

The calibration tool is an overlay that covers the whole screen with a white surface containing four qr-like (aruco) tags. It needs to be used whenever the camera, projector or structure are moved, re-positioned, re-aligned etc. This is also the only screen that moves the hub widget in the middle of the screen.

calibration tool

##### Access

To access the calibration tool, first primary touch the hub widget, then select the option with a gear on it. This should open the overlay. The calibration tool can also be accessed through a global pose by holding your thumb forwards and have the rest of your fist closed.

##### Usage

To use the calibration tool, you have to open it, and it will go back automatically when it is done with an appropriate message. If you wish to cancel the calibration process, either use the menu in the center and switch to home.


#### Ellipse Cutting Tool

The ellipse cutting tool is an overlay that covers the screen with an ellipse shape aligned to the axis. It can be used when you need to split a shape into slices like a pizza or a round cake.

ellipse cutting tool

##### Access

To access the ellipse cutting tool, first primary touch the hub widget, then select the option with a knife on it. This should open a secondary menu where you have to pick the circle shape.

##### Usage

After you open the tool, you will see that there are two targets you can move around. The ellipse is projected to perfectly fit in the rectangle determined by these two targets. There are three radius lengths that split the ellipse into three equal radius parts starting from the center. There are also multiple lines going outwards starting from the center for cutting different numbers of slices, as follows:

| Color | Slice count |
| ----- | ----------- |
| Aqua  | 4           |
| Red   | 6           |
| Green | 8           |

#### Grid Cutting Tool

The grid cutting tool is an overlay that covers the whole screen with a 2D rectangular grid. It can be used when you need to split a shape into multiple smaller rectangles of the same size, like a pie or a cake.

grid cutting tool

##### Access

To access the grid cutting tool, first primary touch the hub widget, then select the option with a knife on it. This should open a secondary menu where you have to pick the rectangle shape.

##### Usage

After you open the tool, you will see that there are two targets you can move around. The rectangle defined by the centers of these two targets will determine how the grid will look. You can also see the length of the sides of the rectangle for precise measurements. When you're done measuring, primary touch the hub again to go back to home.

#### Measure Tool

The measure tool is an overlay that covers the screen with a right triangle. It can be used to measure lengths, angles, arc lengths, check perpendicularity and more.

measure tool

##### Access

To access the measure tool, primary touch the hub widget, then select the option with a ruler on it.

##### Usage

After you open the tool, you will see that there are two targets you can move around. The triangle defined by these two points will show different metrics such as the distance between the targets, the angle the targets sit at, the middle point between them, lines parallel to the axis system going from a point to another and a circle with the origin in the first point ending at the second point.

#### Recipe Select Tool

For now, the recipe select tool is a quick way of changing the active recipe displayed by the recipe widget.

##### Access

To access the recipe select tool, primary touch the hub widget, then select the option with a book on it. This should open a secondary menu where you have to pick the recipe you want to use.

Currently, the recipes available in Kivy Hub are: Honey Garlic Chicken Thighs, Mediterranean Quinoa Salad, Creamy Tomato Basil Soup, Classic Margherita Pizza and Avocado Toast with Lemon (default).

### Widgets and Moving Widgets

Widgets are one of the core components of Kivy Hub. They are floating mini applications such as timers, the recipe view and even the main hub that you can usually move around and interact with. Basically, almost every thing on the Kivy Hub screen is a widget.

One of the most important things when using widgets is knowing how to move them around. To do so, you can follow some simple steps.

#### 1. Making a secondary touch

Use your thumb and index finger to make a secondary touch. If you don't know what that is, check out the documentation on how to interact with widgets.

#### 2. Moving

While hovering over the widget with a secondary touch, move the cursor slowly without exiting the area of the widget until you reach the target destination. When you're done, simply "release" the secondary touch by making a primary touch.



#### Hub Widget

The hub widget is the main menu of Kivy Hub. It allows users to navigate between screens, add widgets and many more. You can open the menu using a primary touch to reveal its options as white floating circles around it. You can press these options to trigger different actions or to further open more menus with multiple options. Usually, there will also be a back button on the hub itself allowing you to cancel or go back. The hub widget isn't movable.

hub

##### Menu Options

The hub widget has the following options:

1. Timer menu - allows you to add a timer with a given duration to the screen

2. Measure menu - Opens the measure tool

3. Cutting menu - Reveals two more options, one for using the grid cutting tool and one for using the ellipse cutting tool

4. Cook book menu - Reveals multiple options that allow you to select a different recipe

5. Calibration menu - Opens the calibration tool

#### Recipe Widget

The recipe widget is a static menu where you can visualize the current active recipe. It allows you to view the steps, the name, the description, duration, nutritional info, portion size, ingredients and more.

You can change the recipe by using the recipe select tool.

recipe widget

#### Timer Widget

The timer widget is a movable medium sized card that allows you to set a timer for a given duration. The timer has a name which you can see on the first line, a time left display, an expected finish time, displayed under time left after the timer has been started and two buttons. Timers show their progress through a bar that changes both width and color based on the progress to t = 0.

timer widget

##### Adding a Timer

To add a timer, first primary touch the hub widget, then select the option with a timer on it. This should open a secondary menu where you have to pick the amount of time you want.

##### Using a Timer

Every timer has two buttons that you can primary press. Their functionality changes based on the state of the timer. The first button will start the timer if it is stopped and will stop it if it is started. The second button will reset the timer if it has been started and stop it if it is running, and will delete the timer if it is reseted (no second passed on the timer).

##### Using Timer Stacks

By default, all timers group in a stack for easier and more organized access. You can tertiary touch on the stack to collapse / expand them and access individual timers. The first timer in the stack is considered the main timer and will always be accessible. If the main timer is deleted, the one below it will become the main one.

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