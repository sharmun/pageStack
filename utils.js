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
		const r = this.items[this.length]
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