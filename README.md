# Projeto de Manipulação de Dados e Geração de SQL

## Descrição

Este projeto é uma ferramenta para ler dados de arquivos JSON corrompidos, corrigir inconsistências e gerar scripts SQL para popular um banco de dados. O projeto inclui funções para corrigir dados, gerar arquivos JSON e criar instruções SQL `INSERT`.

## Funcionalidades

- **Leitura de Arquivos JSON**: Lê dados de arquivos JSON contendo informações sobre marcas e veículos.
- **Correção de Dados**: Corrige nomes de marcas e veículos e valores de vendas.
- **Exportação de Dados**: Salva os dados corrigidos em novos arquivos JSON.
- **Geração de Scripts SQL**: Cria scripts SQL `INSERT` para popular tabelas de banco de dados com dados corrigidos e um banco de dados combinado.


## Arquivos

### `file_operations.js`

Este arquivo contém funções para manipulação de arquivos e geração de SQL:

- **Funções**:
  - `read_json(file_path)`: Lê um arquivo JSON e retorna os dados.
  - `export_json_file(file_path, data)`: Escreve dados em um arquivo JSON.
  - `generate_sql_insert(data1, data2, flag)`: Gera scripts SQL `INSERT` para tabelas de banco de dados.

### `data_correction.js`

Este arquivo contém funções para corrigir dados dos arquivos JSON:

- **Funções**:
  - `correct_names(data)`: Corrige nomes de marcas e veículos, substituindo caracteres especiais.
  - `correct_sales(data)`: Converte valores de vendas de string para número.

### `index.js`

Este é o script principal que executa o fluxo do projeto:

- **Fluxo Principal**:
  1. Lê os arquivos JSON com dados corrompidos.
  2. Corrige os dados.
  3. Exporta os dados corrigidos para novos arquivos JSON.
  4. Gera scripts SQL `INSERT` para popular o banco de dados.
  5. Salva os scripts SQL em arquivos.

## Como Executar

Para executar o projeto, siga os passos abaixo:

1. **Instale as dependências**:

   ```bash
   npm install
    ```
Isso lerá os arquivos JSON, corrigirá os dados, exportará os arquivos JSON corrigidos e gerará os arquivos SQL com as instruções INSERT.

## Tratamento de Erros

O código inclui tratamentos de erros para:

- **Leitura e Escrita de Arquivos**: Erros ao ler ou escrever arquivos JSON e SQL são capturados e exibidos. O tratamento de erros garante que qualquer falha na leitura dos arquivos de entrada ou na escrita dos arquivos de saída seja informada ao usuário, evitando falhas silenciosas e fornecendo feedback útil.

- **Funções de Correção**: Supõe-se que as funções de correção são robustas e foram testadas para manipular dados de forma correta. As funções `correct_names` e `correct_sales` foram desenvolvidas e testadas para lidar com inconsistências comuns nos dados, como caracteres especiais e conversão de valores de string para número.

## Exemplo de Saída

Após a execução do script, os seguintes arquivos serão gerados:

- **JSON Corrigidos**:
  - `./output/db1_corrected.json`: Arquivo JSON com os dados corrigidos de `broken_database_1.json`.
  - `./output/db2_corrected.json`: Arquivo JSON com os dados corrigidos de `broken_database_2.json`.

- **Scripts SQL**:
  - `./sql/db1.sql`: Dados para popular a tabela `Dados_de_vendas` com informações do `broken_database_1.json`.
  - `./sql/db2.sql`: Dados para popular a tabela `Dados_de_vendas` com informações do `broken_database_2.json`.
  - `./sql/combined.sql`: Dados para popular a tabela `Dados_de_vendas` com informações combinadas dos arquivos JSON.