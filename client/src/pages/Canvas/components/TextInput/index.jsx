// import { useRef, useEffect } from 'react'
// import { observer } from 'mobx-react-lite'

// import canvasState from '../../../../store/canvasState'
// import { toJS } from 'mobx'

// const TextInput = () => {
// 	const params = canvasState.editedTextTool

// 	console.log('RENDERS', params)

// 	const inputRef = useRef()

// 	useEffect(() => {
// 		const isExists = inputRef && inputRef.current
// 		if (isExists) {
// 			console.dir(inputRef.current)
// 			inputRef.current.addEventListener('input', onChange)
// 			inputRef.current.addEventListener('blur', onBlur)
// 		}
// 	})

// 	const onChange = (e) => {
// 		// console.log(e.target.value)
// 		// setValue(e.target.value)
// 	}

// 	const onBlur = (e) => {
// 		e.target.value && console.log(e.target.value)
// 		// value && console.log(value)
// 	}

// 	return params ? (
// 		<input
// 			type="text"
// 			ref={inputRef}
// 			placeholder="Текст..."
// 			autoFocus
// 			className="Text__input"
// 			style={{
// 				left: params.x - 20 + 'px',
// 				top: params.y - 20 + 'px'
// 			}}
// 			// value={value}
// 			// onChange={onChange}
// 			// onBlur={onBlur}
// 		/>
// 	) : null
// }

// export default observer(TextInput)

















import { useState } from 'react'
import { observer } from 'mobx-react-lite'

import canvasState from '../../../../store/canvasState'
import { runInAction, toJS } from 'mobx'

const TextInput = () => {
	const params = canvasState.editedTextTool

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
		<div className="Text__input-overlay" onClick={onBlur}></div>
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
			// onBlur={onBlur}
		/>
		</>
	) : null
}

export default observer(TextInput)
