import {AssetEvent, Vector3D} from "@awayjs/core";

import {IEntity, LineElements, DefaultMaterialManager} from "@awayjs/graphics";

import {GL_ElementsBase, GL_MaterialBase, GL_RenderableBase, RenderablePool} from "@awayjs/stage";

import {LineSegment} from "@awayjs/scene";

import {RendererBase} from "../RendererBase";

/**
 * @class away.pool.GL_LineSegmentRenderable
 */
export class GL_LineSegmentRenderable extends GL_RenderableBase
{
	private static _lineGraphics:Object = new Object();

	/**
	 *
	 */
	private _lineSegment:LineSegment;

	/**
	 * //TODO
	 *
	 * @param pool
	 * @param graphic
	 * @param level
	 * @param dataOffset
	 */
	constructor(lineSegment:LineSegment, renderablePool:RenderablePool)
	{
		super(lineSegment, renderablePool);

		this._lineSegment = lineSegment;
	}

	public onClear(event:AssetEvent):void
	{
		super.onClear(event);

		this._lineSegment = null;
	}

	/**
	 * //TODO
	 *
	 * @returns {base.LineElements}
	 * @protected
	 */
	public _pGetElements():GL_ElementsBase
	{
		var elements:LineElements = GL_LineSegmentRenderable._lineGraphics[this._lineSegment.id] || (GL_LineSegmentRenderable._lineGraphics[this._lineSegment.id] = new LineElements());

		var start:Vector3D = this._lineSegment.startPostion;
		var end:Vector3D = this._lineSegment.endPosition;

		var positions:Float32Array = new Float32Array(6);
		var thickness:Float32Array = new Float32Array(1);

		positions[0] = start.x;
		positions[1] = start.y;
		positions[2] = start.z;
		positions[3] = end.x;
		positions[4] = end.y;
		positions[5] = end.z;
		thickness[0] = this._lineSegment.thickness;

		elements.setPositions(positions);
		elements.setThickness(thickness);

		return <GL_ElementsBase> this._stage.getAbstraction(elements);
	}

	public _pGetMaterial():GL_MaterialBase
	{
		return this._materialGroup.getMaterialPool(this.elementsGL).getAbstraction(this._lineSegment.material || DefaultMaterialManager.getDefaultMaterial(this.renderable));
	}
}