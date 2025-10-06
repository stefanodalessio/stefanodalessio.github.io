import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      RSS: "https://stefanodalessio.github.io/index.xml",// sd.changed deleted quartz link and replaced it with my RSS
        // sd.changed deleted this line with doscord link
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    //Component.Breadcrumbs(),
    Component.ArticleTitle(),
    //Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    //Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer({
      // sd.changed 
      filterFn: (node) => node.name !== "annexes"
    }
    )),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    //Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer({
      // sd.changed it 
      filterFn: (node) => node.name !== "unlisted"
    }
    )),
  ],
  right: [],
}
