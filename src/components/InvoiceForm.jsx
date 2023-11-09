import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import docxConverter from 'docx-pdf';

const templates = [
  { name: 'UNIVERSITY OF SUNDERLAND', fields: ['Name', 'Date'], path: '/sunderland.docx' },
  { name: 'Template 2', fields: ['FirstName', 'LastName', 'Email', 'Address', 'PhoneNumber'], path: '/t2.docx' },
  { name: 'Template 3', fields: ['Company', 'Position', 'StartDate', 'EndDate', 'Responsibilities', 'Achievements', 'References'], path: '/t3.docx' },
];

const InvoiceForm = () => {
  const [template, setTemplate] = useState(null);
  const [values, setValues] = useState({});

  const handleTemplateChange = (event) => {
    const selectedTemplate = templates.find(t => t.name === event.target.value);
    setTemplate(selectedTemplate);
    setValues({});
  };

  const handleInputChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleDocxDownload = async () => {
    if (!template) return;

    try {
      const content = await fetch(template.path).then((response) => response.arrayBuffer());
      const zip = new PizZip(content);
      const doc = new Docxtemplater(zip);
      doc.setData(values);
      doc.render();
      const blob = doc.getZip().generate({ type: 'blob' });
      saveAs(blob, 'output.docx');
    } catch (error) {
      console.error(error);
    }
  };

  const handlePdfDownload = async () => {
    if (!template) return;

    try {
      const content = await fetch(template.path).then((response) => response.arrayBuffer());
      const zip = new PizZip(content);
      const doc = new Docxtemplater(zip);
      doc.setData(values);
      doc.render();
      const blob = doc.getZip().generate({ type: 'blob' });
      saveAs(blob, 'output.docx');

      docxConverter('output.docx', 'output.pdf', function (err, result) {
        if (err) {
          console.error(err);
        }
        console.log('result: ' + result);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <select onChange={handleTemplateChange}>
        <option value="">Select a template</option>
        {templates.map(t => <option key={t.name} value={t.name}>{t.name}</option>)}
      </select>
      {template && template.fields.map(field => (
        <input
          key={field}
          type="text"
          name={field}
          value={values[field] || ''}
          onChange={handleInputChange}
          placeholder={field}
        />
      ))}
      {template && <button onClick={handleDocxDownload}>Download DOCX</button>}
      {template && <button onClick={handlePdfDownload}>Download PDF</button>}
    </div>
  );
};

export default InvoiceForm;
