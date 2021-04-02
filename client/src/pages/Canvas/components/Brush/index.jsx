import React from 'react'
import { observer } from 'mobx-react-lite'
import { toJS } from 'mobx'

const Brush = ({ tool, className }) => {
	const pathData = tool.params

   return toJS(pathData) && <path 
      className={className}
      d={pathData}
      {...toJS(tool.settings)}
      fill="none"
   />
}

export default observer(Brush)


// [{"id":"yRl-ThALCGbAx1SaqdXVa","type":"Rect","params":{"x":58,"y":88.5,"w":169,"h":130},"settings":{"stroke":"#ff1a29","strokeWidth":2,"fill":"transparent"}},{"id":"5uNCMyqGI9HJWgz_Xp6aZ","type":"Ellipse","params":{"rx":78.5,"ry":81,"cx":421.5,"cy":181.5},"settings":{"stroke":"#1a34ff","strokeWidth":2,"fill":"transparent"}},{"id":"qnnFpFlCxE5-RMJv4MgxS","type":"Brush","points":[{"x":367,"y":278.5},{"x":365.6666666666667,"y":277.5},{"x":364.2,"y":275.9},{"x":362.57142857142856,"y":274.2142857142857},{"x":361.75,"y":273.5},{"x":360.25,"y":271.875},{"x":358.5,"y":270.375},{"x":356.875,"y":268.75},{"x":355.125,"y":267.25},{"x":353.125,"y":265.625},{"x":351,"y":264.125},{"x":348.625,"y":262.5},{"x":346.125,"y":260.75},{"x":343.125,"y":259.125},{"x":340.125,"y":257.5},{"x":337,"y":256},{"x":333.875,"y":254.625},{"x":331,"y":253.625},{"x":328.125,"y":252.625},{"x":325.375,"y":251.875},{"x":322.75,"y":251.375},{"x":320.5,"y":251.125},{"x":318.375,"y":250.875},{"x":316.125,"y":250.75},{"x":313.875,"y":250.625},{"x":311.5,"y":250.625},{"x":309.25,"y":250.75},{"x":306.875,"y":251},{"x":304.375,"y":251.375},{"x":301.75,"y":252},{"x":299,"y":252.875},{"x":296.25,"y":254},{"x":293.375,"y":255.25},{"x":290.375,"y":256.75},{"x":287.375,"y":258.5},{"x":284.375,"y":260.375},{"x":281.375,"y":262.375},{"x":278.5,"y":264.375},{"x":275.75,"y":266.375},{"x":273.125,"y":268.5},{"x":270.625,"y":270.75},{"x":268.375,"y":273},{"x":266.125,"y":275.25},{"x":264.125,"y":277.5},{"x":262.125,"y":279.875},{"x":260.125,"y":282.25},{"x":258.125,"y":284.625},{"x":256,"y":286.875},{"x":254,"y":289},{"x":252,"y":291},{"x":250,"y":292.75},{"x":247.875,"y":294.5},{"x":245.875,"y":295.875},{"x":244,"y":297.25},{"x":242,"y":298.5},{"x":240.25,"y":299.5},{"x":238.5,"y":300.5},{"x":236.75,"y":301.25},{"x":235,"y":302},{"x":233.25,"y":302.625},{"x":231.375,"y":303.25},{"x":229.375,"y":303.625},{"x":227.25,"y":303.875},{"x":224.75,"y":304.125},{"x":222,"y":304.375},{"x":219,"y":304.625},{"x":215.875,"y":304.875},{"x":212.375,"y":305},{"x":208.875,"y":305},{"x":205.25,"y":304.875},{"x":201.875,"y":304.625},{"x":198.75,"y":304.25},{"x":195.75,"y":303.625},{"x":193.125,"y":302.875},{"x":190.625,"y":301.875},{"x":188.5,"y":300.75},{"x":186.625,"y":299.5},{"x":184.875,"y":298.125},{"x":183.25,"y":296.625},{"x":181.625,"y":295},{"x":180,"y":293.125},{"x":178.375,"y":291.125},{"x":176.875,"y":289.25},{"x":175.375,"y":287.25},{"x":173.875,"y":285.5},{"x":172.5,"y":283.75},{"x":171.125,"y":282.25},{"x":170,"y":280.875},{"x":169,"y":279.875}],"settings":{"stroke":"#ff5e1a","strokeWidth":2}}]