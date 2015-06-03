+++
date = 2015-05-06T11:09:35Z
title = "Difference"
type = "docs"
doctypes = ["block queries"]
doctype_weight = 2
+++

The difference block statement is written as a pair of parentheses. Inside the difference statement, exactly two statements must be placed, and between them a minus sign.

    (statement_1; - statement_2;)[->.result_set];

It takes no input set. It produces a result set. Its result set contains all elements that are result of the first sub-statement and not contained in the result of the second sub-statement.

Example:

    (node[name="Foo"]; - node(50.0,7.0,51.0,8.0););

This collects all nodes that have a name tag "Foo" but are not inside the given bounding box.

The result set of the difference statement can be redirected with the usual postfix notation:

Example:

    (node[name="Foo"]; - node(50.0,7.0,51.0,8.0);)->.a;

Same as the preceding example, but the result is written into the variable a.
