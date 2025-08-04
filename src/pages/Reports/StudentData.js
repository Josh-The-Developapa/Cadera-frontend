// mockData.js - Fictitious student and grades data for report generation

// Classes with students
export const mockClasses = [
    {
        id: 1,
        name: 'P7P',
        level: 'Primary 7',
        students: [
            {
                id: 1,
                name: 'Kevin Kent Asiimwe',
                spc: 'B98A2D',
                subjects: {
                    'English Language': { midTerm: 85, endTerm: 88, final: 87, grade: 'D2', comment: 'Excellent progress in reading and writing' },
                    'Mathematics': { midTerm: 92, endTerm: 95, final: 94, grade: 'D1', comment: 'Outstanding mathematical skills' },
                    'Religious Education': { midTerm: 78, endTerm: 80, final: 79, grade: 'D2', comment: 'Good understanding of religious concepts' },
                    'Computer Studies': { midTerm: 88, endTerm: 90, final: 89, grade: 'D2', comment: 'Very good with technology' },
                    'Literacy 1 (Sci & SST)': { midTerm: 82, endTerm: 85, final: 84, grade: 'D2', comment: 'Good analytical skills' },
                    'Literacy 2 (Reading & Writing)': { midTerm: 86, endTerm: 89, final: 88, grade: 'D2', comment: 'Excellent communication skills' }
                },
                attendance: { expected: 65, actual: 63 },
                generalComment: 'Kevin is an exceptional student who consistently performs well across all subjects.',
                classTeacherComment: 'A pleasure to teach. Shows great leadership qualities.',
                headTeacherComment: 'Well done Kevin. Keep up the excellent work.'
            },
            {
                id: 2,
                name: 'Sarah Nakato',
                spc: 'C45F7G',
                subjects: {
                    'English Language': { midTerm: 75, endTerm: 78, final: 77, grade: 'D2', comment: 'Good improvement in grammar' },
                    'Mathematics': { midTerm: 68, endTerm: 72, final: 70, grade: 'C3', comment: 'Needs more practice with fractions' },
                    'Religious Education': { midTerm: 82, endTerm: 85, final: 84, grade: 'D2', comment: 'Shows deep understanding' },
                    'Computer Studies': { midTerm: 70, endTerm: 75, final: 73, grade: 'C3', comment: 'Good progress with applications' },
                    'Literacy 1 (Sci & SST)': { midTerm: 77, endTerm: 80, final: 79, grade: 'D2', comment: 'Excellent research skills' },
                    'Literacy 2 (Reading & Writing)': { midTerm: 74, endTerm: 76, final: 75, grade: 'D2', comment: 'Creative writing improving' }
                },
                attendance: { expected: 65, actual: 60 },
                generalComment: 'Sarah shows consistent effort and is improving steadily.',
                classTeacherComment: 'A hardworking student who participates well in class.',
                headTeacherComment: 'Good progress Sarah. Continue working hard.'
            },
            {
                id: 3,
                name: 'John Mukasa',
                spc: 'D78H9I',
                subjects: {
                    'English Language': { midTerm: 62, endTerm: 65, final: 64, grade: 'C4', comment: 'Improving comprehension skills' },
                    'Mathematics': { midTerm: 58, endTerm: 60, final: 59, grade: 'C5', comment: 'Needs extra help with problem solving' },
                    'Religious Education': { midTerm: 70, endTerm: 72, final: 71, grade: 'C3', comment: 'Good moral understanding' },
                    'Computer Studies': { midTerm: 65, endTerm: 68, final: 67, grade: 'C4', comment: 'Shows interest in technology' },
                    'Literacy 1 (Sci & SST)': { midTerm: 63, endTerm: 66, final: 65, grade: 'C4', comment: 'Developing analytical thinking' },
                    'Literacy 2 (Reading & Writing)': { midTerm: 60, endTerm: 63, final: 62, grade: 'C4', comment: 'Reading fluency improving' }
                },
                attendance: { expected: 65, actual: 58 },
                generalComment: 'John is making steady progress and shows good potential.',
                classTeacherComment: 'Needs to be more consistent with homework submission.',
                headTeacherComment: 'Keep working hard John. You can achieve more.'
            }
        ]
    },
    {
        id: 2,
        name: 'S3N',
        level: 'Senior 3',
        students: [
            {
                id: 4,
                name: 'Mary Namuli',
                spc: 'E89J0K',
                subjects: {
                    'English Language': { midTerm: 90, endTerm: 93, final: 92, grade: 'D1', comment: 'Exceptional literary analysis' },
                    'Mathematics': { midTerm: 87, endTerm: 89, final: 88, grade: 'D2', comment: 'Strong problem-solving skills' },
                    'Religious Education': { midTerm: 85, endTerm: 88, final: 87, grade: 'D2', comment: 'Deep spiritual understanding' },
                    'Computer Studies': { midTerm: 91, endTerm: 94, final: 93, grade: 'D1', comment: 'Advanced programming skills' },
                    'Literacy 1 (Sci & SST)': { midTerm: 89, endTerm: 91, final: 90, grade: 'D1', comment: 'Excellent research abilities' },
                    'Literacy 2 (Reading & Writing)': { midTerm: 92, endTerm: 95, final: 94, grade: 'D1', comment: 'Outstanding creative writing' }
                },
                attendance: { expected: 70, actual: 69 },
                generalComment: 'Mary is an outstanding student and a role model for others.',
                classTeacherComment: 'Excellent performance across all subjects. Natural leader.',
                headTeacherComment: 'Congratulations Mary. You are truly exceptional.'
            },
            {
                id: 5,
                name: 'Peter Ssali',
                spc: 'F12L3M',
                subjects: {
                    'English Language': { midTerm: 72, endTerm: 75, final: 74, grade: 'C3', comment: 'Good essay writing skills' },
                    'Mathematics': { midTerm: 79, endTerm: 82, final: 81, grade: 'D2', comment: 'Strong in algebra' },
                    'Religious Education': { midTerm: 76, endTerm: 78, final: 77, grade: 'D2', comment: 'Good moral reasoning' },
                    'Computer Studies': { midTerm: 83, endTerm: 85, final: 84, grade: 'D2', comment: 'Very good technical skills' },
                    'Literacy 1 (Sci & SST)': { midTerm: 75, endTerm: 77, final: 76, grade: 'D2', comment: 'Good analytical thinking' },
                    'Literacy 2 (Reading & Writing)': { midTerm: 73, endTerm: 76, final: 75, grade: 'D2', comment: 'Improving writing style' }
                },
                attendance: { expected: 70, actual: 66 },
                generalComment: 'Peter shows good academic potential and is developing well.',
                classTeacherComment: 'A reliable student who works consistently.',
                headTeacherComment: 'Good work Peter. Continue to strive for excellence.'
            }
        ]
    }
];

// Teachers data
export const mockTeachers = [
    { id: 1, name: 'Robert Kim', subject: 'Mathematics' },
    { id: 2, name: 'Sarah Johnson', subject: 'English Language' },
    { id: 3, name: 'Michael Brown', subject: 'Religious Education' },
    { id: 4, name: 'Lisa Davis', subject: 'Computer Studies' },
    { id: 5, name: 'David Wilson', subject: 'Science' },
    { id: 6, name: 'Emily Taylor', subject: 'Social Studies' }
];

// Function to get all students from all classes
export const getAllStudents = () => {
    const allStudents = [];
    mockClasses.forEach(cls => {
        cls.students.forEach(student => {
            allStudents.push({
                ...student,
                className: cls.name,
                classLevel: cls.level
            });
        });
    });
    return allStudents;
};

// Function to get students by class
export const getStudentsByClass = (classId) => {
    const cls = mockClasses.find(c => c.id === classId);
    return cls ? cls.students : [];
};

// Function to calculate total marks
export const calculateTotalMarks = (grades) => {
    let total = 0;
    Object.values(grades).forEach(grade => {
        total += grade.final;
    });
    return total;
};