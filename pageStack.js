class PageStack {
	constructor(options){
    this.stack = new Stack()
   }
	goTo(page){
		this.fromPage = this.stack.peek()
    this.toPage = page
    this.stack.push(page)
    page.init(this.stack.length)
	}
	goBack(){
		if(this.stack.length <= 1){
      alert('已经是第一页，无法返回！')
			return null
		}else{
      let page = this.stack.pop()
      page.destroy()
			this.fromPage = page
      this.toPage = this.stack.peek()
      console.log('stack',this.stack)
		}
  }
}



