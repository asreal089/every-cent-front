import { RadarChartData } from "./RadarChartData";

export interface RadarChartConfig {
    type?: string;
    data?: RadarChartData;
    options?: RadarChartConfigOptions
}

export interface RadarChartConfigOptions {
    elements: any;
}