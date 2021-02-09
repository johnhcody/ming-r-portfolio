export const reducer = (state, action) => {
    switch (action.type) {
     case 'ADD_PROJECT_TYPE':
        return {
            ...state,
            form: { ...state.form, type: action.projectType}
        }
    case 'MODIFY_ELEMENT':
        return {
            ...state,
            form: { ...state.form, [action.element]: action.value }
        }
    case 'RICH_TEXT':
        return {
            ...state,
            form: { ...state.form, text: action.text }
        }
    case 'POST_MAIN_PHOTO':
        return {
            ...state,
            form: { ...state.form, mainPhoto: action.mainPhoto }
        }
    case 'APPEND_PHOTO':
        let photoInputNum = `phot-${state.photoCount}`
        return {
            ...state,
            photoCount: state.photoCount + 1,
            input: state.input.concat(photoInputNum),
            order: state.order.concat('photo')
        }
    case 'UPLOAD_PHOTO':
        let newArr = [...state.photoStrArr];
        newArr[action.index] = action.value;
        return {
            ...state,
            form: { ...state.form, photos: newArr },
            photoStrArr: newArr
        }
    case 'APPEND_PARAGRAPH':
        let paraInputNum = `para-${state.paraCount}`;
        return {
            ...state,
            paraCount: state.paraCount + 1,
            input: state.input.concat(paraInputNum),
            order: state.order.concat('paragraph')
        }
    case 'SET_PARAGRAPH':
        let paraArr = [...state.paragraphsArr];
        paraArr[action.index] = action.text;
        return {
            ...state,
            paragraphsArr: paraArr,
            form: { ...state.form, paragraphs: paraArr }
        }
    case 'NO_TITLE_ERROR':
        return {
            ...state,
            errors: { ...state.errors, title: 'A title is required', message: 'Please see errors above' }
        }
    case 'NO_TYPE_ERROR':
        return {
            ...state,
            errors: { ...state.errors, type: 'Please select a type', message: 'Please see errors above' }
        }
    case 'RESET_ERRORS':
        return {
            ...state,
            errors: { ...state.errors, type: '', message: '', title: '' }
        }
    case 'RESET_TITLE_ERROR':
        return {
            ...state,
            errors: { ...state.errors, title: '' }
        }
    case 'RESET_TYPE_ERROR':
        return {
            ...state,
            errors: { ...state.errors, type: '' }
        }
      default:
        return state;
    }
  };