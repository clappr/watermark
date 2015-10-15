import {UIContainerPlugin, template} from 'clappr'
import html from './watermark.html'
import './watermark.css'

export default class WaterMarkPlugin extends UIContainerPlugin {
  get name() { return 'watermark' }

  get template() { return template(html) }

  constructor(options) {
    super(options)
    this.position = options.position || "bottom-right"
    if (options.watermark) {
      this.imageUrl = options.watermark
      this.render()
    } else {
      this.$el.remove()
    }
  }

  bindEvents() {
    this.listenTo(this.container, 'container:play', this.onPlay)
    this.listenTo(this.container, 'container:stop', this.onStop)
  }

  onPlay() {
    if (!this.hidden)
      this.$el.show()
  }

  onStop() {
    this.$el.hide()
  }

  render() {
    this.$el.hide()
    var templateOptions = {position: this.position, imageUrl: this.imageUrl}
    this.$el.html(this.template(templateOptions))
    this.container.$el.append(this.$el)
    return this
  }
}

