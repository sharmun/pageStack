class Router{
  constructor(pages, containerId){
    const pageStack = new PageStack({containerId})
    this.initPages(pages, pageStack) 
  }
  initPages(pages, pageStack){
    pages.map(item=>{
      this[item.id] = new Page({...item,pageStack})
      if(item.children && item.children.length > 0){
        const childPageStack = new PageStack({containerId:item.childrenContainerId})
        pageStack.setChildPageStack(childPageStack)
        this.initPages(item.children, childPageStack)
      }
    })
  }
  navigateTo(pageId,switchWay){
    let page = this[pageId]
    page.pageStack.navigateTo(page,switchWay)
    this.curPageStack = page.pageStack
  }
  goBack(){
    this.curPageStack.goBack()
  }
}