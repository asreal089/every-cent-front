import { PieChartDataset } from "./PieChartDataset";

export interface PieChartData{
    labels: string[],
    datasets: PieChartDataset[]
}