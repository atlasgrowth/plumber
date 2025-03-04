
import { useQuery } from "@tanstack/react-query";
import { useSiteId } from "@/hooks/useBusinessData";
import { AnalyticsData } from "@/types/analytics";
import { Card } from "@/components/ui/card";

export function Analytics() {
  const siteId = useSiteId();
  const { data, isLoading } = useQuery<AnalyticsData>({
    queryKey: ['analytics', siteId],
    queryFn: () => fetch(`/api/analytics/${siteId}`).then(r => r.json()),
    enabled: !!siteId,
    refetchInterval: 30000 // Refresh every 30 seconds
  });

  if (isLoading || !data) return <div>Loading analytics...</div>;

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="p-4">
          <h2 className="font-semibold mb-2">Total Visits</h2>
          <p className="text-2xl">{data.totalVisits}</p>
        </Card>
        
        <Card className="p-4">
          <h2 className="font-semibold mb-2">Avg Session Duration</h2>
          <p className="text-2xl">{(data.averageSessionDuration / 1000).toFixed(2)}s</p>
        </Card>
      </div>

      <Card className="p-4">
        <h2 className="font-semibold mb-4">Page Views</h2>
        <div className="space-y-2">
          {Object.entries(data.pageViews).map(([path, views]) => (
            <div key={path} className="flex justify-between">
              <span>{path}</span>
              <span className="font-mono">{views}</span>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <h2 className="font-semibold mb-4">Average Time Spent (seconds)</h2>
          <div className="space-y-2">
            {Object.entries(data.averageTimeSpent).map(([path, time]) => (
              <div key={path} className="flex justify-between">
                <span>{path}</span>
                <span className="font-mono">{(time / 1000).toFixed(2)}s</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          <h2 className="font-semibold mb-4">Average Scroll Depth (%)</h2>
          <div className="space-y-2">
            {Object.entries(data.averageScrollDepth).map(([path, depth]) => (
              <div key={path} className="flex justify-between">
                <span>{path}</span>
                <span className="font-mono">{depth.toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
