import { useEffect } from "react";
import "./code-cell.css";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import Resizable from "./resizable";
import { Cell } from "../state";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useCumulativeCode } from "../hooks/useCumulativeCode";

interface CodeCellProps {
   cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
   const { updateCell, createBundle } = useActions();
   const bundle = useTypedSelector((state) => state.bundles[cell.id]);
   const cumulativeCode = useCumulativeCode(cell.id);
   // this hook contains logic for debouncing,
   // such that input state won't be updated more often
   useEffect(() => {
      if (!bundle) {
         createBundle(cell.id, cumulativeCode);
         return;
      }

      // set timer to bundle in 2 seconds
      // once timer is passed, code will be bundled
      const timer = setTimeout(async () => {
         createBundle(cell.id, cumulativeCode);
      }, 2000);

      // clears the timer if input is updated again
      return () => {
         clearTimeout(timer);
      };
      // eslint-disable-next-line
   }, [cumulativeCode, cell.id, createBundle]);

   return (
      <Resizable direction="vertical">
         <div style={{ height: "calc(100% - 10px)", display: "flex" }}>
            <Resizable direction="horizontal">
               <CodeEditor
                  initialValue={cell.content}
                  onChange={(val) => updateCell(cell.id, val)}
               />
            </Resizable>

            <section className="progress-wrapper">
               {!bundle || bundle.loading ? (
                  <div className="progress-cover">
                     <progress className="progress is-small is-primary" max="100">
                        Loading...
                     </progress>
                  </div>
               ) : (
                  <Preview code={bundle.code} err={bundle.err} />
               )}
            </section>
         </div>
      </Resizable>
   );
};

export default CodeCell;
