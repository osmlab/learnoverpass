+++
title = "By polygon (poly)"
type = "docs"
doctypes = ["Filters"]
doctypes_weight = 7
+++

The _polygon_ filter selects all elements of the chosen type inside the given bounding box.

It has no input set. As for all filters, the result set is specified by the whole statement, not the individual filter.

It consists of an opening parenthesis. Then follows the keyword poly. Then follows a string containing an even number of floating point numbers, divided only by whitespace. Each pair of floating point numbers represents a coordinate, in order latitude, then longitude. The filter ends with a closing parenthesis.

    (poly:"latitude_1 longitude_1 latitude_2 longitude_2 latitude_3 longitude_3 …");

An example (a triangle near Bonn, Germany):

    node(poly:"50.7 7.1 50.7 7.2 50.75 7.15");
    way(poly:"50.7 7.1 50.7 7.2 50.75 7.15");
    rel(poly:"50.7 7.1 50.7 7.2 50.75 7.15");

{{< docs_repl >}}
(node(poly:"50.73 7.13 50.73 7.17 50.75 7.15");>;);
out;
{{< /docs_repl >}}
