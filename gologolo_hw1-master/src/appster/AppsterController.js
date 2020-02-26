import {AppsterCallback, AppsterGUIId, AppsterHTML, AppsterGUIClass} from './AppsterConstants.js'
import Appster from './Appster.js';
import GoLogoLoLogo from '../gologolo/GoLogoLoLogo.js';

export default class AppsterController {
    constructor() {
        this.model = null;
    }

    setModel(initModel) {
        this.model = initModel;
        var theModel = this.model;
    }

    /**
     * This function helps the constructor setup the event handlers for all controls.
     * 
     * @param {AppsterGUIId} id Unique identifier for the HTML control on which to
     * listen for events.
     * @param {AppsterHTML} eventName The type of control for which to respond.
     * @param {AppsterCallback} callback The callback function to be executed when
     * the event occurs.
     */
    registerEventHandler(id, eventName, callback) {
        // GET THE CONTROL IN THE GUI WITH THE CORRESPONDING id
        let control = document.getElementById(id);

        // AND SETUP THE CALLBACK FOR THE SPECIFIED EVENT TYPE
        if (control)
            control.addEventListener(eventName, callback);
    }

    registerAppsterEventHandlers() {
        // FIRST THE NEW WORK BUTTON ON THE HOME SCREEN
        this.registerEventHandler(AppsterGUIId.APPSTER_HOME_NEW_WORK_BUTTON, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_CREATE_NEW_WORK]);

        // THEN THE CONTROLS ON THE EDIT SCREEN
        this.registerEventHandler(AppsterGUIId.APPSTER_EDIT_HOME_LINK, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_GO_HOME]);
        this.registerEventHandler(AppsterGUIId.APPSTER_EDIT_TRASH, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_DELETE_WORK]);

        // AND THE MODAL BUTTONS
        this.registerEventHandler(AppsterGUIId.APPSTER_YES_NO_MODAL_YES_BUTTON, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_CONFIRM_DELETE_WORK]);
        this.registerEventHandler(AppsterGUIId.APPSTER_YES_NO_MODAL_NO_BUTTON, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_CANCEL_DELETE_WORK]);

        this.registerEventHandler(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL_ENTER_BUTTON, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_ENTER_BUTTON]);
        this.registerEventHandler(AppsterGUIId.APPSTER_CONFIRM_MODAL_OK_BUTTON, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_OK_BUTTON]);
        this.registerEventHandler(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL_CANCEL_BUTTON,AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_CANCEL_BUTTON]);
    }

    /**
    * This method sets up a callback method for an element, registering the
    * elementCallbackName (e.g. click) function for the element control in the DOM, specifying
    * callbackFunctionName as the method to be called when that event occurs. The
    * args array is used to pass needed data to the callback.
    * 
    * @param {Element} element 
    * @param {String} elementCallbackName 
    * @param {String} callbackFunctionName 
    * @param {String[]} args 
    */
    setupCallback(element, elementCallbackName, callbackFunctionName, args) {
        let functionCallText = "this." + callbackFunctionName + "(";
        for (let i = 0; i < args.length; i++) {
            functionCallText += "'" + args[i] + "'";
            if (i < (args.length - 1)) {
                functionCallText += ", ";
            }
        }
        functionCallText += ")";
        element.setAttribute(elementCallbackName, functionCallText);
        return functionCallText;
    }

    registerRecentWorkEventHandler(element) {
        element.addEventListener(AppsterHTML.CLICK, this.processEditWork);
    }

    /**
     * This function responds to when the user clicks on the
     * todo logo to go back to the home screen.
     */
    processGoHome = () => {
        console.log("processGoHome");
        this.model.goHome();
    }

    processGoEdit(workToEdit) {
        console.log("processGoEdit");
        this.model.goEdit(workToEdit);
    }

    processEnterButton = () => {
        var theModel = this.model;
        var result = false;
        console.log(this.model, "repeat starts here############");
        var input = document.getElementById("appster_text_input_modal_textfield").value;
        if(input.length <= 0){}
        else{
            var i;
            console.log("!!!!!!!!!!!theModel.recentWork.length", theModel.recentWork.length)
            for(i = 0; i < theModel.recentWork.length; i++){
                if(input == theModel.recentWork[i].name)
                    result = true;
            }
            console.log("!!!!!!!!!!!!!!!result", result)
            if(result == true){
                console.log("invalid");
                document.getElementById("appster_text_input_modal").style.visibility = 'hidden';
                document.getElementById("appster_text_input_modal").style.opacity = 0;
                document.getElementById("appster_text_input_modal_frame").style.opacity = 0;
    
                document.getElementById("appster_confirm_modal").style.opacity = 1;
                document.getElementById("appster_confirm_modal").style.visibility = 'visible';
                document.getElementById("appster_confirm_modal_frame").style.opacity = 1;
            }
            else{
                var newLogo = new GoLogoLoLogo(input);
                theModel.goList(newLogo);
                    
                document.getElementById("appster_text_input_modal").style.visibility = 'hidden';
                document.getElementById("appster_text_input_modal").style.opacity = 0;
                document.getElementById("appster_text_input_modal_frame").style.opacity = 0;
            }

        }
        
    }

    processOkButton(){
        document.getElementById("appster_text_input_modal").style.visibility = 'hidden';
        document.getElementById("appster_text_input_modal").style.opacity = 0;
        document.getElementById("appster_text_input_modal_frame").style.opacity = 0;
        document.getElementById("appster_confirm_modal").style.opacity = 0;
        document.getElementById("appster_confirm_modal").style.visibility = 'hidden';
        document.getElementById("appster_confirm_modal_frame").style.opacity = 0;
    }

    processCancelButton(){
        document.getElementById("appster_text_input_modal").style.visibility = 'hidden';
        document.getElementById("appster_text_input_modal").style.opacity = 0;
        document.getElementById("appster_text_input_modal_frame").style.opacity = 0;
    }

    /**
     * This function is called when the user requests to create
     * new work.
     */
    processCreateNewWork = () => {
        console.log(this);
        console.log("processCreateNewWork");

        // PROMPT FOR THE NAME OF THE NEW LIST
        document.getElementById("appster_text_input_modal").style.visibility = 'visible';
        document.getElementById("appster_text_input_modal").style.opacity = 1;
        document.getElementById("appster_text_input_modal_frame").style.opacity = 1;


        // MAKE A BRAND NEW LIST
        //this.model.goList();
        
    }

    /**
     * This function responds to when the user clicks on a link
     * for recent work on the home screen.
     * 
     * @param {String} workName The name of the work to load into
     * the controls on the edit screen.
     */
    processEditWork = (event) => {
        // GET THE WORK THAT THE USER WANTS TO LOAD
        let clickedElement = event.target;
        let workName = clickedElement.workId;
        console.log(workName + " clicked");

        // START EDITING THE SELECTED WORK
        this.model.editWork(workName);
        return clickedElement;
    }

    /**
     * This function responds to when the user clicks the No
     * button in the popup dialog after having requested to delete
     * the loaded work.
     */
    processCancelDeleteWork = () => {
        // JUST HIDE THE DIALOG
        this.model.view.hideDialog();

    }

    /**
     * This function responds to when the user changes the
     * name of the list via the textfield.
     */
    processChangeName() {
        let nameTextField = document.getElementById(TodoGUIId.LIST_NAME_TEXTFIELD);
        let newName = nameTextField.value;
        let listBeingEdited = window.todo.model.listToEdit;
        window.todo.model.updateListName(listBeingEdited, newName);
    }

    /**
     * This function responds to when the user clicks the Yes
     * button in the popup dialog after having requested to delete
     * the loaded work.
     */
    processConfirmDeleteWork = () => {
        // DELETE THE WORK
        console.log("1st", this.model)
        this.model.recentWork.filter(this.processEditWork());
        //this.model.removeWork(this.model.getWorkToEdit());


        // GO BACK TO THE HOME SCREEN
        this.model.goHome();
    }

    /**
     * This function responds to when the user clicks the trash
     * button, i.e. the delete button, in order to delete the
     * list being edited.
     */
    processDeleteWork = () => {
        // VERIFY VIA A DIALOG BOX
        this.model.view.showDialog();

    }
}