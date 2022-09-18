// Regex
const password =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
const email = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

// Messages
const invalidPasswordMessage =
  'A senha deve conter ao menos 8 caracteres, sendo desses pelo menos: uma letra maiúscula, uma letra minúscula, um caracter especial e um número.';

export const RegexValidator = {
  password,
  email,
};

export const MessageValidator = {
  invalidPasswordMessage,
};
