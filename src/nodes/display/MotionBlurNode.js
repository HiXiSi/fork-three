import { float, int, Fn } from '../shadernode/ShaderNode.js';
import { Loop } from '../utils/LoopNode.js';
import { uv } from '../accessors/UVNode.js';

export const motionBlur = /*#__PURE__*/ Fn( ( [ inputNode, velocity, numSamples = int( 16 ) ] ) => {

	const sampleColor = ( uv ) => inputNode.uv( uv );

	const uvs = uv();

	const colorResult = sampleColor( uvs ).toVar();
	const fSamples = float( numSamples );

	Loop( { start: int( 1 ), end: numSamples, type: 'int', condition: '<=' }, ( { i } ) => {

		const offset = velocity.mul( float( i ).div( fSamples.sub( 1 ) ).sub( 0.5 ) );
		colorResult.addAssign( sampleColor( uvs.add( offset ) ) );

	} );

	colorResult.divAssign( fSamples );

	return colorResult;

} );
