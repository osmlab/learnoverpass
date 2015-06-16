+++
title = "By user (user, uid)"
type = "docs"
[menu.doctype]
  parent = "Filters"
weight = 9
+++

The user filter selects all elements that have been last touched by the specified user.

It has no input set. As for all filters, the result set is specified by the whole statement, not the individual filter.

It consists of an opening parenthesis. Then follows either the keyword user, a colon and a string literal denoting the user name to search for. Or the keyword uid followed by the user id of the user to search for. The filter ends with a closing parenthesis.

    node(user:"Steve");
    node(uid:1);

{{< docs_repl >}}
(node(poly:"50.73 7.13 50.73 7.17 50.75 7.15");>;);
node._(user:"HeinerSchaefer");
out;
{{< /docs_repl >}}
