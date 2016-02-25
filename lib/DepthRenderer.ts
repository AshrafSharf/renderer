import Stage						= require("awayjs-stagegl/lib/base/Stage");

import RendererBase					= require("awayjs-renderergl/lib/RendererBase");
import GL_DepthSurface				= require("awayjs-renderergl/lib/surfaces/GL_DepthSurface");

/**
 * The DepthRenderer class renders 32-bit depth information encoded as RGBA
 *
 * @class away.render.DepthRenderer
 */
class DepthRenderer extends RendererBase
{
	/**
	 * Creates a new DepthRenderer object.
	 * @param renderBlended Indicates whether semi-transparent objects should be rendered.
	 * @param distanceBased Indicates whether the written depth value is distance-based or projected depth-based
	 */
	constructor(stage:Stage = null)
	{
		super(stage, GL_DepthSurface);

		this._iBackgroundR = 1;
		this._iBackgroundG = 1;
		this._iBackgroundB = 1;

	}
}

export = DepthRenderer;