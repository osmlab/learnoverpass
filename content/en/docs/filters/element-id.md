+++
title = "By Element Id"
type = "docs"
doctypes = ["Filters"]
doctypes_weight = 5
+++

The id-query filter selects the element of given type with given id. It supports beside the OSM datatypes node, way, and relation also the type area.

It has no input set. As for all filters, the result set is specified by the whole statement, not the individual filter.

It consists of an opening parenthesis. Then follows a positive integer. The filter is ends with a closing parenthesis.

Examples:

    node(1);
    way(1);
    rel(1);
    area(1);

Note that area ids need to be derived from an existing OSM way by adding 2400000000 to its OSM id or in case of a relation by adding 3600000000 respectively. Note that area creation is subject to some extraction rules, i.e. not all ways/relations have an area counterpart. See [areas.osm3s](https://github.com/drolbr/Overpass-API/blob/master/rules/areas.osm3s) for details.

{{< docs_repl >}}
// get node with id 1170494282
// put it (implicitly) in the default set
node(1170494282);
// print the default set
out;
{{< /docs_repl >}}
