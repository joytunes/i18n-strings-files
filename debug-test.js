// Debug script to check key differences
const fs = require('fs');
const i18nStringsFiles = require('./index');

const filePath = __dirname + '/test/test.strings';

console.log('=== DEBUGGING KEYS FROM TEST FILE ===');

// Read the file
try {
  const data = i18nStringsFiles.readFileSync(filePath, 'UTF-16');
  
  console.log('Total keys found:', Array.from(data.keys()).length);
  console.log('\nAll keys with their values:');
  
  for (const [key, value] of data.entries()) {
    console.log(`\nKey: "${key}"`);
    console.log('Key length:', key.length);
    console.log('Key bytes:', Buffer.from(key).toString('hex'));
    
    if (typeof value === 'string') {
      console.log('Value:', value);
    } else {
      console.log('Value (text):', value.text);
      if (value.comments) {
        console.log('Comments:', Array.from(value.comments));
      }
    }
  }
  
  // Check specific keys format that might be failing in tests
  console.log('\n=== SPECIFIC KEYS CHECK ===');
  
  const expectingKeys = [
    'test-normal',
    'test-chars',
    'test-new-lines',
    'test-quotes',
    'test-semicolon',
    'test-spacing',
    'test \n edge" = ',
    'test-multiline-comment',
    'test-multiline-value',
    'test-multiline-value-with-space',
    'test-multiline-value-with-comment'
  ];
  
  expectingKeys.forEach(key => {
    if (data.has(key)) {
      console.log(`✅ Found key: "${key}"`);
    } else {
      console.log(`❌ Missing key: "${key}"`);
      
      // Try to find similar keys
      for (const existingKey of data.keys()) {
        if (existingKey.includes(key.substring(0, 10))) {
          console.log(`  - Similar key: "${existingKey}"`);
        }
      }
    }
  });
  
} catch (error) {
  console.error('Error:', error);
} 