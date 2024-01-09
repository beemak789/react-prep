const onKeyPress = (event) => {
  const { key } = event;
  let letter = key.charCodeAt(0);

  if (letter >= 97 && letter <= 122) {
    if (currentGuess.length < 5) {
      setCurrentGuess((previousState) => previousState + key);
    }
  }

  if (key === 'Backspace') {
    if (currentGuess.length > 0) {
      setCurrentGuess((previousState) => previousState.slice(0, -1));
    }
  }

  if (key === 'Enter' && currentGuess.length === 5) {
    setFinalized(true);
    // once clicking enter, set your row number by incrementing it
    setRowNum((prev) => prev + 1);

    // fill your current guess-list when user presses enter
    set_guess_list((previousGuessList) => {
      for (let i = rowNum; i < previousGuessList.length; i++) {
        previousGuessList[i] = currentGuess;
        return [...previousGuessList];
      }
    });
    setCurrentGuess('');
  }
};
