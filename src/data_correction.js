
//Função para corrigir nomes
function correct_names(data) {
    data.forEach(item => {
      if (typeof item.nome === 'string') {
        item.nome = item.nome.replace(/\æ/g, 'a').replace(/\ø/g, 'o');
        
      }
      else if (typeof item.marca === 'string') {
        item.marca = item.marca.replace(/\æ/g, 'a').replace(/\ø/g, 'o');
      }
    });
    return data;
}

//Função para corrigir vendas
function correct_sales(data){
    data.forEach(item => {
        if (typeof item.vendas === 'string') {
            item.vendas = Number(item.vendas);
        }
    });
    return data;
}

//Exportando as funções
module.exports = {
    correct_names,
    correct_sales
};