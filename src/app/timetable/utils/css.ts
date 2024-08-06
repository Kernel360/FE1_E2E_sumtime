const generateClassNameWithType = (styles: { [key: string]: string }, className: string, type?: string) =>
  `${styles[className]} ${type ? styles[type.toLowerCase()] : ''}`;

export { generateClassNameWithType };
