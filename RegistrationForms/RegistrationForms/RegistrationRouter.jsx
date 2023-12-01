import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FirstStep from "./RegistrationStepOne";
import Header from "./RegistrationHeader";
import SecondStep from "./RegistrationStepTwo";
import JsonQuestionaire from "./JsonQuestionaire";
import PlacesAPI from "./PlacesAPI";

const App = () => {
	return (
			<div className="container w-50 pt-5">
				<Header />
				<Routes>
					<Route element={<JsonQuestionaire />} path="" exact={true} />
                    <Route element={<SecondStep />} path="second"  />
					<Route element={<PlacesAPI />} path="places"  />
				</Routes>
			</div>
	);
};

export default App;
