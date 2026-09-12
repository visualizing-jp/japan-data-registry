/**
 * 配信 cube の健全性チェック。
 *
 *   npm run verify
 */

import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { CubeView, type CubeJson, type DictEntry } from "../src/app/data/cube.ts";

const DATA = resolve(import.meta.dirname, "../public/data");

let failed = 0;

function ok(label: string, cond: boolean, detail = ""): void {
  console.log(`${cond ? "OK" : "NG"}  ${label}${detail ? `: ${detail}` : ""}`);
  if (!cond) failed += 1;
}

function near(a: number, b: number, tol: number): boolean {
  return Math.abs(a - b) <= tol;
}

interface EraFile extends CubeJson {
  metrics: DictEntry[];
}

interface TypeFile extends CubeJson {
  codes: DictEntry[];
}

interface CompanyFile extends CubeJson {
  metrics: DictEntry[];
}

const eraRaw = JSON.parse(await readFile(resolve(DATA, "era.json"), "utf8")) as EraFile;
const typeRaw = JSON.parse(await readFile(resolve(DATA, "type.json"), "utf8")) as TypeFile;
const companyRaw = JSON.parse(
  await readFile(resolve(DATA, "company.json"), "utf8"),
) as CompanyFile;

const era = new CubeView(eraRaw);
const type = new CubeView(typeRaw);
const company = new CubeView(companyRaw);

const total2024 = era.at("counts", { metric: "total", year: "2024" });
ok(
  "era 2024 総数≈12,786,317",
  total2024 !== null && near(total2024, 12_786_317, 1),
  String(total2024),
);

const re2024 = era.at("counts", { metric: "real_estate", year: "2024" });
ok(
  "era 2024 不動産≈10,905,928",
  re2024 !== null && near(re2024, 10_905_928, 1),
  String(re2024),
);

const land2024 = era.at("counts", { metric: "land", year: "2024" });
ok(
  "era 2024 土地≈7,520,415",
  land2024 !== null && near(land2024, 7_520_415, 1),
  String(land2024),
);

const bldg2024 = era.at("counts", { metric: "building", year: "2024" });
ok(
  "era 2024 建物≈3,385,513",
  bldg2024 !== null && near(bldg2024, 3_385_513, 1),
  String(bldg2024),
);

const total2010 = era.at("counts", { metric: "total", year: "2010" });
ok(
  "era 2010 総数≈13,834,560",
  total2010 !== null && near(total2010, 13_834_560, 1),
  String(total2010),
);

ok(
  "era 2014 売買が欠測",
  era.at("counts", { metric: "sale", year: "2014" }) === null,
);

const sale2024 = era.at("counts", { metric: "sale", year: "2024" });
ok(
  "era 2024 売買≈1,707,607",
  sale2024 !== null && near(sale2024, 1_319_034 + 388_573, 1),
  String(sale2024),
);

const inherit2024 = era.at("counts", { metric: "inherit", year: "2024" });
ok(
  "era 2024 相続（接続）≈1,199,847",
  inherit2024 !== null && near(inherit2024, 986_295 + 41_347 + 171_086 + 1_119, 1),
  String(inherit2024),
);

ok(
  "era 2024 相続は旧行（土地344,851）を使っていない",
  inherit2024 !== null && !near(inherit2024, 344_851 + 54_973, 1),
);

const landSale = type.at("counts", { code: "sale", year: "2024" });
ok(
  "type 2024 土地売買≈1,319,034",
  landSale !== null && near(landSale, 1_319_034, 1),
  String(landSale),
);

const landInherit = type.at("counts", { code: "inherit", year: "2024" });
ok(
  "type 2024 土地相続（接続）≈1,027,642",
  landInherit !== null && near(landInherit, 986_295 + 41_347, 1),
  String(landInherit),
);

const landInherit2023 = type.at("counts", { code: "inherit", year: "2023" });
ok(
  "type 2023 土地相続≈1,252,245",
  landInherit2023 !== null && near(landInherit2023, 1_252_245, 1),
  String(landInherit2023),
);

const kkFound = company.at("counts", { metric: "kk_found", year: "2024" });
ok(
  "company 2024 株式会社設立≈98,671",
  kkFound !== null && near(kkFound, 98_671, 1),
  String(kkFound),
);

const gkFound = company.at("counts", { metric: "gk_found", year: "2024" });
ok(
  "company 2024 合同会社設立≈41,774",
  gkFound !== null && near(gkFound, 41_774, 1),
  String(gkFound),
);

const gkFound2015 = company.at("counts", { metric: "gk_found", year: "2015" });
ok(
  "company 2015 合同会社設立≈22,223",
  gkFound2015 !== null && near(gkFound2015, 22_223, 1),
  String(gkFound2015),
);

const kkDiss = company.at("counts", { metric: "kk_dissolve", year: "2024" });
ok(
  "company 2024 株式会社解散≈20,795",
  kkDiss !== null && near(kkDiss, 20_795, 1),
  String(kkDiss),
);

const gkDiss = company.at("counts", { metric: "gk_dissolve", year: "2024" });
ok(
  "company 2024 合同会社解散≈5,279",
  gkDiss !== null && near(gkDiss, 5_279, 1),
  String(gkDiss),
);

if (failed > 0) {
  console.error(`\n${failed} checks failed`);
  process.exit(1);
}
console.log("\nall checks passed");
