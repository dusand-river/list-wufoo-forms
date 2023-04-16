export const capitalizeFirstLetters = (input: string | undefined): string => {
  if (input)
    return input.toLowerCase().replace(/^\w|\s\w/g, (letter) => {
      return letter.toUpperCase();
    });
  return "";
};

export const toPascalCase = (input: string): string => {
  return input
    .replace(/[-_]+/g, " ")
    .replace(/[^\w\s]/g, "")
    .replace(/\s+(.)/g, (_, match) => match.toUpperCase())
    .replace(/\s/g, "")
    .replace(/^(.)/, (_, match) => match.toUpperCase());
};
