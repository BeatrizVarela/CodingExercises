function onClickColors() {
  let text = document.getElementById('text');
  let button = document.getElementById('button');
  if (text.className == 'pinkText') {
    text.className = 'blueText';
    button.className = 'blueButton';
  }
  else {text.className = 'pinkText';
  button.className = 'pinkButton';
  }
};

function onClickPrideColors() {
  let text = document.getElementById('redText');
  let button = document.getElementById('redButton');
  if (text.className == 'redText') {
    text.className = 'orangeText';
    button.className = 'orangeButton';
  } else if (text.className == 'orangeText') {
    text.className = 'yellowText';
    button.className = 'yellowButton';
  } else if (text.className == 'yellowText') {
    text.className = 'greenText';
    button.className = 'greenButton';
  } else if (text.className == 'greenText') {
    text.className = 'blueText';
    button.className = 'blueButton';
  } else if (text.className == 'blueText') {
    text.className = 'purpleText';
    button.className = 'purpleButton';
  } else {text.className = 'redText';
  button.className = 'redButton';}
};
