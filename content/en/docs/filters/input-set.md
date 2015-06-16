+++
title = "By Input Set"
type = "docs"
[menu.doctype]
  parent = "Filters"
weight = 4
+++

The "item" filter selects all elements from its input set.

As for all filters, the result set is specified by the whole statement, not the individual filter.

It consists of a dot, followed by the name of the input set.

Examples: The default set

    node._;

and a named set

    node.a;

It is also possible to specify several input sets:

    node.a.b;

{{< docs_repl >}}
// get area Alpe and Cividale
(area[name="Cividale del Friuli"])->.Cividale;
(area[name="Julijske Alpe"])->.Alpe;

(node[power=pole](area.Cividale))->.Cividale_nodes;
(node[power=pole](area.Alpe))->.Alpe_nodes;

// print out nodes that are present in both areas (intersection)
node.Alpe_nodes.Cividale_nodes;
out body qt;

(relation[name="Cividale del Friuli"];>;);
out body;
out skel qt;

(relation[name="Julijske Alpe"];>;);
out body;
out skel qt;
{{< /docs_repl >}}
