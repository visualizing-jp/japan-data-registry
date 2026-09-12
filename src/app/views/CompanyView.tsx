/**
 * 商業ビュー。株式会社と合同会社の設立・解散。
 */

import { use, useMemo, useState } from "react";
import { loadCompany } from "../data/chunks.ts";
import { TypeList } from "../components/TypeList.tsx";
import { TrendStack, type Panel, type Point } from "../components/TrendStack.tsx";
import { useWidth } from "../hooks/useWidth.ts";
import { useUrlState } from "../hooks/useUrlState.ts";
import { COMPANY_FROM, ERA_TO } from "../../lib/data/labels.ts";

const int = new Intl.NumberFormat("ja-JP");

function dense(years: number[], values: (number | null)[]): Point[] {
  const byYear = new Map(years.map((y, i) => [y, values[i] ?? null]));
  return Array.from({ length: ERA_TO - COMPANY_FROM + 1 }, (_, i) => ({
    year: COMPANY_FROM + i,
    value: byYear.get(COMPANY_FROM + i) ?? null,
  }));
}

export function CompanyView() {
  const { metrics, cube, years } = use(loadCompany());
  const defaultMetric =
    metrics.find((m) => m.code === "gk_found")?.code ?? metrics[0]!.code;

  const [metric, setMetric] = useUrlState<string>("metric", defaultMetric, (v) =>
    metrics.some((c) => c.code === v),
  );
  const [hoverYear, setHoverYear] = useState<number | null>(null);
  const [ref, width] = useWidth<HTMLDivElement>();

  const current = metrics.find((c) => c.code === metric)!;

  const rows = useMemo(
    () =>
      metrics.map((c) => ({
        type: c,
        values: cube.series("counts", "year", { metric: c.code }),
      })),
    [metrics, cube],
  );

  const panels = useMemo((): Panel[] => {
    return [
      {
        key: "counts",
        title: current.label,
        unit: "件",
        format: (v) => `${int.format(Math.round(v))}件`,
        formatTick: (v) =>
          v >= 10_000 ? `${int.format(Math.round(v / 10_000))}万` : int.format(Math.round(v)),
        series: [
          {
            key: "counts",
            label: "",
            points: dense(years, cube.series("counts", "year", { metric })),
            emphasized: true,
          },
        ],
      },
    ];
  }, [cube, metric, years, current.label]);

  return (
    <div className="mx-auto flex w-full max-w-[1240px] gap-8 px-6 py-6 max-lg:flex-col-reverse">
      <aside className="w-[288px] shrink-0 max-lg:w-full">
        <h2 className="px-2 pb-1 text-[11px] font-semibold tracking-wide text-faint">
          指標
        </h2>
        <div className="max-h-[70vh] overflow-y-auto lg:max-h-[calc(100dvh-8rem)]">
          <TypeList rows={rows} years={years} selected={metric} onSelect={setMetric} />
        </div>
        <p className="px-2 pt-3 text-[10.5px] leading-relaxed text-faint">
          本店の登記。支店は含めない。2015年から。
        </p>
      </aside>

      <main className="min-w-0 flex-1">
        <header className="flex flex-wrap items-baseline justify-between gap-3 pb-4">
          <div className="flex items-baseline gap-3">
            <h1 className="text-[19px] font-semibold tracking-tight">{current.label}</h1>
            <p
              className={`tnum text-[13px] ${hoverYear === null ? "text-faint" : "text-ink"}`}
            >
              {hoverYear ?? ERA_TO}年
            </p>
          </div>
        </header>

        <div ref={ref} className="min-h-[280px]">
          {width > 0 && (
            <TrendStack
              panels={panels}
              domain={[COMPANY_FROM, ERA_TO]}
              width={width}
              hoverYear={hoverYear}
              onHoverYear={setHoverYear}
            />
          )}
        </div>

        <p className="mt-5 border-t border-rule pt-3 text-[11px] leading-relaxed text-muted">
          合同会社は2006年にできた会社形態。設立は株式会社の半分近くまで増えた。解散は本店の「解散」であり、合併による解散は含まない。
        </p>
      </main>
    </div>
  );
}
