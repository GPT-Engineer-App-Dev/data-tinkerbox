import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import CSVReader from './CSVReader';
import CSVDownloader from './CSVDownloader';

const CSVEditor = () => {
  const [csvData, setCSVData] = useState([]);
  const [headers, setHeaders] = useState([]);

  const handleCSVUpload = (data) => {
    if (data.length > 0) {
      setHeaders(Object.keys(data[0]));
      setCSVData(data);
    }
  };

  const handleEditCell = (rowIndex, columnName, value) => {
    const updatedData = csvData.map((row, index) => 
      index === rowIndex ? { ...row, [columnName]: value } : row
    );
    setCSVData(updatedData);
  };

  const handleAddRow = () => {
    const newRow = headers.reduce((acc, header) => ({ ...acc, [header]: '' }), {});
    setCSVData([...csvData, newRow]);
  };

  const handleDeleteRow = (rowIndex) => {
    const updatedData = csvData.filter((_, index) => index !== rowIndex);
    setCSVData(updatedData);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">CSV Editor</h1>
      <div className="mb-4">
        <CSVReader onUpload={handleCSVUpload} />
      </div>
      {csvData.length > 0 && (
        <>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {headers.map((header) => (
                    <TableHead key={header}>{header}</TableHead>
                  ))}
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {csvData.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {headers.map((header) => (
                      <TableCell key={`${rowIndex}-${header}`}>
                        <Input
                          value={row[header]}
                          onChange={(e) => handleEditCell(rowIndex, header, e.target.value)}
                        />
                      </TableCell>
                    ))}
                    <TableCell>
                      <Button variant="destructive" onClick={() => handleDeleteRow(rowIndex)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mt-4 space-x-4">
            <Button onClick={handleAddRow}>Add Row</Button>
            <CSVDownloader data={csvData} filename="edited_csv_file.csv" />
          </div>
        </>
      )}
    </div>
  );
};

export default CSVEditor;