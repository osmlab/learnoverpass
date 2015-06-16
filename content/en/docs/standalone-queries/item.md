+++
title = "Item"
type = "docs"
[menu.doctype]
  parent = "standalone-queries"
weight = 1
+++

The item standalone query consists only of an input set prefix.

It takes the input set specified by its prefix. This is in particular useful for union statements: it reproduces its input set as (part of the) result of the union statement.

The most common usage is the usage with the default input set:

      ._;

In the context of a union statement, the following will return all items in the default inputset along with the recurse down result.

      (._; >;);

But of course other sets are possible too:

      .a;

In the context of a union statement:

      (.a; .a >;);

Note: Subsequent statements in a union statement are not impacted by the item statement. In particular `.a;` does not add the contents of the input set to the default item set ._

The item statement can also be used as filter.

{{< docs_repl >}}
(
node[amenity=bank]
  (47.06,15.42,47.09,15.48);
)->.bank_set;

//here we print the bank_set by passing the .bank_set query
.bank_set out;
{{< /docs_repl >}}
