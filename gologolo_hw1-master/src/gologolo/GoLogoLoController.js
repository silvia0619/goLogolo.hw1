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
        this.registerEventHandler(GoLogoLoGUIId.GOLOGOLO_BORDER_RADIUS_SLIDER, AppsterHTML.INPUT, this[GoLogoLoCallback.GOLOGOLO_PROCESS_BORDER_RADIUS_SLIDER]);
        this.registerEventHandler(GoLogoLoGUIId.GOLOGOLO_BORDER_THICKNESS_SLIDER, AppsterHTML.INPUT, this[GoLogoLoCallback.GOLOGOLO_PROCESS_BORDER_THICKNESS_SLIDER]);
        this.registerEventHandler(GoLogoLoGUIId.GOLOGOLO_PADDING_SLIDER, AppsterHTML.INPUT, this[GoLogoLoCallback.GOLOGOLO_PROCESS_PADDING_SLIDER]);
        this.registerEventHandler(GoLogoLoGUIId.GOLOGOLO_MARGIN_SLIDER, AppsterHTML.INPUT, this[GoLogoLoCallback.GOLOGOLO_PROCESS_MARGIN_SLIDER]);
        this.registerEventHandler(GoLogoLoGUIId.GOLOGOLO_TEXT_INPUT_MODAL_CANCEL_BUTTON,AppsterHTML.CLICK, this[GoLogoLoCallback.GOLOGOLO_PROCESS_CANCEL_BUTTON]);
        this.registerEventHandler(GoLogoLoGUIId.GOLOGOLO_TEXT_INPUT_MODAL_ENTER_BUTTON,AppsterHTML.CLICK, this[GoLogoLoCallback.GOLOGOLO_PROCESS_ENTER_BUTTON]);
    
    }

    processEnterButtonLogo = () => {
        console.log("process enter butoon logo", document.getElementById(GoLogoLoGUIId.GOLOGOLO_TEXT_INPUT_MODAL_TEXTFIELD).value);
        this.model.workToEdit.setText(document.getElementById(GoLogoLoGUIId.GOLOGOLO_TEXT_INPUT_MODAL_TEXTFIELD).value);
        //console.log("this.model.workToEdit.getText()", this.model.workToEdit.getText());
        this.model.view.loadWork(this.model.workToEdit);
        this.processCancelButtonLogo();
    

    }

    processCancelButtonLogo(){
        document.getElementById(GoLogoLoGUIId.GOLOGOLO_TEXT_INPUT_MODAL).style.visibility = 'hidden';
        document.getElementById(GoLogoLoGUIId.GOLOGOLO_TEXT_INPUT_MODAL).style.opacity = 0;
        document.getElementById(GoLogoLoGUIId.GOLOGOLO_TEXT_INPUT_MODAL_FRAME).style.opacity = 0;
    }

    processEditText = () => {
        console.log("processEditText", this.model);
        document.getElementById(GoLogoLoGUIId.GOLOGOLO_TEXT_INPUT_MODAL).style.visibility = 'visible';
        document.getElementById(GoLogoLoGUIId.GOLOGOLO_TEXT_INPUT_MODAL).style.opacity = 1;
        document.getElementById(GoLogoLoGUIId.GOLOGOLO_TEXT_INPUT_MODAL_FRAME).style.opacity = 1;
        document.getElementById(GoLogoLoGUIId.GOLOGOLO_TEXT_INPUT_MODAL_TEXTFIELD).defaultValue = this.model.workToEdit.text;
        this.model.updateText();
    }

    processEditSize = () => {
        this.model.workToEdit.setFontSize(document.getElementById(GoLogoLoGUIId.GOLOGOLO_FONT_SIZE_SLIDER).value + "px");
        document.getElementById(GoLogoLoGUIId.GOLOGOLO_TEXT).style.fontSize = this.model.workToEdit.getFontSize();
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

    processBorderRadiusSlider = () => {
        this.model.workToEdit.setBorderRadius(document.getElementById(GoLogoLoGUIId.GOLOGOLO_BORDER_RADIUS_SLIDER).value + "px");
        document.getElementById(GoLogoLoGUIId.GOLOGOLO_TEXT).style.borderRadius = this.model.workToEdit.getBorderRadius();
    } 

    processBorderThicknessSlider = () => {
        this.model.workToEdit.setBorderThickness(document.getElementById(GoLogoLoGUIId.GOLOGOLO_BORDER_THICKNESS_SLIDER).value + "px");
        
        document.getElementById(GoLogoLoGUIId.GOLOGOLO_TEXT).style.borderWidth = this.model.workToEdit.getBorderThickness();
    } 

    processPaddingSlider = () => {
        this.model.workToEdit.setPadding(document.getElementById(GoLogoLoGUIId.GOLOGOLO_PADDING_SLIDER).value + "px");
        document.getElementById(GoLogoLoGUIId.GOLOGOLO_TEXT).style.padding = this.model.workToEdit.getPadding();
    } 

    processMarginSlider = () => {
        this.model.workToEdit.setMargin(document.getElementById(GoLogoLoGUIId.GOLOGOLO_MARGIN_SLIDER).value + "px");
        document.getElementById(GoLogoLoGUIId.GOLOGOLO_TEXT).style.margin = this.model.workToEdit.getMargin();
    } 

}