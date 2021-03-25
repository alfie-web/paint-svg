import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import canvasesState from '../../store/canvasesState'

import Header from '../../components/Header'
import Preloader from '../../components/Preloader'
import CanvasList from './components/CanvasList'

import './Canvases.sass'

const Canvases = () => {
   console.log('RENDERS') // много ререндеров из-за того, что меняются свойства в стейте mobx, и observer их ловит
   useEffect(() => {
      !canvasesState.items &&
         !canvasesState.isFetching &&
         canvasesState.fetchAll()
   })

   return (
      <>
         <Header />

         <div className="Canvases Page">
            <div className="container">
               <h2>Ваши холсты</h2>

               {canvasesState.isFetching && <Preloader />}

               {canvasesState.items && canvasesState.items.length && (
                  <CanvasList items={canvasesState.items} />
               )}

               {(!canvasesState.items || !canvasesState.items.length) && (
                  <span>У вас нет холстов</span>
               )}
            </div>
         </div>
      </>
   )
}

export default observer(Canvases)
