# Contribution Guide

Welcome to the LearnOverpass, the definitive documentation site for the Overpass API. This file explains how to make contributions.

## Text modifications

For minor edits, you can click the "Improve page" link seen in the corresponding documentation page.

# Translation

Everything in LearnOverpass, from the documentation to the exercises, can be translated, and we hope to make it as internationalized as possible. You can even localize the exercises for your particular country.

This translation guide is divided in to two parts:

If you are not experienced with git, view option A.
If you are experienced with git, view option B.

## Option A

This particular option works for translators unfamiliar with git, and does not require any installation of tools. This should be the easiest way to contribute.

**Workflow**
1. In case you don't have already, create a [Github account](http://github.com)!
2. Open an issue [here](https://github.com/osmlab/learnoverpass/issues/new) on Github. On the title, type in "[LANGUAGE-CODE] translation" where [LANGUAGE-CODE] is the language you are translating to, and type in details (such as the specific section file to be translated) on the "Leave a comment" box.
3. Wait for me or any github experienced fellow to contact you back. (We will create a copy of the original document in the new language folder for you).
4. Go to the page specified in the issue, where you will be able to translate the page using Github's online editing tools. The translated text will appear once the 'pull request' is authorized.

## Option B

This particular option is a little bit more involved, but does not require you to wait for us to copy the original document.

**Workflow**
1. Fork the [LearnOverpass repository](https://help.github.com/articles/fork-a-repo/).
2. Improve content*
3. Issue a [pull request](https://help.github.com/articles/using-pull-requests/).

*All content can be found under `content/`, and the multilingual versions of the files are organized by their corresponding language code (`content/en`, `content/es`). If you're language code is not present yet, you can copy/paste the `content/en` folder and rename it to your target language code, using that as a base to translate the pages.

# Exercises Contributing

Whilst the exercises contain logic to work, creating new ones is easy and does not require any programming knowledge (apart from using the Overpass QL of course).

1. Create a new exercise category in the `exercises/` folder.
2. Define your exercises, where every new problem is a unique markdown file. List them in numerical format (`1.md`, `2.md`) for simplicity

Each exercise file contains a front matter. Example:

      date: "2015-07-01T16:35:50+08:00"
      title: "Introduction"
      type: "exercise"
      code: | 
          node(2681940781);
      instructions: |
          1. `node` queries our node, but what does the number `2681940781` stand for? It's the unique identifier number (ID) of the node we're looking for.
          2. The first statement looks (queries) for a specific node. On the second line, type in `out;`, which would print that node.
      hint: |
          Make sure to print out your output with `out`
      answer: |
          <?xml version="1.0" encoding="UTF-8"?>
          <osm version="0.6" generator="Overpass API">
          <note>The data included in this document is from www.openstreetmap.org. The data is made available under ODbL.</note>
          <meta osm_base="2015-07-06T13:36:01Z"/>
          ...

Notes:
  - `date` is of the format `YYYY-MD-DD`, separated by `T` time, and `HH:MM:SS:+Timezone`. The date decides how the exercises will be arranged.
  - `title` is the title that appears in the exercise sidebar.
  - `code` is the initial boiler plate code that shows up in the exercise code editor.
  - `instructions` is the styled, step-by-step instructions for the exercise viewable in the sidebar.
  - `hint` is what appears whenever a wrong answer is submitted.
  - `answer` this is the resulting overpass data query that should appear if the correct query is submitted.

# Contributing to site functionality

You are also free to contribute to the functionality by forking this repository and issuing a pull request.

LearnOverpass is built on top of [Hugo](http://gohugo.io), a static site generator.

The site itself is hosted using [Github Pages](http://pages.github.com/). Run the deploy script (`deploy.sh`) to automatically push the resulting `public` directory from Hugo.
