import { formatList as properFormatList } from '../constants';

const isFormatString = (formatType: string) => properFormatList.includes(formatType);

const parseHeightFormat = (heightWithFormat: string) => {
  const formatList = heightWithFormat.match(/[a-z%]+/);

  if (!formatList || formatList.length >= 2) {
    throw new Error('Unsupported format');
  }

  const format = formatList[0];

  if (!isFormatString(format)) {
    throw new Error('Unsupported format');
  }

  return format;
};

const parseHeightValue = (heightWithFormat: string) => {
  const value = parseFloat(heightWithFormat);

  if (Number.isNaN(value)) {
    throw new Error('No numeric value found in input');
  }

  return value;
};

const parseHeight = (heightWithFormat: string) => {
  const format = parseHeightFormat(heightWithFormat);
  const value = parseHeightValue(heightWithFormat);

  return { value, format };
};

const distributeHeight = (totalHeight: number, length: number, format: string = 'px') => {
  if (!isFormatString(format)) {
    throw new Error('wrong format');
  }

  if (length === 0 || totalHeight <= 0) {
    throw new Error('wrong number');
  }

  const height = totalHeight / length;
  return `${height}${format}`;
};

export { distributeHeight, isFormatString, parseHeight, parseHeightFormat, parseHeightValue };
