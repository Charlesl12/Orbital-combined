import React, { useState, useEffect }  from "react";
import ue from "./Ue";
import uniPillar from "./Unipillar";

const infoSys = [
    {
        module: "University Pillar", // Unique Electives Module
        courses: uniPillar.map((mod) => ({ mod: mod.course, done: mod.done})),
        links: "https://www.nus.edu.sg/registrar/academic-information-policies/undergraduate-students/general-education/list-of-courses-approved-under-the-ge-pillars",
    },

    {
        module: "Interdisciplinary & Cross-Disciplinary Education: go appendix B/C for more info",
        courses: [
            {mod: "1st ID Mod", done: false},
            {mod: "2nd ID Mod", done: false},
            {mod: "CD Mod", done: false},
        ],
        links: "https://www.comp.nus.edu.sg/cug/soc-22-23/#appendix-b-interdisciplinary-id-modules",
    },

    {
        module: "Core Courses",
        courses: [
            {mod: "BT2101/CS2102(NEED CS1231 as UE MOD!!)", done: false, links: "https://nusmods.com/courses/BT2101/econometrics-modeling-for-business-analytics"},
            {mod: "CS2030", done: false, links: "https://nusmods.com/courses/CS2030/programming-methodology-ii"},
            {mod: "CS2040", done: false, links: "https://nusmods.com/courses/CS2040/data-structures-and-algorithms"},
            {mod: "IS2101", done: false, links: "https://nusmods.com/courses/IS2101/business-and-technical-communication"},
            {mod: "IS2102", done: false, links: "https://nusmods.com/courses/IS2102/enterprise-systems-architecture-and-design"},
            {mod: "IS2103", done: false, links: "https://nusmods.com/courses/IS2103/enterprise-systems-server-side-design-and-development"},
            {mod: "IS3103", done: false, links: "https://nusmods.com/courses/IS3103/information-systems-leadership-and-communication"},
            {mod: "IS3106", done: false, links: "https://nusmods.com/courses/IS3106/enterprise-systems-interface-design-and-development"},
            {mod: "CP4101 B.Comp Dissertation or Industrial Experience Requirement", done: false, links: "https://nusmods.com/courses/CP4101/b-comp-dissertation"},
            {mod: "IS4103", done: false, links: "https://nusmods.com/courses/IS4103/information-systems-capstone-project"},
        ],
    },

    {
        module: "Math",
        courses: [
            {mod: "MA1521/MA1312/MA2002", done: false, links: "https://nusmods.com/modules/MA1521/calculus-for-computing"},
            {mod: "ST2334", done: false, links: "https://nusmods.com/courses/ST2334/probability-and-statistics"},
        ],
    },
    {
        module: "Programme Electives(PE) - Complete 5 IS programme elective courses with \
                at least 3 courses at Level-4000 and at least 3 courses must be BT coded courses.",
        courses: [
            {mod: "4k mod", done: false},
            {mod: "4k mod", done: false},
            {mod: "IS 4k mod", done: false},
            {mod: "IS mod", done: false}, 
            {mod: "IS mod", done: false},           
        ],
        links: "https://www.comp.nus.edu.sg/programmes/ug/is/curr/",
    },

    {
        module: "Unrestricted Elective", // Unique Electives Module
        courses: [
                ...ue.map((mod) => ({ mod: mod.course, done: mod.done})),
                {mod: "UE9/Minor/2nd Major mapping", done: false},
                {mod: "UE10/Minor/2nd Major mapping", done: false},
        ],
        
    },

];

export default function InfoSysMods() {

    const [state, setState] = useState(() => {
        const storedInfoSys = JSON.parse(localStorage.getItem("infoSys"));
        return storedInfoSys ? storedInfoSys : infoSys
    });

    useEffect(() => {
        localStorage.setItem("infoSys", JSON.stringify(state));
    }, [state]);


    useEffect(() => {
        const storedInfoSys = JSON.parse(localStorage.getItem("infoSys"));
        if (storedInfoSys) {
            setState(storedInfoSys);
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
                                        {category.module}
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

