
const fs = require('fs');

// Função para ler arquivos JSON

function read_json(file_path) {
    const data = fs.readFileSync(file_path, 'utf8');
    const json_data = JSON.parse(data);
    return json_data;
}

// Função para escrever arquivos JSON

function export_json_file(file_path, data) {
    const json_data = JSON.stringify(data, null, 2);
    fs.writeFileSync(file_path, json_data, 'utf8');
}

// Função para gerar SQL INSERT

function is_empty(value) {
    return value === undefined || value === null || value === '';
}
function generate_sql_insert(data) {
    return data.map(item => {
        const data = item.data;
        const id_marca = item.id_marca || item.id_marca_;
        const marca = item.marca;
        const nome = item.nome;
        const valor_do_veiculo = item.valor_do_veiculo;
        const vendas = item.vendas;

        const datasql = is_empty(data) ? 'NULL' : `'${data}'`;
        const id_marcasql = is_empty(id_marca) ? 'NULL' : id_marca;
        const nomesql = is_empty(nome) ? 'NULL' : `'${nome}'`;
        const marcasql = is_empty(marca) ? 'NULL' : `'${marca}'`;
        const valor_do_veiculosql = is_empty(valor_do_veiculo) ? 'NULL' : valor_do_veiculo;
        const vendassql = is_empty(vendas) ? 'NULL' : vendas;

        return `INSERT INTO Dados_de_vendas (data_da_venda, id_marca, nome, marca, valor_do_veiculo, vendas) VALUES (${datasql}, ${id_marcasql}, ${nomesql}, ${marcasql}, ${valor_do_veiculosql}, ${vendassql});`;
    }).join('\n');
}

// Exportando as funções

module.exports = {
    read_json,
    export_json_file,
    generate_sql_insert
};
