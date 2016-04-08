"use strict";
var BitmapImage2D_1 = require("awayjs-core/lib/image/BitmapImage2D");
var AssetLibrary_1 = require("awayjs-core/lib/library/AssetLibrary");
var URLRequest_1 = require("awayjs-core/lib/net/URLRequest");
var LoaderEvent_1 = require("awayjs-core/lib/events/LoaderEvent");
var RequestAnimationFrame_1 = require("awayjs-core/lib/utils/RequestAnimationFrame");
var View_1 = require("awayjs-display/lib/View");
var PrimitivePlanePrefab_1 = require("awayjs-display/lib/prefabs/PrimitivePlanePrefab");
var ElementsType_1 = require("awayjs-display/lib/graphics/ElementsType");
var BasicMaterial_1 = require("awayjs-display/lib/materials/BasicMaterial");
var DefaultRenderer_1 = require("awayjs-renderergl/lib/DefaultRenderer");
var BitmapImage2DReflectionTest = (function () {
    function BitmapImage2DReflectionTest() {
        var _this = this;
        this.view = new View_1.default(new DefaultRenderer_1.default());
        this.raf = new RequestAnimationFrame_1.default(this.render, this);
        var session = AssetLibrary_1.default.getLoader();
        session.addEventListener(LoaderEvent_1.default.LOAD_COMPLETE, function (event) { return _this.onLoadComplete(event); });
        session.load(new URLRequest_1.default('assets/dots.png'));
        window.onresize = function (event) { return _this.onResize(event); };
    }
    BitmapImage2DReflectionTest.prototype.onLoadComplete = function (event) {
        var loader = event.target;
        var l = loader.baseDependency.assets.length;
        for (var c = 0; c < l; c++) {
            var asset = loader.baseDependency.assets[c];
            switch (asset.assetType) {
                case BitmapImage2D_1.default.assetType:
                    var prefab = new PrimitivePlanePrefab_1.default(null, ElementsType_1.default.TRIANGLE, 500, 500, 1, 1, false);
                    var bitmap = new BitmapImage2D_1.default(1024, 1024, true, 0x00000000);
                    var imageCanvas = document.createElement("canvas");
                    imageCanvas.width = 1024;
                    imageCanvas.height = 1024;
                    var context = imageCanvas.getContext("2d");
                    var imageData = context.getImageData(0, 0, 1024, 1024);
                    context.translate(0, 1024);
                    context.scale(1, -1);
                    context.drawImage(asset.getCanvas(), 0, 0, 1024, 1024);
                    var gradient = context.createLinearGradient(0, 0, 0, 1024);
                    gradient.addColorStop(0.8, "rgba(255, 255, 255, 1.0)");
                    gradient.addColorStop(1, "rgba(255, 255, 255, 0.5)");
                    context.fillStyle = gradient;
                    context.rect(0, 0, 1024, 1024);
                    context.globalCompositeOperation = "destination-out";
                    context.fill();
                    bitmap.draw(imageCanvas);
                    var bitmapClone = new BitmapImage2D_1.default(1024, 1024, true, 0x00000000);
                    bitmapClone.copyPixels(bitmap, bitmapClone.rect, bitmapClone.rect);
                    document.body.appendChild(bitmap.getCanvas());
                    var material = new BasicMaterial_1.default(bitmapClone);
                    material.bothSides = true;
                    material.alphaBlending = true;
                    var material2 = new BasicMaterial_1.default(asset);
                    material2.bothSides = true;
                    material2.alphaBlending = true;
                    this.reflectionSprite = prefab.getNewObject();
                    this.reflectionSprite.material = material;
                    this.view.scene.addChild(this.reflectionSprite);
                    this.fullmesh = prefab.getNewObject();
                    this.fullmesh.material = material2;
                    this.fullmesh.rotationY = 90;
                    this.view.scene.addChild(this.fullmesh);
                    break;
            }
        }
        this.raf.start();
        this.onResize();
    };
    BitmapImage2DReflectionTest.prototype.onResize = function (event) {
        if (event === void 0) { event = null; }
        this.view.x = window.innerWidth / 2;
        this.view.width = window.innerWidth / 2;
        this.view.height = window.innerHeight;
    };
    BitmapImage2DReflectionTest.prototype.render = function () {
        this.fullmesh.rotationY += .5;
        this.reflectionSprite.rotationY += .5;
        this.view.render();
    };
    return BitmapImage2DReflectionTest;
}());

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpc3BsYXkvQml0bWFwSW1hZ2UyRFJlZmxlY3Rpb25UZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSw4QkFBNkIscUNBQXFDLENBQUMsQ0FBQTtBQUNuRSw2QkFBNkIsc0NBQXNDLENBQUMsQ0FBQTtBQUdwRSwyQkFBMkIsZ0NBQWdDLENBQUMsQ0FBQTtBQUM1RCw0QkFBNEIsb0NBQW9DLENBQUMsQ0FBQTtBQUNqRSxzQ0FBbUMsNkNBQTZDLENBQUMsQ0FBQTtBQUVqRixxQkFBdUIseUJBQXlCLENBQUMsQ0FBQTtBQUVqRCxxQ0FBbUMsaURBQWlELENBQUMsQ0FBQTtBQUNyRiw2QkFBNkIsMENBQTBDLENBQUMsQ0FBQTtBQUN4RSw4QkFBNkIsNENBQTRDLENBQUMsQ0FBQTtBQUcxRSxnQ0FBK0IsdUNBQXVDLENBQUMsQ0FBQTtBQUV2RTtJQU9DO1FBUEQsaUJBbUdDO1FBMUZDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxjQUFJLENBQUMsSUFBSSx5QkFBZSxFQUFFLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksK0JBQXFCLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUV4RCxJQUFJLE9BQU8sR0FBVSxzQkFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzlDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxxQkFBVyxDQUFDLGFBQWEsRUFBRSxVQUFDLEtBQWlCLElBQUssT0FBQSxLQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxFQUExQixDQUEwQixDQUFDLENBQUM7UUFDdkcsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLG9CQUFVLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1FBRWhELE1BQU0sQ0FBQyxRQUFRLEdBQUcsVUFBQyxLQUFhLElBQUssT0FBQSxLQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFwQixDQUFvQixDQUFDO0lBQzNELENBQUM7SUFFTyxv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LENBQUMsV0FBVyxDQUFDO0lBQ3ZDLENBQUM7SUFFTyw0Q0FBTSxHQUFkO1FBRUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLElBQUcsRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLElBQUcsRUFBRSxDQUFDO1FBRXJDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUNGLGtDQUFDO0FBQUQsQ0FuR0EsQUFtR0MsSUFBQSIsImZpbGUiOiJkaXNwbGF5L0JpdG1hcEltYWdlMkRSZWZsZWN0aW9uVGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCaXRtYXBJbWFnZTJEXHRcdFx0XHRmcm9tIFwiYXdheWpzLWNvcmUvbGliL2ltYWdlL0JpdG1hcEltYWdlMkRcIjtcbmltcG9ydCBBc3NldExpYnJhcnlcdFx0XHRcdFx0ZnJvbSBcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0Fzc2V0TGlicmFyeVwiO1xuaW1wb3J0IExvYWRlclx0XHRcdFx0XHRcdGZyb20gXCJhd2F5anMtY29yZS9saWIvbGlicmFyeS9Mb2FkZXJcIjtcbmltcG9ydCBJQXNzZXRcdFx0XHRcdFx0XHRmcm9tIFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvSUFzc2V0XCI7XG5pbXBvcnQgVVJMUmVxdWVzdFx0XHRcdFx0XHRmcm9tIFwiYXdheWpzLWNvcmUvbGliL25ldC9VUkxSZXF1ZXN0XCI7XG5pbXBvcnQgTG9hZGVyRXZlbnRcdFx0XHRcdFx0ZnJvbSBcImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvTG9hZGVyRXZlbnRcIjtcbmltcG9ydCBSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcdFx0ZnJvbSBcImF3YXlqcy1jb3JlL2xpYi91dGlscy9SZXF1ZXN0QW5pbWF0aW9uRnJhbWVcIjtcblxuaW1wb3J0IFZpZXdcdFx0XHRcdFx0XHRcdGZyb20gXCJhd2F5anMtZGlzcGxheS9saWIvVmlld1wiO1xuaW1wb3J0IFNwcml0ZVx0XHRcdFx0XHRcdGZyb20gXCJhd2F5anMtZGlzcGxheS9saWIvZGlzcGxheS9TcHJpdGVcIjtcbmltcG9ydCBQcmltaXRpdmVQbGFuZVByZWZhYlx0XHRcdGZyb20gXCJhd2F5anMtZGlzcGxheS9saWIvcHJlZmFicy9QcmltaXRpdmVQbGFuZVByZWZhYlwiO1xuaW1wb3J0IEVsZW1lbnRzVHlwZVx0XHRcdFx0XHRmcm9tIFwiYXdheWpzLWRpc3BsYXkvbGliL2dyYXBoaWNzL0VsZW1lbnRzVHlwZVwiO1xuaW1wb3J0IEJhc2ljTWF0ZXJpYWxcdFx0XHRcdGZyb20gXCJhd2F5anMtZGlzcGxheS9saWIvbWF0ZXJpYWxzL0Jhc2ljTWF0ZXJpYWxcIjtcbmltcG9ydCBTaW5nbGUyRFRleHR1cmVcdFx0XHRcdGZyb20gXCJhd2F5anMtZGlzcGxheS9saWIvdGV4dHVyZXMvU2luZ2xlMkRUZXh0dXJlXCI7XG5cbmltcG9ydCBEZWZhdWx0UmVuZGVyZXJcdFx0XHRcdGZyb20gXCJhd2F5anMtcmVuZGVyZXJnbC9saWIvRGVmYXVsdFJlbmRlcmVyXCI7XG5cbmNsYXNzIEJpdG1hcEltYWdlMkRSZWZsZWN0aW9uVGVzdFxue1xuXHRwcml2YXRlIHZpZXc6Vmlldztcblx0cHJpdmF0ZSByYWY6UmVxdWVzdEFuaW1hdGlvbkZyYW1lO1xuXHRwcml2YXRlIHJlZmxlY3Rpb25TcHJpdGU6U3ByaXRlO1xuXHRwcml2YXRlIGZ1bGxtZXNoOlNwcml0ZTtcblxuXHRjb25zdHJ1Y3RvcigpXG5cdHtcblx0XHR0aGlzLnZpZXcgPSBuZXcgVmlldyhuZXcgRGVmYXVsdFJlbmRlcmVyKCkpO1xuXHRcdHRoaXMucmFmID0gbmV3IFJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnJlbmRlciwgdGhpcyk7XG5cblx0XHR2YXIgc2Vzc2lvbjpMb2FkZXIgPSBBc3NldExpYnJhcnkuZ2V0TG9hZGVyKCk7XG5cdFx0c2Vzc2lvbi5hZGRFdmVudExpc3RlbmVyKExvYWRlckV2ZW50LkxPQURfQ09NUExFVEUsIChldmVudDpMb2FkZXJFdmVudCkgPT4gdGhpcy5vbkxvYWRDb21wbGV0ZShldmVudCkpO1xuXHRcdHNlc3Npb24ubG9hZChuZXcgVVJMUmVxdWVzdCgnYXNzZXRzL2RvdHMucG5nJykpO1xuXG5cdFx0d2luZG93Lm9ucmVzaXplID0gKGV2ZW50OlVJRXZlbnQpID0+IHRoaXMub25SZXNpemUoZXZlbnQpO1xuXHR9XG5cblx0cHJpdmF0ZSBvbkxvYWRDb21wbGV0ZShldmVudDpMb2FkZXJFdmVudClcblx0e1xuXHRcdHZhciBsb2FkZXI6TG9hZGVyID0gZXZlbnQudGFyZ2V0O1xuXHRcdHZhciBsOm51bWJlciA9IGxvYWRlci5iYXNlRGVwZW5kZW5jeS5hc3NldHMubGVuZ3RoO1xuXG5cdFx0Zm9yICh2YXIgYzpudW1iZXIgPSAwOyBjIDwgbDsgYysrKSB7XG5cblx0XHRcdHZhciBhc3NldDpJQXNzZXQgPSBsb2FkZXIuYmFzZURlcGVuZGVuY3kuYXNzZXRzW2NdO1xuXG5cdFx0XHRzd2l0Y2ggKGFzc2V0LmFzc2V0VHlwZSkge1xuXHRcdFx0XHRjYXNlIEJpdG1hcEltYWdlMkQuYXNzZXRUeXBlOlxuXG5cdFx0XHRcdFx0dmFyIHByZWZhYjpQcmltaXRpdmVQbGFuZVByZWZhYiA9IG5ldyBQcmltaXRpdmVQbGFuZVByZWZhYihudWxsLCBFbGVtZW50c1R5cGUuVFJJQU5HTEUsIDUwMCAsIDUwMCwgMSwgMSwgZmFsc2UpO1xuXHRcdFx0XHRcdHZhciBiaXRtYXA6Qml0bWFwSW1hZ2UyRCA9IG5ldyBCaXRtYXBJbWFnZTJEKDEwMjQsIDEwMjQsIHRydWUsIDB4MDAwMDAwMDApO1xuXG5cdFx0XHRcdFx0dmFyIGltYWdlQ2FudmFzOkhUTUxDYW52YXNFbGVtZW50ID0gPEhUTUxDYW52YXNFbGVtZW50PiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuXHRcdFx0XHRcdGltYWdlQ2FudmFzLndpZHRoID0gMTAyNDtcblx0XHRcdFx0XHRpbWFnZUNhbnZhcy5oZWlnaHQgPSAxMDI0O1xuXHRcdFx0XHRcdHZhciBjb250ZXh0OkNhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCA9IGltYWdlQ2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblx0XHRcdFx0XHR2YXIgaW1hZ2VEYXRhOkltYWdlRGF0YSA9IGNvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIDEwMjQsIDEwMjQpO1xuXG5cdFx0XHRcdFx0Y29udGV4dC50cmFuc2xhdGUoMCwgMTAyNCk7XG5cdFx0XHRcdFx0Y29udGV4dC5zY2FsZSgxLCAtMSk7XG5cdFx0XHRcdFx0Y29udGV4dC5kcmF3SW1hZ2UoKDxCaXRtYXBJbWFnZTJEPiBhc3NldCkuZ2V0Q2FudmFzKCksIDAsIDAsIDEwMjQsIDEwMjQpO1xuXG5cdFx0XHRcdFx0dmFyIGdyYWRpZW50ID0gY29udGV4dC5jcmVhdGVMaW5lYXJHcmFkaWVudCgwLCAwLCAwLCAxMDI0KTtcblx0XHRcdFx0XHRncmFkaWVudC5hZGRDb2xvclN0b3AoMC44LCBcInJnYmEoMjU1LCAyNTUsIDI1NSwgMS4wKVwiKTtcblx0XHRcdFx0XHRncmFkaWVudC5hZGRDb2xvclN0b3AoMSwgXCJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNSlcIik7XG5cblx0XHRcdFx0XHRjb250ZXh0LmZpbGxTdHlsZSA9IGdyYWRpZW50O1xuXHRcdFx0XHRcdGNvbnRleHQucmVjdCgwLCAwLCAxMDI0LCAxMDI0KTtcblx0XHRcdFx0XHRjb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IFwiZGVzdGluYXRpb24tb3V0XCI7XG5cdFx0XHRcdFx0Y29udGV4dC5maWxsKCk7XG5cblx0XHRcdFx0XHRiaXRtYXAuZHJhdyhpbWFnZUNhbnZhcyk7XG5cblx0XHRcdFx0XHR2YXIgYml0bWFwQ2xvbmU6Qml0bWFwSW1hZ2UyRCA9IG5ldyBCaXRtYXBJbWFnZTJEKDEwMjQsIDEwMjQsIHRydWUsIDB4MDAwMDAwMDApO1xuXHRcdFx0XHRcdGJpdG1hcENsb25lLmNvcHlQaXhlbHMoYml0bWFwLCBiaXRtYXBDbG9uZS5yZWN0LCBiaXRtYXBDbG9uZS5yZWN0KTtcblxuXHRcdFx0XHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYml0bWFwLmdldENhbnZhcygpKTtcblxuXHRcdFx0XHRcdHZhciBtYXRlcmlhbDpCYXNpY01hdGVyaWFsID0gbmV3IEJhc2ljTWF0ZXJpYWwoYml0bWFwQ2xvbmUpO1xuXHRcdFx0XHRcdG1hdGVyaWFsLmJvdGhTaWRlcyA9IHRydWU7XG5cdFx0XHRcdFx0bWF0ZXJpYWwuYWxwaGFCbGVuZGluZyA9IHRydWU7XG5cblx0XHRcdFx0XHR2YXIgbWF0ZXJpYWwyOkJhc2ljTWF0ZXJpYWwgPSBuZXcgQmFzaWNNYXRlcmlhbCg8Qml0bWFwSW1hZ2UyRD4gYXNzZXQpO1xuXHRcdFx0XHRcdG1hdGVyaWFsMi5ib3RoU2lkZXMgPSB0cnVlO1xuXHRcdFx0XHRcdG1hdGVyaWFsMi5hbHBoYUJsZW5kaW5nID0gdHJ1ZTtcblxuXHRcdFx0XHRcdHRoaXMucmVmbGVjdGlvblNwcml0ZSA9IDxTcHJpdGU+IHByZWZhYi5nZXROZXdPYmplY3QoKTtcblx0XHRcdFx0XHR0aGlzLnJlZmxlY3Rpb25TcHJpdGUubWF0ZXJpYWwgPSBtYXRlcmlhbDtcblx0XHRcdFx0XHR0aGlzLnZpZXcuc2NlbmUuYWRkQ2hpbGQodGhpcy5yZWZsZWN0aW9uU3ByaXRlKTtcblxuXHRcdFx0XHRcdHRoaXMuZnVsbG1lc2ggPSA8U3ByaXRlPiBwcmVmYWIuZ2V0TmV3T2JqZWN0KCk7XG5cdFx0XHRcdFx0dGhpcy5mdWxsbWVzaC5tYXRlcmlhbCA9IG1hdGVyaWFsMjtcblx0XHRcdFx0XHR0aGlzLmZ1bGxtZXNoLnJvdGF0aW9uWSA9IDkwO1xuXHRcdFx0XHRcdHRoaXMudmlldy5zY2VuZS5hZGRDaGlsZCh0aGlzLmZ1bGxtZXNoKTtcblxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRoaXMucmFmLnN0YXJ0KCk7XG5cdFx0dGhpcy5vblJlc2l6ZSgpO1xuXHR9XG5cblx0cHJpdmF0ZSBvblJlc2l6ZShldmVudDpVSUV2ZW50ID0gbnVsbClcblx0e1xuXHRcdHRoaXMudmlldy54ID0gd2luZG93LmlubmVyV2lkdGgvMjtcblx0XHR0aGlzLnZpZXcud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aC8yO1xuXHRcdHRoaXMudmlldy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cdH1cblxuXHRwcml2YXRlIHJlbmRlcigpXG5cdHtcblx0XHR0aGlzLmZ1bGxtZXNoLnJvdGF0aW9uWSArPS41O1xuXHRcdHRoaXMucmVmbGVjdGlvblNwcml0ZS5yb3RhdGlvblkgKz0uNTtcblxuXHRcdHRoaXMudmlldy5yZW5kZXIoKTtcblx0fVxufSJdLCJzb3VyY2VSb290IjoiLi90ZXN0cyJ9