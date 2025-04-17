import { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router";
import { useLocation } from "react-router-dom";
import FormStatus from "./FormStatus";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store/store";
import { clearForm, emptyForm } from "./store/formSlice";
import { useNavigate } from "react-router-dom";
import FormPage1 from "./FormPage1";
import FormPage2 from "./FormPage2";
import FormPage3 from "./FormPage3";
import FormPage4 from "./FormPage4";
import FormPage5 from "./FormPage5";
import FormPage6 from "./FormPage6";
import FormPage7 from "./FormPage7";
import FormPage8 from "./FormPage8";
import FormPage9 from "./FormPage9";

function App() {
  const [currentFormPage, setCurrentFormPage] = useState<string>("");
  const [showResetMessage, setShowResetMessage] = useState<boolean>(false);
  const formData = useSelector((state: RootState) => state.form);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentFormPage(location.pathname);
  }, [location]);

  useEffect(() => {
    // Check if any form fields have data
    let applicationInProgress = false;
    for (const key in formData) {
      if (key !== "pageVisited" && formData[key] !== "") {
        applicationInProgress = true;
        break;
      } else if (key === "pageVisited") {
        // If the pageVisited field is empty, it means the user is starting a new application
        if (formData.pageVisited.length === 0) {
          applicationInProgress = false;
        } else {
          // If the pageVisited field has data, it means the user has visited pages
          applicationInProgress = true;
        }
      }
    }

    setShowResetMessage(applicationInProgress);
  }, []); // Only run on mount

  const isFormDataValid = (): boolean => {
    let isValid = true;
    // iterate fields in formData object
    for (const key in formData) {
      if (key !== "pagesVisited" && formData[key] !== "") {
        isValid = false;
        break;
      }
    }

    return isValid;
  };

  const handleStartOver = () => {
    dispatch(clearForm());
    setShowResetMessage(false);
    navigate("/");
  };

  return (
    <>
      <h1 className="p-4 text-2xl">Form Test</h1>

      {showResetMessage && (
        <div className="m-4 p-4 bg-yellow-100 border border-yellow-400 rounded">
          <p className="mb-3">
            You appear to be mid-way through an application; would you like to
            start over?
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleStartOver}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Start Over
            </button>
            <button
              onClick={() => setShowResetMessage(false)}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <FormStatus currentFormPage={currentFormPage} />
      <Routes>
        <Route path={"/"} element={<FormPage1 />} />
        <Route path="/form_page2" element={<FormPage2 />} />
        <Route path="/form_page3" element={<FormPage3 />} />
        <Route path="/form_page4" element={<FormPage4 />} />
        <Route path="/form_page5" element={<FormPage5 />} />
        <Route path="/form_page6" element={<FormPage6 />} />
        <Route path="/form_page7" element={<FormPage7 />} />
        <Route path="/form_page8" element={<FormPage8 />} />
        <Route path="/form_page9" element={<FormPage9 />} />
      </Routes>
    </>
  );
}

export default App;
