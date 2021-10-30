export interface RadarChartData{
    labels?:string[];
    datasets?:RadarChartDataSet[];    
}

export interface RadarChartDataSet {
    label: string;
    data: number[];
    fill: boolean;
}