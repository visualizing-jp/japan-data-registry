/** 時代ビューの注記・図中マーク。 */

export const MARKS = [
  {
    year: 2019,
    label: "令和の不動産ピーク",
    detail: "不動産登記が約1,208万件。土地の表示登記が膨らんだ年でもある。",
  },
  {
    year: 2024,
    label: "相続の系列が分かれた年",
    detail: "「相続その他一般承継」が、相続とそれ以外の一般承継に分割された。グラフは足して接続している。",
  },
] as const;

export const SPANS: readonly {
  from: number;
  to: number;
  label: string;
  detail: string;
  kind: "missing" | "scope";
}[] = [];

export const NOTES = [
  {
    term: "件数",
    detail: "登記事件の件数。1件の登記に複数の土地・建物が乗るため、個数とは一致しない。",
  },
  {
    term: "売買・相続・贈与・抵当",
    detail: "土地と建物の件数を足した系列。2015年から。相続は2024年に定義が分かれたため、新旧を接続している。",
  },
  {
    term: "合同会社",
    detail: "2006年にできた会社形態。設立は2015年の約2.2万件から2024年の約4.2万件へ増えた。",
  },
  {
    term: "出典",
    detail: "法務省「登記統計」（e-Stat）。年報の累年比較表。",
  },
] as const;
