var Vector3D = require("awayjs-core/lib/geom/Vector3D");
var AssetLibrary = require("awayjs-core/lib/library/AssetLibrary");
var URLRequest = require("awayjs-core/lib/net/URLRequest");
var LoaderEvent = require("awayjs-core/lib/events/LoaderEvent");
var RequestAnimationFrame = require("awayjs-core/lib/utils/RequestAnimationFrame");
var View = require("awayjs-display/lib/containers/View");
var HoverController = require("awayjs-display/lib/controllers/HoverController");
var AlignmentMode = require("awayjs-display/lib/base/AlignmentMode");
var OrientationMode = require("awayjs-display/lib/base/OrientationMode");
var Billboard = require("awayjs-display/lib/entities/Billboard");
var BasicMaterial = require("awayjs-display/lib/materials/BasicMaterial");
var DefaultRenderer = require("awayjs-renderergl/lib/DefaultRenderer");
var BillboardTest = (function () {
    /**
     * Constructor
     */
    function BillboardTest() {
        this._time = 0;
        this._move = false;
        this.init();
    }
    /**
     * Global initialise function
     */
    BillboardTest.prototype.init = function () {
        this.initEngine();
        this.initListeners();
        this.loadTexture();
    };
    /**
     * Initialise the engine
     */
    BillboardTest.prototype.initEngine = function () {
        this._view = new View(new DefaultRenderer());
        //setup the camera for optimal shadow rendering
        this._view.camera.projection.far = 2100;
        //setup controller to be used on the camera
        this._cameraController = new HoverController(this._view.camera, null, 45, 20, 1000, 10);
    };
    /**
     * Initialise the listeners
     */
    BillboardTest.prototype.initListeners = function () {
        var _this = this;
        document.onmousedown = function (event) { return _this.onMouseDown(event); };
        document.onmouseup = function (event) { return _this.onMouseUp(event); };
        document.onmousemove = function (event) { return _this.onMouseMove(event); };
        window.onresize = function (event) { return _this.onResize(event); };
        this.onResize();
        this._timer = new RequestAnimationFrame(this.onEnterFrame, this);
        this._timer.start();
    };
    /**
     * start loading our texture
     */
    BillboardTest.prototype.loadTexture = function () {
        var _this = this;
        AssetLibrary.addEventListener(LoaderEvent.RESOURCE_COMPLETE, function (event) { return _this.onResourceComplete(event); });
        AssetLibrary.load(new URLRequest("assets/130909wall_big.png"));
    };
    /**
     * Navigation and render loop
     */
    BillboardTest.prototype.onEnterFrame = function (dt) {
        this._time += dt;
        this._view.render();
    };
    /**
     * Listener function for resource complete event on asset library
     */
    BillboardTest.prototype.onResourceComplete = function (event) {
        var assets = event.assets;
        var length = assets.length;
        for (var c = 0; c < length; c++) {
            var asset = assets[c];
            switch (event.url) {
                case "assets/130909wall_big.png":
                    var material = new BasicMaterial();
                    material.texture = AssetLibrary.getAsset(asset.name);
                    var s;
                    s = new Billboard(material);
                    s.pivot = new Vector3D(150, 150, 0);
                    s.width = 300;
                    s.height = 300;
                    //s.rotationX = 45;
                    s.orientationMode = OrientationMode.CAMERA_PLANE;
                    s.alignmentMode = AlignmentMode.PIVOT_POINT;
                    this._view.scene.addChild(s);
                    for (var c = 0; c < 100; c++) {
                        var size = this.getRandom(5, 50);
                        s = new Billboard(material);
                        s.pivot = new Vector3D(size / 2, size / 2, 0);
                        s.width = size;
                        s.height = size;
                        s.orientationMode = OrientationMode.CAMERA_PLANE;
                        s.alignmentMode = AlignmentMode.PIVOT_POINT;
                        s.x = this.getRandom(-400, 400);
                        s.y = this.getRandom(-400, 400);
                        s.z = this.getRandom(-400, 400);
                        this._view.scene.addChild(s);
                    }
                    this._timer.start();
                    break;
            }
        }
    };
    /**
     * Mouse down listener for navigation
     */
    BillboardTest.prototype.onMouseDown = function (event) {
        this._lastPanAngle = this._cameraController.panAngle;
        this._lastTiltAngle = this._cameraController.tiltAngle;
        this._lastMouseX = event.clientX;
        this._lastMouseY = event.clientY;
        this._move = true;
    };
    /**
     * Mouse up listener for navigation
     */
    BillboardTest.prototype.onMouseUp = function (event) {
        this._move = false;
    };
    /**
     *
     * @param event
     */
    BillboardTest.prototype.onMouseMove = function (event) {
        if (this._move) {
            this._cameraController.panAngle = 0.3 * (event.clientX - this._lastMouseX) + this._lastPanAngle;
            this._cameraController.tiltAngle = 0.3 * (event.clientY - this._lastMouseY) + this._lastTiltAngle;
        }
    };
    /**
     * stage listener for resize events
     */
    BillboardTest.prototype.onResize = function (event) {
        if (event === void 0) { event = null; }
        this._view.y = 0;
        this._view.x = 0;
        this._view.width = window.innerWidth;
        this._view.height = window.innerHeight;
    };
    /**
     * Util function - getRandom Number
     */
    BillboardTest.prototype.getRandom = function (min, max) {
        return Math.random() * (max - min) + min;
    };
    return BillboardTest;
})();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVudGl0aWVzL2JpbGxib2FyZHRlc3QudHMiXSwibmFtZXMiOlsiQmlsbGJvYXJkVGVzdCIsIkJpbGxib2FyZFRlc3QuY29uc3RydWN0b3IiLCJCaWxsYm9hcmRUZXN0LmluaXQiLCJCaWxsYm9hcmRUZXN0LmluaXRFbmdpbmUiLCJCaWxsYm9hcmRUZXN0LmluaXRMaXN0ZW5lcnMiLCJCaWxsYm9hcmRUZXN0LmxvYWRUZXh0dXJlIiwiQmlsbGJvYXJkVGVzdC5vbkVudGVyRnJhbWUiLCJCaWxsYm9hcmRUZXN0Lm9uUmVzb3VyY2VDb21wbGV0ZSIsIkJpbGxib2FyZFRlc3Qub25Nb3VzZURvd24iLCJCaWxsYm9hcmRUZXN0Lm9uTW91c2VVcCIsIkJpbGxib2FyZFRlc3Qub25Nb3VzZU1vdmUiLCJCaWxsYm9hcmRUZXN0Lm9uUmVzaXplIiwiQmlsbGJvYXJkVGVzdC5nZXRSYW5kb20iXSwibWFwcGluZ3MiOiJBQUFBLElBQU8sUUFBUSxXQUFnQiwrQkFBK0IsQ0FBQyxDQUFDO0FBQ2hFLElBQU8sWUFBWSxXQUFlLHNDQUFzQyxDQUFDLENBQUM7QUFHMUUsSUFBTyxVQUFVLFdBQWUsZ0NBQWdDLENBQUMsQ0FBQztBQUNsRSxJQUFPLFdBQVcsV0FBZSxvQ0FBb0MsQ0FBQyxDQUFDO0FBRXZFLElBQU8scUJBQXFCLFdBQVksNkNBQTZDLENBQUMsQ0FBQztBQUV2RixJQUFPLElBQUksV0FBaUIsb0NBQW9DLENBQUMsQ0FBQztBQUNsRSxJQUFPLGVBQWUsV0FBYyxnREFBZ0QsQ0FBQyxDQUFDO0FBQ3RGLElBQU8sYUFBYSxXQUFjLHVDQUF1QyxDQUFDLENBQUM7QUFDM0UsSUFBTyxlQUFlLFdBQWMseUNBQXlDLENBQUMsQ0FBQztBQUMvRSxJQUFPLFNBQVMsV0FBZSx1Q0FBdUMsQ0FBQyxDQUFDO0FBRXhFLElBQU8sYUFBYSxXQUFjLDRDQUE0QyxDQUFDLENBQUM7QUFFaEYsSUFBTyxlQUFlLFdBQWMsdUNBQXVDLENBQUMsQ0FBQztBQUU3RSxJQUFNLGFBQWE7SUFl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QWFBLEdBQUdBLGFBQWFBLENBQUNBLFdBQVdBLENBQUNBO29CQUU1Q0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBRTdCQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFVQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxHQUFHQSxFQUFFQSxDQUFDQSxFQUFHQSxFQUFFQSxDQUFDQTt3QkFDdENBLElBQUlBLElBQUlBLEdBQVVBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLEVBQUdBLEVBQUVBLENBQUNBLENBQUNBO3dCQUN6Q0EsQ0FBQ0EsR0FBR0EsSUFBSUEsU0FBU0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0E7d0JBQzVCQSxDQUFDQSxDQUFDQSxLQUFLQSxHQUFHQSxJQUFJQSxRQUFRQSxDQUFDQSxJQUFJQSxHQUFDQSxDQUFDQSxFQUFFQSxJQUFJQSxHQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFDMUNBLENBQUNBLENBQUNBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBO3dCQUNmQSxDQUFDQSxDQUFDQSxNQUFNQSxHQUFHQSxJQUFJQSxDQUFDQTt3QkFDaEJBLENBQUNBLENBQUNBLGVBQWVBLEdBQUdBLGVBQWVBLENBQUNBLFlBQVlBLENBQUNBO3dCQUNqREEsQ0FBQ0EsQ0FBQ0EsYUFBYUEsR0FBR0EsYUFBYUEsQ0FBQ0EsV0FBV0EsQ0FBQ0E7d0JBQzNDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFJQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFHQSxHQUFHQSxDQUFDQSxDQUFDQTt3QkFDbENBLENBQUNBLENBQUNBLENBQUNBLEdBQUlBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLEdBQUdBLEVBQUdBLEdBQUdBLENBQUNBLENBQUNBO3dCQUNsQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBSUEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7d0JBQ25DQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxLQUFLQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDOUJBLENBQUNBO29CQUVEQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQTtvQkFDcEJBLEtBQUtBLENBQUNBO1lBQ1JBLENBQUNBO1FBQ0ZBLENBQUNBO0lBQ0ZBLENBQUNBO0lBRURQOztPQUVHQTtJQUNLQSxtQ0FBV0EsR0FBbkJBLFVBQW9CQSxLQUFnQkE7UUFFbkNRLElBQUlBLENBQUNBLGFBQWFBLEdBQUdBLElBQUlBLENBQUNBLGlCQUFpQkEsQ0FBQ0EsUUFBUUEsQ0FBQ0E7UUFDckRBLElBQUlBLENBQUNBLGNBQWNBLEdBQUdBLElBQUlBLENBQUNBLGlCQUFpQkEsQ0FBQ0EsU0FBU0EsQ0FBQ0E7UUFDdkRBLElBQUlBLENBQUNBLFdBQVdBLEdBQUdBLEtBQUtBLENBQUNBLE9BQU9BLENBQUNBO1FBQ2pDQSxJQUFJQSxDQUFDQSxXQUFXQSxHQUFHQSxLQUFLQSxDQUFDQSxPQUFPQSxDQUFDQTtRQUNqQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsSUFBSUEsQ0FBQ0E7SUFDbkJBLENBQUNBO0lBRURSOztPQUVHQTtJQUNLQSxpQ0FBU0EsR0FBakJBLFVBQWtCQSxLQUFnQkE7UUFFakNTLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLEtBQUtBLENBQUNBO0lBQ3BCQSxDQUFDQTtJQUVEVDs7O09BR0dBO0lBQ0tBLG1DQUFXQSxHQUFuQkEsVUFBb0JBLEtBQWdCQTtRQUVuQ1UsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDaEJBLElBQUlBLENBQUNBLGlCQUFpQkEsQ0FBQ0EsUUFBUUEsR0FBR0EsR0FBR0EsR0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsT0FBT0EsR0FBR0EsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0E7WUFDOUZBLElBQUlBLENBQUNBLGlCQUFpQkEsQ0FBQ0EsU0FBU0EsR0FBR0EsR0FBR0EsR0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsT0FBT0EsR0FBR0EsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0E7UUFDakdBLENBQUNBO0lBQ0ZBLENBQUNBO0lBRURWOztPQUVHQTtJQUNLQSxnQ0FBUUEsR0FBaEJBLFVBQWlCQSxLQUFvQkE7UUFBcEJXLHFCQUFvQkEsR0FBcEJBLFlBQW9CQTtRQUVwQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7UUFDakJBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1FBQ2pCQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxLQUFLQSxHQUFHQSxNQUFNQSxDQUFDQSxVQUFVQSxDQUFDQTtRQUNyQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsTUFBTUEsR0FBR0EsTUFBTUEsQ0FBQ0EsV0FBV0EsQ0FBQ0E7SUFDeENBLENBQUNBO0lBRURYOztPQUVHQTtJQUNLQSxpQ0FBU0EsR0FBakJBLFVBQWtCQSxHQUFVQSxFQUFFQSxHQUFVQTtRQUV2Q1ksTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsRUFBRUEsR0FBQ0EsQ0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsQ0FBQ0EsR0FBR0EsR0FBR0EsQ0FBQ0E7SUFDeENBLENBQUNBO0lBQ0ZaLG9CQUFDQTtBQUFEQSxDQXRMQSxBQXNMQ0EsSUFBQSIsImZpbGUiOiJlbnRpdGllcy9CaWxsYm9hcmRUZXN0LmpzIiwic291cmNlUm9vdCI6Ii4vdGVzdHMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVmVjdG9yM0RcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9WZWN0b3IzRFwiKTtcbmltcG9ydCBBc3NldExpYnJhcnlcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvQXNzZXRMaWJyYXJ5XCIpO1xuaW1wb3J0IElBc3NldFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0lBc3NldFwiKTtcbmltcG9ydCBVUkxMb2FkZXJcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL25ldC9VUkxMb2FkZXJcIik7XG5pbXBvcnQgVVJMUmVxdWVzdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbmV0L1VSTFJlcXVlc3RcIik7XG5pbXBvcnQgTG9hZGVyRXZlbnRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2V2ZW50cy9Mb2FkZXJFdmVudFwiKTtcbmltcG9ydCBUZXh0dXJlMkRCYXNlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvdGV4dHVyZXMvVGV4dHVyZTJEQmFzZVwiKTtcbmltcG9ydCBSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL3V0aWxzL1JlcXVlc3RBbmltYXRpb25GcmFtZVwiKTtcblxuaW1wb3J0IFZpZXdcdFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9jb250YWluZXJzL1ZpZXdcIik7XG5pbXBvcnQgSG92ZXJDb250cm9sbGVyXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvY29udHJvbGxlcnMvSG92ZXJDb250cm9sbGVyXCIpO1xuaW1wb3J0IEFsaWdubWVudE1vZGVcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0FsaWdubWVudE1vZGVcIik7XG5pbXBvcnQgT3JpZW50YXRpb25Nb2RlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9PcmllbnRhdGlvbk1vZGVcIik7XG5pbXBvcnQgQmlsbGJvYXJkXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9CaWxsYm9hcmRcIik7XG5pbXBvcnQgTWVzaFx0XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2VudGl0aWVzL01lc2hcIik7XG5pbXBvcnQgQmFzaWNNYXRlcmlhbFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL21hdGVyaWFscy9CYXNpY01hdGVyaWFsXCIpO1xuXG5pbXBvcnQgRGVmYXVsdFJlbmRlcmVyXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtcmVuZGVyZXJnbC9saWIvRGVmYXVsdFJlbmRlcmVyXCIpO1xuXG5jbGFzcyBCaWxsYm9hcmRUZXN0XG57XG5cdC8vZW5naW5lIHZhcmlhYmxlc1xuXHRwcml2YXRlIF92aWV3OlZpZXc7XG5cdHByaXZhdGUgX2NhbWVyYUNvbnRyb2xsZXI6SG92ZXJDb250cm9sbGVyO1xuXG5cdC8vbmF2aWdhdGlvbiB2YXJpYWJsZXNcblx0cHJpdmF0ZSBfdGltZXI6UmVxdWVzdEFuaW1hdGlvbkZyYW1lO1xuXHRwcml2YXRlIF90aW1lOm51bWJlciA9IDA7XG5cdHByaXZhdGUgX21vdmU6Ym9vbGVhbiA9IGZhbHNlO1xuXHRwcml2YXRlIF9sYXN0UGFuQW5nbGU6bnVtYmVyO1xuXHRwcml2YXRlIF9sYXN0VGlsdEFuZ2xlOm51bWJlcjtcblx0cHJpdmF0ZSBfbGFzdE1vdXNlWDpudW1iZXI7XG5cdHByaXZhdGUgX2xhc3RNb3VzZVk6bnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBDb25zdHJ1Y3RvclxuXHQgKi9cblx0Y29uc3RydWN0b3IoKVxuXHR7XG5cdFx0dGhpcy5pbml0KCk7XG5cdH1cblxuXHQvKipcblx0ICogR2xvYmFsIGluaXRpYWxpc2UgZnVuY3Rpb25cblx0ICovXG5cdHByaXZhdGUgaW5pdCgpOnZvaWRcblx0e1xuXHRcdHRoaXMuaW5pdEVuZ2luZSgpO1xuXHRcdHRoaXMuaW5pdExpc3RlbmVycygpO1xuXHRcdHRoaXMubG9hZFRleHR1cmUoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXNlIHRoZSBlbmdpbmVcblx0ICovXG5cdHByaXZhdGUgaW5pdEVuZ2luZSgpOnZvaWRcblx0e1xuXHRcdHRoaXMuX3ZpZXcgPSBuZXcgVmlldyhuZXcgRGVmYXVsdFJlbmRlcmVyKCkpO1xuXG5cdFx0Ly9zZXR1cCB0aGUgY2FtZXJhIGZvciBvcHRpbWFsIHNoYWRvdyByZW5kZXJpbmdcblx0XHR0aGlzLl92aWV3LmNhbWVyYS5wcm9qZWN0aW9uLmZhciA9IDIxMDA7XG5cblx0XHQvL3NldHVwIGNvbnRyb2xsZXIgdG8gYmUgdXNlZCBvbiB0aGUgY2FtZXJhXG5cdFx0dGhpcy5fY2FtZXJhQ29udHJvbGxlciA9IG5ldyBIb3ZlckNvbnRyb2xsZXIodGhpcy5fdmlldy5jYW1lcmEsIG51bGwsIDQ1LCAyMCwgMTAwMCwgMTApO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpc2UgdGhlIGxpc3RlbmVyc1xuXHQgKi9cblx0cHJpdmF0ZSBpbml0TGlzdGVuZXJzKCk6dm9pZFxuXHR7XG5cdFx0ZG9jdW1lbnQub25tb3VzZWRvd24gPSAoZXZlbnQ6TW91c2VFdmVudCkgPT4gdGhpcy5vbk1vdXNlRG93bihldmVudCk7XG5cdFx0ZG9jdW1lbnQub25tb3VzZXVwID0gKGV2ZW50Ok1vdXNlRXZlbnQpID0+IHRoaXMub25Nb3VzZVVwKGV2ZW50KTtcblx0XHRkb2N1bWVudC5vbm1vdXNlbW92ZSA9IChldmVudDpNb3VzZUV2ZW50KSA9PiB0aGlzLm9uTW91c2VNb3ZlKGV2ZW50KTtcblxuXHRcdHdpbmRvdy5vbnJlc2l6ZSAgPSAoZXZlbnQ6VUlFdmVudCkgPT4gdGhpcy5vblJlc2l6ZShldmVudCk7XG5cblx0XHR0aGlzLm9uUmVzaXplKCk7XG5cblx0XHR0aGlzLl90aW1lciA9IG5ldyBSZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5vbkVudGVyRnJhbWUsIHRoaXMpO1xuXHRcdHRoaXMuX3RpbWVyLnN0YXJ0KCk7XG5cdH1cblxuXHQvKipcblx0ICogc3RhcnQgbG9hZGluZyBvdXIgdGV4dHVyZVxuXHQgKi9cblx0cHJpdmF0ZSBsb2FkVGV4dHVyZSgpOnZvaWRcblx0e1xuXHRcdEFzc2V0TGlicmFyeS5hZGRFdmVudExpc3RlbmVyKExvYWRlckV2ZW50LlJFU09VUkNFX0NPTVBMRVRFLCAoZXZlbnQ6TG9hZGVyRXZlbnQpID0+IHRoaXMub25SZXNvdXJjZUNvbXBsZXRlKGV2ZW50KSk7XG5cdFx0QXNzZXRMaWJyYXJ5LmxvYWQobmV3IFVSTFJlcXVlc3QoXCJhc3NldHMvMTMwOTA5d2FsbF9iaWcucG5nXCIpKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBOYXZpZ2F0aW9uIGFuZCByZW5kZXIgbG9vcFxuXHQgKi9cblx0cHJpdmF0ZSBvbkVudGVyRnJhbWUoZHQ6bnVtYmVyKTp2b2lkXG5cdHtcblx0XHR0aGlzLl90aW1lICs9IGR0O1xuXG5cdFx0dGhpcy5fdmlldy5yZW5kZXIoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBMaXN0ZW5lciBmdW5jdGlvbiBmb3IgcmVzb3VyY2UgY29tcGxldGUgZXZlbnQgb24gYXNzZXQgbGlicmFyeVxuXHQgKi9cblx0cHJpdmF0ZSBvblJlc291cmNlQ29tcGxldGUoZXZlbnQ6TG9hZGVyRXZlbnQpXG5cdHtcblx0XHR2YXIgYXNzZXRzOkFycmF5PElBc3NldD4gPSBldmVudC5hc3NldHM7XG5cdFx0dmFyIGxlbmd0aDpudW1iZXIgPSBhc3NldHMubGVuZ3RoO1xuXG5cdFx0Zm9yICh2YXIgYzpudW1iZXIgPSAwOyBjIDwgbGVuZ3RoOyBjICsrKSB7XG5cdFx0XHR2YXIgYXNzZXQ6SUFzc2V0ID0gYXNzZXRzW2NdO1xuXG5cdFx0XHRzd2l0Y2goZXZlbnQudXJsKSB7XG5cblx0XHRcdFx0Y2FzZSBcImFzc2V0cy8xMzA5MDl3YWxsX2JpZy5wbmdcIjpcblxuXHRcdFx0XHRcdHZhciBtYXRlcmlhbDpCYXNpY01hdGVyaWFsID0gbmV3IEJhc2ljTWF0ZXJpYWwoKTtcblx0XHRcdFx0XHRcdG1hdGVyaWFsLnRleHR1cmUgPSA8VGV4dHVyZTJEQmFzZT4gQXNzZXRMaWJyYXJ5LmdldEFzc2V0KGFzc2V0Lm5hbWUpO1xuXG5cdFx0XHRcdFx0dmFyIHM6QmlsbGJvYXJkO1xuXHRcdFx0XHRcdFx0cyA9IG5ldyBCaWxsYm9hcmQobWF0ZXJpYWwpO1xuXHRcdFx0XHRcdFx0cy5waXZvdCA9IG5ldyBWZWN0b3IzRCgxNTAsIDE1MCwgMCk7XG5cdFx0XHRcdFx0XHRzLndpZHRoID0gMzAwO1xuXHRcdFx0XHRcdFx0cy5oZWlnaHQgPSAzMDA7XG5cdFx0XHRcdFx0XHQvL3Mucm90YXRpb25YID0gNDU7XG5cdFx0XHRcdFx0cy5vcmllbnRhdGlvbk1vZGUgPSBPcmllbnRhdGlvbk1vZGUuQ0FNRVJBX1BMQU5FO1xuXHRcdFx0XHRcdHMuYWxpZ25tZW50TW9kZSA9IEFsaWdubWVudE1vZGUuUElWT1RfUE9JTlQ7XG5cblx0XHRcdFx0XHR0aGlzLl92aWV3LnNjZW5lLmFkZENoaWxkKHMpO1xuXG5cdFx0XHRcdFx0Zm9yICh2YXIgYzpudW1iZXIgPSAwOyBjIDwgMTAwOyBjICsrKSB7XG5cdFx0XHRcdFx0XHR2YXIgc2l6ZTpudW1iZXIgPSB0aGlzLmdldFJhbmRvbSg1ICwgNTApO1xuXHRcdFx0XHRcdFx0cyA9IG5ldyBCaWxsYm9hcmQobWF0ZXJpYWwpO1xuXHRcdFx0XHRcdFx0cy5waXZvdCA9IG5ldyBWZWN0b3IzRChzaXplLzIsIHNpemUvMiwgMCk7XG5cdFx0XHRcdFx0XHRzLndpZHRoID0gc2l6ZTtcblx0XHRcdFx0XHRcdHMuaGVpZ2h0ID0gc2l6ZTtcblx0XHRcdFx0XHRcdHMub3JpZW50YXRpb25Nb2RlID0gT3JpZW50YXRpb25Nb2RlLkNBTUVSQV9QTEFORTtcblx0XHRcdFx0XHRcdHMuYWxpZ25tZW50TW9kZSA9IEFsaWdubWVudE1vZGUuUElWT1RfUE9JTlQ7XG5cdFx0XHRcdFx0XHRcdHMueCA9ICB0aGlzLmdldFJhbmRvbSgtNDAwICwgNDAwKTtcblx0XHRcdFx0XHRcdFx0cy55ID0gIHRoaXMuZ2V0UmFuZG9tKC00MDAgLCA0MDApO1xuXHRcdFx0XHRcdFx0XHRzLnogPSAgdGhpcy5nZXRSYW5kb20oLTQwMCAsIDQwMCk7XG5cdFx0XHRcdFx0XHR0aGlzLl92aWV3LnNjZW5lLmFkZENoaWxkKHMpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHRoaXMuX3RpbWVyLnN0YXJ0KCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIE1vdXNlIGRvd24gbGlzdGVuZXIgZm9yIG5hdmlnYXRpb25cblx0ICovXG5cdHByaXZhdGUgb25Nb3VzZURvd24oZXZlbnQ6TW91c2VFdmVudCk6dm9pZFxuXHR7XG5cdFx0dGhpcy5fbGFzdFBhbkFuZ2xlID0gdGhpcy5fY2FtZXJhQ29udHJvbGxlci5wYW5BbmdsZTtcblx0XHR0aGlzLl9sYXN0VGlsdEFuZ2xlID0gdGhpcy5fY2FtZXJhQ29udHJvbGxlci50aWx0QW5nbGU7XG5cdFx0dGhpcy5fbGFzdE1vdXNlWCA9IGV2ZW50LmNsaWVudFg7XG5cdFx0dGhpcy5fbGFzdE1vdXNlWSA9IGV2ZW50LmNsaWVudFk7XG5cdFx0dGhpcy5fbW92ZSA9IHRydWU7XG5cdH1cblxuXHQvKipcblx0ICogTW91c2UgdXAgbGlzdGVuZXIgZm9yIG5hdmlnYXRpb25cblx0ICovXG5cdHByaXZhdGUgb25Nb3VzZVVwKGV2ZW50Ok1vdXNlRXZlbnQpOnZvaWRcblx0e1xuXHRcdHRoaXMuX21vdmUgPSBmYWxzZTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKiBAcGFyYW0gZXZlbnRcblx0ICovXG5cdHByaXZhdGUgb25Nb3VzZU1vdmUoZXZlbnQ6TW91c2VFdmVudClcblx0e1xuXHRcdGlmICh0aGlzLl9tb3ZlKSB7XG5cdFx0XHR0aGlzLl9jYW1lcmFDb250cm9sbGVyLnBhbkFuZ2xlID0gMC4zKihldmVudC5jbGllbnRYIC0gdGhpcy5fbGFzdE1vdXNlWCkgKyB0aGlzLl9sYXN0UGFuQW5nbGU7XG5cdFx0XHR0aGlzLl9jYW1lcmFDb250cm9sbGVyLnRpbHRBbmdsZSA9IDAuMyooZXZlbnQuY2xpZW50WSAtIHRoaXMuX2xhc3RNb3VzZVkpICsgdGhpcy5fbGFzdFRpbHRBbmdsZTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogc3RhZ2UgbGlzdGVuZXIgZm9yIHJlc2l6ZSBldmVudHNcblx0ICovXG5cdHByaXZhdGUgb25SZXNpemUoZXZlbnQ6VUlFdmVudCA9IG51bGwpOnZvaWRcblx0e1xuXHRcdHRoaXMuX3ZpZXcueSA9IDA7XG5cdFx0dGhpcy5fdmlldy54ID0gMDtcblx0XHR0aGlzLl92aWV3LndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG5cdFx0dGhpcy5fdmlldy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cdH1cblxuXHQvKipcblx0ICogVXRpbCBmdW5jdGlvbiAtIGdldFJhbmRvbSBOdW1iZXJcblx0ICovXG5cdHByaXZhdGUgZ2V0UmFuZG9tKG1pbjpudW1iZXIsIG1heDpudW1iZXIpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIE1hdGgucmFuZG9tKCkqKG1heCAtIG1pbikgKyBtaW47XG5cdH1cbn0iXX0=