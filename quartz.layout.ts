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


// sd.change folder order to be later recolled by sortFn
const manualOrder = ["PLOC'", "COLLECTIONS", "NEWS & ARCHIVE", "LINKS"]
  .map((name) => name.toLowerCase())

const getExplorerOrder = (rawName: string | undefined) => {
  const name = rawName?.toLowerCase() || ""
  const index = manualOrder.indexOf(name)
  return index === -1 ? Number.MAX_SAFE_INTEGER : index
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
      //title: "_____", // title of the explorer component
      folderClickBehavior: "link", // what happens when you click a folder ("link" to navigate to folder page on click or "collapse" to collapse folder on click)
      folderDefaultState: "open", // default state of folders ("collapsed" or "open")
      useSavedState: true, // whether to use local storage to save "state" (which folders are opened) of explorer
      // Sort order: folders first, then files. Sort folders and files alphabetically
      // sd.changed 
      sortFn: (a, b) => {
        const nameA = a.file?.slug || a.name
        const nameB = b.file?.slug || b.name
        const orderA = getExplorerOrder(nameA)
        const orderB = getExplorerOrder(nameB)

        if (orderA !== orderB) {
          return orderA - orderB
        }

        // fallback to alphabetical when same priority
        return a.displayName.localeCompare(b.displayName, undefined, {
          numeric: true,
          sensitivity: "base",
        })
      },
      
      //  sd exclude folders from explorer
      filterFn: (node) => {
        // set containing names of everything you want to filter out
        const omit = new Set(["unlisted", "annexes"])
    
        // can also use node.slug or by anything on node.data
        // note that node.data is only present for files that exist on disk
        // (e.g. implicit folder nodes that have no associated index.md)
        return !omit.has(node.displayName.toLowerCase())
      },
    }
    )),
  ],

  // sd killed the stuff below to clean the look of the page 
  right: [
    //Component.Graph(),
    //Component.DesktopOnly(Component.TableOfContents()),
    //Component.Backlinks(),
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

      //title: "_____", // title of the explorer component
      folderClickBehavior: "link", // what happens when you click a folder ("link" to navigate to folder page on click or "collapse" to collapse folder on click)
      folderDefaultState: "open", // default state of folders ("collapsed" or "open")
      useSavedState: true, // whether to use local storage to save "state" (which folders are opened) of explorer
      // sd.changed 
       sortFn: (a, b) => {
        const nameA = a.file?.slug || a.name
        const nameB = b.file?.slug || b.name
        const orderA = getExplorerOrder(nameA)
        const orderB = getExplorerOrder(nameB)

        if (orderA !== orderB) {
          return orderA - orderB
        }

        return a.displayName.localeCompare(b.displayName, undefined, {
          numeric: true,
          sensitivity: "base",
        })
      },

      //  sd exclude folders from explorer
      filterFn: (node) => {
        // set containing names of everything you want to filter out
        const omit = new Set(["unlisted", "annexes"])
    
        // can also use node.slug or by anything on node.data
        // note that node.data is only present for files that exist on disk
        // (e.g. implicit folder nodes that have no associated index.md)
        return !omit.has(node.displayName.toLowerCase())
      },
    }
    )),
  ],
  right: [],
}
