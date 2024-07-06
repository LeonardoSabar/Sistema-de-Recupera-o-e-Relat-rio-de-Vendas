
//Função para corrigir nomes de marcas e veículos

function correct_names(data){
    data.forEach(item => {
        item.brand = item.brand.replace(/æ/g, 'a').replace(/ø/g, 'o');
        item.vehicle = item.vehicle.replace(/æ/g, 'a').replace(/ø/g, 'o');
    });
    return data;
}

//Função para corrigir vendas

function correct_sales(data){
    data.forEach(item => {
        if (typeof item.sales === 'string') {
            item.sales = Number(item.sales);
        }
    });
    return data;
}

//Exportando as funções

module.exports = {
    correct_names,
    correct_sales
};