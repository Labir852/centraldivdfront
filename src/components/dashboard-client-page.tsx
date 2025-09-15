

'use client';

import { useState, useMemo, type ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Search, Settings2, Wallet, DollarSign, type LucideIcon, Users, Landmark, FileText, ArrowUp, ArrowDown, Download } from 'lucide-react';
import { ChartConfig } from '@/components/ui/chart';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { getSession } from '@/lib/auth';

const FinancialChart = dynamic(() => import('@/components/financial-chart').then(mod => mod.FinancialChart), {
  ssr: false,
  loading: () => <div className="h-full w-full flex items-center justify-center"><p>Loading chart...</p></div>
});


type Metric = {
  id: string;
  title: string;
  value: string;
  change?: string;
  icon: LucideIcon;
};

type ChartDataItem = {
  name: string;
  [key: string]: string | number;
};

type TableDataItem = {
  [key: string]: any;
};

type TableColumn = {
  header: string;
  accessor: string;
  render?: (item: TableDataItem) => ReactNode;
};

type DashboardData = {
  metrics: Omit<Metric, 'icon'> & { icon: string };
  chartData: ChartDataItem[];
  chartConfig: ChartConfig;
  tableData: TableDataItem[];
  tableColumns: Omit<TableColumn, 'render'>[];
};

type DataType = 'issuers' | 'investors' | 'regulators' | 'cmsf';

interface DashboardClientPageProps {
  title: string;
  description: string;
  data: DashboardData;
  searchable?: boolean;
  dataType: DataType;
}

const iconMap: { [key: string]: LucideIcon } = {
  Wallet,
  Users,
  Landmark,
  FileText,
  ArrowUp,
  ArrowDown,
  DollarSign,
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'BDT',
    notation: 'compact',
    maximumFractionDigits: 2,
  }).format(value);
};

export function DashboardClientPage({ title, description, data: rawData, searchable = true, dataType }: DashboardClientPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const user = getSession();
  const data = useMemo(() => {
    return {
        ...rawData,
        metrics: rawData.metrics.map(m => ({...m, icon: iconMap[m.icon]})),
    }
  }, [rawData]);

  const tableColumns = useMemo(() => {
    const baseColumns = [...rawData.tableColumns];
    if(dataType === 'investors' || dataType === 'issuers'){
        baseColumns.push({header: 'Action', accessor: 'action'});
    }

    const renderFunctions: { [key in DataType]: { [accessor: string]: (item: any) => ReactNode } } = {
        issuers: {
            amount: (item: any) => item.amount,
            tds: (item: any) => item.tds,
            status: (item: any) => {
              if (item.status === 'Pending') {
                return (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge variant="secondary">{item.status}</Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Payment is pending</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                );
              }
              return <Badge variant={item.status === 'Paid' ? 'default' : 'secondary'}>{item.status}</Badge>;
            },
            action: (item: any) => {
                if (item.status === 'Pending') {
                    return (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <span tabIndex={0}>
                                        <Button variant="outline" size="sm" disabled>
                                            <Download className="mr-2 h-4 w-4" />
                                            Challan
                                        </Button>
                                    </span>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Payment is pending</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    );
                }
                return (
                    <a href="/assets/PDF/2526-0006419773.pdf" download>
                        <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            Challan
                        </Button>
                    </a>
                );
            },
        },
        investors: {
            amount: (item: any) => item.amount,
            tds: (item: any) => item.tds,
            status: (item: any) => {
              if (item.status === 'Pending') {
                return (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge variant="secondary">{item.status}</Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Payment is pending</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                );
              }
              return <Badge variant={item.status === 'Paid' ? 'default' : 'secondary'}>{item.status}</Badge>;
            },
            action: (item: any) => {
                if (item.status === 'Pending') {
                    return (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <span tabIndex={0}>
                                        <Button variant="outline" size="sm" disabled>
                                            <Download className="mr-2 h-4 w-4" />
                                            Challan
                                        </Button>
                                    </span>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Payment is pending</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    );
                }
                return (
                    <a href="/assets/PDF/2526-0006419773.pdf" download>
                        <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            Challan
                        </Button>
                    </a>
                );
            },
        },
        regulators: {
          status: (item: any) => {
            if (item.status === 'Pending') {
              return (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Badge variant="secondary">{item.status}</Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Payment is pending</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            }
            return <Badge variant={item.status === 'Paid' ? 'default' : 'secondary'}>{item.status}</Badge>;
          },
        },
        cmsf: {
            amount: (item: any) => item.amount,
            status: (item: any) => {
              if (item.status === 'Pending') {
                return (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge variant="secondary">{item.status}</Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Payment is pending</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                );
              }
              return <Badge variant={item.status === 'Paid' ? 'default' : 'secondary'}>{item.status}</Badge>;
            },
            risk: (item: any) => <Badge variant={item.risk === 'Low' ? 'default' : item.risk === 'Medium' ? 'secondary' : 'destructive'}>{item.risk}</Badge>,
        }
    };
    return baseColumns.map(c => ({...c, render: renderFunctions[dataType][c.accessor]}))
  }, [rawData.tableColumns, dataType]);

  
  const initialVisibleMetrics = data.metrics.reduce((acc, metric) => {
    acc[metric.id] = true;
    return acc;
  }, {} as Record<string, boolean>);

  const [visibleMetrics, setVisibleMetrics] = useState<Record<string, boolean>>(initialVisibleMetrics);

  const filteredTableData = useMemo(() => {
    if (!searchable || !searchTerm) {
      return data.tableData;
    }
    return data.tableData.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data.tableData, searchTerm, searchable]);

  const restrictedTypes = ['investor', 'issuer', 'cmsf', 'regulator'];
  const showChart = !restrictedTypes.includes(dataType);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline">Welcome {title} {dataType === 'investors' ? '(TIN:127905441477)' : null} </h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <div className="flex items-center gap-2">
          {searchable && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-9 w-full sm:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Settings2 className="h-4 w-4" />
                <span className="sr-only">Customize Dashboard</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Toggle Metric Cards</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {data.metrics.map((metric) => (
                <DropdownMenuCheckboxItem
                  key={metric.id}
                  checked={visibleMetrics[metric.id]}
                  onCheckedChange={(checked) =>
                    setVisibleMetrics((prev) => ({ ...prev, [metric.id]: !!checked }))
                  }
                >
                  {metric.title}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {data.metrics
          .filter((metric) => visibleMetrics[metric.id])
          .map((metric) => (
            <Card key={metric.id} className="transition-transform-shadow duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                {metric.icon && <metric.icon className="h-4 w-4 text-muted-foreground" />}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                {/* {metric.change && (
                  <p className={`text-xs ${metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {metric.change}
                  </p>
                )} */}
              </CardContent>
            </Card>
        ))}
      </div>

      <div className={`grid gap-6 ${showChart ? 'lg:grid-cols-5' : ''}`}>
      {showChart && (
            <Card className="lg:col-span-3">
            <CardHeader>
                <CardTitle className="font-headline">Financial Overview</CardTitle>
                <CardDescription>A summary of recent financial activity.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] w-full">
                    <FinancialChart chartData={data.chartData} chartConfig={data.chartConfig} />
                </div>
            </CardContent>
            </Card>
        )}
        <Card className={showChart ? "lg:col-span-2" : "w-full"}>
            <CardHeader>
                <CardTitle className="font-headline">Detailed Records</CardTitle>
                <CardDescription>A complete list of all records.</CardDescription>
            </CardHeader>
            <CardContent>
                 <ScrollArea className={showChart ? "h-[340px]" : ""}>
                    <Table>
                        <TableHeader className="sticky top-0 bg-card">
                            <TableRow>
                                {tableColumns.map((col) => (
                                    <TableHead key={col.accessor}>{col.header}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredTableData.length > 0 ? (
                                filteredTableData.map((row, index) => (
                                    <TableRow key={index}>
                                        {tableColumns.map((col) => (
                                            <TableCell key={col.accessor}>
                                                {col.render ? col.render(row) : row[col.accessor]}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={tableColumns.length} className="h-24 text-center">
                                        No results found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                 </ScrollArea>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}

    

    
