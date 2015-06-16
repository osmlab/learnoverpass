+++
title = "Recurse Up (<)"
type = "docs"
doctypes = ["Standalone queries"]
doctypes_weight = 2
+++

The recurse up standalone query is written as a single less than.

It takes an input set. It produces a result set. Its result set are all the ways that have a node appearing in the input set as a member, all relations that have a node or way from the input set as a member, and all relations that have a way from the result set as members.

Example:

    <;

The input set of the recurse up statement can be chosen with the usual prefix notation:

    .a <;

The result set of the recurse up statement can be redirected with the usual postfix notation:

    < ->.b;

Of course, you can also change both:

    .a < ->.b;

{{< docs_repl >}}
(
  node(47.0678,15.440,47.069,15.444);
  <;
);
out;
{{< /docs_repl >}}
