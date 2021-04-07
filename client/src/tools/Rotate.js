import Tool from './Tool'

export default class Rotate extends Tool {
   constructor(canvas) {
      super(canvas) 

      this.startX = 0   // стартовая позиция курсора по x
      this.startR = this._getCurrentRotation(this.container)   // стартовый rotate

      this.listen()

      document.documentElement.style.cursor = 'move'
      this.canvas.style.cursor = 'move'
   }

   listen() {
      window.onmousedown = this.mouseDownHandler.bind(this)
      window.onmousemove = this.mouseMoveHandler.bind(this)
      window.onmouseup = this.mouseUpHandler.bind(this)

      window.ontouchstart = this.mouseDownHandler.bind(this)
      window.ontouchmove = this.mouseMoveHandler.bind(this)
      window.ontouchend = this.mouseUpHandler.bind(this)
      window.ontouchclose = this.mouseUpHandler.bind(this)
   }

   mouseDownHandler(e) {
      super.mouseDownHandler(e)

      const pageX = e.pageX ? e.pageX : e.touches[0].pageX

      this.startX = pageX
   }

   mouseMoveHandler(e) {
      if (!this.mouseDown) return

      const curX = e.pageX ? e.pageX : e.touches[0].pageX

      if (Math.abs(this.startX - curX) < 2) return // задержка	(нужно проскролить хотя бы на 2px, чтобы началась ротация)

      this._setRotate(this.startX < curX)
      this.startX = curX
   }

   mouseUpHandler(e) {
      this.mouseDown = false
   }

   _setRotate(dir) {
      const val = dir ? (this.startR += 2) : (this.startR -= 2)

      this.container.style.transform = `rotate(${val}deg)`
   }

   _getCurrentRotation(el) {
      const st = window.getComputedStyle(el, null)
      const tm =
         st.getPropertyValue('-webkit-transform') ||
         st.getPropertyValue('-moz-transform') ||
         st.getPropertyValue('-ms-transform') ||
         st.getPropertyValue('-o-transform') ||
         st.getPropertyValue('transform') ||
         'none'
      if (tm !== 'none') {
         let values = tm.split('(')[1].split(')')[0].split(',')
         let angle = Math.round(
            Math.atan2(values[1], values[0]) * (180 / Math.PI)
         )
         return angle < 0 ? angle + 360 : angle //adding 360 degrees here when angle < 0 is equivalent to adding (2 * Math.PI) radians before
      }
      return 0
   }
}
