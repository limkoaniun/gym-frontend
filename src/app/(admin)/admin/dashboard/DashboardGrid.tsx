import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Responsive, useContainerWidth, verticalCompactor } from 'react-grid-layout';
import { Edit3, Save, RotateCcw, Loader2, AlertCircle } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { useDashboardData, useDashboardLayout } from '@/hooks/use-dashboard-data';
import {
  DashboardWidget,
  DashboardLayout,
  LayoutItem,
  UserGrowthPoint,
  EquipmentPopularityDto,
} from '@/lib/interfaces';

const BREAKPOINTS = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };
const COLS = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 };

const availableWidgets: DashboardWidget[] = [
  {
    id: 'total-revenue',
    type: 'kpi',
    title: 'Total Revenue',
    category: 'Finance',
    description: 'Total revenue generated',
    defaultSize: { w: 3, h: 4 },
    minSize: { w: 2, h: 3 },
  },
  {
    id: 'total-members',
    type: 'kpi',
    title: 'Total Members',
    category: 'Users',
    description: 'Total number of gym members',
    defaultSize: { w: 3, h: 4 },
    minSize: { w: 2, h: 3 },
  },
  {
    id: 'total-sessions',
    type: 'kpi',
    title: 'Total Sessions',
    category: 'Activity',
    description: 'Total workout sessions completed',
    defaultSize: { w: 3, h: 4 },
    minSize: { w: 2, h: 3 },
  },
  {
    id: 'user-growth',
    type: 'chart',
    title: 'User Growth',
    category: 'Analytics',
    description: 'User registration and growth trends',
    defaultSize: { w: 6, h: 8 },
    minSize: { w: 4, h: 6 },
  },
  {
    id: 'equipment-popularity',
    type: 'chart',
    title: 'Equipment Popularity',
    category: 'Analytics',
    description: 'Most popular gym equipment',
    defaultSize: { w: 6, h: 8 },
    minSize: { w: 4, h: 6 },
  },
  {
    id: 'system-health',
    type: 'health',
    title: 'System Health',
    category: 'System',
    description: 'System performance and health metrics',
    defaultSize: { w: 4, h: 6 },
    minSize: { w: 3, h: 4 },
  },
];

const defaultLayouts: DashboardLayout = {
  lg: [
    { i: 'total-revenue', x: 0, y: 0, w: 3, h: 4 },
    { i: 'total-members', x: 3, y: 0, w: 3, h: 4 },
    { i: 'total-sessions', x: 6, y: 0, w: 3, h: 4 },
    { i: 'user-growth', x: 0, y: 4, w: 6, h: 8 },
    { i: 'equipment-popularity', x: 6, y: 4, w: 6, h: 8 },
    { i: 'system-health', x: 9, y: 0, w: 3, h: 4 },
  ],
  md: [
    { i: 'total-revenue', x: 0, y: 0, w: 4, h: 4 },
    { i: 'total-members', x: 4, y: 0, w: 4, h: 4 },
    { i: 'total-sessions', x: 8, y: 0, w: 2, h: 4 },
    { i: 'user-growth', x: 0, y: 4, w: 10, h: 8 },
    { i: 'equipment-popularity', x: 0, y: 12, w: 10, h: 8 },
    { i: 'system-health', x: 0, y: 20, w: 10, h: 6 },
  ],
  sm: [
    { i: 'total-revenue', x: 0, y: 0, w: 6, h: 4 },
    { i: 'total-members', x: 0, y: 4, w: 6, h: 4 },
    { i: 'total-sessions', x: 0, y: 8, w: 6, h: 4 },
    { i: 'user-growth', x: 0, y: 12, w: 6, h: 8 },
    { i: 'equipment-popularity', x: 0, y: 20, w: 6, h: 8 },
    { i: 'system-health', x: 0, y: 28, w: 6, h: 6 },
  ],
};

function KpiCard({
  title,
  value,
  isLoading,
}: {
  title: string;
  value?: number | string;
  isLoading: boolean;
}) {
  return (
    <div className="h-full bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 flex flex-col">
      <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{title}</h4>
      <div className="flex-1 flex items-center justify-center">
        {isLoading ? (
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        ) : (
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {typeof value === 'number' ? value.toLocaleString() : value || 'N/A'}
          </h2>
        )}
      </div>
    </div>
  );
}

function ChartCard({
  title,
  children,
  isLoading,
}: {
  title: string;
  children: React.ReactNode;
  isLoading: boolean;
}) {
  return (
    <div className="h-full bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 flex flex-col">
      <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-4">{title}</h4>
      <div className="flex-1 flex items-center justify-center">
        {isLoading ? (
          <Loader2 className="h-12 w-12 animate-spin text-gray-400" />
        ) : (
          <div className="w-full h-full">{children}</div>
        )}
      </div>
    </div>
  );
}

function HealthCard({
  title,
  status,
  isLoading,
}: {
  title: string;
  status?: string;
  isLoading: boolean;
}) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'HEALTHY':
        return 'text-green-600 dark:text-green-400';
      case 'WARNING':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'ERROR':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="h-full bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 flex flex-col">
      <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{title}</h4>
      <div className="flex-1 flex items-center justify-center">
        {isLoading ? (
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        ) : (
          <div className="flex items-center space-x-2">
            <AlertCircle className={`h-6 w-6 ${getStatusColor(status || '')}`} />
            <span className={`text-lg font-semibold ${getStatusColor(status || '')}`}>
              {status || 'Unknown'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function UserGrowthChart({
  data,
  isLoading,
}: {
  data: UserGrowthPoint[] | null;
  isLoading: boolean;
}) {
  const COLORS = ['#3b82f6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];

  if (isLoading || !data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
        {isLoading ? <Loader2 className="h-8 w-8 animate-spin" /> : 'No user growth data available'}
      </div>
    );
  }

  const formattedData = data.map(point => ({
    date: new Date(point.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    count: point.count,
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={formattedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="count" stroke={COLORS[0]} strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}

function EquipmentPopularityChart({
  data,
  isLoading,
}: {
  data: EquipmentPopularityDto[] | null;
  isLoading: boolean;
}) {
  const COLORS = [
    '#3b82f6',
    '#06b6d4',
    '#10b981',
    '#f59e0b',
    '#ef4444',
    '#8b5cf6',
    '#ec4899',
    '#6b7280',
  ];

  if (isLoading || !data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
        {isLoading ? (
          <Loader2 className="h-8 w-8 animate-spin" />
        ) : (
          'No equipment popularity data available'
        )}
      </div>
    );
  }

  const chartData = data.slice(0, 8).map(item => ({
    name: item.equipmentName,
    value: item.usageCount,
    percentage: item.percentage,
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percentage }) => `${name} ${percentage.toFixed(1)}%`}
          outerRadius={60}
          fill="#8884d8"
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value, name) => [value, 'Usage Count']} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default function DashboardGrid() {
  const { width, containerRef, mounted } = useContainerWidth();
  const { dashboardData, userStats, equipmentPopularity, systemHealth, isLoading, error } =
    useDashboardData(30000); // Refresh every 30 seconds
  const {
    layout: savedLayout,
    isLoading: layoutLoading,
    saveLayout,
    resetLayout,
  } = useDashboardLayout();

  const [layouts, setLayouts] = useState<DashboardLayout>(defaultLayouts);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (savedLayout && !layoutLoading) {
      setLayouts(savedLayout);
    }
  }, [savedLayout, layoutLoading]);

  const handleLayoutChange = useCallback((_: any, allLayouts: { [key: string]: any }) => {
    setLayouts(allLayouts as DashboardLayout);
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    const success = await saveLayout(layouts);
    if (success) {
      setIsEditing(false);
    }
    setIsSaving(false);
  };

  const handleReset = async () => {
    setIsSaving(true);
    const success = await resetLayout();
    if (success) {
      setLayouts(defaultLayouts);
      setIsEditing(false);
    }
    setIsSaving(false);
  };

  const renderWidget = useCallback(
    (widgetId: string) => {
      const widget = availableWidgets.find(w => w.id === widgetId);
      if (!widget) return null;

      switch (widget.type) {
        case 'kpi':
          if (widgetId === 'total-revenue') {
            return (
              <KpiCard
                title={widget.title}
                value={
                  dashboardData?.totalRevenue
                    ? `$${dashboardData.totalRevenue.toLocaleString()}`
                    : undefined
                }
                isLoading={isLoading}
              />
            );
          }
          if (widgetId === 'total-members') {
            return (
              <KpiCard
                title={widget.title}
                value={dashboardData?.totalMembers}
                isLoading={isLoading}
              />
            );
          }
          if (widgetId === 'total-sessions') {
            return (
              <KpiCard
                title={widget.title}
                value={dashboardData?.totalSessions}
                isLoading={isLoading}
              />
            );
          }
          break;
        case 'chart':
          if (widgetId === 'user-growth') {
            return (
              <ChartCard title={widget.title} isLoading={isLoading}>
                <UserGrowthChart data={userStats?.userGrowthData || null} isLoading={isLoading} />
              </ChartCard>
            );
          }
          if (widgetId === 'equipment-popularity') {
            return (
              <ChartCard title={widget.title} isLoading={isLoading}>
                <EquipmentPopularityChart data={equipmentPopularity} isLoading={isLoading} />
              </ChartCard>
            );
          }
          return (
            <ChartCard title={widget.title} isLoading={isLoading}>
              <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                Chart component not implemented yet
              </div>
            </ChartCard>
          );
        case 'health':
          return (
            <HealthCard title={widget.title} status={systemHealth?.status} isLoading={isLoading} />
          );
        default:
          return null;
      }
    },
    [dashboardData, systemHealth, userStats, equipmentPopularity, isLoading]
  );

  const children = useMemo(() => {
    const currentLayout = layouts.lg || defaultLayouts.lg;
    return currentLayout.map((item: LayoutItem) => (
      <div key={item.i} className="dashboard-widget">
        {renderWidget(item.i)}
      </div>
    ));
  }, [layouts, renderWidget]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
            Failed to Load Dashboard
          </h3>
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              <Edit3 className="h-4 w-4 mr-2" />
              Edit Layout
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Save Layout
              </button>
              <button
                onClick={handleReset}
                disabled={isSaving}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset Layout
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
            </>
          )}
        </div>
        {isEditing && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Drag widgets to rearrange • Resize by dragging corners
          </p>
        )}
      </div>

      <div ref={containerRef as React.RefObject<HTMLDivElement>} className="dashboard-container">
        {mounted && (
          <Responsive
            layouts={layouts}
            breakpoints={BREAKPOINTS}
            cols={COLS}
            width={width}
            rowHeight={40}
            margin={[16, 16]}
            compactor={verticalCompactor}
            onLayoutChange={handleLayoutChange}
            className={`${isEditing ? 'editing' : ''}`}
          >
            {children}
          </Responsive>
        )}
      </div>

      <style jsx>{`
        .dashboard-container :global(.react-grid-item) {
          transition: all 200ms ease;
          transition-property: left, top;
        }

        .dashboard-container :global(.react-grid-item.cssTransforms) {
          transition-property: transform;
        }

        .dashboard-container :global(.react-grid-item > .react-resizable-handle) {
          position: absolute;
          width: 20px;
          height: 20px;
          bottom: 0;
          right: 0;
          cursor: se-resize;
          background: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMCAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0ibTEgOSA4LThtLTUgOCA4LTUiIHN0cm9rZT0iIzk5OTk5OSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPC9zdmc+')
            no-repeat center;
          opacity: 0;
          transition: opacity 0.2s;
        }

        .dashboard-container.editing :global(.react-grid-item > .react-resizable-handle) {
          opacity: 1;
        }

        .dashboard-container :global(.react-grid-item:hover > .react-resizable-handle) {
          opacity: 1;
        }

        .dashboard-container.editing :global(.react-grid-item) {
          cursor: move;
          border: 2px dashed #3b82f6;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
}
