import React from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const TableWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: calc(100vh - 300px);
  overflow-y: auto;
`;

const TableHeadingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: center;
`;

const SortingArrowWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const Arrow = styled.div`
  width: 0;
  height: 0;
  cursor: pointer;
  opacity: 0.2;

  &:hover {
    opacity: 1;
  }
`;

const ArrowUp = styled(Arrow)`
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid black;
`;

const ArrowDown = styled(Arrow)`
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid black;
`;

const convertToInternationalCurrencySystem = (num) =>
  // Nine Zeroes for Billions
  !num
    ? ""
    : Math.abs(Number(num)) >= 1.0e9
    ? (Math.abs(Number(num)) / 1.0e9).toFixed(2) + "B"
    : // Six Zeroes for Millions
    Math.abs(Number(num)) >= 1.0e6
    ? (Math.abs(Number(num)) / 1.0e6).toFixed(2) + "M"
    : // Three Zeroes for Thousands
    Math.abs(Number(num)) >= 1.0e3
    ? (Math.abs(Number(num)) / 1.0e3).toFixed(2) + "K"
    : Math.abs(Number(num));

const TabularViewer = (props) => {
  const classes = useStyles();
  const { handleSortChange } = props;
  return (
    <TableWrapper>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <TableHeadingWrapper>
                  Country name
                  <SortingArrowWrapper>
                    <ArrowUp onClick={() => handleSortChange("country", 1)} />
                    <ArrowDown
                      onClick={() => handleSortChange("country", -1)}
                    />
                  </SortingArrowWrapper>
                </TableHeadingWrapper>
              </TableCell>
              <TableCell align="right">
                <TableHeadingWrapper>
                  Capital
                  <SortingArrowWrapper>
                    <ArrowUp onClick={() => handleSortChange("capital", 1)} />
                    <ArrowDown
                        onClick={() => handleSortChange("capital", -1)}
                    />
                  </SortingArrowWrapper>
                </TableHeadingWrapper>
              </TableCell>
              <TableCell align="right">
                <TableHeadingWrapper>
                  Approx (population)
                  <SortingArrowWrapper>
                    <ArrowUp onClick={() => handleSortChange("population", 1)} />
                    <ArrowDown
                        onClick={() => handleSortChange("population", -1)}
                    />
                  </SortingArrowWrapper>
                </TableHeadingWrapper>
              </TableCell>
              <TableCell align="right">
                <TableHeadingWrapper>
                  National language
                  <SortingArrowWrapper>
                    <ArrowUp onClick={() => handleSortChange("language", 1)} />
                    <ArrowDown
                        onClick={() => handleSortChange("language", -1)}
                    />
                  </SortingArrowWrapper>
                </TableHeadingWrapper>
              </TableCell>
              <TableCell align="right">
                <TableHeadingWrapper>
                  President
                  <SortingArrowWrapper>
                    <ArrowUp onClick={() => handleSortChange("president", 1)} />
                    <ArrowDown
                        onClick={() => handleSortChange("president", -1)}
                    />
                  </SortingArrowWrapper>
                </TableHeadingWrapper>
              </TableCell>
            </TableRow>
          </TableHead>
          {props.data?.length ? <RenderTableBody data={props.data} /> : null}
        </Table>
      </TableContainer>
    </TableWrapper>
  );
};

const RenderTableBody = ({ data }) => (
  <TableBody>
    {data.map((row, idx) => (
      <TableRow key={idx}>
        <TableCell>{row.country}</TableCell>
        <TableCell align="left">{row.capital}</TableCell>
        <TableCell align="left">
          {convertToInternationalCurrencySystem(row.population)}
        </TableCell>
        <TableCell align="left">{row.language}</TableCell>
        <TableCell align="left">{row.president}</TableCell>
      </TableRow>
    ))}
  </TableBody>
);

export default TabularViewer;
