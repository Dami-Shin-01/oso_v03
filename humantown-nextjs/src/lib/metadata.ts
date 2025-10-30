import type { Metadata } from 'next';

import { defaultKeywords, siteInfo } from '@/lib/config/site';

type OpenGraphConfig = NonNullable<Metadata['openGraph']>;

interface BuildMetadataOptions {
  title?: string;
  description?: string;
  keywords?: string[];
  openGraph?: Partial<OpenGraphConfig>;
}

export function buildMetadata(options: BuildMetadataOptions = {}): Metadata {
  const title = options.title ?? siteInfo.site_name;
  const description = options.description ?? siteInfo.description ?? '';
  const keywords = options.keywords ?? defaultKeywords;

  const baseOpenGraph: OpenGraphConfig = {
    title,
    description,
    url: siteInfo.base_url,
    siteName: siteInfo.site_name,
    type: 'website',
  };

  const mergedOpenGraph: OpenGraphConfig = {
    ...baseOpenGraph,
    ...options.openGraph,
    title: options.openGraph?.title ?? baseOpenGraph.title,
    description: options.openGraph?.description ?? baseOpenGraph.description,
  };

  if (options.openGraph?.images) {
    mergedOpenGraph.images = options.openGraph.images;
  }

  return {
    title,
    description,
    keywords,
    metadataBase: new URL(siteInfo.base_url),
    openGraph: mergedOpenGraph,
  };
}
