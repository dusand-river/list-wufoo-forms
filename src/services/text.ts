export const capitalizeFirstLetters = (input: string | undefined): string => {
  if (input)
    return input.toLowerCase().replace(/^\w|\s\w/g, (letter) => {
      return letter.toUpperCase();
    });
  return "";
};
