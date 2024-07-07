import pandas as pd
import matplotlib.pyplot as plt
from fpdf import FPDF
import csv

# Função para ler colunas específicas de um arquivo CSV
def columns_csv(csv_file_path, database):
    with open(csv_file_path, 'r') as csv_file:
        reader = csv.reader(csv_file)
        headers = next(reader)
        for column in database:
            if column not in headers:
                raise ValueError(f'Coluna {column} não encontrada no arquivo CSV.')
        data_columns = {column: [] for column in database}
        for row in reader:
            line_values = {column: row[headers.index(column)] for column in database}
            for column, value in line_values.items():
                data_columns[column].append(value)
        return data_columns

# Caminho para o arquivo CSV
csv_file_path = '../Entrega_final/database.csv'

# Colunas base
columns_base = ['data_da_venda', 'id_marca', 'marca', 'valor_do_veículo', 'vendas']

# Leitura do arquivo CSV e conversão em DataFrame
data_columns = columns_csv(csv_file_path, columns_base)
df = pd.DataFrame(data_columns)

# Convertendo a coluna 'vendas' para valores numéricos
df['vendas'] = pd.to_numeric(df['vendas'], errors='coerce')
df.dropna(subset=['vendas'], inplace=True)

# Convertendo a coluna 'valor_do_veículo' para valores numéricos
df['valor_do_veículo'] = df['valor_do_veículo'].str.replace('.', '').str.replace(',', '.').astype(float)

# Scatter plot de Vendas vs Receita
plt.scatter(df['vendas'], df['valor_do_veículo'])
plt.title('Relação entre Vendas e Receita dos Veículos')
plt.xlabel('Vendas')
plt.ylabel('Receita')
plt.savefig('scatter_plot.png')
plt.show()

# Agrupar por marca e somar as vendas
brand_sales = df.groupby('marca')['vendas'].sum()

# Marca com o maior volume de vendas
top_brand = brand_sales.idxmax()
top_brand_sales = brand_sales.max()

# Veículo com maior receita
max_revenue_vehicle = df.loc[df['valor_do_veículo'].idxmax()]

# Veículo com menor receita
min_revenue_vehicle = df.loc[df['valor_do_veículo'].idxmin()]

# Média de vendas por marca
average_sales_per_brand = df.groupby('marca')['vendas'].mean()

# Receita total e número de vendas por marca
brand_revenue_sales = df.groupby('marca').agg({'valor_do_veículo': 'sum', 'vendas': 'sum'})

# Filtrar marcas com receita alta e vendas baixas
high_revenue_low_sales = brand_revenue_sales[
    (brand_revenue_sales['valor_do_veículo'] > brand_revenue_sales['valor_do_veículo'].mean()) &
    (brand_revenue_sales['vendas'] < brand_revenue_sales['vendas'].mean())
]

# Criação do PDF
class PDF(FPDF):
    def header(self):
        self.set_font('Arial', 'B', 12)
        self.cell(0, 10, 'Relatório de Vendas', 0, 1, 'C')

    def chapter_title(self, title):
        self.set_font('Arial', 'B', 12)
        self.cell(0, 10, title, 0, 1, 'L')
        self.ln(10)

    def chapter_body(self, body):
        self.set_font('Arial', '', 12)
        self.multi_cell(0, 10, body)
        self.ln()

# Instância do PDF
pdf = PDF()
pdf.add_page()
pdf.chapter_title("Análise de Vendas de Veículos")

# Adiciona conteúdo ao PDF
pdf.chapter_body(f"A marca com maior volume de vendas é: {top_brand} com {top_brand_sales} vendas.")
pdf.chapter_body(f"O veículo que gerou a maior receita é: {max_revenue_vehicle['marca']} com receita de R$ {max_revenue_vehicle['valor_do_veículo']:.2f}.")
pdf.chapter_body(f"O veículo que gerou a menor receita é: {min_revenue_vehicle['marca']} com receita de R$ {min_revenue_vehicle['valor_do_veículo']:.2f}.")

pdf.chapter_title("Média de Vendas por Marca")
average_sales_body = average_sales_per_brand.to_string()
pdf.chapter_body(average_sales_body)

pdf.chapter_title("Marcas que geraram maior receita com menor número de vendas")
high_revenue_low_sales_body = high_revenue_low_sales.to_string()
pdf.chapter_body(high_revenue_low_sales_body)

# Salvando o PDF
pdf_output_path = 'sales_report.pdf'
pdf.output(pdf_output_path)

print(f'Relatório gerado com sucesso: {pdf_output_path}')
