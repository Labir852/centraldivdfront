
'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';

type ChartDataItem = {
  name: string;
  [key: string]: string | number;
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 2,
  }).format(value);
};

interface FinancialChartProps {
    chartData: ChartDataItem[];
    chartConfig: ChartConfig;
}

export function FinancialChart({ chartData, chartConfig }: FinancialChartProps) {
    return (
      <ChartContainer config={chartConfig} className="h-full w-full">
            <BarChart data={chartData} margin={{ top: 20, right: 20, bottom: 5, left: 0 }} accessibilityLayer>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="name" tickLine={false} tickMargin={10} axisLine={false} />
                <YAxis tickFormatter={(value) => formatCurrency(value as number)} />
                <RechartsTooltip
                    cursor={{ fill: 'hsl(var(--muted))' }}
                    content={<ChartTooltipContent indicator="dot" formatter={(value, name, props) => {
                        const itemPayload = props.payload as any;
                        if (!itemPayload) return null;

                        const chartLabel = (chartConfig as any)[name as string]?.label || name;
                        return (
                            <div className="flex flex-col">
                                <span className="font-semibold">{itemPayload.name}</span>
                                <span>{`${chartLabel}: ${formatCurrency(value as number)}`}</span>
                            </div>
                        );
                    }} />}
                />
                <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ChartContainer>
    )
}
