const fs = require('fs');

// Importando as funções dos outros arquivos

const { read_json, export_json_file, generate_sql_insert } = require('./file_operations');
const { correct_names, correct_sales } = require('./data_correction');

// Fluxo Principal

const db1 = read_json('./data/broken_database_1.json');
const db2 = read_json('./data/broken_database_2.json');

const db1_corrected = correct_names(db1);
const db2_corrected = correct_names(db2);

correct_sales(db1_corrected, db2_corrected);

export_json_file('./output/db1_corrected.json', db1_corrected);
export_json_file('./output/db2_corrected.json', db2_corrected);

const db1_sql = generate_sql_insert(db1_corrected, 1);
const db2_sql = generate_sql_insert(db2_corrected, 2);
const db3_sql = generate_sql_insert(db1_corrected, 3); 

fs.writeFileSync('./sql/db1.sql', db1_sql, 'utf8');
fs.writeFileSync('./sql/db2.sql', db2_sql, 'utf8');
fs.writeFileSync('./sql/db_merged.sql', db3_sql, 'utf8');

console.log('\x1b[33m' + '---------------------------------------');
console.log('\x1b[33m' + '---- Arquivos gerados com sucesso! ----');
console.log('\x1b[033m' + '---------------------------------------');
