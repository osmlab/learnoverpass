+++
date = 2015-05-07T11:09:35Z
title = "Union"
type = "docs"
doctypes = ["block queries"]
doctype_weight = 1
+++

The union block statement is written as a pair of parentheses. Inside the union, any sequence of statements can be placed, including nested union and foreach statements.

    (statement_1; statement_2; …)[->.result_set];

It takes no input set. It produces a result set. Its result set is the union of the result sets of all sub-statements, regardless of whether a sub-statement has a redirected result set or not.

Example:

    (node[name="Foo"];way[name="Foo"];);

This collects in the first statement all nodes that have a name tag "Foo" and in the second statement all ways that have a name tag "Foo". After the union statement, the result set is the union of the result sets of both statements.

The result set of the union statement can be redirected with the usual postfix notation:

Example:

    (node[name="Foo"];way[name="Foo"];)->.a;

Same as the preceding example, but the result is written into the variable a.

Note: foreach and print statements cannot be subelement of element union.

{{< docs_repl >}}
(
node
  [amenity=drinking_water]
  (47.06,15.42,47.09,15.48);
node
  [tourism=hotel]
  (47.06,15.42,47.09,15.48);
);
out;
{{< /docs_repl >}}
