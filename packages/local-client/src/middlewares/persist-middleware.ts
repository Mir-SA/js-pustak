import { Dispatch } from "redux"
import { Action } from "../state/actions"
import { ActionType } from "../state/action-types"
import { saveCells } from "../state/action-creators"
import { RootState } from "../state"

export const persist = ({
    dispatch, getState
}: {
    dispatch: Dispatch<Action>;
    getState: () => RootState
}) => {
    let timer: any
    return (next: (action: Action) => void) => {
        return (action: Action) => {
            next(action)

            if (
                [
                    ActionType.MOVE_CELL,
                    ActionType.UPDATE_CELL,
                    ActionType.INSERT_CELL_AFTER,
                    ActionType.INSERT_CELL_AFTER
                ].includes(action.type)) {
                if (timer) {
                    clearTimeout(timer)
                }
                timer = setTimeout(() => {
                    saveCells()(dispatch, getState)
                }, 500)
            }
        }
    }

}