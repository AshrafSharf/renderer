///<reference path="../../_definitions.ts"/>
/**
 * @module away.base
 */
module away.base
{
	//import away3d.managers.StageGLProxy;

	//import flash.displayGL.IndexBuffer;
	//import flash.geom.Matrix3D;

	/**
	 * @interface away.base.ISubGeometry
	 */
	export interface ISubGeometry
	{
		/**
		 * The total amount of vertices in the SubGeometry.
		 */
		numVertices:number;//GET

		/**
		 * The amount of triangles that comprise the IRenderable geometry.
		 */
		numTriangles:number;//GET

		/**
		 * The distance between two consecutive vertex, normal or tangent elements
		 * This always applies to vertices, normals and tangents.
		 */
		vertexStride:number;//GET

		/**
		 * The distance between two consecutive normal elements
		 * This always applies to vertices, normals and tangents.
		 */
		vertexNormalStride:number;//GET

		/**
		 * The distance between two consecutive tangent elements
		 * This always applies to vertices, normals and tangents.
		 */
		vertexTangentStride:number;//GET

		/**
		 * The distance between two consecutive UV elements
		 */
		UVStride:number;//GET

		/**
		 * The distance between two secondary UV elements
		 */
		secondaryUVStride:number;//GET

		/**
		 * Unique identifier for a subgeometry
		 */
		uniqueId:number;//GET

		/**
		 * Assigns the attribute stream for vertex positions.
		 * @param index The attribute stream index for the vertex shader
		 * @param stageGLProxy The StageGLProxy to assign the stream to
		 */
		activateVertexBuffer(index:number, stageGLProxy:away.managers.StageGLProxy);

		/**
		 * Assigns the attribute stream for UV coordinates
		 * @param index The attribute stream index for the vertex shader
		 * @param stageGLProxy The StageGLProxy to assign the stream to
		 */
		activateUVBuffer(index:number, stageGLProxy:away.managers.StageGLProxy);

		/**
		 * Assigns the attribute stream for a secondary set of UV coordinates
		 * @param index The attribute stream index for the vertex shader
		 * @param stageGLProxy The StageGLProxy to assign the stream to
		 */
		activateSecondaryUVBuffer(index:number, stageGLProxy:away.managers.StageGLProxy);

		/**
		 * Assigns the attribute stream for vertex normals
		 * @param index The attribute stream index for the vertex shader
		 * @param stageGLProxy The StageGLProxy to assign the stream to
		 */
		activateVertexNormalBuffer(index:number, stageGLProxy:away.managers.StageGLProxy);

		/**
		 * Assigns the attribute stream for vertex tangents
		 * @param index The attribute stream index for the vertex shader
		 * @param stageGLProxy The StageGLProxy to assign the stream to
		 */
		activateVertexTangentBuffer(index:number, stageGLProxy:away.managers.StageGLProxy);

		/**
		 * Retrieves the IndexBuffer object that contains triangle indices.
		 * @param context The ContextGL for which we request the buffer
		 * @return The VertexBuffer object that contains triangle indices.
		 */

		getIndexBuffer(stageGLProxy:away.managers.StageGLProxy):away.displayGL.IndexBuffer;

		/**
		 * Retrieves the object's vertices as a Number array.
		 */
			vertexData:number[];//GET

		/**
		 * Retrieves the object's normals as a Number array.
		 */
			vertexNormalData:number[];//GET

		/**
		 * Retrieves the object's tangents as a Number array.
		 */
			vertexTangentData:number[];//GET

		/**
		 * The offset into vertexData where the vertices are placed
		 */
			vertexOffset:number;//GET

		/**
		 * The offset into vertexNormalData where the normals are placed
		 */
			vertexNormalOffset:number;//GET

		/**
		 * The offset into vertexTangentData where the tangents are placed
		 */
			vertexTangentOffset:number;//GET

		/**
		 * The offset into UVData vector where the UVs are placed
		 */
			UVOffset:number;//GET

		/**
		 * The offset into SecondaryUVData vector where the UVs are placed
		 */
			secondaryUVOffset:number;//GET

		/**
		 * Retrieves the object's indices as a uint array.
		 */
			indexData:number[] /*uint*/
		;//GET

		/**
		 * Retrieves the object's uvs as a Number array.
		 */
			UVData:number[];//GET

		applyTransformation(transform:away.geom.Matrix3D);

		scale(scale:number);

		dispose();

		clone():away.base.ISubGeometry;

		scaleU:number;//GET

		scaleV:number;//GET

		scaleUV(scaleU:number, scaleV:number);//scaleUV(scaleU:number = 1, scaleV:number = 1);

		parentGeometry:away.base.Geometry;//GET / SET

		faceNormals:number[];//GET

		cloneWithSeperateBuffers():away.base.SubGeometry;

		autoDeriveVertexNormals:boolean;//GET / SET

		autoDeriveVertexTangents:boolean;//GET / SET

		fromVectors(vertices:number[], uvs:number[], normals:number[], tangents:number[]);

		vertexPositionData:number[];//GET
	}
}
