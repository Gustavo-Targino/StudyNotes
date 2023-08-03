export function PerProgress(done:number, all:number) {
    if(done === 0) {
        return 0
    }
    const porcentagem = (done / all) * 100;
    return parseFloat(porcentagem.toFixed(1))
}
