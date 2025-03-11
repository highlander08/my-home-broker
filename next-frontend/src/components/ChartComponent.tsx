"use client"
import { AreaSeries, createChart, AreaData, IChartApi, ISeriesApi, Time } from "lightweight-charts";
import React, { useEffect, useImperativeHandle, useLayoutEffect } from "react";
import { useRef, Ref } from "react";


type ChartRef = {
  _api: IChartApi | null;
  api(): IChartApi;
  free(): void;
}

export type ChartComponentRef = {
  update: (data: { time: Time; value: number }) => void;
}

export function ChartComponent(props: { header: React.ReactNode, data?: AreaData<Time>[], ref: Ref<ChartComponentRef>; }) {
  const { header, data, ref } = props;
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ChartRef>({
    _api: null,
    api() {
      if (!this._api) {
        this._api = createChart(chartContainerRef.current!, {
          width: 0,
          height: 0,
          timeScale: {
            timeVisible: true,
          }
        });
        this._api.timeScale().fitContent();
      }
      return this._api
    },
    free() {
      if (this._api) {
        this._api.remove();
      }
    },
  });

  const seriesRef = useRef<ISeriesApi<"Area">>(null);

  useImperativeHandle(ref, () => ({
    update: (data: { time: Time; value: number }) => {
      seriesRef.current!.update(data);
    },
  }));

  useEffect(() => {
    seriesRef.current = chartRef.current.api().addSeries(AreaSeries);
    seriesRef.current?.setData(data || []);
    // seriesRef.current.setData([
    //   { time: "2018-12-22", value: 32.51 },
    //   { time: "2018-12-23", value: 31.41 },
    //   { time: "2018-12-24", value: 30.78 },
    //   { time: "2018-12-25", value: 31.95 },
    //   { time: "2018-12-26", value: 32.68 },
    //   { time: "2018-12-27", value: 33.12 },
    //   { time: "2018-12-28", value: 32.93 },
    //   { time: "2018-12-29", value: 33.50 },
    //   { time: "2018-12-30", value: 33.10 },
    //   { time: "2018-12-31", value: 33.75 }
    // ])
  }, [data]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current._api) {
        chartRef.current._api.applyOptions({
          width: chartContainerRef.current.parentElement?.clientWidth || 0, // ✅ Correção
        });
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex-grow relative" ref={chartContainerRef}>
      <div className="absolute top-0 left-0 z-50 bg-gray-100 rounded-md p-2 shadow-md">
        {header}
      </div>
    </div>
  )
}

ChartComponent.displayName = "ChartComponent"






