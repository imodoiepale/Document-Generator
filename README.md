# React Document Generator

This React application is designed to generate documents based on predefined templates. It allows users to select a template, fill in the required fields, and download the completed document in either DOCX or PDF format.

## Features

- **Template Selection**: The application provides a selection of templates, each with its own set of required fields. The templates are defined in an array with the template name, fields, and path to the DOCX file.
- **Dynamic Input Fields**: Based on the selected template, input fields are dynamically generated for the user to fill in the required information.
- **Document Generation**: The application uses the `docxtemplater` and `pizzip` libraries to generate a DOCX document based on the selected template and the user-provided values.
- **File Download**: Users can download the generated document as a DOCX file using the `file-saver` library. Additionally, the application provides the option to convert the DOCX file to PDF format using the `docx-pdf` library.

## Usage

1. Select a template from the dropdown menu.
2. Fill in the required fields that appear based on the selected template.
3. Click the "Download DOCX" button to download the document in DOCX format.
4. Click the "Download PDF" button to download the document in PDF format.

