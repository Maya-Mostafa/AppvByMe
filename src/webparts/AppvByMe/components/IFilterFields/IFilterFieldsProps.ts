export interface IFilterFieldsProps{
    onChangeFilterField: any;
    filterField: {
        title: {key: string, text: string},
        formStatus: {key: string, text: string},
        formDetails: string
    };
    resetSrch: any;    
    formTitlesOptions: any;
}