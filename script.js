const calcularOperacion = expresion => {
    const partes = expresion.match(/(\d+|\+|\-|\*|\/)/g);
    let resultado = parseFloat(partes[0]);
    let pasos = [];

    for (let i = 1; i < partes.length; i += 2) {
        const operador = partes[i];
        const numero = parseFloat(partes[i + 1]);
        let resultadoAnterior = resultado;

        resultado = {
            '+': resultado + numero,
            '-': resultado - numero,
            '*': resultado * numero,
            '/': resultado / numero
        }[operador];

        pasos.push(`Operacion: ${resultadoAnterior} ${operador} ${numero} = ${resultado}`);
    }

    pasos.push(`Resultado: ${resultado}`);
    return pasos;
};

document.getElementById('calcular').addEventListener('click', () => {
    const expresion = document.getElementById('expresion').value.trim();
    const errorDiv = document.getElementById('error');
    const resultadoDiv = document.getElementById('resultado');

    resultadoDiv.innerHTML = '';
    errorDiv.innerHTML = '';

    const partes = expresion.match(/(\d+|\+|\-|\*|\/)/g);
    
    
    if (!expresion) {
        errorDiv.innerHTML = 'La expresión no puede estar vacía.';
        return;
    }
    if (partes.length < 3 || partes.length % 2 === 0) {
        errorDiv.innerHTML = 'La expresión debe tener al menos dos operaciones.';
        return;
    }
    if (/[^0-9+\-*/]/.test(expresion)) {
        errorDiv.innerHTML = 'La expresión solo puede contener números y operadores matemáticos.';
        return;
    }

    const pasos = calcularOperacion(expresion);
    resultadoDiv.innerHTML = `${pasos.join('<br>')}`;
});
