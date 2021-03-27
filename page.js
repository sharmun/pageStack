class Component {
    constructor(options) {
        this.id = options.id
        this.HTML = options.getHTML()
        this.zindex = options.zindex
        this.animate = options.animate
        this.pageDom = $(`<div class="page ${this.animate? 'slideInRight transition':''}" id="${this.id}" style="z-index:${this.zindex}"></div>`)
        this.componentWillMount = options.componentWillMount
        this.componentDidMount = options.componentDidMount
        console.log(this)
        this.start()
    }

    start() {
        this.componentWillMount && this.componentWillMount()
        this.mount()
            // 页面切换动画效果
        this.animate && setTimeout(() => { this.pageDom.removeClass('slideInRight') }, 0)
        this.componentDidMount && this.componentDidMount()
    }

    mount() {
        this.pageDom.append($(this.HTML))
        $('#app').append(this.pageDom)
    }

    unmount() {
        this.componentWillUnmount && this.componentWillUnmount()
        this.destroy().then(() => {
            this.componentDidUnmount && this.componentDidUnmount()
        })

    }

    destroy() {
        return new Promise((resolve, reject) => {
            // ????
            document.getElementById(this.id).addEventListener('transitionend', () => {
                alert(1)
                this.pageDom.remove()
                resolve()
            })
            this.animate && this.pageDom.addClass('slideInRight')
        })
    }

}

class ChatPage extends Component {

    constructor(options) {
        options.id = 'ChatPage'
        options.getHTML = function() {
            return '<div class="bg-red-300 h-full"><div class="header"><span event="goBack" id="back">返回</span><span>我和老王的聊天窗口</span><span></span></div><div><span class="avatar" event="gotoWInfo" id="gotoWInfo">点我</span><span>你好啊</span></div></div>'
        }
        options.componentDidMount = function() {

            this.bindEvents()
        }

        super(options)
    }

    bindEvents() {

        document.getElementById('gotoWInfo').addEventListener('click', () => {
            router.goTo('/wangInfoPage')
        })
        document.getElementById('back').addEventListener('click', () => {
            router.goBack()
        })
    }



}

class WangInfoPage extends Component {

    constructor(options) {
        options.id = 'WangInfoPage'
        options.getHTML = function() {
            return `<div class="bg-yellow-200 h-full transition">
        <div class="header"><span event="goBack" id="wback">返回</span><span>老王的信息</span><span></span></div><div >
          <ul><li><span class="avatar">王</span>姓名：老王 微信号：9527</li></ul>
          <ul event="gotoWFC"><li id="toWangFriendCircleBtn"><span class="avatar" >王</span>点我进入老王的朋友圈</li></ul>
        </div>
        </div>`
        }
        options.animate = true
        options.componentDidMount = function() {
            this.bindEvents()
        }

        super(options)
    }

    bindEvents() {

        document.getElementById('toWangFriendCircleBtn').addEventListener('click', () => {
            router.goTo('/friendsCirclePage')
        })
        document.getElementById('wback').addEventListener('click', () => {
            router.goBack()
        })
    }


}

class FriendsCirclePage extends Component {

    constructor(options) {
        options.id = 'friendsCirclePage'
        options.getHTML = function() {
            return '<div class="bg-green-300 h-full transition"><div class="header"><span event="goBack" id="fback">返回</span></div>这是老王的朋友圈</div>'
        }
        options.componentDidMount = function() {
            this.bindEvents()
        }

        super(options)
    }

    bindEvents() {
        document.getElementById('fback').addEventListener('click', () => {
            router.goBack()
        })
    }

}