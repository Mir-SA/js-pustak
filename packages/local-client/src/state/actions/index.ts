import { ActionType } from "../action-types";
import { Cell, CellTypes } from '../cell'

export type Direction = 'up' | 'down'
export interface MoveCellAction {
    type: ActionType.MOVE_CELL,
    payload: {
        id: string,
        direction: Direction
    }
}

export interface UpdateCellAction {
    type: ActionType.UPDATE_CELL,
    payload: {
        id: string,
        content: string
    }
}

export interface DeleteCellAction {
    type: ActionType.DELETE_CELL,
    payload: string
}

export interface InsertCellAfterAction {
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
        id: string | null,
        type: CellTypes
    }
}

export interface BundleStartAction {
    type: ActionType.BUNDLE_START,
    payload: {
        cellID: string
    }
}

export interface BundleCompleteAction {
    type: ActionType.BUNDLE_COMPLETE,
    payload: {
        cellID: string,
        bundle: {
            code: string,
            err: string
        }
    }
}

export interface FetchCellAction {
    type: ActionType.FETCH_CELLS
}

export interface FetchCellCompleteAction {
    type: ActionType.FETCH_CELLS_COMPLETE,
    payload: Cell[]
}

export interface FetchCellErrorAction {
    type: ActionType.FETCH_CELLS_ERROR,
    payload: string
}

export interface SaveCellsAction {
    type: ActionType.SAVE_CELLS_ERROR,
    payload: string
}

export type Action =
    MoveCellAction
    | UpdateCellAction
    | DeleteCellAction
    | InsertCellAfterAction
    | BundleStartAction
    | BundleCompleteAction
    | FetchCellAction
    | FetchCellCompleteAction
    | FetchCellErrorAction
    | SaveCellsAction