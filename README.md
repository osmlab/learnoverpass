# LearnOverpass

This project aims to create a complete, one stop, learning resource for the overpass API.

It features a beginner-friendly, easy-to navigate documentation, as well as an interactive suite of tutorials to teach different aspects of the API.

## Contribution Guide

We accept contributions/edits to the site! Feel free to do a pull request if you see an error in the docs/outdated material.

Translation to various languages is also an aspect we need contribution towards to.

A detailed contribution guide will be pushed to this repository after GSOC's run, once we have a stable release of the project.

## Development Guide

The project is/will be built using (mainly) the following dependencies/frameworks:

- [Hugo](http://gohugo.io) - static site generator written in Go
- [Gulp](http://gulpjs.com) - task manager for preprocessing/asset pipeline
- [ReactFlux](https://www.npmjs.com/package/react-flux) - main framework for the tutorial engine
- Ace Editor/Code Mirror - for the online code editor
- [Stylus](https://learnboost.github.io/stylus/) - CSS meta language

### Setup

If this is the first time you're working with the node ecosystem, install [node](https://nodejs.org) first. This will add a binary named `npm` in your path.

Then, run `npm install` on the root directory of this project, as well as `npm install -g gulp`.

The theme/layout code can be found under the `themes/src` directory. Gulp is a task manager that compiles these files to `themes/overpass_doc` which is the flat html/css files used by the site.

`gulp build` needs to be run to compile the src theme. The default `gulp` task, apart from building the layout and running hugo, includes a file watcher that automatically detects changes in the src and compiles it for you, you which is ideal if you are developing the theme/layout.

__Note on i18n:__
Hugo does not natively support i18n/localization, and certain things have been worked around with to make it work. The site uses content sections to order the content by language (en/data, de/data etc.), and uses taxonomies to categorize the different content.

### Deploy Script

The project is deployed through the github pages service. The flat hugo files are pushed to the gh-pages branch.

A `deploy.sh` script is included in the repo to push changes to gh-pages automatically.

## License

The website's source is released under the MIT License.

The documentation and courses is released under GNU FDL.

## Special Thanks to:

This project is made possible through Google's Summer of Code (GSOC) 2015 Program.

The mentor for this project is none other than Martin Raifer (@tyr_asd), responsible for the excellent [Overpass Turbo](http://overpass-turbo.eu).

Weekly writeups on the project will be posted every wednesday on Arian's [blog](http://localhost:1313/series/gsoc-2015/). Arian (@secretmapper) is the GSOC student for this project.
