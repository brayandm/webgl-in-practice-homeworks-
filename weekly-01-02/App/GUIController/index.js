import GUI from "lil-gui";

export default class GUIController {
    constructor(
        onHelpersChange = () => {},
        onOrbitControllsChange = () => {},
        onPostprocessingChange = () => {},
        onPostprocessingCrazyChange = () => {},
        onLowPolyModelChange = () => {}
    ) {
        this._onHelpersChange = onHelpersChange;
        this._onOrbitControllsChange = onOrbitControllsChange;
        this._onPostprocessingChange = onPostprocessingChange;
        this._onPostprocessingCrazyChange = onPostprocessingCrazyChange;
        this._onLowPolyModelChange = onLowPolyModelChange;

        this.gui = new GUI();
        this.init();
    }

    init() {
        this.gui
            .add({ lowpolymodel: true }, "lowpolymodel")
            .name("Low Poly Model")
            .onChange(this._onLowPolyModelChange);

        this.gui
            .add({ helpers: false }, "helpers")
            .name("Helpers")
            .onChange(this._onHelpersChange);

        this.gui
            .add({ orbitControls: false }, "orbitControls")
            .name("Orbit Controls")
            .onChange(this._onOrbitControllsChange);

        this.gui
            .add({ postprocessing: true }, "postprocessing")
            .name("Postprocessing")
            .onChange(this._onPostprocessingChange);

        this.gui
            .add({ postprocessingCrazy: false }, "postprocessingCrazy")
            .name("Postprocessing Crazy")
            .onChange(this._onPostprocessingCrazyChange);
    }
}
