import { Fragment, useEffect } from "react";
import "./cellList.css";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";
import CellListItem from "./cellListItems";
import AddCell from "./addCell";

const CellList: React.FC = () => {
   const cells = useTypedSelector(({ cells: { data, order } }) =>
      order.map((id) => data[id])
   );

   const { fetchCells } = useActions();

   useEffect(() => {
      fetchCells();
   }, []);

   const renderedCells = cells.map((cell) => (
      <Fragment key={cell.id}>
         <CellListItem cell={cell} />
         <AddCell previousCellID={cell.id} />
      </Fragment>
   ));

   return (
      <div className="cell-list">
         <AddCell previousCellID={null} forceVisible={cells.length === 0} />
         {renderedCells}
      </div>
   );
};
export default CellList;
