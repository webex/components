# Scripts

The following document includes information on the **NPM** scripts available via this project.
Note that any script that includes `:ci` is intended to be used by our continuous integration platform only.

* `storybook` - Starts [**Storybook**](https://storybook.js.org) application and opens the browser.
  * `storybook:build` - Builds **Storybook** to the `./docs/storybook` directory.
  * `storybook:ci` - Cleans the `./docs/storybook` directory and builds **Storybook** to that directory.
  * `storybook:clean` - Removes all directories and files from `./docs/storybook`.