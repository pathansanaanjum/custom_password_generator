document.addEventListener('DOMContentLoaded', () => {
  const generateBtn = document.getElementById('generateBtn');
  const resultInput = document.getElementById('result');
  const copyBtn = document.getElementById('copyBtn');
  const copiedMsg = document.getElementById('copiedMsg');

  function generatePassword({ length, upper, lower, number, symbol }) {
    const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let charSet = '';
    if (upper) charSet += upperChars;
    if (lower) charSet += lowerChars;
    if (number) charSet += numberChars;
    if (symbol) charSet += symbolChars;

    if (!charSet || length < 1) return '';

    let password = '';
    for (let i = 0; i < length; i++) {
      const idx = Math.floor(Math.random() * charSet.length);
      password += charSet[idx];
    }

    return password;
  }

  generateBtn.addEventListener('click', () => {
    const length = parseInt(document.getElementById('length').value);
    const upper = document.getElementById('upper').checked;
    const lower = document.getElementById('lower').checked;
    const number = document.getElementById('number').checked;
    const symbol = document.getElementById('symbol').checked;
    const startCaps = document.getElementById('startCaps').checked;
    const customInput = document.getElementById('customInput').value.trim();
    const position = document.getElementById('position').value;

    if (!length || length < 4) {
      resultInput.value = 'Please enter a valid length (min 4)';
      return;
    }

    let password = generatePassword({ length, upper, lower, number, symbol });

    if (startCaps && password.length > 0) {
      password = password[0].toUpperCase() + password.slice(1);
    }

    if (customInput) {
      password = position === 'prefix' ? customInput + password : password + customInput;
    }

    resultInput.value = password;
  });

  copyBtn.addEventListener('click', () => {
    resultInput.select();
    document.execCommand('copy');
    copiedMsg.classList.remove('hidden');
    setTimeout(() => copiedMsg.classList.add('hidden'), 2000);
  });
});
