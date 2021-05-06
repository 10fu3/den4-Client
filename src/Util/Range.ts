const Range = (begin: number, end: number) => ([...Array(end - begin)].map((_, i) => (begin + i)));
export default Range;
