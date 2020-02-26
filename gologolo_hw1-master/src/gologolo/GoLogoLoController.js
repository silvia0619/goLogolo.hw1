import AppsterController from '../appster/AppsterController.js'
import { GoLogoLoGUIId } from './GoLogoLoConstants.js';
import { AppsterHTML, GoLogoLoCallback, AppsterGUIId } from '../appster/AppsterConstants.js';

export default class GoLogoLoController
 extends AppsterController {
    constructor() {
        super();
    }

    registerGoLogoLoEventHandlers() {
        this.registerEventHandler(GoLogoLoGUIId.GOLOGOLO_EDIT_TEXT_BUTTON, AppsterHTML.CLICK, this[GoLogoLoCallback.GOLOGOLO_PROCESS_EDIT_TEXT]);
        }

    processEditText = () => {
        
        console.log(this.model.workToEdit.text);
        console.log("processEditText", this.model);
        document.getElementById("appster_text_input_modal").style.visibility = 'visible';
        document.getElementById("appster_text_input_modal").style.opacity = 1;
        document.getElementById("appster_text_input_modal_frame").style.opacity = 1;
        document.getElementById("appster_text_input_modal_textfield").defaultValue = this.model.workToEdit.text;
        console.log(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL_TEXTFIELD, "AAAAAAAAAAAAAAAA");

        this.model.updateText();
    }

}