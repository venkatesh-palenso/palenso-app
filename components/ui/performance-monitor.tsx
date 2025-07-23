import React, { useEffect, useState } from "react";
import {
  usePerformance,
  usePageLoad,
  useNetworkStatus,
} from "@/hooks/use-performance";

interface PerformanceMonitorProps {
  componentName: string;
  showMetrics?: boolean;
}

export function PerformanceMonitor({
  componentName,
  showMetrics = process.env.NODE_ENV === "development",
}: PerformanceMonitorProps) {
  const { metrics, trackInteraction } = usePerformance(componentName);
  const { pageLoadTime } = usePageLoad();
  const { isOnline, connectionType } = useNetworkStatus();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show performance monitor in development mode
    if (showMetrics) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showMetrics]);

  if (!showMetrics || !isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs font-mono z-50 max-w-xs">
      <div className="mb-2 font-semibold text-green-400">
        🚀 Performance Monitor
      </div>

      <div className="space-y-1">
        <div>Component: {componentName}</div>
        <div>Load: {metrics.loadTime}ms</div>
        <div>Render: {metrics.renderTime.toFixed(2)}ms</div>
        <div>Page: {pageLoadTime.toFixed(2)}ms</div>
        <div>
          Network: {isOnline ? "🟢 Online" : "🔴 Offline"} ({connectionType})
        </div>
      </div>

      <button
        onClick={() => trackInteraction("monitor_click")}
        className="mt-2 px-2 py-1 bg-blue-600 rounded text-xs hover:bg-blue-700"
      >
        Track Interaction
      </button>
    </div>
  );
}

export function GlobalPerformanceMonitor() {
  const { pageLoadTime, isLoaded } = usePageLoad();
  const { isOnline, connectionType } = useNetworkStatus();
  const [showOfflineWarning, setShowOfflineWarning] = useState(false);

  useEffect(() => {
    if (!isOnline && !showOfflineWarning) {
      setShowOfflineWarning(true);
    } else if (isOnline && showOfflineWarning) {
      setShowOfflineWarning(false);
    }
  }, [isOnline, showOfflineWarning]);

  return (
    <>
      {/* Offline Warning */}
      {showOfflineWarning && (
        <div className="fixed top-0 left-0 right-0 bg-red-500 text-white p-2 text-center z-50">
          🔴 You are currently offline. Some features may not work properly.
        </div>
      )}

      {/* Performance Metrics (Development Only) */}
      {process.env.NODE_ENV === "development" && isLoaded && (
        <div className="fixed top-4 right-4 bg-black/80 text-white p-3 rounded-lg text-xs font-mono z-40">
          <div className="font-semibold text-green-400 mb-1">
            📊 Global Metrics
          </div>
          <div>Page Load: {pageLoadTime.toFixed(2)}ms</div>
          <div>Network: {connectionType}</div>
        </div>
      )}
    </>
  );
}
