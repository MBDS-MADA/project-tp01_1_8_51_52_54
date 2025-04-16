import { CSVLink } from "react-csv";

function ExportCsv({ title, data }) {
  let csvData=[]
  let headers=[]
  if (!data || data.length === 0) return null;
  else{
    const cleanedData = data.map(({ _id,__v, ...rest }) => rest);
    csvData = [
      ...cleanedData.map(Object.values), // lignes
    ];
    headers=Object.keys(cleanedData[0])
  }
  
  return (
    <>
      {data.length >= 0 && (
        <CSVLink

        headers={headers}
        style={{marginBottom:"12px"}}
          filename={title}
          title={title}
          data={csvData}
        >
          Télécharger en csv
        </CSVLink>
      )}
    </>
  );
}
export default ExportCsv;
