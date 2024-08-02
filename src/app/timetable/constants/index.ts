const FORMAT_LIST = [
  'px',
  '%',
  'em',
  'rem',
  'vw',
  'vh',
  'cm',
  'mm',
  'in',
  'pt',
  'pc',
  'ex',
  'ch',
  'lh',
  'rlh',
  'vmin',
  'vmax',
  'vi',
  'vb',
  'q',
] as const;

type FormatType = (typeof FORMAT_LIST)[number];

export { FORMAT_LIST };
export type { FormatType };
