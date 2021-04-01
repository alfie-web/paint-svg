import { useState } from 'react'
import { observer } from 'mobx-react-lite'

import canvasState from '../../../../store/canvasState'
import { runInAction } from 'mobx'

const TextInput = () => {
	const params = canvasState.editedTextTool

	const [value, setValue] = useState('')

	const onChange = (e) => {
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
