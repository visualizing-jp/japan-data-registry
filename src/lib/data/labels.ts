export const ERA_FROM = 2010;
export const ERA_TO = 2024;
export const TYPE_FROM = 2015;
export const COMPANY_FROM = 2015;

export const METRICS = [
  { code: "total", label: "登記の総数", kind: "counts", group: "規模" },
  { code: "real_estate", label: "不動産", kind: "counts", group: "規模" },
  { code: "land", label: "土地", kind: "counts", group: "規模" },
  { code: "building", label: "建物", kind: "counts", group: "規模" },
  { code: "sale", label: "売買（土地＋建物）", kind: "counts", group: "名義" },
  { code: "inherit", label: "相続（土地＋建物）", kind: "counts", group: "名義" },
  { code: "gift", label: "贈与（土地＋建物）", kind: "counts", group: "名義" },
  { code: "mortgage", label: "抵当権の設定（土地＋建物）", kind: "counts", group: "名義" },
] as const;

export const TYPE_CODES = [
  { code: "sale", label: "売買" },
  { code: "inherit", label: "相続" },
  { code: "gift", label: "贈与" },
  { code: "mortgage", label: "抵当権の設定" },
  { code: "root", label: "根抵当権の設定" },
  { code: "preserve", label: "所有権の保存" },
  { code: "display", label: "表示に関する登記" },
] as const;

export const COMPANY_METRICS = [
  { code: "kk_found", label: "株式会社の設立", kind: "counts" },
  { code: "gk_found", label: "合同会社の設立", kind: "counts" },
  { code: "kk_dissolve", label: "株式会社の解散", kind: "counts" },
  { code: "gk_dissolve", label: "合同会社の解散", kind: "counts" },
] as const;
