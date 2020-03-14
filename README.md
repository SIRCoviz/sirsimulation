# sirsimulation
SIR model for simulation

# What's left to do?

- [ ] hook up URL captures to the model
- [ ] write the model
- [ ] compare to actual statistics

# What URL to check?

http://localhost:8080/initialstate/5/10

# What does backend send to frontend?

currently producing:

``` json
[ { time: 0, cells: [ [ "Susceptible", "Infected" ], [ "Dead, "Recovered" ] ] }
```

original suggestion
``` json
[ { time: 0, cells: [ { x: 0, y: 0, sir: "Susceptible" }, { x: 0, y: 1, sir: "Infected" }, ... ] }
, { time: 1, cells: [ { x: 0, y: 0, sir: 0.1 }, { x: 0, y: 1, sir: 0.2 }, ... ] }
, ... ]
```

# How does it work?

This is mostly stolen from https://en.wikipedia.org/wiki/Epidemic_models_on_lattices#SIR_model

The `z` column tells you how many neighbors
