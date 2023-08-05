export const formataData = (data:Date):string=> {
    const dia = data.getDate();
    const mes = data.getMonth() + 1;
    const ano = data.getFullYear();
  
    const diaFormatado = dia < 10 ? '0' + dia : dia;
    const mesFormatado = mes < 10 ? '0' + mes : mes;
  
    return `${diaFormatado}/${mesFormatado}/${ano}`;
}