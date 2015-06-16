+++
title = "Relative to other elements (around)"
type = "docs"
[menu.doctype]
  parent = "Filters"
weight = 6
+++

The around filter selects all elements within a certain radius around the elements in the input set. If you provide coordinates, then these coordinates are used instead of the input set. The input set can be changed with an adapted prefix notation. As for all filters, the result set is specified by the whole statement, not the individual filter.

A radius of 0 can be used for a way intersection test on outer/inner points.

Syntax: It consists of an opening parenthesis. Then follows the keyword around. Then follows optionally an input set declaration. Then follows a single floating point number that denotes the radius in meters. The filter either ends with a closing parenthesis or is followed by two comma separated floating point numbers indicating latitude and longitude and then finally a closing parenthesis.

    (around[.input_set]:radius)
    (around:radius,latitude,longitude)

Examples:

    node(around:100.0);
    way(around:100.0);
    rel(around:100.0);

Example with modified input set:

    node(around.a:100.0);

Examples with coordinates:

    node(around:100.0,50.7,7.1);
    way(around:100.0,50.7,7.1);
    rel(around:100.0,50.7,7.1);

Example: Find all cinemas in Bonn which are at most 100m away from bus stops

    area[name="Bonn"];
    node(area)[highway=bus_stop];
    node(around:100)[amenity=cinema];
    out;

{{< docs_repl >}}
// get all ways from a 50m radius from
// coordinates 51.1788435, -1.826204 (stonehenge)
(way(around:50, 51.1788435,-1.826204);>;);
out body;
{{< /docs_repl >}}
