import React, { useState, ChangeEvent, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

interface GoogleSuggestionType {
  description: string;
  place_id: string;
}

type AutocompletePropsTypes = {
  onSelectAddress: (
    address: string,
    latitude: number | null,
    longitude: number | null
  ) => void;
};

export const GoogleSearch: React.FC<AutocompletePropsTypes> = ({
  onSelectAddress,
}) => {
  const [options, setOptions] = useState<GoogleSuggestionType[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleSelect = async (address: string, id: string) => {
    if (address && id) {
      const location = await fetch(
        `http://localhost:8080/google/location/${id}`
      )
        .then(async (data) => await data.json())
        .catch((error) => console.error(error));
      if (location) {
        const { lat, lng } = location.result.geometry.location;
        onSelectAddress(address, lat, lng);
      } else {
        onSelectAddress("", null, null);
      }
    } else {
      onSelectAddress("", null, null);
    }
  };

  const handleInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    if (input) {
      setInputValue(input);
      const googleSuggestionsRes = await fetch(
        `http://localhost:8080/google/place/${inputValue}`
      );
      const googleSuggestionsBody = await googleSuggestionsRes.json();
      setOptions(googleSuggestionsBody.predictions);
    }
  };

  return (
    <Autocomplete
      options={inputValue ? options : []}
      getOptionLabel={(option) => `${option.description}`}
      isOptionEqualToValue={(option, value) =>
        option.description === value.description
      }
      value={
        options.find((option) => option.description === inputValue) || null
      }
      style={{ width: 400, marginTop: 40 }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Enter Address or Zipcode"
          variant="outlined"
          fullWidth
          onChange={handleInputChange}
          value={inputValue}
          InputLabelProps={{
            shrink: false,
            style: { transform: "translate(14px, 12px) scale(1)" },
          }}
          sx={{
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                boxShadow: "0 0 0 2px black",
                borderColor: "transparent",
              },
            "& .MuiOutlinedInput-root": {
              borderRadius: "6px",
              borderColor: "lightgray",
            },
            "& .MuiInputBase-input": {
              padding: "4px",
              fontSize: "14px",
              height: "10px",
            },
          }}
        />
      )}
      onChange={(_, selectedOption) => {
        if (selectedOption) {
          const { description, place_id } = selectedOption;
          setInputValue(description);
          handleSelect(description, place_id);
        }
      }}
      renderOption={(props, option) => (
        <li {...props} key={option.description}>
          <p>{option.description}</p>
        </li>
      )}
    />
  );
};
