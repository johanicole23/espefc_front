import * as XLSX from 'xlsx';
import Papa from 'papaparse';

export const convertExcelToCSV = (excelFile, callback) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    const data = e.target.result;
    const workbook = XLSX.read(data, { type: 'binary' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const csvData = XLSX.utils.sheet_to_csv(sheet);
    callback(csvData);
  };
  reader.readAsBinaryString(excelFile);
};

export const convertCSVToJSON = (csvData, callback) => {
  Papa.parse(csvData, {
    header: true,
    dynamicTyping: true,
    complete: (result) => {
      callback(result.data);
    },
  });
};