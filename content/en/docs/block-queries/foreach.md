+++
date = 2015-05-06T11:09:35Z
title = "For-each loop (foreach)"
type = "docs"
[menu.doctype]
  parent = "Block Queries"
weight = 3
+++

The foreach block statement is written as the keyword foreach, followed by a pair of parentheses. Inside these parentheses, any sequence of statements can be placed, including nested union and foreach statements.

It takes an input set. It produces no result set. The foreach statement loops over the content of the input set, once for every element in the input set.

Example:

    way[name="Foo"];
    foreach(
      (
        ._;
        >;
      );
      out;
    );

For each way that has a name tag with value "Foo", this prints the nodes that belong to this way immediately followed by the way itself. In detail, the result set of way[name="Foo"] is taken as input set. Then, for each element in this input set the loop body is executed once. Inside the loop body the union of the element and its nodes is taken. Then this union is printed. Note that during execution, each printed subset in an iteration is independent of subsets printed in other iterations, possibly resulting in duplicate objects in the global output (no union is computed by the out statement within the loop).

The input set of the foreach statement can be taken from a variable with the usual postfix notation:

Example:

    foreach.a(...);

This loops over the content of set a instead of the default set "\_".

The name of the variable to put the loop element into can also be chosen by adding a postfix immediately before the opening parenthese.

Example:

    foreach->.b(...);

This puts the element to loop over into the variable b. Without it, the foreach statement does not puts the elements into any set. Example for both input and loop set changed:

    foreach.a->.b(...);

{{< docs_repl >}}
// get all bank nodes in coordinates
(
  node[amenity=bank]
  (47.0678,15.4401658,47.069,15.4501658);
  >;
);
// foreach bank node, print out adjacent nodes
foreach->.bank_set(
  node(around.bank_set:15)->.adjacent_set;
  (.adjacent_set;);
  out meta;
);
{{< /docs_repl >}}
