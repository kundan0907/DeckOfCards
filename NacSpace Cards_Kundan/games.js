// Base class for card games, managing the deck and players' hands
class CardGame {
    constructor(deck) {
        this.deck = deck; // Initialize with a deck of cards
        this.hands = [[], []]; // Create empty hands for two players
    }

    // Abstract method to deal cards
    deal() {
        throw new Error("Method 'deal()' must be implemented.");
    }

    // evaluate the winner
    evaluateWinner() {
        throw new Error("Method 'evaluateWinner()' must be implemented.");
    }

    getHands() {
        return this.hands;
    }

    // get hand ranks
    getHandRanks() {
        throw new Error("Method 'getHandRanks()' must be implemented.");
    }
}

// Poker Game Implementation extending CardGame

export class PokerGame extends CardGame {
    // Deal 5 cards to each player
    deal() {
        this.hands = [this.deck.drawCards(5), this.deck.drawCards(5)];
    }

    // evaluate winner based on hand ranks and high cards if needed
    evaluateWinner() {
        const rank1 = this.evaluateHand(this.hands[0]);
        const rank2 = this.evaluateHand(this.hands[1]);

        if (rank1 > rank2) return "Player 1 wins!";
        if (rank2 > rank1) return "Player 2 wins!";
        else return "Its a tie!";

    }

    //     // If both have  same hand rank, check high card value
    //     const highCardComparison = this.compareHighCards(this.hands[0], this.hands[1]);
    //     return highCardComparison === "Player 1" ? "Player 1 wins by high card!" :
    //            highCardComparison === "Player 2" ? "Player 2 wins by high card!" :
    //            "It's a tie!";
   

    // return a numerical rank
    evaluateHand(hand) {
        const ranks = hand.map(card => card.rank);
        const suits = hand.map(card => card.suit);

        if (this.isRoyalFlush(hand)) return 10;
        if (this.isStraightFlush(hand)) return 9;
        if (this.isFourOfAKind(hand)) return 8;
        if (this.isFullHouse(hand)) return 7;
        if (this.isFlush(hand)) return 6;
        if (this.isStraight(hand)) return 5;
        if (this.isThreeOfAKind(hand)) return 4;
        if (this.isTwoPair(hand)) return 3;
        if (this.isOnePair(hand)) return 2;

        return 1; // High card
    }

    // ranks for each player's hand
    getHandRanks() {
        return this.hands.map(hand => {
            const rank = this.evaluateHand(hand);
            switch (rank) {
                case 10: return "Royal Flush";
                case 9: return "Straight Flush";
                case 8: return "Four of a Kind";
                case 7: return "Full House";
                case 6: return "Flush";
                case 5: return "Straight";
                case 4: return "Three of a Kind";
                case 3: return "Two Pair";
                case 2: return "One Pair";
                default: return "High Card";
            }
        });
    }

    // Check Royal Flush
    isRoyalFlush(hand) {
        const suits = hand.map(card => card.suit);
        const ranks = hand.map(card => card.rank).sort((a, b) => a - b);
        
        const isSameSuit = new Set(suits).size === 1; // cards must be of  same suit
        const royalRanks = ['10', 'J', 'Q', 'K', 'A']; // needed ranks for Royal Flush

        const hasAllRoyalRanks = royalRanks.every(rank => ranks.includes(rank));
        
        return isSameSuit && hasAllRoyalRanks; //  if both conditions are met
    }

    isStraightFlush(hand) {
        return this.isFlush(hand) && this.isStraight(hand);
    }

    isFourOfAKind(hand) {
        const ranksCount = {};
        
        hand.forEach(card => ranksCount[card.rank] ? ranksCount[card.rank]++ : ranksCount[card.rank] = 1);
        
        return Object.values(ranksCount).includes(4); //checks if any rank appears four times
    }

    isFullHouse(hand) {
        const ranksCount = {};
        
        hand.forEach(card => ranksCount[card.rank] ? ranksCount[card.rank]++ : ranksCount[card.rank] = 1);
        
        const values = Object.values(ranksCount);
        
        return values.includes(3) && values.includes(2); // must have three of one rank and two of another
    }

    isFlush(hand) {
        const suits = hand.map(card => card.suit);
        
        return new Set(suits).size === 1; //  cards must be of the same suit
    }

    isStraight(hand) {
        const ranksOrder = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        
        let handRanksIndexs = hand.map(card => ranksOrder.indexOf(card.rank)).sort((a, b) => a - b);
        
        for (let i = 0; i < handRanksIndexs.length - 1; i++) {
            if (handRanksIndexs[i] + 1 !== handRanksIndexs[i + 1]) { 
                return false; 
            }
        }
        
        return true; 
    }

    isThreeOfAKind(hand) {
        const ranksCount = {};
        
        hand.forEach(card => ranksCount[card.rank] ? ranksCount[card.rank]++ : ranksCount[card.rank] = 1);
        
        return Object.values(ranksCount).includes(3); // Check if any rank appears three times
    }

    isTwoPair(hand) {
         const ranksCount = {};
         
         hand.forEach(card => ranksCount[card.rank] ? ranksCount[card.rank]++ : ranksCount[card.rank] = 1);
         
         const values = Object.values(ranksCount);
         
         return values.filter(count => count === 2).length === 2; // Must have two different pairs
     }

     isOnePair(hand) {
         const ranksCount = {};
         
         hand.forEach(card => ranksCount[card.rank] ? ranksCount[card.rank]++ : ranksCount[card.rank] = 1);
         
         return Object.values(ranksCount).includes(2); // Check if any rank appears two times
     }

    // this was an idea I was trying to implement, but fell short on time
    //  // Compare high cards between two hands to determine which player has the higher card value
    //  compareHighCards(handA, handB) {
    //      let highCardA = this.getHighCardValue(handA); 
    //      let highCardB = this.getHighCardValue(handB); 
         
    //      if (highCardA > highCardB) { 
    //          return "Player A"; 
    //      } else if (highCardB > highCardA) { 
    //          return "Player B"; 
    //      } else { 
    //          return "It's a tie!"; 
    //      }
    //  }

     // Get  value of  highest card in a given hand
     getHighCardValue(hand) { 
         let rankValues = { 
             "A": 14, "K": 13, "Q": 12, "J": 11, "10": 10, 
             "9": 9, "8": 8, "7": 7, "6": 6, "5": 5, 
             "4": 4, "3": 3, "2": 2 
         }; 

         let highestRank = hand.reduce((highest, current) => { 
             let currentValue = rankValues[current.rank]; 
             let highestValue = rankValues[highest.rank]; 

             if (currentValue > highestValue) { 
                 highest = current; 
             } 

             return highest; 
         });

         return rankValues[highestRank.rank]; 
     } 
}

// Blackjack Game Implementation extending CardGame
export class BlackjackGame extends CardGame { 
     constructor(deck) { 
         super(deck); // Call constructor of CardGame with deck parameter

         this.currentPlayer = 0; // Start with player one
         this.playerStood = [false, false]; // Track whether each player has stood or not
     } 

     // deal two cards to each player at the start of the game
     deal() { 
         this.hands = [this.deck.drawCards(2), this.deck.drawCards(2)];
         this.currentPlayer = 0; // Reset current player to player one after dealing cards
         this.playerStood = [false, false];
     } 

     // Handle hit action for current player and check for bust condition if score above 21
     hit() { 
         if (!this.playerStood[this.currentPlayer]) { 
             this.hands[this.currentPlayer].push(this.deck.drawCard()); 

             if (this.calculateScore(this.hands[this.currentPlayer]) > 21) { 
                 this.endGame(); 
             } else { 
                 this.switchPlayer(); 
             } 
         } 
     } 

     // Handle stand action for current player and check if both players have stood to end game
     stand() { 
         this.playerStood[this.currentPlayer] = true; 
         this.switchPlayer(); 

         if (this.playerStood.every(stood => stood)) { 
             this.endGame(); 
         } 
     } 

     // Switch to the other player after their turn ends
     switchPlayer() { 
         this.currentPlayer = 1 - this.currentPlayer; 
     } 

     // when a player busts or both have stood.
     endGame() { 
         this.currentPlayer = -1; //set to -1 to indicate game over
     } 


     isGameOver() { 
         return this.currentPlayer === -1; 
     } 

     // based on scores of both players.
     evaluateWinner() { 
         const score1 = this.calculateScore(this.hands[0]);  
         const score2 = this.calculateScore(this.hands[1]);  

         if (score1 > 21) return "Player 2 wins!";  
         if (score2 > 21) return "Player 1 wins!";  
         
         if (score1 > score2) return "Player 1 wins!";  
         if (score2 > score1) return "Player 2 wins!";  
         
         return "It's a tie!";  
     } 

     //total score of a player's hand considering Aces as either low or high.
     calculateScore(hand) {  
         let score = 0;  
         let aceCount = 0;  

         for (let card of hand) {  
             if (card.rank === 'A') {  
                 aceCount++;  
                 score += 11;  
             } else if (['K', 'Q', 'J'].includes(card.rank)) {  
                 score += 10;  
             } else {  
                 score += parseInt(card.rank) || 10;  
             }  
         }  

         while (score > 21 && aceCount > 0) {  
             score -= 10;   //score downwards for Aces when over limit.
             aceCount--;  
         }  

         return score;  
     } 

     getHandRanks() {  
          return this.hands.map(hand => {  
              const score = this.calculateScore(hand);  
              return `Score: ${score}${score > 21 ? " (Bust)" : ""}`;  
          });  
      }
}
