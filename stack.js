class Stack{
	constructor(){
		this.length = 0
    this.items = {}
	}
	push(node){
    this.items[this.length] = node
    this.length ++
	}
	pop(){
		if (this.isEmpty()) {
	      return null
	    }
		this.length -- 
		const r = {...this.items[this.length]}
		delete this.items[this.length]
		return r
	}
	peek(){
		return this.items[this.length-1]
	}
	clear(){
		this.length = 0
		this.items = {}
	}
	isEmpty(){
		return this.length === 0
	}
}

class PageStack {
	constructor(options){
    this.containerId = options.containerId
    this.childPageStack = options.childPageStack ? options.childPageStack : null
    this.stack = new Stack()
   }
  setChildPageStack(pageStack){
    this.childPageStack = pageStack
  }
	navigateTo(page,switchWay){
		this.fromPage = this.stack.peek()
		this.stack.push(page)
    this.lastSwitchWay = switchWay
    this.toPage = page
    if(!this.from || this.fromPage.id !== this.toPage.id){
      this.switchPage(switchWay)
    }
	}
	replace(page){
		if(!this.stack.isEmpty()){
      		this.fromPage = this.stack.peek()
			this.stack.pop()
		}
		this.stack.push(page)
		this.toPage = page
		this.switchPage()
	}
	goBack(){
		if(this.stack.isEmpty()){
			return null
		}else{
			let page = this.stack.pop()
			this.fromPage = page
      this.toPage = this.stack.peek()
      let switchWay = this.lastSwitchWay === 'slideInRight' ? 'slideInLeft' :''
			this.switchPage(switchWay)
			if(this.childPageStack){
				this.childPageStack.switchPage()
			}
		}
  }
  switchPage(switchWay){
    let orgDom = $(`#${this.containerId}`)
    let parentDom = orgDom.parent()
    let toPage = this.stack.peek()
    let newPage = $('<div id="temp"></div>')
    switch(switchWay){
      case 'slideInRight':
        newPage.addClass('slideInRight').addClass(orgDom.attr('class'))
        newPage.append(toPage.HTML)
        parentDom.append(newPage)
        parentDom.addClass('transition slidingInRight')
        // 0.2s动画结束后恢复DOM
        setTimeout(() => {
          orgDom.remove()
          newPage.removeClass('slideInRight')
          newPage.attr('id',this.containerId)
          parentDom.removeClass('transition').removeClass('slidingInRight')
        },200)

        break;
      case 'slideInLeft':
        newPage.addClass(orgDom.attr('class'))
        newPage.append(toPage.HTML)
        parentDom.prepend(newPage)
        orgDom.addClass('slideInRight')
        parentDom.addClass('slidingInRight')
        setTimeout(() => {
          parentDom.addClass('transition')
          parentDom.removeClass('slidingInRight')
          setTimeout(() => {
            orgDom.remove()
            newPage.removeClass('slideInRight')
            newPage.attr('id',this.containerId)
            parentDom.removeClass('transition')
          },200)
        },0)
        break;
      default:
        $(`#${this.containerId}`).html(toPage.HTML)
        break;
    }
 	}
}



