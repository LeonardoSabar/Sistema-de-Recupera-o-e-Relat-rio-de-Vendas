
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


function find_brand(item1) {
        if (item1 === "onix") {
            return "Chevrolet";
        }
        else if (item1 === "argo" || item1 === "Cronos" || item1 === "Mobi" || item1 === "Palio" || item1 === "Uno") {
            return "Fiat";
        }
        else if (item1 === "E-J7" || item1 === "E-JS1" || item1 === "J2" || item1 === "J5") {
            return "Jac Motors";
        }
        else if (item1 === "Cerato" || item1 === "Picanto" || item1 === "Rio") {
            return "Kia";
        }
        else if (item1 === "Eclipse" || item1 === "L200" || item1 === "Lancer" || item1 === "Pajero") {
            return "Mitsubishi";
        }
        else if (item1 === "March") {
            return "Nissan";
        }
        else if (item1 === "206" || item1 === "208" || item1 === "307" || item1 === "2008") {
            return "Peugeot";
        }
        else if (item1 === "Captur" || item1 === "Clio" || item1 === "Duster" || item1 === "Sandero" || item1 === "Sandero RS") {
            return "Renault";
        }
        else if (item1 === "Brz" || item1 === "Forester" || item1 === "WRX" || item1 === "XV") {
            return "Subaru";
        }
        else if (item1 === "Corolla" || item1 === "Yaris") {
            return "Toyota";
        }
        else if (item1 === "Kombi" || item1 === "Polo" || item1 === "Saveiro" || item1 === "T-Cross" || item1 === "Up" || item1 === "Jetta" || item1 === "Gol") {
            return "Volkswagen";
        }
        else
            return null;          
}

function find_brand_code(brand)
{
    if (brand === "Fiat") {
        return 1;
    }
    else if (brand === "Volkswagen") {
        return 2;
    }
    else if (brand === "Kia") {
        return 3;
    }
    else if (brand === "Peugeot") {
        return 4;
    }
    else if (brand === "Toyota") {
        return 5;
    }
    else if (brand === "Nissan") {
        return 6;
    }
    else if (brand === "Mitsubishi") {
        return 7;
    }
    else if (brand === "Subaru") {
        return 8;
    }
    else if (brand === "Chevrolet") {
        return 9;
    }
    else if (brand === "Jac Motors") {
        return 10;
    }
    else if (brand === "Renault") {
        return 11;
    }
    else
        return null;          

}

function generate_sql_insert(data, flag) {
    return data.map(item1 => {
      const data = item1.data;
      const id_modelo = item1.id_marca_;
      const nome_modelo = item1.nome;
      const valor_do_veiculo = item1.valor_do_veiculo;
      const vendas = item1.vendas;
      let nome_marca = item1.marca;
      let id_marca = item1.id_marca;
      let marca_sql = is_empty(nome_marca) ? 'NULL' : `'${nome_marca}'`;
      let id_marca_sql = is_empty(id_marca) ? 'NULL' : id_marca;
      const datasql = is_empty(data) ? 'NULL' : `'${data}'`;
      const id_modelosql = is_empty(id_modelo) ? 'NULL' : id_modelo;
      const nome_modelosql = is_empty(nome_modelo) ? 'NULL' : `'${nome_modelo}'`;
      const valor_do_veiculosql = is_empty(valor_do_veiculo) ? 'NULL' : valor_do_veiculo;
      const vendassql = is_empty(vendas) ? 'NULL' : vendas;
      
      if (flag == 3) {
        nome_marca = find_brand(nome_modelo);
        id_marca = find_brand_code(nome_marca);
        marca_sql = is_empty(nome_marca) ? 'NULL' : `'${nome_marca}'`;
        id_marca_sql = is_empty(id_marca) ? 'NULL' : id_marca;
      }

      
    if (flag === 1) {
        return `INSERT INTO Database (data_da_venda, id_modelo, nome_modelo, valor_do_veiculo, vendas) VALUES (${datasql}, ${id_modelosql}, ${nome_modelosql}, ${valor_do_veiculosql}, ${vendassql});`;      
    }
    else if (flag === 2) {
        return `INSERT INTO Database (id_marca, marca) VALUES (${id_marca_sql}, ${marca_sql});`;
    }
    else if (flag === 3) {
        return `INSERT INTO Database (data, id_marca, marca, id_modelo, nome_modelo, valor_do_veiculo, vendas) VALUES (${datasql}, ${id_marca_sql}, ${marca_sql}, ${id_modelosql}, ${nome_modelosql}, ${valor_do_veiculosql}, ${vendassql});`;
    }
    else
        return null;
}).join('\n');
}

// Exportando as funções

module.exports = {
    read_json,
    export_json_file,
    generate_sql_insert
};
