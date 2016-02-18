import Matrix3D						= require("awayjs-core/lib/geom/Matrix3D");
import Matrix3DUtils				= require("awayjs-core/lib/geom/Matrix3DUtils");
import AssetEvent					= require("awayjs-core/lib/events/AssetEvent");

import IRenderOwner					= require("awayjs-display/lib/base/IRenderOwner");
import IRenderableOwner				= require("awayjs-display/lib/base/IRenderableOwner");
import Graphic						= require("awayjs-display/lib/graphics/Graphic");
import TriangleElements				= require("awayjs-display/lib/graphics/TriangleElements");
import ElementsBase					= require("awayjs-display/lib/graphics/ElementsBase");
import Camera						= require("awayjs-display/lib/entities/Camera");

import IContextGL					= require("awayjs-stagegl/lib/base/IContextGL");
import Stage						= require("awayjs-stagegl/lib/base/Stage");
import ContextGLProgramType			= require("awayjs-stagegl/lib/base/ContextGLProgramType");

import RendererBase					= require("awayjs-renderergl/lib/RendererBase");
import AnimatorBase					= require("awayjs-renderergl/lib/animators/AnimatorBase");
import ShaderBase					= require("awayjs-renderergl/lib/shaders/ShaderBase");
import ShaderRegisterCache			= require("awayjs-renderergl/lib/shaders/ShaderRegisterCache");
import ShaderRegisterData			= require("awayjs-renderergl/lib/shaders/ShaderRegisterData");
import ShaderRegisterElement		= require("awayjs-renderergl/lib/shaders/ShaderRegisterElement");
import RenderableBase				= require("awayjs-renderergl/lib/renderables/RenderableBase");
import PassBase						= require("awayjs-renderergl/lib/render/passes/PassBase");

/**
 * @class away.pool.GraphicRenderable
 */
class GraphicRenderable extends RenderableBase
{
	/**
	 *
	 */
	public graphic:Graphic;


	/**
	 * //TODO
	 *
	 * @param pool
	 * @param graphic
	 * @param level
	 * @param indexOffset
	 */
	constructor(graphic:Graphic, renderer:RendererBase)
	{
		super(graphic, graphic.parent.sourceEntity, renderer);

		this.graphic = graphic;
	}

	public onClear(event:AssetEvent)
	{
		super.onClear(event);

		this.graphic = null;
	}

	/**
	 *
	 * @returns {ElementsBase}
	 * @protected
	 */
	public _pGetElements():ElementsBase
	{
		return this.graphic.elements;
	}


	public _pGetRenderOwner():IRenderOwner
	{
		return this.graphic.material;
	}
}

export = GraphicRenderable;