+++
date = 2015-05-06T11:09:35Z
title = "Overpass API Documentation"
type = "docs"
+++

Overpass QL is the second query language for the Overpass API and was designed as an alternative to Overpass XML. It has a C style syntax: The whole query source code is divided in statements, and every statement ends with a semicolon. It has imperative semantics: The statements are processed one after another and change the execution state according to their semantics.

The execution state consists of the default set, potentially other named sets, and for block statements a stack. A set can contain nodes, ways, relations and areas, also of mixed type and of any number. Sets are created as result sets of statements and are read by subsequent statements as input. Unless you specify a named set as input or result, all input is implicitly read from and all results are written to the default variable named _ (a single underscore). Names for sets may consist of letters, digits and the underscore but must not start with a digit. Once a new result is (implicitly or explicitly) assigned to an existing set, its previous contents will be replaced and are no longer available. Sets always have global visibility.

There are several different types of statement. You almost always need the print statement, which is called an action, because it has an effect outside the execution state (the output). The other statements are grouped into

Standalone queries: These are complete statements on their own.
Filters: They are always part of a query statement and contain the interesting selectors and filters.
Block statements: They group statements and enable disjunctions as well as loops.
Settings: Things like output format that can be set once at the beginning.
