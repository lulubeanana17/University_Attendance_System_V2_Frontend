import './App.css';
import CustomisedNavBar from "./components/NavigationBar";
import {Route, Routes} from "react-router-dom";
import GetAllSemester from "./components/Semesters/Semester";
import Home from "./components/Home";
import CreateSemester from "./components/Semesters/CreateSemester";
import OneSemester from "./components/Semesters/OneSemester";
import UpdateSemester from "./components/Semesters/UpdateSemester";
import Login from "./components/Auth/Login";
import Logout from "./components/Auth/Logout";
import GetAllCourse from "./components/Courses/Course";
import CreateCourse from "./components/Courses/CreateCourse";
import OneCourse from "./components/Courses/OneCourse";
import UpdateCourse from "./components/Courses/UpdateCourse";
import GetAllClass from "./components/Classes/Class";
import CreateClass from "./components/Classes/CreateClass";
import OneClass from "./components/Classes/OneClass";
import UpdateClass from "./components/Classes/UpdateClass";
import UpdateLecturer from "./components/Classes/UpdateLecturer";
import UpdateEnrollments from "./components/Classes/UpdateEnrollments";
import CreateUser from "./components/Auth/CreateUser";
import GetAllLecturer from "./components/Lecturers/Lecturer";
import OneLecturer from "./components/Lecturers/OneLecturer";
import UpdateOneLecturer from "./components/Lecturers/UpdateLecturer";
import CreateLecturer from "./components/Lecturers/CreateLecturer";
import GetAllStudent from "./components/Students/Student";
import OneStudent from "./components/Students/OneStudent";
import UpdateOneStudent from "./components/Students/UpdateStudent";
import CreateStudent from "./components/Students/CreateStudent";
import GetAllEnrollment from "./components/Enrollments/Enrollment";
import CreateEnrollment from "./components/Enrollments/CreateEnrollment";
import OneEnrollment from "./components/Enrollments/OneEnrollment";
import UploadExcel from "./components/Upload/UploadExcel";
import AdminHome from "./components/AdminHome";
import LecturerHome from "./components/LecturerHome";
import StudentHome from "./components/StudentHome";
import MarkAttendance from "./components/Attendances/MarkAttendance";
import ViewAttendance from "./components/Attendances/ViewAttendance";

function App() {
  return (
    <div className="App">
      <CustomisedNavBar />
        <Routes>
          <Route path={"/"} element={<Home/>} />
          <Route path={"/adminhome/"} element={<AdminHome/>} />
          <Route path={"/lecturerhome/"} element={<LecturerHome/>} />
          <Route path={"/markattendance/"} element={<MarkAttendance/>} />
          <Route path={"/studenthome/"} element={<StudentHome/>} />
          <Route path={"/viewattendance/"} element={<ViewAttendance/>} />
          <Route path={"/getallsemester/"} element={<GetAllSemester/>} />
          <Route path={"/getallsemester/createSemester/"} element={<CreateSemester/>} />
          <Route path={"/getallsemester/getonesemester/:semesterId/"} element={<OneSemester/>} />
          <Route path={"/getallsemester/getonesemester/updateonesemester/:semesterId/"} element={<UpdateSemester/>} />
          <Route path={"/getallcourse/"} element={<GetAllCourse/>} />
          <Route path={"/getallcourse/createCourse/"} element={<CreateCourse/>} />
          <Route path={"/getallcourse/getonecourse/:courseId/"} element={<OneCourse/>} />
          <Route path={"/getallcourse/getonecourse/updateonecourse/:courseId/"} element={<UpdateCourse/>} />
          <Route path={"/getallclass/"} element={<GetAllClass/>} />
          <Route path={"/getallclass/createClass/"} element={<CreateClass/>} />
          <Route path={"/getallclass/getoneclass/:classId/"} element={<OneClass/>} />
          <Route path={"/getallclass/getoneclass/updateoneclass/:classId/"} element={<UpdateClass/>} />
          <Route path={"/getallclass/getoneclass/updateoneclass/updateonelecturer/:classId/"} element={<UpdateLecturer/>} />
          <Route path={"/getallclass/getoneclass/updateoneclass/updateoneenrollments/:classId/"} element={<UpdateEnrollments/>} />
          <Route path={"/createuser/"} element={<CreateUser/>} />
          <Route path={"/getalllecturer/"} element={<GetAllLecturer/>} />
          <Route path={"/getalllecturer/createLecturer/"} element={<CreateLecturer/>} />
          <Route path={"/getalllecturer/getonelecturer/:lecturerId/"} element={<OneLecturer/>} />
          <Route path={"/getalllecturer/getonelecturer/updateonelecturer/:lecturerId/:userId"} element={<UpdateOneLecturer/>} />
          <Route path={"/getallstudent/"} element={<GetAllStudent/>} />
          <Route path={"/getallstudent/createStudent/"} element={<CreateStudent/>} />
          <Route path={"/getallstudent/getonestudent/:studentId/"} element={<OneStudent/>} />
          <Route path={"/getallstudent/getonestudent/updateonestudent/:studentId/:userId"} element={<UpdateOneStudent/>} />
          <Route path={"/getallenrollment/"} element={<GetAllEnrollment/>} />
          <Route path={"/getallenrollment/createEnrollment/"} element={<CreateEnrollment/>} />
          <Route path={"/getallenrollment/getoneenrollment/:enrollmentId/"} element={<OneEnrollment/>} />
          <Route path={"/uploadExcel/"} element={<UploadExcel/>} />
          <Route path={"/login/"} element={<Login/>} />
          <Route path={"/logout/"} element={<Logout/>} />
        </Routes>
    </div>
  );
}

export default App;
