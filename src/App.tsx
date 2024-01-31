import './App.css'
import { useEffect, useState } from "react";
import * as XLSX from "xlsx"

function App() {
    const [__html, setHTML] = useState<string>("");
    const [names, setNames] = useState<string[]>([]);
    const url = "https://sheetjs.com/data/PortfolioSummary.xls";

    useEffect(() => {
        const getFile = async (): Promise<void> => {
            try {
                const response = await fetch(url);
                const data = await response.arrayBuffer();
                const workbook = XLSX.read(data, {
                    sheetRows: 20
                });
                setNames(workbook.SheetNames);
                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                /* generate and display HTML */
                const table = XLSX.utils.sheet_to_html(worksheet);
                setHTML(table);
                console.log(workbook)
            } catch (error) {
                console.error('Ошибка при загрузке файла:', error);
            }
        }
        getFile().then(()=>console.log("file fetched"));
    }, [url]);

    return (
        <>
            <div dangerouslySetInnerHTML={{__html}}></div>
        </>
    )
}

export default App;
