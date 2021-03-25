import { makeAutoObservable, runInAction } from 'mobx'
import canvasAPI from '../api/canvas'

class CanvasesState {
   items = null
   isFetching = false

   constructor() {
      makeAutoObservable(this)
   }

   fetchAll = async () => {
      this.isFetching = true

      try {
         const { data } = await canvasAPI.getAll()

         runInAction(() => {
            this.items = data.data
         })
      } catch (e) {
         console.log(e, 'Woops')
      } finally {
         runInAction(() => {
            this.isFetching = false
         })
      }
   }
}

export default new CanvasesState()
