var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var TriangleSubGeometry = require("awayjs-display/lib/base/TriangleSubGeometry");
var ContextGLProgramType = require("awayjs-stagegl/lib/base/ContextGLProgramType");
var RenderableBase = require("awayjs-renderergl/lib/pool/RenderableBase");
/**
 * @class away.pool.SkyboxRenderable
 */
var SkyboxRenderable = (function (_super) {
    __extends(SkyboxRenderable, _super);
    /**
     * //TODO
     *
     * @param pool
     * @param skybox
     */
    function SkyboxRenderable(pool, skybox, stage) {
        _super.call(this, pool, skybox, skybox, skybox, stage);
        this._vertexArray = new Array(0, 0, 0, 0, 1, 1, 1, 1);
    }
    /**
     * //TODO
     *
     * @returns {away.base.TriangleSubGeometry}
     * @private
     */
    SkyboxRenderable.prototype._pGetSubGeometry = function () {
        var geometry = SkyboxRenderable._geometry;
        if (!geometry) {
            geometry = SkyboxRenderable._geometry = new TriangleSubGeometry(true);
            geometry.autoDeriveNormals = false;
            geometry.autoDeriveTangents = false;
            geometry.updateIndices(Array(0, 1, 2, 2, 3, 0, 6, 5, 4, 4, 7, 6, 2, 6, 7, 7, 3, 2, 4, 5, 1, 1, 0, 4, 4, 0, 3, 3, 7, 4, 2, 1, 5, 5, 6, 2));
            geometry.updatePositions(Array(-1, 1, -1, 1, 1, -1, 1, 1, 1, -1, 1, 1, -1, -1, -1, 1, -1, -1, 1, -1, 1, -1, -1, 1));
        }
        this._pVertexDataDirty[TriangleSubGeometry.POSITION_DATA] = true;
        return geometry;
    };
    SkyboxRenderable._iIncludeDependencies = function (shaderObject) {
    };
    /**
     * @inheritDoc
     */
    SkyboxRenderable._iGetVertexCode = function (shaderObject, registerCache, sharedRegisters) {
        return "mul vt0, va0, vc5\n" + "add vt0, vt0, vc4\n" + "m44 op, vt0, vc0\n" + "mov v0, va0\n";
    };
    /**
     * @inheritDoc
     */
    SkyboxRenderable.prototype._iActivate = function (shader, camera) {
        _super.prototype._iActivate.call(this, shader, camera);
        var context = this._stage.context;
        //context.setSamplerStateAt(0, ContextGLWrapMode.CLAMP, ContextGLTextureFilter.LINEAR, this._cubeMap.hasMipmaps? ContextGLMipFilter.MIPLINEAR : ContextGLMipFilter.MIPNONE);
        //context.setDepthTest(false, ContextGLCompareMode.LESS);
        //this._stage.activateCubeTexture(0, this._cubeMap);
    };
    /**
     * @inheritDoc
     */
    SkyboxRenderable.prototype._iRender = function (shader, camera, viewProjection) {
        _super.prototype._iRender.call(this, shader, camera, viewProjection);
        var context = this._stage.context;
        var pos = camera.scenePosition;
        this._vertexArray[0] = pos.x;
        this._vertexArray[1] = pos.y;
        this._vertexArray[2] = pos.z;
        this._vertexArray[4] = this._vertexArray[5] = this._vertexArray[6] = camera.projection.far / Math.sqrt(3);
        context.setProgramConstantsFromMatrix(ContextGLProgramType.VERTEX, 0, viewProjection, true);
        context.setProgramConstantsFromArray(ContextGLProgramType.VERTEX, 4, this._vertexArray, 2);
        this._stage.activateBuffer(0, this.getVertexData(TriangleSubGeometry.POSITION_DATA), this.getVertexOffset(TriangleSubGeometry.POSITION_DATA), TriangleSubGeometry.POSITION_FORMAT);
        context.drawTriangles(this._stage.getIndexBuffer(this.getIndexData()), 0, this.numTriangles);
    };
    /**
     *
     */
    SkyboxRenderable.id = "skybox";
    SkyboxRenderable.vertexAttributesOffset = 1;
    return SkyboxRenderable;
})(RenderableBase);
module.exports = SkyboxRenderable;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1yZW5kZXJlcmdsL2xpYi9wb29sL3NreWJveHJlbmRlcmFibGUudHMiXSwibmFtZXMiOlsiU2t5Ym94UmVuZGVyYWJsZSIsIlNreWJveFJlbmRlcmFibGUuY29uc3RydWN0b3IiLCJTa3lib3hSZW5kZXJhYmxlLl9wR2V0U3ViR2VvbWV0cnkiLCJTa3lib3hSZW5kZXJhYmxlLl9pSW5jbHVkZURlcGVuZGVuY2llcyIsIlNreWJveFJlbmRlcmFibGUuX2lHZXRWZXJ0ZXhDb2RlIiwiU2t5Ym94UmVuZGVyYWJsZS5faUFjdGl2YXRlIiwiU2t5Ym94UmVuZGVyYWJsZS5faVJlbmRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBSUEsSUFBTyxtQkFBbUIsV0FBYSw2Q0FBNkMsQ0FBQyxDQUFDO0FBT3RGLElBQU8sb0JBQW9CLFdBQWEsOENBQThDLENBQUMsQ0FBQztBQVN4RixJQUFPLGNBQWMsV0FBYywyQ0FBMkMsQ0FBQyxDQUFDO0FBS2hGLEFBR0E7O0dBREc7SUFDRyxnQkFBZ0I7SUFBU0EsVUFBekJBLGdCQUFnQkEsVUFBdUJBO0lBZ0I1Q0E7Ozs7O09BS0dBO0lBQ0hBLFNBdEJLQSxnQkFBZ0JBLENBc0JUQSxJQUFtQkEsRUFBRUEsTUFBYUEsRUFBRUEsS0FBV0E7UUFFMURDLGtCQUFNQSxJQUFJQSxFQUFFQSxNQUFNQSxFQUFFQSxNQUFNQSxFQUFFQSxNQUFNQSxFQUFFQSxLQUFLQSxDQUFDQSxDQUFDQTtRQUUzQ0EsSUFBSUEsQ0FBQ0EsWUFBWUEsR0FBR0EsSUFBSUEsS0FBS0EsQ0FBU0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFDL0RBLENBQUNBO0lBRUREOzs7OztPQUtHQTtJQUNJQSwyQ0FBZ0JBLEdBQXZCQTtRQUVDRSxJQUFJQSxRQUFRQSxHQUF1QkEsZ0JBQWdCQSxDQUFDQSxTQUFTQSxDQUFDQTtRQUU5REEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDZkEsUUFBUUEsR0FBR0EsZ0JBQWdCQSxDQUFDQSxTQUFTQSxHQUFHQSxJQUFJQSxtQkFBbUJBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO1lBQ3RFQSxRQUFRQSxDQUFDQSxpQkFBaUJBLEdBQUdBLEtBQUtBLENBQUNBO1lBQ25DQSxRQUFRQSxDQUFDQSxrQkFBa0JBLEdBQUdBLEtBQUtBLENBQUNBO1lBQ3BDQSxRQUFRQSxDQUFDQSxhQUFhQSxDQUFDQSxLQUFLQSxDQUFTQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNsSkEsUUFBUUEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsS0FBS0EsQ0FBU0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0Es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QkEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsRUFBRUEsSUFBSUEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsbUJBQW1CQSxDQUFDQSxhQUFhQSxDQUFDQSxFQUFFQSxtQkFBbUJBLENBQUNBLGVBQWVBLENBQUNBLENBQUNBO1FBQ25MQSxPQUFPQSxDQUFDQSxhQUFhQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxjQUFjQSxDQUFDQSxJQUFJQSxDQUFDQSxZQUFZQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQTtJQUM5RkEsQ0FBQ0E7SUEvRkROOztPQUVHQTtJQUNXQSxtQkFBRUEsR0FBVUEsUUFBUUEsQ0FBQ0E7SUFFckJBLHVDQUFzQkEsR0FBVUEsQ0FBQ0EsQ0FBQ0E7SUEyRmpEQSx1QkFBQ0E7QUFBREEsQ0FwR0EsQUFvR0NBLEVBcEc4QixjQUFjLEVBb0c1QztBQUVELEFBQTBCLGlCQUFqQixnQkFBZ0IsQ0FBQyIsImZpbGUiOiJwb29sL1NreWJveFJlbmRlcmFibGUuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1hdHJpeDNEXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vTWF0cml4M0RcIik7XG5pbXBvcnQgVmVjdG9yM0RcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9WZWN0b3IzRFwiKTtcbmltcG9ydCBDdWJlVGV4dHVyZUJhc2VcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi90ZXh0dXJlcy9DdWJlVGV4dHVyZUJhc2VcIik7XG5cbmltcG9ydCBUcmlhbmdsZVN1Ykdlb21ldHJ5XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvVHJpYW5nbGVTdWJHZW9tZXRyeVwiKTtcbmltcG9ydCBTa3lib3hcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZW50aXRpZXMvU2t5Ym94XCIpO1xuaW1wb3J0IENhbWVyYVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9DYW1lcmFcIik7XG5cbmltcG9ydCBJQ29udGV4dEdMXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1zdGFnZWdsL2xpYi9iYXNlL0lDb250ZXh0R0xcIik7XG5pbXBvcnQgQ29udGV4dEdMQ29tcGFyZU1vZGVcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtc3RhZ2VnbC9saWIvYmFzZS9Db250ZXh0R0xDb21wYXJlTW9kZVwiKTtcbmltcG9ydCBDb250ZXh0R0xNaXBGaWx0ZXJcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtc3RhZ2VnbC9saWIvYmFzZS9Db250ZXh0R0xNaXBGaWx0ZXJcIik7XG5pbXBvcnQgQ29udGV4dEdMUHJvZ3JhbVR5cGVcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtc3RhZ2VnbC9saWIvYmFzZS9Db250ZXh0R0xQcm9ncmFtVHlwZVwiKTtcbmltcG9ydCBDb250ZXh0R0xUZXh0dXJlRmlsdGVyXHRcdD0gcmVxdWlyZShcImF3YXlqcy1zdGFnZWdsL2xpYi9iYXNlL0NvbnRleHRHTFRleHR1cmVGaWx0ZXJcIik7XG5pbXBvcnQgQ29udGV4dEdMV3JhcE1vZGVcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtc3RhZ2VnbC9saWIvYmFzZS9Db250ZXh0R0xXcmFwTW9kZVwiKTtcbmltcG9ydCBTdGFnZVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1zdGFnZWdsL2xpYi9iYXNlL1N0YWdlXCIpO1xuXG5pbXBvcnQgU2hhZGVyT2JqZWN0QmFzZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLXJlbmRlcmVyZ2wvbGliL2NvbXBpbGF0aW9uL1NoYWRlck9iamVjdEJhc2VcIik7XG5pbXBvcnQgU2hhZGVyUmVnaXN0ZXJDYWNoZVx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1yZW5kZXJlcmdsL2xpYi9jb21waWxhdGlvbi9TaGFkZXJSZWdpc3RlckNhY2hlXCIpO1xuaW1wb3J0IFNoYWRlclJlZ2lzdGVyRGF0YVx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1yZW5kZXJlcmdsL2xpYi9jb21waWxhdGlvbi9TaGFkZXJSZWdpc3RlckRhdGFcIik7XG5pbXBvcnQgU2hhZGVyUmVnaXN0ZXJFbGVtZW50XHRcdD0gcmVxdWlyZShcImF3YXlqcy1yZW5kZXJlcmdsL2xpYi9jb21waWxhdGlvbi9TaGFkZXJSZWdpc3RlckVsZW1lbnRcIik7XG5pbXBvcnQgUmVuZGVyYWJsZUJhc2VcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1yZW5kZXJlcmdsL2xpYi9wb29sL1JlbmRlcmFibGVCYXNlXCIpO1xuaW1wb3J0IFJlbmRlcmFibGVQb29sXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtcmVuZGVyZXJnbC9saWIvcG9vbC9SZW5kZXJhYmxlUG9vbFwiKTtcbmltcG9ydCBTaGFkZXJDb21waWxlckhlbHBlclx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1yZW5kZXJlcmdsL2xpYi91dGlscy9TaGFkZXJDb21waWxlckhlbHBlclwiKTtcbmltcG9ydCBSZW5kZXJPYmplY3RCYXNlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtcmVuZGVyZXJnbC9saWIvY29tcGlsYXRpb24vUmVuZGVyT2JqZWN0QmFzZVwiKTtcblxuLyoqXG4gKiBAY2xhc3MgYXdheS5wb29sLlNreWJveFJlbmRlcmFibGVcbiAqL1xuY2xhc3MgU2t5Ym94UmVuZGVyYWJsZSBleHRlbmRzIFJlbmRlcmFibGVCYXNlXG57XG5cdHByaXZhdGUgX3ZlcnRleEFycmF5OkFycmF5PG51bWJlcj47XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgc3RhdGljIGlkOnN0cmluZyA9IFwic2t5Ym94XCI7XG5cblx0cHVibGljIHN0YXRpYyB2ZXJ0ZXhBdHRyaWJ1dGVzT2Zmc2V0Om51bWJlciA9IDE7XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwcml2YXRlIHN0YXRpYyBfZ2VvbWV0cnk6VHJpYW5nbGVTdWJHZW9tZXRyeTtcblxuXHQvKipcblx0ICogLy9UT0RPXG5cdCAqXG5cdCAqIEBwYXJhbSBwb29sXG5cdCAqIEBwYXJhbSBza3lib3hcblx0ICovXG5cdGNvbnN0cnVjdG9yKHBvb2w6UmVuZGVyYWJsZVBvb2wsIHNreWJveDpTa3lib3gsIHN0YWdlOlN0YWdlKVxuXHR7XG5cdFx0c3VwZXIocG9vbCwgc2t5Ym94LCBza3lib3gsIHNreWJveCwgc3RhZ2UpO1xuXG5cdFx0dGhpcy5fdmVydGV4QXJyYXkgPSBuZXcgQXJyYXk8bnVtYmVyPigwLCAwLCAwLCAwLCAxLCAxLCAxLCAxKTtcblx0fVxuXG5cdC8qKlxuXHQgKiAvL1RPRE9cblx0ICpcblx0ICogQHJldHVybnMge2F3YXkuYmFzZS5UcmlhbmdsZVN1Ykdlb21ldHJ5fVxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0cHVibGljIF9wR2V0U3ViR2VvbWV0cnkoKTpUcmlhbmdsZVN1Ykdlb21ldHJ5XG5cdHtcblx0XHR2YXIgZ2VvbWV0cnk6VHJpYW5nbGVTdWJHZW9tZXRyeSA9IFNreWJveFJlbmRlcmFibGUuX2dlb21ldHJ5O1xuXG5cdFx0aWYgKCFnZW9tZXRyeSkge1xuXHRcdFx0Z2VvbWV0cnkgPSBTa3lib3hSZW5kZXJhYmxlLl9nZW9tZXRyeSA9IG5ldyBUcmlhbmdsZVN1Ykdlb21ldHJ5KHRydWUpO1xuXHRcdFx0Z2VvbWV0cnkuYXV0b0Rlcml2ZU5vcm1hbHMgPSBmYWxzZTtcblx0XHRcdGdlb21ldHJ5LmF1dG9EZXJpdmVUYW5nZW50cyA9IGZhbHNlO1xuXHRcdFx0Z2VvbWV0cnkudXBkYXRlSW5kaWNlcyhBcnJheTxudW1iZXI+KDAsIDEsIDIsIDIsIDMsIDAsIDYsIDUsIDQsIDQsIDcsIDYsIDIsIDYsIDcsIDcsIDMsIDIsIDQsIDUsIDEsIDEsIDAsIDQsIDQsIDAsIDMsIDMsIDcsIDQsIDIsIDEsIDUsIDUsIDYsIDIpKTtcblx0XHRcdGdlb21ldHJ5LnVwZGF0ZVBvc2l0aW9ucyhBcnJheTxudW1iZXI+KC0xLCAxLCAtMSwgMSwgMSwgLTEsIDEsIDEsIDEsIC0xLCAxLCAxLCAtMSwgLTEsIC0xLCAxLCAtMSwgLTEsIDEsIC0xLCAxLCAtMSwgLTEsIDEpKTtcblx0XHR9XG5cblx0XHR0aGlzLl9wVmVydGV4RGF0YURpcnR5W1RyaWFuZ2xlU3ViR2VvbWV0cnkuUE9TSVRJT05fREFUQV0gPSB0cnVlO1xuXG5cdFx0cmV0dXJuIGdlb21ldHJ5O1xuXHR9XG5cblx0cHVibGljIHN0YXRpYyBfaUluY2x1ZGVEZXBlbmRlbmNpZXMoc2hhZGVyT2JqZWN0OlNoYWRlck9iamVjdEJhc2UpXG5cdHtcblxuXHR9XG5cblx0LyoqXG5cdCAqIEBpbmhlcml0RG9jXG5cdCAqL1xuXHRwdWJsaWMgc3RhdGljIF9pR2V0VmVydGV4Q29kZShzaGFkZXJPYmplY3Q6U2hhZGVyT2JqZWN0QmFzZSwgcmVnaXN0ZXJDYWNoZTpTaGFkZXJSZWdpc3RlckNhY2hlLCBzaGFyZWRSZWdpc3RlcnM6U2hhZGVyUmVnaXN0ZXJEYXRhKTpzdHJpbmdcblx0e1xuXHRcdHJldHVybiBcIm11bCB2dDAsIHZhMCwgdmM1XFxuXCIgK1xuXHRcdFx0XCJhZGQgdnQwLCB2dDAsIHZjNFxcblwiICtcblx0XHRcdFwibTQ0IG9wLCB2dDAsIHZjMFxcblwiICtcblx0XHRcdFwibW92IHYwLCB2YTBcXG5cIjtcblx0fVxuXG5cdC8qKlxuXHQgKiBAaW5oZXJpdERvY1xuXHQgKi9cblx0cHVibGljIF9pQWN0aXZhdGUoc2hhZGVyOlNoYWRlck9iamVjdEJhc2UsIGNhbWVyYTpDYW1lcmEpXG5cdHtcblx0XHRzdXBlci5faUFjdGl2YXRlKHNoYWRlciwgY2FtZXJhKTtcblxuXHRcdHZhciBjb250ZXh0OklDb250ZXh0R0wgPSB0aGlzLl9zdGFnZS5jb250ZXh0O1xuXHRcdC8vY29udGV4dC5zZXRTYW1wbGVyU3RhdGVBdCgwLCBDb250ZXh0R0xXcmFwTW9kZS5DTEFNUCwgQ29udGV4dEdMVGV4dHVyZUZpbHRlci5MSU5FQVIsIHRoaXMuX2N1YmVNYXAuaGFzTWlwbWFwcz8gQ29udGV4dEdMTWlwRmlsdGVyLk1JUExJTkVBUiA6IENvbnRleHRHTE1pcEZpbHRlci5NSVBOT05FKTtcblx0XHQvL2NvbnRleHQuc2V0RGVwdGhUZXN0KGZhbHNlLCBDb250ZXh0R0xDb21wYXJlTW9kZS5MRVNTKTtcblx0XHQvL3RoaXMuX3N0YWdlLmFjdGl2YXRlQ3ViZVRleHR1cmUoMCwgdGhpcy5fY3ViZU1hcCk7XG5cdH1cblxuXHQvKipcblx0ICogQGluaGVyaXREb2Ncblx0ICovXG5cdHB1YmxpYyBfaVJlbmRlcihzaGFkZXI6U2hhZGVyT2JqZWN0QmFzZSwgY2FtZXJhOkNhbWVyYSwgdmlld1Byb2plY3Rpb246TWF0cml4M0QpXG5cdHtcblx0XHRzdXBlci5faVJlbmRlcihzaGFkZXIsIGNhbWVyYSwgdmlld1Byb2plY3Rpb24pO1xuXG5cdFx0dmFyIGNvbnRleHQ6SUNvbnRleHRHTCA9IHRoaXMuX3N0YWdlLmNvbnRleHQ7XG5cdFx0dmFyIHBvczpWZWN0b3IzRCA9IGNhbWVyYS5zY2VuZVBvc2l0aW9uO1xuXHRcdHRoaXMuX3ZlcnRleEFycmF5WzBdID0gcG9zLng7XG5cdFx0dGhpcy5fdmVydGV4QXJyYXlbMV0gPSBwb3MueTtcblx0XHR0aGlzLl92ZXJ0ZXhBcnJheVsyXSA9IHBvcy56O1xuXHRcdHRoaXMuX3ZlcnRleEFycmF5WzRdID0gdGhpcy5fdmVydGV4QXJyYXlbNV0gPSB0aGlzLl92ZXJ0ZXhBcnJheVs2XSA9IGNhbWVyYS5wcm9qZWN0aW9uLmZhci9NYXRoLnNxcnQoMyk7XG5cdFx0Y29udGV4dC5zZXRQcm9ncmFtQ29uc3RhbnRzRnJvbU1hdHJpeChDb250ZXh0R0xQcm9ncmFtVHlwZS5WRVJURVgsIDAsIHZpZXdQcm9qZWN0aW9uLCB0cnVlKTtcblx0XHRjb250ZXh0LnNldFByb2dyYW1Db25zdGFudHNGcm9tQXJyYXkoQ29udGV4dEdMUHJvZ3JhbVR5cGUuVkVSVEVYLCA0LCB0aGlzLl92ZXJ0ZXhBcnJheSwgMik7XG5cblx0XHR0aGlzLl9zdGFnZS5hY3RpdmF0ZUJ1ZmZlcigwLCB0aGlzLmdldFZlcnRleERhdGEoVHJpYW5nbGVTdWJHZW9tZXRyeS5QT1NJVElPTl9EQVRBKSwgdGhpcy5nZXRWZXJ0ZXhPZmZzZXQoVHJpYW5nbGVTdWJHZW9tZXRyeS5QT1NJVElPTl9EQVRBKSwgVHJpYW5nbGVTdWJHZW9tZXRyeS5QT1NJVElPTl9GT1JNQVQpO1xuXHRcdGNvbnRleHQuZHJhd1RyaWFuZ2xlcyh0aGlzLl9zdGFnZS5nZXRJbmRleEJ1ZmZlcih0aGlzLmdldEluZGV4RGF0YSgpKSwgMCwgdGhpcy5udW1UcmlhbmdsZXMpO1xuXHR9XG59XG5cbmV4cG9ydCA9IFNreWJveFJlbmRlcmFibGU7Il19