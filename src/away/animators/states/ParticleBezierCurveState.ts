///<reference path="../../_definitions.ts"/>

module away.animators
{
	import IRenderable						= away.base.IRenderable;
	import Camera3D							= away.cameras.Camera3D;
	import ContextGLVertexBufferFormat		= away.displayGL.ContextGLVertexBufferFormat
	import Vector3D							= away.geom.Vector3D;
	import StageGLProxy						= away.managers.StageGLProxy;
	
	/**
	 * ...
	 */
	export class ParticleBezierCurveState extends ParticleStateBase
	{
		private _particleBezierCurveNode:ParticleBezierCurveNode;
		private _controlPoint:Vector3D;
		private _endPoint:Vector3D;
		
		/**
		 * Defines the default control point of the node, used when in global mode.
		 */
		public get controlPoint():Vector3D
		{
			return this._controlPoint;
		}
		
		public set controlPoint(value:Vector3D)
		{
			this._controlPoint = value;
		}
		
		/**
		 * Defines the default end point of the node, used when in global mode.
		 */
		public get endPoint():Vector3D
		{
			return this._endPoint;
		}
		
		public set endPoint(value:Vector3D)
		{
			this._endPoint = value;
		}
		
		constructor(animator:ParticleAnimator, particleBezierCurveNode:ParticleBezierCurveNode)
		{
			super(animator, particleBezierCurveNode);

			this._particleBezierCurveNode = particleBezierCurveNode;
			this._controlPoint = this._particleBezierCurveNode._iControlPoint;
			this._endPoint = this._particleBezierCurveNode._iEndPoint;
		}
		
		public setRenderState(stageGLProxy:StageGLProxy, renderable:IRenderable, animationSubGeometry:AnimationSubGeometry, animationRegisterCache:AnimationRegisterCache, camera:Camera3D)
		{
			var controlIndex:number /*int*/ = animationRegisterCache.getRegisterIndex(this._pAnimationNode, ParticleBezierCurveNode.BEZIER_CONTROL_INDEX);
			var endIndex:number /*int*/ = animationRegisterCache.getRegisterIndex(this._pAnimationNode, ParticleBezierCurveNode.BEZIER_END_INDEX);
			
			if (this._particleBezierCurveNode.mode == ParticlePropertiesMode.LOCAL_STATIC) {
				animationSubGeometry.activateVertexBuffer(controlIndex, this._particleBezierCurveNode._iDataOffset, stageGLProxy, ContextGLVertexBufferFormat.FLOAT_3);
				animationSubGeometry.activateVertexBuffer(endIndex, this._particleBezierCurveNode._iDataOffset + 3, stageGLProxy, ContextGLVertexBufferFormat.FLOAT_3);
			} else {
				animationRegisterCache.setVertexConst(controlIndex, this._controlPoint.x, this._controlPoint.y, this._controlPoint.z);
				animationRegisterCache.setVertexConst(endIndex, this._endPoint.x, this._endPoint.y, this._endPoint.z);
			}
		}
	}
}
