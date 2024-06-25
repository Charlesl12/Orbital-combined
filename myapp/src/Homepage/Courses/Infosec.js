import ue from "./Ue";
import uniPillar from "./Unipillar";

const infoSec = [
    {
        module: "University Pillar", // Unique Electives Module
        courses: uniPillar.map((mod) => ({ course: mod.course, done: mod.done})),
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
        courses: ue.map((mod) => ({ course: mod.course, done: mod.done})),
    },


];

export default function InfoSecMods() {
    return(
    <>
    <table className="course-table">
            <thead>
                <tr>
                <th>Course</th>
                <th>Completed Button</th>
                </tr>
            </thead>
            <tbody>
                {infoSec.map((course, index) => (
                <tr key={index}>
                    <td>{course.module}</td>
                    <td>
                    <button>{course.completed ? "Completed" : "Mark Completed"}</button>
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
    </>);
}

