import React, { useState } from "react";

function PasswordChecker({ onPasswordCorrect }: { onPasswordCorrect: (passwordNumber: number) => void }) {
  const [input, setInput] = useState('');

  const checkPassword = () => {
      const passwords : any = {
          'idea': 1,
          'animals': 2,
          'animal': 2,
          'treats': 3,
          'endo': 4,
          'donut': 5,
      };

      if (passwords[input]) {
          onPasswordCorrect(passwords[input]);
      } else {
          alert('Incorrect password!');
      }
  };

  return (
      <div>
        <br></br>
          <input
              type="text"
              placeholder="all lowercase"
              value={input}
              onChange={(e) => setInput(e.target.value)}
          />
          <br></br>
          <button onClick={checkPassword}>Check Password</button>
      </div>
  );
}

export default PasswordChecker;