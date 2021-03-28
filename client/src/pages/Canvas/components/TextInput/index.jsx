// import { useState } from 'react'
// import { observer } from 'mobx-react-lite'

// import canvasState from '../../../../store/canvasState'
// import { runInAction, toJS } from 'mobx'
// import toolState from '../../../../store/toolState'
// import Text from '../../../../tools/Text'

// const TextInput = () => {
// 	// const tool = toolState.tool

// 	const [value, setValue] = useState('')

// 	const onChange = (e) => {
// 		setValue(e.target.value)
// 	}

// 	const onBlur = () => {
// 		if (value) {
// 			runInAction(() => {
// 				const toolIndex = canvasState.getToolIndexById(toolState.tool.toolId)
// 				canvasState.draw(toolIndex, {
// 					x: toolState.tool.start.x,
// 					y: toolState.tool.start.y,
// 					text: value
// 				})
// 			})

// 			// toolState.tool.mouseDown = false

// 			console.log(toJS(toolState.tool))
// 		}
// 	}

// 	return toolState.tool && toolState.tool instanceof Text && toolState.tool.mouseDown ? (
// 		<>
// 			<div className="Text__input-overlay"></div>

// 			<input
// 				type="text"
// 				placeholder="Текст..."
// 				// autoFocus
// 				className="Text__input"
// 				style={{
// 					left: toolState.tool.start.x - 20 + 'px',
// 					top: toolState.tool.start.y - 20 + 'px'
// 				}}
// 				value={value}
// 				onChange={onChange}
// 				onBlur={onBlur}
// 			/>
// 		</>
// 	) : null
// }

// export default observer(TextInput)





















import { useState } from 'react'
import { observer } from 'mobx-react-lite'

import canvasState from '../../../../store/canvasState'
import { runInAction, toJS } from 'mobx'
// import toolState from '../../../../store/toolState'

const TextInput = () => {
	const params = canvasState.editedTextTool
	// console.log(toJS(toolState.tool))

	const [value, setValue] = useState('')

	const onChange = (e) => {
		// console.log(e.target.value)
		setValue(e.target.value)
	}

	const onBlur = () => {
		if (value) {
			console.log(value)
			runInAction(() => {
				const toolIndex = canvasState.getToolIndexById(params.toolId)
				canvasState.draw(toolIndex, {
					x: params.x,
					y: params.y,
					text: value
				})
				canvasState.editedTextTool = null
			})
		}
	}

	return params ? (
		<>
		<div className="Text__input-overlay"></div>
		<input
			type="text"
			placeholder="Текст..."
			// autoFocus
			className="Text__input"
			style={{
				left: params.x - 20 + 'px',
				top: params.y - 20 + 'px'
			}}
			value={value}
			onChange={onChange}
			onBlur={onBlur}
		/>
		</>
	) : null
}

export default observer(TextInput)
