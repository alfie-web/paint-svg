import { useState, memo, useRef } from 'react'
import classNames from 'classnames'
import { ChromePicker } from 'react-color'

import useOutsideClick from '../../helpers/useOutsideClick'

import './ColorPicker.sass'

const ColorPicker = ({
   className,
   idAttr,
   onChange,
   label,
   title = '',
   value = 'rgba(0,0,0,1)',
}) => {
   const parseFromRGBA = (rgba) => {
      if (rgba === 'none') return rgba
      rgba = rgba.replace(/[^\d,]/g, '').split(',')
      return { r: rgba[0], g: rgba[1], b: rgba[2], a: rgba[3] }
   }

   const [color, setColor] = useState(parseFromRGBA(value))
   const [isVisible, setIsVisible] = useState(false)
   const pickerRef = useRef()

   useOutsideClick(pickerRef, () => setIsVisible(false), '.ColorPicker')

   const formatToRGBA = ({ r, g, b, a }) => {
      return `rgba(${r},${g},${b},${a})`
   }

   const handleChange = (color) => {
      const val = formatToRGBA(color.rgb)
      setColor(color.rgb)
      onChange(val)
   }

   const changeVisible = () => {
      setIsVisible(!isVisible)
   }

   return (
      <>
         <span
            className={classNames('ColorPicker', className)}
            title={title}
            ref={pickerRef}
				>
				{label && (
					<label htmlFor={idAttr} onClick={changeVisible} className="ColorPicker__label">
						{label}
					</label>
				)}
            <span
               className="ColorPicker__color"
               style={{ backgroundColor: formatToRGBA(color) }}
               onClick={changeVisible}
            ></span>
            {isVisible && (
               <ChromePicker
                  color={color}
                  onChange={handleChange}
                  className="ColorPicker__element"
               />
            )}
         </span>
      </>
   )
}

export default memo(ColorPicker)
