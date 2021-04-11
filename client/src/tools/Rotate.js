import Tool from './Tool'

export default class Rotate extends Tool {
   constructor(canvas) {
      super(canvas) 

      this.angle = this._getCurrentAngle(this.container)   // стартовый угол
      this.startAngle = 0  // угол на который прокручиваем
      this.center = this._getCenter(this.container)
      this.R2D = 180 / Math.PI

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

      this.startAngle = this._calculateAngle(e)
   }

   mouseMoveHandler(e) {
      if (!this.mouseDown) return

      let curAngle = this._calculateAngle(e)

      this.container.style.webkitTransform = `rotate(${this.angle + curAngle - this.startAngle}deg)`
   }

   mouseUpHandler(e) {
      this.mouseDown = false

      this.angle = this._getCurrentAngle(this.container)
   }

   _calculateAngle(e) {
      const clientX = e.clientX ? e.clientX : e.touches[0].clientX
		const clientY = e.clientY ? e.clientY : e.touches[0].clientY
      let x = clientX - this.center.x
      let y = clientY - this.center.y
      let angle = this.R2D * Math.atan2(y, x)

      return angle
   }

   _getCenter(element) {
      const {left, top, width, height} = element.getBoundingClientRect()
      return {x: left + width / 2, y: top + height / 2}
   }

   _getCurrentAngle(el) {
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


// Старая, но рабочая имплементация
// import Tool from './Tool'

// // TODO:
// // Сделать так, чтобы ротация происходила автоматически
// // Если зажат ctrl крутить по 15deg (и подгонять к ближайшему значению - кратному 15)

// export default class Rotate extends Tool {
//    constructor(canvas) {
//       super(canvas) 

//       this.startX = 0   // стартовая позиция курсора по x
//       this.startR = this._getCurrentRotation(this.container)   // стартовый rotate

//       this.listen()

//       document.documentElement.style.cursor = 'move'
//       this.canvas.style.cursor = 'move'
//    }

//    listen() {
//       window.onmousedown = this.mouseDownHandler.bind(this)
//       window.onmousemove = this.mouseMoveHandler.bind(this)
//       window.onmouseup = this.mouseUpHandler.bind(this)

//       window.ontouchstart = this.mouseDownHandler.bind(this)
//       window.ontouchmove = this.mouseMoveHandler.bind(this)
//       window.ontouchend = this.mouseUpHandler.bind(this)
//       window.ontouchclose = this.mouseUpHandler.bind(this)
//    }

//    mouseDownHandler(e) {
//       super.mouseDownHandler(e)

//       const pageX = e.pageX ? e.pageX : e.touches[0].pageX

//       this.startX = pageX
//    }

//    mouseMoveHandler(e) {
//       if (!this.mouseDown) return

//       const curX = e.pageX ? e.pageX : e.touches[0].pageX

//       if (Math.abs(this.startX - curX) < 2) return // задержка	(нужно проскролить хотя бы на 2px, чтобы началась ротация)

//       this._setRotate(this.startX < curX, e.ctrlKey)
//       this.startX = curX
//    }

//    mouseUpHandler(e) {
//       this.mouseDown = false
//    }

//    _setRotate(dir, ctrlKey) {
//       // Тут искать diff, чтобы было кратно 15

//       const distance = ctrlKey ? 15 : 2
//       let val = dir ? (this.startR += distance) : (this.startR -= distance)

//       if (val > 360) this.startR = 0
//       if (val < 0) this.startR = 360

//       this.container.style.transform = `rotate(${val}deg)`
//    }

//    _getCurrentRotation(el) {
//       const st = window.getComputedStyle(el, null)
//       const tm =
//          st.getPropertyValue('-webkit-transform') ||
//          st.getPropertyValue('-moz-transform') ||
//          st.getPropertyValue('-ms-transform') ||
//          st.getPropertyValue('-o-transform') ||
//          st.getPropertyValue('transform') ||
//          'none'
//       if (tm !== 'none') {
//          let values = tm.split('(')[1].split(')')[0].split(',')
//          let angle = Math.round(
//             Math.atan2(values[1], values[0]) * (180 / Math.PI)
//          )
//          return angle < 0 ? angle + 360 : angle //adding 360 degrees here when angle < 0 is equivalent to adding (2 * Math.PI) radians before
//       }
//       return 0
//    }
// }
