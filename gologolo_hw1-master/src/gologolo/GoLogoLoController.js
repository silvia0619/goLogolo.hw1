import AppsterController from '../appster/AppsterController.js'
import { GoLogoLoGUIId, GoLogoLoCallback } from './GoLogoLoConstants.js';
import { AppsterHTML } from '../appster/AppsterConstants.js';

export default class GoLogoLoController
 extends AppsterController {
    constructor() {
        super();
    }

    registerGoLogoLoEventHandlers() {
        this.registerEventHandler(GoLogoLoGUIId.GOLOGOLO_EDIT_TEXT_BUTTON, AppsterHTML.CLICK, this[GoLogoLoCallback.GOLOGOLO_PROCESS_EDIT_TEXT]);
        this.registerEventHandler(GoLogoLoGUIId.GOLOGOLO_FONT_SIZE_SLIDER, AppsterHTML.INPUT, this[GoLogoLoCallback.GOLOGOLO_PROCESS_EDIT_SIZE]);
        this.registerEventHandler(GoLogoLoGUIId.GOLOGOLO_TEXT_COLOR_PICKER, AppsterHTML.INPUT, this[GoLogoLoCallback.GOLOGOLO_PROCESS_TEXT_COLOR_PICKER]);
        this.registerEventHandler(GoLogoLoGUIId.GOLOGOLO_BACKGROUND_COLOR_PICKER, AppsterHTML.INPUT, this[GoLogoLoCallback.GOLOGOLO_PROCESS_BACKGROUND_COLOR_PICKER]);
        this.registerEventHandler(GoLogoLoGUIId.GOLOGOLO_BORDER_COLOR_PICKER, AppsterHTML.INPUT, this[GoLogoLoCallback.GOLOGOLO_PROCESS_BORDER_COLOR_PICKER]);

    }

    processEditText = () => {
        console.log("processEditText", this.model);
        document.getElementById("appster_text_input_modal").style.visibility = 'visible';
        document.getElementById("appster_text_input_modal").style.opacity = 1;
        document.getElementById("appster_text_input_modal_frame").style.opacity = 1;
        document.getElementById("appster_text_input_modal_textfield").defaultValue = this.model.workToEdit.text;
        this.model.updateText();
    }

    processEditSize = () => {
        this.model.workToEdit.setFontSize(document.getElementById(GoLogoLoGUIId.GOLOGOLO_FONT_SIZE_SLIDER).value + "px");
        this.model.view.loadWork(this.model.workToEdit);
    }

    processTextColorPicker = () => {
        this.model.workToEdit.setTextColor(document.getElementById(GoLogoLoGUIId.GOLOGOLO_TEXT_COLOR_PICKER).value);
        this.model.view.loadWork(this.model.workToEdit);
    }

    processBackgroundColorPicker = () => {
        this.model.workToEdit.setBackgroundColor(document.getElementById(GoLogoLoGUIId.GOLOGOLO_BACKGROUND_COLOR_PICKER).value);
        this.model.view.loadWork(this.model.workToEdit);
    }

    processBorderColorPicker = () => {
        this.model.workToEdit.setBorderColor(document.getElementById(GoLogoLoGUIId.GOLOGOLO_BORDER_COLOR_PICKER).value);
        this.model.view.loadWork(this.model.workToEdit);
    } 

}