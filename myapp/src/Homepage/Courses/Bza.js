import React, { useState, useEffect }  from "react";
import ue from "./Ue";
import uniPillar from "./Unipillar";

const bza = [
    {
        module: "University Pillar", // Unique Electives Module
        courses: uniPillar.map((mod) => ({ mod: mod.course, done: mod.done})),
    },

    {
        module: "Interdisciplinary & Cross-Disciplinary Education ",
        courses: [
            {mod: "1st ID Mod", done: false},
            {mod: "2nd ID Mod", done: false},
            {mod: "CD Mod", done: false},
        ],
        links: "https://www.comp.nus.edu.sg/cug/soc-22-23/#appendix-b-interdisciplinary-id-modules",
    },

    {
        module: "Computer Science Foundation",
        courses: [
            {mod: "CS1231S", done: false, links: ""},
            {mod: "CS2030S", done: false, links: ""},
            {mod: "CS2040S", done: false, links: ""},
            {mod: "CS2100", done: false, links: ""},
            {mod: "CS2101", done: false, links: ""},
            {mod: "CS2103T", done: false, links: ""},
            {mod: "CS2106", done: false, links: ""},
            {mod: "CS2109S", done: false, links: ""},
            {mod: "CS3230", done: false, links: ""},
        ],
    },


    {
        module: "Unrestricted Elective", // Unique Electives Module
        courses: ue.map((mod) => ({ mod: mod.course, done: mod.done})),
    },


];

export default function BzaMods() {
    const [state, setState] = useState(bza);

    const onCompleteClick = (index, idx) => {
        const updatedState = [...state];
        updatedState[index].courses[idx].done = !updatedState[index].courses[idx].done;

        const allDone = updatedState[index].courses.every((course) => course.done);
        updatedState[index].completed = allDone;

        setState(updatedState);
        // saveToLocalStorage(updatedState);
    };

    // useEffect(() => {
    //     const storedCs = JSON.parse(localStorage.getItem("bza"));
    //     if (storedCs) {
    //         setState(storedCs);
    //     }
    // }, []);

    // const saveToLocalStorage = (updatedState) => {
    //     localStorage.setItem("cs", JSON.stringify(updatedState));
    // };


    return(
    <>
    <table className="table table-bordered" style={{marginTop: "30px"}}>
            <thead>
                <tr>
                <th>Course Category</th>
                <th>Completed</th>
                </tr>
            </thead>
            <tbody>
                {bza.map((category, index) => (
                    <React.Fragment key={index}>
                        <tr>
                            <td>
                                <strong>
                                    {category.module}
                                </strong>
                            </td>
                        </tr>
                        {category.courses.map((course, idx) => (
                            <tr key={idx}>
                                <td style={course.done ? {backgroundColor: "green"} : {backgroundColor: "transparent"}}>
                                    {course.mod}
                                </td>
                                <td>
                                    <button onClick={() => onCompleteClick(index, idx)}>
                                    {course.done ? "Undo" : "Mark Completed"}</button>
                                </td>
                            </tr>
                        ))}
                    </React.Fragment>
                ))}
            </tbody>
        </table>
    </>);
}

