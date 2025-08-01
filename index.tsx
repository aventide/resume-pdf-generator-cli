import fs from 'node:fs';
import ReactPDF from '@react-pdf/renderer';

import PDFResume from './PDFResume';

const args = process.argv.slice(2);
if (args.length < 1) {
    console.error('Please provide a JSON file path as an argument.');
    process.exit(1);
}

const jsonFilePath = args[0];

let text: any;
try {
    const fileContents = fs.readFileSync(jsonFilePath, 'utf-8');
    text = JSON.parse(fileContents);
} catch (err) {
    console.error('Failed to read or parse JSON:', err);
    process.exit(1);
}

ReactPDF.render(<PDFResume text={text} />, `${__dirname}/${text.pdfFilename}`);
console.log(`Content rendered to ${text.pdfFilename}`);