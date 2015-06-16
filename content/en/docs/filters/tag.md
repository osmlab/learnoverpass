+++
title = "By Tag"
type = "docs"
doctypes = ["Filters"]
doctypes_weight = 1
+++

The has-kv filter selects all elements that have or have not a tag with a certain value. It supports the basic OSM types node, way, and relation as well as the extended type area.

It has no input set. As for all filters, the result set is specified by the whole statement, not the individual filter.

All variants consist of an opening bracket, then a string literal in single or double quotes. Then the variants differ. All variants end with a closing bracket. If the string literal consists only of letters, the quotes can be omitted.

### Equals (=, !=)

The most common variant selects all elements where the tag with the given key has a specific value. This variant contains after the key literal an equal sign and a further literal containing the value. Examples, all equivalent:

    node["name"="Foo"];
    node[name=Foo];
    node['name'="Foo"];
    node[name="Foo"];
    node["name"='Foo'];

If you have a digit, whitespace or whatever in the value, you do need single or double quotes:

    node["name"="Foo Street"];
    node["name"='Foo Street'];
    node[name="Foo Street"];

Querying for empty values is not possible using the equals value operator. This can only be achieved by using a regular expression:

    node[power=""];          // not supported
    node[power~"^$"];        // use regular expression instead

Likewise, querying empty key values is also not possible using this kind of key-value query and needs to be expressed via regular expressions.

    node[~"^$"~"."];         // find nodes with empty key ("") and any value

NB: Overpass Turbo Wizard already has some logic in place to automatically convert ""="" accordingly.

### Exists

The second variant selects all elements that have a tag with a certain key and an arbitrary value. It contains nothing between the key literal and the closing bracket:

    node["name"];
    node['name'];
    node[name];

### Value matches regular expression (~, !~)

The third variant selects all elements that have a tag with a certain key and a value that matches some regular expression. It contains after the key literal a tilde, then a second literal for the regular expression to search for:

    node["name"~"^Foo$"];    /* finds exactly "Foo" */
    node["name"~"^Foo"];     /* finds anything that starts with "Foo" */
    node["name"~"Foo$"];     /* finds anything that ends with "Foo" */
    node["name"~"Foo"];      /* finds anything that contains the substring "Foo" */
    node["name"~"."];        /* finds anything, equal to the previous variant */

Please note that in QL you need to escape backslashes: ["name"~"^St\."] results in the regular expression ^St. (which finds every name starting with "St"), while ["name"~"^St\\."] produces the most likely meant regular expression St\. (which finds every name starting with "St."). This is due to the C escaping rules and doesn't apply to the XML syntax.

You can also search case insensitively:

    node["name"~"^Foo$",i];    /* finds "foo", "FOO", "fOo", "Foo" etc. */

Both the key and value variants with and without regular expressions can be negated. They then select exactly the elements which have a tag with the given key, but no matching value and the elements that don't have a tag with the given key:

    node["name"!="Foo"];
    node["name"!~"Foo"];
    node["name"!~"Foo",i];

Key/value matches regular expression (~"key regex"~"value regex")
The forth variant selects all elements where both key and value match a regular expression. After an initial tilde (~) the regular expression for the key needs to be provided, followed by another tilde character and eventually the regular expression for the value.

    node[~"^addr:.*$"~"^Foo$"];    /* finds addr:* tags with value exactly "Foo" */
    node[~"^addr:.*$"~"^Foo"];     /* finds addr:* tags with value starting with "Foo" */
    node[~"^addr:.*$"~"Foo$"];     /* finds addr:* tags with value ending with "Foo" */
    node[~"^addr:.*$"~"Foo"];      /* finds addr:* tags with value containing the substring "Foo" */
    node[~"^addr:.*$"~"."];        /* finds addr:* tags with any value */

Regular expressions for values cannot be negated in this variant.
{{< docs_repl >}}
// Filter and only get nodes that are banks.
node[amenity=bank]
(47.06,15.42,47.09,15.48); // a bbox-filter
out;
{{< /docs_repl >}}
