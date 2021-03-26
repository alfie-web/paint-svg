
import toolState from '../../../../store/toolState'
import canvasState from '../../../../store/canvasState'

import Brush from '../../../../tools/Brush'
import Rect from '../../../../tools/Rect'
import Ellipse from '../../../../tools/Ellipse'
import Line from '../../../../tools/Line'
import Move from '../../../../tools/Move'

import './ToolBar.sass'
import { observer } from 'mobx-react-lite'
import MenuVidget from '../../../../components/MenuVidget'
// import ColorPicker from '../../../../components/ColorPicker'
import IconButton from '../../../../components/IconButton'


const ToolBar = () => {
	const checkActive = (Class) => {
		return toolState.tool && toolState.tool instanceof Class
	}

	// const changeColor = val => {
	// 	toolState.setStrokeColor(val)
	// 	toolState.setFillColor(val)
	// }

	const download = () => {
		var serializer = new XMLSerializer()
		var source = serializer.serializeToString(canvasState.svg)

		source = '<?xml version="1.0" standalone="no"?>\r\n' + source
		var url = "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(source)

		const a = document.createElement('a')
		a.href = url
		// const name = canvasState.canvasDoc.title ?? 'Название холста'
		const name = 'Название холста'
		a.download = `${name}.svg`
		document.body.appendChild(a)
		a.click()
		document.body.removeChild(a)
	}

	// Сохранение в png
	// function triggerDownload (imgURI) {
	// 	var evt = new MouseEvent('click', {
	// 		view: window,
	// 		bubbles: false,
	// 		cancelable: true
	// 	});
	
	// 	var a = document.createElement('a');
	// 	a.setAttribute('download', 'MY_COOL_IMAGE.png');
	// 	a.setAttribute('href', imgURI);
	// 	a.setAttribute('target', '_blank');
	
	// 	a.dispatchEvent(evt);
	// }

	// const download = () => {
	// 	var canvas = downloadRef.current;
	// 	var ctx = canvas.getContext('2d');
	// 	var data = (new XMLSerializer()).serializeToString(canvasState.svg);
	// 	var DOMURL = window.URL || window.webkitURL || window;

	// 	var img = new Image();
	// 	var svgBlob = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
	// 	var url = DOMURL.createObjectURL(svgBlob);

	// 	img.onload = function () {
	// 		ctx.drawImage(img, 0, 0);
	// 		DOMURL.revokeObjectURL(url);

	// 		var imgURI = canvas
	// 			.toDataURL('image/png')
	// 			.replace('image/png', 'image/octet-stream');

	// 		triggerDownload(imgURI);
	// 	};

	// 	img.src = url;
	// }

	return (
		<div className="ToolBar">
			<div className="ToolBar__left">
				<MenuVidget />

				<div className="ToolBar__buttons">
				
			
				<IconButton 
					className="ToolBar__btn ToolBar__btn--brush"
					onClick={() => toolState.setTool(new Brush(canvasState.canvas))}
					title="Карандаш"
					isActive={checkActive(Brush)}
					icon={
						<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M21.5879 0C21.0095 0.00140064 20.4371 0.117318 19.9037 0.341065C19.3703 0.564812 18.8865 0.89196 18.4802 1.30364L1.56987 18.2135L1.50357 18.5482L0.333651 24.4301L0 26L1.57094 25.6663L7.45262 24.4964L7.78627 24.429L24.6966 7.51917C25.1094 7.11356 25.4372 6.6298 25.661 6.09613C25.8847 5.56246 26 4.98956 26 4.41087C26 3.83217 25.8847 3.25928 25.661 2.7256C25.4372 2.19193 25.1094 1.70818 24.6966 1.30257C24.2901 0.890956 23.8061 0.563932 23.2725 0.340366C22.739 0.1168 22.1664 0.00111966 21.5879 0V0ZM21.5879 2.03833C22.1269 2.03833 22.6701 2.2843 23.192 2.80726C24.2325 3.84674 24.2325 4.97499 23.192 6.01555L22.4242 6.75025L19.2481 3.57511L19.9838 2.80726C20.5067 2.2843 21.0489 2.03833 21.5879 2.03833V2.03833ZM17.7456 5.0798L20.9195 8.25494L7.98732 21.1865C7.28916 19.8205 6.17766 18.7097 4.81121 18.0124L17.7456 5.0798ZM3.44238 19.7513C4.07529 20.006 4.65021 20.3859 5.13261 20.8683C5.615 21.3507 5.99492 21.9256 6.24955 22.5586L2.73979 23.2601L3.44238 19.7513Z" />
						</svg>
					}
				/>

				<IconButton 
					className="ToolBar__btn ToolBar__btn--rect"
					onClick={() => toolState.setTool(new Rect(canvasState.canvas))}
					title="Прямоугольник"
					isActive={checkActive(Rect)}
					icon={
						<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fillRule="evenodd" clipRule="evenodd" d="M3 0H23.0028C23.797 0.00222832 24.5581 0.318717 25.1197 0.880319C25.6813 1.44192 25.9978 2.20298 26 2.9972L26 3L26 23L26 23.0028C25.9978 23.797 25.6813 24.5581 25.1197 25.1197C24.5581 25.6813 23.797 25.9978 23.0028 26L23 26H3L2.9972 26C2.20298 25.9978 1.44192 25.6813 0.880319 25.1197C0.318717 24.5581 0.00222832 23.797 3.93391e-06 23.0028L0 23V2.9972C0.00222439 2.20298 0.318718 1.44192 0.880319 0.880319C1.44192 0.318718 2.20298 0.00222832 2.9972 3.93391e-06L3 0ZM3.00164 2C2.73633 2.00105 2.48216 2.10691 2.29453 2.29453C2.10691 2.48216 2.00105 2.73633 2 3.00164V22.9984C2.00105 23.2637 2.10691 23.5178 2.29453 23.7055C2.48217 23.8931 2.73634 23.999 3.00167 24H22.9983C23.2637 23.999 23.5178 23.8931 23.7055 23.7055C23.8931 23.5178 23.999 23.2637 24 22.9983V3.00167C23.999 2.73634 23.8931 2.48217 23.7055 2.29453C23.5178 2.10691 23.2637 2.00105 22.9984 2H3.00164Z" />
						</svg>
					}
				/>

				<IconButton 
					className="ToolBar__btn ToolBar__btn--ellipse"
					onClick={() => toolState.setTool(new Ellipse(canvasState.canvas))}
					title="Эллипс"
					isActive={checkActive(Ellipse)}
					icon={
						<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fillRule="evenodd" clipRule="evenodd" d="M13 2C6.92487 2 2 6.92487 2 13C2 19.0751 6.92487 24 13 24C19.0751 24 24 19.0751 24 13C24 6.92487 19.0751 2 13 2ZM0 13C0 5.8203 5.8203 0 13 0C20.1797 0 26 5.8203 26 13C26 20.1797 20.1797 26 13 26C5.8203 26 0 20.1797 0 13Z"/>
						</svg>
					}
				/>

				<IconButton 
					className="ToolBar__btn ToolBar__btn--line"
					onClick={() => toolState.setTool(new Line(canvasState.canvas))}
					title="Линия"
					isActive={checkActive(Line)}
					icon={
						<svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fillRule="evenodd" clipRule="evenodd" d="M1.29289 26.2929C0.902367 25.9024 0.902367 25.2692 1.29289 24.8787L24.8787 1.29289C25.2692 0.902368 25.9024 0.902368 26.2929 1.29289C26.6834 1.68342 26.6834 2.31658 26.2929 2.70711L2.70711 26.2929C2.31658 26.6834 1.68342 26.6834 1.29289 26.2929Z"/>
						</svg>
					}
				/>

				<IconButton 
					className="ToolBar__btn ToolBar__btn--move"
					onClick={() => toolState.setTool(new Move(canvasState.canvas))}
					title="Рука"
					isActive={checkActive(Move)}
					icon={
						<svg width="21" height="27" viewBox="0 0 21 27" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fillRule="evenodd" clipRule="evenodd" d="M11.875 1.75C12.0982 1.75 12.318 1.84166 12.4843 2.01405C12.6515 2.18736 12.75 2.42795 12.75 2.68421V12.7895C12.75 13.2037 13.0858 13.5395 13.5 13.5395C13.9142 13.5395 14.25 13.2037 14.25 12.7895V4.36842C14.25 4.11216 14.3485 3.87157 14.5157 3.69826C14.682 3.52587 14.9018 3.43421 15.125 3.43421C15.3482 3.43421 15.568 3.52587 15.7343 3.69826C15.9015 3.87157 16 4.11216 16 4.36842V13.6316C16 14.0458 16.3358 14.3816 16.75 14.3816C17.1642 14.3816 17.5 14.0458 17.5 13.6316V7.73684C17.5 7.48059 17.5985 7.23999 17.7657 7.06668C17.932 6.89429 18.1518 6.80263 18.375 6.80263C18.5982 6.80263 18.818 6.89429 18.9843 7.06668C19.1515 7.23999 19.25 7.48059 19.25 7.73684V17C19.25 17.4142 19.5858 17.75 20 17.75C20.4142 17.75 20.75 17.4142 20.75 17V7.73684C20.75 7.09974 20.5061 6.48356 20.0638 6.02517C19.6206 5.56586 19.0137 5.30263 18.375 5.30263C18.0714 5.30263 17.775 5.36209 17.5 5.47381V4.36842C17.5 3.73132 17.2561 3.11514 16.8138 2.65675C16.3706 2.19744 15.7637 1.93421 15.125 1.93421C14.7985 1.93421 14.4803 2.003 14.188 2.13162C14.0896 1.6987 13.8761 1.29627 13.5638 0.972536C13.1206 0.513229 12.5137 0.25 11.875 0.25C11.2363 0.25 10.6294 0.513229 10.1862 0.972536C9.74394 1.43093 9.5 2.04711 9.5 2.68421V2.94749C9.22497 2.83578 8.92858 2.77632 8.625 2.77632C7.98628 2.77632 7.37938 3.03954 6.93622 3.49885C6.49394 3.95725 6.25 4.57342 6.25 5.21053V17C6.25 17.4142 6.58579 17.75 7 17.75C7.41422 17.75 7.75 17.4142 7.75 17V5.21053C7.75 4.95427 7.84847 4.71367 8.01569 4.54037C8.18202 4.36797 8.40178 4.27632 8.625 4.27632C8.84823 4.27632 9.06799 4.36797 9.23432 4.54037C9.40153 4.71367 9.5 4.95427 9.5 5.21053V12.8421C9.5 13.2563 9.83579 13.5921 10.25 13.5921C10.6642 13.5921 11 13.2563 11 12.8421V2.68421C11 2.42795 11.0985 2.18736 11.2657 2.01405C11.432 1.84166 11.6518 1.75 11.875 1.75Z"/>
							<path fillRule="evenodd" clipRule="evenodd" d="M4.87442 11.512C4.19651 10.2337 2.60495 9.93431 1.45206 10.5845C0.858864 10.9189 0.475124 11.4291 0.323507 12.0389C0.176994 12.6282 0.260286 13.2519 0.476368 13.8335C0.476492 13.8339 0.476618 13.8342 0.476742 13.8345L3.32088 21.5459C3.32489 21.5568 3.32915 21.5675 3.33366 21.5782C3.91351 22.951 4.74189 24.2657 6.10806 25.2285C7.47689 26.193 9.30825 26.75 11.7964 26.75C14.3406 26.75 16.6053 25.9049 18.2291 24.1546C19.848 22.4095 20.75 19.8511 20.75 16.5728C20.75 16.1585 20.4142 15.8228 20 15.8228C19.5858 15.8228 19.25 16.1585 19.25 16.5728C19.25 19.5828 18.4249 21.738 17.1294 23.1344C15.8387 24.5257 14.0016 25.25 11.7964 25.25C9.53508 25.25 8.02805 24.7464 6.97209 24.0023C5.91803 23.2595 5.23655 22.2233 4.72211 21.0103L1.88339 13.3137L1.88272 13.3118C1.73963 12.927 1.72487 12.6193 1.77918 12.4009C1.82848 12.2026 1.94478 12.0286 2.18868 11.8911C2.70788 11.5983 3.31309 11.7812 3.54504 12.207L6.32775 17.8325C6.51141 18.2038 6.96126 18.3559 7.33254 18.1723C7.70381 17.9886 7.85591 17.5387 7.67225 17.1675L4.88408 11.5309L4.87442 11.512Z"/>
						</svg>
					}
				/>

				{/* TODO: Синхронизовать его со стейтом */}

					{/* <ColorPicker 
						title="Цвет заливки и обводки"
						className="ToolBar__btn color"
						onChange={changeColor}
						value={toolState.fillColor}
					/> */}
				</div>	
			</div>

			{canvasState.canvasMeta.title && <div className="ToolBar__middle">
				<p className="CanvasPage__title">{canvasState.canvasMeta.title}</p>
			</div> }

			<div className="ToolBar__right">
				{/* <IconButton 
					className="ToolBar__btn undo"
					onClick={() => canvasState.undo()}
					title="Отменить действие"
					icon={
						<svg width="17" height="23" viewBox="0 0 17 23" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fillRule="evenodd" clipRule="evenodd" d="M4.58327 0.14586C4.99687 0.41452 5.11141 0.963103 4.83909 1.37116L2.79398 4.43569C7.50724 2.6046 12.9952 4.40132 15.6044 8.86004C18.4774 13.7694 16.7724 20.0469 11.7963 22.8813C11.3675 23.1256 10.8191 22.9807 10.5715 22.5576C10.3239 22.1345 10.4708 21.5934 10.8997 21.3492C15.0181 19.0033 16.4291 13.8078 14.0514 9.74464C11.8592 5.99853 7.21168 4.52287 3.27215 6.15386L6.24018 8.08178C6.65378 8.35044 6.76832 8.89903 6.496 9.30708C6.22369 9.71513 5.66765 9.82813 5.25404 9.55947L0.403668 6.40885C-0.00993356 6.14019 -0.12447 5.59161 0.147843 5.18356L3.34131 0.398252C3.61362 -0.00980029 4.16967 -0.1228 4.58327 0.14586Z"/>
						</svg>
					}
				/>

				<IconButton 
					className="ToolBar__btn redo"
					onClick={() => canvasState.redo()}
					title="Возобновить действие"
					icon={
						<svg width="17" height="23" viewBox="0 0 17 23" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fillRule="evenodd" clipRule="evenodd" d="M12.4167 0.14586C12.0031 0.41452 11.8886 0.963103 12.1609 1.37116L14.206 4.43569C9.49276 2.6046 4.00484 4.40132 1.3956 8.86004C-1.47736 13.7694 0.227568 20.0469 5.20367 22.8813C5.63253 23.1256 6.1809 22.9807 6.4285 22.5576C6.6761 22.1345 6.52916 21.5934 6.10031 21.3492C1.98191 19.0033 0.570856 13.8078 2.94861 9.74464C5.14085 5.99853 9.78832 4.52287 13.7279 6.15386L10.7598 8.08178C10.3462 8.35044 10.2317 8.89903 10.504 9.30708C10.7763 9.71513 11.3324 9.82813 11.746 9.55947L16.5963 6.40885C17.0099 6.14019 17.1245 5.59161 16.8522 5.18356L13.6587 0.398252C13.3864 -0.00980029 12.8303 -0.1228 12.4167 0.14586Z"/>
						</svg>
					}
				/> */}

				<IconButton 
					className="ToolBar__btn download"
					onClick={download}
					title="Скачать холст"
					icon={
						<svg width="24" height="20" viewBox="0 0 26 22" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fillRule="evenodd" clipRule="evenodd" d="M3.76923 2C2.77767 2 2 2.78767 2 3.72727V13.7859L7.32174 8.76645C7.86123 8.25834 8.57566 7.97797 9.31967 8.00135C10.0634 8.02473 10.7583 8.34861 11.2664 8.8874C11.2664 8.88742 11.2664 8.88738 11.2664 8.8874L16.2366 14.1501L17.5413 12.7661C17.5413 12.766 17.5412 12.7661 17.5413 12.7661C18.0379 12.2382 18.7143 11.9154 19.4416 11.8796C20.1693 11.8438 20.8741 12.0989 21.4183 12.5789L21.4194 12.5799L24 14.8631V3.72727C24 2.78766 23.2223 2 22.2308 2H3.76923ZM26 17.0784V3.72727C26 1.65442 24.298 0 22.2308 0H3.76923C1.70199 0 2.68221e-06 1.65442 2.68221e-06 3.72727V16.1016C-8.9407e-07 16.1032 -8.9407e-07 16.1047 2.68221e-06 16.1063V18.2727C2.68221e-06 20.3456 1.70199 22 3.76923 22H11.1514C11.1529 22 11.1544 22 11.1559 22H22.2308C24.298 22 26 20.3456 26 18.2727V17.0884C26 17.0851 26 17.0818 26 17.0784ZM24 17.5335L20.0952 14.0788C20.095 14.0786 20.0954 14.0789 20.0952 14.0788C19.931 13.9342 19.7324 13.8677 19.54 13.8771C19.3469 13.8866 19.1522 13.9726 18.998 14.1365L13.4707 20H22.2308C23.2223 20 24 19.2123 24 18.2727V17.5335ZM10.7222 20L14.8624 15.6079L9.81182 10.2601C9.65421 10.0929 9.45391 10.0066 9.25683 10.0004C9.06014 9.99418 8.85822 10.0669 8.69389 10.2215C8.69376 10.2216 8.69401 10.2214 8.69389 10.2215L2 16.5352V18.2727C2 19.2123 2.77767 20 3.76923 20H10.7222ZM17.5 6C17.2239 6 17 6.22386 17 6.5C17 6.77614 17.2239 7 17.5 7C17.7761 7 18 6.77614 18 6.5C18 6.22386 17.7761 6 17.5 6ZM15 6.5C15 5.11929 16.1193 4 17.5 4C18.8807 4 20 5.11929 20 6.5C20 7.88071 18.8807 9 17.5 9C16.1193 9 15 7.88071 15 6.5Z"/>
						</svg>
					}
				/>
			</div>
		</div>
	)
}

export default observer(ToolBar)