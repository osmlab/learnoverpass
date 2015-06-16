+++
title = "By date of change (changed)"
type = "docs"
[menu.doctype]
  parent = "Filters"
weight = 8
+++
The changed filter selects all elements that have been changed between the two given dates. If only one date is given, then the second is assumed to be the front date of the database. If only one date is given and it is run with the current timestamp, then it behaves exactly like "newer" with two exceptions: first, it is faster, second, it can also stand as the only filter.

It has no input set. As for all filters, the result set is specified by the whole statement, not the individual filter.

It consists of an opening parenthesis. Then follows a date specification. Please note that this date specification cannot be abbreviated and has to be put in single or double quotes. Then can follow a comma and a second date specification. The filter ends with a closing parenthesis.

Example: All changes since the given date and now

    node._(changed:"2012-09-14T07:00:00Z");

{{< docs_repl >}}
(node(poly:"50.73 7.13 50.73 7.17 50.75 7.15");>;);
// This finds all nodes that have changed
// between the two given dates 
node._(changed:"2012-09-14T07:00:00Z","2012-09-14T07:01:00Z");
out;
{{< /docs_repl >}}
