import React, { useState } from "react";
import Papa from "papaparse";
//var tep;
const FetchGoogleSheet = () => {
    const [data, setData] = useState({}); 
    Papa.parse("https://docs.google.com/spreadsheets/d/11a3WSH6SWjMfIJqjYJKmQiNWUXrYu6sWo5hOisuhs5M/pub?output=csv", {
        download: true,
        header: true,
        complete: (results) => {
            setData(results.data);
        },
    });

    //const wllist = Array.from(data);
    return (
        <div>
            <ul>
                <p> 
                    
                </p>
            </ul>
        </div>
    );
}
export default FetchGoogleSheet;