export function PerProgress(done:number, all:number) {
    if(done === 0) {
        return 0
    }

     if(all === 0) {
        all += 1
    }

    const porcentagem = (done / all) * 100;
    return parseFloat(porcentagem.toFixed(1))
}
