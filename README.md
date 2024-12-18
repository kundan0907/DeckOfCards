# Project Overview
# NacSpace Card Games

## Description

NacSpace Card Games is a web-based application offering Poker and Blackjack games. Built with HTML, CSS, and JavaScript, it features an intuitive UI and implements core card game logics.

## Features
- Play Poker or Blackjack
- Deck management (shuffle, cut, deal)
- Visual card representation
- Hand evaluation and winner determination

## Installation
1. Clone the repository into vscode
2. Open `index.html` and click on Go live or Show Preview

## Usage
- Select a game from the home page
- Use the game controls to shuffle, cut, and deal cards
- Follow on-screen instructions for gameplay

## Technologies Used
- HTML
- CSS
- JavaScript

## More in detail about the project

### File Structure

The project consists of the following main files:

- index.html: The main HTML file that structures the user interface.
  
- styles.css: Contains all the styling for the application.

- script.js: The main JavaScript file that handles game logic and UI interactions.
  
- deck.js: Contains the Deck class for managing the card deck.

- games.js: Includes the PokerGame and BlackjackGame classes and implementations. (more such card game logics can be added here)

### HTML Structure (index.html)

The HTML file defines the structure of the application, including:
- A home page with game selection buttons
- A game area with controls for shuffling, cutting, and dealing cards
- Player hands and game information display
- Buttons for game actions and navigation
  
### JavaScript Implementation (script.js)

#### Key Components

- Deck Management:
  
  - let deck = new Deck();
    This creates a new instance of the Deck class to manage the card deck

- Game Instance:
  - let currentGame;
This variable holds the current game instance (either Poker or Blackjack)
.
- UI Functions:
  - showHomePage() and showGameArea(): Toggle visibility of home and game areas.
- updateUI(): Updates the game state in the UI, including player hands and game information.
- createCardElement(card): Creates a visual representation of a card.
 #### Game Logic:

- startGame(gameType): Initializes a new game based on the selected type.
  
- resetGame(gameType): Resets the game and deck.
  
- updatePlayerHands() and updateHandRanks(): Update the UI with current game state.
  

 
#### Object-Oriented Programming (OOP) Concepts

#### The project extensively uses OOP principles:

- #### Inheritance:
  - class PokerGame extends CardGame
Both PokerGame and BlackjackGame inherit from a base CardGame class
.
- #### Encapsulation:
    - Game logic is encapsulated within respective game classes.
  
- #### Polymorphism:
  
    - Methods like deal() and evaluateWinner() are implemented differently in PokerGame and BlackjackGame to support the different game logics.
  
- #### Abstraction:
    - The CardGame class in "games.js" provides an abstract interface for card games.
  
#### Game Logic Implementation

#### Poker
- #### Hand Evaluation:
  - #### evaluateHand(hand) 
  - // Implementation for evaluating poker hands
  
   - This method determines the rank of a poker hand
.
- #### Winner Determination:
- #### evaluateWinner() 
    - // Compare hand ranks and high cards

    - Compares the hands of both players to determine the winner
.
#### Blackjack
- #### Hit and Stand:
  - #### hit() { /* ... */ }
  - #### stand() { /* ... */ }
  - #### These methods implement the core Blackjack actions.
- #### Game Flow:
  - The game alternates between players and checks for bust conditions.
 
# Getting Started

## Game Selection

### Main Menu
- **Poker Button**: Click this button to start a game of Poker.
- **Blackjack Button**: Click this button to start a game of Blackjack.

## Gameplay Instructions

### General Gameplay
- The game will display the current player hands, remaining cards in the deck, and any results or messages.
- Players will take turns based on the game rules specific to Poker or Blackjack.
  
## Game-Specific Instructions

### Poker Rules
- Each player is dealt five cards.
- Players evaluate their hands based on standard poker rankings (e.g., Royal Flush, Straight Flush).
- The player with the highest-ranking hand wins.

### Blackjack Rules
- Each player starts with two cards; they can choose to "hit" (draw another card) or "stand" (keep their current hand).
- The goal is to have a hand value closer to 21 than that of other player without exceeding it (busting).
- Card values are as follows:
  - Number cards are worth their face value.
  - Face cards (J, Q, K) are worth 10 points.
  - Aces can be worth either 1 or 11 points.

### Buttons and Their Functions

#### Home Page Controls
- **Poker Button**: Starts a new Poker game.
- **Blackjack Button**: Starts a new Blackjack game.

#### Game Area Controls
- **Shuffle Button**: Randomizes the order of cards in the deck.
  - **Functionality**: Clicking this button shuffles the deck order
- **Cut Button**: Cuts the deck at a random point.
  - **Functionality**: Clicking this button rearranges the deck by cutting it at a random position.
- **Deal Button**: Deals cards to players based on the game type.
  - **Functionality**: If there are fewer than 10 cards left in the deck, you will be prompted to reset the deck. Otherwise, it deals cards according to the rules of the current game.
- **Reload Deck Button**: Resets the deck back to its original state of 52 cards.
  - **Functionality**: Clicking this button reloads the deck and shuffles it for a fresh start.
- **Hit Button (Blackjack only)**: Draws an additional card from the deck for the current player.
  - **Functionality**: If it’s your turn and you haven’t stood yet, clicking this button adds another card to your hand.
- **Stand Button (Blackjack only)**: Ends your turn without drawing more cards.
  - **Functionality**: Clicking this button signals that you are satisfied with your hand and do not wish to draw further cards.
- **Reset Game Button**: Resets the current game and returns to the game selection screen.
  - **Functionality**: This button allows you to start over with a new game without refreshing the page.

### Display Elements
- **Remaining Cards**: Displays how many cards are left in the deck.
  
- **Player Hands**: Shows each player's current hand of cards.
  
- **Result Area**: Displays messages about who wins or if there’s a tie after each round.


