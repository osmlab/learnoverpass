+++
title = "By area (area)"
type = "docs"
doctypes = ["Filters"]
doctypes_weight = 10
+++
The area filter selects all elements of the chosen type that are inside the given area. Please note with regard to attic data that areas always represent current data.

The input set can be changed with an adapted prefix notation. As for all filters, the result set is specified by the whole statement, not the individual filter.

Syntax: It consists of an opening parenthesis. Then follows the keyword area. Then can follow a colon and a non-negative integer. The filter ends with a closing parenthesis.

Nodes are found if they are properly inside or on the border of the area. Ways are found if at least one point (also points on the segment) is properly inside the area. A way ending on the border and not otherwise crossing the area is not found. Relations are found if one of its members is properly inside the area.

If the area statement is provided without integer, the areas from the input set are used. An Example:

    node(area);
    way(area);
    rel(area);

The example with modified input set:

    node(area.a);
    way(area.a);
    rel(area.a);

If an integer is added, the input set is ignored and instead the area that has the given integer as id is taken.

    node(area:2400000001);
    way(area:2400000001);
    rel(area:2400000001);

Because areas in OSM are not native elements but are only infered from the OSM database using its closed ways or relations; this facility allows grouping their various representation in a coherent set which can store their geometry, independantly of their complexity and representation in the OSM database, as if they were a single distinctive element, without using complex filtering rules in your query. However associating these objects with an OSM id attribute requires some adjusment because the same id value could be used for unrelated elements with different type (way or relation). For this reason, areas returned by the Overpass API only have a "virtual" id specific to the Overpass API, but not found directly in the OSM database.

By convention the area id can be calculated from an existing OSM way by adding 2400000000 to its OSM id, or in case of a relation by adding 3600000000 respectively. Note that area creation is subject to some extraction rules, i.e. not all ways/relations have an area counterpart (notably those that are tagged with `area=no`, and most multipolygons and that don't have a defined `name=*` will not be part of areas).
Areas are created by a regular job on the Overpass API server and usually have a lag of several hours compared to the OSM main database. The exact timestamp can be determined by checking the `timestamp_areas_base` value in the Overpass json or xml result.

If you want more immediate results (not depending on the delayed batch processing), you can also write your own filters without using this facility in your Overpass query: use standard OSM element types and ids and filter them by specific tags of your choice.

See [areas.osm3s](https://github.com/drolbr/Overpass-API/blob/master/rules/areas.osm3s) for details of the filters (written using the XML variant of the Overpass query language) currently by Overpass used to generate the areas that can be queried with this facility. Those areas are defined using the "pivot" query feature.

{{< docs_repl >}}
// search the area of the Dolmites
area
  [place=region]
  ["region:type"="mountain_area"]
  ["name:en"="Dolomites"];
out body;

// get all peaks in the area
node
  [natural=peak]
  (area);
out body qt;
{{< /docs_repl >}}
