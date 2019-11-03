import React, { useState, useEffect } from "react";
import "./App.css";

const initMatrix = [];
function App() {
  const [matrix, setMatrix] = useState(initMatrix);
  const [matrixSize, setMatrixSize] = useState(4);
  const [currentPlayer, setCurrentPlayer] = useState("o");
  //  設定選擇的欄/列
  const [selR, setSelR] = useState(null);
  const [selC, setSelC] = useState(null);
  // 設定贏家的狀態
  const [winner, setWinner] = useState(false);
  const [reset, setReset] = useState(false);

  //  現在要畫matrix
  useEffect(() => {
    setWinner(false)
    setSelC(null)
    setSelR(null)
    // 建立row與col來填
    const row = new Array(matrixSize).fill(null);

    // 建立空的tempMatric暫時將rows填充到裡面
    const tempMatrix = [];
    for (let i = 0; i < matrixSize; i++) {
      tempMatrix.push([...row])
    }
    // 再將temp放到真的matrix上面
    setMatrix(tempMatrix)

  }, [reset])
  function squareClick(r, c) {
    // console.log(r, c)
    // 如果這顆按鈕，目前沒有任何的x/o的狀態，現在user要點的情況考慮
    // 還有要在尚未有贏家的時候，才可以考慮
    if (!matrix[r][c] && !winner) {
      // 記憶選擇的col與row
      setSelC(c);
      setSelR(r);
      let nextPlayer = currentPlayer === 'x' ? 'o' : 'x';
      setCurrentPlayer(nextPlayer);
      const matrixCopy = [...matrix];
      matrixCopy[r][c] = nextPlayer;
      setMatrix(matrixCopy);
    }
  }
  // 判斷是否有贏家的條件
  function isWinner() {
    // 贏的情況 直/橫/左斜/右斜
    let vertical = true;
    let horizontal = true;
    let d1 = true;
    let d2 = true;

    if (selR === null || selC === null) {
      return
    }
    for (let i = 0; i < matrixSize; i++) {
      // console.log("i is" + i)
      console.log("matrixSize" + matrixSize)
      if (matrix[i][selC] !== currentPlayer) {
        vertical = false;
      }

      if (matrix[selR][i] !== currentPlayer) {
        horizontal = false
      }

      if (matrix[i][i] !== currentPlayer) {
        console.log("matrix[i][i]" + matrix[i][i])
        d1 = false
      }
      if (matrix[i][matrixSize - i - 1] !== currentPlayer) {
        console.log("matrix[i][matrixSize - i - 1]" + matrix[i][matrixSize - i - 1]);
        d2 = false
      }
    }
    if (vertical || horizontal || d1 || d2) {
      setWinner(true)
    }
  }
  useEffect(() => {
    // 如果沒有贏家，就要每次都檢查輸贏狀態
    if (!winner) {
      isWinner()
    }

  })

  function resetGame() {
    setReset(!reset)
  }
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={resetGame}>Reset Game</button>
        <div>
          {
            // column
            matrix.map((val, c) => (
              <div className="c">

                {
                  // row
                  val.map((val1, r) => (
                    <div
                      onClick={() => {
                        squareClick(r, c);
                      }}
                      className="r"
                    >
                      {matrix[r][c]}
                    </div>
                  ))}
              </div>
            ))}
        </div>
        <h2>{winner ? `Player ${currentPlayer} is a winner` : ""}</h2>
      </header>
    </div>
  );
}

export default App;
