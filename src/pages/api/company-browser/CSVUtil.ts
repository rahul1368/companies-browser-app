import Papa from 'papaparse';
import fs from 'fs/promises';
import fsA from 'fs';
import * as readline from 'readline';

class CSVUtil {
  static async readCSV(filePath: string): Promise<any[]> {
    try {
      const fileData: string = await fs.readFile(filePath, 'utf8');
      return new Promise<any[]>((resolve, reject) => {
        Papa.parse(fileData, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            resolve(result.data);
          },
          error: (error) => {
            reject(error.message);
          },
        });
      });
    } catch (error) {
      throw new Error(`Error reading CSV file: ${error.message}`);
    }
  }

  static async readLargeCSV(filePath: string, onData: (data: any[]) => void): Promise<number> {
    const stream = fsA.createReadStream(filePath, 'utf8');
    let totalRows = 0;
    return new Promise((resolve, reject) => {
      Papa.parse(stream, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
        step: function (results) {
          onData(results.data);
          totalRows++;
        },
        complete: function () {
          resolve(totalRows);
        },
        error: function (error) {
          reject(new Error(`CSV parsing error: ${error.message}`));
        },
      });
    });
  }
}

export default CSVUtil;
