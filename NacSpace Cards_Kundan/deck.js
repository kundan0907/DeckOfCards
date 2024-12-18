// Card class with a suit and rank
export class Card {
    constructor(suit, rank) {
        this.suit = suit; // give the suit of the card (e.g., Hearts, Diamonds)
        this.rank = rank; // give the rank of the card (e.g., A, 2, 3, ..., K)
    }
}

// Deck class shows collection of player cards
export class Deck {
    constructor() {
        this.cards = []; //hold all cards in the deck
        this.drawnCards = []; //  keep track of drawn cards
        this.initializeDeck(); // Initialize  deck with cards
        this.shuffle(); // Shuffle upon creation
    }

    //initialize the deck with 52 standard playing cards
    initializeDeck() {
        const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades']; 
        const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']; 
        for (let suit of suits) { // Loop through each suit
            for (let rank of ranks) { // Loop through each rank
                this.cards.push(new Card(suit, rank)); // create a new card and add it to the deck
            }
        }
    }

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) { // Loop backwards through the array
            const j = Math.floor(Math.random() * (i + 1)); // Generate a random index
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]]; // Swap cards at indices i and j
        }
    }

    // cut the deck at a random point, rearrange it and also remove a random number of cards
    cut() {
        const cutIndex = Math.floor(Math.random() * this.cards.length); 
        const numCardsToRemove = Math.floor(Math.random() * (this.cards.length - cutIndex)) + 1; // random number of cards to remove after cut index
        // moving the cut portion to the front
        this.cards = [...this.cards.slice(cutIndex + numCardsToRemove), ...this.cards.slice(0, cutIndex)];
    }

    // draw a single card
    drawCard() {
        if (this.cards.length === 0) return null; 
        const card = this.cards.pop(); 
        this.drawnCards.push(card); // Add drawn card 
        return card; 
    }

    // Method to draw multiple cards
    drawCards(number) {
        const drawnCards = []; //hold drawn cards
        for (let i = 0; i < number; i++) { // Loop for specified number of draws
            const card = this.drawCard(); // Draw 1 card
            if (card) drawnCards.push(card); // If card drawn, add to  array
        }
        return drawnCards; 
    }


    remainingCards() {
        return this.cards.length; 
    }

    //  reset deck and shuffling again
    resetDeck() {
        this.cards = [...this.cards, ...this.drawnCards]; // add drawn cards back into main deck array
        this.drawnCards = []; // clear drawn cards
        this.shuffle(); // Shuffle
    }
}
