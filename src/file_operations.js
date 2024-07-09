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


function find_brand(data, id)
{
    for (const obj of data) {
        for (const key in obj) {
            if (obj[key] === id) {
                return obj.marca;
            }
        }
    }
}


function get_sql_value(value) {
    return is_empty(value) ? 'NULL' : (typeof value === 'string' ? `'${value}'` : value);
}

function get_sql_value(value) {
    return is_empty(value) ? 'NULL' : (typeof value === 'string' ? `'${value}'` : value);
}

function generate_sql_insert(data1, data2, flag) {
    return data1.map(item1 => {
        let { data, id_marca_, nome, valor_do_veiculo, vendas, marca, id_marca } = item1;

        const datasql = get_sql_value(data);
        const id_modelosql = get_sql_value(id_marca_);
        const nome_modelosql = get_sql_value(nome);
        const valor_do_veiculosql = get_sql_value(valor_do_veiculo);
        const vendassql = get_sql_value(vendas);

        if (flag == 3) {
            marca = find_brand(data2, id_marca_);
            id_marca = get_sql_value(id_marca_);
        }

        const marca_sql = get_sql_value(marca);
        const id_marca_sql = get_sql_value(id_marca);

        if (flag === 1) {
            return `INSERT INTO Dados_de_vendas (data_da_venda, id_modelo, nome_modelo, valor_do_veiculo, vendas) VALUES (${datasql}, ${id_modelosql}, ${nome_modelosql}, ${valor_do_veiculosql}, ${vendassql});`;
        } else if (flag === 2) {
            return `INSERT INTO Dados_de_vendas (id_marca, marca) VALUES (${id_marca_sql}, ${marca_sql});`;
        } else if (flag === 3) {
            return `INSERT INTO Dados_de_vendas (data, id_marca, marca, nome_modelo, valor_do_veiculo, vendas) VALUES (${datasql}, ${id_marca_sql}, ${marca_sql}, ${nome_modelosql}, ${valor_do_veiculosql}, ${vendassql});`;
        } else {
            return null;
        }
    }).filter(sql => sql !== null).join('\n');
}
// Exportando as funções

module.exports = {
    read_json,
    export_json_file,
    generate_sql_insert
};
