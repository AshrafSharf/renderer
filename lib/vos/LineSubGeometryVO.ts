import IAssetClass					= require("awayjs-core/lib/library/IAssetClass");

import Stage						= require("awayjs-stagegl/lib/base/Stage");

import LineSubGeometry				= require("awayjs-display/lib/base/LineSubGeometry");

import ShaderBase					= require("awayjs-renderergl/lib/shaders/ShaderBase");
import ShaderRegisterCache			= require("awayjs-renderergl/lib/shaders/ShaderRegisterCache");
import ShaderRegisterElement		= require("awayjs-renderergl/lib/shaders/ShaderRegisterElement");
import SubGeometryVOPool			= require("awayjs-renderergl/lib/vos/SubGeometryVOPool");
import SubGeometryVOBase			= require("awayjs-renderergl/lib/vos/SubGeometryVOBase");

/**
 *
 * @class away.pool.LineSubGeometryVO
 */
class LineSubGeometryVO extends SubGeometryVOBase
{
	/**
	 *
	 */
	public static assetClass:IAssetClass = LineSubGeometry;

	private _lineSubGeometry:LineSubGeometry;

	constructor(pool:SubGeometryVOPool, lineSubGeometry:LineSubGeometry)
	{
		super(pool, lineSubGeometry);

		this._lineSubGeometry = lineSubGeometry;

		this.invalidateVertices(this._lineSubGeometry.positions);
		this.invalidateVertices(this._lineSubGeometry.thickness);
		this.invalidateVertices(this._lineSubGeometry.colors);
	}

	public _render(shader:ShaderBase, stage:Stage)
	{
		if (shader.colorBufferIndex >= 0)
			this.activateVertexBufferVO(shader.colorBufferIndex, this._lineSubGeometry.colors, stage);

		this.activateVertexBufferVO(0, this._lineSubGeometry.positions, stage, 3);
		this.activateVertexBufferVO(1, this._lineSubGeometry.positions, stage, 3, 12);
		this.activateVertexBufferVO(2, this._lineSubGeometry.thickness, stage);

		super._render(shader, stage);
	}


	/**
	 * //TODO
	 *
	 * @param pool
	 * @param renderableOwner
	 * @param level
	 * @param indexOffset
	 * @returns {away.pool.LineSubMeshRenderable}
	 * @protected
	 */
	public _pGetOverflowSubGeometry():SubGeometryVOBase
	{
		return new LineSubGeometryVO(this._pool, this._lineSubGeometry);
	}
}

export = LineSubGeometryVO;