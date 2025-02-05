import MarkDownParser from "../parser/MarkDownParser";

export default class Engine {
    private _narkDownParser : MarkDownParser = new MarkDownParser();

    private _versionText : string = 'v200000';
    private _dateText : string = '01.02.2025';

    constructor() {
        console.log('Engine created');
    }

    public AppRun() : void{
        this.Initalize();
        console.log('Engine running');
    }

    private Initalize() : void{
        this.BindInputEvents();
    }

    //#region Bind Events
    private BindInputEvents() : void{
        const versionInput = document.querySelector('#versionInput') as HTMLInputElement;
        versionInput.addEventListener('change', () =>{
            this._versionText = versionInput.value;
        });

        const dateInput = document.querySelector('#dateInput') as HTMLInputElement;
        dateInput.addEventListener('change', () =>{
            this._versionText = dateInput.value;
        });

        const mdTextInput = document.querySelector('#mdTextInput') as HTMLTextAreaElement;
        const inputSubmitButton = document.querySelector('#inputSubmitButton') as HTMLButtonElement;
        inputSubmitButton.addEventListener('click', () =>{
            console.log("value: " + mdTextInput.value);
            const result = this._narkDownParser.Parse(mdTextInput.value);
            for(let i = 0; i < result.length; i++){
                if (result[i] == '') continue;
                // TODO: 데이터 output Texts에 뿌리기
                console.log(result[i]);
            }
        });
    }
    //#endregion
}