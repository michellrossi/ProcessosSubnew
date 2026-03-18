export const validateSEI = (sei: string): boolean => {
  const seiRegex = /^\d{4}\.\d{4}\/\d{7}-\d$/;
  return seiRegex.test(sei);
};

export const validateSQL = (sql: string): boolean => {
  const sqlRegex = /^\d{3}\.\d{3}\.\d{4}-\d$/;
  return sqlRegex.test(sql);
};

export const validateData = (data: string): boolean => {
  const dataRegex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!dataRegex.test(data)) return false;

  const [dia, mes, ano] = data.split('/').map(Number);
  const date = new Date(ano, mes - 1, dia);

  return (
    date.getFullYear() === ano &&
    date.getMonth() === mes - 1 &&
    date.getDate() === dia
  );
};

export const formatDateToInput = (dateStr: string): string => {
  if (!dateStr) return '';
  const [dia, mes, ano] = dateStr.split('/');
  return `${ano}-${mes}-${dia}`;
};

export const formatInputToDate = (inputStr: string): string => {
  if (!inputStr) return '';
  const [ano, mes, dia] = inputStr.split('-');
  return `${dia}/${mes}/${ano}`;
};

export const autoFormatSEI = (value: string): string => {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length <= 4) return numbers;
  if (numbers.length <= 8) return `${numbers.slice(0, 4)}.${numbers.slice(4)}`;
  if (numbers.length <= 15) return `${numbers.slice(0, 4)}.${numbers.slice(4, 8)}/${numbers.slice(8)}`;
  return `${numbers.slice(0, 4)}.${numbers.slice(4, 8)}/${numbers.slice(8, 15)}-${numbers.slice(15, 16)}`;
};

export const autoFormatSQL = (value: string): string => {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length <= 3) return numbers;
  if (numbers.length <= 6) return `${numbers.slice(0, 3)}.${numbers.slice(3)}`;
  if (numbers.length <= 10) return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`;
  return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 10)}-${numbers.slice(10, 11)}`;
};

export const removeSEIFormatting = (value: string): string => {
  return value.replace(/\D/g, '');
};

export const removeSQLFormatting = (value: string): string => {
  return value.replace(/\D/g, '');
};
