import React, { useState } from "react";
import styled from "styled-components";
import PaginationBar from "../paginationBar";
import TabularViewer from "../tabularViewer";
import { CSVLink } from "react-csv";
import LinearProgress from "@material-ui/core/LinearProgress";
import FileUploader from "./fileUploader";

const PageContainer = styled.div`
  width: 90%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  margin: auto;
  padding: 50px;
  gap: 20px;
  th {
    font-weight: bold;
  }
`;

const TopSectionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const FiltersWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 12px;
`;

const SearchBar = styled.input`
  border-radius: 10px;
  border: 1px solid #ddd;
  color: #7d96a1;
  outline: none;
  padding: 10px;
  width: 100%;
  max-width: 200px;
`;

const Filter = styled.select`
  border-radius: 10px;
  border: 1px solid #ddd;
  color: #7d96a1;
  font-weight: bold;
  width: 100%;
  max-width: 110px;
  outline: none;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  a {
    text-decoration: none !important;
  }
`;

const Button = styled.div`
  border-radius: 10px;
  outline: none;
  color: #ffffff;
  background-color: salmon;
  cursor: pointer;
  padding: 7px;
  font-size: 12px;
  text-align: center;
  width: 80px;
`;
const CSV_TEMPLATE = [
  ["country", "capital", "population", "language", "president"],
];

const CsvUploaderComponent = ({
  state,
  handleChange,
  handlePageChange,
  handlePageLimitChange,
  onFileUpload,
  uploadFileToDb,
  handleSearchTextChange,
  handleSortChange,
  handleFilterChange,
  removeAllCountries,
}) => {
  const [openFileUploader, setOpenFileUploader] = useState(false);
  return (
    <PageContainer>
      <TopSectionWrapper>
        <FiltersWrapper>
          <SearchBar
            placeholder="Search..."
            onChange={(e) => handleSearchTextChange(e.target.value)}
          />
          <Filter
            value={state.filters?.country}
            onChange={(e) => handleFilterChange("country", e.target.value)}
          >
            <option value={"ALL"}>Country:all</option>
            {state.filterData?.country?.length
              ? state.filterData.country.map((country) => {
                  return <option value={country}>{country}</option>;
                })
              : null}
          </Filter>

          <Filter
            value={state.filters?.capital}
            onChange={(e) => handleFilterChange("capital", e.target.value)}
          >
            <option value={"ALL"}>Capital:all</option>
            {state.filterData?.capital?.length
              ? state.filterData.capital.map((capital) => {
                  return <option value={capital}>{capital}</option>;
                })
              : null}
          </Filter>

          <Filter
            value={state.filters?.population}
            onChange={(e) => handleFilterChange("population", e.target.value)}
          >
            <option value={"ALL"}>Population:all</option>
            {state.data?.length && (
              <>
                <option value={`0-1000000`}>0-10m</option>
                <option value={`1000000-1000000000`}>10m-1b</option>
                <option value={`1000000000-100000000000`}>1b-100b</option>
                <option value={`100000000000-above`}>100b-above</option>
              </>
            )}
          </Filter>

          <Filter
            value={state.filters?.language}
            onChange={(e) => handleFilterChange("language", e.target.value)}
          >
            <option value={25}>Language:all</option>
            {state.filterData?.language?.length
              ? state.filterData.language.map((language) => {
                  return <option value={language}>{language}</option>;
                })
              : null}
          </Filter>

          <Filter
            value={state.filters?.president}
            onChange={(e) => handleFilterChange("president", e.target.value)}
          >
            <option value={""}>President:all</option>
            {state.filterData?.president?.length
              ? state.filterData.president.map((president) => {
                  return <option value={president}>{president}</option>;
                })
              : null}
          </Filter>
        </FiltersWrapper>
        <ButtonWrapper>
          <Button onClick={removeAllCountries}>Clear data</Button>
          <CSVLink filename={"csv-template.csv"} data={CSV_TEMPLATE}>
            <Button>Template</Button>
          </CSVLink>
          <Button onClick={() => setOpenFileUploader(true)}>Upload</Button>
        </ButtonWrapper>
      </TopSectionWrapper>

      {state.isLoading && <LinearProgress />}
      <TabularViewer data={state.data} handleSortChange={handleSortChange} />

      <PaginationBar
        hideFirstLastPages
        pageRangeDisplayed={3}
        activePage={state.activePage}
        itemsCountPerPage={state.limit}
        totalItemsCount={state.dataCount}
        onChange={handlePageChange}
        pageLimit={state.limit}
        onPageLimitChange={handlePageLimitChange}
      />

      <FileUploader
        open={openFileUploader}
        csvData={state.csvData}
        onFileUpload={onFileUpload}
        onRemoveFile={() => handleChange("csvData", "")}
        fileUploadAction={() => {
          setOpenFileUploader(false);
          uploadFileToDb();
        }}
        cancelAction={() => setOpenFileUploader(false)}
      />
    </PageContainer>
  );
};

export default CsvUploaderComponent;
