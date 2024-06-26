import React, { useState, useEffect }  from "react";
import ue from "./Ue";
import uniPillar from "./Unipillar";


const infoSec = [
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
            {mod: "CS2030", done: false, links: "https://nusmods.com/courses/CS2030/programming-methodology-ii"},
            {mod: "CS2040C", done: false, links: "https://nusmods.com/courses/CS2040C/data-structures-and-algorithms"},
            {mod: "CS2100", done: false, links: "https://nusmods.com/courses/CS2100/computer-organisation"},
            {mod: "CS2101", done: false, links: "https://nusmods.com/courses/CS2101/effective-communication-for-computing-professionals"},
            {mod: "CS2103T", done: false, links: "https://nusmods.com/courses/CS2103T/software-engineering"},
            {mod: "CS2105", done: false, links: "https://nusmods.com/courses/CS2105/introduction-to-computer-networks"},
            {mod: "CS2106", done: false, links: "https://nusmods.com/courses/CS2106/introduction-to-operating-systems"},
        ]
    },

    {
        module: "Info Sec Requirements",
        courses: [
            {mod:"CS2107", done: false, links: "https://nusmods.com/courses/CS2107/introduction-to-information-security"},
            {mod:"CS3235", done: false, links: "https://nusmods.com/courses/CS3235/computer-security"},  
            {mod:"IFS4205/IFS4103 + CS4238", done: false, links: "https://nusmods.com/courses/IFS4205/information-security-capstone-project"},
            {mod:"IS4321", done: false, links: "https://nusmods.com/courses/IS4231/information-security-management"},
            {mod:"PE1", done: false, links: "https://www.comp.nus.edu.sg/programmes/ug/isc/curr/"},    
            {mod:"PE2", done: false},
        ],
        links:"https://www.comp.nus.edu.sg/programmes/ug/isc/curr/",
    },
    
    {
        module: "Computing Requirement Complete 12 units of CS-coded, IS-coded, or CP-coded courses subject to the following conditions: \
            CS-coded and IS-coded courses must be at level-3000 or above. At least 6 units must consist of industrial experience courses.",
        courses: [
            {mod:"SIP 1(6CU)/ATAP(12CU)"},
            {mod:"SIP 2(6CU)/ATAP(12CU)"},
            {mod:"3k mod(need use ULE to clear 1 3k mod)"},
        ]
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
        module: "Programme Electives(PE) - Complete 5 Business Analytics programme elective courses with \
                at least 3 courses at Level-4000 and at least 3 courses must be BT coded courses.",
        courses: [
            {mod: "4k mod", done: false, links: ""},
            {mod: "4k mod", done: false, links: ""},
            {mod: "BT 4k mod", done: false, links: ""},
            {mod: "BT mod", done: false, links: ""}, 
            {mod: "BT mod", done: false, links: ""},           
        ],
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

export default function InfoSecMods() {
    const [state, setState] = useState(() => {
        const storedInfoSec = JSON.parse(localStorage.getItem("infoSec"));
        return storedInfoSec ? storedInfoSec : infoSec
    });

    useEffect(() => {
        localStorage.setItem("infoSec", JSON.stringify(state));
    }, [state]);


    useEffect(() => {
        const storedInfoSec = JSON.parse(localStorage.getItem("infoSec"));
        if (storedInfoSec) {
            setState(storedInfoSec);
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

