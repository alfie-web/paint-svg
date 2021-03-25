import { useState, memo } from 'react'
import classNames from 'classnames'

const ColorPicker = ({ className, idAttr, onChange, label, title = '', value = '#000000' }) => {
	const [color, setColor] = useState(value)

	const handleChange = (e) => {
		const val = e.target.value
		setColor(val)
		onChange(val)
	}

	// useEffect(() => {
	// 	setColor(value)
	// }, [value])

	return (
		<>
		{label && <label htmlFor={idAttr}>{label}</label> }
		<span className={classNames('ColorPicker', className)} title={title}>
			<input 
				id={idAttr}
				type="color" 
				value={color}
				onChange={handleChange}
			/>
		</span>
		</>
	)
}

export default memo(ColorPicker)
