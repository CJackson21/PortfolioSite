const purgecss = require('@fullhuman/postcss-purgecss');

module.exports = {
  plugins: [
    purgecss({
      // Include paths to all template files in your project
      content: [
        './**/*.html', // Path to your HTML files
        './src/**/*.jsx' // Path to your JSX files (adjust the path as necessary)
      ],
      // This is necessary to extract classes from within JSX files
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
    })
  ]
}
