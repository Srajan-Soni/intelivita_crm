

export const getData = ()=>{

    const data = localStorage.getItem('records')

    return data ? JSON.parse(data) : []
}

export const setData = (data) => {
    localStorage.setItem('records', JSON.stringify(data))

}

export const uniqueRecords = (records) => {
  const uniqueEmails = new Set();
  return records.filter((record) => {
    if (!uniqueEmails.has(record.email)) {
      uniqueEmails.add(record.email);
      return true;
    }
    return false;
  });
  console.log('Unique Records:', uniqueRecords);
};

export const updateJsonData = (existingData,newData) => {
  
    const updatedData = [...existingData, ...newData]
    // setJsonData(updatedData)
    return uniqueRecords(updatedData)
    
}