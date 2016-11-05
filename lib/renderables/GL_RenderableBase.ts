import {AbstractMethodError}			from "@awayjs/core/lib/errors/AbstractMethodError";
import {AssetEvent}					from "@awayjs/core/lib/events/AssetEvent";
import {Matrix}						from "@awayjs/core/lib/geom/Matrix";
import {Matrix3D}						from "@awayjs/core/lib/geom/Matrix3D";
import {AbstractionBase}				from "@awayjs/core/lib/library/AbstractionBase";

import {ImageBase}					from "@awayjs/graphics/lib/image/ImageBase";
import {SamplerBase}					from "@awayjs/graphics/lib/image/SamplerBase";

import {IRenderable}					from "@awayjs/graphics/lib/base/IRenderable";
import {IEntity}						from "@awayjs/graphics/lib/base/IEntity";
import {IMaterial}						from "@awayjs/graphics/lib/base/IMaterial";
import {ElementsBase}					from "@awayjs/graphics/lib/elements/ElementsBase";
import {RenderableEvent}				from "@awayjs/graphics/lib/events/RenderableEvent";
import {DefaultMaterialManager}		from "@awayjs/graphics/lib/managers/DefaultMaterialManager";
import {TextureBase}					from "@awayjs/graphics/lib/textures/TextureBase";

import {Camera}						from "@awayjs/scene/lib/display/Camera";

import {Stage}						from "@awayjs/stage/lib/base/Stage";
import {GL_ImageBase}					from "@awayjs/stage/lib/image/GL_ImageBase";
import {GL_SamplerBase}				from "@awayjs/stage/lib/image/GL_SamplerBase";

import {RendererBase}					from "../RendererBase";
import {GL_MaterialBase}				from "../materials/GL_MaterialBase";
import {IPass}						from "../materials/passes/IPass";
import {GL_ElementsBase}				from "../elements/GL_ElementsBase";

/**
 * @class RenderableListItem
 */
export class GL_RenderableBase extends AbstractionBase
{
	private _onInvalidateMaterialDelegate:(event:RenderableEvent) => void;
	private _onInvalidateElementsDelegate:(event:RenderableEvent) => void;

	public _count:number = 0;
	public _offset:number = 0;
	public _idx_count:number = 0;
	public _idx_offset:number = 0;
	
	private _elementsGL:GL_ElementsBase;
	private _materialGL:GL_MaterialBase;
	private _elementsDirty:boolean = true;
	private _materialDirty:boolean = true;

	public JOINT_INDEX_FORMAT:string;
	public JOINT_WEIGHT_FORMAT:string;

	/**
	 *
	 */
	public _renderer:RendererBase;

	public _stage:Stage;

	/**
	 *
	 */
	public next:GL_RenderableBase;

	public id:number;

	/**
	 *
	 */
	public materialID:number;

	/**
	 *
	 */
	public renderOrderId:number;

	/**
	 *
	 */
	public zIndex:number;

	/**
	 *
	 */
	public maskId:number;

	/**
	 *
	 */
	public masksConfig:Array<Array<number>>;

	/**
	 *
	 */
	public cascaded:boolean;

	/**
	 *
	 */
	public renderSceneTransform:Matrix3D;

	/**
	 *
	 */
	public sourceEntity:IEntity;

	/**
	 *
	 */
	public renderable:IRenderable;

	public uvMatrix:Matrix;
	
	public images:Array<GL_ImageBase> = new Array<GL_ImageBase>();

	public samplers:Array<GL_SamplerBase> = new Array<GL_SamplerBase>();

	public get elementsGL():GL_ElementsBase
	{
		if (this._elementsDirty)
			this._updateElements();

		return this._elementsGL;
	}

	public get materialGL():GL_MaterialBase
	{
		if (this._materialDirty)
			this._updateMaterial();

		return this._materialGL;
	}


	/**
	 *
	 * @param renderable
	 * @param sourceEntity
	 * @param surface
	 * @param renderer
	 */
	constructor(renderable:IRenderable, renderer:RendererBase)
	{
		super(renderable, renderer);

		this._onInvalidateMaterialDelegate = (event:RenderableEvent) => this._onInvalidateMaterial(event);
		this._onInvalidateElementsDelegate = (event:RenderableEvent) => this.onInvalidateElements(event);

		//store a reference to the pool for later disposal
		this._renderer = renderer;
		this._stage = renderer.stage;

		this.renderable = renderable;

		this.renderable.addEventListener(RenderableEvent.INVALIDATE_SURFACE, this._onInvalidateMaterialDelegate);
		this.renderable.addEventListener(RenderableEvent.INVALIDATE_ELEMENTS, this._onInvalidateElementsDelegate);
	}

	public onClear(event:AssetEvent):void
	{
		super.onClear(event);

		this.next = null;
		this.masksConfig = null;
		this.renderSceneTransform = null;

		this._renderer = null;
		this._stage = null;
		this.sourceEntity = null;

		this.renderable.removeEventListener(RenderableEvent.INVALIDATE_SURFACE, this._onInvalidateMaterialDelegate);
		this.renderable.removeEventListener(RenderableEvent.INVALIDATE_ELEMENTS, this._onInvalidateElementsDelegate);
		this.renderable = null;

		this._materialGL.usages--;

		if (!this._materialGL.usages)
			this._materialGL.onClear(new AssetEvent(AssetEvent.CLEAR, this._materialGL.material));

		this._materialGL = null;
		this._elementsGL = null;
	}

	public onInvalidateElements(event:RenderableEvent):void
	{
		this._elementsDirty = true;
	}

	private _onInvalidateMaterial(event:RenderableEvent):void
	{
		this._materialDirty = true;
	}

	public _pGetElements():GL_ElementsBase
	{
		throw new AbstractMethodError();
	}

	public _pGetMaterial():GL_MaterialBase
	{
		throw new AbstractMethodError();
	}

	/**
	 * Renders an object to the current render target.
	 *
	 * @private
	 */
	public _iRender(pass:IPass, camera:Camera, viewProjection:Matrix3D):void
	{
		this._setRenderState(pass, camera, viewProjection);

		this._elementsGL.draw(this, pass.shader, camera, viewProjection, this._count, this._offset, this._idx_count, this._idx_offset)
	}

	public _setRenderState(pass:IPass, camera:Camera, viewProjection:Matrix3D):void
	{
		if (this._elementsDirty)
			this._updateElements();

		pass._setRenderState(this, camera, viewProjection);
		
		if (pass.shader.activeElements != this._elementsGL) {
			pass.shader.activeElements = this._elementsGL;
			this._elementsGL._setRenderState(this, pass.shader, camera, viewProjection);
		}
	}

	/**
	 * //TODO
	 *
	 * @private
	 */
	private _updateElements():void
	{
		this._elementsGL = this._pGetElements();

		this._elementsDirty = false;
	}

	private _updateMaterial():void
	{
		var materialGL:GL_MaterialBase = this._pGetMaterial();

		if (this._materialGL != materialGL) {

			if (this._materialGL) {
				this._materialGL.usages--;

				//dispose current materialGL object
				if (!this._materialGL.usages)
					this._materialGL.onClear(new AssetEvent(AssetEvent.CLEAR, this._materialGL.material));
			}

			this._materialGL = materialGL;

			this._materialGL.usages++;
		}

		//create a cache of image & sampler objects for the renderable
		var numImages:number = materialGL.numImages;

		this.images.length = numImages;
		this.samplers.length = numImages;
		this.uvMatrix = this.renderable.style? this.renderable.style.uvMatrix : this._materialGL.material.style? this._materialGL.material.style.uvMatrix : null;

		var numTextures:number = this._materialGL.material.getNumTextures();
		var texture:TextureBase;
		var numImages:number;
		var image:ImageBase;
		var sampler:SamplerBase;
		var index:number;

		for (var i:number = 0; i < numTextures; i++) {
			texture = this._materialGL.material.getTextureAt(i);
			numImages = texture.getNumImages();
			for (var j:number = 0; j < numImages; j++) {
				index = materialGL.getImageIndex(texture, j);
				image =  this.renderable.style? this.renderable.style.getImageAt(texture, j) : null;
				this.images[index] = image? <GL_ImageBase> this._stage.getAbstraction(image) : null;
				sampler = this.renderable.style? this.renderable.style.getSamplerAt(texture, j) : null;
				this.samplers[index] = sampler? <GL_SamplerBase> this._stage.getAbstraction(sampler) : null;
			}
		}

		this._materialDirty = false;
	}
}