+++
title = "Area pivot (pivot)"
type = "docs"
doctypes = ["Filters"]
doctypes_weight = 11
+++
The _pivot_ filter selects the element of the chosen type that defines the outline of the given area.

The input set can be changed with an adapted prefix notation. As for all filters, the result set is specified by the whole statement, not the individual filter.

It consists of an opening parenthesis. Then follows the keyword _pivot_. The filter ends with a closing parenthesis.

The statement finds for each area in the input set the respective element that the area has been generated from. Which is either a multipolygon relation or a way.

Examples:

    way(pivot);
    rel(pivot);

The example with modified input set:

    way(pivot.a);
    rel(pivot.a);

{{< docs_repl >}}
// determine area for Greater London and store it to .London_area
area[name="London"][admin_level=6][boundary=administrative]->.London_area;
// convert back to relations using the pivot filter
rel(pivot.London_area);
// output the geom
out geom;
{{< /docs_repl >}}
