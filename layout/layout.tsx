import {
    PlasmicRootProvider,
    PlasmicComponent,
    ComponentRenderData,
    extractPlasmicQueryData,
    usePlasmicQueryData
  } from '@plasmicapp/loader-nextjs';
import { PLASMIC } from '../plasmic-init';

export default function Layout( props: { children: React.ReactNode[] }  )
{
  const plasmicData = usePlasmicQueryData("layout", async () => PLASMIC.fetchComponentData("Header", "Footer"))
    return (
      plasmicData.data && <PlasmicRootProvider loader={PLASMIC} prefetchedData={plasmicData.data}>
        <div style={{display:'flex', alignItems:'stretch', flexDirection:'column'}}>
          <PlasmicComponent component="Header" />
          <div>{props.children}</div>
          <PlasmicComponent component="Footer" />
        </div>
        </PlasmicRootProvider>
    )
}