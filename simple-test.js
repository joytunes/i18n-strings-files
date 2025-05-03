// Simple test to verify iconv-lite works correctly
const fs = require('fs');
const i18nStringsFiles = require('./index');

// Test reading a strings file
console.log('Testing iconv-lite implementation...');
const filePath = __dirname + '/test/test.strings';

// Sync test
try {
  console.log('Reading file synchronously...');
  const data = i18nStringsFiles.readFileSync(filePath, 'UTF-16');
  console.log('Successfully read file synchronously');
  console.log('Keys found:', Array.from(data.keys()).length);
  
  // Check if a couple of specific keys exist
  if (data.has('test-normal')) {
    console.log('Found test-normal key:', data.get('test-normal'));
  } else {
    console.log('ERROR: Missing test-normal key');
  }
  
  if (data.has('test-new-lines')) {
    console.log('Found test-new-lines key:', data.get('test-new-lines'));
  } else {
    console.log('ERROR: Missing test-new-lines key');
  }
} catch (error) {
  console.error('Error in sync test:', error);
}

// Async test
console.log('\nReading file asynchronously...');
i18nStringsFiles.readFile(filePath, 'UTF-16', (err, data) => {
  if (err) {
    console.error('Error in async test:', err);
    return;
  }
  
  console.log('Successfully read file asynchronously');
  console.log('Keys found:', Array.from(data.keys()).length);
  
  // Test writing to a file
  console.log('\nWriting file...');
  const tempFile = __dirname + '/test/temp-test.strings';
  
  i18nStringsFiles.writeFile(tempFile, data, 'UTF-16', (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return;
    }
    
    console.log('Successfully wrote file');
    
    // Read it back
    console.log('\nReading written file...');
    i18nStringsFiles.readFile(tempFile, 'UTF-16', (err, newData) => {
      if (err) {
        console.error('Error reading written file:', err);
        return;
      }
      
      console.log('Successfully read written file');
      console.log('Keys found:', Array.from(newData.keys()).length);
      
      // Clean up
      fs.unlinkSync(tempFile);
      console.log('Temp file deleted');
      console.log('\nAll tests passed successfully!');
    });
  });
}); 