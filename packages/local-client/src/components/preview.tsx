import { useRef, useEffect } from "react";
import "./preview.css";

interface PreviewProps {
   code: string;
   err: string;
}

// 'error' event is used to handle error when asynchronous code is executed
// 'message' event is used for code execution and handling exception
const html = `
<html lang="en">
    <head></head>
    <body>
        <div id='root'></div>
        <script>
            const handleError = (err) => {
                const root = document.querySelector('#root')
                root.innerHTML = '<div style = "color: rgb(195, 33, 33);"> <h3>Runtime Error</h3> ' + err + '</div>'
                console.error(err)
            }


            window.addEventListener('error', (e) => {
                e.preventDefault()
                handleError(e.error)
            })

            window.addEventListener('message', (e) => {
                try {
                    eval(e.data)
                } catch(err) {
                    handleError(err)
                }
            }, false)
        </script>
    </body>
</html>
`;

const Preview: React.FC<PreviewProps> = ({ code, err }) => {
   const iframe = useRef<any>();

   useEffect(() => {
      iframe.current.srcdoc = html;
      setTimeout(() => {
         iframe.current.contentWindow.postMessage(code, "*");
      }, 50);
   }, [code]);

   return (
      <div className="preview-wrapper">
         <iframe
            style={{ background: "antiquewhite" }}
            title="preview"
            srcDoc={html}
            ref={iframe}
            sandbox="allow-scripts"
         ></iframe>
         {err && <div className="preview-error">{err}</div>}
      </div>
   );
};

export default Preview;
