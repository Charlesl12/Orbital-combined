import React, { useState, useEffect }  from "react";
import ue from "./Ue";
import uniPillar from "./Unipillar";

const cs = [
    {
        module: "University Pillar", // Unique Electives Module
        courses: uniPillar.map((mod) => ({ mod: mod.course, done: mod.done})),
        links: "https://www.nus.edu.sg/registrar/academic-information-policies/undergraduate-students/general-education/list-of-courses-approved-under-the-ge-pillars",
    },

    {
        module: "Interdisciplinary & Cross-Disciplinary Education: go appendix B/C for more info ",
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
            {mod: "CS1231S", done: false, links: "https://nusmods.com/courses/CS1231S/discrete-structures"},
            {mod: "CS2030S", done: false, links: "https://nusmods.com/courses/CS2030S/programming-methodology-ii"},
            {mod: "CS2040S", done: false, links: "https://nusmods.com/courses/CS2040S/data-structures-and-algorithms"},
            {mod: "CS2100", done: false, links: "https://nusmods.com/courses/CS2100/computer-organisation"},
            {mod: "CS2101", done: false, links: "https://nusmods.com/courses/CS2101/effective-communication-for-computing-professionals"},
            {mod: "CS2103T", done: false, links: "https://nusmods.com/courses/CS2103T/software-engineering"},
            {mod: "CS2106", done: false, links: "https://nusmods.com/courses/CS2106/introduction-to-operating-systems"},
            {mod: "CS2109S", done: false, links: "https://nusmods.com/courses/CS2109S/introduction-to-ai-and-machine-learning"},
            {mod: "CS3230", done: false, links: "https://nusmods.com/courses/CS3230/design-and-analysis-of-algorithms"},
        ],
    },

    {
        module: "Focus Area (Click me to refer to NUS website requirements)\
                below is just a guide of FA choices\
                or ATAP and take 4 FA mods + ensuring minimum 3 4k mods",
        courses: [
            {mod: "4k mod", done: false},
            {mod: "4k mod", done: false},
            {mod: "4k mod", done: false},
            {mod: "3k mod", done: false},
            {mod: "2k mod/3k mod", done: false},
            {mod: "4MC mod/2 SIP to make 12MC", done: false}, 
            {mod: "4MC mod/2 SIP to make 12MC", done: false},
            {mod: "4MC mod/2 SIP to make 12MC", done: false},
            
        ],
        links: "https://www.comp.nus.edu.sg/programmes/ug/focus/"
    },

    {
        module: "Math",
        courses: [
            {mod: "MA1521", done: false, links: "https://nusmods.com/modules/MA1521/calculus-for-computing"},
            {mod: "MA1522", done: false, links: "https://nusmods.com/courses/MA1522/linear-algebra-for-computing"},
            {mod: "ST2334", done: false, links: "https://nusmods.com/courses/ST2334/probability-and-statistics"},
        ],
    },

    {
        module: "Unrestricted Elective - Poly Students auto exempted 4 UE", // Unique Electives Module
        courses: ue .map((mod) => ({ mod: mod.course, done: mod.done})),
    },


];
export default function ComSciMods() {

    const [state, setState] = useState(() => {
        const storedCs = JSON.parse(localStorage.getItem("cs"));
        return storedCs ? storedCs : cs
    });

    useEffect(() => {
        localStorage.setItem("cs", JSON.stringify(state));
    }, [state]);


    useEffect(() => {
        const storedCs = JSON.parse(localStorage.getItem("cs"));
        if (storedCs) {
            setState(storedCs);
        }
    }, []);

    const onCompleteClick = (index, idx) => {
        setState((prevState) => {
            const updatedState = [...prevState];
            updatedState[index].courses[idx].done = !updatedState[index].courses[idx].done;
            return updatedState;
          });
    };


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
                {state.map((category, index) => (
                    <React.Fragment key={index}>
                        <tr>
                            <td>
                                <strong>
                                    <a href = {category.links} target="_blank">
                                        {typeof category.module === 'string' ? category.module : category.module}
                                    </a>
                                </strong>
                            </td>
                        </tr>
                        {category.courses.map((course, idx) => (
                            <tr key={idx}>
                                <td style={course.done ? {backgroundColor: "green"} : {backgroundColor: "transparent"}}>
                                    <a href = {course.links} target="_blank">
                                        {course.mod}
                                    </a>
                                </td>
                                <td>
                                    <button onClick={() => onCompleteClick(index, idx)} className="btn btn-primary">
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

