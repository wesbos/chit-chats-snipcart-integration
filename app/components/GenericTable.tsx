import styled from 'styled-components';

const TableStyles = styled.table`
  width: 100%;
  font-family: sans-serif;
  border-collapse: collapse;
  td {
    padding: 3px;
    border: 1px solid #ededed;
  }
  th {
    text-align: left;
    background: black;
    color white;
  }
  tr:nth-child(even) {
    background: #efefef;
  }
`;
type GenericTableProps = {
  data: any[];
  columns: string[];
};

export default function GenericTable({
  data = [],
  columns = [],
}: GenericTableProps) {
  return (
    <>
      <TableStyles>
        <thead>
          <tr>
            {columns.map((heading) => (
              <th key={heading}>{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              {columns.map((heading) => (
                <td key={heading}>{item[heading]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </TableStyles>
    </>
  );
}
