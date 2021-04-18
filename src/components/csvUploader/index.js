import React, { Component } from "react";
import CsvUploaderComponent from "./component";
import {
  SaveCountries,
  GetCountries,
  GetFilters,
  RemoveCountries,
} from "../../services/csv-upload";
import { debounce } from "../../utility";

class CsvUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      filterData: "",
      dataCount: 0,
      searchText: "",
      filters: {
        country: "ALL",
        capital: "ALL",
        population: "ALL",
        language: "ALL",
        president: "ALL",
      },
      sortBy: {
        key: "",
        value: -1,
      },
      activePage: 1,
      limit: 25,
      skip: 0,
      csvData: "",
      isLoading: false,
    };
  }

  initiateData = () => {
    this.getData();
    this.getFilters();
  };

  componentDidMount = () => this.initiateData();

  /**
   * handles page change of pagination
   * @param pageNumber
   */
  handlePageChange = async (pageNumber) => {
    await this.setState({
      activePage: pageNumber,
      skip: (pageNumber - 1) * this.state.limit,
    });
    this.getData(true);
  };

  handlePageLimitChange = async (pageLimit) => {
    await this.setState({
      activePage: 1,
      limit: Number(pageLimit) || 25,
    });
    this.getData(false);
  };

  handleSearchTextChange = async (text) => {
    await this.setState({
      searchText: text,
    });
    this.callFuncDelay();
  };
  callFuncDelay = debounce(() => this.getData(false), 500);

  handleSortChange = async (columnName, order) => {
    await this.setState({
      sortBy: {
        key: columnName,
        value: order,
      },
    });
    this.getData(true);
  };

  handleFilterChange = async (filterName, value) => {
    await this.setState({
      filters: {
        ...this.state.filters,
        [filterName]: value,
      },
    });
    this.getData(false);
  };

  isFilterChange = () => {
    let flag = false;
    const { filters } = this.state;
    if (
      (this.state.searchText && this.state.searchText.trim()) ||
      (filters.country !== "" && filters.country !== "ALL") ||
      (filters.capital !== "" && filters.capital !== "ALL") ||
      (filters.population !== "" && filters.population !== "ALL") ||
      (filters.language !== "" && filters.language !== "ALL") ||
      (filters.president !== "" && filters.president !== "ALL")
    ) {
      flag = true;
      this.setState({ activePage: 1, skip: 0 });
    }
    return flag;
  };

  getDataQuery = (isOnlyPageChange = true) => {
    const { filters, sortBy } = this.state;
    let requestObj = {
      skip: isOnlyPageChange
        ? (this.state.activePage - 1) * this.state.limit
        : this.isFilterChange()
        ? 0
        : (this.state.activePage - 1) * this.state.limit,
      limit: this.state.limit,
    };

    if (this.state.searchText && this.state.searchText.trim()) {
      requestObj.searchKeys = ["country", "capital", "language", "president"];
      requestObj.searchKeyword = this.state.searchText;
    }
    if (filters.country !== "" && filters.country !== "ALL")
      requestObj["country"] = filters.country;
    if (filters.capital !== "" && filters.capital !== "ALL")
      requestObj["capital"] = filters.capital;
    if (filters.population !== "" && filters.population !== "ALL")
      requestObj["population"] = filters.population;
    if (filters.language !== "" && filters.language !== "ALL")
      requestObj["language"] = filters.language;
    if (filters.president !== "" && filters.president !== "ALL")
      requestObj["president"] = filters.president;
    if (sortBy.key) requestObj["sortBy"] = sortBy;

    return requestObj;
  };

  /**
   * Get countries data
   * @param isOnlyPageChange
   * @returns {Promise<void>}
   */
  getData = async (isOnlyPageChange = true) => {
    this.setState({ isLoading: true });
    const response = await GetCountries(
      this.getDataQuery(isOnlyPageChange)
    ).catch((err) => console.log("error   ", err));
    this.setState({ isLoading: false });
    if (!response?.responseData) return;
    const responseData = response.responseData?.countries;
    const count = response.responseData?.count;
    this.setState({ data: responseData, dataCount: count });
  };

  /**
   * Get filter data
   * @returns {Promise<void>}
   */
  getFilters = async () => {
    this.setState({ isLoading: true });
    const response = await GetFilters().catch((err) =>
      console.log("error   ", err)
    );
    this.setState({ isLoading: false });
    if (!response?.responseData?.length) return;
    this.setState({ filterData: response.responseData[0] });
  };

  handleChange = (key, value) => {
    if (!key) return;
    this.setState({ [key]: value });
  };

  /**
   * File upload
   * @returns
   * @param data
   */
  onFileUpload = (data) => {
    if (!data) return;
    this.setState({ csvData: data });
  };

  uploadFileToDb = async () => {
    this.setState({ isLoading: true });
    console.log({ csvData: JSON.stringify(this.state.csvData) });
    await SaveCountries(this.state.csvData).catch((err) =>
      console.log("error   ", err)
    );
    this.initiateData();
  };

  removeAllCountries = async () => {
    this.setState({ isLoading: true });
    await RemoveCountries().catch((err) => console.log("error   ", err));
    this.initiateData();
  };

  render() {
    return (
      <CsvUploaderComponent
        state={this.state}
        handlePageChange={this.handlePageChange}
        handleChange={this.handleChange}
        onFileUpload={this.onFileUpload}
        uploadFileToDb={this.uploadFileToDb}
        handlePageLimitChange={this.handlePageLimitChange}
        handleSearchTextChange={this.handleSearchTextChange}
        handleSortChange={this.handleSortChange}
        handleFilterChange={this.handleFilterChange}
        removeAllCountries={this.removeAllCountries}
      />
    );
  }
}

export default CsvUploader;
