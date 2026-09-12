#!/usr/bin/env bash
# 登記統計年報の Excel を data/raw/estat に置く。API キーは不要。
# macOS の bash 3.2 でも動くように連想配列は使わない。
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ESTAT="$ROOT/data/raw/estat"
mkdir -p "$ESTAT"

fetch_estat() {
  local name="$1" id="$2"
  echo "fetch $name"
  curl -fsSL -A "Mozilla/5.0" -o "$ESTAT/${name}.xlsx" \
    "https://www.e-stat.go.jp/stat-search/file-download?statInfId=${id}&fileKind=4"
}

# 2024年年報 総括・不動産（lid=000001460052）
fetch_estat 24-00-1 000040280811
fetch_estat 24-00-4 000040280814
fetch_estat 24-00-5 000040280815

# 2024年年報 商業・法人（lid=000001460053）
fetch_estat 24-00-16 000040280890
fetch_estat 24-00-20 000040280894

echo "done"
