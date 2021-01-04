class Component {
  constructor(options) {
    this.id = options.id
    this.HTML = options.HTML
  }
  setZindex (zindex) {
    this.zindex = zindex
  }
  destroy () {
    this.pageDom.removeClass('slidingInRight')
    this.pageDom.on('transitionend', () => {
      this.pageDom.remove()
    })
  }
  init (zindex) {
    this.setZindex(zindex)
    this.render()
    this.bindEvents()
  }
  render () {
    this.pageDom = $(`<div class="page transition slideInRight" id="${this.id}" style="z-index:${this.zindex}"></div>`)
    this.pageDom.append($(this.HTML))
    $('#app').append(this.pageDom)
    setTimeout(() => {
      this.pageDom.addClass('slidingInRight')
    }, 0)
  }
  bindEvents () {
    this.pageDom.find("*[event]").on('click', function () {
      eval($(this).attr('event') + '()')
    })
  }
}

class Page extends Component {

}
