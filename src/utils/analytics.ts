export interface AnalyticsEvent {
  type: 'page_view' | 'category_view' | 'collection_view' | 'outbound_click';
  name: string;
  metadata?: Record<string, string | number | boolean>;
  timestamp: string;
}

// In-memory telemetry log for the current session (zero external network requests)
const sessionEventLog: AnalyticsEvent[] = [];

export function isDoNotTrackEnabled(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
  return navigator.doNotTrack === '1' || (window as any).doNotTrack === '1';
}

export function logAnalyticsEvent(event: Omit<AnalyticsEvent, 'timestamp'>): void {
  if (isDoNotTrackEnabled()) {
    return;
  }

  const fullEvent: AnalyticsEvent = {
    ...event,
    timestamp: new Date().toISOString()
  };

  sessionEventLog.push(fullEvent);

  if (import.meta.env.DEV) {
    console.debug('[WERK Analytics Event]:', fullEvent);
  }
}

export function trackPageView(page: string): void {
  logAnalyticsEvent({
    type: 'page_view',
    name: page
  });
}

export function trackCategoryView(slug: string, name: string, repoCount?: number): void {
  logAnalyticsEvent({
    type: 'category_view',
    name: slug,
    metadata: { categoryName: name, repoCount: repoCount || 0 }
  });
}

export function trackCollectionView(slug: string, title: string): void {
  logAnalyticsEvent({
    type: 'collection_view',
    name: slug,
    metadata: { collectionTitle: title }
  });
}

export function trackOutboundClick(
  target: 'github' | 'instagram' | 'nowpayments' | 'external',
  destinationUrl: string
): void {
  logAnalyticsEvent({
    type: 'outbound_click',
    name: target,
    metadata: { destinationUrl }
  });
}

export function getSessionEventLog(): AnalyticsEvent[] {
  return [...sessionEventLog];
}
