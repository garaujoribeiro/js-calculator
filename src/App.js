import React, { useState, useCallback, useEffect } from 'react';
import './App.css';
const App = () => (
  <>
    <Calculator />
  </>
);

const Calculator = () => {
  // Estados da minha caculadora
  const [primeiro, setPrimeiro] = useState('');
  const [segundo, setSegundo] = useState('');
  const [fase, setFase] = useState(1);
  const [operacao, setOperacao] = useState('');
  const [resultado, setResultado] = useState('');
  const [negativo, setNegativo] = useState({});
  useEffect(() => {
    if (resultado) setPrimeiro(resultado);
  }, [resultado, primeiro]);

  // função para operar os números

  const operar = useCallback((numA, numB, operador) => {
    switch (operador) {
      case '+':
        console.log(numA, numB);
        return numA + numB;
      case '-':
        return numA - numB;
      case 'x':
        return numA * numB;
      case '/':
        return numA / numB;
    }
  }, []);

  // função para manusear as teclas de operação
  const handleOperacao = ({ target }) => {
    let operador = target.innerHTML;
    if (operador === 'ac') {
      setPrimeiro('');
      setSegundo('');
      setFase(1);
      setOperacao('');
      setResultado('');
    } else if (operador === '.') {
      if (operacao === '.') return null;
      fase === 1
        ? setPrimeiro(
            !primeiro.split('').includes('.')
              ? primeiro
                ? primeiro + operador
                : 0 + operador
              : primeiro,
          )
        : setSegundo(segundo + operador);
    } else if (operador === '=') {
      if (fase === 1 || !segundo || !operacao || operacao === '.') {
        return null;
      }
      if (negativo) {
        setResultado(operar(Number(primeiro), Number(segundo) * -1, operacao));
        setSegundo('');
        setOperacao('');
        setFase(1);
        setNegativo(false);
      } else if (!negativo) {
        setResultado(operar(Number(primeiro), Number(segundo), operacao));
        setSegundo('');
        setOperacao('');
        setFase(1);
      }
    } else {
      if (fase === 1) {
        setFase(2);
        setOperacao(operador);
      } else if (fase === 2) {
        if (!segundo) {
          if (operador === '-') {
            console.log('caquinha');
            setNegativo(true);
            setSegundo('');
          } else {
            setNegativo(false);
            console.log('semcaquinha');
            setOperacao(operador);
          }
        } else {
          setResultado(operar(Number(primeiro), Number(segundo), operacao));
          setSegundo('');
          setOperacao(operador);
        }
      }
    }
  };
  // função para lidar com os numeros da calculadora
  const handleNumeros = ({ target }) => {
    let numero = target.innerHTML;
    if (
      (numero === '0' && primeiro === '0') ||
      (numero === '0' && segundo === '0')
    ) {
      return null;
    } else if (!!resultado && fase === 1) {
      setResultado('');
      setPrimeiro(numero);
    } else if (fase === 1) {
      setPrimeiro(primeiro ? primeiro + numero : numero);
    } else if (fase === 2) {
      setSegundo(segundo ? segundo + numero : numero);
    }
  };

  const numeros = [
    { id: 'zero', numero: '0' },
    { id: 'one', numero: '1' },
    { id: 'two', numero: '2' },
    { id: 'three', numero: '3' },
    { id: 'four', numero: '4' },
    { id: 'five', numero: '5' },
    { id: 'six', numero: '6' },
    { id: 'seven', numero: '7' },
    { id: 'eight', numero: '8' },
    { id: 'nine', numero: '9' },
  ];
  const operacoesTeclas = [
    { id: 'clear', tecla: 'ac' },
    { id: 'divide', tecla: '/' },
    { id: 'multiply', tecla: 'x' },
    { id: 'subtract', tecla: '-' },
    { id: 'add', tecla: '+' },
    { id: 'equals', tecla: '=' },
    { id: 'decimal', tecla: '.' },
  ];
  return (
    <>
      <div id="calculadora">
        <div id="display">
          <p id="display-atual">
            {primeiro
              ? segundo
                ? segundo
                : primeiro
              : resultado
              ? resultado
              : '0'}
          </p>
        </div>
        {numeros.map((item, idx) => (
          <p
            key={idx}
            onClick={handleNumeros}
            className={'teclas'}
            id={item.id}
          >
            {item.numero}
          </p>
        ))}
        {operacoesTeclas.map((item, idx) => (
          <p
            key={idx}
            onClick={handleOperacao}
            className={'teclas'}
            id={item.id}
          >
            {item.tecla}
          </p>
        ))}
      </div>
    </>
  );
};

export default App;
