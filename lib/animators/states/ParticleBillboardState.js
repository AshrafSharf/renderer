var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MathConsts = require("awayjs-core/lib/geom/MathConsts");
var Matrix3D = require("awayjs-core/lib/geom/Matrix3D");
var Orientation3D = require("awayjs-core/lib/geom/Orientation3D");
var ParticleStateBase = require("awayjs-renderergl/lib/animators/states/ParticleStateBase");
/**
 * ...
 */
var ParticleBillboardState = (function (_super) {
    __extends(ParticleBillboardState, _super);
    /**
     *
     */
    function ParticleBillboardState(animator, particleNode) {
        _super.call(this, animator, particleNode);
        this._matrix = new Matrix3D;
        this._billboardAxis = particleNode._iBillboardAxis;
    }
    ParticleBillboardState.prototype.setRenderState = function (stage, renderable, animationSubGeometry, animationRegisterCache, camera) {
        var comps;
        if (this._billboardAxis) {
            var pos = renderable.sourceEntity.sceneTransform.position;
            var look = camera.sceneTransform.position.subtract(pos);
            var right = look.crossProduct(this._billboardAxis);
            right.normalize();
            look = this.billboardAxis.crossProduct(right);
            look.normalize();
            //create a quick inverse projection matrix
            this._matrix.copyFrom(renderable.sourceEntity.sceneTransform);
            comps = this._matrix.decompose(Orientation3D.AXIS_ANGLE);
            this._matrix.copyColumnFrom(0, right);
            this._matrix.copyColumnFrom(1, this.billboardAxis);
            this._matrix.copyColumnFrom(2, look);
            this._matrix.copyColumnFrom(3, pos);
            this._matrix.appendRotation(-comps[1].w * MathConsts.RADIANS_TO_DEGREES, comps[1]);
        }
        else {
            //create a quick inverse projection matrix
            this._matrix.copyFrom(renderable.sourceEntity.sceneTransform);
            this._matrix.append(camera.inverseSceneTransform);
            //decompose using axis angle rotations
            comps = this._matrix.decompose(Orientation3D.AXIS_ANGLE);
            //recreate the matrix with just the rotation data
            this._matrix.identity();
            this._matrix.appendRotation(-comps[1].w * MathConsts.RADIANS_TO_DEGREES, comps[1]);
        }
        //set a new matrix transform constant
        animationRegisterCache.setVertexConstFromMatrix(animationRegisterCache.getRegisterIndex(this._pAnimationNode, ParticleBillboardState.MATRIX_INDEX), this._matrix);
    };
    Object.defineProperty(ParticleBillboardState.prototype, "billboardAxis", {
        /**
         * Defines the billboard axis.
         */
        get: function () {
            return this.billboardAxis;
        },
        set: function (value) {
            this.billboardAxis = value ? value.clone() : null;
            if (this.billboardAxis)
                this.billboardAxis.normalize();
        },
        enumerable: true,
        configurable: true
    });
    /** @private */
    ParticleBillboardState.MATRIX_INDEX = 0;
    return ParticleBillboardState;
})(ParticleStateBase);
module.exports = ParticleBillboardState;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1yZW5kZXJlcmdsL2xpYi9hbmltYXRvcnMvc3RhdGVzL3BhcnRpY2xlYmlsbGJvYXJkc3RhdGUudHMiXSwibmFtZXMiOlsiUGFydGljbGVCaWxsYm9hcmRTdGF0ZSIsIlBhcnRpY2xlQmlsbGJvYXJkU3RhdGUuY29uc3RydWN0b3IiLCJQYXJ0aWNsZUJpbGxib2FyZFN0YXRlLnNldFJlbmRlclN0YXRlIiwiUGFydGljbGVCaWxsYm9hcmRTdGF0ZS5iaWxsYm9hcmRBeGlzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFPLFVBQVUsV0FBZ0IsaUNBQWlDLENBQUMsQ0FBQztBQUNwRSxJQUFPLFFBQVEsV0FBaUIsK0JBQStCLENBQUMsQ0FBQztBQUVqRSxJQUFPLGFBQWEsV0FBZSxvQ0FBb0MsQ0FBQyxDQUFDO0FBVXpFLElBQU8saUJBQWlCLFdBQWMsMERBQTBELENBQUMsQ0FBQztBQUdsRyxBQUdBOztHQURHO0lBQ0csc0JBQXNCO0lBQVNBLFVBQS9CQSxzQkFBc0JBLFVBQTBCQTtJQVNyREE7O09BRUdBO0lBQ0hBLFNBWktBLHNCQUFzQkEsQ0FZZkEsUUFBeUJBLEVBQUVBLFlBQWtDQTtRQUV4RUMsa0JBQU1BLFFBQVFBLEVBQUVBLFlBQVlBLENBQUNBLENBQUNBO1FBVHZCQSxZQUFPQSxHQUFZQSxJQUFJQSxRQUFRQSxDQUFDQTtRQVd2Q0EsSUFBSUEsQ0FBQ0EsY0FBY0EsR0FBR0EsWUFBWUEsQ0FBQ0EsZUFBZUEsQ0FBQ0E7SUFDcERBLENBQUNBO0lBRU1ELCtDQUFjQSxHQUFyQkEsVUFBc0JBLEtBQVdBLEVBQUVBLFVBQXlCQSxFQUFFQSxvQkFBeUNBLEVBQUVBLHNCQUE2Q0EsRUFBRUEsTUFBYUE7UUFFcEtFLElBQUlBLEtBQXFCQSxDQUFDQTtRQUMxQkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDekJBLElBQUlBLEdBQUdBLEdBQVlBLFVBQVVBLENBQUNBLFlBQVlBLENB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QUNBLGFBQWFBLENBQUNBO1FBQzNCQSxDQUFDQTthQUVESCxVQUF5QkEsS0FBY0E7WUFFdENHLElBQUlBLENBQUNBLGFBQWFBLEdBQUdBLEtBQUtBLEdBQUVBLEtBQUtBLENBQUNBLEtBQUtBLEVBQUVBLEdBQUdBLElBQUlBLENBQUNBO1lBQ2pEQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQTtnQkFDdEJBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLFNBQVNBLEVBQUVBLENBQUNBO1FBQ2pDQSxDQUFDQTs7O09BUEFIO0lBM0REQSxlQUFlQTtJQUNEQSxtQ0FBWUEsR0FBa0JBLENBQUNBLENBQUNBO0lBbUUvQ0EsNkJBQUNBO0FBQURBLENBdEVBLEFBc0VDQSxFQXRFb0MsaUJBQWlCLEVBc0VyRDtBQUVELEFBQWdDLGlCQUF2QixzQkFBc0IsQ0FBQyIsImZpbGUiOiJhbmltYXRvcnMvc3RhdGVzL1BhcnRpY2xlQmlsbGJvYXJkU3RhdGUuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1hdGhDb25zdHNcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9NYXRoQ29uc3RzXCIpO1xuaW1wb3J0IE1hdHJpeDNEXHRcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9NYXRyaXgzRFwiKTtcbmltcG9ydCBWZWN0b3IzRFx0XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vVmVjdG9yM0RcIik7XG5pbXBvcnQgT3JpZW50YXRpb24zRFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9PcmllbnRhdGlvbjNEXCIpO1xuXG5pbXBvcnQgQ2FtZXJhXHRcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZW50aXRpZXMvQ2FtZXJhXCIpO1xuXG5pbXBvcnQgU3RhZ2VcdFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1zdGFnZWdsL2xpYi9iYXNlL1N0YWdlXCIpO1xuXG5pbXBvcnQgUGFydGljbGVBbmltYXRvclx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtcmVuZGVyZXJnbC9saWIvYW5pbWF0b3JzL1BhcnRpY2xlQW5pbWF0b3JcIik7XG5pbXBvcnQgQW5pbWF0aW9uUmVnaXN0ZXJDYWNoZVx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1yZW5kZXJlcmdsL2xpYi9hbmltYXRvcnMvZGF0YS9BbmltYXRpb25SZWdpc3RlckNhY2hlXCIpO1xuaW1wb3J0IEFuaW1hdGlvblN1Ykdlb21ldHJ5XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtcmVuZGVyZXJnbC9saWIvYW5pbWF0b3JzL2RhdGEvQW5pbWF0aW9uU3ViR2VvbWV0cnlcIik7XG5pbXBvcnQgUGFydGljbGVCaWxsYm9hcmROb2RlXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLXJlbmRlcmVyZ2wvbGliL2FuaW1hdG9ycy9ub2Rlcy9QYXJ0aWNsZUJpbGxib2FyZE5vZGVcIik7XG5pbXBvcnQgUGFydGljbGVTdGF0ZUJhc2VcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1yZW5kZXJlcmdsL2xpYi9hbmltYXRvcnMvc3RhdGVzL1BhcnRpY2xlU3RhdGVCYXNlXCIpO1xuaW1wb3J0IFJlbmRlcmFibGVCYXNlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1yZW5kZXJlcmdsL2xpYi9wb29sL1JlbmRlcmFibGVCYXNlXCIpO1xuXG4vKipcbiAqIC4uLlxuICovXG5jbGFzcyBQYXJ0aWNsZUJpbGxib2FyZFN0YXRlIGV4dGVuZHMgUGFydGljbGVTdGF0ZUJhc2Vcbntcblx0LyoqIEBwcml2YXRlICovXG5cdHB1YmxpYyBzdGF0aWMgTUFUUklYX0lOREVYOm51bWJlciAvKmludCovID0gMDtcblxuXHRwcml2YXRlIF9tYXRyaXg6TWF0cml4M0QgPSBuZXcgTWF0cml4M0Q7XG5cblx0cHJpdmF0ZSBfYmlsbGJvYXJkQXhpczpWZWN0b3IzRDtcblxuXHQvKipcblx0ICpcblx0ICovXG5cdGNvbnN0cnVjdG9yKGFuaW1hdG9yOlBhcnRpY2xlQW5pbWF0b3IsIHBhcnRpY2xlTm9kZTpQYXJ0aWNsZUJpbGxib2FyZE5vZGUpXG5cdHtcblx0XHRzdXBlcihhbmltYXRvciwgcGFydGljbGVOb2RlKTtcblxuXHRcdHRoaXMuX2JpbGxib2FyZEF4aXMgPSBwYXJ0aWNsZU5vZGUuX2lCaWxsYm9hcmRBeGlzO1xuXHR9XG5cblx0cHVibGljIHNldFJlbmRlclN0YXRlKHN0YWdlOlN0YWdlLCByZW5kZXJhYmxlOlJlbmRlcmFibGVCYXNlLCBhbmltYXRpb25TdWJHZW9tZXRyeTpBbmltYXRpb25TdWJHZW9tZXRyeSwgYW5pbWF0aW9uUmVnaXN0ZXJDYWNoZTpBbmltYXRpb25SZWdpc3RlckNhY2hlLCBjYW1lcmE6Q2FtZXJhKVxuXHR7XG5cdFx0dmFyIGNvbXBzOkFycmF5PFZlY3RvcjNEPjtcblx0XHRpZiAodGhpcy5fYmlsbGJvYXJkQXhpcykge1xuXHRcdFx0dmFyIHBvczpWZWN0b3IzRCA9IHJlbmRlcmFibGUuc291cmNlRW50aXR5LnNjZW5lVHJhbnNmb3JtLnBvc2l0aW9uO1xuXHRcdFx0dmFyIGxvb2s6VmVjdG9yM0QgPSBjYW1lcmEuc2NlbmVUcmFuc2Zvcm0ucG9zaXRpb24uc3VidHJhY3QocG9zKTtcblx0XHRcdHZhciByaWdodDpWZWN0b3IzRCA9IGxvb2suY3Jvc3NQcm9kdWN0KHRoaXMuX2JpbGxib2FyZEF4aXMpO1xuXHRcdFx0cmlnaHQubm9ybWFsaXplKCk7XG5cdFx0XHRsb29rID0gdGhpcy5iaWxsYm9hcmRBeGlzLmNyb3NzUHJvZHVjdChyaWdodCk7XG5cdFx0XHRsb29rLm5vcm1hbGl6ZSgpO1xuXG5cdFx0XHQvL2NyZWF0ZSBhIHF1aWNrIGludmVyc2UgcHJvamVjdGlvbiBtYXRyaXhcblx0XHRcdHRoaXMuX21hdHJpeC5jb3B5RnJvbShyZW5kZXJhYmxlLnNvdXJjZUVudGl0eS5zY2VuZVRyYW5zZm9ybSk7XG5cdFx0XHRjb21wcyA9IHRoaXMuX21hdHJpeC5kZWNvbXBvc2UoT3JpZW50YXRpb24zRC5BWElTX0FOR0xFKTtcblx0XHRcdHRoaXMuX21hdHJpeC5jb3B5Q29sdW1uRnJvbSgwLCByaWdodCk7XG5cdFx0XHR0aGlzLl9tYXRyaXguY29weUNvbHVtbkZyb20oMSwgdGhpcy5iaWxsYm9hcmRBeGlzKTtcblx0XHRcdHRoaXMuX21hdHJpeC5jb3B5Q29sdW1uRnJvbSgyLCBsb29rKTtcblx0XHRcdHRoaXMuX21hdHJpeC5jb3B5Q29sdW1uRnJvbSgzLCBwb3MpO1xuXHRcdFx0dGhpcy5fbWF0cml4LmFwcGVuZFJvdGF0aW9uKC1jb21wc1sxXS53Kk1hdGhDb25zdHMuUkFESUFOU19UT19ERUdSRUVTLCBjb21wc1sxXSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vY3JlYXRlIGEgcXVpY2sgaW52ZXJzZSBwcm9qZWN0aW9uIG1hdHJpeFxuXHRcdFx0dGhpcy5fbWF0cml4LmNvcHlGcm9tKHJlbmRlcmFibGUuc291cmNlRW50aXR5LnNjZW5lVHJhbnNmb3JtKTtcblx0XHRcdHRoaXMuX21hdHJpeC5hcHBlbmQoY2FtZXJhLmludmVyc2VTY2VuZVRyYW5zZm9ybSk7XG5cblx0XHRcdC8vZGVjb21wb3NlIHVzaW5nIGF4aXMgYW5nbGUgcm90YXRpb25zXG5cdFx0XHRjb21wcyA9IHRoaXMuX21hdHJpeC5kZWNvbXBvc2UoT3JpZW50YXRpb24zRC5BWElTX0FOR0xFKTtcblxuXHRcdFx0Ly9yZWNyZWF0ZSB0aGUgbWF0cml4IHdpdGgganVzdCB0aGUgcm90YXRpb24gZGF0YVxuXHRcdFx0dGhpcy5fbWF0cml4LmlkZW50aXR5KCk7XG5cdFx0XHR0aGlzLl9tYXRyaXguYXBwZW5kUm90YXRpb24oLWNvbXBzWzFdLncqTWF0aENvbnN0cy5SQURJQU5TX1RPX0RFR1JFRVMsIGNvbXBzWzFdKTtcblx0XHR9XG5cblx0XHQvL3NldCBhIG5ldyBtYXRyaXggdHJhbnNmb3JtIGNvbnN0YW50XG5cdFx0YW5pbWF0aW9uUmVnaXN0ZXJDYWNoZS5zZXRWZXJ0ZXhDb25zdEZyb21NYXRyaXgoYW5pbWF0aW9uUmVnaXN0ZXJDYWNoZS5nZXRSZWdpc3RlckluZGV4KHRoaXMuX3BBbmltYXRpb25Ob2RlLCBQYXJ0aWNsZUJpbGxib2FyZFN0YXRlLk1BVFJJWF9JTkRFWCksIHRoaXMuX21hdHJpeCk7XG5cdH1cblxuXHQvKipcblx0ICogRGVmaW5lcyB0aGUgYmlsbGJvYXJkIGF4aXMuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGJpbGxib2FyZEF4aXMoKTpWZWN0b3IzRFxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuYmlsbGJvYXJkQXhpcztcblx0fVxuXG5cdHB1YmxpYyBzZXQgYmlsbGJvYXJkQXhpcyh2YWx1ZTpWZWN0b3IzRClcblx0e1xuXHRcdHRoaXMuYmlsbGJvYXJkQXhpcyA9IHZhbHVlPyB2YWx1ZS5jbG9uZSgpIDogbnVsbDtcblx0XHRpZiAodGhpcy5iaWxsYm9hcmRBeGlzKVxuXHRcdFx0dGhpcy5iaWxsYm9hcmRBeGlzLm5vcm1hbGl6ZSgpO1xuXHR9XG5cbn1cblxuZXhwb3J0ID0gUGFydGljbGVCaWxsYm9hcmRTdGF0ZTsiXX0=