# First Thoughts

## Requirements

- Need to provide structure to query the google sheets for attendance verification and the master events list
- Need to provide functionality to cache / locally store certain metrics that will be collected daily for the website, then provide said metrics when people query.
- Also need to provide functionality for a full query of attendance verification data for the recommender system
- Needs to be easy to swap one google sheet for another in the case of a future AVP taking over. There should also be clear guidelines on how to set up the sheets (especially the master sheet, since it's webscraped) such that this API can work well with it.

## Targetted Use Cases

1. The AS funding website, for key statistics to display on the home page 
2. The AS event recommender, for attendance information to create graph and information on upcoming event to start populating recommendations.