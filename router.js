class Router {
    constructor(config) {
        this.config = config
        this.pageStack = new PageStack()
    }
    goTo(path) {
        if (this.config[path] && this.config[path].componnet) {
            let page = new this.config[path].componnet({ zindex: this.pageStack.getLength() })
            this.pageStack.goTo(page)
        } else {
            alert(404)
        }

    }
    goBack() {
        this.pageStack.goBack()
    }
}