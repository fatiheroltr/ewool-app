import React, { createContext, useState } from "react";

const TempUnitContext = createContext();

const TempUnitContextProvider = ({ children }) => {
	const [currentTempUnit, setCurrentTempUnit] = useState("celsius");

	return (
		<TempUnitContext.Provider
			value={{
				currentTempUnit,
				setCurrentTempUnit,
			}}
		>
			{children}
		</TempUnitContext.Provider>
	);
};

export { TempUnitContext, TempUnitContextProvider };
