+++
title = "Print (out)"
type = "docs"
[menu.doctype]
  parent = "Actions"
weight = 1
+++

The out action can be configured with an arbitrary number of parameters that are appended, separated by whitespace, between the word out and the semicolon.

The out action takes an input set. It doesn't return a result set. The input set can be changed by prepending the variable name.

Allowed values, in any order, are:

- one of the following the degree of verbosity; default is body:
    - _ids_: Print only the ids of the elements.
    - _skel_: Print also the information necessary for geometry. These are also coordinates for nodes and way and relation member ids for ways and relations.
    - _body_: Print all information necessary to use the data. These are also tags for all elements and the roles for relation members.
    - _tags_: Print only ids and tags for each element and not coordinates or members.
    - [_meta_](#docs-tab-meta): Print everything known about the elements. This includes additionally to body for all elements the version, changeset id, timestamp and the user data of the user that last touched the object.

- one of the following modificators for derived information:
    - [_bb_](#docs-tab-bounding_box): Adds the bounding box of each element to the element. For nodes this is equivalent to "geom". For ways it is the enclosing bounding box of all nodes. For relations it is the enclosing bounding box of all node and way members, relations as members have no effect.
    - [_center_](#docs-tab-center): This adds the center of the above mentioned bounding box to ways and relations. Note: The center point is not guaranteed to lie inside the polygon (example).
    - _geom_: Add the full geometry to each object. This adds coordinates to each node, to each node member of a way or relation, and it adds a sequence of "nd" members with coordinates to all relations.

The attribute "geom" can be followed by a bounding box in the format "(south,west,north,east)". In this case only coordinates that are inside the bounding box are produced. For way segments also the first coordinate outside the bounding box is produced to allow for properly formed segments.

- One of the following for the sort order can be added. Default is asc.
    - asc: Sort by object id.
    - qt: Sort by quadtile index; this is roughly geographical and significantly faster than order by ids.
- a non-negative integer for the maximum number of elements to print. Default is no limit.

{{< docs_repl >}}===default===
(
  // Rio de Janeiro's Christ the Redeemer peak
  node[name=Corcovado][natural=peak];
  >;
);
out;
===meta===
(
  // Rio de Janeiro's Christ the Redeemer peak
  node[name=Corcovado][natural=peak];
  >;
);
out meta;
===bounding box===
(
  // Rio de Janeiro's Christ the Redeemer peak
  way(141708228);
  >;
);
out bb;
===limit===
(
  // Rio de Janeiro's Christ the Redeemer peak
  way(141708228);
  >;
);
// only print 20 nodes from the way 
out 20;
===center===
(
  // Rio de Janeiro's Christ the Redeemer peak
  way(141708228);
  >;
);
// print center (not centroid) of the polygon
out center;
===combination===
(
  // Rio de Janeiro's Christ the Redeemer peak
  way(141708228);
  >;
);
// print multiple times using different modifiers
out geom;
out center;
out bb;
{{< /docs_repl >}}
