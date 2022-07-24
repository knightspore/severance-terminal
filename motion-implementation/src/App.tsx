import {useState} from 'react';
import {motion} from 'framer-motion';

const randN = () => {
  return Math.floor(Math.random() * 10);
};

const randF = (min, max) => {
  return Math.random() * (max - min + 1) + min;
};

function App() {
  const [board, setBoard] = useState([]);
  const size = 64;
  const cols = size / 8;

  for (let i = 0; i < size; i++) {
    let n = randN().toString();
    board.length < size && setBoard(b => [...b, n]);
  }

  return (
    <Terminal>
      <NumberGrid {...{cols}}>
        {board.map(n => (
          <Sprite {...{n}} />
        ))}
      </NumberGrid>
    </Terminal>
  );
}

const Sprite = ({n}: {n: string}) => {
  const scales = [];
  const rots = [];
  const ops = [];

  for (let i = 0; i < 24; i++) {
    scales.push(randF(0.8, 1));
    rots.push(randF(-20, 20));
    ops.push(randF(0.8, 1));
  }

  const trs = {
    ease: 'easeInOut',
    repeat: Infinity,
  };

  return (
    <div>
      <motion.div
        className="h-12 w-12 flex justify-center items-center"
        initial={{
          scale: 1,
          rotate: 0,
        }}
        animate={{
          scale: scales,
          rotate: rots,
          opacity: ops,
          transition: {
            duration: 60,
            ...trs,
          },
        }}
        whileHover={{
          // Scale on Hover
          scale: randF(1.3, 1.8),
          transition: {
            duration: randF(0.2, 0.4),
            ...trs,
          },
        }}
      >
        <p className="text-md select-none inline-block">{n}</p>
      </motion.div>
    </div>
  );
};

const NumberGrid = ({cols, ...props}: {cols: number}) => {
  const colMap = {
    4: 'grid-cols-4',
    8: 'grid-cols-8',
    16: 'grid-cols-16',
    32: 'grid-cols-32',
  };

  return (
    <div className={`grid ${colMap[cols]}`} id="grid">
      {props.children}
    </div>
  );
};

const Terminal = ({...props}) => {
  return (
    <>
      <div className="screen absolute mix-blend-overlay w-screen h-screen" />
      <div
        id="terminal"
        className="text-center bg-gradient-to-b from-zinc-900/90 to-zinc-900 text-cyan-100 w-screen h-screen flex items-center justify-center"
      >
        {props.children}
      </div>
    </>
  );
};

export default App;
