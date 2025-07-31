# README for resume-pdf-generator-cli

A CLI-tool to generate a PDF of a beautifully-formatted resume, from structured JSON data

## Installation

`npm install`

## Usage

If using directly within a dev environment:

`npm run start <PATH_TO_JSON_FILE>`

Edit the fields in the JSON file, making copies of lines where desired. Then run the command above to generate a PDF.

If using as a standalone executable:

`npm run build:native` or one of the specific build scripts for your OS

After retrieving the executable from the `dist` folder, run:
`./resume-generate <PATH_TO_JSON_FILE>` assuming you are using the native executable.

You can see examples of a JSON file with specifically-named fields (for positioning content in the PDF) in the `example-json` directory.

## Disclosure

This is a fresh project still. The fields for the resume will be much more editable in the future. The layout will be more intuitively-editable as well, but its current formatting is aesthetically-pleasing in my opinion.