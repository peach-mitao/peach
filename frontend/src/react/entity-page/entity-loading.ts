export interface EntityLoadingPorts {
  shapesReady(kind: string, name: string): boolean;
  waitShapes(): Promise<void>;
  paintSkeleton(kind: string, name: string): void;
  resetView(): void;
  loadShapes(): Promise<unknown>;
  syncParts(kind: string, name: string): void;
}

/** The async list only modifies the skeleton while this page's Open is still alive; the page's Cancel authority comes from the route element. */
export function createEntityLoading(ports: EntityLoadingPorts) {
  return async (kind: string, name: string, current: () => boolean): Promise<void> => {
    ports.paintSkeleton(kind, name);
    ports.resetView();
    if (!ports.shapesReady(kind, name)) {
      void ports.waitShapes().then(() => { if (current()) ports.syncParts(kind, name) });
    }
    void ports.loadShapes().then(() => { if (current()) ports.syncParts(kind, name) });
  };
}
