import data from "./../../../assets/data/bitcoin.json";

export default function formatBitcoinData() {
  const names = ["open", "high", "low", "close", "volume"];

  const length = Object.values(data["open"]).length;

  const result: any[] = Array.apply(null, Array(length)).map((d) => {
    return {};
  });

  const times = Object.keys(data["open"]);

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < length; j++) {
      result[j][names[i]] = (data as any)[names[i]][times[j]];
    }
  }

  result.forEach((b, i) => {
    b["time"] = times[i];
  });

  return result;
}
