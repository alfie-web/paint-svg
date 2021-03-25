import React from 'react'

import toolState from '../../../../store/toolState'
// import ConnectedUsers from './components/ConnectedUsers'
import ColorPicker from '../../../../components/ColorPicker'

import './SettingsBar.sass'

const SettingsBar = () => {
   return (
      <div className="SettingBar">
         <div className="SettingBar__left">
            <div className="SettingBar__option">
               <label htmlFor="lineWidth">Толщина линии: </label>
               <input
						title="Толщина линии"
                  id="lineWidth"
                  type="number"
                  defaultValue={toolState.lineWidth}
                  min={1}
                  max={50}
                  onChange={(e) => toolState.setLineWidth(e.target.value)}
               />
            </div>

            <div className="SettingBar__option">
               <ColorPicker
                  label="Цвет обводки: "
                  className="color"
                  idAttr="strokeColor"
						value={toolState.stroke}
						title="Цвет обводки"
                  onChange={(val) => toolState.setStrokeColor(val)}
               />
            </div>

				<div className="SettingBar__option">
               <ColorPicker
                  label="Цвет заливки: "
                  className="color"
                  idAttr="fillColor"
						value={toolState.fill}
						title="Цвет заливки"
                  onChange={(val) => toolState.setFillColor(val)}
               />
            </div>
         </div>

         <div className="SettingBar__right">{/* <ConnectedUsers /> */}</div>
      </div>
   )
}

export default SettingsBar
