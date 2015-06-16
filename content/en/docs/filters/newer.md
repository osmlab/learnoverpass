+++
title = "Newer"
type = "docs"
[menu.doctype]
  parent = "Filters"
weight = 7
+++

The newer filter selects all elements that have been changed since the given date. As opposed to other filters, this filter cannot be used alone. If the underlying database instance supports attic data, then "changed" is probably a better choice than "newer".

It has no input set. As for all filters, the result set is specified by the whole statement, not the individual filter.

It consists of an opening parenthesis. Then follows a date specification. Please note that this date specification cannot be abbreviated and has to be put in single or double quotes. The filter ends with a closing parenthesis.

{{< docs_repl >}}
(node(poly:"50.73 7.13 50.73 7.17 50.75 7.15");>;);
// This finds all nodes that have changed
// since 14 Sep 2012, 7 h UTC, in the given input set.
(node._(newer:"2012-09-14T07:00:00Z");>;);
out;
{{< /docs_repl >}}
