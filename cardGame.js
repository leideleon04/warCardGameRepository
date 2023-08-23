// creates Card Class and introduces suits and values
class Card {
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
    }

    getFullName() {
        return `${this.value} of ${this.suit}`;
    }
}
// creates Player class and introduces cards with players
class Player {
    constructor(player, cards) {
        this.player = player;
        this.cards = cards;
    }

    hasCards() {
        return this.cards.length > 0;
    }
}
// creates deck class. added hearts, spades, clubs and diamonds
// also establishes suits
class Deck {
    constructor() {
        this.deck = [];
        const suits = ['Hearts', 'Spades', 'Clubs', 'Diamonds'];
        const values = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King'];

        for (let suit of suits) {
            for (let value of values) {
                this.deck.push(new Card(suit, value));
            }
        }
    }

    shuffle() {
        const deck = this.deck;
        for (let i = this.deck.length - 1; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[randomIndex]] = [deck[randomIndex], deck[i]];
        }
    }

    deal(player1, player2) {
        while (this.deck.length > 0) {
            player1.cards.push(this.deck.pop());
            player2.cards.push(this.deck.pop());
        }
    }

    playGame() {
        const player1 = new Player("Player 1", []);
        const player2 = new Player("Player 2", []);
        const deck = new Deck();
        deck.shuffle();
        deck.deal(player1, player2);

        let player1Points = 0;
        let player2Points = 0;

        function calculatePoints(card1, card2) {
            if (card1.value > card2.value) {
                return 1; // Player 1 wins the round
            } else if (card2.value > card1.value) {
                return 2; // Player 2 wins the round
            } else {
                return 0; // It's a tie
            }
        }
        
        while (player1.hasCards() && player2.hasCards()) {
            const card1 = player1.cards.pop();
            const card2 = player2.cards.pop();

            const roundPoints = calculatePoints(card1, card2);

            if (roundPoints === 1) {
                player1Points++;
            } else if (roundPoints === 2) {
                player2Points++;
            }

            console.log(`${player1.player}: ${card1.getFullName()}`);
            console.log(`${player2.player}: ${card2.getFullName()}`);
        }

        if (player1Points > player2Points) {
            console.log(`${player1.player} wins with ${player1Points} points!`);
        } else if (player2Points > player1Points) {
            console.log(`${player2.player} wins with ${player2Points} points!`);
        } else {
            console.log("It's a tie!");
        }
    }
}

// Create a new deck and play the game
const deck = new Deck();
deck.playGame();
