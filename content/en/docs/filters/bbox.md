+++
title = "Bounding Box"
type = "docs"
[menu.doctype]
  parent = "Filters"
weight = 2
+++

The bbox-query filter selects all elements within a certain bounding box.

It has no input set. As for all filters, the result set is specified by the whole statement, not the individual filter.

    (south,west,north,east)

It consists of an opening parenthesis. Then follow four floating point numbers, separated by commas. The filter ends with a closing parenthesis.

The floating point numbers give the limits of the bounding box: The first is the southern limit or minimum latitude. The second is the western limit, usually the minimum longitude. The third is the northern limit or maximum latitude. The last is the eastern limit, usually the maximum longitude. If the second argument is bigger than the fourth argument, the bounding box crosses the longitude of 180 degrees.

{{< docs_repl >}}
node
(47.065,15.425,47.07,15.43); // a bbox-filter
out;
{{< /docs_repl >}}
