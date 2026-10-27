
# Mini Kalshi — Quick Product Summary

We are building a simplified prediction-market backend inspired by Kalshi, where users create YES/NO markets, bet against the creator, and receive payouts when the market is resolved.

- Market creation: A user chooses YES or NO, sets an expiry date and commits an initial wager.
- Betting: Other users can bet only on the opposite side. Their combined bets cannot exceed the creator's initial wager.
- Wallet: Users receive fake funds through `/onramp`. Stakes are deducted, and payouts or refunds are credited after resolution.
- Settlement: The creator resolves the market. Winners receive payouts according to the specified 2× rule, and unmatched creator funds are refunded where applicable.
- Database: Four collections — `users`, `markets`, `bets`, and `walletEvents`.

## Tech stack: 

- Bun, 
- Express.js,
- MongoDB, 
- Mongoose, 
- Zod, 
- bcrypt, 
- JWT  
- JavaScript. 

- Postman is used for testing.

> Scope: Backend only. No frontend, real payments, concurrency handling or advanced market mechanics.

**Goal**: Build a working REST API covering authentication, wallet management, market creation, betting, resolution and transaction history.

- Ref: kalshi.com
- design (gpt): https://www.tldraw.com/f/mHUdFg5_sc4vVKu-v8_5o

