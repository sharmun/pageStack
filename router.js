class Router{
  constructor(config){
    this.config = {}
    config.map(item=>{
      this.config[item.path] = item
    })
    this.pageStack = new PageStack()
  }
  goTo(path){
    this.pageStack.goTo(new Component(this.config[path].component))
    
  }
  goBack(){
    this.pageStack.goBack()
  }
}