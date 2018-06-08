# Pronostic 2018


A contest application for the World Cup 2018 stored on the blockchain.

Each participant stakes some ether in the contest smart contract and then need to submit all its predictions for all the games of the Fifa World Cup 2018.

This constes is split in 5 phases:
---
- Groups phase
- Round of 16
- Quarters
- Semis
- Final (and third place)

For each phase an individual submission is needed and should be done before the first match of each phase is completed. 


How does it work:
---
Each submission is stored in the IPFS and its link stored on the smart contract. A participant can submit their predictions several times until the deadline for each phase.

After each phase is started, the participants will be able to compare its predictions with the other participants predictions and see the current ranking once the games have been updated.

Where does the results come from:
---
Results and matches data is coming from a JSon file provided by Martin Århof https://github.com/lsv/fifa-worldcup-2018.
Each game should be updated within one hour of its finish and each participant will be able to see the points they have collected.

How does the winner is declared:
---
The winner is calculated automatically by the front-end application based on the predictions stored on the blockchain/IPFS and it is up to the winner to trigger the payment for each winner, which will be the pot size distributed evenly by all the winners.

How do points are calculated:
--
TODO

How to create my own contest:
---
You can either deploy the WCWagers.sol contract or talk with one of us.

Who has developed this application:
---
- Jean-Marc Henry 
- Joao Aguiam https://twitter.com/joaoaguiam

