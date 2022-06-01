/**
 * Calculates
 * @param data
 * @param numberOfPricePoints
 * @returns
 */
const getAverage = (data: any[], numberOfPricePoints: number) => {
  return data.map((row, index, total) => {
    const start = Math.max(0, index - numberOfPricePoints);
    const end = index;
    const subset = total.slice(start, end + 1);
    const sum = subset.reduce((a, b) => {
      return a + b["close"];
    }, 0);
    return {
      date: row["time"],
      average: sum / subset.length,
    };
  });
};

export default getAverage;
