import { INITIAL_MAP } from '../../constants/action_types';


export function setInitMap(map, view, baseLayer) {
    return (dispatch) => {
        const inititalMap = {
            view: view,
            baseLayer: baseLayer,
            map: map
        }
        dispatch({ type: INITIAL_MAP, payload: inititalMap });
    }
}