Ordnung keeps track of tasks you'd like to carry out, and makes it easy to commit to an order in which to do them. Traditional to-do list software forces your tasks into an ordering at time of entry, represented as either a flat or hierarchical list. Ordnung asks only that you decide on the dependency relations between them (i.e. A must be done before B). Changing your mind about the order you'd like to do tasks in, provided dependency relations are observed, is easy. 

To put it mathematically:  The dependency relations between your tasks taken together impose a [partial order](http://en.wikipedia.org/wiki/Partially_ordered_set) on the set of tasks. These can be viewed as a directed acyclic graph. Ordnung lets you decide on a total order lazily.

"Ordnung" means "order" in German, in both the colliquial (i.e. tidiness, organization) and mathematical senses. Some Germans speak very earnestly of "ordnungspflicht" (the obligation to be orderly).

> "Just as our physical path on earth is always a line and never a plan, similarly, when we want to acomplish and possess one thing in life we need to give up countless other things, right and left, and leave them undone. If we could act like children at a fair, grabbing at everything that tickles our fancy without stopping to make up our minds, this would be a wrong-headed attempt to change our line into a plane: we would zigzag all over the place without getting anything done." - Schopenhauer, The World as Will and Representation

Usage
-----

To hack around, run...

```bash
npm install
npm run watch
```

And then visit `http://localhost:8080/static/`.