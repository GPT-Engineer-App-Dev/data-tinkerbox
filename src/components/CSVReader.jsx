import React from 'react';
import Papa from 'papaparse';
import { Button } from "@/components/ui/button";

const CSVReader = ({ onUpload }) => {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          onUpload(result.data);
        },
        header: true,
        skipEmptyLines: true,
      });
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        style={{ display: 'none' }}
        id="csv-file-input"
      />
      <label htmlFor="csv-file-input">
        <Button as="span">Upload CSV</Button>
      </label>
    </div>
  );
};

export default CSVReader;