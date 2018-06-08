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
Results and matches data is coming from a JSon file provided by Martin https://github.com/lsv/fifa-worldcup-2018[https://github.com/lsv/fifa-worldcup-2018]
