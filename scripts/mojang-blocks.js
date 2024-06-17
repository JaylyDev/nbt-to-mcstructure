const axios = require('axios');
const fs = require('fs');
const path = require('path');

const url = 'https://raw.githubusercontent.com/Mojang/bedrock-samples/main/metadata/vanilladata_modules/mojang-blocks.json';
const outputFile = path.resolve(__dirname, '../assets/blockstates.json');
const blockStates = {};

axios.get(url)
  .then(response => {
    const data = response.data;
    data.block_properties.forEach(property => {
      blockStates[property.name] = {
        values: property.values.map(value => value.value),
        type: property.type
      };
    });
    fs.writeFileSync(outputFile, JSON.stringify(blockStates, null, 2));
    console.log('Block states generated successfully!');
  })
  .catch(error => {
    console.error('Error fetching block states:', error);
  }); 