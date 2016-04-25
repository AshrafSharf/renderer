import BlendMode					from "awayjs-core/lib/image/BlendMode";
import Matrix						from "awayjs-core/lib/geom/Matrix";
import Matrix3D						from "awayjs-core/lib/geom/Matrix3D";
import Vector3D						from "awayjs-core/lib/geom/Vector3D";
import ColorTransform				from "awayjs-core/lib/geom/ColorTransform";
import ArgumentError				from "awayjs-core/lib/errors/ArgumentError";
import IAssetClass					from "awayjs-core/lib/library/IAssetClass";
import IAbstractionPool				from "awayjs-core/lib/library/IAbstractionPool";

import Camera						from "awayjs-display/lib/display/Camera";
import TextureBase					from "awayjs-display/lib/textures/TextureBase";

import ContextGLBlendFactor			from "awayjs-stagegl/lib/base/ContextGLBlendFactor";
import ContextGLCompareMode			from "awayjs-stagegl/lib/base/ContextGLCompareMode";
import ContextGLTriangleFace		from "awayjs-stagegl/lib/base/ContextGLTriangleFace";
import Stage						from "awayjs-stagegl/lib/base/Stage";
import ProgramData					from "awayjs-stagegl/lib/image/ProgramData";
import GL_IAssetClass				from "awayjs-stagegl/lib/library/GL_IAssetClass";

import AnimationSetBase				from "../animators/AnimationSetBase";
import AnimatorBase					from "../animators/AnimatorBase";
import AnimationRegisterCache		from "../animators/data/AnimationRegisterCache";
import IPass						from "../surfaces/passes/IPass";
import ElementsPool					from "../elements/ElementsPool";
import IElementsClassGL				from "../elements/IElementsClassGL";
import GL_ElementsBase				from "../elements/GL_ElementsBase";
import GL_RenderableBase			from "../renderables/GL_RenderableBase";
import CompilerBase					from "../shaders/compilers/CompilerBase";
import ShaderRegisterCache			from "../shaders/ShaderRegisterCache";
import GL_TextureBase				from "../textures/GL_TextureBase";

/**
 * ShaderBase keeps track of the number of dependencies for "named registers" used across a pass.
 * Named registers are that are not necessarily limited to a single method. They are created by the compiler and
 * passed on to methods. The compiler uses the results to reserve usages through RegisterPool, which can be removed
 * each time a method has been compiled into the shader.
 *
 * @see RegisterPool.addUsage
 */
class ShaderBase implements IAbstractionPool
{
	public static _abstractionClassPool:Object = new Object();

	private _abstractionPool:Object = new Object();

	public _elementsPool:ElementsPool;

	private _elementsClass:IElementsClassGL;
	private _pass:IPass;
	public _stage:Stage;
	private _programData:ProgramData;

	private _blendFactorSource:string = ContextGLBlendFactor.ONE;
	private _blendFactorDest:string = ContextGLBlendFactor.ZERO;

	private _invalidShader:boolean = true;
	private _invalidProgram:boolean = true;
	private _animationVertexCode:string = "";
	private _animationFragmentCode:string = "";

	public get programData():ProgramData
	{
		if (this._invalidProgram)
			this._updateProgram();

		return this._programData;
	}

	public usesBlending:boolean = false;

	public useImageRect:boolean = false;

	public usesCurves:boolean = false;

	/**
	 * The depth compare mode used to render the renderables using this material.
	 *
	 * @see away.stagegl.ContextGLCompareMode
	 */
	public depthCompareMode:string = ContextGLCompareMode.LESS_EQUAL;


	/**
	 * Indicate whether the shader should write to the depth buffer or not. Ignored when blending is enabled.
	 */
	public writeDepth:boolean = true;

	public profile:string;

	public usesAnimation:boolean;

	private _defaultCulling:string = ContextGLTriangleFace.BACK;

	public _pInverseSceneMatrix:Float32Array = new Float32Array(16);

	public animationRegisterCache:AnimationRegisterCache;

	/**
	 * The amount of used vertex constants in the vertex code. Used by the animation code generation to know from which index on registers are available.
	 */
	public numUsedVertexConstants:number;

	/**
	 * The amount of used fragment constants in the fragment code. Used by the animation code generation to know from which index on registers are available.
	 */
	public numUsedFragmentConstants:number;

	/**
	 * The amount of used vertex streams in the vertex code. Used by the animation code generation to know from which index on streams are available.
	 */
	public numUsedStreams:number;

	/**
	 *
	 */
	public numUsedTextures:number;

	/**
	 *
	 */
	public numUsedVaryings:number;

	public numLights:number;

	public animatableAttributes:Array<string>;
	public animationTargetRegisters:Array<string>;
	public uvSource:string;
	public uvTarget:string;

	public useAlphaPremultiplied:boolean;
	public useBothSides:boolean;
	public usesUVTransform:boolean;
	public usesColorTransform:boolean;
	public alphaThreshold:number;


	//set ambient values to default
	public ambientR:number = 0xFF;
	public ambientG:number = 0xFF;
	public ambientB:number = 0xFF;

	/**
	 *
	 */
	public usesCommonData:boolean;

	/**
	 * Indicates whether the pass requires any fragment animation code.
	 */
	public usesFragmentAnimation:boolean;

	/**
	 * The amount of dependencies on the projected position.
	 */
	public projectionDependencies:number;

	/**
	 * The amount of dependencies on the normal vector.
	 */
	public normalDependencies:number;

	/**
	 * The amount of dependencies on the vertex color.
	 */
	public colorDependencies:number;

	/**
	 * The amount of dependencies on the view direction.
	 */
	public viewDirDependencies:number;

	/**
	 * The amount of dependencies on the primary UV coordinates.
	 */
	public uvDependencies:number;

	/**
	 * The amount of dependencies on the secondary UV coordinates.
	 */
	public secondaryUVDependencies:number;

	/**
	 * The amount of dependencies on the global position. This can be 0 while hasGlobalPosDependencies is true when
	 * the global position is used as a temporary value (fe to calculate the view direction)
	 */
	public globalPosDependencies:number;

	/**
	 * The amount of tangent vector dependencies (fragment shader).
	 */
	public tangentDependencies:number;

	/**
	 *
	 */
	public outputsColors:boolean;

	/**
	 * Indicates whether or not normals are output.
	 */
	public outputsNormals:boolean;

	/**
	 * Indicates whether or not normal calculations are output in tangent space.
	 */
	public outputsTangentNormals:boolean;

	/**
	 * Indicates whether or not normal calculations are expected in tangent space. This is only the case if no world-space
	 * dependencies exist and normals are being output.
	 */
	public usesTangentSpace:boolean;

	/**
	 * Indicates whether there are any dependencies on the world-space position vector.
	 */
	public usesGlobalPosFragment:boolean = false;

	/**
	 * Indicates whether there are any dependencies on the local position vector.
	 */
	public usesPositionFragment:boolean = false;

	public vertexConstantData:Float32Array;
	public fragmentConstantData:Float32Array;

	/**
	 * The index for the common data register.
	 */
	public commonsDataIndex:number;

	/**
	 * The index for the curve vertex attribute stream.
	 */
	public curvesIndex:number;

	/**
	 * The index for the UV vertex attribute stream.
	 */
	public uvIndex:number;

	/**
	 * The index for the secondary UV vertex attribute stream.
	 */
	public secondaryUVIndex:number;

	/**
	 * The index for the vertex normal attribute stream.
	 */
	public normalIndex:number;

	/**
	 * The index for the color attribute stream.
	 */
	public colorBufferIndex:number;

	/**
	 * The index for the vertex tangent attribute stream.
	 */
	public tangentIndex:number;

	/**
	 * The index of the vertex constant containing the view matrix.
	 */
	public viewMatrixIndex:number;

	/**
	 * The index of the vertex constant containing the scene matrix.
	 */
	public sceneMatrixIndex:number;

	/**
	 * The index of the vertex constant containing the uniform scene matrix (the inverse transpose).
	 */
	public sceneNormalMatrixIndex:number;

	/**
	 * The index of the vertex constant containing the camera position.
	 */
	public cameraPositionIndex:number;

	/**
	 * The index for the UV transformation matrix vertex constant.
	 */
	public uvMatrixIndex:number;

	/**
	 * The index for the color transform fragment constant.
	 */
	public colorTransformIndex:number;

	/**
	 *
	 */
	public jointIndexIndex:number;

	/**
	 *
	 */
	public jointWeightIndex:number;

	/**
	 *
	 */
	public imageIndices:Array<number> = new Array<number>();

	/**
	 * 
	 */
	public activeElements:GL_ElementsBase;

	/**
	 * Creates a new MethodCompilerVO object.
	 */
	constructor(elementsClass:IElementsClassGL, pass:IPass, stage:Stage)
	{
		this._elementsClass = elementsClass;
		this._pass = pass;
		this._stage = stage;

		this.profile = this._stage.profile;

		this._elementsPool = new ElementsPool(this, elementsClass);
	}

	public getAbstraction(texture:TextureBase):GL_TextureBase
	{
		return (this._abstractionPool[texture.id] || (this._abstractionPool[texture.id] = new (<GL_IAssetClass> ShaderBase._abstractionClassPool[texture.assetType])(texture, this)));
	}

	/**
	 *
	 * @param image
	 */
	public clearAbstraction(texture:TextureBase)
	{
		this._abstractionPool[texture.id] = null;
	}

	/**
	 *
	 * @param imageObjectClass
	 */
	public static registerAbstraction(gl_assetClass:GL_IAssetClass, assetClass:IAssetClass)
	{
		ShaderBase._abstractionClassPool[assetClass.assetType] = gl_assetClass;
	}

	public getImageIndex(texture:TextureBase, index:number = 0):number
	{
		return this._pass.getImageIndex(texture, index);
	}

	public _iIncludeDependencies()
	{
		this._pass._iIncludeDependencies(this);
	}

	/**
	 * Factory method to create a concrete compiler object for this object
	 *
	 * @param elementsClass
	 * @param pass
	 * @param stage
	 * @returns {CompilerBase}
	 */
	public createCompiler(elementsClass:IElementsClassGL, pass:IPass):CompilerBase
	{
		return new CompilerBase(elementsClass, pass, this);
	}

	/**
	 * Clears dependency counts for all registers. Called when recompiling a pass.
	 */
	public reset()
	{
		this.projectionDependencies = 0;
		this.normalDependencies = 0;
		this.colorDependencies = 0;
		this.viewDirDependencies = 0;
		this.uvDependencies = 0;
		this.secondaryUVDependencies = 0;
		this.globalPosDependencies = 0;
		this.tangentDependencies = 0;
		this.usesCommonData = false;
		this.usesGlobalPosFragment = false;
		this.usesPositionFragment = false;
		this.usesFragmentAnimation = false;
		this.usesTangentSpace = false;
		this.outputsNormals = false;
		this.outputsTangentNormals = false;
	}

	public pInitRegisterIndices()
	{
		this.commonsDataIndex = -1;
		this.cameraPositionIndex = -1;
		this.curvesIndex = -1;
		this.uvIndex = -1;
		this.uvMatrixIndex = -1;
		this.colorTransformIndex = -1;
		this.secondaryUVIndex = -1;
		this.normalIndex = -1;
		this.colorBufferIndex = -1;
		this.tangentIndex = -1;
		this.sceneMatrixIndex = -1;
		this.sceneNormalMatrixIndex = -1;
		this.jointIndexIndex = -1;
		this.jointWeightIndex = -1;
		this.imageIndices.length = 0;
	}

	/**
	 * Initializes the unchanging constant data for this shader object.
	 */
	public initConstantData(registerCache:ShaderRegisterCache, animatableAttributes:Array<string>, animationTargetRegisters:Array<string>, uvSource:string, uvTarget:string)
	{
		//Updates the amount of used register indices.
		this.numUsedVertexConstants = registerCache.numUsedVertexConstants;
		this.numUsedFragmentConstants = registerCache.numUsedFragmentConstants;
		this.numUsedStreams = registerCache.numUsedStreams;
		this.numUsedTextures = registerCache.numUsedTextures;
		this.numUsedVaryings = registerCache.numUsedVaryings;
		this.numUsedFragmentConstants = registerCache.numUsedFragmentConstants;

		this.animatableAttributes = animatableAttributes;
		this.animationTargetRegisters = animationTargetRegisters;
		this.uvSource = uvSource;
		this.uvTarget = uvTarget;

		this.vertexConstantData = new Float32Array(this.numUsedVertexConstants*4);
		this.fragmentConstantData = new Float32Array(this.numUsedFragmentConstants*4);

		//Initializes commonly required constant values.
		if (this.commonsDataIndex >= 0) {
			this.fragmentConstantData[this.commonsDataIndex] = .5;
			this.fragmentConstantData[this.commonsDataIndex + 1] = 0;
			this.fragmentConstantData[this.commonsDataIndex + 2] = 1/255;
			this.fragmentConstantData[this.commonsDataIndex + 3] = 1;
		}

		//Initializes the default UV transformation matrix.
		if (this.uvMatrixIndex >= 0) {
			this.vertexConstantData[this.uvMatrixIndex] = 1;
			this.vertexConstantData[this.uvMatrixIndex + 1] = 0;
			this.vertexConstantData[this.uvMatrixIndex + 2] = 0;
			this.vertexConstantData[this.uvMatrixIndex + 3] = 0;
			this.vertexConstantData[this.uvMatrixIndex + 4] = 0;
			this.vertexConstantData[this.uvMatrixIndex + 5] = 1;
			this.vertexConstantData[this.uvMatrixIndex + 6] = 0;
			this.vertexConstantData[this.uvMatrixIndex + 7] = 0;
		}

		//Initializes the default colorTransform.
		if (this.colorTransformIndex >= 0) {
			this.fragmentConstantData[this.colorTransformIndex] = 1;
			this.fragmentConstantData[this.colorTransformIndex + 1] = 1;
			this.fragmentConstantData[this.colorTransformIndex + 2] = 1;
			this.fragmentConstantData[this.colorTransformIndex + 3] = 1;
			this.fragmentConstantData[this.colorTransformIndex + 4] = 0;
			this.fragmentConstantData[this.colorTransformIndex + 5] = 0;
			this.fragmentConstantData[this.colorTransformIndex + 6] = 0;
			this.fragmentConstantData[this.colorTransformIndex + 7] = 0;
		}
		if (this.cameraPositionIndex >= 0)
			this.vertexConstantData[this.cameraPositionIndex + 3] = 1;
	}

	/**
	 * The blend mode to use when drawing this renderable. The following blend modes are supported:
	 * <ul>
	 * <li>BlendMode.NORMAL: No blending, unless the material inherently needs it</li>
	 * <li>BlendMode.LAYER: Force blending. This will draw the object the same as NORMAL, but without writing depth writes.</li>
	 * <li>BlendMode.MULTIPLY</li>
	 * <li>BlendMode.ADD</li>
	 * <li>BlendMode.ALPHA</li>
	 * </ul>
	 */
	public setBlendMode(value:string)
	{
		switch (value) {
			case BlendMode.NORMAL:
				this._blendFactorSource = ContextGLBlendFactor.ONE;
				this._blendFactorDest = ContextGLBlendFactor.ZERO;
				this.usesBlending = false;
				break;

			case BlendMode.LAYER:
				this._blendFactorSource = ContextGLBlendFactor.SOURCE_ALPHA;
				this._blendFactorDest = ContextGLBlendFactor.ONE_MINUS_SOURCE_ALPHA;
				this.usesBlending = true;
				break;

			case BlendMode.MULTIPLY:
				this._blendFactorSource = ContextGLBlendFactor.ZERO;
				this._blendFactorDest = ContextGLBlendFactor.SOURCE_COLOR;
				this.usesBlending = true;
				break;

			case BlendMode.ADD:
				this._blendFactorSource = ContextGLBlendFactor.SOURCE_ALPHA;
				this._blendFactorDest = ContextGLBlendFactor.ONE;
				this.usesBlending = true;
				break;

			case BlendMode.ALPHA:
				this._blendFactorSource = ContextGLBlendFactor.ZERO;
				this._blendFactorDest = ContextGLBlendFactor.SOURCE_ALPHA;
				this.usesBlending = true;
				break;

			default:
				throw new ArgumentError("Unsupported blend mode!");
		}
	}


	/**
	 * @inheritDoc
	 */
	public _iActivate(camera:Camera)
	{
		if (this.usesAnimation)
			(<AnimationSetBase> this._pass.animationSet).activate(this, this._stage);

		this._stage.context.setCulling(this.useBothSides? ContextGLTriangleFace.NONE : this._defaultCulling, camera.projection.coordinateSystem);

		if (!this.usesTangentSpace && this.cameraPositionIndex >= 0) {
			var pos:Vector3D = camera.scenePosition;

			this.vertexConstantData[this.cameraPositionIndex] = pos.x;
			this.vertexConstantData[this.cameraPositionIndex + 1] = pos.y;
			this.vertexConstantData[this.cameraPositionIndex + 2] = pos.z;
		}

		this._stage.context.setDepthTest(( this.writeDepth && !this.usesBlending ), this.depthCompareMode);

		if (this.usesBlending)
			this._stage.context.setBlendFactors(this._blendFactorSource, this._blendFactorDest);

		this.activeElements = null;
	}

	/**
	 * @inheritDoc
	 */
	public _iDeactivate()
	{
		if (this.usesAnimation)
			(<AnimationSetBase> this._pass.animationSet).deactivate(this, this._stage);

		//For the love of god don't remove this if you want your multi-material shadows to not flicker like shit
		this._stage.context.setDepthTest(true, ContextGLCompareMode.LESS_EQUAL);

		this.activeElements = null;
	}


	/**
	 *
	 *
	 * @param renderable
	 * @param stage
	 * @param camera
	 */
	public _iRender(renderable:GL_RenderableBase, camera:Camera, viewProjection:Matrix3D)
	{
		if (renderable.renderable.animator)
			(<AnimatorBase> renderable.renderable.animator).setRenderState(this, renderable, this._stage, camera, this.numUsedVertexConstants, this.numUsedStreams);

		if (this.usesUVTransform) {
			var uvMatrix:Matrix = renderable.uvMatrix;

			if (uvMatrix) {
				this.vertexConstantData[this.uvMatrixIndex] = uvMatrix.a;
				this.vertexConstantData[this.uvMatrixIndex + 1] = uvMatrix.b;
				this.vertexConstantData[this.uvMatrixIndex + 3] = uvMatrix.tx;
				this.vertexConstantData[this.uvMatrixIndex + 4] = uvMatrix.c;
				this.vertexConstantData[this.uvMatrixIndex + 5] = uvMatrix.d;
				this.vertexConstantData[this.uvMatrixIndex + 7] = uvMatrix.ty;
			} else {
				this.vertexConstantData[this.uvMatrixIndex] = 1;
				this.vertexConstantData[this.uvMatrixIndex + 1] = 0;
				this.vertexConstantData[this.uvMatrixIndex + 3] = 0;
				this.vertexConstantData[this.uvMatrixIndex + 4] = 0;
				this.vertexConstantData[this.uvMatrixIndex + 5] = 1;
				this.vertexConstantData[this.uvMatrixIndex + 7] = 0;
			}
		}
		if (this.usesColorTransform) {

			var colorTransform:ColorTransform = renderable.sourceEntity._iAssignedColorTransform();

			if (colorTransform) {
				this.fragmentConstantData[this.colorTransformIndex] = colorTransform.redMultiplier;
				this.fragmentConstantData[this.colorTransformIndex + 1] = colorTransform.greenMultiplier;
				this.fragmentConstantData[this.colorTransformIndex + 2] = colorTransform.blueMultiplier;
				this.fragmentConstantData[this.colorTransformIndex + 3] = colorTransform.alphaMultiplier;
				this.fragmentConstantData[this.colorTransformIndex + 4] = colorTransform.redOffset/255;
				this.fragmentConstantData[this.colorTransformIndex + 5] = colorTransform.greenOffset/255;
				this.fragmentConstantData[this.colorTransformIndex + 6] = colorTransform.blueOffset/255;
				this.fragmentConstantData[this.colorTransformIndex + 7] = colorTransform.alphaOffset/255;
			} else {
				this.fragmentConstantData[this.colorTransformIndex] = 1;
				this.fragmentConstantData[this.colorTransformIndex + 1] = 1;
				this.fragmentConstantData[this.colorTransformIndex + 2] = 1;
				this.fragmentConstantData[this.colorTransformIndex + 3] = 1;
				this.fragmentConstantData[this.colorTransformIndex + 4] = 0;
				this.fragmentConstantData[this.colorTransformIndex + 5] = 0;
				this.fragmentConstantData[this.colorTransformIndex + 6] = 0;
				this.fragmentConstantData[this.colorTransformIndex + 7] = 0;
			}
		}
		if (this.sceneNormalMatrixIndex >= 0)
			renderable.sourceEntity.inverseSceneTransform.copyRawDataTo(this.vertexConstantData, this.sceneNormalMatrixIndex, false);

		if (this.usesTangentSpace && this.cameraPositionIndex >= 0) {

			renderable.sourceEntity.inverseSceneTransform.copyRawDataTo(this._pInverseSceneMatrix);
			var pos:Vector3D = camera.scenePosition;
			var x:number = pos.x;
			var y:number = pos.y;
			var z:number = pos.z;

			this.vertexConstantData[this.cameraPositionIndex] = this._pInverseSceneMatrix[0]*x + this._pInverseSceneMatrix[4]*y + this._pInverseSceneMatrix[8]*z + this._pInverseSceneMatrix[12];
			this.vertexConstantData[this.cameraPositionIndex + 1] = this._pInverseSceneMatrix[1]*x + this._pInverseSceneMatrix[5]*y + this._pInverseSceneMatrix[9]*z + this._pInverseSceneMatrix[13];
			this.vertexConstantData[this.cameraPositionIndex + 2] = this._pInverseSceneMatrix[2]*x + this._pInverseSceneMatrix[6]*y + this._pInverseSceneMatrix[10]*z + this._pInverseSceneMatrix[14];
		}
	}

	public invalidateProgram()
	{
		this._invalidProgram = true;
	}

	public invalidateShader()
	{
		this._invalidShader = true;
		this._invalidProgram = true;
	}

	public dispose()
	{
		this._programData.dispose();
		this._programData = null;
	}

	private _updateProgram()
	{
		this._invalidProgram = false;

		var compiler:CompilerBase;

		if (this._invalidShader) {
			this._invalidShader = false;

			compiler = this.createCompiler(this._elementsClass, this._pass);
			compiler.compile();
		}

		this._calcAnimationCode(compiler.shadedTarget);

		var programData:ProgramData = this._stage.getProgramData(this._animationVertexCode + compiler.vertexCode, compiler.fragmentCode + this._animationFragmentCode + compiler.postAnimationFragmentCode);

		//check program data hasn't changed, keep count of program usages
		if (this._programData != programData) {
			if (this._programData)
				this._programData.dispose();

			this._programData = programData;

			programData.usages++;
		}
	}

	private _calcAnimationCode(shadedTarget:string)
	{
		//reset code
		this._animationVertexCode = "";
		this._animationFragmentCode = "";

		//check to see if GPU animation is used
		if (this.usesAnimation) {

			var animationSet:AnimationSetBase = <AnimationSetBase> this._pass.animationSet;

			this._animationVertexCode += animationSet.getAGALVertexCode(this);

			if (this.uvDependencies > 0 && !this.usesUVTransform)
				this._animationVertexCode += animationSet.getAGALUVCode(this);

			if (this.usesFragmentAnimation)
				this._animationFragmentCode += animationSet.getAGALFragmentCode(this, shadedTarget);

			animationSet.doneAGALCode(this);

		} else {
			// simply write attributes to targets, do not animate them
			// projection will pick up on targets[0] to do the projection
			var len:number = this.animatableAttributes.length;
			for (var i:number = 0; i < len; ++i)
				this._animationVertexCode += "mov " + this.animationTargetRegisters[i] + ", " + this.animatableAttributes[i] + "\n";

			if (this.uvDependencies > 0 && !this.usesUVTransform)
				this._animationVertexCode += "mov " + this.uvTarget + "," + this.uvSource + "\n";
		}
	}
}

export default ShaderBase;