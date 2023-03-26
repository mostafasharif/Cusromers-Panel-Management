import React from "react";

export default function Count(props){
    return(
        <div>
            <div><p className={"position-absolute"}>Total Data : <p>

                {props.counters}
            </p> </p></div>

        </div>
    )
}