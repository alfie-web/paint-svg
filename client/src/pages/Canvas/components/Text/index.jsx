// import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { toJS } from 'mobx'

const Text = ({ tool, className }) => {
   const { x, y, text } = tool.params

   // const [isEdit, setIsEdit] = useState(true)
   // const [value, setValue] = useState(text)

   // const onChange = (e) => {
   //    setValue(e.target.value)
   // }

   // const onBlur = () => {
   //    setIsEdit(false)
   // }

   return (
      <>
         
         <text
            className={className}
            x={x}
            y={y}
            // onDoubleClick={() => setIsEdit(true)}
            {...toJS(tool.settings)}
         >
				{/* {isEdit && (
					<input
						type="text"
						placeholder="Текст..."
						onBlur={onBlur}
						autoFocus
						value={value}
						onChange={onChange}
						className="Text__input"
					/>
				)} */}
            {text}
         </text>
      </>
   )
}

export default observer(Text)
