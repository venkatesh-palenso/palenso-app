import { useEffect, useRef, useState } from "react";

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  interactionTime: number;
}

export function usePerformance(componentName: string) {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: 0,
    renderTime: 0,
    interactionTime: 0,
  });

  const startTime = useRef<number>(Date.now());
  const renderStartTime = useRef<number>(0);

  useEffect(() => {
    // Track component load time
    const loadTime = Date.now() - startTime.current;

    // Track render time
    renderStartTime.current = performance.now();

    const renderTime = performance.now() - renderStartTime.current;

    setMetrics((prev) => ({
      ...prev,
      loadTime,
      renderTime,
    }));

    // Log performance metrics in development
    if (process.env.NODE_ENV === "development") {
      console.log(`🚀 ${componentName} Performance:`, {
        loadTime: `${loadTime}ms`,
        renderTime: `${renderTime.toFixed(2)}ms`,
      });
    }

    // Report to analytics in production
    if (process.env.NODE_ENV === "production") {
      // You can send metrics to your analytics service here
      // analytics.track('component_performance', {
      //   component: componentName,
      //   loadTime,
      //   renderTime,
      // });
    }
  }, [componentName]);

  const trackInteraction = (interactionName: string) => {
    const interactionTime = Date.now() - startTime.current;

    setMetrics((prev) => ({
      ...prev,
      interactionTime,
    }));

    if (process.env.NODE_ENV === "development") {
      console.log(`👆 ${componentName} Interaction (${interactionName}):`, {
        interactionTime: `${interactionTime}ms`,
      });
    }
  };

  return {
    metrics,
    trackInteraction,
  };
}

export function usePageLoad() {
  const [pageLoadTime, setPageLoadTime] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const startTime = performance.now();

    const handleLoad = () => {
      const loadTime = performance.now() - startTime;
      setPageLoadTime(loadTime);
      setIsLoaded(true);

      if (process.env.NODE_ENV === "development") {
        console.log(`📄 Page Load Time: ${loadTime.toFixed(2)}ms`);
      }
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  return { pageLoadTime, isLoaded };
}

export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(true);
  const [connectionType, setConnectionType] = useState<string>("unknown");

  useEffect(() => {
    const updateNetworkStatus = () => {
      setIsOnline(navigator.onLine);

      // Get connection type if available
      if ("connection" in navigator) {
        const connection = (navigator as any).connection;
        setConnectionType(connection?.effectiveType || "unknown");
      }
    };

    updateNetworkStatus();

    window.addEventListener("online", updateNetworkStatus);
    window.addEventListener("offline", updateNetworkStatus);

    return () => {
      window.removeEventListener("online", updateNetworkStatus);
      window.removeEventListener("offline", updateNetworkStatus);
    };
  }, []);

  return { isOnline, connectionType };
}
