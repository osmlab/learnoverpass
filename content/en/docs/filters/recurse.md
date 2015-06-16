+++
title = "Recurse (n, w, r, bn, bw, br)"
type = "docs"
[menu.doctype]
  parent = "Filters"
weight = 3
+++

The recurse filter selects all elements that are members of an element from the input set or have an element of the input set as member, depending on the given parameter.

The input set can be changed with an adapted prefix notation. As for all filters, the result set is specified by the whole statement, not the individual filter.

It consists of an opening parenthesis. Then follows one of the symbols: w (forward from ways), r (forward from relations), bn (backward from nodes), bw (backward from ways), or br (backward from relations). Then follows an optional input set declaration. The filter ends with a closing parenthesis.

Examples with default input set:

    node(w);        // select child nodes from all ways of the input set
    node(r);        // select node members of relations of the input set
    way(bn);        // select parent ways for all nodes from the input set
    way(r);         // select way members of relations from the input set
    rel(bn);        // select relations that have node members from the input set
    rel(bw);        // select relations that have way members from the input set
    rel(r);         // select all members of type relation from all relations of the input set
    rel(br);        // select all parent relations of all relations from the input set

Example with modified input set:

    node(w.foo);
    
You can also restrict the recurse to a specific role. Just add a colon and then the name of the role before the closing parenthesis.

Examples with default input set:

    node(r:"role");        // select node members of relations of the input set
    way(r:"role");         // select way members of relations from the input set
    rel(bn:"role");        // select relations that have node members from the input set
    rel(bw:"role");        // select relations that have way members from the input set
    rel(r:"role");         // select all members of type relation from all relations of the input set
    rel(br:"role");        // select all parent relations of all relations from the input set
    Example with modified input set:

    node(r.foo:"role");

And you can also search explicitly for empty roles:

    node(r:"");
    node(r.foo:"");

{{< docs_repl >}}
// get nodes and ways from different bounding boxes.
(
  node[amenity=cafe]
  (0, 0, 5, 5);
  way[highway=cycleway]
  (47.0682, 15.4429, 47.0686, 15.444);
);
// but only print out the nodes that are
// childnodes from the ways of input set
node(w);
out;
{{< /docs_repl >}}
