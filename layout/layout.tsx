import {
    PlasmicRootProvider,
    PlasmicComponent,
    ComponentRenderData,
    extractPlasmicQueryData
  } from '@plasmicapp/loader-nextjs';
import { PLASMIC } from '../plasmic-init';

// Statically fetch the data needed to render Plasmic pages or components.
export async function getStaticProps() {
  // You can pass in multiple page paths or component names.
  const plasmicData = await PLASMIC.fetchComponentData('Header, Footer');
  if (!plasmicData) {
    throw new Error('No Plasmic design found');
  }

  // Cache the necessary data fetched for the page
  const queryCache = await extractPlasmicQueryData(
    <PlasmicRootProvider loader={PLASMIC} prefetchedData={plasmicData}>
      <PlasmicComponent component={plasmicData.entryCompMetas[0].displayName} />
    </PlasmicRootProvider>
  );
  return {
    props: {
      plasmicData,
      queryCache
      // ...
    },

    // Using incremental static regeneration, will invalidate this page
    // after 300s (no deploy webhooks needed)
    revalidate: 300
  };
};

export default function Layout( props: { plasmicData: ComponentRenderData; queryCache?: Record<string, any> },{ children } :any  )
{
    return (
      <PlasmicRootProvider loader={PLASMIC} prefetchedData={props.plasmicData} prefetchedQueryData={props.queryCache}>
        <div style={{display:'flex', alignItems:'stretch', flexDirection:'column'}}>
            <PlasmicComponent component="Header" />
            <div>{children}</div>
        <PlasmicComponent component="Footer" />
        </div>
        </PlasmicRootProvider>
    )
}