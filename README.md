# sirsimulation
SIR model for simulation

# How do I make it go?

1. install [ghcup](https://www.haskell.org/ghcup/) to manage your GHC
2. install ghc with `ghcup install 8.8.2`
3. update your package list with `cabal update`
4. run the program with `cabal run`
5. check http://localhost:8080/initialstate/5/10 to see the raw output from the backendpoint

# How do I run the front end?

TODO

# What's left to do?

- [ ] hook up URL captures to the model
- [ ] write the model
- [ ] compare to actual COVID-19 statistics

# What does backend send to frontend?

currently producing:

```json
[ { time: 0, cells: [ [ "Susceptible", "Infected" ], [ "Dead, "Recovered" ] ] }
```

original suggestion
```json
[ { time: 0, cells: [ { x: 0, y: 0, sir: "Susceptible" }, { x: 0, y: 1, sir: "Infected" }, ... ] }
, { time: 1, cells: [ { x: 0, y: 0, sir: 0.1 }, { x: 0, y: 1, sir: 0.2 }, ... ] }
, ... ]
```

# How does it work?

This is mostly stolen from https://en.wikipedia.org/wiki/Epidemic_models_on_lattices#SIR_model

The `z` column tells you how many neighbors
