import { useEffect } from 'react'

const useOutsideClick = (ref, callback, permittedSelector) => {
   const handleOutsideClick = (e) => {
      if (
         ref.current &&
         !ref.current.contains(e.target) &&
         !e.target.closest(permittedSelector)
      ) {
         callback()
      }
   }

   useEffect(() => {
      document.addEventListener('click', handleOutsideClick)

      return () => {
         document.removeEventListener('click', handleOutsideClick)
      }
   })
}

export default useOutsideClick