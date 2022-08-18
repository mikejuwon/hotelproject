import React, { useState }  from 'react';
import { css } from "@emotion/react";
import HashLoader from "react-spinners/HashLoader";


function Loading() {


let [loading, setLoading] = useState(true);


return (
    <div style={{marginTop: "150px"}}>
        <div className="sweet-loading text-center">
            <HashLoader color="#000" loading={loading} css="" size={70} speedMultiplier= {2} />
        </div>
    </div>
);
}

export default Loading;