/**********************************************************************************************************************************************************************************************************
 * This file contains a reference to all the classes used in the project.
 ********************************************************************************************************************************************************************************************************
 *
 * The TypeScript compiler exports classes in a non deterministic manner, as the extend functionality copies the prototype chain
 * of one object onto another during initialisation and load (to create extensible functionality), the non deterministic nature of the
 * compiler can result in an extend operation referencing a class that is undefined and not yet loaded - which throw an JavaScript error.
 *
 * This file provides the compiler with a strict order in which to export the TypeScript classes to mitigate undefined extend errors
 *
 * @see https://typescript.codeplex.com/workitem/1356 @see https://typescript.codeplex.com/workitem/913
 *
 *********************************************************************************************************************************************************************************************************/

///<reference path="../../libs/ref/webgl.d.ts"/>
///<reference path="../../libs/ref/js.d.ts"/>
///<reference path="../../libs/ame.next.d.ts"/>

///<reference path="errors/CastError.ts"/>
///<reference path="errors/AnimationSetError.ts"/>

///<reference path="events/LightEvent.ts" />
///<reference path="events/CameraEvent.ts" />
///<reference path="events/Object3DEvent.ts" />
///<reference path="events/MouseEvent3D.ts"/>
///<reference path="events/Scene3DEvent.ts"/>
///<reference path="events/LensEvent.ts" />
///<reference path="events/AnimationStateEvent.ts" />
///<reference path="events/AnimatorEvent.ts" />
///<reference path="events/ShadingMethodEvent.ts"/>
///<reference path="events/GeometryEvent.ts"/>

///<reference path="core/base/Object3D.ts" />
///<reference path="core/base/SubMesh.ts"/>
///<reference path="core/base/IRenderable.ts" />
///<reference path="core/base/IMaterialOwner.ts" />
///<reference path="core/base/SubGeometryBase.ts"/>
///<reference path="core/base/ISubGeometry.ts"/>
///<reference path="core/base/CompactSubGeometry.ts"/>
///<reference path="core/base/SkinnedSubGeometry.ts"/>
///<reference path="core/base/Geometry.ts"/>
///<reference path="core/base/ParticleGeometry.ts"/>
///<reference path="core/base/SubGeometry.ts"/>

///<reference path="core/data/RenderableListItem.ts"/>
///<reference path="core/data/EntityListItem.ts"/>
///<reference path="core/data/EntityListItemPool.ts"/>
///<reference path="core/data/RenderableListItemPool.ts"/>

///<reference path="core/traverse/PartitionTraverser.ts" />
///<reference path="core/traverse/EntityCollector.ts" />
///<reference path="core/traverse/ShadowCasterCollector.ts" />
///<reference path="core/traverse/RaycastCollector.ts" />

///<reference path="core/partition/NodeBase.ts" />
///<reference path="core/partition/NullNode.ts" />
///<reference path="core/partition/Partition3D.ts" />
///<reference path="core/partition/EntityNode.ts" />
///<reference path="core/partition/CameraNode.ts" />
///<reference path="core/partition/LightNode.ts" />
///<reference path="core/partition/DirectionalLightNode.ts" />
///<reference path="core/partition/PointLightNode.ts"/>
///<reference path="core/partition/LightProbeNode.ts"/>
///<reference path="core/partition/MeshNode.ts" />
///<reference path="core/partition/SkyBoxNode.ts" />
///<reference path="core/partition/RenderableNode.ts" />

///<reference path="core/pick/IPickingCollider.ts" />
///<reference path="core/pick/PickingColliderBase.ts" />
///<reference path="core/pick/PickingCollisionVO.ts" />
///<reference path="core/pick/AS3PickingCollider.ts" />
///<reference path="core/pick/PickingColliderType.ts" />
///<reference path="core/pick/IPicker.ts"/>
///<reference path="core/pick/PickingColliderBase.ts" />
///<reference path="core/pick/AS3PickingCollider.ts" />
///<reference path="core/pick/ShaderPicker.ts" />
///<reference path="core/pick/RaycastPicker.ts" />
///<reference path="core/pick/PickingType.ts"/>

///<reference path="core/render/RendererBase.ts"/>
///<reference path="core/render/DepthRenderer.ts"/>
///<reference path="core/render/DefaultRenderer.ts"/>
///<reference path="core/render/Filter3DRenderer.ts"/>

///<reference path="core/sort/IEntitySorter.ts"/>
///<reference path="core/sort/RenderableMergeSort.ts"/>

///<reference path="containers/ObjectContainer3D.ts" />
///<reference path="containers/Loader3D.ts" />
///<reference path="containers/Scene3D.ts" />
///<reference path="containers/View3D.ts"/>

///<reference path="entities/Entity.ts" />
///<reference path="entities/SegmentSet.ts" />
///<reference path="entities/Mesh.ts"/>
///<reference path="entities/SkyBox.ts" />
///<reference path="entities/Sprite3D.ts"/>

///<reference path="bounds/BoundingVolumeBase.ts" />
///<reference path="bounds/NullBounds.ts" />
///<reference path="bounds/BoundingSphere.ts" />
///<reference path="bounds/AxisAlignedBoundingBox.ts" />

///<reference path="cameras/lenses/LensBase.ts" />
///<reference path="cameras/lenses/PerspectiveLens.ts" />
///<reference path="cameras/lenses/FreeMatrixLens.ts" />
///<reference path="cameras/lenses/OrthographicLens.ts" />
///<reference path="cameras/lenses/OrthographicOffCenterLens.ts" />
///<reference path="cameras/lenses/PerspectiveOffCenterLens.ts" />
///<reference path="cameras/lenses/ObliqueNearPlaneLens.ts" />
///<reference path="cameras/Camera3D.ts" />

///<reference path="controllers/ControllerBase.ts"/>
///<reference path="controllers/LookAtController.ts"/>
///<reference path="controllers/HoverController.ts"/>
///<reference path="controllers/FirstPersonController.ts"/>
///<reference path="controllers/FollowController.ts"/>
///<reference path="controllers/SpringController.ts"/>

///<reference path="filters/tasks/Filter3DTaskBase.ts"/>
///<reference path="filters/Filter3DBase.ts"/>

///<reference path="lights/LightBase.ts"/>
///<reference path="lights/LightProbe.ts"/>
///<reference path="lights/PointLight.ts"/>
///<reference path="lights/DirectionalLight.ts"/>
///<reference path="lights/shadowmaps/ShadowMapperBase.ts"/>
///<reference path="lights/shadowmaps/CubeMapShadowMapper.ts"/>
///<reference path="lights/shadowmaps/DirectionalShadowMapper.ts"/>
///<reference path="lights/shadowmaps/NearDirectionalShadowMapper.ts"/>

///<reference path="managers/Mouse3DManager.ts"/>
///<reference path="managers/AGALProgramCache.ts"/>

///<reference path="materials/passes/MaterialPassBase.ts"/>
///<reference path="materials/passes/CompiledPass.ts"/>
///<reference path="materials/passes/SuperShaderPass.ts"/>
///<reference path="materials/passes/DepthMapPass.ts"/>
///<reference path="materials/passes/DistanceMapPass.ts"/>
///<reference path="materials/passes/LightingPass.ts"/>
///<reference path="materials/passes/ShadowCasterPass.ts"/>
///<reference path="materials/passes/SegmentPass.ts"/>
///<reference path="materials/passes/SkyBoxPass.ts"/>

///<reference path="materials/methods/MethodVO.ts"/>
///<reference path="materials/methods/ShadingMethodBase.ts"/>
///<reference path="materials/methods/EffectMethodBase.ts"/>
///<reference path="materials/methods/MethodVOSet.ts"/>
///<reference path="materials/methods/ShaderMethodSetup.ts"/>
///<reference path="materials/methods/LightingMethodBase.ts"/>
///<reference path="materials/methods/ShadowMapMethodBase.ts"/>
///<reference path="materials/methods/SimpleShadowMapMethodBase.ts"/>
///<reference path="materials/methods/FilteredShadowMapMethod.ts"/>
///<reference path="materials/methods/FogMethod.ts"/>
///<reference path="materials/methods/HardShadowMapMethod.ts"/>
///<reference path="materials/methods/SoftShadowMapMethod.ts"/>
///<reference path="materials/methods/DitheredShadowMapMethod.ts"/>
///<reference path="materials/methods/NearShadowMapMethod.ts"/>
///<reference path="materials/methods/BasicAmbientMethod.ts"/>
///<reference path="materials/methods/BasicDiffuseMethod.ts"/>
///<reference path="materials/methods/BasicNormalMethod.ts"/>
///<reference path="materials/methods/BasicSpecularMethod.ts"/>
///<reference path="materials/methods/ColorTransformMethod.ts"/>
///<reference path="materials/methods/PhongSpecularMethod.ts"/>
///<reference path="materials/methods/CompositeDiffuseMethod.ts"/>
///<reference path="materials/methods/CompositeSpecularMethod.ts"/>
///<reference path="materials/methods/EnvMapMethod.ts"/>
///<reference path="materials/methods/FresnelSpecularMethod.ts"/>
///<reference path="materials/methods/SimpleWaterNormalMethod.ts"/>

///<reference path="materials/lightpickers/LightPickerBase.ts"/>
///<reference path="materials/lightpickers/StaticLightPicker.ts"/>

///<reference path="materials/compilation/ShaderRegisterCache.ts"/>
///<reference path="materials/compilation/ShaderRegisterElement.ts"/>
///<reference path="materials/compilation/ShaderRegisterData.ts"/>
///<reference path="materials/compilation/MethodDependencyCounter.ts"/>
///<reference path="materials/compilation/RegisterPool.ts"/>
///<reference path="materials/compilation/ShaderRegisterCache.ts"/>
///<reference path="materials/compilation/ShaderCompiler.ts"/>
///<reference path="materials/compilation/SuperShaderCompiler.ts"/>

///<reference path="materials/LightSources.ts"/>
///<reference path="materials/MaterialBase.ts"/>
///<reference path="materials/SinglePassMaterialBase.ts"/>
///<reference path="materials/MultiPassMaterialBase.ts"/>
///<reference path="materials/TextureMultiPassMaterial.ts"/>
///<reference path="materials/ColorMultiPassMaterial.ts"/>
///<reference path="materials/TextureMaterial.ts"/>
///<reference path="materials/ColorMaterial.ts"/>
///<reference path="materials/utils/DefaultMaterialManager.ts"/>
///<reference path="materials/compilation/LightingShaderCompiler.ts"/>
///<reference path="materials/SegmentMaterial.ts"/>
///<reference path="materials/SkyBoxMaterial.ts"/>

///<reference path="primitives/data/Segment.ts" />
///<reference path="primitives/PrimitiveBase.ts"/>
///<reference path="primitives/LineSegment.ts"/>
///<reference path="primitives/TorusGeometry.ts"/>
///<reference path="primitives/CubeGeometry.ts"/>
///<reference path="primitives/PlaneGeometry.ts"/>
///<reference path="primitives/CapsuleGeometry.ts" />
///<reference path="primitives/CylinderGeometry.ts" />
///<reference path="primitives/ConeGeometry.ts" />
///<reference path="primitives/RegularPolygonGeometry.ts" />
///<reference path="primitives/SphereGeometry.ts" />
///<reference path="primitives/WireframePrimitiveBase.ts" />
///<reference path="primitives/WireframeSphere.ts" />
///<reference path="primitives/WireframeCube.ts" />
///<reference path="primitives/WireframeCylinder.ts" />
///<reference path="primitives/WireframePlane.ts" />
///<reference path="primitives/WireframeRegularPolygon.ts" />
///<reference path="primitives/WireframeTetrahedron.ts" />

///<reference path="utils/Cast.ts"/>
///<reference path="utils/GeometryUtils.ts"/>
///<reference path="utils/PerspectiveMatrix3D.ts"/>

///<reference path="animators/data/AnimationRegisterCache.ts"/>
///<reference path="animators/data/AnimationSubGeometry.ts"/>
///<reference path="animators/data/ColorSegmentPoint.ts"/>
///<reference path="animators/data/JointPose.ts"/>
///<reference path="animators/data/ParticleAnimationData.ts"/>
///<reference path="animators/data/ParticleData.ts"/>
///<reference path="animators/data/ParticleProperties.ts"/>
///<reference path="animators/data/ParticlePropertiesMode.ts"/>
///<reference path="animators/data/Skeleton.ts"/>
///<reference path="animators/data/VertexAnimationMode.ts"/>
///<reference path="animators/data/SkeletonJoint.ts"/>
///<reference path="animators/data/SkeletonPose.ts"/>
///<reference path="animators/data/VertexAnimationMode.ts"/>

///<reference path="animators/nodes/AnimationNodeBase.ts"/>
///<reference path="animators/nodes/AnimationClipNodeBase.ts"/>
///<reference path="animators/nodes/ParticleNodeBase.ts"/>
///<reference path="animators/nodes/ParticleAccelerationNode.ts"/>
///<reference path="animators/nodes/ParticleBezierCurveNode.ts"/>
///<reference path="animators/nodes/ParticleBillboardNode.ts"/>
///<reference path="animators/nodes/ParticleColorNode.ts"/>
///<reference path="animators/nodes/ParticleFollowNode.ts"/>
///<reference path="animators/nodes/ParticleInitialColorNode.ts"/>
///<reference path="animators/nodes/ParticleOrbitNode.ts"/>
///<reference path="animators/nodes/ParticleOscillatorNode.ts"/>
///<reference path="animators/nodes/ParticlePositionNode.ts"/>
///<reference path="animators/nodes/ParticleRotateToHeadingNode.ts"/>
///<reference path="animators/nodes/ParticleRotateToPositionNode.ts"/>
///<reference path="animators/nodes/ParticleRotationalVelocityNode.ts"/>
///<reference path="animators/nodes/ParticleScaleNode.ts"/>
///<reference path="animators/nodes/ParticleSegmentedColorNode.ts"/>
///<reference path="animators/nodes/ParticleSpriteSheetNode.ts"/>
///<reference path="animators/nodes/ParticleTimeNode.ts"/>
///<reference path="animators/nodes/ParticleUVNode.ts"/>
///<reference path="animators/nodes/ParticleVelocityNode.ts"/>
///<reference path="animators/nodes/SkeletonBinaryLERPNode.ts"/>
///<reference path="animators/nodes/SkeletonClipNode.ts"/>
///<reference path="animators/nodes/SkeletonDifferenceNode.ts"/>
///<reference path="animators/nodes/SkeletonDirectionalNode.ts"/>
///<reference path="animators/nodes/SkeletonNaryLERPNode.ts"/>
///<reference path="animators/nodes/VertexClipNode.ts"/>

///<reference path="animators/states/IAnimationState.ts"/>
///<reference path="animators/states/ISkeletonAnimationState.ts"/>
///<reference path="animators/states/IVertexAnimationState.ts"/>
///<reference path="animators/states/AnimationStateBase.ts"/>
///<reference path="animators/states/ParticleStateBase.ts"/>
///<reference path="animators/states/ParticleAccelerationState.ts"/>
///<reference path="animators/states/ParticleBezierCurveState.ts"/>
///<reference path="animators/states/ParticleBillboardState.ts"/>
///<reference path="animators/states/ParticleColorState.ts"/>
///<reference path="animators/states/ParticleFollowState.ts"/>
///<reference path="animators/states/ParticleInitialColorState.ts"/>
///<reference path="animators/states/ParticleOrbitState.ts"/>
///<reference path="animators/states/ParticleOscillatorState.ts"/>
///<reference path="animators/states/ParticlePositionState.ts"/>
///<reference path="animators/states/ParticleRotateToHeadingState.ts"/>
///<reference path="animators/states/ParticleRotateToPositionState.ts"/>
///<reference path="animators/states/ParticleRotationalVelocityState.ts"/>
///<reference path="animators/states/ParticleScaleState.ts"/>
///<reference path="animators/states/ParticleSegmentedColorState.ts"/>
///<reference path="animators/states/ParticleSpriteSheetState.ts"/>
///<reference path="animators/states/ParticleTimeState.ts"/>
///<reference path="animators/states/ParticleUVState.ts"/>
///<reference path="animators/states/ParticleVelocityState.ts"/>
///<reference path="animators/states/AnimationClipState.ts"/>
///<reference path="animators/states/SkeletonBinaryLERPState.ts"/>
///<reference path="animators/states/SkeletonClipState.ts"/>
///<reference path="animators/states/SkeletonDifferenceState.ts"/>
///<reference path="animators/states/SkeletonDirectionalState.ts"/>
///<reference path="animators/states/SkeletonNaryLERPState.ts"/>
///<reference path="animators/states/VertexClipState.ts"/>

///<reference path="animators/transitions/IAnimationTransition.ts"/>
///<reference path="animators/transitions/CrossfadeTransition.ts"/>
///<reference path="animators/transitions/CrossfadeTransitionNode.ts"/>
///<reference path="animators/transitions/CrossfadeTransitionState.ts"/>

///<reference path="animators/AnimationSetBase.ts"/>
///<reference path="animators/AnimatorBase.ts"/>
///<reference path="animators/IAnimationSet.ts"/>
///<reference path="animators/IAnimator.ts"/>
///<reference path="animators/ParticleAnimationSet.ts"/>
///<reference path="animators/ParticleAnimator.ts"/>
///<reference path="animators/SkeletonAnimator.ts"/>
///<reference path="animators/SkeletonAnimationSet.ts"/>
///<reference path="animators/VertexAnimationSet.ts"/>
///<reference path="animators/VertexAnimator.ts"/>

///<reference path="parsers/OBJParser.ts"/>
///<reference path="parsers/AWDParser.ts"/>
///<reference path="parsers/Max3DSParser.ts"/>
///<reference path="parsers/MD2Parser.ts"/>
///<reference path="parsers/MD5AnimParser.ts"/>
///<reference path="parsers/MD5MeshParser.ts"/>
///<reference path="parsers/Parsers.ts"/>

///<reference path="tools/data/ParticleGeometryTransform.ts"/>
///<reference path="tools/helpers/ParticleGeometryHelper.ts"/>
